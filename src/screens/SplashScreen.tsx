import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../theme/theme';

interface SplashScreenProps {
  onContinue?: () => void;
  isLoading?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onContinue,
  isLoading = false,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Decorative Space */}
        <View style={styles.spacerTop} />

        {/* Center Emblem & Title */}
        <View style={styles.contentCenter}>
          <View style={styles.emblemRing}>
            <Text style={styles.emblemText}>ॐ</Text>
          </View>

          <Text style={styles.title}>Bhagavad Gita</Text>

          <View style={styles.goldDivider}>
            <View style={styles.dot} />
            <View style={styles.line} />
            <View style={styles.dot} />
          </View>

          <Text style={styles.subtitle}>Read. Listen. Understand. Practice.</Text>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Opening Sanctuary...</Text>
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onContinue}
              style={styles.continueButton}
              accessibilityRole="button"
              accessibilityLabel="Begin your spiritual journey"
            >
              <Text style={styles.continueButtonText}>Enter Sanctuary</Text>
              <Text style={styles.arrowIcon}>→</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.footerNote}>Voice of Spirituality</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  spacerTop: {
    height: 40,
  },
  contentCenter: {
    alignItems: 'center',
    width: '100%',
  },
  emblemRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.borderGold,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.primaryGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  emblemText: {
    fontSize: 44,
    color: colors.darkGold,
    fontWeight: '600',
    marginTop: -4,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primaryText,
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  goldDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    marginBottom: spacing.md,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderGold,
    marginHorizontal: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primaryGold,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.darkGold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: spacing.xl,
  },
  loadingContainer: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkGold,
    letterSpacing: 0.8,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.deepBlue,
    paddingVertical: 16,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    width: '100%',
    maxWidth: 320,
    shadowColor: colors.deepBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: spacing.md,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
    letterSpacing: 0.5,
    marginRight: spacing.sm,
  },
  arrowIcon: {
    fontSize: 18,
    color: colors.primaryGold,
    fontWeight: '600',
  },
  footerNote: {
    fontSize: 12,
    color: colors.secondaryText,
    letterSpacing: 0.5,
  },
});
