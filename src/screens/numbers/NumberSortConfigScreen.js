import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Container, Header, NumberPicker, CustomButton } from '../../components/index.js';
import { useTheme } from '../../context/ThemeContext.js';
import { loadDefaultSettings } from '../../utils/storage.js';

export default function NumberSortConfigScreen({ navigation }) {
  const { theme } = useTheme();
  const [playerCount, setPlayerCount] = useState(12);

  // Carrega valores padrão das configurações
  useEffect(() => {
    const loadConfig = async () => {
      const defaults = await loadDefaultSettings();
      setPlayerCount(defaults.numberSortPlayers);
    };
    loadConfig();
  }, []);

  const handleStart = () => {
    navigation.navigate('NumberSortGame', { playerCount });
  };

  return (
    <Container padding={false}>
      <Header 
        title="Sortear Números"
        onBack={() => navigation.goBack()}
        showBack
      />
      
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        scrollEnabled={true}
        bounces={true}
        alwaysBounceVertical={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          Sorteie números aleatórios para cada jogador
        </Text>

        <View style={styles.configSection}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Número de Jogadores
          </Text>
          <NumberPicker
            value={playerCount}
            onValueChange={setPlayerCount}
            min={2}
            max={30}
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
            Cada jogador receberá um número de 1 a {playerCount}
          </Text>
        </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title="Sortear Números"
          onPress={handleStart}
          variant="primary"
          size="large"
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 120,
  },
  description: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  configSection: {
    marginBottom: 32,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoBox: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(100, 100, 100, 0.1)',
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    paddingVertical: 16,
  },
});
