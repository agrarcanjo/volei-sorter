import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Animated as RNAnimated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { hapticMedium } from '../utils/haptics';

/**
 * Componente Card com animação de flip (virar carta)
 * Versão simplificada usando Animated nativo do React Native
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
const Card = React.memo(({
  isFlipped = false,
  onFlip,
  frontContent,
  backContent,
  backgroundColor,
  disabled = false,
  size = { width: 100, height: 100 },
}) => {
  const { theme } = useTheme();
  const [rotationValue] = useState(new RNAnimated.Value(0));

  // Anima para estado virado ou não virado
  useEffect(() => {
    RNAnimated.timing(
      rotationValue,
      {
        toValue: isFlipped ? 180 : 0,
        duration: 400,
        useNativeDriver: false,
      }
    ).start();
  }, [isFlipped, rotationValue]);

  const frontOpacity = rotationValue.interpolate({
    inputRange: [0, 90, 180],
    outputRange: [1, 0, 0],
  });

  const backOpacity = rotationValue.interpolate({
    inputRange: [0, 90, 180],
    outputRange: [0, 0, 1],
  });

  const frontRotation = rotationValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backRotation = rotationValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
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
      accessibilityLabel={`Cartão ${isFlipped ? 'virado' : 'oculto'}`}
      accessibilityHint={isFlipped ? 'Cartão já foi virado' : 'Toque para virar o cartão'}
      accessibilityRole="button"
    >
      {/* Face Frente */}
      <RNAnimated.View
        style={[
          cardStyle,
          styles.cardFace,
          {
            opacity: frontOpacity,
            transform: [{ rotateY: frontRotation }],
          },
        ]}
      >
        <View style={styles.contentContainer}>
          {frontContent || (
            <View style={styles.defaultBack}>
              <Text style={[styles.questionMark, { color: theme.colors.primary }]}>
                ?
              </Text>
            </View>
          )}
        </View>
      </RNAnimated.View>

      {/* Face Verso */}
      <RNAnimated.View
        style={[
          cardStyle,
          styles.cardFace,
          {
            opacity: backOpacity,
            transform: [{ rotateY: backRotation }],
            backgroundColor: backgroundColor || theme.colors.cardBackground,
          },
        ]}
      >
        <View style={styles.contentContainer}>
          {backContent}
        </View>
      </RNAnimated.View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
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

Card.displayName = 'Card';

export default Card;
