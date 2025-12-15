import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { borderRadius, colors, spacing } from '../utils/theme';
import { Button } from './Button';
import { ThemedText } from './ThemedText';

interface Props {
  onCapture: (mood: string) => void;
}

const simulateMoodApiCall = async (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const moods = ['Happy', 'Calm', 'Energetic'];
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      resolve(randomMood);
    }, 2000);
  });
};

const CameraComponent: React.FC<Props> = ({ onCapture }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const [facing, setFacing] = useState<CameraType>('front');
  const isDark = useColorScheme() === 'dark';
  const palette = isDark ? colors.dark : colors.light;
  const { width, height } = Dimensions.get('window');

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <ThemedText type="body" style={{ marginTop: spacing.md }}>
          Requesting camera permission...
        </ThemedText>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { padding: spacing.xl }]}>
        <ThemedText type="h3" style={{ marginBottom: spacing.md, textAlign: 'center' }}>
          Camera Permission Required
        </ThemedText>
        <ThemedText type="body" color="secondary" style={{ marginBottom: spacing.xl, textAlign: 'center' }}>
          We need access to your camera to detect your mood
        </ThemedText>
        <Button title="Grant Permission" onPress={requestPermission} size="large" />
      </View>
    );
  }

  const handleCapture = async () => {
    setIsProcessing(true);
    const mood = await simulateMoodApiCall();
    onCapture(mood);
    setIsProcessing(false);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: width - spacing.lg * 2,
          height: height * 0.6,
          borderRadius: borderRadius.lg,
          overflow: 'hidden',
          backgroundColor: palette.card,
        }}
      >
        <CameraView
          style={StyleSheet.absoluteFill}
          facing={facing}
        >
          {/* Camera overlay */}
          <View style={styles.overlay}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                  borderWidth: 3,
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  borderStyle: 'dashed',
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: spacing.md,
                borderRadius: borderRadius.md,
                margin: spacing.md,
              }}
            >
              <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 14 }}>
                Position your face in the circle
              </Text>
            </View>
          </View>
        </CameraView>
      </View>

      <View style={{ marginTop: spacing.xl, width: '100%', paddingHorizontal: spacing.lg }}>
        {isProcessing ? (
          <View style={{ alignItems: 'center', paddingVertical: spacing.lg }}>
            <ActivityIndicator size="large" color={palette.accent} />
            <ThemedText type="body" color="secondary" style={{ marginTop: spacing.md }}>
              Analyzing your mood...
            </ThemedText>
          </View>
        ) : (
          <Button title="Capture Mood" onPress={handleCapture} size="large" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
});

export default CameraComponent;
