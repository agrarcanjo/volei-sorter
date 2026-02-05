import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '../context/ThemeContext';

/**
 * Container principal com SafeArea e tema aplicado
 * 
 * Props:
 * - children: element - Conteúdo do container
 * - padding: boolean - Se aplica padding padrão
 * - center: boolean - Se centraliza conteúdo
 * - style: object - Estilos adicionais
 */
const Container = ({
  children,
  padding = true,
  center = false,
  style,
}) => {
  const { theme, isDarkMode } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Container;
