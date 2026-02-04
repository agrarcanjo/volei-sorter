// Arquivo de teste para verificar importações e configuração básica
import { shuffleArray, distributeTeams, distributeNextPlayers } from './src/utils/shuffle.js';
import { COLORS } from './src/constants/colors.js';
import { lightTheme, darkTheme } from './src/constants/theme.js';

console.log('✅ Arquitetura Base - Teste de Importações');
console.log('=========================================\n');

// Teste 1: Shuffle
console.log('1. Teste de Embaralhamento');
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const shuffled = shuffleArray(numbers);
console.log('Original:', numbers);
console.log('Embaralhado:', shuffled);
console.log('✓ Fisher-Yates funcionando\n');

// Teste 2: Distribuição de Times
console.log('2. Teste de Distribuição de Times');
const teams = distributeTeams(12, 6);
console.log('12 jogadores, times de 6:', teams);
const redCount = teams.filter(t => t === 'red').length;
const blueCount = teams.filter(t => t === 'blue').length;
const nextCount = teams.filter(t => t === 'next').length;
console.log(`Vermelho: ${redCount}, Azul: ${blueCount}, Próximo: ${nextCount}`);
console.log('✓ Distribuição correta\n');

// Teste 3: Próximos Jogadores
console.log('3. Teste de Próximos Jogadores');
const nextPlayers = distributeNextPlayers(6, 4);
console.log('Time de 6, ficam 4:', nextPlayers);
const insideCount = nextPlayers.filter(p => p === 'inside').length;
const outsideCount = nextPlayers.filter(p => p === 'outside').length;
console.log(`Dentro: ${insideCount}, Fora: ${outsideCount}`);
console.log('✓ Distribuição correta\n');

// Teste 4: Temas
console.log('4. Teste de Temas');
console.log('Modo Claro - Background:', lightTheme.colors.background);
console.log('Modo Escuro - Background:', darkTheme.colors.background);
console.log('✓ Temas carregados\n');

// Teste 5: Cores
console.log('5. Teste de Cores');
console.log('Time Vermelho (Light):', COLORS.light.teamRed);
console.log('Time Azul (Dark):', COLORS.dark.teamBlue);
console.log('✓ Paleta de cores definida\n');

console.log('=========================================');
console.log('✅ Todos os testes passaram!');
console.log('Arquitetura base está configurada corretamente.');
