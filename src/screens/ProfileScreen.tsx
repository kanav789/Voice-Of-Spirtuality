import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../theme/theme';

interface ProfileScreenProps {
  userName?: string;
  userEmail?: string;
  chaptersCompletedCount?: number;
  totalVersesRead?: number;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userName = 'Arjun',
  userEmail = 'seeker@sanctuary.in',
  chaptersCompletedCount = 1,
  totalVersesRead = 47,
  onLogout,
}) => {
  const handleItemPress = (title: string) => {
    Alert.alert(title, 'This feature will be available in the next release.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.headerCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>ॐ</Text>
          </View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
          <View style={styles.seekerBadge}>
            <Text style={styles.seekerBadgeText}>Dharma Seeker</Text>
          </View>
        </View>

        {/* 1. Reading Progress Overview */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>READING PROGRESS</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{totalVersesRead}</Text>
              <Text style={styles.statLabel}>Verses Read</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{chaptersCompletedCount}</Text>
              <Text style={styles.statLabel}>Chapter Explored</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>1</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>
        </View>

        {/* 2. Menu Sections */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>PRACTICE & LIBRARY</Text>
          <View style={styles.menuGroup}>
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => handleItemPress('Bookmarks')}
            >
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>🔖</Text>
                <Text style={styles.menuItemText}>Bookmarks & Saved Verses</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => handleItemPress('Daily Reflection Notes')}
            >
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>✍️</Text>
                <Text style={styles.menuItemText}>My Reflection Notes</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. Settings & Preferences */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>PREFERENCES</Text>
          <View style={styles.menuGroup}>
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => handleItemPress('Reading Appearance')}
            >
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>🔤</Text>
                <Text style={styles.menuItemText}>Typography & Sanskrit Font Size</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => handleItemPress('Audio & Chanting Preferences')}
            >
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>🔔</Text>
                <Text style={styles.menuItemText}>Audio & Chanting Preferences</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. About & Legal */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>ABOUT</Text>
          <View style={styles.menuGroup}>
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() =>
                Alert.alert(
                  'About Voice of Spirituality',
                  'Voice of Spirituality is a modern, peaceful sanctuary designed to help seekers study and practice sacred Indian scriptures.\n\nVersion 1.0.0'
                )
              }
            >
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>📜</Text>
                <Text style={styles.menuItemText}>About Voice of Spirituality</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() =>
                Alert.alert(
                  'Privacy Policy',
                  'Your reading progress is stored privately on your device. We respect your spiritual practice and privacy.'
                )
              }
            >
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>🛡️</Text>
                <Text style={styles.menuItemText}>Privacy Policy</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={onLogout}
          accessibilityRole="button"
          accessibilityLabel="Sign out of your account"
        >
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionFooter}>
          Voice of Spirituality · v1.0.0
        </Text>
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
  headerCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.borderGold,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  avatarText: {
    fontSize: 32,
    color: colors.darkGold,
    fontWeight: '600',
    marginTop: -2,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: colors.secondaryText,
    marginBottom: spacing.sm,
  },
  seekerBadge: {
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.borderGold,
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
  },
  seekerBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.darkGold,
    letterSpacing: 0.5,
  },
  sectionContainer: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.darkGold,
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.deepBlue,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: colors.secondaryText,
    textAlign: 'center',
  },
  menuGroup: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 16,
    marginRight: spacing.md,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primaryText,
  },
  menuArrow: {
    fontSize: 18,
    color: colors.secondaryText,
    fontWeight: '600',
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginLeft: 44,
  },
  logoutButton: {
    backgroundColor: colors.surface,
    borderColor: '#E8C5C8',
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#C62828',
  },
  versionFooter: {
    textAlign: 'center',
    fontSize: 11,
    color: colors.secondaryText,
    paddingBottom: spacing.lg,
  },
});
