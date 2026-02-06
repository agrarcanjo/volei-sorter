# 🏐 Sorteia Time - Guia de Uso "Montar Time"

## Novo Feature: Montar Time (Gerenciamento de Jogadores + Sorteio Inteligente)

### 📱 Como Acessar

1. No menu inicial (HomeScreen), clique no botão **"🏋️ Montar Time"**
2. Você será levado à tela de gerenciamento de jogadores

### ➕ Adicionar Jogador

1. Clique no botão **"+"** (canto superior direito)
2. Preencha os dados:
   - **Nome** (obrigatório)
   - **Gênero**: Masculino, Feminino ou deixar em branco
   - **Posição**: Levantador, Ponta, Oposto, Central ou Líbero
   - **Habilidades** (1-10 estrelas):
     - levante
     - Ataque
     - Defesa
     - Bloqueio
3. Clique **"Adicionar"** ou **"Atualizar"** (se editando)
4. Volta automaticamente para a lista

### ✏️ Editar Jogador

1. Na lista de jogadores, clique sobre o jogador que deseja editar
2. Modifique os dados necessários
3. Clique **"Atualizar"**

### ❌ Deletar Jogador

1. Na lista de jogadores, clique no botão **"✕"** (lado direito)
2. Jogador é removido imediatamente

### ⚙️ Configurar Time

1. Clique no botão **"⚙️"** (canto superior direito)
2. Configure:
   - **Tamanho do Time** (2-16 jogadores, padrão 6)
   - **Levantador Fixo** (liga/desliga - garante 1 levantador por time)
   - **Mulheres por Time** (0-6, padrão 0)
   - **Fator de Aleatoriedade** (0-100%):
     - **0% (Equilíbrio Máximo)**: Times balanceados por skill
     - **50% (Misto)**: Balanço entre skill e aleatório
     - **100% (Sorteio Puro)**: Completamente aleatório
3. Clique **"Salvar"**

### 🎲 Sortear Times

1. De volta à lista de jogadores, clique **"Sortear Time"**
2. O botão só aparece habilitado se:
   - Mínimo 2 times conseguem ser formados (2x tamanho do time)
   - Total de jogadores é múltiplo do tamanho do time
   - Se "Levantador Fixo" ativado, há levantadores suficientes
   - Se "Mulheres por Time" configurado, há mulheres suficientes

3. Times aparecem com:
   - 🏐 indicador para levantadores
   - ♂/♀ indicador de gênero
   - Skill média de cada jogador
   - Skill média do time

### 🔄 Sortear Novamente

1. Na tela de resultado, clique **"Sortear Novamente"**
2. Os times são redistribuídos (mantendo as mesmas restrições)
3. Com fator de aleatoriedade > 0, times serão diferentes

### ← Voltar

- Clique **"←"** em qualquer tela para voltar à anterior
- A tela anterior recarrega automaticamente os dados

---

## 💡 Dicas de Uso

### Cenário 1: Times Equilibrados (6v6)
1. Adicione 12 jogadores com skills variadas
2. Deixe "Levantador Fixo" ON
3. Deixe "Fator de Aleatoriedade" em 0% ou 25%
4. Clique Sortear - times terão skill similar

### Cenário 2: Times com Mulheres Garantidas
1. Adicione jogadores, marcando gênero
2. Em Configurações, coloque "Mulheres por Time" = 1 ou 2
3. Garante que cada time terá x mulheres

### Cenário 3: Sorteio Mais Aleatório
1. Coloque "Fator de Aleatoriedade" = 100%
2. Times serão formados aleatoriamente
3. Clique "Sortear Novamente" várias vezes para variar

### Cenário 4: Levantador Opcional
1. Se tiver poucos levantadores, desative "Levantador Fixo"
2. Levantadores podem estar distribuídos irregularmente
3. Útil quando não há levantador suficiente para todos times

---

## 📊 Exemplo de Resultado

```
TIME A (Skill Média: 6.2/10)
🏐 João (levantador) - Skill: 6.3/10
   ♂ Pedro (oposto) - Skill: 7.1/10
   ♀ Maria (ponta) - Skill: 5.8/10
   ♂ Carlos (central) - Skill: 6.0/10
   ♀ Ana (libero) - Skill: 5.5/10
   ♂ Bruno (ponta) - Skill: 6.2/10

TIME B (Skill Média: 5.8/10)
🏐 Beatriz (levantador) - Skill: 5.3/10
   ♂ Ricardo (oposto) - Skill: 6.5/10
   ♀ Juliana (ponta) - Skill: 5.2/10
   ♂ Felipe (central) - Skill: 6.1/10
   ♂ Lucas (libero) - Skill: 4.8/10
   ♀ Sofia (central) - Skill: 5.6/10
```

---

## ⚠️ Restrições

### Não pode sortear se:
- ❌ Menos de 2 times cabem (< 12 jogadores para time de 6)
- ❌ Jogadores não são múltiplo do tamanho (ex: 11 para time de 6)
- ❌ "Levantador Fixo" ON mas faltam levantadores
- ❌ "Mulheres por Time" > 0 mas faltam mulheres

### Mensagens de Erro:
- "Total de X jogadores não é divisível por 6"
- "Insuficiente levantadores (1 para 2 times)"
- "Insuficientes mulheres (1 para 4 necessárias)"

---

## 🔒 Dados Persistidos

Todos os dados são salvos automaticamente:
- ✅ Jogadores adicionados/editados/deletados
- ✅ Configurações (tamanho, levantador, mulheres, aleatoriedade)
- ✅ Dados persistem quando fechar e reabrir o app

---

## 🐛 Troubleshooting

### P: Botão "Sortear Time" está desabilitado
**R**: Verifique se:
- Tem pelo menos 2x o tamanho do time em jogadores
- Número de jogadores é múltiplo do tamanho
- Se "Levantador Fixo" ativado, tem levantador em cada time

### P: Quero teams aleatórios, não equilibrados
**R**: 
- Aumente "Fator de Aleatoriedade" para 100%
- Click "Sortear Novamente" para times diferentes

### P: Um dos meus times ficou com skill muito menor
**R**: Isso pode acontecer com aleatoriedade alta. Clique "Sortear Novamente"

---

## 📈 Limites

- **Máximo de jogadores**: Ilimitado (testado com 100+)
- **Tamanho máximo de time**: 16 (pode aumentar se necessário)
- **Máximo de mulheres por time**: 6
- **Fator de aleatoriedade**: 0-100%

---

## 🎯 Recursos Futuros (Planejados)

- [ ] Exportar times para WhatsApp/Email
- [ ] Histórico de sorteios anteriores
- [ ] Ranking de vitórias por time
- [ ] Times favoritos/presets salvos
- [ ] Estatísticas de desempenho
- [ ] Importar/Exportar dados

---

**Versão**: 1.1.0  
**Last Updated**: Fevereiro 6, 2026  
**Status**: ✅ Pronto para uso
