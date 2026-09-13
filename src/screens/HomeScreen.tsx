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
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName = 'Kanav',
  lastChapterNumber = 1,
  lastVerseNumber = 1,
  totalVersesInChapter = 47,
  onContinueReading,
}) => {
  // Determine time-appropriate greeting
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const chapterTitleMap: Record<number, string> = {
    1: 'Arjuna Vishada Yoga',
    2: 'Sankhya Yoga',
    3: 'Karma Yoga',
    4: 'Jnana Karma Sanyasa Yoga',
    5: 'Karma Sanyasa Yoga',
    6: 'Dhyana Yoga',
    7: 'Jnana Vijnana Yoga',
    8: 'Aksara Brahma Yoga',
    9: 'Raja Vidya Raja Guhya Yoga',
    10: 'Vibhuti Yoga',
  };

  const currentChapterTitle =
    chapterTitleMap[lastChapterNumber] || `Chapter ${lastChapterNumber}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Personalized Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingTitle}>
            {getGreeting()}, {userName} 🙏
          </Text>
          <Text style={styles.greetingSubtitle}>
            Continue your journey through ancient wisdom.
          </Text>
        </View>

        {/* Distinctive Brand Mark Hierarchy */}
        <View style={styles.brandMarkContainer}>
          <View style={styles.omEmblemRing}>
            <Text style={styles.omEmblemText}>ॐ</Text>
          </View>

          <Text style={styles.brandTitle}>Bhagavad Gita</Text>
          <Text style={styles.brandTagline}>Read. Listen. Understand. Practice.</Text>

          <View style={styles.brandDivider}>
            <View style={styles.brandLine} />
            <Text style={styles.brandSymbol}>✦</Text>
            <View style={styles.brandLine} />
          </View>
        </View>

        {/* 1. Primary Action: CONTINUE READING */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>CONTINUE READING</Text>

          <View style={styles.continueCard}>
            <View style={styles.continueTopRow}>
              <Text style={styles.scriptureBadge}>BHAGAVAD GITA</Text>
              <Text style={styles.verseMetaBadge}>
                Chapter {lastChapterNumber} · Verse {lastVerseNumber}
              </Text>
            </View>

            <Text style={styles.chapterNameText}>{currentChapterTitle}</Text>

            <View style={styles.progressBlock}>
              <ProgressIndicator
                current={lastVerseNumber}
                total={totalVersesInChapter}
                label={`Progress: ${lastVerseNumber} of ${totalVersesInChapter} verses`}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.88}
              style={styles.continueButton}
              onPress={() => onContinueReading(lastChapterNumber, lastVerseNumber)}
              accessibilityRole="button"
              accessibilityLabel="Continue reading Bhagavad Gita"
            >
              <Text style={styles.continueButtonText}>Continue Reading</Text>
              <Text style={styles.continueButtonArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. Centerpiece: TODAY'S WISDOM */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>TODAY'S WISDOM</Text>

          <View style={styles.wisdomCard}>
            <Text style={styles.wisdomSanskrit}>
              कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।{'\n'}मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥
            </Text>

            <View style={styles.wisdomDivider} />

            <Text style={styles.wisdomMeaning}>
              You have a right only to perform your prescribed duty, but never to the fruits of action. Never let the fruits of action be your motive, nor let your attachment be to inaction.
            </Text>

            <View style={styles.citationRow}>
              <View style={styles.citationDot} />
              <Text style={styles.citationText}>Chapter 2 · Verse 47</Text>
            </View>
          </View>
        </View>
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
  greetingSection: {
    marginBottom: spacing.lg,
    paddingTop: spacing.xs,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primaryText,
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  greetingSubtitle: {
    fontSize: 13.5,
    color: colors.secondaryText,
    letterSpacing: 0.2,
  },
  brandMarkContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
  },
  omEmblemRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.borderGold,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    shadowColor: colors.goldShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  omEmblemText: {
    fontSize: 28,
    color: colors.darkGold,
    fontWeight: '600',
    marginTop: -2,
  },
  brandTitle: {
    ...typography.headerTitle,
    fontSize: 24,
    color: colors.primaryText,
    letterSpacing: 0.5,
    marginBottom: 2,
    textAlign: 'center',
  },
  brandTagline: {
    fontSize: 12.5,
    fontWeight: '500',
    color: colors.darkGold,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  brandDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    marginTop: spacing.xs,
  },
  brandLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderSubtle,
  },
  brandSymbol: {
    fontSize: 9,
    color: colors.primaryGold,
    marginHorizontal: spacing.sm,
  },
  sectionContainer: {
    marginBottom: spacing.xl,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.darkGold,
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  continueCard: {
    backgroundColor: colors.surface,
    borderColor: colors.borderGold,
    borderWidth: 1.5,
    borderRadius: radius.lg,
    padding: spacing.lg,
    shadowColor: colors.goldShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 4,
  },
  continueTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  scriptureBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.darkGold,
    letterSpacing: 0.8,
  },
  verseMetaBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondaryText,
  },
  chapterNameText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primaryText,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  progressBlock: {
    marginVertical: spacing.xs,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.deepBlue,
    paddingVertical: 13,
    borderRadius: radius.pill,
    marginTop: spacing.md,
    shadowColor: colors.deepBlue,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  continueButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.surface,
    marginRight: 6,
    letterSpacing: 0.3,
  },
  continueButtonArrow: {
    fontSize: 16,
    color: colors.primaryGold,
    fontWeight: '700',
  },
  wisdomCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  wisdomSanskrit: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1813',
    lineHeight: 26,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  wisdomDivider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginVertical: spacing.md,
    width: '80%',
    alignSelf: 'center',
  },
  wisdomMeaning: {
    fontSize: 14,
    color: colors.secondaryText,
    lineHeight: 22,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  citationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  citationDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.primaryGold,
    marginRight: 6,
  },
  citationText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.darkGold,
    letterSpacing: 0.5,
  },
});
