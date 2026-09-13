import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Verse } from '../types/gita';
import { colors, radius, spacing, typography } from '../theme/theme';
import { VerseText } from './VerseText';
import { VerseMeaning } from './VerseMeaning';
import { AudioControls } from './AudioControls';

interface VerseCardProps {
  verse: Verse;
  isActive: boolean;
  onSelect: () => void;
  isPlaying?: boolean;
  isLoading?: boolean;
  onTogglePlay?: () => void;
}

export const VerseCard: React.FC<VerseCardProps> = ({
  verse,
  isActive,
  onSelect,
  isPlaying = false,
  isLoading = false,
  onTogglePlay,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onSelect}
      style={[styles.card, isActive && styles.cardActive]}
    >
      {/* Verse Card Top Bar */}
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <View style={[styles.verseBadge, isActive && styles.verseBadgeActive]}>
            <Text style={[styles.verseBadgeText, isActive && styles.verseBadgeTextActive]}>
              VERSE {verse.verseNumber}
            </Text>
          </View>
          {isActive && (
            <View style={styles.activePill}>
              <View style={styles.activeDot} />
              <Text style={styles.activePillText}>Current</Text>
            </View>
          )}
        </View>

        <AudioControls
          verseNumber={verse.verseNumber}
          isPlaying={isPlaying}
          isLoading={isLoading}
          onTogglePlay={onTogglePlay}
        />
      </View>

      {/* Sanskrit Shloka */}
      <View style={styles.shlokaContainer}>
        <VerseText text={verse.originalText} />
      </View>

      {/* Spiritual Accent Separator */}
      <View style={[styles.separator, isActive && styles.separatorActive]} />

      {/* Hindi Translation / Meaning */}
      <View style={styles.meaningContainer}>
        <VerseMeaning text={verse.hindiText} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.pureWhite,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.goldBorder,
    padding: spacing.lg,
    marginBottom: spacing.md,
    // Soft shadow
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  cardActive: {
    backgroundColor: colors.activeVerseBg,
    borderColor: colors.activeVerseBorder,
    borderWidth: 1.5,
    shadowColor: colors.primaryGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verseBadge: {
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.goldBorder,
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: spacing.sm + 2,
    borderRadius: radius.sm,
  },
  verseBadgeActive: {
    backgroundColor: colors.primaryGold,
    borderColor: colors.darkGold,
  },
  verseBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.darkGold,
    letterSpacing: 0.8,
  },
  verseBadgeTextActive: {
    color: colors.pureWhite,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.sm,
    backgroundColor: 'rgba(201, 162, 39, 0.14)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.darkGold,
    marginRight: 4,
  },
  activePillText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.darkGold,
  },
  shlokaContainer: {
    marginBottom: spacing.sm,
  },
  separator: {
    height: 1,
    backgroundColor: colors.goldBorderSubtle,
    marginVertical: spacing.sm,
  },
  separatorActive: {
    backgroundColor: 'rgba(201, 162, 39, 0.3)',
  },
  meaningContainer: {
    marginTop: spacing.xs,
  },
});
