import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../config/firebase';
import { syncUserDocument } from '../services/userService';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  clearError: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Single source of truth: Firebase onAuthStateChanged
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        setUser(currentUser);
        setLoading(false);

        if (currentUser) {
          // Sync profile to Firestore in the background
          try {
            await syncUserDocument(currentUser);
          } catch (syncErr) {
            console.warn('[AuthProvider] User sync error:', syncErr);
          }
        }
      },
      (authError) => {
        console.error('[AuthProvider] Auth state listener error:', authError);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setError(null);

    if (!isFirebaseConfigured) {
      setError(
        'Firebase is not yet configured with your project credentials. Please add your EXPO_PUBLIC_FIREBASE_* keys to .env'
      );
      return;
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await syncUserDocument(result.user);
      }
    } catch (err: any) {
      const errorCode = err?.code;
      // Handle user cancellation gracefully without error state
      if (
        errorCode === 'auth/popup-closed-by-user' ||
        errorCode === 'auth/cancelled-popup-request' ||
        errorCode === 'auth/popup-blocked'
      ) {
        // User voluntarily closed the popup; do not display an error
        return;
      }

      if (errorCode === 'auth/network-request-failed') {
        setError('Network unavailable. Please check your internet connection.');
        return;
      }

      if (errorCode === 'auth/operation-not-allowed') {
        setError(
          'Google Sign-In is not enabled in your Firebase Console. Please enable Google provider in Firebase Authentication.'
        );
        return;
      }

      setError(
        err?.message || 'Unable to complete Google Sign-In. Please try again.'
      );
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await firebaseSignOut(auth);
    } catch (err: any) {
      console.error('[AuthProvider] Sign out error:', err);
      setError('Failed to sign out. Please try again.');
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signInWithGoogle,
        signOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
