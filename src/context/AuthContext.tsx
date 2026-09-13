import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithPopup,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../config/firebase';
import { syncUserDocument } from '../services/userService';

// Complete auth session for web and redirect returns
WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  isSigningIn: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isSigningIn: false,
  error: null,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  clearError: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Single source of truth: Firebase onAuthStateChanged
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        setUser(currentUser);
        setLoading(false);
        setIsSigningIn(false);

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
        setIsSigningIn(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setError(null);

    if (!isFirebaseConfigured) {
      setError(
        'Firebase is not yet configured with your project credentials. Please verify your EXPO_PUBLIC_FIREBASE_* keys in .env'
      );
      return;
    }

    setIsSigningIn(true);

    try {
      if (Platform.OS === 'web') {
        // Direct Firebase Web Popup OAuth
        const result = await signInWithPopup(auth, googleProvider);
        if (result.user) {
          await syncUserDocument(result.user);
        }
      } else {
        // Expo Native OAuth flow via expo-auth-session / expo-web-browser
        const clientId = Platform.select({
          ios: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
          android: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
          default: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
        });

        if (!clientId) {
          throw new Error(
            'Google OAuth client ID is not configured. Please set EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID or EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID in .env'
          );
        }

        const redirectUri = AuthSession.makeRedirectUri({
          scheme: 'voice-of-spirituality',
        });

        const authRequest = new AuthSession.AuthRequest({
          clientId,
          scopes: ['openid', 'profile', 'email'],
          responseType: AuthSession.ResponseType.IdToken,
          redirectUri,
        });

        const res = await authRequest.promptAsync(Google.discovery);

        if (res.type === 'success' && res.params?.id_token) {
          const credential = GoogleAuthProvider.credential(res.params.id_token);
          const result = await signInWithCredential(auth, credential);
          if (result.user) {
            await syncUserDocument(result.user);
          }
        } else if (res.type === 'cancel' || res.type === 'dismiss') {
          // Voluntarily cancelled by user
          return;
        } else if (res.type === 'error') {
          throw new Error(res.error?.message || 'Native Google authentication failed.');
        }
      }
    } catch (err: any) {
      const errorCode = err?.code;
      // Handle user cancellation gracefully without error banner
      if (
        errorCode === 'auth/popup-closed-by-user' ||
        errorCode === 'auth/cancelled-popup-request' ||
        errorCode === 'auth/popup-blocked' ||
        err?.message?.includes('user_cancelled') ||
        err?.message?.includes('cancelled')
      ) {
        return;
      }

      if (errorCode === 'auth/network-request-failed') {
        setError('Network unavailable. Please check your internet connection.');
        return;
      }

      if (errorCode === 'auth/operation-not-allowed') {
        setError(
          'Google Sign-In is not enabled in your Firebase Console. Please enable Google provider in Authentication.'
        );
        return;
      }

      setError(
        err?.message || 'Unable to complete Google Sign-In. Please try again.'
      );
    } finally {
      setIsSigningIn(false);
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
        isSigningIn,
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
