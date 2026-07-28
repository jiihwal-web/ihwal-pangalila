export type GalleryCategory =
  | 'Semua'
  | 'Foto'
  | 'Video'
  | 'Pantai'
  | 'Snorkeling'
  | 'Sunrise'
  | 'Sunset'
  | 'Bawah Laut'
  | 'Budaya & Kuliner'
  | 'Drone & Udara'
  | 'Konservasi'
  | 'Perahu & Nelayan'
  | 'Nature'
  | 'Culture'
  | 'Activities';

export const THEMATIC_CATEGORIES: GalleryCategory[] = [
  'Nature',
  'Culture',
  'Activities',
  'Pantai',
  'Snorkeling',
  'Sunrise',
  'Sunset',
  'Bawah Laut',
  'Budaya & Kuliner',
  'Drone & Udara',
  'Konservasi',
  'Perahu & Nelayan'
];

export interface GalleryItem {
  id: string;
  title: string;
  type: 'photo' | 'video';
  url: string; // Image URL or Video embed/thumbnail URL
  videoUrl?: string; // If video, direct MP4 or embed link
  category: GalleryCategory;
  description: string;
  location: string;
  dateAdded: string;
  likes: number;
  featured?: boolean;
  imageIndex?: number; // 1 to 8 reference as requested
  enhancedHd?: boolean; // True if visual brightness, sharpness & HD contrast applied
}

export interface ReviewItem {
  id: string;
  author: string;
  origin?: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
}

export interface DestinationItem {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  highlights: string[];
  bestTime: string;
  rating: number;
  reviews?: ReviewItem[];
}

export interface FeatureItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

export interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  replied?: boolean;
}

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'public' | 'admin';
  favorites: string[];
  loginMethod: 'email' | 'google';
}

export interface GuideStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  actionTip: string;
  icon: string;
}

export type ActiveView = 'beranda' | 'galeri' | 'video' | 'destinasi' | 'profil' | 'panduan' | 'kontak' | 'dashboard';
