import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  label?: string;
  showLabel?: boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  current,
  total,
  label,
  showLabel = true,
}) => {
  const progressPercent = total > 0 ? Math.min(Math.max((current / total) * 100, 0), 100) : 0;

  return (
    <View style={styles.container}>
      {showLabel && (
        <View style={styles.labelRow}>
          <Text style={styles.labelText}>
            {label ? label : `Verse ${current} of ${total}`}
          </Text>
          <Text style={styles.percentText}>{Math.round(progressPercent)}%</Text>
        </View>
      )}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progressPercent}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: spacing.xs,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.darkGold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  percentText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondaryText,
  },
  track: {
    height: 4,
    backgroundColor: colors.goldBorderSubtle,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primaryGold,
    borderRadius: radius.pill,
  },
});
