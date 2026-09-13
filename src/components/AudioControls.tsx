import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing } from '../theme/theme';

interface AudioControlsProps {
  verseNumber: number;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  disabled?: boolean;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  verseNumber,
  isPlaying = false,
  onTogglePlay,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onTogglePlay}
        disabled={disabled}
        style={[styles.playButton, isPlaying && styles.playButtonActive]}
        accessibilityLabel={isPlaying ? 'Pause verse audio' : 'Play verse audio'}
        accessibilityRole="button"
      >
        <Text style={[styles.playIcon, isPlaying && styles.playIconActive]}>
          {isPlaying ? '⏸' : '▶'}
        </Text>
        <Text style={[styles.buttonLabel, isPlaying && styles.buttonLabelActive]}>
          {isPlaying ? 'Playing' : 'Listen'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.goldBorder,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: spacing.sm + 2,
    borderRadius: radius.pill,
  },
  playButtonActive: {
    backgroundColor: colors.primaryGold,
    borderColor: colors.darkGold,
  },
  playIcon: {
    fontSize: 10,
    color: colors.darkGold,
    marginRight: 4,
  },
  playIconActive: {
    color: colors.pureWhite,
  },
  buttonLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.darkGold,
    letterSpacing: 0.3,
  },
  buttonLabelActive: {
    color: colors.pureWhite,
  },
});
