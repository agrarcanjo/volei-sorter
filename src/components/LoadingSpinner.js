import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext.js';

/**
 * Componente de loading animado com texto
 */
export default function LoadingSpinner({ text = 'Sorteando...', visible = true }) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 600, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    } else {
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background + 'E6' }]}>
      <Animated.View style={[styles.content, animatedStyle]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.text, { color: theme.colors.text }]}>{text}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  content: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
  },
  text: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
  },
});
