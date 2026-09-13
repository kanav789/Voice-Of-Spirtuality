export const colors = {
  primaryGold: '#C9A227',
  darkGold: '#A67C00',
  lightGold: '#E5C158',
  warmWhite: '#FFFDF7',
  pureWhite: '#FFFFFF',
  primaryText: '#222222',
  secondaryText: '#6B6B6B',
  lightGoldBg: '#FBF7E8',
  goldBorder: '#EADBB6',
  goldBorderSubtle: '#F4ECE0',
  activeVerseBg: '#FFF9E8',
  activeVerseBorder: '#C9A227',
  cardShadow: 'rgba(166, 124, 0, 0.08)',
  accentBadgeBg: '#F6EFCF',
  disabledGold: '#D8CBB0',
};

export const typography = {
  headerTitle: {
    fontSize: 26,
    fontWeight: '700' as const,
    color: colors.primaryText,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: colors.darkGold,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
  },
  sanskritVerse: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#1F1A12',
    lineHeight: 30,
    letterSpacing: 0.2,
  },
  hindiMeaning: {
    fontSize: 15,
    fontWeight: '400' as const,
    color: '#3A3A3A',
    lineHeight: 24,
  },
  chapterNumber: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: colors.darkGold,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
  chapterTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: colors.primaryText,
    lineHeight: 26,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '500' as const,
    color: colors.secondaryText,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  pill: 999,
};
