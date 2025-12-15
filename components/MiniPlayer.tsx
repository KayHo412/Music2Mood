import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, useColorScheme, View } from 'react-native';
import { borderRadius, colors, spacing } from '../utils/theme';
import { ThemedText } from './ThemedText';

interface MiniPlayerProps {
  playlistName: string;
  isPlaying: boolean;
  onPress: () => void;
  onPlayPause: () => void;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  playlistName,
  isPlaying,
  onPress,
  onPlayPause,
}) => {
  const isDark = useColorScheme() === 'dark';
  const palette = isDark ? colors.dark : colors.light;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: palette.card,
        borderRadius: borderRadius.lg,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.lg,
        padding: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: palette.accent,
      }}
    >
      <View style={{ flex: 1 }}>
        <ThemedText type="smallBold" numberOfLines={1}>
          {playlistName}
        </ThemedText>
        <ThemedText type="caption" color="secondary">
          Now playing
        </ThemedText>
      </View>
      <TouchableOpacity
        onPress={onPlayPause}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: palette.accent,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: spacing.md,
        }}
      >
        <Ionicons
          name={isPlaying ? 'pause-sharp' : 'play-sharp'}
          size={18}
          color="#ffffff"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
