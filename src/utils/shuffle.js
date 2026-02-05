/**
 * Algoritmo Fisher-Yates para embaralhamento aleatório
 * Garante distribuição uniforme e não tendenciosa
 */

export const shuffleArray = (array) => {
  const shuffled = [...array]; // Cria cópia para não mutar o original
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Gera índice aleatório de 0 até i
    const randomIndex = Math.floor(Math.random() * (i + 1));
    
    // Troca elementos
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  
  return shuffled;
};

/**
 * Gera array de números de 1 até n
 */
export const generateNumberArray = (count) => {
  return Array.from({ length: count }, (_, index) => index + 1);
};

/**
 * Distribui jogadores em times vermelho, azul e próximo
 * Cria um array com labels de times e embaralha de forma aleatória
 */
export const distributeTeams = (playerCount, teamSize) => {
  const teams = [];
  
  // Time Vermelho
  for (let i = 0; i < teamSize; i++) {
    teams.push('red');
  }
  
  // Time Azul
  for (let i = 0; i < teamSize; i++) {
    teams.push('blue');
  }
  
  // Próximos (jogadores que sobraram)
  const remainingPlayers = playerCount - (teamSize * 2);
  for (let i = 0; i < remainingPlayers; i++) {
    teams.push('next');
  }
  
  // Embaralha usando Fisher-Yates para distribuição aleatória
  return shuffleArray(teams);
};

/**
 * Distribui jogadores entre "dentro" e "fora"
 */
export const distributeNextPlayers = (teamSize, stayingCount) => {
  const distribution = [];
  
  // Jogadores que ficam (dentro)
  for (let i = 0; i < stayingCount; i++) {
    distribution.push('inside');
  }
  
  // Jogadores que saem (fora)
  for (let i = 0; i < teamSize - stayingCount; i++) {
    distribution.push('outside');
  }
  
  return shuffleArray(distribution);
};
