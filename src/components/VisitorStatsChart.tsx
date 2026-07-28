import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { TrendingUp, Users, Calendar, BarChart2, Activity, Clock, ArrowUpRight, Smartphone, Monitor, Globe, Sparkles } from 'lucide-react';

interface VisitorStatsChartProps {
  totalVisitsBase?: number;
}

export const VisitorStatsChart: React.FC<VisitorStatsChartProps> = ({ totalVisitsBase = 14852 }) => {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly'>('daily');
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');

  // Realistic Daily visitor data (last 7 days)
  const dailyData = [
    { name: 'Senin', pengunjung: 420, halaman: 1150, mobile: 290, desktop: 130, durasi: '4m 12s' },
    { name: 'Selasa', pengunjung: 380, halaman: 980, mobile: 260, desktop: 120, durasi: '3m 45s' },
    { name: 'Rabu', pengunjung: 450, halaman: 1240, mobile: 310, desktop: 140, durasi: '4m 30s' },
    { name: 'Kamis', pengunjung: 510, halaman: 1420, mobile: 360, desktop: 150, durasi: '5m 10s' },
    { name: 'Jumat', pengunjung: 620, halaman: 1780, mobile: 440, desktop: 180, durasi: '5m 45s' },
    { name: 'Sabtu', pengunjung: 890, halaman: 2650, mobile: 650, desktop: 240, durasi: '7m 15s' },
    { name: 'Minggu', pengunjung: 980, halaman: 2980, mobile: 720, desktop: 260, durasi: '8m 20s' },
  ];

  // Realistic Weekly visitor data (last 8 weeks)
  const weeklyData = [
    { name: 'Mgg 1 (Jun)', pengunjung: 2450, halaman: 6800, mobile: 1700, desktop: 750, durasi: '4m 50s' },
    { name: 'Mgg 2 (Jun)', pengunjung: 2680, halaman: 7400, mobile: 1850, desktop: 830, durasi: '5m 05s' },
    { name: 'Mgg 3 (Jun)', pengunjung: 3100, halaman: 8900, mobile: 2200, desktop: 900, durasi: '5m 30s' },
    { name: 'Mgg 4 (Jun)', pengunjung: 2950, halaman: 8200, mobile: 2050, desktop: 900, durasi: '5m 15s' },
    { name: 'Mgg 1 (Jul)', pengunjung: 3400, halaman: 9800, mobile: 2400, desktop: 1000, durasi: '6m 10s' },
    { name: 'Mgg 2 (Jul)', pengunjung: 3850, halaman: 11200, mobile: 2750, desktop: 1100, durasi: '6m 45s' },
    { name: 'Mgg 3 (Jul)', pengunjung: 4200, halaman: 12600, mobile: 3000, desktop: 1200, durasi: '7m 00s' },
    { name: 'Mgg 4 (Jul)', pengunjung: 4680, halaman: 14100, mobile: 3350, desktop: 1330, durasi: '7m 40s' },
  ];

  const currentData = timeRange === 'daily' ? dailyData : weeklyData;

  const totalPengunjungPeriode = currentData.reduce((acc, curr) => acc + curr.pengunjung, 0);
  const totalHalamanPeriode = currentData.reduce((acc, curr) => acc + curr.halaman, 0);
  const avgMobilePercent = Math.round(
    (currentData.reduce((acc, curr) => acc + curr.mobile, 0) / totalPengunjungPeriode) * 100
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/95 border border-slate-800 p-4 rounded-2xl shadow-2xl backdrop-blur-md">
          <p className="text-sm font-black text-white mb-2 pb-1 border-b border-slate-800 flex items-center justify-between gap-4">
            <span>{label}</span>
            <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
              {payload[0]?.payload?.durasi || '5m 30s'} Avg
            </span>
          </p>
          <div className="space-y-1.5 text-xs">
            <p className="flex items-center justify-between gap-6 text-cyan-400 font-bold font-mono">
              <span>Pengunjung Unik:</span>
              <span>{payload[0]?.value?.toLocaleString()} user</span>
            </p>
            <p className="flex items-center justify-between gap-6 text-teal-300 font-semibold font-mono">
              <span>Total Kunjungan Halaman:</span>
              <span>{payload[1]?.value?.toLocaleString()} views</span>
            </p>
            <div className="pt-1.5 mt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1"><Smartphone className="w-3 h-3 text-cyan-400" /> Mobile: {payload[0]?.payload?.mobile || 0}</span>
              <span className="flex items-center gap-1"><Monitor className="w-3 h-3 text-amber-400" /> Desktop: {payload[0]?.payload?.desktop || 0}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border-2 border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>STATISTIK TRAFIK & POPULARITAS</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-400">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live Analytics</span>
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>Grafik Kunjungan Wisatawan</span>
            <Sparkles className="w-5 h-5 text-amber-400 hidden sm:inline-block" />
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pantau lonjakan wisatawan dan tren akses website harian maupun mingguan untuk mengevaluasi popularitas wisata Pulau Batu Atas.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
          
          {/* Time Range Selector */}
          <div className="bg-slate-950 p-1 rounded-2xl border border-slate-800 flex items-center">
            <button
              onClick={() => setTimeRange('daily')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                timeRange === 'daily'
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Harian (7 Hari)</span>
            </button>
            <button
              onClick={() => setTimeRange('weekly')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                timeRange === 'weekly'
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Mingguan (8 Minggu)</span>
            </button>
          </div>

          {/* Chart Type Toggle */}
          <div className="bg-slate-950 p-1 rounded-2xl border border-slate-800 flex items-center">
            <button
              onClick={() => setChartType('area')}
              title="Tampilkan Area Chart"
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                chartType === 'area' ? 'bg-slate-800 text-cyan-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Area
            </button>
            <button
              onClick={() => setChartType('bar')}
              title="Tampilkan Bar Chart"
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                chartType === 'bar' ? 'bg-slate-800 text-cyan-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Bar
            </button>
          </div>

        </div>
      </div>

      {/* Summary KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        
        <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800/80 shadow-md flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase">Pengunjung ({timeRange === 'daily' ? '7 Hari' : '8 Minggu'})</p>
            <h4 className="text-2xl sm:text-3xl font-black text-white mt-1 font-mono">{totalPengunjungPeriode.toLocaleString('id-ID')}</h4>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% dari periode lalu
            </span>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800/80 shadow-md flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase">Total Tayangan Halaman</p>
            <h4 className="text-2xl sm:text-3xl font-black text-teal-300 mt-1 font-mono">{totalHalamanPeriode.toLocaleString('id-ID')}</h4>
            <span className="text-[11px] text-teal-400 font-semibold mt-1 block">
              ~{Math.round(totalHalamanPeriode / totalPengunjungPeriode)} halaman/sesi
            </span>
          </div>
          <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800/80 shadow-md flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase">Akses Perangkat</p>
            <h4 className="text-2xl sm:text-3xl font-black text-white mt-1 font-mono">{avgMobilePercent}%</h4>
            <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1 mt-1">
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> Mobile vs {100 - avgMobilePercent}% PC
            </span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Smartphone className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800/80 shadow-md flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase">Rata-rata Waktu Kunjung</p>
            <h4 className="text-2xl sm:text-3xl font-black text-amber-300 mt-1 font-mono">5m 42s</h4>
            <span className="text-[11px] text-amber-400/90 font-semibold mt-1 block">
              Tinggi interaksi pada foto & video
            </span>
          </div>
          <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400">
            <Clock className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Main Recharts Chart Section */}
      <div className="bg-slate-950 p-4 sm:p-6 rounded-3xl border border-slate-800/90 shadow-xl relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <span>Tren Jumlah Pengunjung & Kunjungan Halaman</span>
              <span className="text-xs font-normal text-slate-400 font-mono">({timeRange === 'daily' ? '7 Hari Terakhir' : '8 Minggu Terakhir'})</span>
            </h4>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block shadow-sm shadow-cyan-400/50"></span>
              Pengunjung Unik
            </span>
            <span className="flex items-center gap-1.5 text-teal-400">
              <span className="w-3 h-3 rounded-full bg-teal-400 inline-block shadow-sm shadow-teal-400/50"></span>
              Kunjungan Halaman
            </span>
          </div>
        </div>

        <div className="w-full h-[320px] sm:h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPengunjung" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorHalaman" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={{ stroke: '#334155' }} 
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="halaman" 
                  name="Total Tayangan Halaman"
                  stroke="#14b8a6" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorHalaman)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="pengunjung" 
                  name="Pengunjung Unik"
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorPengunjung)" 
                />
              </AreaChart>
            ) : (
              <BarChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={{ stroke: '#334155' }} 
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="halaman" name="Total Tayangan Halaman" fill="#14b8a6" radius={[6, 6, 0, 0]} opacity={0.8} />
                <Bar dataKey="pengunjung" name="Pengunjung Unik" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer / Insights note */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Analisis Tren Popularitas Wisata</p>
            <p className="text-[11px] text-slate-400">
              Lonjakan trafik tertinggi terjadi pada akhir pekan (Sabtu & Minggu), bertepatan dengan tingginya minat penyeberangan kapal & eksplorasi selam karang.
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="text-[10px] text-slate-500 block">Status Pelacakan</span>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 justify-end">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Real-Time Aktif
          </span>
        </div>
      </div>

    </div>
  );
};
