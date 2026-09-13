import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../theme/theme';
import { GoogleIcon } from '../components/GoogleIcon';

interface LoginScreenProps {
  onGoogleSignIn: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onGoogleSignIn }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Centered Spiritual Card / Content */}
        <View style={styles.centerBlock}>
          {/* Brand Mark ॐ */}
          <View style={styles.emblemRing}>
            <Text style={styles.emblemText}>ॐ</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Bhagavad Gita</Text>

          {/* Tagline */}
          <Text style={styles.tagline}>
            Read. Listen. Understand.{'\n'}Practice.
          </Text>

          {/* Delicate Spiritual Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerSymbol}>✦</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Subheading */}
          <Text style={styles.journeyHeading}>Begin Your Journey</Text>

          {/* Primary CTA: Continue with Google */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.googleButton}
            onPress={onGoogleSignIn}
            accessibilityRole="button"
            accessibilityLabel="Continue with Google"
          >
            <GoogleIcon size={22} />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Supportive Footer */}
          <Text style={styles.supportiveText}>
            Your spiritual journey starts here.
          </Text>
        </View>

        {/* Subtle Sanctuary Footer */}
        <View style={styles.footerContainer}>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  centerBlock: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.xl,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  emblemRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.borderGold,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.goldShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  emblemText: {
    fontSize: 34,
    color: colors.darkGold,
    fontWeight: '600',
    marginTop: -3,
  },
  title: {
    ...typography.screenTitle,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.primaryText,
    marginBottom: spacing.xs,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.secondaryText,
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.4,
    marginBottom: spacing.lg,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '75%',
    marginVertical: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderSubtle,
  },
  dividerSymbol: {
    fontSize: 10,
    color: colors.primaryGold,
    marginHorizontal: spacing.sm,
  },
  journeyHeading: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryText,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    letterSpacing: 0.3,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1.2,
    borderRadius: radius.pill,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    width: '100%',
    shadowColor: 'rgba(0, 0, 0, 0.04)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: spacing.md,
  },
  googleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primaryText,
    marginLeft: 12,
    letterSpacing: 0.2,
  },
  supportiveText: {
    fontSize: 12.5,
    color: colors.secondaryText,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  footerContainer: {
    position: 'absolute',
    bottom: spacing.lg,
  },
  footerNote: {
    fontSize: 11,
    color: colors.tertiaryText,
    letterSpacing: 0.5,
  },
});
