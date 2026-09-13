import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChapterSummary } from '../types/gita';
import { getAllChaptersSummary, getTotalVersesCount } from '../data/gitaData';
import { ChapterCard } from '../components/ChapterCard';
import { colors, radius, spacing, typography } from '../theme/theme';

interface HomeScreenProps {
  onSelectChapter: (chapterNumber: number) => void;
  chapterProgress?: Record<number, number>; // map of chapterNumber -> lastReadVerseNumber
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectChapter,
  chapterProgress = {},
}) => {
  const chapters = getAllChaptersSummary();
  const totalVerses = getTotalVersesCount();

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Spiritual Motif */}
      <View style={styles.emblemContainer}>
        <View style={styles.emblemRing}>
          <Text style={styles.emblemText}>ॐ</Text>
        </View>
      </View>

      {/* Main Title */}
      <Text style={styles.title}>Bhagavad Gita</Text>

      {/* Subtitle / Tagline */}
      <Text style={styles.tagline}>Read. Listen. Understand. Practice.</Text>

      {/* Decorative Gold Accent Bar */}
      <View style={styles.accentBar}>
        <View style={styles.accentDot} />
        <View style={styles.accentLine} />
        <View style={styles.accentDot} />
      </View>

      {/* Metadata Pill */}
      <View style={styles.overviewBadge}>
        <Text style={styles.overviewText}>
          {chapters.length} Chapters • {totalVerses} Verses
        </Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Chapters</Text>
        <Text style={styles.sectionSubtitle}>Select a chapter to begin reading</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: ChapterSummary }) => {
    const lastRead = chapterProgress[item.chapterNumber] || 0;
    const progressPercent = item.totalVerses > 0 ? (lastRead / item.totalVerses) * 100 : 0;

    return (
      <ChapterCard
        chapter={item}
        onPress={() => onSelectChapter(item.chapterNumber)}
        progressPercent={progressPercent}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={chapters}
        keyExtractor={(item) => `chapter-${item.chapterNumber}`}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.warmWhite,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  emblemContainer: {
    marginBottom: spacing.sm,
  },
  emblemRing: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.goldBorder,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emblemText: {
    fontSize: 26,
    color: colors.darkGold,
    fontWeight: '600',
    marginTop: -2,
  },
  title: {
    ...typography.headerTitle,
    fontSize: 28,
    textAlign: 'center',
    color: colors.primaryText,
    marginBottom: 4,
  },
  tagline: {
    ...typography.headerSubtitle,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  accentBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    marginBottom: spacing.md,
  },
  accentLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.goldBorder,
    marginHorizontal: 8,
  },
  accentDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.primaryGold,
  },
  overviewBadge: {
    backgroundColor: colors.pureWhite,
    borderColor: colors.goldBorder,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    marginBottom: spacing.lg,
  },
  overviewText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.darkGold,
    letterSpacing: 0.5,
  },
  sectionHeader: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primaryText,
    letterSpacing: 0.3,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 2,
  },
});
