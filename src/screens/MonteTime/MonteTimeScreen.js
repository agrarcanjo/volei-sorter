import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Container, Header, CustomButton } from '../../components';
import { useTheme } from '../../context/ThemeContext';
import { loadPlayers, deletePlayer, loadTeamConfig } from '../../utils/playerStorage';import { validateDistribution, getPlayerSkillAverage } from '../../utils/teamSortAlgorithm';
/**
 * Tela de Montar Time - Lista de Jogadores
 */
const MonteTimeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [players, setPlayers] = useState([]);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  const loadData = useCallback(async () => {
    const loadedPlayers = await loadPlayers();
    const loadedConfig = await loadTeamConfig();
    setPlayers(loadedPlayers);
    setConfig(loadedConfig);
    setLoading(false);
  }, []);

  const handleAddPlayer = () => {
    navigation.navigate('MonteTimePlayerEdit', { playerId: null });
  };

  const handleEditPlayer = (player) => {
    navigation.navigate('MonteTimePlayerEdit', { playerId: player.id });
  };

  const handleDeletePlayer = useCallback(async (playerId) => {
    await deletePlayer(playerId);
    loadData();
  }, [loadData]);

  const canSort = useCallback(() => {
    if (!config || players.length === 0) return false;
    const { teamSize, fixedSetter, womenPerTeam } = config;
    const minPlayers = teamSize * 2;
    
    if (players.length < minPlayers) return false;
    if (players.length % teamSize !== 0) return false;
    
    if (fixedSetter) {
      const setterCount = players.filter(p => p.position === 'levantador').length;
      const teamsNeeded = players.length / teamSize;
      if (setterCount < teamsNeeded) return false;
    }
    
    return true;
  }, [players, config]);

  const renderPlayerItem = ({ item }) => {
    const genderLabel = item.gender === 'fem' ? '♀' : item.gender === 'masc' ? '♂' : '';
    const skillAvg = item.skills ? 
      Math.round((item.skills.levantamento + item.skills.ataque + item.skills.defesa + item.skills.bloqueio) / 4) : 
      0;

    return (
      <TouchableOpacity
        style={[styles.playerItem, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}
        onPress={() => handleEditPlayer(item)}
      >
        <View style={styles.playerContent}>
          <View>
            <Text style={[styles.playerName, { color: theme.colors.text }]}>
              {item.position === 'levantador' && '🏐 '} {item.name} {genderLabel}
            </Text>
            <Text style={[styles.playerSubtitle, { color: theme.colors.textSecondary }]}>
              {item.position || 'Sem posição'} • Skill: {skillAvg}/10
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleDeletePlayer(item.id)}
            style={styles.deleteButton}
          >
            <Text style={[styles.deleteIcon, { color: theme.colors.danger }]}>✕</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container padding={false}>
      <Header
        title="Montar Time"
        onBack={() => navigation.goBack()}
        showBack
      />

      <View style={styles.headerActions}>
        <TouchableOpacity
          onPress={handleAddPlayer}
          style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={styles.actionIcon}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('MonteTimeConfig')}
          style={[styles.actionButton, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border, borderWidth: 1 }]}
        >
          <Text style={styles.actionIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {players.length === 0 ? (
        <View style={[styles.emptyContainer, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
            Nenhum jogador adicionado
          </Text>
          <Text style={[styles.emptySubtext, { color: theme.colors.textSecondary }]}>
            Clique em + para adicionar um jogador
          </Text>
        </View>
      ) : (
        <FlatList
          data={players}
          renderItem={renderPlayerItem}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          nestedScrollEnabled={true}
        />
      )}

      <View style={[styles.footer, { backgroundColor: theme.colors.cardBackground, borderTopColor: theme.colors.border }]}>
        <CustomButton
          title="Sortear Time"
          onPress={() => navigation.navigate('MonteTimeSortResult')}
          variant="primary"
          size="large"
          fullWidth
          disabled={!canSort()}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  playerItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 4,
  },
  playerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  playerSubtitle: {
    fontSize: 13,
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
});

export default MonteTimeScreen;
