import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, CustomButton, ThemeToggle } from '../components';
import { useTheme } from '../context/ThemeContext';

/**
 * Tela Inicial (Menu Principal)
 */
const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <Container center>
      <View style={styles.content}>
        {/* Header com Toggle */}
        <View style={styles.header}>
          <ThemeToggle showLabel={true} />
        </View>

        {/* Logo/Título */}
        <View style={styles.logoContainer}>
          <Text style={[styles.emoji]}>🏐</Text>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Vôlei Team Sorter
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Sorteie times de forma divertida!
          </Text>
        </View>

        {/* Botões do Menu */}
        <View style={styles.menuContainer}>
          <CustomButton
            title="🎲 Sortear Times"
            variant="primary"
            size="large"
            fullWidth
            onPress={() => console.log('Sortear Times')}
          />
          
          <CustomButton
            title="🔢 Sortear Números"
            variant="primary"
            size="large"
            fullWidth
            onPress={() => console.log('Sortear Números')}
          />
          
          <CustomButton
            title="👥 Próximos Jogadores"
            variant="primary"
            size="large"
            fullWidth
            onPress={() => console.log('Próximos Jogadores')}
          />

          {/* Botão para Demo de Componentes */}
          <View style={styles.divider} />
          
          <CustomButton
            title="🎨 Ver Componentes"
            variant="outline"
            size="medium"
            fullWidth
            onPress={() => navigation.navigate('ComponentsDemo')}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
            Versão 1.0.0 - Fase 2 em Progresso
          </Text>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  menuContainer: {
    gap: 16,
  },
  divider: {
    height: 8,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
});

export default HomeScreen;
