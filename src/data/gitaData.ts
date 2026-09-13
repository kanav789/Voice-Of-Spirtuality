import { ChapterData, ChapterSummary } from '../types/gita';

import chapter01 from '../../books/gita/chapter-01.json';
import chapter02 from '../../books/gita/chapter-02.json';
import chapter03 from '../../books/gita/chapter-03.json';
import chapter04 from '../../books/gita/chapter-04.json';
import chapter05 from '../../books/gita/chapter-05.json';
import chapter06 from '../../books/gita/chapter-06.json';
import chapter07 from '../../books/gita/chapter-07.json';
import chapter08 from '../../books/gita/chapter-08.json';
import chapter09 from '../../books/gita/chapter-09.json';
import chapter10 from '../../books/gita/chapter-10.json';

const chapterMap: Record<number, ChapterData> = {
  1: chapter01 as ChapterData,
  2: chapter02 as ChapterData,
  3: chapter03 as ChapterData,
  4: chapter04 as ChapterData,
  5: chapter05 as ChapterData,
  6: chapter06 as ChapterData,
  7: chapter07 as ChapterData,
  8: chapter08 as ChapterData,
  9: chapter09 as ChapterData,
  10: chapter10 as ChapterData,
};

/**
 * Returns dynamic chapter summaries extracted directly from the chapter JSONs.
 */
export function getAllChaptersSummary(): ChapterSummary[] {
  return Object.values(chapterMap)
    .sort((a, b) => a.chapterNumber - b.chapterNumber)
    .map((ch) => ({
      chapterNumber: ch.chapterNumber,
      chapterName: ch.chapterName,
      totalVerses: ch.verses.length,
    }));
}

/**
 * Retrieves a full chapter with its verses directly from the JSON.
 */
export function getChapter(chapterNumber: number): ChapterData | undefined {
  return chapterMap[chapterNumber];
}

/**
 * Returns total count of chapters currently available.
 */
export function getChaptersCount(): number {
  return Object.keys(chapterMap).length;
}

/**
 * Computes total verses available across all loaded chapters.
 */
export function getTotalVersesCount(): number {
  return Object.values(chapterMap).reduce((sum, ch) => sum + ch.verses.length, 0);
}
