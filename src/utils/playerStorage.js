import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  PLAYERS: '@montetime_players',
  TEAM_CONFIG: '@montetime_team_config',
  SELECTED_PLAYERS: '@montetime_selected_players',
};

/**
 * Estrutura de um jogador
 */
export const createPlayer = (name, id = Date.now()) => ({
  id,
  name,
  gender: '', // 'masc' | 'fem'
  position: '', // 'levantador' | 'ponta' | 'oposto' | 'central' | 'libero'
  skills: {
    levante: 0,
    ataque: 0,
    defesa: 0,
    bloqueio: 0,
  },
});

/**
 * Estrutura de configuração do time
 */
export const createTeamConfig = () => ({
  teamSize: 6,
  fixedSetter: true,
  womenPerTeam: 0,
  randomnessFactor: 50, // 0-100
});

// ===== JOGADORES =====

export const savePlayers = async (players) => {
  try {
    await AsyncStorage.setItem(KEYS.PLAYERS, JSON.stringify(players));
    return true;
  } catch (error) {
    console.error('Erro ao salvar jogadores:', error);
    return false;
  }
};

export const loadPlayers = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.PLAYERS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao carregar jogadores:', error);
    return [];
  }
};

export const addPlayer = async (player) => {
  try {
    const players = await loadPlayers();
    players.push(player);
    await savePlayers(players);
    return true;
  } catch (error) {
    console.error('Erro ao adicionar jogador:', error);
    return false;
  }
};

export const updatePlayer = async (playerId, updatedData) => {
  try {
    const players = await loadPlayers();
    const index = players.findIndex(p => p.id === playerId);
    if (index !== -1) {
      players[index] = { ...players[index], ...updatedData };
      await savePlayers(players);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao atualizar jogador:', error);
    return false;
  }
};

export const deletePlayer = async (playerId) => {
  try {
    const players = await loadPlayers();
    const filtered = players.filter(p => p.id !== playerId);
    await savePlayers(filtered);
    return true;
  } catch (error) {
    console.error('Erro ao deletar jogador:', error);
    return false;
  }
};

// ===== CONFIGURAÇÕES DO TIME =====

export const saveTeamConfig = async (config) => {
  try {
    await AsyncStorage.setItem(KEYS.TEAM_CONFIG, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('Erro ao salvar configuração:', error);
    return false;
  }
};

export const loadTeamConfig = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.TEAM_CONFIG);
    if (data) {
      return JSON.parse(data);
    }
    // Retorna configuração padrão se não existir
    const defaultConfig = createTeamConfig();
    await saveTeamConfig(defaultConfig);
    return defaultConfig;
  } catch (error) {
    console.error('Erro ao carregar configuração:', error);
    return createTeamConfig();
  }
};

// ===== JOGADORES SELECIONADOS =====

export const saveSelectedPlayerIds = async (playerIds) => {
  try {
    await AsyncStorage.setItem(KEYS.SELECTED_PLAYERS, JSON.stringify(playerIds));
    return true;
  } catch (error) {
    console.error('Erro ao salvar jogadores selecionados:', error);
    return false;
  }
};

export const loadSelectedPlayerIds = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.SELECTED_PLAYERS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao carregar jogadores selecionados:', error);
    return [];
  }
};
