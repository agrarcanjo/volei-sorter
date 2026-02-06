import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity, Alert, Modal } from 'react-native';
import { Container, Header, CustomButton } from '../../components';
import { useTheme } from '../../context/ThemeContext';
import { loadPlayers, loadTeamConfig, loadSelectedPlayerIds } from '../../utils/playerStorage';
import { sortTeams, getPlayerSkillAverage } from '../../utils/teamSortAlgorithm';

// Importação condicional para plataformas nativas
let DraxProvider, DraxView;
if (Platform.OS !== 'web') {
  try {
    const drax = require('react-native-drax');
    DraxProvider = drax.DraxProvider;
    DraxView = drax.DraxView;
  } catch (e) {
    console.warn('react-native-drax não disponível');
  }
}

/**
 * Tela de Resultado do Sorteio
 */
const MonteTimeSortResultScreen = ({ navigation, route }) => {
  const { theme } = useTheme();
  
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showMoveDialog, setShowMoveDialog] = useState(false);

  useEffect(() => {
    performSort();
  }, []);

  const performSort = async () => {
    try {
      setLoading(true);
      const players = await loadPlayers();
      const config = await loadTeamConfig();

      const routeSelectedIds = route?.params?.selectedIds || [];
      const storedSelectedIds = await loadSelectedPlayerIds();
      const selectedIds = routeSelectedIds.length > 0 ? routeSelectedIds : storedSelectedIds;

      const selectedPlayers = selectedIds.length > 0
        ? players.filter(p => selectedIds.includes(p.id))
        : players;

      const sortedTeams = sortTeams(selectedPlayers, config);
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

  const movePlayerToTeam = useCallback((playerId, targetTeamId) => {
    setTeams((prevTeams) => {
      let draggedPlayer = null;
      const nextTeams = prevTeams.map((team) => {
        const remainingPlayers = team.players.filter((player) => {
          if (player.id === playerId) {
            draggedPlayer = player;
            return false;
          }
          return true;
        });
        return { ...team, players: remainingPlayers };
      });

      if (!draggedPlayer) return prevTeams;

      return nextTeams.map((team) => {
        if (team.id === targetTeamId) {
          return { ...team, players: [...team.players, draggedPlayer] };
        }
        return team;
      });
    });
    setShowMoveDialog(false);
    setSelectedPlayer(null);
  }, []);

  const handlePlayerPress = useCallback((player, teamId) => {
    if (Platform.OS === 'web') {
      setSelectedPlayer({ player, fromTeamId: teamId });
      setShowMoveDialog(true);
    }
  }, []);

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

  const renderPlayerItem = (player, teamId) => {
    const skillAverage = getPlayerSkillAverage(player);
    const isSetter = player.position === 'Levantador';
    const genderIcon = player.gender === 'masc' ? '♂' : player.gender === 'fem' ? '♀' : '';

    const playerContent = (
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
    );

    // Para web, usar TouchableOpacity
    if (Platform.OS === 'web' || !DraxView) {
      return (
        <TouchableOpacity
          key={player.id}
          style={[styles.playerItem, { backgroundColor: theme.colors.cardBackground }]}
          onPress={() => handlePlayerPress(player, teamId)}
        >
          {playerContent}
        </TouchableOpacity>
      );
    }

    // Para mobile, usar DraxView
    return (
      <DraxView
        key={player.id}
        style={[styles.playerItem, { backgroundColor: theme.colors.cardBackground }]}
        dragPayload={{ playerId: player.id, fromTeamId: teamId }}
        longPressDelay={150}
        draggable={true}
      >
        {playerContent}
      </DraxView>
    );
  };

  const renderTeamSection = (team) => {
    const teamSkillAverage = team.players.length > 0
      ? team.players.reduce((sum, p) => sum + getPlayerSkillAverage(p), 0) / team.players.length
      : 0;

    const teamContent = (
      <>
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
          {team.players.map((player) => (
            <View key={player.id}>
              {renderPlayerItem(player, team.id)}
            </View>
          ))}
        </View>
      </>
    );

    // Para web ou sem DraxView, usar View normal
    if (Platform.OS === 'web' || !DraxView) {
      return (
        <View
          key={team.id}
          style={[styles.teamSection, { backgroundColor: theme.colors.cardBackground }]}
        >
          {teamContent}
        </View>
      );
    }

    // Para mobile com DraxView
    return (
      <DraxView
        key={team.id}
        style={[styles.teamSection, { backgroundColor: theme.colors.cardBackground }]}
        onReceiveDragDrop={({ dragged }) => {
          if (dragged?.payload?.playerId) {
            movePlayerToTeam(dragged.payload.playerId, team.id);
          }
        }}
      >
        {teamContent}
      </DraxView>
    );
  };

  return (
    <>
      {(Platform.OS !== 'web' && DraxProvider) ? (
        <DraxProvider>
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
        </DraxProvider>
      ) : (
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
      )}

      {/* Modal para seleção de time na web */}
      {Platform.OS === 'web' && (
        <Modal
          visible={showMoveDialog}
          transparent
          animationType="fade"
          onRequestClose={() => setShowMoveDialog(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowMoveDialog(false)}
          >
            <View style={[styles.modalContent, { backgroundColor: theme.colors.cardBackground }]}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                Mover {selectedPlayer?.player?.name || 'jogador'}
              </Text>
              <Text style={[styles.modalSubtitle, { color: theme.colors.textSecondary }]}>
                Para qual time?
              </Text>

              <View style={styles.modalButtons}>
                {teams
                  .filter(team => team.id !== selectedPlayer?.fromTeamId)
                  .map(team => (
                    <TouchableOpacity
                      key={team.id}
                      style={[styles.modalButton, { backgroundColor: theme.colors.primary }]}
                      onPress={() => {
                        if (selectedPlayer?.player?.id) {
                          movePlayerToTeam(selectedPlayer.player.id, team.id);
                        }
                      }}
                    >
                      <Text style={styles.modalButtonText}>{team.name}</Text>
                    </TouchableOpacity>
                  ))}
              </View>

              <TouchableOpacity
                style={[styles.modalCancelButton, { borderColor: theme.colors.border }]}
                onPress={() => setShowMoveDialog(false)}
              >
                <Text style={[styles.modalCancelText, { color: theme.colors.text }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    gap: 12,
    marginBottom: 16,
  },
  modalButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalCancelButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default MonteTimeSortResultScreen;
