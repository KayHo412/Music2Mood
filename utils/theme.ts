export const colors = {
  dark: {
    background: '#000000',
    card: '#1a1a1a',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    accent: '#ff2d55',
    primary: '#ff2d55',
    divider: '#2a2a2a',
    success: '#34c759',
    warning: '#ff9500',
  },
  light: {
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#000000',
    textSecondary: '#666666',
    accent: '#ff2d55',
    primary: '#ff2d55',
    divider: '#e0e0e0',
    success: '#34c759',
    warning: '#ff9500',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 1000,
};

export const typography = {
  h1: { fontSize: 34, fontWeight: '700' as const },
  h2: { fontSize: 28, fontWeight: '700' as const },
  h3: { fontSize: 22, fontWeight: '600' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  bodyBold: { fontSize: 16, fontWeight: '600' as const },
  small: { fontSize: 14, fontWeight: '400' as const },
  smallBold: { fontSize: 14, fontWeight: '600' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
};
