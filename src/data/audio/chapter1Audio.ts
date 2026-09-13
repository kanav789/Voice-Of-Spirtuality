export interface VerseAudioTiming {
  verse: number;
  sanskritStart: number;
  sanskritEnd: number;
  verseEnd: number;
}

export interface ChapterAudioMetadata {
  chapter: number;
  titleAnnouncementEnd: number;
  totalDuration: number;
  audioSource: any;
  verses: VerseAudioTiming[];
}

/**
 * Acoustically verified timestamps for Bhagavad Gita Chapter 1 audio.
 * Audio duration: 805.88 seconds (13m 25.88s)
 * Opening title announcement: 0.00s - 2.62s (with 0.65s pause before Verse 1)
 */
export const chapter1AudioData: ChapterAudioMetadata = {
  chapter: 1,
  titleAnnouncementEnd: 2.62,
  totalDuration: 805.88,
  audioSource: require('../../../assets/audio/gita/chapter-1.mp3'),
  verses: [
    { verse: 1, sanskritStart: 3.27, sanskritEnd: 11.3, verseEnd: 21.02 },
    { verse: 2, sanskritStart: 21.83, sanskritEnd: 31.5, verseEnd: 36.93 },
    { verse: 3, sanskritStart: 37.59, sanskritEnd: 43.55, verseEnd: 53.62 },
    { verse: 4, sanskritStart: 54.48, sanskritEnd: 60.92, verseEnd: 71.88 },
    { verse: 5, sanskritStart: 72.6, sanskritEnd: 78.81, verseEnd: 87.63 },
    { verse: 6, sanskritStart: 88.36, sanskritEnd: 94.54, verseEnd: 105.26 },
    { verse: 7, sanskritStart: 105.41, sanskritEnd: 114.46, verseEnd: 122.91 },
    { verse: 8, sanskritStart: 123.64, sanskritEnd: 129.77, verseEnd: 138.43 },
    { verse: 9, sanskritStart: 139.1, sanskritEnd: 145.4, verseEnd: 155.52 },
    { verse: 10, sanskritStart: 155.59, sanskritEnd: 162.13, verseEnd: 176.95 },
    { verse: 11, sanskritStart: 177.04, sanskritEnd: 185.18, verseEnd: 191.98 },
    { verse: 12, sanskritStart: 192.66, sanskritEnd: 199.96, verseEnd: 211.24 },
    { verse: 13, sanskritStart: 212.0, sanskritEnd: 219.99, verseEnd: 228.37 },
    { verse: 14, sanskritStart: 229.06, sanskritEnd: 236.41, verseEnd: 245.44 },
    { verse: 15, sanskritStart: 246.16, sanskritEnd: 253.11, verseEnd: 262.65 },
    { verse: 16, sanskritStart: 263.43, sanskritEnd: 269.13, verseEnd: 279.53 },
    { verse: 17, sanskritStart: 279.92, sanskritEnd: 287.28, verseEnd: 296.45 },
    { verse: 18, sanskritStart: 297.23, sanskritEnd: 304.71, verseEnd: 314.81 },
    { verse: 19, sanskritStart: 315.66, sanskritEnd: 324.43, verseEnd: 330.03 },
    { verse: 20, sanskritStart: 330.71, sanskritEnd: 337.89, verseEnd: 351.13 },
    { verse: 21, sanskritStart: 351.88, sanskritEnd: 358.69, verseEnd: 364.52 },
    { verse: 22, sanskritStart: 365.35, sanskritEnd: 371.36, verseEnd: 377.87 },
    { verse: 23, sanskritStart: 378.67, sanskritEnd: 385.18, verseEnd: 394.94 },
    { verse: 24, sanskritStart: 395.8, sanskritEnd: 400.61, verseEnd: 410.65 },
    { verse: 25, sanskritStart: 411.3, sanskritEnd: 418.6, verseEnd: 426.25 },
    { verse: 26, sanskritStart: 426.99, sanskritEnd: 434.82, verseEnd: 446.4 },
    { verse: 27, sanskritStart: 447.22, sanskritEnd: 453.42, verseEnd: 461.94 },
    { verse: 28, sanskritStart: 463.0, sanskritEnd: 472.84, verseEnd: 484.48 },
    { verse: 29, sanskritStart: 484.75, sanskritEnd: 492.81, verseEnd: 507.73 },
    { verse: 30, sanskritStart: 508.42, sanskritEnd: 514.56, verseEnd: 521.79 },
    { verse: 31, sanskritStart: 522.41, sanskritEnd: 529.75, verseEnd: 536.77 },
    { verse: 32, sanskritStart: 537.47, sanskritEnd: 543.92, verseEnd: 554.85 },
    { verse: 33, sanskritStart: 555.57, sanskritEnd: 563.88, verseEnd: 572.66 },
    { verse: 34, sanskritStart: 573.35, sanskritEnd: 581.48, verseEnd: 590.76 },
    { verse: 35, sanskritStart: 591.61, sanskritEnd: 598.03, verseEnd: 606.95 },
    { verse: 36, sanskritStart: 607.65, sanskritEnd: 614.28, verseEnd: 625.45 },
    { verse: 37, sanskritStart: 625.76, sanskritEnd: 633.03, verseEnd: 642.96 },
    { verse: 38, sanskritStart: 643.9, sanskritEnd: 650.01, verseEnd: 657.06 },
    { verse: 39, sanskritStart: 657.75, sanskritEnd: 665.71, verseEnd: 673.37 },
    { verse: 40, sanskritStart: 674.18, sanskritEnd: 680.52, verseEnd: 687.89 },
    { verse: 41, sanskritStart: 688.59, sanskritEnd: 694.73, verseEnd: 705.13 },
    { verse: 42, sanskritStart: 705.86, sanskritEnd: 710.8, verseEnd: 721.1 },
    { verse: 43, sanskritStart: 721.9, sanskritEnd: 729.27, verseEnd: 736.0 },
    { verse: 44, sanskritStart: 736.88, sanskritEnd: 743.05, verseEnd: 750.35 },
    { verse: 45, sanskritStart: 751.29, sanskritEnd: 757.27, verseEnd: 768.48 },
    { verse: 46, sanskritStart: 769.31, sanskritEnd: 775.69, verseEnd: 783.08 },
    { verse: 47, sanskritStart: 783.19, sanskritEnd: 795.88, verseEnd: 805.88 },
  ],
};

/**
 * Given current playback position in seconds, returns the active verse number (1..47)
 * or null if within title announcement (0.00 to 3.27s) or past the end.
 */
export function getActiveVerseFromTime(currentTime: number): number | null {
  // Before Verse 1 Sanskrit start (3.27s), no verse is active (title announcement)
  if (currentTime < chapter1AudioData.verses[0].sanskritStart) {
    return null;
  }

  // After last verse ends, return null
  if (currentTime > chapter1AudioData.totalDuration) {
    return null;
  }

  // Find matching verse: active from its sanskritStart up to the next verse's sanskritStart
  for (let i = 0; i < chapter1AudioData.verses.length; i++) {
    const current = chapter1AudioData.verses[i];
    const next = chapter1AudioData.verses[i + 1];

    if (next) {
      if (currentTime >= current.sanskritStart && currentTime < next.sanskritStart) {
        return current.verse;
      }
    } else {
      // Last verse (47): active until totalDuration
      if (currentTime >= current.sanskritStart && currentTime <= chapter1AudioData.totalDuration) {
        return current.verse;
      }
    }
  }

  return null;
}

export type VerseAudioPhase = 'title' | 'sanskrit' | 'hindi' | 'pause' | 'ended';

/**
 * Returns whether the current audio playback position is playing the opening title,
 * the Sanskrit shloka, the Hindi explanation, an inter-verse pause, or ended.
 */
export function getVerseAudioPhase(currentTime: number): {
  verse: number | null;
  phase: VerseAudioPhase;
} {
  if (currentTime < chapter1AudioData.verses[0].sanskritStart) {
    return { verse: null, phase: 'title' };
  }
  if (currentTime > chapter1AudioData.totalDuration) {
    return { verse: null, phase: 'ended' };
  }

  for (let i = 0; i < chapter1AudioData.verses.length; i++) {
    const current = chapter1AudioData.verses[i];
    const next = chapter1AudioData.verses[i + 1];

    if (next) {
      if (currentTime >= current.sanskritStart && currentTime < next.sanskritStart) {
        if (currentTime <= current.sanskritEnd) {
          return { verse: current.verse, phase: 'sanskrit' };
        } else if (currentTime <= current.verseEnd) {
          return { verse: current.verse, phase: 'hindi' };
        } else {
          return { verse: current.verse, phase: 'pause' };
        }
      }
    } else {
      if (currentTime >= current.sanskritStart && currentTime <= chapter1AudioData.totalDuration) {
        if (currentTime <= current.sanskritEnd) {
          return { verse: current.verse, phase: 'sanskrit' };
        } else {
          return { verse: current.verse, phase: 'hindi' };
        }
      }
    }
  }

  return { verse: null, phase: 'ended' };
}
