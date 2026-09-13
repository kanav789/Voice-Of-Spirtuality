import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, radius, spacing } from '../theme/theme';

export type MainTabType = 'home' | 'books' | 'profile';

interface BottomNavigationProps {
  activeTab: MainTabType;
  onSelectTab: (tab: MainTabType) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {/* Tab 1: Home */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onSelectTab('home')}
          style={styles.tabItem}
          accessibilityRole="tab"
          accessibilityLabel="Home tab"
          accessibilityState={{ selected: activeTab === 'home' }}
        >
          <Text style={[styles.tabIcon, activeTab === 'home' && styles.tabIconActive]}>
            ⌂
          </Text>
          <Text style={[styles.tabLabel, activeTab === 'home' && styles.tabLabelActive]}>
            Home
          </Text>
        </TouchableOpacity>

        {/* Tab 2: Books (CENTER TAB - ELEVATED) */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => onSelectTab('books')}
          style={styles.centerTabItem}
          accessibilityRole="tab"
          accessibilityLabel="Sacred Books tab"
          accessibilityState={{ selected: activeTab === 'books' }}
        >
          <View
            style={[
              styles.centerIconContainer,
              activeTab === 'books' && styles.centerIconContainerActive,
            ]}
          >
            <Text
              style={[
                styles.centerIcon,
                activeTab === 'books' && styles.centerIconActive,
              ]}
            >
              📖
            </Text>
          </View>
          <Text
            style={[
              styles.centerTabLabel,
              activeTab === 'books' && styles.tabLabelActive,
            ]}
          >
            Books
          </Text>
        </TouchableOpacity>

        {/* Tab 3: Profile */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onSelectTab('profile')}
          style={styles.tabItem}
          accessibilityRole="tab"
          accessibilityLabel="Profile tab"
          accessibilityState={{ selected: activeTab === 'profile' }}
        >
          <Text style={[styles.tabIcon, activeTab === 'profile' && styles.tabIconActive]}>
            👤
          </Text>
          <Text style={[styles.tabLabel, activeTab === 'profile' && styles.tabLabelActive]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 76 : 64,
    paddingBottom: Platform.OS === 'ios' ? 18 : 6,
    paddingHorizontal: spacing.md,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabIcon: {
    fontSize: 22,
    color: colors.secondaryText,
    marginBottom: 2,
  },
  tabIconActive: {
    color: colors.darkGold,
    fontWeight: '700',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.secondaryText,
    letterSpacing: 0.3,
  },
  tabLabelActive: {
    color: colors.darkGold,
    fontWeight: '700',
  },
  centerTabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -14,
  },
  centerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.borderGold,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.goldShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 2,
  },
  centerIconContainerActive: {
    backgroundColor: colors.primaryGold,
    borderColor: colors.darkGold,
  },
  centerIcon: {
    fontSize: 20,
  },
  centerIconActive: {
    transform: [{ scale: 1.05 }],
  },
  centerTabLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.secondaryText,
    letterSpacing: 0.3,
  },
});
