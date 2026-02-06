/**
 * Testes básicos para MonteTime
 */

import { sortTeams, getPlayerSkillAverage, validateDistribution } from './src/utils/teamSortAlgorithm.js';

// Criar jogadores de teste
const createTestPlayers = () => [
  {
    id: 1,
    name: 'João',
    gender: 'masc',
    position: 'levantador',
    skills: { levante: 9, ataque: 5, defesa: 6, bloqueio: 5 },
  },
  {
    id: 2,
    name: 'Maria',
    gender: 'fem',
    position: 'ponta',
    skills: { levante: 3, ataque: 8, defesa: 7, bloqueio: 6 },
  },
  {
    id: 3,
    name: 'Pedro',
    gender: 'masc',
    position: 'oposto',
    skills: { levante: 2, ataque: 9, defesa: 5, bloqueio: 8 },
  },
  {
    id: 4,
    name: 'Ana',
    gender: 'fem',
    position: 'central',
    skills: { levante: 1, ataque: 6, defesa: 9, bloqueio: 9 },
  },
  {
    id: 5,
    name: 'Carlos',
    gender: 'masc',
    position: 'libero',
    skills: { levante: 2, ataque: 3, defesa: 10, bloqueio: 2 },
  },
  {
    id: 6,
    name: 'Beatriz',
    gender: 'fem',
    position: 'levantador',
    skills: { levante: 8, ataque: 4, defesa: 5, bloqueio: 4 },
  },
  {
    id: 7,
    name: 'Bruno',
    gender: 'masc',
    position: 'ponta',
    skills: { levante: 3, ataque: 7, defesa: 6, bloqueio: 5 },
  },
  {
    id: 8,
    name: 'Sofia',
    gender: 'fem',
    position: 'oposto',
    skills: { levante: 1, ataque: 8, defesa: 4, bloqueio: 7 },
  },
  {
    id: 9,
    name: 'Ricardo',
    gender: 'masc',
    position: 'central',
    skills: { levante: 2, ataque: 5, defesa: 8, bloqueio: 8 },
  },
  {
    id: 10,
    name: 'Lucas',
    gender: 'masc',
    position: 'libero',
    skills: { levante: 3, ataque: 4, defesa: 9, bloqueio: 3 },
  },
  {
    id: 11,
    name: 'Juliana',
    gender: 'fem',
    position: 'ponta',
    skills: { levante: 2, ataque: 7, defesa: 5, bloqueio: 4 },
  },
  {
    id: 12,
    name: 'Felipe',
    gender: 'masc',
    position: 'oposto',
    skills: { levante: 1, ataque: 8, defesa: 3, bloqueio: 7 },
  },
];

console.log('===== Testes MonteTime =====\n');

// Teste 1: Validação com 12 jogadores, 6 por time
console.log('Teste 1: Validação com 12 jogadores, 6 por time');
const players = createTestPlayers();
const config1 = {
  teamSize: 6,
  fixedSetter: true,
  womenPerTeam: 1,
  randomnessFactor: 50,
};

try {
  const validation = validateDistribution(
    players,
    config1.teamSize,
    config1.fixedSetter,
    config1.womenPerTeam
  );
  console.log('Validação:', validation);

  if (validation.valid) {
    const teams = sortTeams(players, config1);
    console.log(`✓ ${teams.length} times criados:\n`);

    teams.forEach(team => {
      console.log(`  ${team.name} (Skill Média: ${team.skillAverage.toFixed(1)}/10)`);
      team.players.forEach(p => {
        const avg = getPlayerSkillAverage(p);
        const setter = p.position === 'Levantador' ? '🏐' : '  ';
        console.log(
          `    ${setter} ${p.name} (${p.position}) - Skill: ${avg.toFixed(1)}/10`
        );
      });
      console.log();
    });
  }
} catch (error) {
  console.error('✗ Erro:', error.message);
}

// Teste 2: Teste com jogadores insuficientes
console.log('\n---\nTeste 2: Validação com 10 jogadores (insuficiente para 2 times de 6)');
try {
  const playersSmall = players.slice(0, 10);
  const validation = validateDistribution(
    playersSmall,
    6,
    true,
    0
  );
  console.log('Resultado:', validation.valid ? '✓ Válido' : `✗ Inválido: ${validation.error}`);
} catch (error) {
  console.error('✗ Erro:', error.message);
}

// Teste 3: Teste com levantadores insuficientes
console.log('\nTeste 3: Validação com levantadores insuficientes');
const playersNoSetters = players.map((p, i) => ({
  ...p,
  position: p.position === 'Levantador' ? 'ponta' : p.position,
}));

try {
  const validation = validateDistribution(
    playersNoSetters,
    6,
    true, // fixedSetter = true
    0
  );
  console.log('Resultado:', validation.valid ? '✓ Válido' : `✗ Inválido: ${validation.error}`);
} catch (error) {
  console.error('✗ Erro:', error.message);
}

// Teste 4: Teste com múltiplas iterações para verificar aleatoriedade
console.log('\nTeste 4: Múltiplas execuções (verificar aleatoriedade)');
for (let i = 0; i < 3; i++) {
  const configRandom = { ...config1, randomnessFactor: 75 };
  const teams = sortTeams(players, configRandom);
  const teamAPlayers = teams[0].players.map(p => p.name).join(', ');
  console.log(`  Execução ${i + 1} - Time A: ${teamAPlayers}`);
}

console.log('\n===== Testes Completos =====');
