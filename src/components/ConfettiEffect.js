import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const ConfettiPiece = ({ delay, color }) => {
  const translateY = useSharedValue(-50);
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const randomX = (Math.random() - 0.5) * width;
    const randomRotation = Math.random() * 720 - 360;

    setTimeout(() => {
      translateY.value = withTiming(height + 100, {
        duration: 3000 + Math.random() * 2000,
        easing: Easing.cubic,
      });
      translateX.value = withTiming(randomX, {
        duration: 3000,
        easing: Easing.out(Easing.sin),
      });
      rotate.value = withRepeat(
        withTiming(randomRotation, { duration: 2000 }),
        -1,
        false
      );
      opacity.value = withSequence(
        withTiming(1, { duration: 500 }),
        withTiming(0, { duration: 2500, easing: Easing.in(Easing.quad) })
      );
    }, delay);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.confettiPiece, { backgroundColor: color }, animatedStyle]} />
  );
};

/**
 * Componente de efeito confetti para celebração
 * Ativa automaticamente ao ser montado
 */
export default function ConfettiEffect({ colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'] }) {
  const confettiCount = 50;

  return (
    <View style={styles.container} pointerEvents="none">
      {Array.from({ length: confettiCount }).map((_, index) => (
        <ConfettiPiece
          key={index}
          delay={index * 50}
          color={colors[Math.floor(Math.random() * colors.length)]}
        />
      ))}
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
    zIndex: 1000,
  },
  confettiPiece: {
    position: 'absolute',
    top: -50,
    left: width / 2,
    width: 10,
    height: 10,
    borderRadius: 2,
  },
});
