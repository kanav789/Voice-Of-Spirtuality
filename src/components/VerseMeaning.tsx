import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme/theme';

interface VerseMeaningProps {
  text: string;
}

export const VerseMeaning: React.FC<VerseMeaningProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>भावार्थ • MEANING</Text>
      <Text style={styles.text} selectable>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.xs,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.darkGold,
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
  },
  text: {
    ...typography.hindiMeaning,
  },
});
