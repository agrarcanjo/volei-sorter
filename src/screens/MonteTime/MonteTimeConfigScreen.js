import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { Container, Header, CustomButton } from '../../components';
import { useTheme } from '../../context/ThemeContext';
import { loadTeamConfig, saveTeamConfig } from '../../utils/playerStorage';

/**
 * Tela de Configuração do Time
 */
const MonteTimeConfigScreen = ({ navigation }) => {
  const { theme } = useTheme();
  
  const [teamSize, setTeamSize] = useState(6);
  const [fixedSetter, setFixedSetter] = useState(true);
  const [womenPerTeam, setWomenPerTeam] = useState(0);
  const [randomnessFactor, setRandomnessFactor] = useState(50);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    const config = await loadTeamConfig();
    setTeamSize(config.teamSize);
    setFixedSetter(config.fixedSetter);
    setWomenPerTeam(config.womenPerTeam);
    setRandomnessFactor(config.randomnessFactor);
  };

  const handleSave = async () => {
    const config = {
      teamSize,
      fixedSetter,
      womenPerTeam,
      randomnessFactor,
    };
    await saveTeamConfig(config);
    navigation.goBack();
  };

  return (
    <Container padding={false}>
      <Header
        title="Configurações do Time"
        onBack={() => navigation.goBack()}
        showBack
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        scrollEnabled={true}
      >
        {/* Tamanho do Time */}
        <View style={styles.section}>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Tamanho do Time
            </Text>
            <Text style={[styles.value, { color: theme.colors.primary }]}>
              {teamSize}
            </Text>
          </View>
          <View style={styles.sliderTrack}>
            {[3, 4, 6].map(size => (
              <Text
                key={size}
                onPress={() => setTeamSize(size)}
                style={[
                  styles.sliderOption,
                  {
                    color: teamSize === size ? theme.colors.primary : theme.colors.textSecondary,
                    fontWeight: teamSize === size ? '700' : '400',
                  }
                ]}
              >
                {size}
              </Text>
            ))}
          </View>
          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
            Número de jogadores por time
          </Text>
        </View>

        {/* Levantador Fixo */}
        <View style={[styles.section, styles.switchSection]}>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Levantador Fixo
            </Text>
          </View>
          <Switch
            value={fixedSetter}
            onValueChange={setFixedSetter}
            trackColor={{ false: theme.colors.border, true: theme.colors.primaryLight }}
            thumbColor={fixedSetter ? theme.colors.primary : theme.colors.textSecondary}
          />
          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
            Garante que cada time tenha um levantador
          </Text>
        </View>

        {/* Mulheres por Time */}
        <View style={styles.section}>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Mulheres por Time
            </Text>
            <Text style={[styles.value, { color: theme.colors.primary }]}>
              {womenPerTeam}
            </Text>
          </View>
          <View style={styles.sliderTrack}>
            {[0, 1, 2, 3, 4, 5, 6].map(num => (
              <Text
                key={num}
                onPress={() => setWomenPerTeam(num)}
                style={[
                  styles.sliderOption,
                  {
                    color: womenPerTeam === num ? theme.colors.primary : theme.colors.textSecondary,
                    fontWeight: womenPerTeam === num ? '700' : '400',
                  }
                ]}
              >
                {num}
              </Text>
            ))}
          </View>
          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
            Quantidade mínima de mulheres por time
          </Text>
        </View>

        {/* Fator de Aleatoriedade */}
        <View style={styles.section}>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Fator de Aleatoriedade
            </Text>
            <Text style={[styles.value, { color: theme.colors.primary }]}>
              {randomnessFactor}%
            </Text>
          </View>
          <View style={styles.sliderTrack}>
            {[0, 25, 50, 75, 100].map(num => (
              <Text
                key={num}
                onPress={() => setRandomnessFactor(num)}
                style={[
                  styles.sliderOption,
                  {
                    color: randomnessFactor === num ? theme.colors.primary : theme.colors.textSecondary,
                    fontWeight: randomnessFactor === num ? '700' : '400',
                  }
                ]}
              >
                {num}
              </Text>
            ))}
          </View>
          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
            0% = equilíbrio total | 100% = sorteio aleatório
          </Text>
        </View>

        <CustomButton
          title="Salvar"
          onPress={handleSave}
          variant="primary"
          size="large"
          fullWidth
        />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  switchSection: {
    paddingVertical: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
  },
  sliderTrack: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  sliderOption: {
    fontSize: 12,
    paddingHorizontal: 4,
  },
  description: {
    fontSize: 12,
    marginTop: 8,
    lineHeight: 16,
  },
});

export default MonteTimeConfigScreen;
