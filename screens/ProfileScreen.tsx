import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, useColorScheme, View } from 'react-native';
import { Button } from '../components/Button';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useAppContext } from '../context/AppContext';
import { borderRadius, colors, spacing } from '../utils/theme';

const ProfileScreen = () => {
  const { moodHistory, clearHistory } = useAppContext();
  const isDark = useColorScheme() === 'dark';
  const palette = isDark ? colors.dark : colors.light;

  const stats = [
    { label: 'Total Moods Detected', value: moodHistory.length },
    { label: 'Favorite Mood', value: moodHistory.length > 0 ? 'Happy' : 'N/A' },
    { label: 'Songs Played', value: '248' },
  ];

  return (
    <ThemedView type="background" style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: spacing.lg }}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.xl }}>
          <ThemedText type="h2">Your Library</ThemedText>
        </View>

        {/* User Profile Card */}
        <View
          style={{
            marginHorizontal: spacing.lg,
            marginBottom: spacing.xl,
            backgroundColor: palette.card,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            borderWidth: 1,
            borderColor: palette.divider,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: palette.accent,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: spacing.lg,
              }}
            >
              <ThemedText type="h2" style={{ fontSize: 30, color: '#ffffff' }}>
                👤
              </ThemedText>
            </View>
            <View>
              <ThemedText type="bodyBold">User</ThemedText>
              <ThemedText type="small" color="secondary">
                Premium Member
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.xl }}>
          <ThemedText type="h3" style={{ marginBottom: spacing.lg }}>
            Your Stats
          </ThemedText>
          <View style={{ gap: spacing.md }}>
            {stats.map((stat, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: palette.card,
                  borderRadius: borderRadius.lg,
                  padding: spacing.lg,
                  borderWidth: 1,
                  borderColor: palette.divider,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <ThemedText type="small" color="secondary">
                  {stat.label}
                </ThemedText>
                <ThemedText type="bodyBold">{stat.value}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Mood History */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.xl }}>
          <ThemedText type="h3" style={{ marginBottom: spacing.lg }}>
            Recent Moods
          </ThemedText>
          {moodHistory.length > 0 ? (
            <View style={{ gap: spacing.md }}>
              {moodHistory.slice(0, 5).map((m, i) => (
                <View
                  key={i}
                  style={{
                    backgroundColor: palette.card,
                    borderRadius: borderRadius.lg,
                    padding: spacing.lg,
                    borderWidth: 1,
                    borderColor: palette.divider,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View>
                    <ThemedText type="bodyBold">{m.mood}</ThemedText>
                    <ThemedText type="caption" color="secondary">
                      {m.playlistName}
                    </ThemedText>
                    <ThemedText type="caption" color="secondary" style={{ marginTop: spacing.xs }}>
                      {new Date(m.timestamp).toLocaleString()}
                    </ThemedText>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={palette.textSecondary} />
                </View>
              ))}
            </View>
          ) : (
            <View
              style={{
                backgroundColor: palette.card,
                borderRadius: borderRadius.lg,
                padding: spacing.lg,
                borderWidth: 1,
                borderColor: palette.divider,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="time" size={40} color={palette.textSecondary} />
              <ThemedText type="small" color="secondary" style={{ marginTop: spacing.md }}>
                No mood history yet
              </ThemedText>
            </View>
          )}
        </View>

        {/* Actions */}
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md }}>
          {moodHistory.length > 0 && (
            <Button
              title="Clear History"
              onPress={clearHistory}
              variant="secondary"
              size="large"
            />
          )}
          <Button
            title="Export History"
            onPress={() => {}}
            variant="outline"
            size="large"
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default ProfileScreen;
