import React from 'react';
import { Text, TextProps, useColorScheme } from 'react-native';
import { colors, typography } from '../utils/theme';

interface ThemedTextProps extends TextProps {
  type?: 'h1' | 'h2' | 'h3' | 'body' | 'bodyBold' | 'small' | 'smallBold' | 'caption';
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  style,
  type = 'body',
  color = 'primary',
  ...props
}) => {
  const isDark = useColorScheme() === 'dark';
  const palette = isDark ? colors.dark : colors.light;

  const colorMap = {
    primary: palette.text,
    secondary: palette.textSecondary,
    accent: palette.accent,
    success: palette.success,
    warning: palette.warning,
  };

  return (
    <Text
      {...props}
      style={[
        typography[type],
        { color: colorMap[color] },
        style,
      ]}
    />
  );
};
