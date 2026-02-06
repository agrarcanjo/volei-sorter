import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
        {/* Header com Toggle e Configurações */}
        <View style={styles.header}>
          <View style={{ flex: 1 }} />
          <ThemeToggle showLabel={false} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={[
              styles.settingsButton,
              {
                backgroundColor: theme.colors.cardBackground,
                borderColor: theme.colors.border,
                ...theme.shadows.sm,
              },
            ]}
            accessibilityLabel="Configurações"
            accessibilityRole="button"
          >
            <Text style={[styles.settingsIcon, { color: theme.colors.text }]}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Logo/Título */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
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
            onPress={() => navigation.navigate('TeamSortConfig')}
          />
          
          <CustomButton
            title="🔢 Sortear Números"
            variant="primary"
            size="large"
            fullWidth
            onPress={() => navigation.navigate('NumberSortConfig')}
          />
          
          <CustomButton
            title="👥 Próximos Jogadores"
            variant="primary"
            size="large"
            fullWidth
            onPress={() => navigation.navigate('NextPlayersConfig')}
          />

          <CustomButton
            title="🏋️ Montar Time"
            variant="primary"
            size="large"
            fullWidth
            onPress={() => navigation.navigate('MonteTime')}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
            Versão 1.0.0
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
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 32,
    gap: 12,
  },
  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 26,
    fontWeight: '600',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoImage: {
    width: 120,
    height: 120,
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
