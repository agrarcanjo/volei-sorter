# 🚀 Quick Reference - Montar Time

## Iniciar Rápido

### Acessar Feature
```
HomeScreen → Botão "🏋️ Montar Time"
```

### Adicionar Jogador
```
MonteTimeScreen → Botão "+"
→ Nome, Gênero, Posição, Habilidades
→ "Adicionar"
```

### Sortear Times
```
MonteTimeScreen → Botão "Sortear Time"
→ Vê times distribuídos
→ "Sortear Novamente" (opcional)
```

---

## 📁 Arquivos Principais

| Arquivo | Localização | Linhas | Propósito |
|---------|-------------|--------|----------|
| MonteTimeScreen.js | screens/MonteTime/ | 196 | Tela principal |
| MonteTimePlayerEditScreen.js | screens/MonteTime/ | 198 | Add/editar jogador |
| MonteTimeConfigScreen.js | screens/MonteTime/ | 168 | Configurações |
| MonteTimeSortResultScreen.js | screens/MonteTime/ | 197 | Resultado |
| playerStorage.js | utils/ | 123 | Persistência |
| teamSortAlgorithm.js | utils/ | 180 | Algoritmo |

---

## 🔑 AsyncStorage Keys

```javascript
// Jogadores
const PLAYERS_KEY = '@montetime_players'
const players = await loadPlayers() // Player[]

// Configuração
const CONFIG_KEY = '@montetime_team_config'
const config = await loadTeamConfig() // TeamConfig
```

---

## 📦 Estruturas de Dados

### Player
```javascript
{
  id: number,
  name: string,
  gender: 'masc' | 'fem' | '',
  position: 'levantador' | 'ponta' | 'oposto' | 'central' | 'libero' | '',
  skills: {
    levante: 0-10,
    ataque: 0-10,
    defesa: 0-10,
    bloqueio: 0-10
  }
}
```

### TeamConfig
```javascript
{
  teamSize: 6,              // 2-16
  fixedSetter: true,        // boolean
  womenPerTeam: 0,          // 0-6
  randomnessFactor: 50      // 0-100
}
```

### FormattedTeam
```javascript
{
  id: 'A',                  // String.fromCharCode(65 + index)
  name: 'Time A',
  players: Player[],
  skillAverage: 5.5         // 0-10
}
```

---

## 🎯 Funções Principais

### playerStorage.js
```javascript
// Players
createPlayer(name, id?)                    → Player
loadPlayers()                              → Player[]
addPlayer(player)                          → boolean
updatePlayer(id, data)                     → boolean
deletePlayer(id)                           → boolean
savePlayers(players)                       → boolean

// Config
createTeamConfig()                         → TeamConfig
loadTeamConfig()                           → TeamConfig
saveTeamConfig(config)                     → boolean
```

### teamSortAlgorithm.js
```javascript
sortTeams(players, config)                 → Team[] (formatado)
validateDistribution(players, size, ...)   → { valid: boolean, error?: string }
distributePlayersToTeams(...)              → Team[] (não formatado)
getPlayerSkillAverage(player)              → number
formatTeams(teams)                         → Team[] (formatado)
```

---

## 🧪 Teste Rápido

```bash
# Rodar testes do algoritmo
node test-montetime.js

# Saída esperada:
# ===== Testes MonteTime =====
# Teste 1: ✓ 2 times criados
# Teste 2: ✓ Inválido
# Teste 3: ✓ Insuficiente
# Teste 4: ✓ Múltiplas execuções
# ===== Testes Completos =====
```

---

## 🎨 Tema e Cores

```javascript
// Usar em componentes
const { theme } = useTheme()

// Cores disponíveis
theme.colors.primary        // Azul principal
theme.colors.cardBackground // Fundo dos cards
theme.colors.text          // Texto principal
theme.colors.textSecondary // Texto secundário
theme.colors.border        // Bordas
theme.colors.danger        // Delete/erro
```

---

## 🔄 Fluxo de Dados

### Carregar Dados
```
useEffect (focus listener)
    ↓
loadData()
    ├→ loadPlayers() 📱
    └→ loadTeamConfig() 📱
        ↓
    setPlayers() / setConfig()
        ↓
    Renderizar FlatList
```

### Salvar Dados
```
handleSave()
    ↓
addPlayer() ou updatePlayer()
    ↓
savePlayers() 📱
    ↓
navigation.goBack()
    ↓
useEffect dispara → loadData() → recarrega lista
```

---

## ⚠️ Restrições Automáticas

### Botão "Sortear" desabilitado se:
```javascript
if (players.length < teamSize * 2) return false;          // Mínimo 2x
if (players.length % teamSize !== 0) return false;        // Múltiplo
if (fixedSetter && setters < teams) return false;         // Setters
if (womenPerTeam > 0 && women < teams * women) return false;  // Mulheres
```

---

## 🐛 Debug/Logging

### Adicionar logs
```javascript
// playerStorage.js tem console.error() em catch
console.log('Players:', players);
console.log('Config:', config);
console.log('Teams:', teams);
```

### Limpar dados (se necessário)
```javascript
// No AsyncStorage:
await AsyncStorage.removeItem('@montetime_players')
await AsyncStorage.removeItem('@montetime_team_config')
```

---

## 📱 Componentes Usados

```javascript
import { Container, Header, CustomButton } from '../../components'
import { useTheme } from '../../context/ThemeContext'

// Container: SafeAreaView wrapper
<Container padding={false}>...</Container>

// Header: Com botão voltar
<Header title="Titulo" onBack={...} showBack={true} />

// Button: Com variantes
<CustomButton 
  title="Label"
  onPress={...}
  variant="primary|secondary"
  size="large|medium|small"
  fullWidth={true}
  disabled={false}
/>
```

---

## 🚀 Build & Deploy

### Gerar APK
```bash
eas build --platform android

# ou para web
npm run web
```

### Testar localmente
```bash
# Terminal 1
npm start

# Terminal 2
npm run android    # Emulador
# ou
npx expo start     # Scan QR com Expo Go
```

---

## 📊 Verificações Pré-Commit

- [ ] Sem errors em `npm start`
- [ ] Algoritmo passa nos 4 testes
- [ ] Adicionar/editar/deletar funciona
- [ ] Config salva e carrega
- [ ] Scroll funciona em todas telas
- [ ] Tema claro e escuro OK
- [ ] Sem console.errors

---

## 🔗 Links Úteis

- [Guia Completo](GUIA_MONTAR_TIME.md)
- [Arquitetura Técnica](ARQUITETURA_MONTAR_TIME.md)
- [Relatório de Conclusão](PHASE5_MONTETIME_COMPLETE.md)
- [Resumo Executivo](IMPLEMENTATION_SUMMARY.md)

---

## 💡 Dicas

1. **Skill Média**: (levante + ataque + defesa + bloqueio) / 4
2. **Levantador**: position === 'levantador'
3. **Gênero**: 'masc' | 'fem' | ''
4. **Persistência**: Automática com AsyncStorage
5. **Tema**: Passa automaticamente via ThemeContext

---

## ✅ Checklist de Produção

- [ ] APK gerado com sucesso
- [ ] Testado em Android real
- [ ] Sem crashes observados
- [ ] Performance OK (< 500ms para sort)
- [ ] Dados persistem após restart
- [ ] UI responsiva e acessível
- [ ] Documentação atualizada
- [ ] Git history limpo
- [ ] Pronto para App Store

---

**Last Updated**: Fevereiro 6, 2026  
**Version**: 1.1.0  
**Status**: ✅ Pronto
