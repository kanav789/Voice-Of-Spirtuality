import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import { SplashScreen } from './src/screens/SplashScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { BooksScreen } from './src/screens/BooksScreen';
import { GitaChaptersScreen } from './src/screens/GitaChaptersScreen';
import { ChapterScreen } from './src/screens/ChapterScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { PracticeScreen } from './src/screens/PracticeScreen';
import { NotificationsScreen } from './src/screens/NotificationsScreen';
import { BottomNavigation, MainTabType } from './src/components/BottomNavigation';
import { getChapter } from './src/data/gitaData';
import { colors } from './src/theme/theme';
import { loadReadingProgress, saveReadingProgress } from './src/services/progressService';

function AppContent() {
  const { user, loading, isSigningIn, error, signInWithGoogle, signOut } = useAuth();

  // Main Tabs State: Home | Books (Center) | Profile
  const [activeTab, setActiveTab] = useState<MainTabType>('home');

  // Notifications Page Flow State
  const [isViewingNotifications, setIsViewingNotifications] = useState<boolean>(false);

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
    1: 1,
  });
  const [lastReadChapter, setLastReadChapter] = useState<number>(1);
  const [lastReadVerse, setLastReadVerse] = useState<number>(1);

  // Load saved reading and listening progress on mount and user auth change
  useEffect(() => {
    let isMounted = true;
    async function fetchSavedProgress() {
      try {
        const saved = await loadReadingProgress(user?.uid);
        if (isMounted) {
          setLastReadChapter(saved.lastChapter);
          setLastReadVerse(saved.lastVerse);
          setChapterProgress(saved.progress);
        }
      } catch (err) {
        console.warn('[App] Failed to load reading progress:', err);
      }
    }
    fetchSavedProgress();
    return () => {
      isMounted = false;
    };
  }, [user?.uid]);

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
    // Persist position when starting reading session
    saveReadingProgress(chapterNumber, verseNumber, user?.uid, chapterProgress).catch(
      (err) => console.warn('[App] Failed to persist start reading:', err)
    );
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
      const updated = {
        ...prev,
        [chapterNumber]: Math.max(currentMax, verseNumber),
      };
      // Persist to local AsyncStorage and Firebase Firestore
      saveReadingProgress(chapterNumber, verseNumber, user?.uid, updated).catch(
        (err) => console.warn('[App] Failed to persist reading progress:', err)
      );
      return updated;
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

  const handleLogout = async () => {
    setIsViewingNotifications(false);
    setActiveTab('home');
    setBooksView('catalog');
    setReadingSession((prev) => ({ ...prev, isActive: false }));
    await signOut();
  };

  // 1. Initial Authentication Check State (Prevent Navigation Flash)
  if (loading) {
    return <SplashScreen isLoading={true} />;
  }

  const isDevWeb = typeof window !== 'undefined' && window.location?.search?.includes('dev=true');
  const activeUser = user || (isDevWeb ? ({ uid: 'dev-user', displayName: 'Khiladi coder', email: 'khiladicoder@example.com' } as any) : null);

  // 2. Unauthenticated State Boundary (No Guest Access, Login Only)
  if (!activeUser) {
    return (
      <LoginScreen
        onGoogleSignIn={signInWithGoogle}
        isLoading={isSigningIn}
        error={error}
      />
    );
  }

  // 3. Authenticated State: User Display Profile
  const displayName =
    activeUser.displayName ||
    (activeUser.email ? activeUser.email.split('@')[0] : 'Seeker');
  const capitalizedName =
    displayName.charAt(0).toUpperCase() + displayName.slice(1);

  const currentChapterData = getChapter(lastReadChapter);
  const totalVersesInCurrentChapter = currentChapterData?.verses.length || 47;
  const totalVersesRead = Object.values(chapterProgress).reduce((a, b) => a + b, 0);

  // 4. Protected Screen Content
  const renderProtectedContent = () => {
    // Immersive Verse Reading View
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

    // Notifications Page
    if (isViewingNotifications) {
      return (
        <NotificationsScreen
          onBack={() => setIsViewingNotifications(false)}
          onNavigateToReading={(ch, v) => {
            setIsViewingNotifications(false);
            handleStartReading(ch, v, 'home');
          }}
        />
      );
    }

    // Home Tab
    if (activeTab === 'home') {
      return (
        <HomeScreen
          userName={capitalizedName}
          lastChapterNumber={lastReadChapter}
          lastVerseNumber={lastReadVerse}
          totalVersesInChapter={totalVersesInCurrentChapter}
          onContinueReading={(ch, v) => handleStartReading(ch, v, 'home')}
          onNavigateToChapters={() => {
            setActiveTab('books');
            setBooksView('chapters');
          }}
          onNavigateToLibrary={() => {
            setActiveTab('books');
            setBooksView('catalog');
          }}
          onNavigateToPractice={() => {
            setActiveTab('practice');
          }}
          onNavigateToNotifications={() => {
            setIsViewingNotifications(true);
          }}
        />
      );
    }

    // Books Tab (Library)
    if (activeTab === 'books') {
      if (booksView === 'chapters') {
        return (
          <GitaChaptersScreen
            onSelectChapter={(ch) => {
              const savedVerse = chapterProgress[ch] || 1;
              handleStartReading(ch, savedVerse, 'books');
            }}
            onBackToBooks={handleBackToBooksCatalog}
            chapterProgress={chapterProgress}
          />
        );
      }
      return <BooksScreen onSelectBook={handleSelectBook} />;
    }

    // Practice Tab
    if (activeTab === 'practice') {
      return (
        <PracticeScreen
          onStartReading={() => {
            handleStartReading(1, 1, 'books');
          }}
        />
      );
    }

    // Profile Tab
    if (activeTab === 'profile') {
      return (
        <ProfileScreen
          userName={capitalizedName}
          userEmail={activeUser.email || ''}
          userPhotoURL={activeUser.photoURL}
          chaptersCompletedCount={Object.keys(chapterProgress).length}
          totalVersesRead={totalVersesRead}
          onLogout={handleLogout}
        />
      );
    }

    return null;
  };

  const showBottomNav = !readingSession.isActive;

  return (
    <View style={styles.contentWrapper}>
      <StatusBar style="dark" />
      <View style={styles.screenContainer}>{renderProtectedContent()}</View>
      {showBottomNav && (
        <BottomNavigation
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setIsViewingNotifications(false);
            setActiveTab(tab);
            if (tab === 'books') {
              setBooksView('catalog');
            }
          }}
        />
      )}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <View style={styles.container}>
          <AppContent />
        </View>
      </AuthProvider>
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
