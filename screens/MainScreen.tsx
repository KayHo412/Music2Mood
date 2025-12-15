import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { Button } from '../components/Button';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useAppContext } from '../context/AppContext';
import { borderRadius, colors, spacing } from '../utils/theme';

const MainScreen = () => {
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const isDark = useColorScheme() === 'dark';
  const palette = isDark ? colors.dark : colors.light;

  const handleLogin = async () => {
    if (!email.trim()) {
      alert('Please enter an email');
      return;
    }
    setLoading(true);
    try {
      await login('mockToken');
    } catch (error) {
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ThemedView type="background" style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, justifyContent: 'space-between', paddingHorizontal: spacing.lg }}>
            {/* Header Section */}
            <View style={{ paddingTop: spacing.xxl * 2 }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: borderRadius.lg,
                  backgroundColor: palette.accent,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: spacing.lg,
                }}
              >
                <ThemedText type="h1" style={{ fontSize: 40, color: '#ffffff' }}>
                  🎵
                </ThemedText>
              </View>
              <ThemedText type="h1">Music2Mood</ThemedText>
              <ThemedText type="small" color="secondary" style={{ marginTop: spacing.sm }}>
                Discover music that matches your mood
              </ThemedText>
            </View>

            {/* Login Form */}
            <View style={{ marginBottom: spacing.xxl * 2 }}>
              {/* Email Input */}
              <View style={{ marginBottom: spacing.lg }}>
                <ThemedText type="smallBold" style={{ marginBottom: spacing.sm }}>
                  Email
                </ThemedText>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: palette.card,
                    borderRadius: borderRadius.lg,
                    borderWidth: 1,
                    borderColor: palette.divider,
                    paddingHorizontal: spacing.md,
                  }}
                >
                  <Ionicons name="mail-outline" size={20} color={palette.textSecondary} />
                  <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor={palette.textSecondary}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={{
                      flex: 1,
                      color: palette.text,
                      fontSize: 16,
                      paddingVertical: spacing.md,
                      paddingHorizontal: spacing.md,
                    }}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={{ marginBottom: spacing.xl }}>
                <ThemedText type="smallBold" style={{ marginBottom: spacing.sm }}>
                  Password
                </ThemedText>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: palette.card,
                    borderRadius: borderRadius.lg,
                    borderWidth: 1,
                    borderColor: palette.divider,
                    paddingHorizontal: spacing.md,
                  }}
                >
                  <Ionicons name="lock-closed-outline" size={20} color={palette.textSecondary} />
                  <TextInput
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor={palette.textSecondary}
                    secureTextEntry={!showPassword}
                    style={{
                      flex: 1,
                      color: palette.text,
                      fontSize: 16,
                      paddingVertical: spacing.md,
                      paddingHorizontal: spacing.md,
                    }}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                      color={palette.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Button */}
              <Button
                title="Sign In"
                onPress={handleLogin}
                loading={loading}
                size="large"
                style={{ marginBottom: spacing.lg }}
              />

              {/* Forgot Password */}
              <TouchableOpacity style={{ alignItems: 'center' }}>
                <ThemedText type="small" color="accent">
                  Forgot Password?
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Sign Up Section */}
            <View style={{ alignItems: 'center', paddingBottom: spacing.xl }}>
              <ThemedText type="small" color="secondary">
                Don't have an account?{' '}
                <ThemedText type="smallBold" color="accent">
                  Sign Up
                </ThemedText>
              </ThemedText>
            </View>
          </View>
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
};

export default MainScreen;
