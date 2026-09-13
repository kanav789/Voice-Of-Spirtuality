import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './src/screens/HomeScreen';
import { ChapterScreen } from './src/screens/ChapterScreen';
import { colors } from './src/theme/theme';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'chapter'>('home');
  const [selectedChapterNumber, setSelectedChapterNumber] = useState<number | null>(null);
  const [chapterProgress, setChapterProgress] = useState<Record<number, number>>({});

  const handleSelectChapter = (chapterNumber: number) => {
    setSelectedChapterNumber(chapterNumber);
    setCurrentScreen('chapter');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedChapterNumber(null);
  };

  const handleVerseRead = (chapterNumber: number, verseNumber: number) => {
    setChapterProgress((prev) => {
      const currentMax = prev[chapterNumber] || 0;
      if (verseNumber > currentMax) {
        return { ...prev, [chapterNumber]: verseNumber };
      }
      return prev;
    });
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="dark" />
        {currentScreen === 'chapter' && selectedChapterNumber !== null ? (
          <ChapterScreen
            chapterNumber={selectedChapterNumber}
            onBack={handleBackToHome}
            onVerseRead={handleVerseRead}
          />
        ) : (
          <HomeScreen
            onSelectChapter={handleSelectChapter}
            chapterProgress={chapterProgress}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.warmWhite,
  },
});
