import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Container, Header, CustomButton } from '../../components';
import { useTheme } from '../../context/ThemeContext';
import { loadPlayers, addPlayer, updatePlayer, createPlayer } from '../../utils/playerStorage';

const POSITIONS = ['Levantador', 'Ponta', 'Oposto', 'Central', 'Libero'];
const GENDERS = [
  { label: 'Masculino', value: 'masc' },
  { label: 'Feminino', value: 'fem' },
];
const SKILLS = ['levante', 'ataque', 'defesa', 'bloqueio'];

/**
 * Tela de Edição/Adição de Jogador
 */
const MonteTimePlayerEditScreen = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { playerId } = route.params;
  
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [position, setPosition] = useState('');
  const [skills, setSkills] = useState({
    levante: 0,
    ataque: 0,
    defesa: 0,
    bloqueio: 0,
  });
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    if (playerId) {
      loadPlayer();
    }
  }, [playerId]);

  const loadPlayer = async () => {
    const players = await loadPlayers();
    const player = players.find(p => p.id === playerId);
    if (player) {
      setName(player.name);
      setGender(player.gender);
      setPosition(player.position);
      setSkills(player.skills);
      setIsNew(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Nome é obrigatório!');
      return;
    }

    const playerData = {
      id: playerId || Date.now(),
      name: name.trim(),
      gender,
      position,
      skills,
    };

    if (isNew) {
      await addPlayer(playerData);
    } else {
      await updatePlayer(playerId, playerData);
    }

    navigation.goBack();
  };

  const updateSkill = (skill, value) => {
    const numValue = Math.max(0, Math.min(10, parseInt(value) || 0));
    setSkills(prev => ({
      ...prev,
      [skill]: numValue,
    }));
  };

  const renderStars = (skill, value) => {
    const screenWidth = Dimensions.get('window').width;
    const isWeb = Platform.OS === 'web';
    
    // Calcula o gap dinâmico baseado na plataforma e largura da tela
    // Web: mais espaço disponível, Android: compacto
    const dynamicGap = isWeb 
      ? 15 
      : screenWidth < 380 ? 2 : 3;
    
    const dynamicFontSize = isWeb 
      ? 16 
      : screenWidth < 380 ? 18 : 20;

    return (
      <View key={skill} style={styles.skillRow}>
        <Text style={[styles.skillLabel, { color: theme.colors.text }]}>
          {skill.charAt(0).toUpperCase() + skill.slice(1)}
        </Text>
        <View style={[styles.starsContainer, { gap: dynamicGap }]}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(star => (
            <TouchableOpacity
              key={star}
              onPress={() => updateSkill(skill, star)}
              style={styles.starButton}
              hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
            >
              <Text style={[
                styles.star,
                { 
                  color: star <= value ? theme.colors.primary : theme.colors.border,
                  fontSize: dynamicFontSize
                }
              ]}>
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={[styles.skillValue, { color: theme.colors.textSecondary }]}>
          {value}/10
        </Text>
      </View>
    );
  };

  return (
    <Container padding={false}>
      <Header
        title={isNew ? 'Adicionar Jogador' : 'Editar Jogador'}
        onBack={() => navigation.goBack()}
        showBack
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        scrollEnabled={true}
      >
        {/* Nome */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Nome *
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text, borderColor: theme.colors.border }]}
            placeholder="Digite o nome do jogador"
            placeholderTextColor={theme.colors.textSecondary}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Gênero */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Gênero
          </Text>
          <View style={styles.buttonGroup}>
            {GENDERS.map(g => (
              <TouchableOpacity
                key={g.value}
                onPress={() => setGender(g.value)}
                style={[
                  styles.genderButton,
                  {
                    backgroundColor: gender === g.value ? theme.colors.primary : theme.colors.cardBackground,
                    borderColor: theme.colors.border,
                  }
                ]}
              >
                <Text style={[styles.genderText, { color: gender === g.value ? '#fff' : theme.colors.text }]}>
                  {g.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Posição */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Posição
          </Text>
          <View style={styles.positionGrid}>
            {POSITIONS.map(pos => (
              <TouchableOpacity
                key={pos}
                onPress={() => setPosition(pos)}
                style={[
                  styles.positionButton,
                  {
                    backgroundColor: position === pos ? theme.colors.primary : theme.colors.cardBackground,
                    borderColor: theme.colors.border,
                  }
                ]}
              >
                <Text style={[styles.positionText, { color: position === pos ? '#fff' : theme.colors.text }]}>
                  {pos}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Habilidades */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.colors.text, marginBottom: 16 }]}>
            Habilidades
          </Text>
          {SKILLS.map(skill => renderStars(skill, skills[skill]))}
        </View>

        <CustomButton
          title={isNew ? 'Adicionar' : 'Atualizar'}
          onPress={handleSave}
          variant="primary"
          size="large"
          fullWidth
        />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  genderText: {
    fontSize: 14,
    fontWeight: '500',
  },
  positionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  positionButton: {
    width: '48%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  positionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  skillLabel: {
    width: 70,
    fontSize: 13,
    fontWeight: '500',
    flexShrink: 0,
  },
  starsContainer: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'nowrap',
  },
  starButton: {
    padding: 4,
    minWidth: 24,
    minHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    fontSize: 16,
  },
  skillValue: {
    width: 32,
    fontSize: 12,
    textAlign: 'right',
    flexShrink: 0,
  },
});

export default MonteTimePlayerEditScreen;
