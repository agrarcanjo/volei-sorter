# 🏐 Vôlei Team Sorter - Roadmap do Projeto

## 📋 Visão Geral
Aplicativo mobile Android para sorteio aleatório de times de vôlei com interface gamificada.

**Framework**: React Native com Expo  
**Plataforma**: Android (expansível para iOS)  
**Data de Início**: 04/02/2026  
**Última Atualização**: 04/02/2026  
**Status**: 🟢 Fase 2 Completa - Iniciando Fase 3

---

## 🎯 Funcionalidades Principais

### ✅ Funcionalidades Core
- [ ] **F1: Sortear Times** - Dividir jogadores em times vermelho e azul
- [ ] **F2: Sortear Números** - Atribuir números aleatórios para jogadores
- [ ] **F3: Próximos Jogadores** - Selecionar quem fica no próximo jogo

### ✅ Funcionalidades Complementares
- [ ] **Tema Claro/Escuro** - Alternância entre modos de visualização
- [ ] **Navegação Fluida** - Menu principal e transições suaves
- [ ] **Animações** - Efeitos de flip, feedback tátil, transições

---

## 📦 Fases de Desenvolvimento

### 🔵 FASE 1: Fundação (Concluída)
**Status**: ✅ 100% Completo

#### Tarefas:
- [x] Definir escopo e roadmap do projeto
- [x] Configurar projeto React Native com Expo
- [x] Criar estrutura de pastas e arquitetura
- [x] Configurar sistema de navegação (React Navigation)
- [x] Implementar Context API para tema (claro/escuro)
- [x] Criar arquivo de cores e temas
- [x] Criar utilitários (shuffle, haptics)
- [x] Testar arquitetura base

**Entregáveis**:
- ✅ Documentação do roadmap
- ✅ Projeto inicializado e rodando
- ✅ Estrutura de pastas completa
- ✅ Sistema de temas funcional
- ✅ Utilitários testados

**Data de Conclusão**: 04/02/2026

---

### 🟢 FASE 2: Componentes Base (Concluída)
**Status**: ✅ 100% Completo

#### Tarefas:
- [x] Criar componente `Card` (cartão virado/desvirado)
- [x] Criar componente `CustomButton`
- [x] Criar componente `NumberPicker`/`Selector`
- [x] Criar componente `Container` com tema
- [x] Implementar animações de flip card (Reanimated)
- [x] Criar componente `Header` com botões voltar/recomeçar
- [x] Criar componente `ThemeToggle`
- [x] Criar tela de demonstração (ComponentsDemo)
- [x] Atualizar HomeScreen com novos componentes

**Entregáveis**:
- ✅ Biblioteca de 6 componentes reutilizáveis
- ✅ Tela de demonstração funcional
- ✅ Sistema de animações implementado
- ✅ Feedback háptico em todas as interações

**Data de Conclusão**: 04/02/2026

---

### 🟡 FASE 3: Navegação e Tela Inicial
**Status**: ⚪ Não Iniciado

#### Tarefas:
- [ ] Implementar Stack Navigator
- [ ] Criar HomeScreen (Menu Principal)
- [ ] Design dos 3 botões principais
- [ ] Adicionar toggle de tema no menu
- [ ] Implementar navegação para cada funcionalidade
- [ ] Animações de transição entre telas

**Entregáveis**:
- ⏳ Menu principal funcional
- ⏳ Navegação configurada

---

### 🔴 FASE 4: Funcionalidade 1 - Sortear Times
**Status**: ⚪ Não Iniciado

#### Tarefas:
- [ ] Criar `TeamSortConfigScreen` (tela de configuração)
- [ ] Validações de input (quantidade e tamanho)
- [ ] Criar `TeamSortGameScreen` (tela de jogo)
- [ ] Implementar lógica de distribuição (vermelho/azul/próximo)
- [ ] Algoritmo de embaralhamento (Fisher-Yates)
- [ ] Animação de flip dos cartões
- [ ] Botões voltar e recomeçar
- [ ] Feedback visual por cor (vermelho, azul, amarelo)

**Entregáveis**:
- ⏳ Funcionalidade completa e testada
- ⏳ Grid responsivo de cartões

---

### 🟣 FASE 5: Funcionalidade 2 - Sortear Números
**Status**: ⚪ Não Iniciado

#### Tarefas:
- [ ] Criar `NumberSortConfigScreen`
- [ ] Criar `NumberSortGameScreen`
- [ ] Lógica de geração e embaralhamento de números
- [ ] Grid adaptativo (otimização de espaço)
- [ ] Animação de revelação de número
- [ ] Fonte responsiva baseada em quantidade
- [ ] Botões de controle

**Entregáveis**:
- ⏳ Funcionalidade completa e testada
- ⏳ Layout otimizado para diferentes quantidades

---

### 🟠 FASE 6: Funcionalidade 3 - Próximos Jogadores
**Status**: ⚪ Não Iniciado

#### Tarefas:
- [ ] Criar `NextPlayersConfigScreen`
- [ ] Validação (quem fica < tamanho do time)
- [ ] Criar `NextPlayersGameScreen`
- [ ] Lógica de distribuição (dentro/fora)
- [ ] Animação com cores verde e vermelho
- [ ] Ícones visuais (✓ e ✗)
- [ ] Botões de controle

**Entregáveis**:
- ⏳ Funcionalidade completa e testada

---

### 🔵 FASE 7: Polimento e Refinamento
**Status**: ⚪ Não Iniciado

#### Tarefas:
- [ ] Adicionar feedback tátil (vibração)
- [ ] Otimizar performance (memo, useMemo, useCallback)
- [ ] Ajustar animações para fluidez
- [ ] Testar em diferentes resoluções
- [ ] Ajustar responsividade
- [ ] Corrigir bugs identificados
- [ ] Melhorar acessibilidade
- [ ] Adicionar sons (opcional)

**Entregáveis**:
- ⏳ App otimizado e fluido
- ⏳ Experiência de usuário refinada

---

### 🟢 FASE 8: Build e Deploy
**Status**: ⚪ Não Iniciado

#### Tarefas:
- [ ] Configurar app.json (nome, ícone, splash screen)
- [ ] Criar ícone do app
- [ ] Criar splash screen
- [ ] Build de desenvolvimento (APK)
- [ ] Testes em dispositivo físico
- [ ] Build de produção
- [ ] Documentação de instalação
- [ ] (Opcional) Publicar na Play Store

**Entregáveis**:
- ⏳ APK pronto para distribuição
- ⏳ Documentação completa

---

## 🏗️ Arquitetura do Projeto

```
volei-team-sorter/
├── App.js                          # Entry point
├── app.json                        # Expo config
├── package.json
├── babel.config.js
├── PROJECT_ROADMAP.md              # Este arquivo
│
├── src/
│   ├── navigation/
│   │   └── AppNavigator.js         # Stack Navigator
│   │
│   ├── screens/
│   │   ├── HomeScreen.js           # Menu principal
│   │   ├── TeamSort/
│   │   │   ├── TeamSortConfigScreen.js
│   │   │   └── TeamSortGameScreen.js
│   │   ├── NumberSort/
│   │   │   ├── NumberSortConfigScreen.js
│   │   │   └── NumberSortGameScreen.js
│   │   └── NextPlayers/
│   │       ├── NextPlayersConfigScreen.js
│   │       └── NextPlayersGameScreen.js
│   │
│   ├── components/
│   │   ├── Card.js                 # Cartão flip
│   │   ├── CustomButton.js         # Botão estilizado
│   │   ├── NumberPicker.js         # Seletor de números
│   │   ├── Container.js            # Container com tema
│   │   ├── Header.js               # Header com botões
│   │   └── ThemeToggle.js          # Toggle tema
│   │
│   ├── context/
│   │   └── ThemeContext.js         # Context para tema
│   │
│   ├── utils/
│   │   ├── shuffle.js              # Fisher-Yates shuffle
│   │   ├── animations.js           # Configurações de animação
│   │   └── haptics.js              # Feedback tátil
│   │
│   ├── constants/
│   │   ├── colors.js               # Paleta de cores
│   │   └── theme.js                # Tema claro/escuro
│   │
│   └── styles/
│       └── globalStyles.js         # Estilos globais
│
└── assets/
    ├── icon.png
    ├── splash.png
    └── adaptive-icon.png
```

---

## 📊 Progresso Geral✅ Completo | ▓▓▓▓▓▓▓▓▓▓ 100% |
| 3 | Navegação | ⚪ Não Iniciado | ░░░░░░░░░░ 0% |
| 4 | Sortear Times | ⚪ Não Iniciado | ░░░░░░░░░░ 0% |
| 5 | Sortear Números | ⚪ Não Iniciado | ░░░░░░░░░░ 0% |
| 6 | Próximos Jogadores | ⚪ Não Iniciado | ░░░░░░░░░░ 0% |
| 7 | Polimento | ⚪ Não Iniciado | ░░░░░░░░░░ 0% |
| 8 | Build & Deploy | ⚪ Não Iniciado | ░░░░░░░░░░ 0% |

### Progresso Total do Projeto
**▓▓▓▓▓░░░░░░░░░░░░░░ 2⚪ Não Iniciado | ░░░░░░░░░░ 0% |
| 6 | Próximos Jogadores | ⚪ Não Iniciado | ░░░░░░░░░░ 0% |
| 7 | Polimento | ⚪ Não Iniciado | ░░░░░░░░░░ 0% |
| 8 | Build & Deploy | ⚪ Não Iniciado | ░░░░░░░░░░ 0% |

### Progresso Total do Projeto
**▓▓▓░░░░░░░░░░░░░░░░░ 15%**

---

## 🛠️ Stack Tecnológica Definida

- **Framework**: React Native
- **Runtime**: Expo (facilita build e testes)
- **Navegação**: React Navigation v6
- **Animações**: React Native Reanimated v3
- **Gerenciamento de Estado**: Context API + Hooks
- **Feedback Tátil**: Expo Haptics
- **Estilização**: StyleSheet (nativo) + Theme System
- **Linter**: ESLint (opcional)
- **Formatter**: Prettier (opcional)

---

## 📝 Próximos Passos Imediatos

### Agora (Fase 1):
1. ✅ Criar este roadmap
2. ⏳ Inicializar projeto com Expo
3. ⏳ Criar estrutura de pastas
4. ⏳ Configurar sistema de temas
5. ⏳ Configurar navegação básica

### Depois (Fase 2):
- Desenvolver componentes reutilizáveis
- Implementar animações de flip card

---

## 🎨 Decisões de Design

### Paleta de Cores (Preliminar)
**Modo Claro:**
- Background: #F5F5F5
- Card: #FFFFFF
- Primary: #2196F3
- Time Vermelho: #F44336
- Time Azul: #2196F3
- Próximo: #FF9800
- Verde (Fica): #4CAF50

**Modo Escuro:**
- Background: #121212
- Card: #1E1E1E
- Primary: #90CAF9
- Time Vermelho: #EF5350
- Time Azul: #42A5F5
- Próximo: #FFB74D
- Verde (Fica): #66BB6A

---

## 📌 Notas Importantes

- Priorizar performance: app deve ser fluido mesmo com 99 cartões
- Animações devem ser suaves (60fps)
- Layout responsivo: testar em diferentes tamanhos de tela
- Modo landscape: decidir se bloquear ou adaptar
- Persistência de configurações: implementar com AsyncStorage na Fase 7

---

## 🚀 Meta Final

**Aplicativo completo, funcional e publicável, com experiência de usuário excepcional para sorteio de times de vôlei.**

---

*Última atualização: 04/02/2026*
*Versão: 1.0*
