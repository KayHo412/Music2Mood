import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View, useColorScheme } from 'react-native';
import { borderRadius, colors, spacing } from '../utils/theme';
import { ThemedText } from './ThemedText';

interface PlaylistCardProps {
  name: string;
  description: string;
  songs: number;
  onPress: () => void;
  emoji?: string;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({
  name,
  description,
  songs,
  onPress,
  emoji,
}) => {
  const isDark = useColorScheme() === 'dark';
  const palette = isDark ? colors.dark : colors.light;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: palette.card,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginHorizontal: spacing.md,
        marginVertical: spacing.sm,
        borderWidth: 1,
        borderColor: palette.divider,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: borderRadius.md,
            backgroundColor: palette.accent,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing.md,
          }}
        >
          <ThemedText type="h2" style={{ fontSize: 28 }}>
            {emoji || '🎵'}
          </ThemedText>
        </View>
        <ThemedText type="bodyBold">{name}</ThemedText>
      </View>
      <ThemedText type="small" color="secondary" style={{ marginBottom: spacing.sm }}>
        {description}
      </ThemedText>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <ThemedText type="caption" color="secondary">
          {songs} songs
        </ThemedText>
        <Ionicons name="chevron-forward" size={20} color={palette.textSecondary} />
      </View>
    </TouchableOpacity>
  );
};
