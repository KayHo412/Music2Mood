import React from 'react';
import { View, ViewProps, useColorScheme } from 'react-native';
import { colors } from '../utils/theme';

interface ThemedViewProps extends ViewProps {
  type?: 'background' | 'card';
}

export const ThemedView: React.FC<ThemedViewProps> = ({
  style,
  type = 'background',
  ...props
}) => {
  const isDark = useColorScheme() === 'dark';
  const palette = isDark ? colors.dark : colors.light;

  const backgroundColor = type === 'card' ? palette.card : palette.background;

  return <View {...props} style={[{ backgroundColor }, style]} />;
};
