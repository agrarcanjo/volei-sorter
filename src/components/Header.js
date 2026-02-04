import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { hapticLight } from '../utils/haptics';

/**
 * Header com botões de navegação
 * 
 * Props:
 * - title: string - Título do header
 * - onBack: function - Callback para voltar
 * - onReset: function - Callback para resetar
 * - showBack: boolean - Se mostra botão voltar
 * - showReset: boolean - Se mostra botão resetar
 */
const Header = ({
  title,
  onBack,
  onReset,
  showBack = true,
  showReset = false,
}) => {
  const { theme } = useTheme();

  const handleBack = () => {
    if (onBack) {
      hapticLight();
      onBack();
    }
  };

  const handleReset = () => {
    if (onReset) {
      hapticLight();
      onReset();
    }
  };

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: theme.colors.background,
          borderBottomColor: theme.colors.border,
        },
      ]}
    >
      {/* Botão Voltar */}
      <View style={styles.leftContainer}>
        {showBack && onBack && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleBack}
            style={[
              styles.button,
              {
                backgroundColor: theme.colors.cardBackground,
                borderColor: theme.colors.border,
                ...theme.shadows.sm,
              },
            ]}
          >
            <Text style={[styles.buttonText, { color: theme.colors.primary }]}>
              ← Voltar
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Título */}
      {title && (
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.text,
                fontSize: theme.fontSizes.lg,
                fontWeight: theme.fontWeights.bold,
              },
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
      )}

      {/* Botão Reset */}
      <View style={styles.rightContainer}>
        {showReset && onReset && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleReset}
            style={[
              styles.button,
              {
                backgroundColor: theme.colors.primary,
                ...theme.shadows.sm,
              },
            ]}
          >
            <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
              ↻ Novo
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    minHeight: 60,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    textAlign: 'center',
  },
});

export default Header;
