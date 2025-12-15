import { useColorScheme } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { colors } from '../utils/theme';

export const useThemeColors = () => {
  const systemTheme = useColorScheme();
  const { theme } = useAppContext();

  const isDark = theme === 'system'
    ? systemTheme === 'dark'
    : theme === 'dark';

  return isDark ? colors.dark : colors.light;
};
