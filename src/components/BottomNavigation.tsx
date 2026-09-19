import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type MainTabType = 'home' | 'books' | 'practice' | 'profile';

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
          <Image
            source={require('../../assets/images/nav_home.png')}
            style={[
              styles.navIconImg,
              { tintColor: activeTab === 'home' ? '#9E7238' : '#8A847A' },
            ]}
            resizeMode="contain"
          />
          <Text style={[styles.tabLabel, activeTab === 'home' && styles.tabLabelActive]}>
            Home
          </Text>
          {activeTab === 'home' && <View style={styles.activeUnderlineBar} />}
        </TouchableOpacity>

        {/* Tab 2: Library (Books) */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onSelectTab('books')}
          style={styles.tabItem}
          accessibilityRole="tab"
          accessibilityLabel="Library tab"
          accessibilityState={{ selected: activeTab === 'books' }}
        >
          <Image
            source={require('../../assets/images/nav_library.png')}
            style={[
              styles.navIconImg,
              { tintColor: activeTab === 'books' ? '#9E7238' : '#8A847A' },
            ]}
            resizeMode="contain"
          />
          <Text style={[styles.tabLabel, activeTab === 'books' && styles.tabLabelActive]}>
            Books
          </Text>
          {activeTab === 'books' && <View style={styles.activeUnderlineBar} />}
        </TouchableOpacity>

        {/* Tab 3: Practice */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onSelectTab('practice')}
          style={styles.tabItem}
          accessibilityRole="tab"
          accessibilityLabel="Daily Practice tab"
          accessibilityState={{ selected: activeTab === 'practice' }}
        >
          <Image
            source={require('../../assets/images/nav_practice.png')}
            style={[
              styles.navIconImg,
              { tintColor: activeTab === 'practice' ? '#9E7238' : '#8A847A' },
            ]}
            resizeMode="contain"
          />
          <Text style={[styles.tabLabel, activeTab === 'practice' && styles.tabLabelActive]}>
            Practice
          </Text>
          {activeTab === 'practice' && <View style={styles.activeUnderlineBar} />}
        </TouchableOpacity>

        {/* Tab 4: Profile */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onSelectTab('profile')}
          style={styles.tabItem}
          accessibilityRole="tab"
          accessibilityLabel="Profile tab"
          accessibilityState={{ selected: activeTab === 'profile' }}
        >
          <Image
            source={require('../../assets/images/nav_profile.png')}
            style={[
              styles.navIconImg,
              { tintColor: activeTab === 'profile' ? '#9E7238' : '#8A847A' },
            ]}
            resizeMode="contain"
          />
          <Text style={[styles.tabLabel, activeTab === 'profile' && styles.tabLabelActive]}>
            Profile
          </Text>
          {activeTab === 'profile' && <View style={styles.activeUnderlineBar} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EFE6D2',
    shadowColor: 'rgba(140, 99, 38, 0.08)',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 8,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 76 : 64,
    paddingBottom: Platform.OS === 'ios' ? 16 : 4,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    position: 'relative',
  },
  navIconImg: {
    width: 22,
    height: 22,
    marginBottom: 3,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8A847A',
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: '#9E7238',
    fontWeight: '700',
  },
  activeUnderlineBar: {
    position: 'absolute',
    bottom: -2,
    width: 28,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#9E7238',
  },
});
