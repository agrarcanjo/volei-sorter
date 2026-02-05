import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Container, Header, NumberPicker, CustomButton } from '../../components/index.js';
import { useTheme } from '../../context/ThemeContext.js';
import { loadDefaultSettings } from '../../utils/storage.js';

export default function NextPlayersConfigScreen({ navigation }) {
  const { theme } = useTheme();
  const [playerCount, setPlayerCount] = useState(5);
  const [stayCount, setStayCount] = useState(3);

  // Carrega valores padrão das configurações
  useEffect(() => {
    const loadConfig = async () => {
      const defaults = await loadDefaultSettings();
      setPlayerCount(defaults.nextPlayersTotal);
      setStayCount(defaults.nextPlayersStay);
    };
    loadConfig();
  }, []);

  const handleStart = () => {
    navigation.navigate('NextPlayersGame', { playerCount, stayCount });
  };

  return (
    <Container padding={false}>
      <Header 
        title="Próximos Jogadores"
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
          Defina quantos jogadores ficam em quadra e quantos saem
        </Text>

        <View style={styles.configSection}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Total de Jogadores
          </Text>
          <NumberPicker
            value={playerCount}
            onValueChange={setPlayerCount}
            min={3}
            max={30}
          />
        </View>

        <View style={styles.configSection}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Jogadores que Ficam
          </Text>
          <NumberPicker
            value={stayCount}
            onValueChange={setStayCount}
            min={1}
            max={playerCount - 1}
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
            {`✓ Ficam: ${stayCount} jogador(es)\n`}
            {`✗ Saem: ${playerCount - stayCount} jogador(es)`}
          </Text>
        </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title="Sortear Próximos"
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
