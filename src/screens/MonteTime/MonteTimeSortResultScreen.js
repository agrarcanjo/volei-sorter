import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Container, Header, CustomButton } from '../../components';
import { useTheme } from '../../context/ThemeContext';
import { loadPlayers, loadTeamConfig } from '../../utils/playerStorage';
import { sortTeams, getPlayerSkillAverage } from '../../utils/teamSortAlgorithm';

/**
 * Tela de Resultado do Sorteio
 */
const MonteTimeSortResultScreen = ({ navigation }) => {
  const { theme } = useTheme();
  
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    performSort();
  }, []);

  const performSort = async () => {
    try {
      setLoading(true);
      const players = await loadPlayers();
      const config = await loadTeamConfig();
      
      const sortedTeams = sortTeams(players, config);
      setTeams(sortedTeams);
    } catch (error) {
      alert(`Erro ao sortear: ${error.message}`);
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleReshuffle = () => {
    performSort();
  };

  if (loading) {
    return (
      <Container>
        <Header title="Sorteando..." onBack={() => navigation.goBack()} showBack />
        <View style={styles.centerContainer}>
          <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
            Distribuindo jogadores...
          </Text>
        </View>
      </Container>
    );
  }

  const renderPlayerItem = (player) => {
    const skillAverage = getPlayerSkillAverage(player);
    const isSetter = player.position === 'levantador';
    const genderIcon = player.gender === 'masc' ? '♂' : player.gender === 'fem' ? '♀' : '';

    return (
      <View key={player.id} style={[styles.playerItem, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.playerInfo}>
          <View style={styles.playerNameRow}>
            {isSetter && <Text style={styles.setterIcon}>🏐</Text>}
            <Text style={[styles.playerName, { color: theme.colors.text }]}>
              {player.name}
            </Text>
            {genderIcon && <Text style={styles.genderIcon}>{genderIcon}</Text>}
          </View>
          <Text style={[styles.playerPosition, { color: theme.colors.textSecondary }]}>
            {player.position} • Média: {skillAverage.toFixed(1)}/10
          </Text>
        </View>
      </View>
    );
  };

  const renderTeamSection = (team) => {
    const teamSkillAverage = team.skillAverage;

    return (
      <View key={team.id} style={[styles.teamSection, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.teamHeader}>
          <Text style={[styles.teamName, { color: theme.colors.primary }]}>
            {team.name}
          </Text>
          <View style={styles.teamStats}>
            <Text style={[styles.teamStat, { color: theme.colors.textSecondary }]}>
              {team.players.length} jogadores
            </Text>
            <Text style={[styles.teamStat, { color: theme.colors.textSecondary }]}>
              Média: {teamSkillAverage.toFixed(1)}/10
            </Text>
          </View>
        </View>

        <View style={styles.playerList}>
          {team.players.map((player, index) => (
            <View key={player.id}>
              {renderPlayerItem(player)}
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <Container padding={false}>
      <Header
        title="Times Sorteados"
        onBack={() => navigation.goBack()}
        showBack
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {teams.map(team => renderTeamSection(team))}

        <View style={styles.buttonGroup}>
          <CustomButton
            title="Sortear Novamente"
            onPress={handleReshuffle}
            variant="primary"
            size="large"
            fullWidth
          />
          <CustomButton
            title="Voltar"
            onPress={() => navigation.goBack()}
            variant="secondary"
            size="large"
            fullWidth
          />
        </View>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
  },
  teamSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  teamHeader: {
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 12,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  teamStats: {
    flexDirection: 'row',
    gap: 16,
  },
  teamStat: {
    fontSize: 12,
    fontWeight: '500',
  },
  playerList: {
    gap: 8,
  },
  playerItem: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  playerInfo: {
    flex: 1,
  },
  playerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  setterIcon: {
    fontSize: 16,
  },
  genderIcon: {
    fontSize: 14,
    color: '#999',
  },
  playerPosition: {
    fontSize: 12,
    marginTop: 4,
  },
  buttonGroup: {
    gap: 8,
    marginBottom: 16,
  },
});

export default MonteTimeSortResultScreen;
