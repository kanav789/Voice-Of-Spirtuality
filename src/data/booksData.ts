import { SacredBook } from '../types/books';

export const sacredBooksList: SacredBook[] = [
  {
    id: 'gita',
    title: 'Bhagavad Gita',
    originalTitle: 'श्रीमद्भगवद्गीता',
    subtitle: 'The divine conversation on dharma, yoga, and liberation',
    chaptersCount: 18,
    versesCount: 700,
    available: true,
    status: 'available',
    description: '18 Chapters · 700 Verses',
    badge: 'Available Now',
  },
  {
    id: 'garuda_purana',
    title: 'Garuda Purana',
    originalTitle: 'गरुड पुराण',
    subtitle: 'Teachings on karma, rebirth, and the journey of the soul',
    chaptersCount: 16,
    versesCount: 19000,
    available: false,
    status: 'coming_soon',
    description: 'Vaishnava Mahapurana',
    badge: 'Coming Soon',
  },
  {
    id: 'ramcharitmanas',
    title: 'Ramcharitmanas',
    originalTitle: 'श्रीरामचरितमानस',
    subtitle: 'Devotional epic of Lord Rama composed by Goswami Tulsidas',
    chaptersCount: 7,
    versesCount: 12800,
    available: false,
    status: 'coming_soon',
    description: '7 Kandas · Awadhi Epic',
    badge: 'Coming Soon',
  },
  {
    id: 'upanishads',
    title: 'The Upanishads',
    originalTitle: 'उपनिषद',
    subtitle: 'Core philosophical treatises unveiling ultimate reality (Brahman)',
    chaptersCount: 10,
    versesCount: 1100,
    available: false,
    status: 'coming_soon',
    description: 'Principal Mukhya Upanishads',
    badge: 'Coming Soon',
  },
  {
    id: 'mahabharata',
    title: 'Mahabharata',
    originalTitle: 'महाभारत',
    subtitle: 'The grand epic of virtue, kingship, righteousness, and truth',
    chaptersCount: 18,
    versesCount: 100000,
    available: false,
    status: 'coming_soon',
    description: '18 Parvas · Itihasa',
    badge: 'Coming Soon',
  },
];

export function getAvailableBooks(): SacredBook[] {
  return sacredBooksList.filter((b) => b.available);
}

export function getComingSoonBooks(): SacredBook[] {
  return sacredBooksList.filter((b) => !b.available);
}
