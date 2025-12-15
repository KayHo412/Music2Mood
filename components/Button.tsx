import React from 'react';
import {
    ActivityIndicator,
    TouchableOpacity,
    ViewStyle,
    useColorScheme,
} from 'react-native';
import { borderRadius, colors, spacing } from '../utils/theme';
import { ThemedText } from './ThemedText';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
}) => {
  const isDark = useColorScheme() === 'dark';
  const palette = isDark ? colors.dark : colors.light;

  const sizeStyles = {
    small: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
    medium: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
    large: { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl },
  };

  const variantStyles = {
    primary: {
      backgroundColor: palette.accent,
    },
    secondary: {
      backgroundColor: palette.card,
      borderWidth: 1,
      borderColor: palette.divider,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: palette.accent,
    },
  };

  const textColor = variant === 'outline' ? 'accent' : variant === 'secondary' ? 'primary' : 'primary';
  const textColorValue = variant === 'outline' || variant === 'secondary' ? palette.text : '#ffffff';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        {
          ...sizeStyles[size],
          ...variantStyles[variant],
          borderRadius: borderRadius.lg,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColorValue} />
      ) : (
        <ThemedText
          type="bodyBold"
          style={{ color: textColorValue }}
        >
          {title}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
};
