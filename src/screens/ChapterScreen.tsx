import React, { useRef, useState, useEffect } from 'react';
import {
  ActivityIndicator,
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
import { useChapterAudio } from '../hooks/useChapterAudio';

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

interface ChapterScreenProps {
  chapterNumber: number;
  initialVerseNumber?: number;
  onBack: () => void;
  onVerseRead?: (chapterNumber: number, verseNumber: number) => void;
}

export const ChapterScreen: React.FC<ChapterScreenProps> = ({
  chapterNumber,
  initialVerseNumber = 1,
  onBack,
  onVerseRead,
}) => {
  const chapter = getChapter(chapterNumber);
  const initialIndex = initialVerseNumber && initialVerseNumber > 1 ? initialVerseNumber - 1 : 0;
  const [activeVerseIndex, setActiveVerseIndex] = useState(initialIndex);
  const flatListRef = useRef<FlatList<Verse>>(null);
  const lastScrolledVerseRef = useRef<number | null>(null);

  const {
    hasAudio,
    isPlaying,
    isLoading,
    loadingVerseNumber,
    currentTime,
    duration,
    activeVerseNumber,
    versePhase,
    togglePlay,
    seekToVerse,
    toggleVersePlay,
  } = useChapterAudio(chapterNumber);

  const totalVerses = chapter?.verses.length || 0;
  const isAudioActive = hasAudio && (isPlaying || currentTime > 0 || isLoading);

  // Synchronize scrolling and verse state with audio playback
  useEffect(() => {
    if (activeVerseNumber !== null && activeVerseNumber !== lastScrolledVerseRef.current) {
      lastScrolledVerseRef.current = activeVerseNumber;
      const index = activeVerseNumber - 1;
      setActiveVerseIndex(index);
      if (onVerseRead) {
        onVerseRead(chapterNumber, activeVerseNumber);
      }
      try {
        flatListRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.18,
        });
      } catch {
        flatListRef.current?.scrollToOffset({
          offset: index * 260,
          animated: true,
        });
      }
    }
  }, [activeVerseNumber, chapterNumber, onVerseRead]);

  // Reset scroll ref when audio is reset to beginning
  useEffect(() => {
    if (!isPlaying && currentTime === 0 && !isLoading) {
      lastScrolledVerseRef.current = null;
    }
  }, [isPlaying, currentTime, isLoading]);

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
          viewPosition: 0.2,
        });
      } catch {
        flatListRef.current?.scrollToOffset({
          offset: index * 260,
          animated: true,
        });
      }
    }
  };

  const handlePreviousVerse = () => {
    if (hasAudio && isAudioActive) {
      const currentNum = activeVerseNumber ?? 1;
      if (currentNum > 1) {
        seekToVerse(currentNum - 1);
      } else {
        seekToVerse(1);
      }
    } else if (activeVerseIndex > 0) {
      scrollToVerse(activeVerseIndex - 1);
    }
  };

  const handleNextVerse = () => {
    if (hasAudio && isAudioActive) {
      const currentNum = activeVerseNumber ?? 0;
      if (currentNum < totalVerses) {
        seekToVerse(currentNum + 1);
      }
    } else if (activeVerseIndex < totalVerses - 1) {
      scrollToVerse(activeVerseIndex + 1);
    }
  };

  const renderVerseItem = ({ item, index }: { item: Verse; index: number }) => {
    // Audio sync behavior:
    // Before 3.27s (title announcement): activeVerseNumber is null -> no verse active.
    // At 3.27s+: activeVerseNumber is 1..47 -> highlight matching verse through Sanskrit + Hindi.
    // When audio not active: fallback to manually selected index.
    const isActive = isAudioActive
      ? activeVerseNumber === item.verseNumber
      : index === activeVerseIndex;

    const isPlayingThisVerse = isPlaying && activeVerseNumber === item.verseNumber;
    const isLoadingThisVerse = isLoading && loadingVerseNumber === item.verseNumber;

    return (
      <VerseCard
        verse={item}
        isActive={isActive}
        isPlaying={isPlayingThisVerse}
        isLoading={isLoadingThisVerse}
        onSelect={() => scrollToVerse(index)}
        onTogglePlay={() => {
          if (hasAudio) {
            toggleVersePlay(item.verseNumber);
          }
        }}
      />
    );
  };

  const displayedVerseNumber = isAudioActive
    ? activeVerseNumber ?? 0
    : activeVerseIndex + 1;

  const progressLabel = isLoading
    ? loadingVerseNumber !== null
      ? `Buffering Verse ${loadingVerseNumber}...`
      : `Loading Audio...`
    : isAudioActive
    ? activeVerseNumber !== null
      ? `Playing Verse ${activeVerseNumber} of ${totalVerses}`
      : `Chapter 1 Announcement`
    : `Reading Verse ${activeVerseIndex + 1} of ${totalVerses}`;

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

        {/* Spiritual Audio Player Bar */}
        {hasAudio && (
          <View style={styles.audioBar}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={togglePlay}
              disabled={isLoading && !isPlaying}
              style={[styles.audioPlayButton, isPlaying && styles.audioPlayButtonActive]}
              accessibilityRole="button"
              accessibilityLabel={
                isLoading
                  ? 'Loading chapter audio'
                  : isPlaying
                  ? 'Pause chapter audio'
                  : 'Play chapter audio'
              }
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={colors.pureWhite} />
              ) : (
                <Text style={[styles.audioPlayIcon, isPlaying && styles.audioPlayIconActive]}>
                  {isPlaying ? '⏸' : '▶'}
                </Text>
              )}
            </TouchableOpacity>

            <View style={styles.audioInfo}>
              <Text style={styles.audioStatusLabel} numberOfLines={1}>
                {isLoading
                  ? loadingVerseNumber !== null
                    ? `Loading Verse ${loadingVerseNumber} Audio...`
                    : 'Loading Chapter 1 Audio...'
                  : isPlaying || currentTime > 0
                  ? activeVerseNumber !== null
                    ? `Verse ${activeVerseNumber} • ${
                        versePhase.phase === 'sanskrit'
                          ? 'Sanskrit Recitation'
                          : versePhase.phase === 'hindi'
                          ? 'Hindi Translation'
                          : 'Recitation'
                      }`
                    : 'Opening Title Announcement'
                  : 'Chapter 1 Audio (47 Verses)'}
              </Text>
              <Text style={styles.audioTime}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </Text>
            </View>
          </View>
        )}


        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <ProgressIndicator
            current={displayedVerseNumber}
            total={totalVerses}
            label={progressLabel}
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
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
              viewPosition: 0.18,
            });
          }, 150);
        }}
      />

      {/* Bottom Sequential Verse Navigation Controls */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handlePreviousVerse}
          disabled={!isAudioActive && activeVerseIndex === 0}
          style={[
            styles.navButton,
            !isAudioActive && activeVerseIndex === 0 && styles.navButtonDisabled,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Previous verse"
        >
          <Text
            style={[
              styles.navButtonText,
              !isAudioActive && activeVerseIndex === 0 && styles.navButtonTextDisabled,
            ]}
          >
            ‹ Prev
          </Text>
        </TouchableOpacity>

        {/* Active Verse Indicator */}
        <View style={styles.activeVerseIndicator}>
          <Text style={styles.activeVerseLabel}>CURRENT VERSE</Text>
          <Text style={styles.activeVerseNumber}>
            {isAudioActive
              ? activeVerseNumber !== null
                ? `${activeVerseNumber} / ${totalVerses}`
                : `— / ${totalVerses}`
              : `${activeVerseIndex + 1} / ${totalVerses}`}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleNextVerse}
          disabled={!isAudioActive && activeVerseIndex === totalVerses - 1}
          style={[
            styles.navButton,
            !isAudioActive &&
              activeVerseIndex === totalVerses - 1 &&
              styles.navButtonDisabled,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Next verse"
        >
          <Text
            style={[
              styles.navButtonText,
              !isAudioActive &&
                activeVerseIndex === totalVerses - 1 &&
                styles.navButtonTextDisabled,
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
  audioBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.goldBorder,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    marginTop: spacing.xs + 2,
    marginBottom: 2,
  },
  audioPlayButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm + 2,
    shadowColor: colors.primaryGold,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  audioPlayButtonActive: {
    backgroundColor: colors.darkGold,
  },
  audioPlayIcon: {
    fontSize: 12,
    color: colors.pureWhite,
    marginLeft: 2,
  },
  audioPlayIconActive: {
    marginLeft: 0,
  },
  audioInfo: {
    flex: 1,
  },
  audioStatusLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.darkGold,
    letterSpacing: 0.2,
  },
  audioTime: {
    fontSize: 11,
    color: colors.secondaryText,
    marginTop: 1,
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
