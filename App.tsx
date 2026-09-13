import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SplashScreen } from './src/screens/SplashScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { BooksScreen } from './src/screens/BooksScreen';
import { GitaChaptersScreen } from './src/screens/GitaChaptersScreen';
import { ChapterScreen } from './src/screens/ChapterScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { BottomNavigation, MainTabType } from './src/components/BottomNavigation';
import { getChapter } from './src/data/gitaData';
import { AuthUser } from './src/types/user';
import { colors } from './src/theme/theme';

type AuthState = 'splash' | 'login' | 'authenticated';

export default function App() {
  // Authentication State
  const [authState, setAuthState] = useState<AuthState>('splash');
  const [user, setUser] = useState<AuthUser>({
    uid: 'firebase_uid_kanav_789',
    name: 'Kanav',
    email: 'kanav@sanctuary.in',
  });

  // Main Tabs State (Home | Books (Center) | Profile)
  const [activeTab, setActiveTab] = useState<MainTabType>('home');

  // Books Flow State: 'catalog' | 'chapters'
  const [booksView, setBooksView] = useState<'catalog' | 'chapters'>('catalog');

  // Active Reading Flow State
  const [readingSession, setReadingSession] = useState<{
    isActive: boolean;
    chapterNumber: number;
    verseNumber: number;
    returnTo: 'home' | 'books';
  }>({
    isActive: false,
    chapterNumber: 1,
    verseNumber: 1,
    returnTo: 'home',
  });

  // Reading Progress Storage
  const [chapterProgress, setChapterProgress] = useState<Record<number, number>>({
    1: 4,
  });
  const [lastReadChapter, setLastReadChapter] = useState<number>(1);
  const [lastReadVerse, setLastReadVerse] = useState<number>(1);

  // Auth Handlers
  const handleSplashContinue = () => {
    // If already authenticated, directly navigate to main app; otherwise to Google Sign In
    if (authState === 'authenticated') {
      setActiveTab('home');
    } else {
      setAuthState('login');
    }
  };

  const handleGoogleSignIn = () => {
    // Structured for Firebase Authentication (React Native / Expo -> Google Sign-In -> Firebase user UID)
    setUser({
      uid: 'firebase_uid_kanav_789',
      name: 'Kanav',
      email: 'kanav@sanctuary.in',
      photoURL: undefined,
    });
    setAuthState('authenticated');
  };

  const handleLogout = () => {
    setAuthState('login');
    setActiveTab('home');
    setBooksView('catalog');
    setReadingSession((prev) => ({ ...prev, isActive: false }));
  };

  // Reading Handlers
  const handleStartReading = (
    chapterNumber: number,
    verseNumber: number = 1,
    returnTo: 'home' | 'books' = 'books'
  ) => {
    setLastReadChapter(chapterNumber);
    setLastReadVerse(verseNumber);
    setReadingSession({
      isActive: true,
      chapterNumber,
      verseNumber,
      returnTo,
    });
  };

  const handleCloseReading = () => {
    const returnTarget = readingSession.returnTo;
    setReadingSession((prev) => ({ ...prev, isActive: false }));
    if (returnTarget === 'home') {
      setActiveTab('home');
    } else {
      setActiveTab('books');
      setBooksView('chapters');
    }
  };

  const handleVerseRead = (chapterNumber: number, verseNumber: number) => {
    setLastReadChapter(chapterNumber);
    setLastReadVerse(verseNumber);
    setChapterProgress((prev) => {
      const currentMax = prev[chapterNumber] || 0;
      if (verseNumber > currentMax) {
        return { ...prev, [chapterNumber]: verseNumber };
      }
      return prev;
    });
  };

  // Books Catalog Handlers
  const handleSelectBook = (bookId: string) => {
    if (bookId === 'gita') {
      setBooksView('chapters');
    }
  };

  const handleBackToBooksCatalog = () => {
    setBooksView('catalog');
  };

  // Stats
  const currentChapterData = getChapter(lastReadChapter);
  const totalVersesInCurrentChapter = currentChapterData?.verses.length || 47;
  const totalVersesRead = Object.values(chapterProgress).reduce((a, b) => a + b, 0);

  // Render Screen Content
  const renderCurrentContent = () => {
    // 1. Splash Screen
    if (authState === 'splash') {
      return <SplashScreen onContinue={handleSplashContinue} />;
    }

    // 2. Authentication: Google Sign In Only
    if (authState === 'login') {
      return <LoginScreen onGoogleSignIn={handleGoogleSignIn} />;
    }

    // 3. Immersive Chapter Verse Reading Screen
    if (readingSession.isActive) {
      return (
        <ChapterScreen
          chapterNumber={readingSession.chapterNumber}
          initialVerseNumber={readingSession.verseNumber}
          onBack={handleCloseReading}
          onVerseRead={handleVerseRead}
        />
      );
    }

    // 4. Main App Tabs (Home | Books (Center) | Profile)
    if (activeTab === 'home') {
      return (
        <HomeScreen
          userName={user.name}
          lastChapterNumber={lastReadChapter}
          lastVerseNumber={lastReadVerse}
          totalVersesInChapter={totalVersesInCurrentChapter}
          onContinueReading={(ch, v) => handleStartReading(ch, v, 'home')}
        />
      );
    }

    if (activeTab === 'books') {
      if (booksView === 'chapters') {
        return (
          <GitaChaptersScreen
            onSelectChapter={(ch) => handleStartReading(ch, 1, 'books')}
            onBackToBooks={handleBackToBooksCatalog}
            chapterProgress={chapterProgress}
          />
        );
      }
      return <BooksScreen onSelectBook={handleSelectBook} />;
    }

    if (activeTab === 'profile') {
      return (
        <ProfileScreen
          userName={user.name}
          userEmail={user.email}
          userPhotoURL={user.photoURL}
          chaptersCompletedCount={Object.keys(chapterProgress).length}
          totalVersesRead={totalVersesRead}
          onLogout={handleLogout}
        />
      );
    }

    return null;
  };

  const showBottomNav = authState === 'authenticated' && !readingSession.isActive;

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <StatusBar style="dark" />
          <View style={styles.screenContainer}>{renderCurrentContent()}</View>
          {showBottomNav && (
            <BottomNavigation
              activeTab={activeTab}
              onSelectTab={(tab) => {
                setActiveTab(tab);
                if (tab === 'books') {
                  setBooksView('catalog');
                }
              }}
            />
          )}
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 680,
    backgroundColor: colors.background,
  },
  screenContainer: {
    flex: 1,
  },
});
