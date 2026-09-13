import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../theme/theme';
import { introductoryPlan } from '../data/subscriptionData';

interface ProfileScreenProps {
  userName?: string;
  userEmail?: string;
  userPhotoURL?: string | null;
  chaptersCompletedCount?: number;
  totalVersesRead?: number;
  onLogout: () => void;
  onSelectBookmarks?: () => void;
  onGetPremium?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userName = 'Kanav',
  userEmail = 'kanav@sanctuary.in',
  userPhotoURL,
  chaptersCompletedCount = 1,
  totalVersesRead = 4,
  onLogout,
  onSelectBookmarks,
  onGetPremium,
}) => {
  const handleBookmarks = () => {
    if (onSelectBookmarks) {
      onSelectBookmarks();
    } else {
      Alert.alert('Bookmarks', 'Your saved verses will appear here as you bookmark them during reading.');
    }
  };

  const handlePremiumPress = () => {
    if (onGetPremium) {
      onGetPremium();
    } else {
      Alert.alert(
        'Introductory Plan',
        `Unlock the full Bhagavad Gita experience for ₹500 for your first 6 months.\n\nPayment integration will be connected via Google Play.`
      );
    }
  };

  const handleAbout = () => {
    Alert.alert(
      'About Bhagavad Gita',
      'Voice of Spirituality is a modern sanctuary dedicated to the timeless study and contemplation of sacred Indian scriptures.\n\nVersion 1.0.0'
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      'Privacy Policy',
      'Your reading journey and bookmarks remain strictly private on your device. We honor your personal sanctuary and respect your privacy.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          {userPhotoURL ? (
            <Image source={{ uri: userPhotoURL }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>ॐ</Text>
            </View>
          )}

          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>

        {/* 1. READING PROGRESS (2 columns only, no streak) */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>READING PROGRESS</Text>

          <View style={styles.progressCard}>
            <View style={styles.statColumn}>
              <Text style={styles.statNumber}>{totalVersesRead}</Text>
              <Text style={styles.statLabel}>Verses Read</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statColumn}>
              <Text style={styles.statNumber}>{chaptersCompletedCount}</Text>
              <Text style={styles.statLabel}>Chapters</Text>
            </View>
          </View>
        </View>

        {/* 2. BOOKMARKS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>BOOKMARKS</Text>

          <TouchableOpacity
            style={styles.bookmarkRow}
            activeOpacity={0.75}
            onPress={handleBookmarks}
            accessibilityRole="button"
            accessibilityLabel="Bookmarks and Saved Verses"
          >
            <View style={styles.bookmarkLeft}>
              <Text style={styles.bookmarkIcon}>🔖</Text>
              <Text style={styles.bookmarkText}>Bookmarks & Saved Verses</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 3. PREMIUM (The most visually attractive centerpiece on Profile) */}
        <View style={styles.sectionContainer}>
          <View style={styles.premiumCard}>
            <View style={styles.premiumTopBadge}>
              <Text style={styles.premiumTopBadgeText}>
                {introductoryPlan.planBadge.toUpperCase()}
              </Text>
            </View>

            <Text style={styles.premiumHeadline}>{introductoryPlan.headline}</Text>
            <Text style={styles.premiumTagline}>{introductoryPlan.tagline}</Text>

            {/* Price Showcase */}
            <View style={styles.priceShowcase}>
              <Text style={styles.durationLabel}>{introductoryPlan.durationLabel}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.currencySymbol}>{introductoryPlan.currencySymbol}</Text>
                <Text style={styles.priceAmount}>{introductoryPlan.price}</Text>
              </View>
              <Text style={styles.offerNote}>Introductory 6-Month Offer</Text>
            </View>

            <TouchableOpacity
              style={styles.premiumButton}
              activeOpacity={0.88}
              onPress={handlePremiumPress}
              accessibilityRole="button"
              accessibilityLabel="Get Premium introductory offer"
            >
              <Text style={styles.premiumButtonText}>{introductoryPlan.ctaText} →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. PROFILE OPTIONS */}
        <View style={styles.sectionContainer}>
          <View style={styles.optionsCard}>
            <TouchableOpacity
              style={styles.optionRow}
              activeOpacity={0.7}
              onPress={handleAbout}
            >
              <Text style={styles.optionText}>About Bhagavad Gita</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.optionDivider} />

            <TouchableOpacity
              style={styles.optionRow}
              activeOpacity={0.7}
              onPress={handlePrivacy}
            >
              <Text style={styles.optionText}>Privacy Policy</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.optionDivider} />

            <TouchableOpacity
              style={styles.optionRow}
              activeOpacity={0.7}
              onPress={onLogout}
            >
              <Text style={styles.logoutText}>Logout</Text>
              <Text style={styles.chevronDanger}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footerBrand}>Voice of Spirituality</Text>
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
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarContainer: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.borderGold,
    borderWidth: 1.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    shadowColor: colors.goldShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarImage: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1.8,
    borderColor: colors.borderGold,
    marginBottom: spacing.sm,
  },
  avatarText: {
    fontSize: 36,
    color: colors.darkGold,
    fontWeight: '600',
    marginTop: -3,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  userEmail: {
    fontSize: 13,
    color: colors.secondaryText,
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
  progressCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  statColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.deepBlue,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: colors.secondaryText,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.borderSubtle,
    height: '70%',
    alignSelf: 'center',
  },
  bookmarkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.md + 2,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  bookmarkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  bookmarkText: {
    fontSize: 14.5,
    fontWeight: '500',
    color: colors.primaryText,
  },
  chevron: {
    fontSize: 18,
    color: colors.secondaryText,
    fontWeight: '600',
  },
  chevronDanger: {
    fontSize: 18,
    color: '#C62828',
    fontWeight: '600',
  },
  premiumCard: {
    backgroundColor: colors.surface,
    borderColor: colors.borderGold,
    borderWidth: 1.8,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    shadowColor: colors.goldShadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 5,
  },
  premiumTopBadge: {
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.borderGold,
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
    marginBottom: spacing.md,
  },
  premiumTopBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.darkGold,
    letterSpacing: 1,
  },
  premiumHeadline: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primaryText,
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  premiumTagline: {
    fontSize: 13,
    color: colors.secondaryText,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  priceShowcase: {
    alignItems: 'center',
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.borderGold,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    width: '100%',
    marginBottom: spacing.lg,
  },
  durationLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.darkGold,
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primaryText,
    marginTop: 4,
    marginRight: 2,
  },
  priceAmount: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.primaryText,
    letterSpacing: -0.5,
  },
  offerNote: {
    fontSize: 11.5,
    color: colors.darkGold,
    fontWeight: '600',
    marginTop: 2,
    letterSpacing: 0.3,
  },
  premiumButton: {
    backgroundColor: colors.deepBlue,
    paddingVertical: 14,
    borderRadius: radius.pill,
    width: '100%',
    alignItems: 'center',
    shadowColor: colors.deepBlue,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  premiumButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.surface,
    letterSpacing: 0.5,
  },
  optionsCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.md + 2,
  },
  optionText: {
    fontSize: 14.5,
    fontWeight: '500',
    color: colors.primaryText,
  },
  logoutText: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#C62828',
  },
  optionDivider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginHorizontal: spacing.md,
  },
  footerBrand: {
    textAlign: 'center',
    fontSize: 11,
    color: colors.tertiaryText,
    letterSpacing: 0.5,
    paddingTop: spacing.sm,
  },
});
