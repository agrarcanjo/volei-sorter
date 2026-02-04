import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { hapticLight } from '../utils/haptics';

/**
 * Toggle para alternar entre tema claro e escuro
 * 
 * Props:
 * - style: object - Estilos adicionais
 * - showLabel: boolean - Se mostra label do tema
 */
const ThemeToggle = ({ style, showLabel = true }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const animatedValue = React.useRef(new Animated.Value(isDarkMode ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: isDarkMode ? 1 : 0,
      useNativeDriver: true,
      friction: 5,
    }).start();
  }, [isDarkMode]);

  const handleToggle = () => {
    hapticLight();
    toggleTheme();
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26],
  });

  return (
    <View style={[styles.container, style]}>
      {showLabel && (
        <Text
          style={[
            styles.label,
            {
              color: theme.colors.text,
              fontSize: theme.fontSizes.sm,
            },
          ]}
        >
          {isDarkMode ? '🌙 Escuro' : '☀️ Claro'}
        </Text>
      )}
      
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleToggle}
        style={[
          styles.toggleContainer,
          {
            backgroundColor: isDarkMode ? theme.colors.primary : theme.colors.border,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.toggleCircle,
            {
              backgroundColor: '#FFFFFF',
              transform: [{ translateX }],
            },
          ]}
        >
          <Text style={styles.icon}>
            {isDarkMode ? '🌙' : '☀️'}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontWeight: '600',
  },
  toggleContainer: {
    width: 52,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    padding: 2,
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    fontSize: 12,
  },
});

export default ThemeToggle;
