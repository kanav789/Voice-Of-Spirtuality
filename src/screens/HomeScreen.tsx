import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../theme/theme';
import { ProgressIndicator } from '../components/ProgressIndicator';

interface HomeScreenProps {
  userName?: string;
  lastChapterNumber: number;
  lastVerseNumber: number;
  totalVersesInChapter: number;
  onContinueReading: (chapterNumber: number, verseNumber: number) => void;
  onExploreBooks: () => void;
  onDailyVersePress?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName = 'Seeker',
  lastChapterNumber = 1,
  lastVerseNumber = 1,
  totalVersesInChapter = 47,
  onContinueReading,
  onExploreBooks,
  onDailyVersePress,
}) => {
  // Determine time-appropriate greeting
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header / Greeting */}
        <View style={styles.greetingHeader}>
          <View>
            <Text style={styles.greetingTitle}>
              {getGreeting()}, {userName} 🙏
            </Text>
            <Text style={styles.greetingSubtitle}>
              Continue your journey through ancient wisdom.
            </Text>
          </View>

          <View style={styles.headerEmblem}>
            <Text style={styles.headerEmblemText}>ॐ</Text>
          </View>
        </View>

        {/* 1. Continue Reading Card */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>CONTINUE READING</Text>

          <View style={styles.continueCard}>
            <View style={styles.continueCardTop}>
              <View style={styles.bookBadge}>
                <Text style={styles.bookBadgeText}>BHAGAVAD GITA</Text>
              </View>
              <Text style={styles.chapterVerseBadge}>
                Chapter {lastChapterNumber} · Verse {lastVerseNumber}
              </Text>
            </View>

            <Text style={styles.continueTitle}>
              {lastChapterNumber === 1
                ? 'Arjuna Vishada Yoga'
                : `Chapter ${lastChapterNumber}`}
            </Text>

            <View style={styles.progressRow}>
              <ProgressIndicator
                current={lastVerseNumber}
                total={totalVersesInChapter}
                label={`Progress: ${lastVerseNumber} of ${totalVersesInChapter} verses`}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.continueButton}
              onPress={() => onContinueReading(lastChapterNumber, lastVerseNumber)}
              accessibilityRole="button"
              accessibilityLabel="Continue reading Bhagavad Gita"
            >
              <Text style={styles.continueButtonText}>Continue Reading</Text>
              <Text style={styles.continueArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. Today's Wisdom Card */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>TODAY'S WISDOM</Text>

          <View style={styles.wisdomCard}>
            <View style={styles.quoteIconRow}>
              <Text style={styles.quoteMark}>“</Text>
            </View>

            <Text style={styles.quoteSanskrit}>
              कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।{'\n'}मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥
            </Text>

            <View style={styles.wisdomDivider} />

            <Text style={styles.quoteEnglish}>
              You have a right only to perform your prescribed duty, but never to the fruits of action. Never let the fruits of action be your motive, nor let your attachment be to inaction.
            </Text>

            <View style={styles.quoteCitationRow}>
              <View style={styles.citationDot} />
              <Text style={styles.quoteCitation}>Chapter 2 · Verse 47</Text>
            </View>
          </View>
        </View>

        {/* 3. Daily Gita Invitation */}
        <View style={styles.sectionContainer}>
          <View style={styles.dailyCard}>
            <View style={styles.dailyLeft}>
              <Text style={styles.dailyHeading}>Daily Verse</Text>
              <Text style={styles.dailySub}>
                Take 2 minutes today to reflect and center your mind.
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.dailyAction}
              onPress={() => onContinueReading(lastChapterNumber, lastVerseNumber)}
            >
              <Text style={styles.dailyActionText}>Begin</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. Explore Scriptures Shortcut */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.exploreBanner}
          onPress={onExploreBooks}
        >
          <View style={styles.exploreTextGroup}>
            <Text style={styles.exploreTitle}>Explore All Sacred Scriptures</Text>
            <Text style={styles.exploreSub}>
              Discover timeless wisdom from Gita, Upanishads & more.
            </Text>
          </View>
          <View style={styles.exploreArrowCircle}>
            <Text style={styles.exploreArrow}>›</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
  },
  greetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingTop: spacing.xs,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: 4,
  },
  greetingSubtitle: {
    fontSize: 13,
    color: colors.secondaryText,
  },
  headerEmblem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.borderGold,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerEmblemText: {
    fontSize: 22,
    color: colors.darkGold,
    fontWeight: '600',
    marginTop: -2,
  },
  sectionContainer: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.darkGold,
    letterSpacing: 1,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  continueCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderColor: colors.border,
    borderWidth: 1,
    padding: spacing.lg,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  continueCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  bookBadge: {
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.borderGold,
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.xs,
  },
  bookBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.darkGold,
    letterSpacing: 0.5,
  },
  chapterVerseBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondaryText,
  },
  continueTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryText,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  progressRow: {
    marginVertical: spacing.xs,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.deepBlue,
    paddingVertical: 12,
    borderRadius: radius.pill,
    marginTop: spacing.md,
  },
  continueButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.surface,
    marginRight: 6,
  },
  continueArrow: {
    fontSize: 16,
    color: colors.primaryGold,
    fontWeight: '600',
  },
  wisdomCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderColor: colors.borderGold,
    borderWidth: 1,
    padding: spacing.lg,
    shadowColor: colors.goldShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  quoteIconRow: {
    marginBottom: -6,
  },
  quoteMark: {
    fontSize: 32,
    color: colors.darkGold,
    fontFamily: 'serif',
    lineHeight: 32,
  },
  quoteSanskrit: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1813',
    lineHeight: 24,
    marginBottom: spacing.sm,
  },
  wisdomDivider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginVertical: spacing.sm,
  },
  quoteEnglish: {
    fontSize: 13.5,
    color: colors.secondaryText,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  quoteCitationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  citationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primaryGold,
    marginRight: 6,
  },
  quoteCitation: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.darkGold,
    letterSpacing: 0.5,
  },
  dailyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.borderGold,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md + 2,
  },
  dailyLeft: {
    flex: 1,
    paddingRight: spacing.md,
  },
  dailyHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: 2,
  },
  dailySub: {
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 16,
  },
  dailyAction: {
    backgroundColor: colors.primaryGold,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
  },
  dailyActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.surface,
  },
  exploreBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md + 2,
    marginTop: spacing.xs,
  },
  exploreTextGroup: {
    flex: 1,
  },
  exploreTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.deepBlue,
    marginBottom: 2,
  },
  exploreSub: {
    fontSize: 12,
    color: colors.secondaryText,
  },
  exploreArrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.borderGold,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  exploreArrow: {
    fontSize: 18,
    color: colors.darkGold,
    marginTop: -2,
  },
});
