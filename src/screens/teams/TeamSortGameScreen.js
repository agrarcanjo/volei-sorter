import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, useWindowDimensions } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Container, Header, Card, CustomButton, LoadingSpinner, ConfettiEffect } from '../../components/index.js';
import { useTheme } from '../../context/ThemeContext.js';
import { shuffleArray, distributeTeams } from '../../utils/shuffle.js';
import { hapticCelebration } from '../../utils/haptics.js';

const PADDING = 16;
const MIN_CARDS_PER_ROW = 3;

const getGridConfig = (width) => {
  // Calcula número de cards por linha baseado na largura
  const cardsPerRow = MIN_CARDS_PER_ROW;
  
  const totalPadding = PADDING * 2 + (cardsPerRow - 1) * 8; // padding + gaps entre cards
  const cardSize = (width - totalPadding) / cardsPerRow;
  
  return { cardsPerRow, cardSize };
};

export default function TeamSortGameScreen({ navigation, route }) {
  const { theme } = useTheme();
  const dimensions = useWindowDimensions();
  const { playerCount, teamSize } = route.params;
  const [flippedCards, setFlippedCards] = useState([]);
  const [teams, setTeams] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const { cardsPerRow, cardSize } = useMemo(() => getGridConfig(dimensions.width), [dimensions.width]);

  const handleShuffle = useCallback(async () => {
    setIsLoading(true);
    setShowConfetti(false);
    setFlippedCards([]); // Limpa cards virados ANTES
    
    // Simular delay para mostrar loading
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const distributed = distributeTeams(playerCount, teamSize);
    setTeams(distributed);
    setIsLoading(false);
  }, [playerCount, teamSize]);

  // Initialize teams on first render
  useEffect(() => {
    handleShuffle();
  }, [handleShuffle]);

  const handleCardFlip = useCallback((index) => {
    setFlippedCards(prev => {
      if (!prev.includes(index)) {
        return [...prev, index];
      }
      return prev;
    });
  }, []);

  const handleFlipAll = useCallback(() => {
    if (!teams) return;
    const allIndices = Array.from({ length: playerCount }, (_, i) => i);
    setFlippedCards(allIndices);
    setShowConfetti(true);
    hapticCelebration();
    
    // Esconder confetti após 4 segundos
    setTimeout(() => setShowConfetti(false), 4000);
  }, [teams, playerCount]);

  const getCardColor = useCallback((index) => {
    if (!teams || !teams[index]) return theme.colors.primary;
    
    if (teams[index] === 'red') {
      return '#EF5350';
    } else if (teams[index] === 'blue') {
      return '#42A5F5';
    } else {
      return '#FFC107';
    }
  }, [teams, theme.colors.primary]);

  const getCardLabel = useCallback((index) => {
    if (!teams || !teams[index]) return '';
    
    if (teams[index] === 'red') {
      return 'TIME\nVERMELHO';
    } else if (teams[index] === 'blue') {
      return 'TIME\nAZUL';
    } else {
      return 'PRÓXIMO';
    }
  }, [teams]);

  if (!teams) {
    return (
      <Container center>
        <Text style={{ color: theme.colors.text }}>Carregando...</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Header 
        title={`${playerCount} Jogadores`}
        onBack={() => navigation.goBack()}
        onReset={handleShuffle}
        showBack
        showReset
      />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {Array.from({ length: playerCount }).map((_, index) => (
            <Animated.View 
              key={index} 
              style={[styles.cardWrapper, { width: cardSize, height: cardSize }]}
              entering={FadeInDown.delay(index * 50).springify()}
            >
              <Card
                isFlipped={flippedCards.includes(index)}
                onFlip={() => handleCardFlip(index)}
                backgroundColor={getCardColor(index)}
                size={{ width: cardSize, height: cardSize }}
                frontContent={
                  <View style={styles.cardFront}>
                    <Text style={styles.questionMark}>?</Text>
                  </View>
                }
                backContent={
                  <View style={styles.cardFront}>
                    <Text style={styles.cardLabel}>{getCardLabel(index)}</Text>
                  </View>
                }
              />
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title="Revelar Todos"
          onPress={handleFlipAll}
          variant="secondary"
          size="medium"
        />
      </View>

      <LoadingSpinner visible={isLoading} text="Sorteando times..." />
      {showConfetti && <ConfettiEffect />}
    </Container>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: PADDING,
    paddingBottom: 100,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 8,
  },
  cardWrapper: {
    marginBottom: 8,
  },
  cardFront: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 36,
    marginBottom: 4,
  },
  cardPlayerNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
  questionMark: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'transparent',
  },
});
