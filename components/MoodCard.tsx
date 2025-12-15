import React from 'react';
import { ActivityIndicator, TouchableOpacity, useColorScheme } from 'react-native';
import { borderRadius, colors, spacing } from '../utils/theme';
import { ThemedText } from './ThemedText';

interface MoodCardProps {
  mood: string;
  emoji: string;
  selected?: boolean;
  loading?: boolean;
  onPress: () => void;
}

export const MoodCard: React.FC<MoodCardProps> = ({
  mood,
  emoji,
  selected = false,
  loading = false,
  onPress,
}) => {
  const isDark = useColorScheme() === 'dark';
  const palette = isDark ? colors.dark : colors.light;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={{
        flex: 1,
        margin: spacing.sm,
        backgroundColor: selected ? palette.accent : palette.card,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
        borderWidth: selected ? 2 : 1,
        borderColor: selected ? palette.accent : palette.divider,
      }}
    >
      {loading ? (
        <ActivityIndicator color={palette.accent} />
      ) : (
        <>
          <ThemedText type="h2" style={{ fontSize: 40, marginBottom: spacing.sm }}>
            {emoji}
          </ThemedText>
          <ThemedText
            type="smallBold"
            color={selected ? 'primary' : 'primary'}
            style={{ color: selected ? '#ffffff' : palette.text }}
          >
            {mood}
          </ThemedText>
        </>
      )}
    </TouchableOpacity>
  );
};
