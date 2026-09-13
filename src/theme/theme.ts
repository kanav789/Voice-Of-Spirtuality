export const colors = {
  // Primary Palette
  background: '#FCFAF5', // Warm Ivory
  surface: '#FFFFFF', // Pure White surface
  primaryGold: '#C9A227', // Antique / Primary Gold
  darkGold: '#9B7615', // Dark Gold for accents & badges
  lightGold: '#E5C158',
  lightGoldBg: '#FAF5E8', // Light Gold tint
  deepBlue: '#263B63', // Deep Krishna Blue
  deepBlueDark: '#1A2946',
  deepBlueLight: '#EBF0F8',

  // Typography
  primaryText: '#202020', // Dark Charcoal
  secondaryText: '#6F6B63', // Muted Spiritual Brown/Grey
  tertiaryText: '#9E998F',

  // Borders & Dividers
  border: '#E7E0CF', // Warm neutral border
  borderSubtle: '#F2EDE2',
  borderGold: '#D8C38B',
  goldBorder: '#E7E0CF', // Alias
  goldBorderSubtle: '#F2EDE2', // Alias

  // Aliases for compatibility
  pureWhite: '#FFFFFF',
  warmWhite: '#FCFAF5',
  disabledGold: '#C0B9A8',
  accentBadgeBg: '#FAF5E8',

  // Special States
  activeVerseBg: '#FFF9EB',
  activeVerseBorder: '#C9A227',
  disabledSurface: '#F5F2EB',
  disabledText: '#A8A49C',
  cardShadow: 'rgba(38, 59, 99, 0.06)',
  goldShadow: 'rgba(201, 162, 39, 0.15)',
};

export const typography = {
  screenTitle: {
    fontSize: 26,
    fontWeight: '700' as const,
    color: colors.primaryText,
    letterSpacing: 0.3,
  },
  screenSubtitle: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: colors.secondaryText,
    lineHeight: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: colors.primaryText,
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: colors.darkGold,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
  },
  sanskritVerse: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#1A1813',
    lineHeight: 30,
    letterSpacing: 0.2,
  },
  hindiMeaning: {
    fontSize: 15,
    fontWeight: '400' as const,
    color: '#333333',
    lineHeight: 24,
  },
  chapterNumber: {
    fontSize: 11,
    fontWeight: '700' as const,
    color: colors.darkGold,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.primaryText,
    lineHeight: 24,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '500' as const,
    color: colors.secondaryText,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600' as const,
    letterSpacing: 0.3,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  xxl: 36,
};

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  pill: 999,
};
