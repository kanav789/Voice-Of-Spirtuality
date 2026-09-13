export interface VerseAudio {
  file: string;
  timings: (number | string)[];
}

export interface Verse {
  verseNumber: number;
  originalText: string;
  hindiText: string;
  audio?: VerseAudio;
}

export interface ChapterData {
  bookId: string;
  chapterNumber: number;
  chapterName: string;
  verses: Verse[];
}

export interface ChapterSummary {
  chapterNumber: number;
  chapterName: string;
  totalVerses: number;
}
