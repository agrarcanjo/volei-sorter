/**
 * Algoritmo inteligente de sorteio de times
 * Distribui jogadores em times com:
 * - Balanceamento por habilidade
 * - Garantia de levantador (se configurado)
 * - Distribuição de gênero (se configurado)
 * - Fator de aleatoriedade ajustável
 */

/**
 * Calcula a habilidade média de um jogador
 */
const getPlayerSkillAverage = (player) => {
  const skills = Object.values(player.skills);
  return skills.reduce((a, b) => a + b, 0) / skills.length;
};

/**
 * Valida se é possível distribuir os jogadores
 */
const validateDistribution = (players, teamSize, fixedSetter, womenPerTeam) => {
  const totalPlayers = players.length;
  
  // Verificar se é múltiplo do tamanho do time
  if (totalPlayers < teamSize || totalPlayers % teamSize !== 0) {
    return {
      valid: false,
      error: `Total de ${totalPlayers} jogadores não é divisível por ${teamSize}`,
    };
  }

  // Verificar setters se fixedSetter está ativado
  if (fixedSetter) {
    const numTeams = totalPlayers / teamSize;
    const setters = players.filter(p => p.position === 'levantador').length;
    
    if (setters < numTeams) {
      return {
        valid: false,
        error: `Insuficiente levantadores (${setters} levantador(es) para ${numTeams} time(s))`,
      };
    }
  }

  // Verificar mulheres se configurado
  if (womenPerTeam > 0) {
    const numTeams = totalPlayers / teamSize;
    const women = players.filter(p => p.gender === 'fem').length;
    
    if (women < numTeams * womenPerTeam) {
      return {
        valid: false,
        error: `Insuficientes mulheres (${women} para ${numTeams * womenPerTeam} necessárias)`,
      };
    }
  }

  return { valid: true };
};

/**
 * Distribui jogadores em times de forma inteligente
 */
const distributePlayersToTeams = (
  players,
  teamSize,
  fixedSetter = true,
  womenPerTeam = 0,
  randomnessFactor = 50
) => {
  // Validar distribuição
  const validation = validateDistribution(players, teamSize, fixedSetter, womenPerTeam);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const numTeams = players.length / teamSize;
  const teams = Array.from({ length: numTeams }, () => []);

  // 1. Se fixedSetter, separar levantadores
  let remainingPlayers = [...players];
  const setters = remainingPlayers.filter(p => p.position === 'levantador');
  let playersWithoutSetters = remainingPlayers.filter(p => p.position !== 'levantador');

  // Distribuir um levantador em cada time
  if (fixedSetter && setters.length > 0) {
    const shuffledSetters = setters.sort(() => Math.random() - 0.5);
    shuffledSetters.forEach((setter, index) => {
      teams[index % numTeams].push(setter);
    });
    remainingPlayers = playersWithoutSetters;
  }

  // 2. Separar por gênero se necessário
  let women = [];
  let men = [];
  
  if (womenPerTeam > 0) {
    women = remainingPlayers.filter(p => p.gender === 'fem');
    men = remainingPlayers.filter(p => p.gender !== 'fem');
    
    // Distribuir mulheres primeiro
    const womenPerTeamNeeded = Math.ceil(womenPerTeam);
    for (let teamIdx = 0; teamIdx < numTeams; teamIdx++) {
      const teamNeedsWomen = womenPerTeamNeeded - teams[teamIdx].filter(p => p.gender === 'fem').length;
      for (let i = 0; i < teamNeedsWomen && women.length > 0; i++) {
        const womanIdx = Math.floor(Math.random() * women.length);
        teams[teamIdx].push(women[womanIdx]);
        women.splice(womanIdx, 1);
      }
    }
    remainingPlayers = [...women, ...men];
  }

  // 3. Calcular habilidades dos jogadores
  const playersWithSkill = remainingPlayers.map(p => ({
    ...p,
    skillAverage: getPlayerSkillAverage(p),
  }));

  // 4. Distribuir por habilidade com fator de aleatoriedade
  const sortedBySkill = playersWithSkill.sort((a, b) => b.skillAverage - a.skillAverage);

  sortedBySkill.forEach(player => {
    // Decidir baseado em aleatoriedade
    if (Math.random() * 100 < randomnessFactor) {
      // Sorteio aleatório
      const teamIdx = Math.floor(Math.random() * numTeams);
      if (teams[teamIdx].length < teamSize) {
        teams[teamIdx].push(player);
      }
    } else {
      // Adicionar ao time com menos jogadores (snake draft pattern)
      const teamWithLeast = teams.reduce((minTeam, team, idx) => {
        return team.length < teams[minTeam].length ? idx : minTeam;
      }, 0);

      if (teams[teamWithLeast].length < teamSize) {
        teams[teamWithLeast].push(player);
      }
    }
  });

  // 5. Consolidar times (pode ter sobrado alguns)
  return teams.filter(team => team.length > 0);
};

/**
 * Formata os times com nomes (A, B, C, etc)
 */
const formatTeams = (teams) => {
  return teams.map((team, index) => ({
    id: String.fromCharCode(65 + index), // A, B, C...
    name: `Time ${String.fromCharCode(65 + index)}`,
    players: team,
    skillAverage: team.reduce((sum, p) => sum + getPlayerSkillAverage(p), 0) / team.length,
  }));
};

/**
 * Função principal: sorteia e formata os times
 */
const sortTeams = (players, config) => {
  const teams = distributePlayersToTeams(
    players,
    config.teamSize,
    config.fixedSetter,
    config.womenPerTeam,
    config.randomnessFactor
  );

  return formatTeams(teams);
};

export {
  sortTeams,
  distributePlayersToTeams,
  validateDistribution,
  getPlayerSkillAverage,
  formatTeams,
};
