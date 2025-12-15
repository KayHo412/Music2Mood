import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { useAppContext } from './AppContext';

interface ThemeContextType {
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemTheme = useColorScheme();
  const { theme } = useAppContext();

  const isDark = theme === 'system'
    ? systemTheme === 'dark'
    : theme === 'dark';

  return (
    <ThemeContext.Provider value={{ isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
