import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface MoodLog {
  mood: string;
  timestamp: string;
  playlistName: string;
}

export interface Playlist {
  id: string;
  name: string;
  mood: string;
  songs: number;
  description: string;
}

interface AppContextType {
  // Auth
  isLoggedIn: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;

  // Current State
  currentMood: string | null;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;

  // Mood Management
  updateMood: (mood: string) => Promise<void>;
  moodHistory: MoodLog[];
  clearHistory: () => Promise<void>;

  // Playlists
  favorites: string[];
  toggleFavorite: (playlistId: string) => Promise<void>;

  // User Preferences
  notifications: boolean;
  setNotifications: (enabled: boolean) => Promise<void>;
  autoPlay: boolean;
  setAutoPlay: (enabled: boolean) => Promise<void>;

  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const PLAYLIST_MAP: { [key: string]: string } = {
  Happy: '🎉 Upbeat Vibes',
  Calm: '🌊 Peaceful Melodies',
  Energetic: '⚡ Power Workout',
  Sad: '💙 Melancholic',
  Excited: '🎊 Euphoria',
  Motivated: '💪 Pump It Up',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Current State
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // History
  const [moodHistory, setMoodHistory] = useState<MoodLog[]>([]);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>([]);

  // Preferences
  const [notifications, setNotifications] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>('system');

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const history = await AsyncStorage.getItem('moodHistory');
        const favs = await AsyncStorage.getItem('favorites');
        const notif = await AsyncStorage.getItem('notifications');
        const auto = await AsyncStorage.getItem('autoPlay');
        const savedTheme = await AsyncStorage.getItem('theme');

        if (token) setIsLoggedIn(true);
        if (history) setMoodHistory(JSON.parse(history));
        if (favs) setFavorites(JSON.parse(favs));
        if (notif) setNotifications(JSON.parse(notif));
        if (auto) setAutoPlay(JSON.parse(auto));
        if (savedTheme) setThemeState(savedTheme as 'light' | 'dark' | 'system');
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  // Save mood history
  useEffect(() => {
    AsyncStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  }, [moodHistory]);

  // Save favorites
  useEffect(() => {
    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Auth functions
  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setIsLoggedIn(false);
      setCurrentMood(null);
      setIsPlaying(false);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Mood functions
  const updateMood = async (mood: string) => {
    setCurrentMood(mood);
    const newLog: MoodLog = {
      mood,
      timestamp: new Date().toISOString(),
      playlistName: PLAYLIST_MAP[mood] || 'Mixed Playlist',
    };
    setMoodHistory([newLog, ...moodHistory].slice(0, 50));
    if (autoPlay) setIsPlaying(true);
  };

  const clearHistory = async () => {
    setMoodHistory([]);
  };

  // Favorites
  const toggleFavorite = async (playlistId: string) => {
    const newFavorites = favorites.includes(playlistId)
      ? favorites.filter((id) => id !== playlistId)
      : [...favorites, playlistId];
    setFavorites(newFavorites);
  };

  // Preferences
  const updateNotifications = async (enabled: boolean) => {
    setNotifications(enabled);
    await AsyncStorage.setItem('notifications', JSON.stringify(enabled));
  };

  const updateAutoPlay = async (enabled: boolean) => {
    setAutoPlay(enabled);
    await AsyncStorage.setItem('autoPlay', JSON.stringify(enabled));
  };

  const updateTheme = async (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  const value: AppContextType = {
    isLoggedIn,
    login,
    logout,
    currentMood,
    isPlaying,
    setIsPlaying,
    updateMood,
    moodHistory,
    clearHistory,
    favorites,
    toggleFavorite,
    notifications,
    setNotifications: updateNotifications,
    autoPlay,
    setAutoPlay: updateAutoPlay,
    theme,
    setTheme: updateTheme,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside AppProvider');
  return ctx;
};
