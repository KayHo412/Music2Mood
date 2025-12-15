import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, useColorScheme, View } from 'react-native';
import { borderRadius, colors, spacing } from '../utils/theme';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search songs, artists...',
  value,
  onChangeText,
  onClear,
}) => {
  const isDark = useColorScheme() === 'dark';
  const palette = isDark ? colors.dark : colors.light;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: palette.card,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        marginHorizontal: spacing.md,
        marginVertical: spacing.md,
        borderWidth: 1,
        borderColor: palette.divider,
      }}
    >
      <Ionicons
        name="search"
        size={20}
        color={palette.textSecondary}
        style={{ marginRight: spacing.sm }}
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={palette.textSecondary}
        style={{
          flex: 1,
          color: palette.text,
          fontSize: 16,
        }}
      />
      {value.length > 0 && (
        <Ionicons
          name="close-circle"
          size={20}
          color={palette.textSecondary}
          onPress={() => {
            onChangeText('');
            onClear?.();
          }}
          style={{ marginLeft: spacing.sm }}
        />
      )}
    </View>
  );
};
