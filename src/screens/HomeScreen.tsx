import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../theme/theme';
import { getChapter } from '../data/gitaData';

export interface HomeScreenProps {
  userName?: string;
  lastChapterNumber: number;
  lastVerseNumber: number;
  totalVersesInChapter: number;
  onContinueReading: (chapterNumber: number, verseNumber: number) => void;
  onNavigateToChapters?: () => void;
  onNavigateToLibrary?: () => void;
  onNavigateToPractice?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName = 'Khiladi coder',
  lastChapterNumber = 1,
  lastVerseNumber = 1,
  totalVersesInChapter = 47,
  onContinueReading,
  onNavigateToChapters,
  onNavigateToLibrary,
  onNavigateToPractice,
}) => {
  const [showReflectionModal, setShowReflectionModal] = useState(false);
  const [showBookmarksModal, setShowBookmarksModal] = useState(false);

  // Time-appropriate greeting
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Chapter details
  const currentChapterData = getChapter(lastChapterNumber);
  const currentChapterTitle =
    currentChapterData?.chapterName || 'Arjuna Vishada Yoga';

  // Calculate percentage
  const totalVerses = totalVersesInChapter > 0 ? totalVersesInChapter : 47;
  const progressPercent = Math.max(
    1,
    Math.min(100, Math.round((lastVerseNumber / totalVerses) * 100))
  );

  const handleNotificationPress = () => {
    Alert.alert(
      'Daily Wisdom Notifications',
      'You will receive inspiring morning reflections and sacred verses at Brahma Muhurta (6:00 AM) to begin your day in peace.',
      [{ text: 'Acknowledge', style: 'default' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. TOP HEADER BAR */}
        <View style={styles.headerBar}>
          <View style={styles.headerLeft}>
            {/* Glowing Golden Radiant Emblem */}
            <View style={styles.sunburstContainer}>
              <Image
                source={require('../../assets/images/header_emblem.png')}
                style={styles.headerEmblemImage}
                resizeMode="contain"
              />
            </View>

            {/* Greeting & Name */}
            <View style={styles.greetingTextContainer}>
              <Text style={styles.greetingTimeText}>{getGreeting()},</Text>
              <Text style={styles.greetingNameText}>{userName} 🙏</Text>
              <Text style={styles.greetingTagline}>
                Continue your journey through ancient wisdom.
              </Text>
            </View>
          </View>

          {/* Right Notification Bell & Motto */}
          <View style={styles.headerRight}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.bellButton}
              onPress={handleNotificationPress}
              accessibilityRole="button"
              accessibilityLabel="Notifications"
            >
              <Image
                source={require('../../assets/images/bell_icon.png')}
                style={styles.bellIconImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.mottoContainer}>
              <View style={styles.mottoLine} />
              <Text style={styles.mottoText}>A CALMER MIND</Text>
              <Text style={styles.mottoText}>A BRIGHTER YOU</Text>
            </View>
          </View>
        </View>

        {/* 2. SACRED HERO CENTERPIECE WITH WATERMARKS */}
        <View style={styles.heroSection}>
          <Image
            source={require('../../assets/images/hero_artwork.png')}
            style={styles.heroArtworkImage}
            resizeMode="contain"
          />
        </View>

        {/* 3. CONTINUE YOUR JOURNEY CARD */}
        <View style={styles.sectionContainer}>
          <View style={styles.continueCard}>
            {/* Card Header Row */}
            <View style={styles.continueCardHeader}>
              <Text style={styles.continueSectionTitle}>CONTINUE YOUR JOURNEY</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onNavigateToChapters || (() => onContinueReading(lastChapterNumber, 1))}
              >
                <Text style={styles.continueScriptureLink}>Bhagavad Gita →</Text>
              </TouchableOpacity>
            </View>

            {/* Card Content Row */}
            <View style={styles.continueContentRow}>
              {/* Circular Progress Ring & Play Button */}
              <View style={styles.progressRingWrapper}>
                <View style={styles.progressRingOuter}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.playButtonCircle}
                    onPress={() => onContinueReading(lastChapterNumber, lastVerseNumber)}
                    accessibilityRole="button"
                    accessibilityLabel="Play audio / continue reading"
                  >
                    <Text style={styles.playIconTriangle}>▶</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.progressPercentBottom}>{progressPercent}%</Text>
              </View>

              {/* Chapter Information */}
              <View style={styles.continueDetailsCol}>
                <Text style={styles.scriptureSubHeader}>BHAGAVAD GITA</Text>
                <Text style={styles.chapterVerseMetaText}>
                  Chapter {lastChapterNumber} · Verse {lastVerseNumber}
                </Text>
                <Text style={styles.chapterTitleLarge} numberOfLines={1}>
                  {currentChapterTitle}
                </Text>
                <View style={styles.progressInfoRow}>
                  <Text style={styles.progressCounterText}>
                    Progress: {lastVerseNumber} of {totalVerses} verses
                  </Text>
                  <Text style={styles.progressPercentRightText}>{progressPercent}%</Text>
                </View>
              </View>
            </View>

            {/* Bottom Full-Width CTA Button */}
            <TouchableOpacity
              activeOpacity={0.88}
              style={styles.continueReadingBtn}
              onPress={() => onContinueReading(lastChapterNumber, lastVerseNumber)}
              accessibilityRole="button"
              accessibilityLabel="Continue Reading"
            >
              <Text style={styles.continueReadingBtnText}>Continue Reading →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. DAILY WISDOM CARD */}
        <View style={styles.sectionContainer}>
          <View style={styles.wisdomCard}>
            {/* Card Header Row */}
            <View style={styles.wisdomHeaderRow}>
              <Text style={styles.wisdomSectionTitle}>DAILY WISDOM</Text>
              <Text style={styles.wisdomHeaderSubtitle}>
                A new thought for a better you
              </Text>
            </View>

            {/* Sanskrit Shloka with Stylized Quote */}
            <View style={styles.shlokaRow}>
              <Text style={styles.decorativeQuote}>“</Text>
              <Text style={styles.shlokaSanskrit}>
                कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।{'\n'}
                मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥
              </Text>
            </View>

            {/* English Translation */}
            <Text style={styles.shlokaTranslation}>
              <Text style={styles.translationBold}>You</Text> have a right only to perform
              your prescribed duty, but never to the fruits of action. Never let the fruits of
              action be your motive, nor let your attachment be to inaction.
            </Text>

            {/* Footer Row: Citation & Reflect Button */}
            <View style={styles.wisdomFooterRow}>
              <Text style={styles.shlokaCitation}>— Bhagavad Gita 2:47</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.reflectBtn}
                onPress={() => setShowReflectionModal(true)}
                accessibilityRole="button"
                accessibilityLabel="Reflect for a moment"
              >

                <Text style={styles.reflectBtnText}>Reflect for a moment</Text>
              </TouchableOpacity>
            </View>

            {/* Botanical Watercolor Leaves Watermark */}
            <View pointerEvents="none" style={styles.wisdomLeavesWrapper}>
              <Image
                source={require('../../assets/images/wisdom_leaves.png')}
                style={styles.wisdomLeavesWatermark}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* 5. EXPLORE SECTION */}
        <View style={styles.sectionContainer}>
          {/* Section Header */}
          <View style={styles.exploreHeaderRow}>
            <Text style={styles.exploreSectionTitle}>EXPLORE</Text>
            <Text style={styles.exploreHeaderSubtitle}>
              Deepen your spiritual journey
            </Text>
          </View>

          {/* 3 Explore Cards */}
          <View style={styles.exploreCardsRow}>
            {/* Card 1: Chapters */}
            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.exploreCard}
              onPress={onNavigateToChapters || onNavigateToLibrary}
              accessibilityRole="button"
              accessibilityLabel="Explore all 18 chapters"
            >
              <View style={styles.exploreCardTop}>
                <Image
                  source={require('../../assets/images/icon_chapters.png')}
                  style={styles.exploreCardIconImg}
                  resizeMode="contain"
                />
                <Text style={styles.exploreChevron}>›</Text>
              </View>
              <Text style={styles.exploreCardTitle}>Chapters</Text>
              <Text style={styles.exploreCardSubtitle}>Explore all 18 chapters</Text>
            </TouchableOpacity>

            {/* Card 2: Bookmarks */}
            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.exploreCard}
              onPress={() => setShowBookmarksModal(true)}
              accessibilityRole="button"
              accessibilityLabel="Bookmarks"
            >
              <View style={styles.exploreCardTop}>
                <Image
                  source={require('../../assets/images/icon_bookmarks.png')}
                  style={styles.exploreCardIconImg}
                  resizeMode="contain"
                />
                <Text style={styles.exploreChevron}>›</Text>
              </View>
              <Text style={styles.exploreCardTitle}>Bookmarks</Text>
              <Text style={styles.exploreCardSubtitle}>Resume your saved verses</Text>
            </TouchableOpacity>

            {/* Card 3: Daily Practice */}
            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.exploreCard}
              onPress={onNavigateToPractice || (() => setShowReflectionModal(true))}
              accessibilityRole="button"
              accessibilityLabel="Daily Practice"
            >
              <View style={styles.exploreCardTop}>
                <Image
                  source={require('../../assets/images/icon_practice.png')}
                  style={styles.exploreCardIconImg}
                  resizeMode="contain"
                />
                <Text style={styles.exploreChevron}>›</Text>
              </View>
              <Text style={styles.exploreCardTitle}>Daily Practice</Text>
              <Text style={styles.exploreCardSubtitle}>Build a calmer you, daily</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* MODAL: Reflect for a Moment */}
      <Modal
        visible={showReflectionModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowReflectionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalIcon}>🌱</Text>
              <Text style={styles.modalTitle}>Daily Contemplation</Text>
            </View>

            <Text style={styles.modalVerseHeading}>Nishkama Karma (Selfless Action)</Text>
            <Text style={styles.modalPrompt}>
              Take a slow, deep breath. Release all anxiety regarding tomorrow's outcomes.
              Dedicate your complete devotion to the action before you right now. When action is
              performed with love and presence without attachment to praise or reward, mind
              settles into undisturbed peace.
            </Text>

            <View style={styles.breathCard}>
              <Text style={styles.breathOm}>ॐ</Text>
              <Text style={styles.breathText}>Inhale Peace  •  Exhale Attachment</Text>
            </View>

            <TouchableOpacity
              style={styles.modalCloseBtn}
              activeOpacity={0.85}
              onPress={() => setShowReflectionModal(false)}
            >
              <Text style={styles.modalCloseBtnText}>Return to Sanctuary</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL: Bookmarks Info */}
      <Modal
        visible={showBookmarksModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowBookmarksModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalIcon}>🔖</Text>
              <Text style={styles.modalTitle}>Saved Verses</Text>
            </View>

            <Text style={styles.modalPrompt}>
              Your current reading progress is automatically preserved on Chapter{' '}
              {lastChapterNumber}, Verse {lastVerseNumber}. Continue your journey through
              the sacred shlokas whenever you are ready.
            </Text>

            <TouchableOpacity
              style={styles.modalCloseBtn}
              activeOpacity={0.85}
              onPress={() => {
                setShowBookmarksModal(false);
                onContinueReading(lastChapterNumber, lastVerseNumber);
              }}
            >
              <Text style={styles.modalCloseBtnText}>Resume Reading</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF7F0',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 36,
  },

  /* 1. Top Header */
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingTop: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  sunburstContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  headerEmblemImage: {
    width: 38,
    height: 38,
  },
  greetingTextContainer: {
    flex: 1,
  },
  greetingTimeText: {
    fontSize: 13,
    color: '#635D52',
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  greetingNameText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1A17',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginTop: 1,
    marginBottom: 2,
  },
  greetingTagline: {
    fontSize: 11.5,
    color: '#7A756D',
    lineHeight: 16,
  },
  headerRight: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  bellButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  bellIconImage: {
    width: 22,
    height: 22,
  },
  mottoContainer: {
    alignItems: 'flex-end',
    marginTop: 2,
  },
  mottoLine: {
    width: 48,
    height: 1,
    backgroundColor: '#BCA168',
    marginBottom: 4,
  },
  mottoText: {
    fontSize: 8.5,
    fontWeight: '700',
    color: '#8A7046',
    letterSpacing: 1.3,
    lineHeight: 12,
  },

  /* 2. Hero Centerpiece */
  heroSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  heroArtworkImage: {
    width: '100%',
    aspectRatio: 564 / 226,
  },

  /* 3. Continue Your Journey Card */
  sectionContainer: {
    marginBottom: 16,
  },
  continueCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8DEC7',
    borderWidth: 1.2,
    borderRadius: 18,
    padding: 16,
    shadowColor: 'rgba(140, 99, 38, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3,
  },
  continueCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  continueSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#855E24',
    letterSpacing: 1.1,
  },
  continueScriptureLink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#855E24',
  },
  continueContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  progressRingWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  progressRingOuter: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 3,
    borderColor: '#EFE5D0',
    borderTopColor: '#9E7238',
    borderRightColor: '#9E7238',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF6EE',
  },
  playButtonCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#9E7238',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#9E7238',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 3,
  },
  playIconTriangle: {
    fontSize: 13,
    color: '#FFFFFF',
    marginLeft: 2,
  },
  progressPercentBottom: {
    fontSize: 10,
    fontWeight: '700',
    color: '#7D5A27',
    marginTop: 4,
  },
  continueDetailsCol: {
    flex: 1,
  },
  scriptureSubHeader: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#855E24',
    letterSpacing: 0.8,
  },
  chapterVerseMetaText: {
    fontSize: 12.5,
    fontWeight: '500',
    color: '#69645B',
    marginTop: 1,
    marginBottom: 2,
  },
  chapterTitleLarge: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1A17',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 6,
  },
  progressInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressCounterText: {
    fontSize: 11.5,
    color: '#787369',
  },
  progressPercentRightText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#1C1A17',
  },
  continueReadingBtn: {
    backgroundColor: '#9E7238',
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#9E7238',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  continueReadingBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  /* 4. Daily Wisdom Card */
  wisdomCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8DEC7',
    borderWidth: 1.2,
    borderRadius: 18,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: 'rgba(140, 99, 38, 0.08)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  wisdomHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  wisdomSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#855E24',
    letterSpacing: 1.1,
  },
  wisdomHeaderSubtitle: {
    fontSize: 11.5,
    fontStyle: 'italic',
    color: '#7A756D',
  },
  shlokaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  decorativeQuote: {
    fontSize: 32,
    color: '#C69A3C',
    lineHeight: 28,
    marginRight: 6,
    marginTop: -2,
  },
  shlokaSanskrit: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1C1A17',
    lineHeight: 23,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  shlokaTranslation: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#474239',
    lineHeight: 20,
    marginBottom: 12,
  },
  translationBold: {
    fontWeight: '700',
    fontStyle: 'normal',
  },
  wisdomFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  shlokaCitation: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#855E24',
  },
  reflectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4BE8D',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FAF7F0',
  },
  reflectBtnIconImg: {
    width: 16,
    height: 12,
    marginRight: 6,
  },
  reflectBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#705121',
  },
  wisdomLeavesWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 92,
    height: 127,
  },
  wisdomLeavesWatermark: {
    width: 92,
    height: 127,
    opacity: 0.85,
  },

  /* 5. Explore Section */
  exploreHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  exploreSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#855E24',
    letterSpacing: 1.1,
  },
  exploreHeaderSubtitle: {
    fontSize: 11.5,
    fontStyle: 'italic',
    color: '#7A756D',
  },
  exploreCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  exploreCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#EFE6D2',
    borderWidth: 1.2,
    borderRadius: 14,
    padding: 12,
    minHeight: 108,
    justifyContent: 'space-between',
    shadowColor: 'rgba(140, 99, 38, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  exploreCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  exploreCardIconImg: {
    width: 26,
    height: 26,
  },
  exploreChevron: {
    fontSize: 16,
    color: '#8C6832',
    fontWeight: '700',
  },
  exploreCardTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#1C1A17',
    marginBottom: 2,
  },
  exploreCardSubtitle: {
    fontSize: 10,
    color: '#7A756D',
    lineHeight: 13,
  },

  /* Modals */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(28, 26, 23, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    width: '100%',
    maxWidth: 360,
    borderColor: '#E8DEC7',
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalIcon: {
    fontSize: 22,
    marginRight: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1A17',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  modalVerseHeading: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#855E24',
    marginBottom: 8,
  },
  modalPrompt: {
    fontSize: 13.5,
    color: '#474239',
    lineHeight: 21,
    marginBottom: 16,
  },
  breathCard: {
    backgroundColor: '#FAF5EA',
    borderColor: '#DFCBB0',
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    marginBottom: 18,
  },
  breathOm: {
    fontSize: 26,
    color: '#855E24',
    marginBottom: 4,
  },
  breathText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#705322',
    letterSpacing: 0.5,
  },
  modalCloseBtn: {
    backgroundColor: '#9E7238',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  modalCloseBtnText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '700',
  },
});
