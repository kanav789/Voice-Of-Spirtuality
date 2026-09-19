import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, radius, spacing } from '../theme/theme';

export interface NotificationItem {
  id: string;
  category: 'wisdom' | 'journey' | 'practice' | 'blessing';
  title: string;
  message: string;
  time: string;
  read: boolean;
  chapterNumber?: number;
  verseNumber?: number;
  actionLabel?: string;
}

const STORAGE_KEY_NOTIFS = '@vos_notifications_v1';
const STORAGE_KEY_REMINDER = '@vos_brahma_muhurta_reminder';

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    category: 'wisdom',
    title: 'Brahma Muhurta Wisdom (6:00 AM)',
    message:
      'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । You have a right only to perform your prescribed duty, never to the fruits of action.',
    time: 'Today, 6:00 AM',
    read: false,
    chapterNumber: 2,
    verseNumber: 47,
    actionLabel: 'Read Verse 2:47 →',
  },
  {
    id: '2',
    category: 'journey',
    title: 'Sacred Reading Reminder',
    message:
      'Arjuna Vishada Yoga: Take a mindful breath and resume your journey through Chapter 1.',
    time: 'Today, 12:30 PM',
    read: false,
    chapterNumber: 1,
    verseNumber: 1,
    actionLabel: 'Continue Reading →',
  },
  {
    id: '3',
    category: 'practice',
    title: 'Mindful Reflection Completed',
    message:
      'Your contemplation on Nishkama Karma (Selfless Action) has been saved in your sacred journal.',
    time: 'Yesterday, 8:15 PM',
    read: true,
  },
  {
    id: '4',
    category: 'blessing',
    title: 'Evening Peace & Shanti',
    message:
      'ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः — May peace radiate throughout the celestial spheres, the earth, and within your soul.',
    time: '2 days ago',
    read: true,
  },
  {
    id: '5',
    category: 'journey',
    title: 'Chapter 2: Sankhya Yoga Available',
    message:
      'Explore Krishna’s profound teachings on the immortal nature of the soul in Chapter 2.',
    time: '3 days ago',
    read: true,
    chapterNumber: 2,
    verseNumber: 1,
    actionLabel: 'Explore Chapter 2 →',
  },
];

interface NotificationsScreenProps {
  onBack: () => void;
  onNavigateToReading?: (chapterNumber: number, verseNumber: number) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onBack,
  onNavigateToReading,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [brahmaMuhurtaEnabled, setBrahmaMuhurtaEnabled] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'wisdom' | 'journey' | 'practice'>('all');

  useEffect(() => {
    async function loadSettings() {
      try {
        const storedNotifs = await AsyncStorage.getItem(STORAGE_KEY_NOTIFS);
        if (storedNotifs) {
          setNotifications(JSON.parse(storedNotifs));
        }
        const storedReminder = await AsyncStorage.getItem(STORAGE_KEY_REMINDER);
        if (storedReminder !== null) {
          setBrahmaMuhurtaEnabled(JSON.parse(storedReminder));
        }
      } catch (err) {
        console.warn('[Notifications] Failed to load data:', err);
      }
    }
    loadSettings();
  }, []);

  const saveNotifications = async (updated: NotificationItem[]) => {
    setNotifications(updated);
    try {
      await AsyncStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(updated));
    } catch (err) {
      console.warn('[Notifications] Failed to save notifications:', err);
    }
  };

  const handleToggleReminder = async (val: boolean) => {
    setBrahmaMuhurtaEnabled(val);
    try {
      await AsyncStorage.setItem(STORAGE_KEY_REMINDER, JSON.stringify(val));
    } catch (err) {
      console.warn('[Notifications] Failed to save reminder setting:', err);
    }
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveNotifications(updated);
  };

  const handleNotificationPress = (item: NotificationItem) => {
    const updated = notifications.map((n) =>
      n.id === item.id ? { ...n, read: true } : n
    );
    saveNotifications(updated);

    if (item.chapterNumber && onNavigateToReading) {
      onNavigateToReading(item.chapterNumber, item.verseNumber || 1);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((item) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'wisdom') return item.category === 'wisdom';
    if (selectedFilter === 'journey') return item.category === 'journey';
    if (selectedFilter === 'practice') return item.category === 'practice';
    return true;
  });

  const getCategoryBadge = (category: NotificationItem['category']) => {
    switch (category) {
      case 'wisdom':
        return { label: 'DAILY WISDOM', color: '#855E24', bg: '#FAF2DE' };
      case 'journey':
        return { label: 'SACRED JOURNEY', color: '#6A4E23', bg: '#F5EBD7' };
      case 'practice':
        return { label: 'PRACTICE', color: '#4E6A3E', bg: '#EBF4E8' };
      case 'blessing':
      default:
        return { label: 'BLESSING', color: '#705121', bg: '#F8F4EB' };
    }
  };

  const renderItem = ({ item }: { item: NotificationItem }) => {
    const badge = getCategoryBadge(item.category);

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleNotificationPress(item)}
        style={[styles.notifCard, !item.read && styles.notifCardUnread]}
      >
        <View style={styles.notifHeaderRow}>
          <View style={[styles.categoryBadge, { backgroundColor: badge.bg }]}>
            <Text style={[styles.categoryBadgeText, { color: badge.color }]}>
              {badge.label}
            </Text>
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{item.time}</Text>
            {!item.read && <View style={styles.unreadDot} />}
          </View>
        </View>

        <Text style={[styles.notifTitle, !item.read && styles.notifTitleUnread]}>
          {item.title}
        </Text>

        <Text style={styles.notifMessage}>{item.message}</Text>

        {item.actionLabel && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.actionBtn}
            onPress={() => handleNotificationPress(item)}
          >
            <Text style={styles.actionBtnText}>{item.actionLabel}</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Back to Home"
        >
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backLabel}>Home</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        {unreadCount > 0 ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleMarkAllRead}
            style={styles.markReadButton}
          >
            <Text style={styles.markReadText}>Mark read</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.headerRightSpacer} />
        )}
      </View>

      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {/* 2. Brahma Muhurta Reminder Card */}
            <View style={styles.reminderCard}>
              <View style={styles.reminderIconWrapper}>
                <Image
                  source={require('../../assets/images/header_emblem.png')}
                  style={styles.reminderEmblem}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.reminderTextCol}>
                <Text style={styles.reminderTitle}>Brahma Muhurta Reflection</Text>
                <Text style={styles.reminderDesc}>
                  Receive sacred dawn verses at 6:00 AM to begin each day in serenity.
                </Text>
              </View>
              <Switch
                value={brahmaMuhurtaEnabled}
                onValueChange={handleToggleReminder}
                trackColor={{ false: '#E0D6C3', true: '#9E7238' }}
                thumbColor={brahmaMuhurtaEnabled ? '#FAF7F0' : '#FFFFFF'}
              />
            </View>

            {/* 3. Filter Pills */}
            <View style={styles.filterRow}>
              {(
                [
                  { key: 'all', label: 'All' },
                  { key: 'wisdom', label: 'Wisdom' },
                  { key: 'journey', label: 'Journey' },
                  { key: 'practice', label: 'Practice' },
                ] as const
              ).map((tab) => {
                const isActive = selectedFilter === tab.key;
                return (
                  <TouchableOpacity
                    key={tab.key}
                    activeOpacity={0.75}
                    onPress={() => setSelectedFilter(tab.key)}
                    style={[styles.filterPill, isActive && styles.filterPillActive]}
                  >
                    <Text
                      style={[
                        styles.filterPillText,
                        isActive && styles.filterPillTextActive,
                      ]}
                    >
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyOm}>ॐ</Text>
            <Text style={styles.emptyTitle}>All Caught Up in Serenity</Text>
            <Text style={styles.emptySubtitle}>
              You have reviewed all your spiritual reflections. May peaceful wisdom
              illuminate your day.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF7F0',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6D2',
    backgroundColor: '#FAF7F0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingRight: 8,
  },
  backArrow: {
    fontSize: 26,
    color: '#9E7238',
    fontWeight: '300',
    marginRight: 2,
    marginTop: -2,
  },
  backLabel: {
    fontSize: 15,
    color: '#9E7238',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1C1A17',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  markReadButton: {
    paddingVertical: 4,
    paddingLeft: 8,
  },
  markReadText: {
    fontSize: 13,
    color: '#855E24',
    fontWeight: '600',
  },
  headerRightSpacer: {
    width: 60,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },

  /* Reminder Card */
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#E8DEC7',
    padding: 14,
    marginBottom: 16,
    shadowColor: 'rgba(140, 99, 38, 0.08)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  reminderIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FAF2DE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  reminderEmblem: {
    width: 28,
    height: 28,
  },
  reminderTextCol: {
    flex: 1,
    marginRight: 10,
  },
  reminderTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1A17',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 2,
  },
  reminderDesc: {
    fontSize: 11.5,
    color: '#7A756D',
    lineHeight: 16,
  },

  /* Filter Pills */
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE5CF',
  },
  filterPillActive: {
    backgroundColor: '#9E7238',
    borderColor: '#9E7238',
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#635D52',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  /* Notification Cards */
  notifCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#EFE6D2',
    padding: 15,
    marginBottom: 12,
    shadowColor: 'rgba(140, 99, 38, 0.06)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  notifCardUnread: {
    borderColor: '#DFC58A',
    backgroundColor: '#FCFAF5',
    borderLeftWidth: 3.5,
    borderLeftColor: '#9E7238',
  },
  notifHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 11,
    color: '#8A847A',
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#9E7238',
    marginLeft: 6,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1A17',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 4,
  },
  notifTitleUnread: {
    color: '#1C1A17',
  },
  notifMessage: {
    fontSize: 13,
    color: '#524D44',
    lineHeight: 19,
    marginBottom: 6,
  },
  actionBtn: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#FAF2DE',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6D4AA',
  },
  actionBtnText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#855E24',
  },

  /* Empty State */
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyOm: {
    fontSize: 36,
    color: '#C7A35A',
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1C1A17',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#7A756D',
    textAlign: 'center',
    lineHeight: 19,
  },
});
