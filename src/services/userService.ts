import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { User as FirebaseUser } from 'firebase/auth';
import { db, isFirebaseConfigured } from '../config/firebase';

export interface UserProfileDocument {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  createdAt: any;
  updatedAt: any;
}

/**
 * Creates or updates the user document in Firestore under `users/{uid}`.
 * Preserves `createdAt` on subsequent logins.
 */
export async function syncUserDocument(user: FirebaseUser): Promise<void> {
  if (!isFirebaseConfigured) {
    // If running in development without Firebase credentials yet
    return;
  }

  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // First-time user creation
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName || 'Seeker',
        email: user.email || '',
        photoURL: user.photoURL || null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      // Existing user: update profile fields without overwriting createdAt
      await setDoc(
        userRef,
        {
          displayName: user.displayName || userSnap.data()?.displayName || 'Seeker',
          email: user.email || userSnap.data()?.email || '',
          photoURL: user.photoURL || userSnap.data()?.photoURL || null,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    }
  } catch (error) {
    console.warn('[userService] Failed to sync user document to Firestore:', error);
  }
}
