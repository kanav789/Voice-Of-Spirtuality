import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChapterSummary } from '../types/gita';
import { colors, radius, spacing, typography } from '../theme/theme';

interface ChapterCardProps {
  chapter: ChapterSummary;
  onPress: () => void;
  progressPercent?: number;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  onPress,
  progressPercent,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.card}
      accessibilityRole="button"
      accessibilityLabel={`Chapter ${chapter.chapterNumber}, ${chapter.chapterName}, ${chapter.totalVerses} verses`}
    >
      <View style={styles.cardInner}>
        {/* Left gold emblem */}
        <View style={styles.numberBadge}>
          <Text style={styles.numberText}>
            {chapter.chapterNumber < 10 ? `0${chapter.chapterNumber}` : chapter.chapterNumber}
          </Text>
        </View>

        {/* Center content */}
        <View style={styles.content}>
          <Text style={styles.overline}>CHAPTER {chapter.chapterNumber}</Text>
          <Text style={styles.title} numberOfLines={1}>
            {chapter.chapterName}
          </Text>
          <View style={styles.metaRow}>
            <View style={styles.versePill}>
              <Text style={styles.versePillText}>{chapter.totalVerses} Verses</Text>
            </View>
            {typeof progressPercent === 'number' && progressPercent > 0 && (
              <Text style={styles.progressText}>• {Math.round(progressPercent)}% read</Text>
            )}
          </View>
        </View>

        {/* Right chevron indicator */}
        <View style={styles.action}>
          <View style={styles.arrowCircle}>
            <Text style={styles.arrowText}>›</Text>
          </View>
        </View>
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
    marginBottom: spacing.md,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    overflow: 'hidden',
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md + 2,
  },
  numberBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.goldBorder,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  numberText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.darkGold,
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  overline: {
    ...typography.chapterNumber,
    marginBottom: 2,
  },
  title: {
    ...typography.chapterTitle,
    fontSize: 18,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  versePill: {
    backgroundColor: 'rgba(201, 162, 39, 0.1)',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
  },
  versePillText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.darkGold,
  },
  progressText: {
    fontSize: 11,
    color: colors.secondaryText,
    marginLeft: spacing.xs,
  },
  action: {
    marginLeft: spacing.sm,
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.lightGoldBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.goldBorderSubtle,
    borderWidth: 1,
  },
  arrowText: {
    fontSize: 18,
    color: colors.darkGold,
    fontWeight: '600',
    marginTop: -2,
  },
});
