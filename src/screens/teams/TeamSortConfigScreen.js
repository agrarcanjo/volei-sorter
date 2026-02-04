import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Container, Header, NumberPicker, CustomButton } from '../../components/index.js';
import { useTheme } from '../../context/ThemeContext.js';

export default function TeamSortConfigScreen({ navigation }) {
  const { theme } = useTheme();
  const [playerCount, setPlayerCount] = useState(6);
  const [teamSize, setTeamSize] = useState(3);

  const handleStart = () => {
    navigation.navigate('TeamSortGame', { playerCount, teamSize });
  };

  return (
    <Container padding>
      <Header 
        title="Sortear Times"
        onBack={() => navigation.goBack()}
        showBack
      />
      
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          Configure quantos jogadores irão participar e o tamanho de cada time
        </Text>

        <View style={styles.configSection}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Número de Jogadores
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
            Jogadores por Time
          </Text>
          <NumberPicker
            value={teamSize}
            onValueChange={setTeamSize}
            min={1}
            max={Math.floor(playerCount / 2)}
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
            {`Times: 2 times de ${teamSize} jogadores\n`}
            {playerCount - (teamSize * 2) > 0 
              ? `Próximos: ${playerCount - (teamSize * 2)} jogador(es)` 
              : 'Sem jogadores de reserva'}
          </Text>
        </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title="Sortear Times"
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
    flex: 1,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 80,
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
