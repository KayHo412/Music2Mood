import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    ScrollView,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { Button } from '../components/Button';
import CameraComponent from '../components/CameraComponent';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useAppContext } from '../context/AppContext';
import { PLAYLISTS } from '../utils/constants';
import { borderRadius, colors, spacing } from '../utils/theme';

const PlayerScreen = () => {
  const { currentMood, updateMood } = useAppContext();
  const [showCamera, setShowCamera] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const isDark = useColorScheme() === 'dark';
  const palette = isDark ? colors.dark : colors.light;
  const { height } = Dimensions.get('window');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev + 1) % 240); // 4 minutes loop
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const handleMoodDetected = async (mood: string) => {
    await updateMood(mood);
    setShowCamera(false);
  };

  const playlistInfo = currentMood ? PLAYLISTS[currentMood as keyof typeof PLAYLISTS] : null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showCamera) {
    return (
      <ThemedView type="background" style={{ flex: 1 }}>
        <View style={{ paddingTop: spacing.lg, paddingHorizontal: spacing.lg }}>
          <TouchableOpacity onPress={() => setShowCamera(false)}>
            <ThemedText type="bodyBold" color="accent">
              ← Back
            </ThemedText>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg }}>
          <CameraComponent onCapture={handleMoodDetected} />
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView type="background" style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: spacing.lg }}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.xl }}>
          <ThemedText type="h2">Now Playing</ThemedText>
        </View>

        {currentMood && playlistInfo ? (
          <View style={{ flex: 1 }}>
            {/* Album Art */}
            <View style={{ alignItems: 'center', marginBottom: spacing.xl }}>
              <View
                style={{
                  width: height * 0.35,
                  height: height * 0.35,
                  borderRadius: borderRadius.lg,
                  backgroundColor: palette.accent,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: spacing.lg,
                  shadowColor: palette.accent,
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.3,
                  shadowRadius: 20,
                  elevation: 20,
                }}
              >
                <ThemedText type="h1" style={{ fontSize: 80, color: '#ffffff' }}>
                  {playlistInfo.name.charAt(0)}
                </ThemedText>
              </View>
            </View>

            {/* Playlist Info */}
            <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.xl }}>
              <ThemedText type="h3" style={{ marginBottom: spacing.sm }}>
                {playlistInfo.name}
              </ThemedText>
              <ThemedText type="small" color="secondary">
                {playlistInfo.description}
              </ThemedText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: spacing.md,
                }}
              >
                <Ionicons name="musical-notes" size={16} color={palette.accent} />
                <ThemedText type="small" color="secondary" style={{ marginLeft: spacing.sm }}>
                  {playlistInfo.songs} songs
                </ThemedText>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.lg }}>
              <View
                style={{
                  height: 4,
                  backgroundColor: palette.divider,
                  borderRadius: borderRadius.full,
                  overflow: 'hidden',
                  marginBottom: spacing.sm,
                }}
              >
                <View
                  style={{
                    height: '100%',
                    width: `${(currentTime / 240) * 100}%`,
                    backgroundColor: palette.accent,
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ThemedText type="caption" color="secondary">
                  {formatTime(currentTime)}
                </ThemedText>
                <ThemedText type="caption" color="secondary">
                  4:00
                </ThemedText>
              </View>
            </View>

            {/* Controls */}
            <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.xl }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginBottom: spacing.lg,
                }}
              >
                <TouchableOpacity>
                  <Ionicons name="shuffle" size={24} color={palette.textSecondary} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="play-skip-back-sharp" size={24} color={palette.text} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsPlaying(!isPlaying)}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: palette.accent,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons
                    name={isPlaying ? 'pause-sharp' : 'play-sharp'}
                    size={24}
                    color="#ffffff"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="play-skip-forward-sharp" size={24} color={palette.text} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="repeat" size={24} color={palette.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* Action Buttons */}
              <Button
                title="Change Mood"
                onPress={() => setShowCamera(true)}
                variant="outline"
                size="large"
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: spacing.lg,
              marginBottom: spacing.xl,
            }}
          >
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: borderRadius.lg,
                backgroundColor: palette.card,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: spacing.lg,
              }}
            >
              <Ionicons name="help-circle-outline" size={50} color={palette.textSecondary} />
            </View>
            <ThemedText type="h3" style={{ marginBottom: spacing.sm, textAlign: 'center' }}>
              No Mood Detected
            </ThemedText>
            <ThemedText
              type="small"
              color="secondary"
              style={{ marginBottom: spacing.xl, textAlign: 'center' }}
            >
              Capture your mood to get personalized playlists
            </ThemedText>
            <Button
              title="Detect Mood"
              onPress={() => setShowCamera(true)}
              size="large"
            />
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
};

export default PlayerScreen;
