import { registerRootComponent } from 'expo';
import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * Componente principal do aplicativo
 * Configura providers e navegação
 */
export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}

registerRootComponent(App);
