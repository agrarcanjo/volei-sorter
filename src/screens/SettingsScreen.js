import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Container from '../components/Container';
import Header from '../components/Header';
import NumberPicker from '../components/NumberPicker';
import CustomButton from '../components/CustomButton';
import { saveDefaultSettings, loadDefaultSettings } from '../utils/storage';

const SettingsScreen = ({ navigation }) => {
  const { theme } = useTheme();

  // Funcionalidade 1 - Sorteio de Times
  const [teamSortPlayers, setTeamSortPlayers] = useState(12);
  const [teamSortPlayersPerTeam, setTeamSortPlayersPerTeam] = useState(6);

  // Funcionalidade 2 - Sorteio de Números
  const [numberSortPlayers, setNumberSortPlayers] = useState(12);

  // Funcionalidade 3 - Próximos Jogadores
  const [nextPlayersTotal, setNextPlayersTotal] = useState(5);
  const [nextPlayersStay, setNextPlayersStay] = useState(3);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const defaults = await loadDefaultSettings();
    if (defaults) {
      setTeamSortPlayers(defaults.teamSortPlayers || 12);
      setTeamSortPlayersPerTeam(defaults.teamSortPlayersPerTeam || 6);
      setNumberSortPlayers(defaults.numberSortPlayers || 12);
      setNextPlayersTotal(defaults.nextPlayersTotal || 5);
      setNextPlayersStay(defaults.nextPlayersStay || 3);
    }
  };

  const handleSave = async () => {
    const settings = {
      teamSortPlayers,
      teamSortPlayersPerTeam,
      numberSortPlayers,
      nextPlayersTotal,
      nextPlayersStay,
    };
    
    await saveDefaultSettings(settings);
    navigation.goBack();
  };

  return (
    <Container padding={false}>
      <Header 
        title="Configurações" 
        onBack={() => navigation.goBack()}
        showBack
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        scrollEnabled={true}
      >
        {/* Funcionalidade 1 - Sorteio de Times */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            1. Sorteio de Times
          </Text>
          
          <View style={styles.configItem}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Número de jogadores:
            </Text>
            <NumberPicker
              value={teamSortPlayers}
              onValueChange={setTeamSortPlayers}
              min={2}
              max={50}
            />
          </View>

          <View style={styles.configItem}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Jogadores por time:
            </Text>
            <NumberPicker
              value={teamSortPlayersPerTeam}
              onValueChange={setTeamSortPlayersPerTeam}
              min={1}
              max={25}
            />
          </View>
        </View>

        {/* Funcionalidade 2 - Sorteio de Números */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            2. Sorteio de Números
          </Text>
          
          <View style={styles.configItem}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Número de jogadores:
            </Text>
            <NumberPicker
              value={numberSortPlayers}
              onValueChange={setNumberSortPlayers}
              min={2}
              max={50}
            />
          </View>
        </View>

        {/* Funcionalidade 3 - Próximos Jogadores */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            3. Próximos Jogadores
          </Text>
          
          <View style={styles.configItem}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Total de jogadores:
            </Text>
            <NumberPicker
              value={nextPlayersTotal}
              onValueChange={setNextPlayersTotal}
              min={2}
              max={30}
            />
          </View>

          <View style={styles.configItem}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Jogadores que ficam:
            </Text>
            <NumberPicker
              value={nextPlayersStay}
              onValueChange={setNextPlayersStay}
              min={1}
              max={Math.floor(nextPlayersTotal * 0.8)}
            />
          </View>
        </View>

        <CustomButton
          title="Salvar Configurações"
          onPress={handleSave}
          variant="primary"
        />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 20,
    gap: 20,
    paddingBottom: 40,
  },
  section: {
    padding: 20,
    borderRadius: 12,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  configItem: {
    flexDirection: 'column',
    gap: 8,
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
  },
});

export default SettingsScreen;
