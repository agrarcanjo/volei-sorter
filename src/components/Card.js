import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  withSequence,
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { hapticMedium } from '../utils/haptics';

/**
 * Componente Card com animação de flip (virar carta)
 * 
 * Props:
 * - isFlipped: boolean - Se o card está virado
 * - onFlip: function - Callback quando card é tocado
 * - frontContent: element - Conteúdo da frente
 * - backContent: element - Conteúdo do verso (opcional)
 * - backgroundColor: string - Cor de fundo da frente
 * - disabled: boolean - Se o card está desabilitado
 * - size: object {width, height} - Tamanho do card
 */
const Card = ({
  isFlipped = false,
  onFlip,
  frontContent,
  backContent,
  backgroundColor,
  disabled = false,
  size = { width: 100, height: 100 },
}) => {
  const { theme } = useTheme();
  const rotation = useSharedValue(0);

  // Anima para estado virado ou não virado
  useEffect(() => {
    if (isFlipped) {
      // Adiciona um pequeno "bounce" ao virar
      rotation.value = withSequence(
        withTiming(170, { duration: 350 }),
        withTiming(180, { duration: 50 })
      );
    } else {
      rotation.value = withTiming(0, { duration: 400 });
    }
  }, [isFlipped]);

  // Estilo animado da frente do card
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      rotation.value,
      [0, 180],
      [0, 180],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      rotation.value,
      [0, 90, 90.01, 180],
      [1, 0, 0, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity,
    };
  });

  // Estilo animado do verso do card
  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      rotation.value,
      [0, 180],
      [180, 360],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      rotation.value,
      [0, 90, 90.01, 180],
      [0, 0, 1, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity,
    };
  });

  const handlePress = () => {
    if (!disabled && !isFlipped && onFlip) {
      hapticMedium();
      onFlip();
    }
  };

  const cardStyle = [
    styles.card,
    {
      width: size.width,
      height: size.height,
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.border,
      ...theme.shadows.md,
    },
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      disabled={disabled || isFlipped}
      style={[{ width: size.width, height: size.height }]}
    >
      {/* Verso do Card */}
      <Animated.View style={[cardStyle, styles.cardFace, backAnimatedStyle]}>
        {backContent || (
          <View style={styles.defaultBack}>
            <Text style={[styles.questionMark, { color: theme.colors.primary }]}>
              ?
            </Text>
          </View>
        )}
      </Animated.View>

      {/* Frente do Card */}
      <Animated.View
        style={[
          cardStyle,
          styles.cardFace,
          frontAnimatedStyle,
          { backgroundColor: backgroundColor || theme.colors.cardBackground },
        ]}
      >
        <View style={styles.contentContainer}>
          {frontContent}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  defaultBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionMark: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default Card;
