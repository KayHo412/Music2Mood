import React, { useState } from 'react';
import { ScrollView, useColorScheme, View } from 'react-native';
import { PlaylistCard } from '../components/PlaylistCard';
import { SearchBar } from '../components/SearchBar';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { PLAYLISTS, TRENDING_PLAYLISTS } from '../utils/constants';
import { colors, spacing } from '../utils/theme';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const isDark = useColorScheme() === 'dark';
  const palette = isDark ? colors.dark : colors.light;

  const moods = Object.entries(PLAYLISTS);
  const emojiMap: { [key: string]: string } = {
    Happy: '🎉',
    Calm: '🌊',
    Energetic: '⚡',
  };

  return (
    <ThemedView type="background" style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: spacing.lg }}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.lg }}>
          <ThemedText type="h2">Search & Explore</ThemedText>
        </View>

        {/* Search Bar */}
        <SearchBar
          placeholder="Search songs, playlists, artists..."
          value={query}
          onChangeText={setQuery}
        />

        {!query ? (
          <>
            {/* Mood Playlists */}
            <View style={{ marginTop: spacing.xl, marginBottom: spacing.xl }}>
              <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.lg }}>
                <ThemedText type="h3">Mood Playlists</ThemedText>
              </View>
              {moods.map(([key, playlist]) => (
                <PlaylistCard
                  key={key}
                  name={playlist.name}
                  description={playlist.description}
                  songs={playlist.songs}
                  emoji={emojiMap[key]}
                  onPress={() => {}}
                />
              ))}
            </View>

            {/* Trending */}
            <View style={{ marginBottom: spacing.xl }}>
              <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.lg }}>
                <ThemedText type="h3">Trending Now</ThemedText>
              </View>
              {TRENDING_PLAYLISTS.map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  name={playlist.name}
                  description={`Popular playlist · ${Math.floor(Math.random() * 50 + 20)}h`}
                  songs={playlist.songs}
                  emoji="🔥"
                  onPress={() => {}}
                />
              ))}
            </View>

            {/* Browse All */}
            <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }}>
              <ThemedText type="h3" style={{ marginBottom: spacing.lg }}>
                Browse by Mood
              </ThemedText>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md }}>
                {['Happy', 'Sad', 'Energetic', 'Calm', 'Focused', 'Chill'].map((mood) => (
                  <View
                    key={mood}
                    style={{
                      flex: 1,
                      minWidth: '45%',
                      backgroundColor: palette.card,
                      borderRadius: 12,
                      padding: spacing.md,
                      borderWidth: 1,
                      borderColor: palette.divider,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ThemedText type="bodyBold" style={{ textAlign: 'center' }}>
                      {mood}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </View>
          </>
        ) : (
          <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xl }}>
            <ThemedText type="small" color="secondary">
              Search results for "{query}"
            </ThemedText>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
};

export default SearchScreen;
