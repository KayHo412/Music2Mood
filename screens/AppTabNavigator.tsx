import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, useColorScheme } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { colors, spacing } from '../utils/theme';
import PlayerScreen from './PlayerScreen';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';
import SettingsScreen from './SettingsScreen';

type TabType = 'player' | 'search' | 'profile' | 'settings';

const AppTabNavigator = () => {
  const [tab, setTab] = useState<TabType>('player');
  const isDark = useColorScheme() === 'dark';
  const palette = isDark ? colors.dark : colors.light;

  const screen = {
    player: <PlayerScreen />,
    search: <SearchScreen />,
    profile: <ProfileScreen />,
    settings: <SettingsScreen />,
  }[tab];

  const tabs: Array<{ key: TabType; icon: any; label: string }> = [
    { key: 'player', icon: 'play-circle', label: 'Now Playing' },
    { key: 'search', icon: 'search', label: 'Search' },
    { key: 'profile', icon: 'library', label: 'Library' },
    { key: 'settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.background }}>
      <ThemedView type="background" style={{ flex: 1 }}>
        {screen}
      </ThemedView>

      {/* Bottom Tab Bar */}
      <ThemedView
        type="card"
        style={{
          flexDirection: 'row',
          borderTopWidth: 1,
          borderTopColor: palette.divider,
        }}
      >
        {tabs.map((t) => (
          <TouchableOpacity
            key={t.key}
            onPress={() => setTab(t.key)}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: spacing.md,
            }}
          >
            <Ionicons
              name={t.icon}
              size={24}
              color={tab === t.key ? palette.accent : palette.textSecondary}
            />
            <ThemedText
              type="caption"
              color={tab === t.key ? 'accent' : 'secondary'}
              style={{ marginTop: spacing.xs }}
            >
              {t.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </SafeAreaView>
  );
};

export default AppTabNavigator;
