import React, { useState, useMemo } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SacredBook } from '../types/books';
import { sacredBooksList } from '../data/booksData';
import { colors, radius, spacing } from '../theme/theme';

interface BooksScreenProps {
  onSelectBook: (bookId: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'hinduism', label: 'Hinduism' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'devotion', label: 'Devotion' },
  { id: 'coming_soon', label: 'Coming Soon' },
];

const BOOK_IMAGES: Record<string, any> = {
  gita: require('../../assets/images/book_gita.jpg'),
  garuda_purana: require('../../assets/images/book_garuda.jpg'),
  ramcharitmanas: require('../../assets/images/book_ramayana.jpg'),
  upanishads: require('../../assets/images/book_upanishads.jpg'),
};

export const BooksScreen: React.FC<BooksScreenProps> = ({ onSelectBook }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setInfoMessage(msg);
    setTimeout(() => {
      setInfoMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Filter books based on active category
  const filteredAvailableBooks = useMemo(() => {
    return sacredBooksList.filter((b) => {
      if (!b.available) return false;
      if (selectedCategory === 'coming_soon') return false;
      if (selectedCategory !== 'all' && !b.categories?.includes(selectedCategory)) {
        return false;
      }
      return true;
    });
  }, [selectedCategory]);

  const filteredComingSoonBooks = useMemo(() => {
    return sacredBooksList.filter((b) => {
      if (b.available) return false;
      if (selectedCategory !== 'all' && selectedCategory !== 'coming_soon') {
        if (!b.categories?.includes(selectedCategory)) return false;
      }
      return true;
    });
  }, [selectedCategory]);

  const handlePressComingSoon = (book: SacredBook) => {
    showToast(`${book.title} is locked. It will be released in the upcoming edition!`);
  };

  const renderAvailableCard = (book: SacredBook) => (
    <TouchableOpacity
      key={book.id}
      activeOpacity={0.92}
      style={styles.featuredCard}
      onPress={() => onSelectBook(book.id)}
      accessibilityRole="button"
      accessibilityLabel={`Open ${book.title}`}
    >
      {/* Left Column: Divine Artwork */}
      <View style={styles.featuredImageWrapper}>
        <Image
          source={BOOK_IMAGES[book.id] || BOOK_IMAGES.gita}
          style={styles.featuredImage}
          resizeMode="cover"
        />
      </View>

      {/* Right Column: Details & CTA */}
      <View style={styles.featuredContent}>
        <View style={styles.featuredTopDetails}>
          {/* Om Emblem Badge */}
          <View style={styles.omBadge}>
            <Text style={styles.omText}>ॐ</Text>
          </View>

          {/* Sanskrit Title */}
          <Text style={styles.sanskritTitle}>{book.originalTitle}</Text>

          {/* English Title */}
          <Text style={styles.featuredTitle}>{book.title}</Text>

          {/* Subtitle */}
          <Text style={styles.featuredSubtitle} numberOfLines={2}>
            {book.subtitle}
          </Text>
        </View>

        {/* Badges Row */}
        <View style={styles.badgesRow}>
          <View style={styles.badgePill}>
            <Text style={styles.badgePillText}>📖 18 Chapters</Text>
          </View>
          <View style={styles.badgePill}>
            <Text style={styles.badgePillText}>📄 700 Verses</Text>
          </View>
          <View style={styles.badgePill}>
            <Text style={styles.badgePillText}>🎧 Audio</Text>
          </View>
        </View>

        {/* Read Now Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.readNowBtn}
          onPress={() => onSelectBook(book.id)}
        >
          <Text style={styles.readNowText}>Read Now →</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderComingSoonCard = (book: SacredBook) => (
    <TouchableOpacity
      key={book.id}
      activeOpacity={0.88}
      style={styles.comingSoonCard}
      onPress={() => handlePressComingSoon(book)}
      accessibilityRole="button"
      accessibilityLabel={`${book.title}, coming soon, locked`}
    >
      {/* Left: Thumbnail Image */}
      <View style={styles.csImageWrapper}>
        <Image
          source={BOOK_IMAGES[book.id]}
          style={styles.csImage}
          resizeMode="cover"
        />
      </View>

      {/* Middle: Title, Subtitle, Tags */}
      <View style={styles.csContent}>
        <Text style={styles.csSanskritTitle}>{book.originalTitle}</Text>
        <Text style={styles.csTitle}>{book.title}</Text>
        <Text style={styles.csSubtitle} numberOfLines={2}>
          {book.subtitle}
        </Text>

        {/* Tags Row */}
        <View style={styles.tagsRow}>
          {book.tags?.map((tag, idx) => (
            <View key={idx} style={styles.tagPill}>
              <Text style={styles.tagPillText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Absolute Top-Right Badge: Coming Soon */}
      <View style={styles.csBadgePill}>
        <Text style={styles.csBadgeText}>Coming Soon</Text>
      </View>

      {/* Absolute Middle-Right: Golden Padlock Icon */}
      <View style={styles.csLockWrapper}>
        <Image
          source={require('../../assets/images/icon_lock.png')}
          style={styles.lockIcon}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Region with Temple Artwork */}
        <View style={styles.headerContainer}>
          {/* Background Temple Pagoda Artwork */}
          <View pointerEvents="none" style={styles.headerTempleArtWrapper}>
            <Image
              source={require('../../assets/images/books_header_temple.png')}
              style={styles.headerTempleArt}
              resizeMode="cover"
            />
          </View>

          {/* Left Title & Subtitle */}
          <View style={styles.headerLeft}>
            <Text style={styles.mainTitle}>Sacred Books</Text>
            <Text style={styles.mainSubtitle}>
              Explore timeless wisdom from Indian scriptures.
            </Text>
          </View>

          {/* Right: Poetic Motto + Lotus Divider */}
          <View style={styles.headerRight}>
            <Text style={styles.mottoText}>
              Ancient wisdom{'\n'}for a better tomorrow
            </Text>

            <Image
              source={require('../../assets/images/header_lotus_motif.png')}
              style={styles.lotusMotif}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Category Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(cat.id)}
                style={[
                  styles.categoryPill,
                  isActive && styles.categoryPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isActive && styles.categoryTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Section 1: AVAILABLE NOW */}
        {filteredAvailableBooks.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>AVAILABLE NOW</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  if (filteredAvailableBooks.length > 0) {
                    onSelectBook(filteredAvailableBooks[0].id);
                  }
                }}
              >
                <Text style={styles.seeAllText}>See All &gt;</Text>
              </TouchableOpacity>
            </View>

            {filteredAvailableBooks.map(renderAvailableCard)}
          </View>
        )}

        {/* Section 2: COMING SOON */}
        {filteredComingSoonBooks.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>COMING SOON</Text>
              <Text style={styles.comingSoonSubtext}>
                More sacred texts coming your way...
              </Text>
            </View>

            {filteredComingSoonBooks.map(renderComingSoonCard)}
          </View>
        )}

        {/* Empty state when category filter yields no results */}
        {filteredAvailableBooks.length === 0 &&
          filteredComingSoonBooks.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No sacred texts found</Text>
              <Text style={styles.emptySub}>
                Try adjusting your category filter.
              </Text>
              <TouchableOpacity
                style={styles.resetFilterBtn}
                onPress={() => setSelectedCategory('all')}
              >
                <Text style={styles.resetFilterText}>View All Books</Text>
              </TouchableOpacity>
            </View>
          )}

        {/* Bottom Lotus Banner */}
        <View style={styles.footerBannerWrapper}>
          <Image
            source={require('../../assets/images/books_footer_banner.jpg')}
            style={styles.footerBannerImage}
            resizeMode="cover"
          />
        </View>

        {/* Subtle Toast Message */}
        {infoMessage && (
          <View style={styles.toastContainer}>
            <Text style={styles.toastText}>{infoMessage}</Text>
          </View>
        )}
      </ScrollView>
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
    paddingBottom: Platform.OS === 'ios' ? 48 : 36,
  },

  /* Header */
  headerContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 8,
    paddingBottom: 14,
    minHeight: 110,
    overflow: 'hidden',
  },
  headerTempleArtWrapper: {
    position: 'absolute',
    top: -6,
    right: -10,
    width: 235,
    height: 125,
  },
  headerTempleArt: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 10,
    zIndex: 2,
  },
  mainTitle: {
    fontSize: 27,
    fontWeight: '800',
    color: '#1C1A17',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  mainSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: '#6F675A',
    maxWidth: 215,
  },
  headerRight: {
    alignItems: 'center',
    zIndex: 2,
    marginTop: 8,
    paddingRight: 4,
  },
  mottoText: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#855E24',
    textAlign: 'center',
    lineHeight: 14.5,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 4,
  },
  lotusMotif: {
    width: 80,
    height: 18,
  },

  /* Category Filter Tabs */
  categoriesScroll: {
    flexDirection: 'row',
    paddingBottom: 16,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8DEC7',
  },
  categoryPillActive: {
    backgroundColor: '#9E7238',
    borderColor: '#9E7238',
  },
  categoryText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#6C6356',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  /* Section Header */
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#8D6429',
    letterSpacing: 0.8,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8D6429',
  },
  comingSoonSubtext: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#8A8275',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },

  /* Featured Card: Bhagavad Gita */
  featuredCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EFE6D2',
    borderWidth: 1,
    borderRadius: 16,
    padding: 11,
    flexDirection: 'row',
    shadowColor: 'rgba(140, 99, 38, 0.09)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredImageWrapper: {
    width: 130,
    height: 155,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FAF5EA',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  featuredTopDetails: {},
  omBadge: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#FAF4E8',
    borderColor: '#E6DAC4',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  omText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#96682F',
    marginTop: -1,
  },
  sanskritTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C45A2C',
    marginTop: 2,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1C1A17',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginTop: 1,
    marginBottom: 2,
  },
  featuredSubtitle: {
    fontSize: 11,
    lineHeight: 15,
    color: '#6C6356',
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginVertical: 6,
  },
  badgePill: {
    backgroundColor: '#FAF5EA',
    borderColor: '#EFE6D2',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 5.5,
    paddingVertical: 2.5,
  },
  badgePillText: {
    fontSize: 9.5,
    fontWeight: '600',
    color: '#855E24',
  },
  readNowBtn: {
    alignSelf: 'flex-end',
    backgroundColor: '#9E7238',
    borderRadius: 18,
    paddingVertical: 6.5,
    paddingHorizontal: 14,
    shadowColor: 'rgba(158, 114, 56, 0.25)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  readNowText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  /* Coming Soon Cards */
  comingSoonCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EFE6D2',
    borderWidth: 1,
    borderRadius: 14,
    padding: 10,
    flexDirection: 'row',
    marginBottom: 10,
    position: 'relative',
    shadowColor: 'rgba(140, 99, 38, 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  csImageWrapper: {
    width: 96,
    height: 86,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FAF5EA',
  },
  csImage: {
    width: '100%',
    height: '100%',
  },
  csContent: {
    flex: 1,
    marginLeft: 11,
    paddingRight: 26,
    justifyContent: 'space-between',
  },
  csSanskritTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#C45A2C',
    marginTop: 1,
    maxWidth: '68%',
  },
  csTitle: {
    fontSize: 15.5,
    fontWeight: '700',
    color: '#1C1A17',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginTop: 1,
  },
  csSubtitle: {
    fontSize: 10.5,
    lineHeight: 14.5,
    color: '#6C6356',
    marginTop: 2,
    marginBottom: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 5,
  },
  tagPill: {
    backgroundColor: '#F3EFE7',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagPillText: {
    fontSize: 9.5,
    color: '#6C6356',
    fontWeight: '500',
  },
  csBadgePill: {
    position: 'absolute',
    top: 9,
    right: 10,
    backgroundColor: '#F0EDE6',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
  },
  csBadgeText: {
    fontSize: 9.5,
    fontWeight: '600',
    color: '#827B6E',
  },
  csLockWrapper: {
    position: 'absolute',
    right: 14,
    top: '52%',
    transform: [{ translateY: -9 }],
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    width: 14,
    height: 18,
  },

  /* Empty State */
  emptyContainer: {
    paddingVertical: 36,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1A17',
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 12.5,
    color: '#7D7567',
    marginBottom: 14,
  },
  resetFilterBtn: {
    backgroundColor: '#9E7238',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  resetFilterText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },

  /* Footer Banner */
  footerBannerWrapper: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 4,
    marginBottom: 16,
    borderColor: '#EFE6D2',
    borderWidth: 1,
    shadowColor: 'rgba(140, 99, 38, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  footerBannerImage: {
    width: '100%',
    height: 88,
  },

  /* Toast */
  toastContainer: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: '#2A251F',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  toastText: {
    color: '#FAF7F0',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
