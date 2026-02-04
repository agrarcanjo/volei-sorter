# 🏗️ Arquitetura do Projeto - Vôlei Team Sorter

## 📁 Estrutura de Pastas

```
volei-team-sorter/
│
├── App.js                              # Ponto de entrada - configura ThemeProvider e Navigator
├── app.json                            # Configuração do Expo
├── package.json                        # Dependências
├── babel.config.js                     # Configuração Babel
├── PROJECT_ROADMAP.md                  # Roadmap do projeto
├── ARCHITECTURE.md                     # Este arquivo
│
├── src/
│   │
│   ├── navigation/
│   │   └── AppNavigator.js             # Stack Navigator principal
│   │
│   ├── screens/
│   │   ├── HomeScreen.js               # Menu principal
│   │   │
│   │   ├── TeamSort/
│   │   │   ├── TeamSortConfigScreen.js # Config: quantidade e tamanho time
│   │   │   └── TeamSortGameScreen.js   # Jogo: grid de cartões vermelho/azul/próximo
│   │   │
│   │   ├── NumberSort/
│   │   │   ├── NumberSortConfigScreen.js # Config: quantidade total
│   │   │   └── NumberSortGameScreen.js   # Jogo: grid de cartões com números
│   │   │
│   │   └── NextPlayers/
│   │       ├── NextPlayersConfigScreen.js # Config: tamanho time e quantos ficam
│   │       └── NextPlayersGameScreen.js   # Jogo: grid verde (fica) ou vermelho (sai)
│   │
│   ├── components/
│   │   ├── Card.js                     # Cartão com flip (verso/frente)
│   │   ├── CustomButton.js             # Botão estilizado com tema
│   │   ├── NumberPicker.js             # Seletor de números
│   │   ├── Container.js                # Container com tema aplicado
│   │   ├── Header.js                   # Header com botões voltar/recomeçar
│   │   └── ThemeToggle.js              # Toggle para alternar tema
│   │
│   ├── context/
│   │   └── ThemeContext.js             # Context API para tema claro/escuro
│   │
│   ├── utils/
│   │   ├── shuffle.js                  # Fisher-Yates shuffle + lógica distribuição
│   │   ├── haptics.js                  # Feedback tátil (vibração)
│   │   └── animations.js               # (futuro) Configurações animação
│   │
│   ├── constants/
│   │   ├── colors.js                   # Paleta de cores (light/dark)
│   │   └── theme.js                    # Configuração tema (spacing, fonts, shadows)
│   │
│   └── styles/
│       └── globalStyles.js             # Estilos reutilizáveis globais
│
└── assets/
    ├── icon.png                        # Ícone do app
    ├── splash.png                      # Splash screen
    └── adaptive-icon.png               # Ícone adaptativo Android
```

---

## 🔄 Fluxo de Navegação

```
HomeScreen (Menu Principal)
    │
    ├─→ TeamSortConfigScreen ──→ TeamSortGameScreen
    │       ↑___________________________|
    │
    ├─→ NumberSortConfigScreen ──→ NumberSortGameScreen
    │       ↑___________________________|
    │
    └─→ NextPlayersConfigScreen ──→ NextPlayersGameScreen
            ↑___________________________|
```

**Navegação**:
- Todas as telas de jogo têm botão "Voltar" (volta para config)
- Todas as telas de config têm botão "Voltar" (volta para Home)
- Todas as telas de jogo têm botão "Recomeçar" (reset do jogo)

---

## 🎨 Sistema de Temas

### ThemeContext
- **Provider**: Envolve todo o app no `App.js`
- **Hook**: `useTheme()` - disponível em qualquer componente
- **Estado**: `isDarkMode`, `theme`, `toggleTheme()`

### Estrutura do Tema
```javascript
theme = {
  colors: { ... },      // Paleta de cores
  spacing: { ... },     // Espaçamentos
  fontSizes: { ... },   // Tamanhos de fonte
  fontWeights: { ... }, // Pesos de fonte
  borderRadius: { ... },// Bordas arredondadas
  shadows: { ... },     // Sombras
  isDark: boolean       // Flag do modo
}
```

### Uso em Componentes
```javascript
import { useTheme } from '../context/ThemeContext';

const MyComponent = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Olá</Text>
    </View>
  );
};
```

---

## 🃏 Componente Card (Principal)

### Responsabilidades
- Renderizar cartão virado (verso)
- Animar flip ao ser tocado
- Revelar conteúdo (frente)
- Bloquear interação após ser virado
- Feedback tátil ao tocar

### Props Esperadas
```javascript
<Card
  isFlipped={boolean}           // Estado: virado ou não
  onFlip={function}             // Callback ao ser tocado
  frontContent={element}        // Conteúdo da frente
  backContent={element}         // Conteúdo do verso
  backgroundColor={string}      // Cor de fundo da frente
  size={{width, height}}        // Tamanho do cartão
/>
```

### Animação
- Usa `react-native-reanimated` para performance
- Rotação 3D no eixo Y (0° → 180°)
- Duração: 300ms
- Easing: ease-in-out

---

## 🧮 Lógica de Distribuição

### 1. Sortear Times (`distributeTeams`)
**Input**: 
- `totalPlayers`: número total
- `teamSize`: tamanho de cada time

**Output**: Array embaralhado
```javascript
['red', 'blue', 'red', 'blue', 'next', ...]
```

**Lógica**:
- Cria `teamSize` posições 'red'
- Cria `teamSize` posições 'blue'
- Cria `totalPlayers - (teamSize * 2)` posições 'next'
- Embaralha com Fisher-Yates

### 2. Sortear Números (`generateNumberArray + shuffleArray`)
**Input**: 
- `count`: quantidade de números

**Output**: Array embaralhado
```javascript
[7, 3, 12, 1, 9, ...] // de 1 até count
```

### 3. Próximos Jogadores (`distributeNextPlayers`)
**Input**:
- `teamSize`: tamanho do time
- `stayingCount`: quantos ficam

**Output**: Array embaralhado
```javascript
['inside', 'outside', 'inside', ...]
```

**Lógica**:
- Cria `stayingCount` posições 'inside'
- Cria `teamSize - stayingCount` posições 'outside'
- Embaralha com Fisher-Yates

---

## 📱 Responsividade

### Grid de Cartões
- Usa `Dimensions` para calcular tamanho da tela
- Calcula número de colunas baseado na largura
- Tamanho mínimo do cartão: 80x80
- Tamanho máximo do cartão: 120x120
- Gap entre cartões: 8-12px

### Fórmula
```javascript
const screenWidth = Dimensions.get('window').width;
const cardMinSize = 80;
const gap = 10;
const padding = 20;

const availableWidth = screenWidth - (padding * 2);
const cols = Math.floor(availableWidth / (cardMinSize + gap));
const cardSize = (availableWidth - (gap * (cols - 1))) / cols;
```

---

## 🎭 Convenções de Código

### Nomenclatura
- **Componentes**: PascalCase (`HomeScreen.js`, `Card.js`)
- **Funções/Variáveis**: camelCase (`shuffleArray`, `isDarkMode`)
- **Constants**: UPPER_SNAKE_CASE (`COLORS`, `FONT_SIZES`)

### Estrutura de Arquivo
```javascript
// 1. Imports
import React from 'react';
import { View } from 'react-native';

// 2. Componente
const MyComponent = () => {
  // Hooks
  // Estado
  // Funções
  // Render
};

// 3. Styles
const styles = StyleSheet.create({});

// 4. Export
export default MyComponent;
```

### Comentários
- JSDoc para funções utilitárias
- Comentários descritivos para lógica complexa
- TODO para funcionalidades pendentes

---

## 🔧 Dependências Principais

```json
{
  "expo": "~52.x",
  "react": "18.x",
  "react-native": "0.x",
  "@react-navigation/native": "^6.x",
  "@react-navigation/stack": "^6.x",
  "react-native-reanimated": "~3.x",
  "react-native-gesture-handler": "~2.x",
  "react-native-screens": "~4.x",
  "expo-haptics": "~14.x"
}
```

---

## 🚀 Como Rodar

```bash
# Instalar dependências
npm install

# Rodar em Android
npm run android

# Rodar em iOS (macOS apenas)
npm run ios

# Rodar na web
npm run web

# Iniciar Expo Dev Server
npm start
```

---

## ✅ Status Atual

### Implementado (Fase 1 - Parcial)
- [x] Estrutura de pastas completa
- [x] Sistema de temas (ThemeContext)
- [x] Paleta de cores (light/dark)
- [x] Configuração de tema (spacing, fonts, shadows)
- [x] Utilitários de embaralhamento (Fisher-Yates)
- [x] Lógica de distribuição (times, números, próximos)
- [x] Utilitários de feedback háptico
- [x] Estilos globais
- [x] Navegação básica configurada
- [x] HomeScreen (estrutura básica)
- [x] App.js com providers

### Pendente
- [ ] Componente Card com flip animado
- [ ] Demais componentes reutilizáveis
- [ ] Telas de configuração e jogo
- [ ] Integração completa de navegação
- [ ] Testes em dispositivo real

---

## 📚 Referências

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Reanimated Docs](https://docs.swmansion.com/react-native-reanimated/)

---

*Última atualização: 04/02/2026*
