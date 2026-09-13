import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';

const KEY_LAST_CHAPTER = '@vos_last_read_chapter';
const KEY_LAST_VERSE = '@vos_last_read_verse';
const KEY_CHAPTER_PROGRESS = '@vos_chapter_progress';

export interface SavedReadingProgress {
  lastChapter: number;
  lastVerse: number;
  progress: Record<number, number>;
}

/**
 * Loads the saved reading progress from local storage (AsyncStorage)
 * and merges with Cloud Firestore if user is authenticated.
 */
export async function loadReadingProgress(userId?: string | null): Promise<SavedReadingProgress> {
  let lastChapter = 1;
  let lastVerse = 1;
  let progress: Record<number, number> = { 1: 1 };

  try {
    const [storedChapter, storedVerse, storedProgress] = await Promise.all([
      AsyncStorage.getItem(KEY_LAST_CHAPTER),
      AsyncStorage.getItem(KEY_LAST_VERSE),
      AsyncStorage.getItem(KEY_CHAPTER_PROGRESS),
    ]);

    if (storedChapter) {
      const parsedCh = parseInt(storedChapter, 10);
      if (!isNaN(parsedCh) && parsedCh > 0) {
        lastChapter = parsedCh;
      }
    }
    if (storedVerse) {
      const parsedV = parseInt(storedVerse, 10);
      if (!isNaN(parsedV) && parsedV > 0) {
        lastVerse = parsedV;
      }
    }
    if (storedProgress) {
      try {
        const parsedProg = JSON.parse(storedProgress);
        if (parsedProg && typeof parsedProg === 'object') {
          progress = parsedProg;
        }
      } catch {}
    }
  } catch (err) {
    console.warn('[progressService] Failed to load local progress:', err);
  }

  // If authenticated and Firestore is configured, check for cloud-synced progress
  if (userId && isFirebaseConfigured) {
    try {
      const userRef = doc(db, 'users', userId);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const data = snap.data();
        if (data?.lastReadChapter) {
          lastChapter = data.lastReadChapter;
        }
        if (data?.lastReadVerse) {
          lastVerse = data.lastReadVerse;
        }
        if (data?.chapterProgress && typeof data.chapterProgress === 'object') {
          progress = { ...progress, ...data.chapterProgress };
        }
      }
    } catch (cloudErr) {
      // Gracefully fallback to local storage if offline
      console.warn('[progressService] Failed to sync progress from Firestore:', cloudErr);
    }
  }

  return { lastChapter, lastVerse, progress };
}

/**
 * Saves the current reading/listening progress to AsyncStorage and Firestore.
 */
export async function saveReadingProgress(
  chapterNumber: number,
  verseNumber: number,
  userId?: string | null,
  currentProgressMap?: Record<number, number>
): Promise<Record<number, number>> {
  const updatedProgress: Record<number, number> = {
    ...(currentProgressMap || {}),
  };

  const existingMax = updatedProgress[chapterNumber] || 0;
  if (verseNumber > existingMax) {
    updatedProgress[chapterNumber] = verseNumber;
  }

  try {
    await Promise.all([
      AsyncStorage.setItem(KEY_LAST_CHAPTER, chapterNumber.toString()),
      AsyncStorage.setItem(KEY_LAST_VERSE, verseNumber.toString()),
      AsyncStorage.setItem(KEY_CHAPTER_PROGRESS, JSON.stringify(updatedProgress)),
    ]);
  } catch (err) {
    console.warn('[progressService] Failed to persist progress locally:', err);
  }

  // Save to Firestore if user is authenticated
  if (userId && isFirebaseConfigured) {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(
        userRef,
        {
          lastReadChapter: chapterNumber,
          lastReadVerse: verseNumber,
          chapterProgress: updatedProgress,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (cloudErr) {
      console.warn('[progressService] Failed to sync progress to Firestore:', cloudErr);
    }
  }

  return updatedProgress;
}
