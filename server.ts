import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is required in Settings > Secrets');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to support base64 image uploads in JSON payload
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Pesona Pulau Batu Atas AI Engine" });
  });

  // Gemini AI endpoint for automatic photo and video description
  app.post("/api/gemini/describe-media", async (req, res) => {
    try {
      const { title = '', type = 'photo', category = 'Pantai', location = '', url = '', videoUrl = '' } = req.body;
      
      const ai = getAiClient();
      
      const parts: any[] = [];
      let mediaAnalyzed = false;
      
      const targetUrl = type === 'photo' ? url : (videoUrl || url);
      if (targetUrl && typeof targetUrl === 'string') {
        if (targetUrl.startsWith('data:image/')) {
          const matches = targetUrl.match(/^data:(image\/[a-zA-Z0-9-+.]+);base64,(.+)$/);
          if (matches && matches[2]) {
            parts.push({
              inlineData: {
                mimeType: matches[1],
                data: matches[2]
              }
            });
            mediaAnalyzed = true;
          }
        } else if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://')) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            const response = await fetch(targetUrl, { signal: controller.signal });
            clearTimeout(timeoutId);
            const contentType = response.headers.get('content-type') || '';
            if (response.ok && contentType.startsWith('image/')) {
              const arrayBuffer = await response.arrayBuffer();
              const base64Data = Buffer.from(arrayBuffer).toString('base64');
              parts.push({
                inlineData: {
                  mimeType: contentType.split(';')[0] || 'image/jpeg',
                  data: base64Data
                }
              });
              mediaAnalyzed = true;
            }
          } catch (fetchErr) {
            console.warn("Could not fetch media URL for inline visual inspection, falling back to contextual prompt:", fetchErr);
          }
        }
      }
      
      const promptText = `Anda adalah kurator wisata dan ahli biologi kelautan untuk Pulau Batu Atas, Kabupaten Buton Selatan, Sulawesi Tenggara.
Tugas Anda adalah menghasilkan deskripsi foto/video yang sangat menarik, puitis, akurat secara alam/bahari, dan informatif untuk galeri website wisata resmi Pulau Batu Atas.

Informasi Media Saat Ini:
- Judul/Nama File: "${title || 'Tanpa Judul'}"
- Jenis Media: ${type === 'video' ? 'Video / Rekaman Udara atau Dalam Air' : 'Foto / Gambar'}
- Kategori Awal: "${category}"
- Lokasi: "${location || 'Pulau Batu Atas'}"
${mediaAnalyzed ? '- Catatan Khusus: Visual gambar dilampirkan dalam permintaan ini. Perhatikan detail warna laut, objek (penyu, terumbu karang, perahu phinisi, pantai pasir putih, sunset/sunrise), dan buat deskripsi yang tepat mencerminkan visual foto tersebut.' : ''}

Daftar Kategori Pilihan:
Pantai, Snorkeling, Sunrise, Sunset, Bawah Laut, Budaya & Kuliner, Drone & Udara, Konservasi, Perahu & Nelayan.

Hasilkan respons dalam format JSON dengan properti berikut:
1. "description": Deskripsi 2-3 kalimat berbahasa Indonesia yang memukau dan elegan. Deskripsikan kejernihan air laut, keanekaragaman hayati, atau kehangatan budaya maritim Batu Atas dengan gaya profesional kurator galeri.
2. "title": Judul yang disempurnakan (lebih menarik, puitis, dan representatif).
3. "category": Kategori paling sesuai dari Daftar Kategori Pilihan di atas.
4. "location": Spot lokasi spesifik di Pulau Batu Atas (misal: Pantai Nirwana Barat, Coral Garden Selatan, Tebing Sunrise Timur, Taman Laut Penyu, atau Pelabuhan Rakyat).`;

      parts.push({ text: promptText });

      let result: any = null;
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: { parts },
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                description: { type: Type.STRING, description: "Deskripsi media yang memukau dan mendetail." },
                title: { type: Type.STRING, description: "Judul media yang disempurnakan." },
                category: { type: Type.STRING, description: "Kategori yang cocok dari daftar." },
                location: { type: Type.STRING, description: "Spot lokasi di Batu Atas." }
              },
              required: ["description", "title", "category", "location"]
            }
          }
        });

        const text = response.text;
        if (text) {
          result = JSON.parse(text);
        }
      } catch (geminiErr: any) {
        // Fallback silently if API fails or quota exceeded
        
        const categoryMap: Record<string, string> = {
          'Pantai': 'Hamparan pasir putih halus membingkai jernihnya perairan pirus Pulau Batu Atas yang pesonanya memanjakan setiap mata yang memandang.',
          'Bawah Laut': 'Keindahan taman karang alami dan terumbu karang warna-warni menjadi rumah bagi beragam biota laut eksotis di perairan Buton Selatan.',
          'Snorkeling': 'Kejernihan air laut sebening kristal menghadirkan pengalaman menyelam ringan yang tak terlupakan di spot bahari terbaik Pulau Batu Atas.',
          'Sunset': 'Semburat warna keemasan dan jingga menghiasi langit senja di ufuk barat perairan laut Buton Selatan, menciptakan suasana yang romantis dan tenang.',
          'Sunrise': 'Mentari pagi perlahan menyapa menyinari deretan perahu nelayan tradisional dan perairan tenang pesisir Batu Atas.',
          'Budaya & Kuliner': 'Kearifan lokal maritim dan cita rasa khas kuliner pesisir menyatu dalam kehangatan keramahan masyarakat nelayan Pulau Batu Atas.',
          'Drone & Udara': 'Panorama dari ketinggian memperlihatkan gugusan pesisir menawan dan gradasi warna laut biru pirus yang mengelilingi Pulau Batu Atas.',
          'Konservasi': 'Upaya pelestarian alam bahari dan penjagaan ekosistem laut demi masa depan keanekaragaman hayati Buton Selatan yang berkelanjutan.',
          'Perahu & Nelayan': 'Denyut kehidupan bahari masyarakat nelayan tradisional dengan perahu phinisi dan armada tangkap yang tangguh mengarungi lautan Nusantara.'
        };
        const defaultDesc = categoryMap[category] || 'Pesona keindahan alam dan budaya maritim Pulau Batu Atas yang masih murni, mempesona, dan penuh kearifan lokal.';
        
        result = {
          title: title ? (title.length > 4 ? title : `${title} - Pesona Bahari`) : `Pesona Alam ${category} Batu Atas`,
          description: defaultDesc,
          category: category || 'Pantai',
          location: location || 'Pulau Batu Atas, Buton Selatan'
        };
      }

      if (!result) {
        result = {
          title: title || 'Pesona Pulau Batu Atas',
          description: 'Keindahan pesisir dan budaya bahari Nusantara di Kabupaten Buton Selatan yang memukau.',
          category: category || 'Pantai',
          location: location || 'Pulau Batu Atas, Buton Selatan'
        };
      }

      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        error: error.message || "Gagal menghasilkan deskripsi dari Gemini AI" 
      });
    }
  });

  // Vite middleware for development & Static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
