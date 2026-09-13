import React, { useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getChapter } from '../data/gitaData';
import { Verse } from '../types/gita';
import { VerseCard } from '../components/VerseCard';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { colors, radius, spacing, typography } from '../theme/theme';

interface ChapterScreenProps {
  chapterNumber: number;
  onBack: () => void;
  onVerseRead?: (chapterNumber: number, verseNumber: number) => void;
}

export const ChapterScreen: React.FC<ChapterScreenProps> = ({
  chapterNumber,
  onBack,
  onVerseRead,
}) => {
  const chapter = getChapter(chapterNumber);
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);
  const [playingVerseNumber, setPlayingVerseNumber] = useState<number | null>(null);
  const flatListRef = useRef<FlatList<Verse>>(null);

  if (!chapter) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Chapter {chapterNumber} not found.</Text>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>‹ Return to Chapters</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const totalVerses = chapter.verses.length;
  const currentVerseNumber = chapter.verses[activeVerseIndex]?.verseNumber || 1;

  const scrollToVerse = (index: number) => {
    if (index >= 0 && index < totalVerses) {
      setActiveVerseIndex(index);
      const verseNum = chapter.verses[index].verseNumber;
      if (onVerseRead) {
        onVerseRead(chapterNumber, verseNum);
      }
      try {
        flatListRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.2, // position verse nicely in view
        });
      } catch (e) {
        // Fallback if offset calculation is pending layout
        flatListRef.current?.scrollToOffset({
          offset: index * 260,
          animated: true,
        });
      }
    }
  };

  const handlePreviousVerse = () => {
    if (activeVerseIndex > 0) {
      scrollToVerse(activeVerseIndex - 1);
    }
  };

  const handleNextVerse = () => {
    if (activeVerseIndex < totalVerses - 1) {
      scrollToVerse(activeVerseIndex + 1);
    }
  };

  const handleTogglePlay = (verseNumber: number) => {
    // Ready for audio playback integration
    setPlayingVerseNumber((prev) => (prev === verseNumber ? null : verseNumber));
  };

  const renderVerseItem = ({ item, index }: { item: Verse; index: number }) => {
    const isActive = index === activeVerseIndex;
    const isPlaying = playingVerseNumber === item.verseNumber;

    return (
      <VerseCard
        verse={item}
        isActive={isActive}
        isPlaying={isPlaying}
        onSelect={() => scrollToVerse(index)}
        onTogglePlay={() => handleTogglePlay(item.verseNumber)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Back to chapter list"
          >
            <Text style={styles.backArrow}>‹</Text>
            <Text style={styles.backButtonText}>Chapters</Text>
          </TouchableOpacity>

          <View style={styles.chapterBadge}>
            <Text style={styles.chapterBadgeText}>CHAPTER {chapter.chapterNumber}</Text>
          </View>
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.chapterTitle}>{chapter.chapterName}</Text>
          <Text style={styles.chapterMeta}>{totalVerses} Verses in total</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <ProgressIndicator
            current={activeVerseIndex + 1}
            total={totalVerses}
            label={`Reading Verse ${activeVerseIndex + 1} of ${totalVerses}`}
          />
        </View>
      </View>

      {/* Verses Scroll View */}
      <FlatList
        ref={flatListRef}
        data={chapter.verses}
        keyExtractor={(item) => `verse-${item.verseNumber}`}
        renderItem={renderVerseItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={11}
        onScrollToIndexFailed={(info) => {
          // Graceful fallback for scrollToIndex before all items are measured
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
              viewPosition: 0.2,
            });
          }, 150);
        }}
      />

      {/* Bottom Sequential Verse Navigation Controls */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handlePreviousVerse}
          disabled={activeVerseIndex === 0}
          style={[styles.navButton, activeVerseIndex === 0 && styles.navButtonDisabled]}
          accessibilityRole="button"
          accessibilityLabel="Previous verse"
        >
          <Text style={[styles.navButtonText, activeVerseIndex === 0 && styles.navButtonTextDisabled]}>
            ‹ Prev
          </Text>
        </TouchableOpacity>

        {/* Active Verse Indicator */}
        <View style={styles.activeVerseIndicator}>
          <Text style={styles.activeVerseLabel}>CURRENT VERSE</Text>
          <Text style={styles.activeVerseNumber}>
            {currentVerseNumber} / {totalVerses}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleNextVerse}
          disabled={activeVerseIndex === totalVerses - 1}
          style={[
            styles.navButton,
            activeVerseIndex === totalVerses - 1 && styles.navButtonDisabled,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Next verse"
        >
          <Text
            style={[
              styles.navButtonText,
              activeVerseIndex === totalVerses - 1 && styles.navButtonTextDisabled,
            ]}
          >
            Next ›
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.warmWhite,
  },
  header: {
    backgroundColor: colors.warmWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.goldBorderSubtle,
    paddingHorizontal: spacing.lg,
    paddingTop: Platform.OS === 'android' ? spacing.md : spacing.sm,
    paddingBottom: spacing.sm,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingRight: spacing.sm,
  },
  backArrow: {
    fontSize: 24,
    color: colors.darkGold,
    fontWeight: '600',
    marginRight: 4,
    marginTop: -2,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkGold,
  },
  chapterBadge: {
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.goldBorder,
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
  },
  chapterBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.darkGold,
    letterSpacing: 0.8,
  },
  titleRow: {
    marginVertical: spacing.xs,
  },
  chapterTitle: {
    ...typography.chapterTitle,
    fontSize: 22,
    color: colors.primaryText,
  },
  chapterMeta: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 2,
  },
  progressContainer: {
    marginTop: spacing.xs,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 90, // extra padding for sticky bottom bar
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.pureWhite,
    borderTopWidth: 1,
    borderTopColor: colors.goldBorder,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm + 2,
    paddingBottom: Platform.OS === 'ios' ? spacing.lg : spacing.md,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },
  navButton: {
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.goldBorder,
    borderWidth: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md + 4,
    borderRadius: radius.pill,
    minWidth: 84,
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#F8F8F8',
    borderColor: '#EAEAEA',
  },
  navButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.darkGold,
  },
  navButtonTextDisabled: {
    color: colors.disabledGold,
  },
  activeVerseIndicator: {
    alignItems: 'center',
  },
  activeVerseLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryText,
    letterSpacing: 0.8,
  },
  activeVerseNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primaryText,
    marginTop: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  errorText: {
    fontSize: 16,
    color: colors.primaryText,
    marginBottom: spacing.md,
  },
});
