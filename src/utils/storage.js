import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  TEAM_SORT_CONFIG: '@volei_team_sort_config',
  NUMBER_SORT_CONFIG: '@volei_number_sort_config',
  NEXT_PLAYERS_CONFIG: '@volei_next_players_config',
  DEFAULT_SETTINGS: '@volei_default_settings',
};

/**
 * Salva configurações do TeamSort
 */
export const saveTeamSortConfig = async (playerCount, teamSize) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.TEAM_SORT_CONFIG,
      JSON.stringify({ playerCount, teamSize })
    );
  } catch (error) {
    console.error('Erro ao salvar TeamSort config:', error);
  }
};

/**
 * Carrega configurações do TeamSort
 */
export const loadTeamSortConfig = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.TEAM_SORT_CONFIG);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao carregar TeamSort config:', error);
    return null;
  }
};

/**
 * Salva configurações do NumberSort
 */
export const saveNumberSortConfig = async (playerCount) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.NUMBER_SORT_CONFIG,
      JSON.stringify({ playerCount })
    );
  } catch (error) {
    console.error('Erro ao salvar NumberSort config:', error);
  }
};

/**
 * Carrega configurações do NumberSort
 */
export const loadNumberSortConfig = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.NUMBER_SORT_CONFIG);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao carregar NumberSort config:', error);
    return null;
  }
};

/**
 * Salva configurações do NextPlayers
 */
export const saveNextPlayersConfig = async (playerCount, stayCount) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.NEXT_PLAYERS_CONFIG,
      JSON.stringify({ playerCount, stayCount })
    );
  } catch (error) {
    console.error('Erro ao salvar NextPlayers config:', error);
  }
};

/**
 * Carrega configurações do NextPlayers
 */
export const loadNextPlayersConfig = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.NEXT_PLAYERS_CONFIG);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao carregar NextPlayers config:', error);
    return null;
  }
};

/**
 * Salva as configurações padrão
 */
export const saveDefaultSettings = async (settings) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.DEFAULT_SETTINGS, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Erro ao salvar configurações padrão:', error);
    return false;
  }
};

/**
 * Carrega as configurações padrão
 */
export const loadDefaultSettings = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.DEFAULT_SETTINGS);
    if (data) {
      return JSON.parse(data);
    }
    // Retorna valores padrão se não houver nada salvo
    return {
      teamSortPlayers: 12,
      teamSortPlayersPerTeam: 6,
      numberSortPlayers: 12,
      nextPlayersTotal: 5,
      nextPlayersStay: 3,
    };
  } catch (error) {
    console.error('Erro ao carregar configurações padrão:', error);
    return {
      teamSortPlayers: 12,
      teamSortPlayersPerTeam: 6,
      numberSortPlayers: 12,
      nextPlayersTotal: 5,
      nextPlayersStay: 3,
    };
  }
};

/**
 * Limpa todas as configurações salvas
 */
export const clearAllConfigs = async () => {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  } catch (error) {
    console.error('Erro ao limpar configurações:', error);
  }
};
