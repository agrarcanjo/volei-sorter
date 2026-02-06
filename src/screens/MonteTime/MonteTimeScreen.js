import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Container, Header, CustomButton } from '../../components';
import { useTheme } from '../../context/ThemeContext';
import {
  loadPlayers,
  deletePlayer,
  loadTeamConfig,
  loadSelectedPlayerIds,
  saveSelectedPlayerIds,
} from '../../utils/playerStorage';
import { getPlayerSkillAverage } from '../../utils/teamSortAlgorithm';
/**
 * Tela de Montar Time - Lista de Jogadores
 */
const MonteTimeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [players, setPlayers] = useState([]);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState(new Set());

  useEffect(() => {
    loadData();
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  const loadData = useCallback(async () => {
    const loadedPlayers = await loadPlayers();
    const loadedConfig = await loadTeamConfig();
    const savedSelectedIds = await loadSelectedPlayerIds();

    setPlayers(loadedPlayers);
    setConfig(loadedConfig);

    if (savedSelectedIds && savedSelectedIds.length > 0) {
      setSelectedIds(new Set(savedSelectedIds));
    } else {
      setSelectedIds(new Set(loadedPlayers.map(p => p.id)));
    }

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
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(playerId);
      return next;
    });
    loadData();
  }, [loadData]);

  const toggleSelectPlayer = useCallback((playerId) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(playerId)) {
        next.delete(playerId);
      } else {
        next.add(playerId);
      }
      return next;
    });
  }, []);

  const selectedPlayers = useMemo(
    () => players.filter(p => selectedIds.has(p.id)),
    [players, selectedIds]
  );

  const canSort = useCallback(() => {
    if (!config || selectedPlayers.length === 0) return false;
    const { teamSize } = config;
    const minPlayers = teamSize * 2;
    return selectedPlayers.length >= minPlayers;
  }, [selectedPlayers, config]);

  const handleSortTeams = useCallback(async () => {
    await saveSelectedPlayerIds(Array.from(selectedIds));
    navigation.navigate('MonteTimeSortResult', {
      selectedIds: Array.from(selectedIds),
    });
  }, [navigation, selectedIds]);

  const renderPlayerItem = ({ item }) => {
    const genderLabel = item.gender === 'fem' ? '♀' : item.gender === 'masc' ? '♂' : '';
    const skillAvg = item.skills ? Math.round(getPlayerSkillAverage(item)) : 0;
    const isSelected = selectedIds.has(item.id);

    return (
      <View
        style={[styles.playerItem, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}
      >
        <TouchableOpacity
          onPress={() => toggleSelectPlayer(item.id)}
          style={[
            styles.selectBox,
            {
              borderColor: theme.colors.border,
              backgroundColor: isSelected ? theme.colors.primary : 'transparent',
            },
          ]}
        >
          {isSelected && <Text style={styles.selectCheck}>✓</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playerContent}
          onPress={() => handleEditPlayer(item)}
        >
          <View>
            <Text style={[styles.playerName, { color: theme.colors.text }]}>
              {item.position === 'Levantador' && '🏐 '} {item.name} {genderLabel}
            </Text>
            <Text style={[styles.playerSubtitle, { color: theme.colors.textSecondary }]}>
              {item.position || 'Sem posição'} • Skill: {skillAvg}/10
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDeletePlayer(item.id)}
          style={styles.deleteButton}
        >
          <Text style={[styles.deleteIcon, { color: theme.colors.danger }]}>✕</Text>
        </TouchableOpacity>
      </View>
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
          onPress={handleSortTeams}
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  selectBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectCheck: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  playerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
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
