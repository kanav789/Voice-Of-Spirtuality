export interface SacredBook {
  id: string;
  title: string;
  originalTitle: string;
  subtitle: string;
  chaptersCount: number;
  versesCount: number;
  available: boolean;
  status: 'available' | 'coming_soon';
  description: string;
  badge?: string;
}
