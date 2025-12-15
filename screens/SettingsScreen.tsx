import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Button } from '../components/Button';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useAppContext } from '../context/AppContext';
import { borderRadius, colors, spacing } from '../utils/theme';

const SettingsScreen = () => {
  const { logout, theme, setTheme } = useAppContext();
  const isDark = useColorScheme() === 'dark';
  const palette = isDark ? colors.dark : colors.light;
  const [notifications, setNotifications] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);

  const getThemeLabel = () => {
    if (theme === 'dark') return 'Dark';
    if (theme === 'light') return 'Light';
    return 'System';
  };

  const cycleTheme = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  };

  const settingItems = [
    {
      title: 'Account',
      icon: 'person-circle-outline' as const,
      options: [
        { label: 'Edit Profile', action: () => {} },
        { label: 'Change Password', action: () => {} },
      ],
    },
    {
      title: 'Preferences',
      icon: 'settings-outline' as const,
      options: [
        { label: 'Theme', value: getThemeLabel(), action: cycleTheme },
        { label: 'Notifications', toggle: notifications, onToggle: setNotifications },
        { label: 'Autoplay', toggle: autoPlay, onToggle: setAutoPlay },
      ],
    },
    {
      title: 'About',
      icon: 'information-circle-outline' as const,
      options: [
        { label: 'App Version', value: '1.0.0' },
        { label: 'Help & Support', action: () => {} },
        { label: 'Privacy Policy', action: () => {} },
      ],
    },
  ];

  return (
    <ThemedView type="background" style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: spacing.lg }}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.xl }}>
          <ThemedText type="h2">Settings</ThemedText>
        </View>

        {/* Settings Sections */}
        {settingItems.map((section, sectionIndex) => (
          <View key={sectionIndex} style={{ marginBottom: spacing.xl }}>
            {/* Section Header */}
            <View
              style={{
                paddingHorizontal: spacing.lg,
                marginBottom: spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Ionicons name={section.icon} size={20} color={palette.accent} />
              <ThemedText type="bodyBold" style={{ marginLeft: spacing.md }}>
                {section.title}
              </ThemedText>
            </View>

            {/* Section Options */}
            <View
              style={{
                marginHorizontal: spacing.lg,
                backgroundColor: palette.card,
                borderRadius: borderRadius.lg,
                borderWidth: 1,
                borderColor: palette.divider,
                overflow: 'hidden',
              }}
            >
              {section.options.map((option, optionIndex) => (
                <View
                  key={optionIndex}
                  style={[
                    {
                      paddingHorizontal: spacing.lg,
                      paddingVertical: spacing.lg,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    },
                    optionIndex !== section.options.length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: palette.divider,
                    },
                  ]}
                >
                  <ThemedText type="body">{option.label}</ThemedText>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {'toggle' in option ? (
                      <TouchableOpacity
                        onPress={() => option.onToggle?.(!option.toggle)}
                        style={{
                          width: 50,
                          height: 28,
                          borderRadius: 14,
                          backgroundColor: option.toggle ? palette.accent : palette.divider,
                          justifyContent: 'center',
                          paddingHorizontal: 2,
                        }}
                      >
                        <View
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 12,
                            backgroundColor: '#ffffff',
                            marginLeft: option.toggle ? 23 : 0,
                          }}
                        />
                      </TouchableOpacity>
                    ) : 'value' in option ? (
                      <TouchableOpacity
                        onPress={option.action}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <ThemedText type="small" color="secondary" style={{ marginRight: spacing.sm }}>
                          {option.value}
                        </ThemedText>
                        {option.action && (
                          <Ionicons name="chevron-forward" size={20} color={palette.textSecondary} />
                        )}
                      </TouchableOpacity>
                    ) : (
                      <Ionicons name="chevron-forward" size={20} color={palette.textSecondary} />
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.xl }}>
          <Button
            title="Log Out"
            onPress={logout}
            variant="secondary"
            size="large"
          />
        </View>

        {/* Footer */}
        <View
          style={{
            alignItems: 'center',
            paddingVertical: spacing.lg,
            paddingHorizontal: spacing.lg,
          }}
        >
          <ThemedText type="caption" color="secondary">
            © 2024 Music2Mood. All rights reserved.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default SettingsScreen;
