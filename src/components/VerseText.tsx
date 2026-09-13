import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme/theme';

interface VerseTextProps {
  text: string;
}

export const VerseText: React.FC<VerseTextProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} selectable>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xs,
  },
  text: {
    ...typography.sanskritVerse,
  },
});
