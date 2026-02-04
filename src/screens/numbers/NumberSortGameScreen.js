import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, useWindowDimensions } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Container, Header, Card, CustomButton, LoadingSpinner, ConfettiEffect } from '../../components/index.js';
import { useTheme } from '../../context/ThemeContext.js';
import { shuffleArray } from '../../utils/shuffle.js';
import { hapticCelebration } from '../../utils/haptics.js';

const PADDING = 16;
const MIN_CARDS_PER_ROW = 4;

const getGridConfig = (width) => {
  // Calcula número de cards por linha baseado na largura
  let cardsPerRow = MIN_CARDS_PER_ROW;
  
  if (width > 600) {
    cardsPerRow = 5;
  }
  if (width > 750) {
    cardsPerRow = 6;
  }
  
  const totalPadding = PADDING * 2 + (cardsPerRow - 1) * 8; // padding + gaps entre cards
  const cardSize = (width - totalPadding) / cardsPerRow;
  
  return { cardsPerRow, cardSize };
};

export default function NumberSortGameScreen({ navigation, route }) {
  const { theme } = useTheme();
  const dimensions = useWindowDimensions();
  const { playerCount } = route.params;
  const [flippedCards, setFlippedCards] = useState([]);
  const [numbers, setNumbers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const { cardsPerRow, cardSize } = getGridConfig(dimensions.width);

  // Initialize numbers on first render
  useEffect(() => {
    handleShuffle();
  }, []);

  const handleShuffle = async () => {
    setIsLoading(true);
    setShowConfetti(false);
    
    // Simular delay para mostrar loading
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const numberArray = generateNumberArray(playerCount);
    const shuffled = shuffleArray(numberArray);
    setNumbers(shuffled);
    setFlippedCards([]);
    setIsLoading(false);
  };

  const handleCardFlip = (index) => {
    if (!flippedCards.includes(index)) {
      setFlippedCards([...flippedCards, index]);
    }
  };

  const handleFlipAll = () => {
    if (!numbers) return;
    const allIndices = Array.from({ length: playerCount }, (_, i) => i);
    setFlippedCards(allIndices);
    setShowConfetti(true);
    hapticCelebration();
    
    // Esconder confetti após 4 segundos
    setTimeout(() => setShowConfetti(false), 4000);
  };

  // Dynamic font size based on number of digits
  const getFontSize = (number) => {
    if (number < 10) return 48;
    if (number < 100) return 42;
    return 36;
  };

  if (!numbers) {
    return (
      <Container center>
        <Text style={{ color: theme.colors.text }}>Carregando...</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Header 
        title={`${playerCount} Números`}
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
          {numbers.map((number, index) => (
            <Animated.View 
              key={index} 
              style={[styles.cardWrapper, { width: cardSize, height: cardSize }]}
              entering={FadeInDown.delay(index * 50).springify()}
            >
              <Card
                isFlipped={flippedCards.includes(index)}
                onFlip={() => handleCardFlip(index)}
                backgroundColor={theme.colors.primary}
                size={{ width: cardSize, height: cardSize }}
                frontContent={
                  <View style={styles.cardFront}>
                    <Text style={styles.cardLabel}>?</Text>
                  </View>
                }
                backContent={
                  <View style={styles.cardBack}>
                    <Text style={[styles.cardNumber, { fontSize: getFontSize(number) }]}>
                      {number}
                    </Text>
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

      <LoadingSpinner visible={isLoading} text="Sorteando números..." />
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
  cardLabel: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardNumber: {
    fontWeight: 'bold',
    color: '#fff',
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
