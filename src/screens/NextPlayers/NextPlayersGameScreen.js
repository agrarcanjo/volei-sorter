import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, useWindowDimensions } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Container, Header, Card, CustomButton, LoadingSpinner, ConfettiEffect } from '../../components/index.js';
import { useTheme } from '../../context/ThemeContext.js';
import { shuffleArray, distributeNextPlayers } from '../../utils/shuffle.js';
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

export default function NextPlayersGameScreen({ navigation, route }) {
  const { theme } = useTheme();
  const dimensions = useWindowDimensions();
  const { playerCount, stayCount } = route.params;
  const [flippedCards, setFlippedCards] = useState([]);
  const [players, setPlayers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const { cardsPerRow, cardSize } = getGridConfig(dimensions.width);

  // Initialize players on first render
  useEffect(() => {
    handleShuffle();
  }, []);

  const handleShuffle = async () => {
    setIsLoading(true);
    setShowConfetti(false);
    setFlippedCards([]); // Limpa cards virados ANTES
    
    // Simular delay para mostrar loading
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const distributed = distributeNextPlayers(playerCount, stayCount);
    setPlayers(distributed);
    setIsLoading(false);
  };

  const handleCardFlip = (index) => {
    if (!flippedCards.includes(index)) {
      setFlippedCards([...flippedCards, index]);
    }
  };

  const handleFlipAll = () => {
    if (!players) return;
    const allIndices = Array.from({ length: playerCount }, (_, i) => i);
    setFlippedCards(allIndices);
    setShowConfetti(true);
    hapticCelebration();
    
    // Esconder confetti após 4 segundos
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const getCardColor = (index) => {
    if (!players || !players[index]) return theme.colors.primary;
    
    if (players[index] === 'inside') {
      return theme.colors.inside;
    } else {
      return theme.colors.outside;
    }
  };

  const getCardLabel = (index) => {
    if (!players || !players[index]) return '';
    
    if (players[index] === 'inside') {
      return 'FICA';
    } else {
      return 'SAI';
    }
  };

  if (!players) {
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

      <LoadingSpinner visible={isLoading} text="Sorteando jogadores..." />
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
  cardEmoji: {
    fontSize: 36,
    marginBottom: 4,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
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
