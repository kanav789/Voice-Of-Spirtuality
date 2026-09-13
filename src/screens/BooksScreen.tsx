import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SacredBook } from '../types/books';
import { getAvailableBooks, getComingSoonBooks } from '../data/booksData';
import { colors, radius, spacing, typography } from '../theme/theme';

interface BooksScreenProps {
  onSelectBook: (bookId: string) => void;
}

export const BooksScreen: React.FC<BooksScreenProps> = ({ onSelectBook }) => {
  const availableBooks = getAvailableBooks();
  const comingSoonBooks = getComingSoonBooks();

  const renderAvailableCard = (book: SacredBook) => (
    <TouchableOpacity
      key={book.id}
      activeOpacity={0.88}
      style={styles.availableCard}
      onPress={() => onSelectBook(book.id)}
      accessibilityRole="button"
      accessibilityLabel={`Open ${book.title}, ${book.description}`}
    >
      <View style={styles.cardTopRow}>
        <View style={styles.bookEmblem}>
          <Text style={styles.bookEmblemText}>ॐ</Text>
        </View>

        <View style={styles.availableBadge}>
          <View style={styles.availableDot} />
          <Text style={styles.availableBadgeText}>AVAILABLE</Text>
        </View>
      </View>

      <Text style={styles.originalTitle}>{book.originalTitle}</Text>
      <Text style={styles.availableTitle}>{book.title}</Text>
      <Text style={styles.availableSubtitle}>{book.subtitle}</Text>

      <View style={styles.cardFooter}>
        <View style={styles.metaBadge}>
          <Text style={styles.metaBadgeText}>{book.description}</Text>
        </View>

        <View style={styles.readAction}>
          <Text style={styles.readActionText}>Read</Text>
          <Text style={styles.readActionArrow}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderComingSoonCard = (book: SacredBook) => (
    <View key={book.id} style={styles.comingSoonCard}>
      <View style={styles.comingSoonHeader}>
        <View style={styles.comingSoonLeft}>
          <Text style={styles.comingSoonOriginalTitle}>{book.originalTitle}</Text>
          <Text style={styles.comingSoonTitle}>{book.title}</Text>
        </View>

        <View style={styles.comingSoonBadge}>
          <Text style={styles.comingSoonBadgeText}>Coming Soon</Text>
        </View>
      </View>

      <Text style={styles.comingSoonSubtitle}>{book.subtitle}</Text>

      <View style={styles.comingSoonFooter}>
        <Text style={styles.comingSoonMeta}>{book.description}</Text>
        <Text style={styles.lockIcon}>🔒</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Sacred Books</Text>
          <Text style={styles.subtitle}>
            Explore timeless wisdom from Indian scriptures.
          </Text>
        </View>

        {/* Section 1: Available */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>AVAILABLE NOW</Text>
            <View style={styles.sectionLine} />
          </View>
          {availableBooks.map(renderAvailableCard)}
        </View>

        {/* Section 2: Coming Soon */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>COMING SOON</Text>
            <View style={styles.sectionLine} />
          </View>
          <Text style={styles.comingSoonIntro}>
            Additional sacred texts will be unlocked in upcoming editions.
          </Text>
          {comingSoonBooks.map(renderComingSoonCard)}
        </View>
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
  header: {
    marginBottom: spacing.lg,
    paddingTop: spacing.xs,
  },
  title: {
    ...typography.screenTitle,
    fontSize: 26,
    marginBottom: 4,
  },
  subtitle: {
    ...typography.screenSubtitle,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.darkGold,
    letterSpacing: 1,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginLeft: spacing.md,
  },
  availableCard: {
    backgroundColor: colors.surface,
    borderColor: colors.borderGold,
    borderWidth: 1.5,
    borderRadius: radius.lg,
    padding: spacing.lg,
    shadowColor: colors.goldShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  bookEmblem: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.lightGoldBg,
    borderColor: colors.borderGold,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookEmblemText: {
    fontSize: 20,
    color: colors.darkGold,
    fontWeight: '600',
    marginTop: -2,
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201, 162, 39, 0.14)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
  },
  availableDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primaryGold,
    marginRight: 5,
  },
  availableBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.darkGold,
    letterSpacing: 0.5,
  },
  originalTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.darkGold,
    marginBottom: 2,
  },
  availableTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: 4,
  },
  availableSubtitle: {
    fontSize: 13,
    color: colors.secondaryText,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.xs,
  },
  metaBadge: {
    backgroundColor: colors.lightGoldBg,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
  },
  metaBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.darkGold,
  },
  readAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.deepBlue,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
  },
  readActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.surface,
    marginRight: 4,
  },
  readActionArrow: {
    fontSize: 15,
    color: colors.primaryGold,
    fontWeight: '700',
  },
  comingSoonIntro: {
    fontSize: 12,
    color: colors.secondaryText,
    marginBottom: spacing.md,
  },
  comingSoonCard: {
    backgroundColor: colors.disabledSurface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    opacity: 0.85,
  },
  comingSoonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  comingSoonLeft: {
    flex: 1,
  },
  comingSoonOriginalTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.tertiaryText,
    marginBottom: 1,
  },
  comingSoonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryText,
  },
  comingSoonBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderColor: colors.border,
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
    marginLeft: spacing.sm,
  },
  comingSoonBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.secondaryText,
  },
  comingSoonSubtitle: {
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 16,
    marginBottom: spacing.sm,
  },
  comingSoonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: spacing.xs,
  },
  comingSoonMeta: {
    fontSize: 11,
    color: colors.tertiaryText,
    fontStyle: 'italic',
  },
  lockIcon: {
    fontSize: 12,
    opacity: 0.6,
  },
});
