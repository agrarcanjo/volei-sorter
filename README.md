# 🏐 Sorteia Time - Vôlei Team Sorter

Aplicativo mobile completo para sorteio de times de vôlei com gerenciamento inteligente de jogadores.

## 📱 Sobre o Projeto

Aplicativo desenvolvido em React Native com Expo para facilitar a organização de jogos de vôlei através de sorteios aleatórios, gamificados e com gerenciamento profissional de times.

### ✨ Funcionalidades

1. **🎲 Sortear Times** - Divide jogadores em times vermelho e azul com animações
2. **🔢 Sortear Números** - Atribui números aleatórios para jogadores
3. **👥 Próximos Jogadores** - Seleciona quem fica no próximo jogo
4. **🏋️ Montar Time (NOVO!)** - Gerenciamento inteligente de jogadores e sorteio balanceado
   - Adicionar/editar/deletar jogadores
   - Configurar restrições (levantador fixo, mulheres por time, aleatoriedade)
   - Sorteio com balanceamento inteligente por habilidade
5. **🌙 Tema Claro/Escuro** - Alternância entre modos de visualização

## 🆕 Novo Feature: Montar Time

Sistema completo de gerenciamento de jogadores com sorteio inteligente:

### 📊 Gerenciar Jogadores
- Adicionar novo jogador com nome, gênero, posição
- Avaliar habilidades em 4 categorias (1-10 estrelas)
- Editar/deletar jogadores existentes
- Dados persistidos em AsyncStorage

### ⚙️ Configurar Times
- Tamanho do time (2-16 jogadores)
- Levantador fixo (garante 1 por time)
- Mulheres por time (quota mínima)
- Fator de aleatoriedade (0-100%)

### 🎯 Sorteio Inteligente
- Balanceamento automático por habilidade
- Distribuição de levantadores se requerido
- Respeita quotas de gênero
- Fator de aleatoriedade ajustável
- Validação de restrições antes de sortear

**Veja [GUIA_MONTAR_TIME.md](GUIA_MONTAR_TIME.md) para instruções detalhadas de uso.**

## 🚀 Começando

### Pré-requisitos

- Node.js (v18+)
- npm ou yarn
- Expo CLI (opcional)
- Android Studio ou Xcode (para emuladores)
- Expo Go app (para teste em dispositivo físico)

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start

# Rodar em Android
npm run android

# Rodar em iOS (macOS apenas)
npm run ios

# Rodar na web
npm run web
```

## 🏗️ Tecnologias

- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **React Navigation** - Navegação entre telas
- **AsyncStorage** - Persistência de dados
- **Context API** - Gerenciamento de estado e temas
- **React Native Animated** - Animações performáticas

## 📂 Estrutura do Projeto

```
src/
├── navigation/              # Navegação (11 rotas)
├── screens/
│   ├── HomeScreen.js        # Menu principal
│   ├── SettingsScreen.js    # Configurações globais
│   ├── teams/               # Sortear Times
│   ├── numbers/             # Sortear Números
│   ├── NextPlayers/         # Próximos Jogadores
│   └── MonteTime/           # ✨ NOVO: Montar Time
│       ├── MonteTimeScreen.js
│       ├── MonteTimePlayerEditScreen.js
│       ├── MonteTimeConfigScreen.js
│       └── MonteTimeSortResultScreen.js
├── components/              # Componentes reutilizáveis
├── context/                 # ThemeContext (temas claro/escuro)
├── utils/
│   ├── playerStorage.js     # ✨ NOVO: AsyncStorage utilities
│   ├── teamSortAlgorithm.js # ✨ NOVO: Algoritmo inteligente
│   └── [outros]
├── constants/               # Cores e temas
└── styles/                  # Estilos globais
```

## 📖 Documentação

- [Guia de Uso - Montar Time](GUIA_MONTAR_TIME.md) - Como usar a nova feature
- [Arquitetura Técnica](ARQUITETURA_MONTAR_TIME.md) - Detalhes da implementação
- [Roadmap do Projeto](PROJECT_ROADMAP.md) - Fases e progresso
- [Arquitetura Geral](ARCHITECTURE.md) - Detalhes técnicos do app

## 🎨 Design

- Interface gamificada com feedback visual
- Animações fluidas e feedback tátil (haptics)
- Suporte a tema claro e escuro
- Layout responsivo (mobile, tablet, web)
- Componentes com foco em acessibilidade

## 📊 Status do Projeto

| Fase | Feature | Status |
|------|---------|--------|
| 1 | Fundação | ✅ Completo |
| 2 | Componentes Base | ✅ Completo |
| 3 | Navegação | ✅ Completo |
| 4 | Polish Visual | ✅ Completo |
| 6 | Otimização | ✅ 85% (Scroll issue em debugging) |
| 7 | Montar Time | ✅ 100% (NEW) |

## 🤝 Contribuindo

Este é um projeto em desenvolvimento ativo. Para contribuições:

1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

MIT

## 📧 Contato

Desenvolvido com ❤️ para a comunidade de vôlei

---

**Status**: 🟡 Em Desenvolvimento | **Fase**: 1 - Fundação
