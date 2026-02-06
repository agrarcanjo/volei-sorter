# Arquitetura Técnica: Montar Time

## 🏗️ Estrutura de Pastas

```
src/
├── screens/
│   ├── MonteTime/
│   │   ├── MonteTimeScreen.js ........................ (196 linhas)
│   │   ├── MonteTimePlayerEditScreen.js ............. (198 linhas)
│   │   ├── MonteTimeConfigScreen.js ................. (168 linhas)
│   │   └── MonteTimeSortResultScreen.js ............. (197 linhas)
│   └── [outras telas do app]
│
├── utils/
│   ├── playerStorage.js .............................. (123 linhas)
│   ├── teamSortAlgorithm.js .......................... (180 linhas)
│   └── [outros utils]
│
├── context/
│   └── ThemeContext.js ............................... (fornece tema)
│
├── components/
│   ├── Container.js .................................. (wrapper com SafeAreaView)
│   ├── Header.js ...................................... (cabeçalho com volta)
│   ├── CustomButton.js ................................ (botão temático)
│   └── [outros componentes]
│
└── navigation/
    └── AppNavigator.js ................................ (4 rotas adicionadas)
```

## 🔄 Fluxo de Dados

### 1. Tela MonteTimeScreen
```
useEffect (focus listener)
    ↓
loadData()
    ├→ loadPlayers() [AsyncStorage]
    └→ loadTeamConfig() [AsyncStorage]
        ↓
    setPlayers() / setConfig()
        ↓
    renderPlayerItem() [FlatList]
```

### 2. Adição de Jogador
```
MonteTimePlayerEditScreen
    ├→ loadPlayer() (se editando)
    ├→ updateSkill() [setSkills]
    └→ handleSave()
        └→ addPlayer(playerData) OR updatePlayer()
            └→ savePlayers() [AsyncStorage]
                └→ navigation.goBack() → MonteTimeScreen recarrega
```

### 3. Sorteio de Times
```
MonteTimeSortResultScreen (effect)
    ├→ loadPlayers()
    ├→ loadTeamConfig()
    └→ sortTeams(players, config)
        ├→ validateDistribution()
        ├→ distributePlayersToTeams()
        │   ├→ Separar levantadores (se fixedSetter)
        │   ├→ Separar mulheres (se womenPerTeam)
        │   ├→ Calcular skills médios
        │   └→ Snake draft com aleatoriedade
        └→ formatTeams()
            └→ Nomes (A, B, C...)
```

## 📦 Estrutura de Dados

### Player (persistido em AsyncStorage)
```javascript
{
  id: number,                    // Único, gerado com Date.now()
  name: string,                  // Obrigatório, 1-50 chars
  gender: 'masc' | 'fem' | '',   // Opcional
  position: string,              // Uma das 5 posições
  skills: {
    levantamento: 0-10,          // Integer
    ataque: 0-10,
    defesa: 0-10,
    bloqueio: 0-10
  }
}
```

**AsyncStorage Key**: `@montetime_players` (JSON array)

### TeamConfig (persistido em AsyncStorage)
```javascript
{
  teamSize: number,              // 2-16, default 6
  fixedSetter: boolean,          // default true
  womenPerTeam: number,          // 0-6, default 0
  randomnessFactor: number       // 0-100, default 50
}
```

**AsyncStorage Key**: `@montetime_team_config` (JSON object)

### Time Formatado (retornado por sortTeams)
```javascript
{
  id: string,                    // 'A', 'B', 'C', etc
  name: string,                  // 'Time A', 'Time B', etc
  players: Player[],             // Array de players
  skillAverage: number           // Média 0-10
}
```

## 🎯 Algoritmo de Sorteio

### Passo 1: Validação
```javascript
validateDistribution(players, teamSize, fixedSetter, womenPerTeam)
  → verifica:
    - players.length >= teamSize * 2
    - players.length % teamSize === 0
    - if fixedSetter: setters >= numTeams
    - if womenPerTeam: women >= numTeams * womenPerTeam
```

### Passo 2: Distribuição de Levantadores
```javascript
if (fixedSetter) {
  setters = players.filter(p => p.position === 'levantador')
  shuffle(setters)
  para cada time:
    teams[i].push(setters[i])
  remainingPlayers = [sem levantadores]
}
```

### Passo 3: Distribuição de Mulheres
```javascript
if (womenPerTeam > 0) {
  women = players.filter(p => p.gender === 'fem')
  men = [resto]
  
  para cada time:
    adicionar (womenPerTeam) mulheres
  
  remainingPlayers = [women restantes + men]
}
```

### Passo 4: Distribuição por Skill com Aleatoriedade
```javascript
playersWithSkill = players.map(p => ({
  ...p,
  skillAverage: (levantamento + ataque + defesa + bloqueio) / 4
}))

sortados = sort(playersWithSkill, descrescente por skillAverage)

para cada player em sortados:
  if Math.random() * 100 < randomnessFactor:
    → adiciona em time aleatório
  else:
    → adiciona em time com menos jogadores (snake draft)
```

### Passo 5: Formatação
```javascript
retorna times com:
  - id: 'A', 'B', 'C', ...
  - name: 'Time A', 'Time B', ...
  - players: [] (com players)
  - skillAverage: média calculada
```

## 🎨 Componentes Utilizados

### Container.js
- **Props**: `center`, `padding`
- **Fornece**: SafeAreaView + View wrapper
- **Usado**: Em todas telas MonteTime

### Header.js
- **Props**: `title`, `onBack`, `showBack`
- **Fornece**: Cabeçalho com navegação
- **Padrão**: "← Titulo"

### CustomButton.js
- **Props**: `title`, `onPress`, `variant`, `size`, `fullWidth`, `disabled`
- **Variants**: 'primary', 'secondary'
- **Sizes**: 'small', 'medium', 'large'

### ThemeContext
- **Fornece**: `theme.colors.*`
  - `primary`, `cardBackground`, `text`, `textSecondary`, `border`, `danger`

## 🔗 Integrações

### 1. Com AsyncStorage
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage'

playerStorage.js:
  - savePlayers(players)
  - loadPlayers() → players[]
  - addPlayer(player)
  - updatePlayer(id, data)
  - deletePlayer(id)
  - saveTeamConfig(config)
  - loadTeamConfig() → config (com fallback padrão)
```

### 2. Com Navigation
```javascript
navigation.navigate('MonteTime')
navigation.navigate('MonteTimePlayerEdit', { playerId: null })
navigation.navigate('MonteTimeConfig')
navigation.navigate('MonteTimeSortResult')
navigation.goBack()
```

### 3. Com Context
```javascript
const { theme } = useTheme()
  → acessa: theme.colors.primary, .text, .cardBackground, etc
```

## 📱 Responsividade

### Viewport Adaptável
- **Móvel**: Layouts stacked vertical
- **Tablet**: 2 colunas quando apropriado (Grid de posições)
- **Web**: Max-width em containers

### ScrollView Configuration
```javascript
<ScrollView
  scrollEnabled={true}
  nestedScrollEnabled={true}
  bounces={true}
  alwaysBounceVertical={true}
  keyboardShouldPersistTaps="handled"
/>
```

## ⚡ Performance

### Otimizações Implementadas
1. **React.memo** em renderizadores de lista
2. **useCallback** em handlers de eventos
3. **FlatList** em vez de ScrollView para grandes listas
4. **Lazy loading** de dados (loadData no focus)

### Complexidade Computacional
- **Validação**: O(n) - 1 passa pelo array
- **Distribuição**: O(n log n) - sort + distribuição
- **Renderização**: O(n) - FlatList eficiente

**Performance esperada**:
- 50 jogadores: <100ms para sort
- 100 jogadores: <200ms para sort
- 500 jogadores: <500ms para sort

## 🧪 Testes

### test-montetime.js
Arquivo Node.js que valida:
1. Sorteio com 12 jogadores → 2 times
2. Rejeição de configuração inválida
3. Rejeição com insuficientes levantadores
4. Aleatoriedade em múltiplas execuções

**Executar**: `node test-montetime.js`

## 🐛 Possíveis Bugs e Soluções

### Bug: Jogador aparece em 2 times
**Status**: ❌ Impossível (array.push de cada player 1x)

### Bug: Skill média errada
**Solução**: 
```javascript
// Garantir que skills são números 0-10
Math.max(0, Math.min(10, skill))
```

### Bug: Times não balanceados
**Solução**: Aumentar `randomnessFactor` para 0 (máximo equilíbrio)

### Bug: Falta levantador em algum time
**Solução**: Se `fixedSetter=true`, garantido 1 por time. Desativar se insuficientes.

## 📋 Checklist de Implementação

- ✅ AsyncStorage setup
- ✅ CRUD de jogadores
- ✅ Tela de edição com skills
- ✅ Tela de configuração
- ✅ Algoritmo de sorteio inteligente
- ✅ Tela de resultado
- ✅ Validação de restrições
- ✅ Testes unitários
- ✅ Error handling
- ✅ Documentação

## 📚 Referências Internas

- **AsyncStorage Docs**: `src/utils/playerStorage.js`
- **Algoritmo Docs**: `src/utils/teamSortAlgorithm.js`
- **Testes**: `test-montetime.js`
- **Guia do Usuário**: `GUIA_MONTAR_TIME.md`

## 🚀 Deploy

### Gerar APK com novo feature:
```bash
eas build --platform android
```

### Versão:
- Current: 1.1.0
- Build: 5 (APK anterior)
- New: 6 (com Montar Time)

---

**Documento criado**: Fevereiro 6, 2026  
**Status**: 🟢 Completo e testado  
**Manutenção**: Fácil (bem documentado)
