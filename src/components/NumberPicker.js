import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { hapticLight } from '../utils/haptics';

/**
 * Seletor de números estilizado
 * 
 * Props:
 * - label: string - Label do seletor
 * - value: number - Valor atual
 * - onValueChange: function - Callback quando valor muda
 * - min: number - Valor mínimo
 * - max: number - Valor máximo
 * - step: number - Incremento/decremento
 * - disabled: boolean - Se está desabilitado
 */
const NumberPicker = ({
  label,
  value,
  onValueChange,
  min = 1,
  max = 99,
  step = 1,
  disabled = false,
}) => {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(String(value));

  const handleDecrement = () => {
    if (!disabled && value > min) {
      hapticLight();
      onValueChange(value - step);
    }
  };

  const handleIncrement = () => {
    if (!disabled && value < max) {
      hapticLight();
      onValueChange(value + step);
    }
  };

  const handleStartEdit = () => {
    if (!disabled) {
      setIsEditing(true);
      setTempValue(String(value));
    }
  };

  const handleEndEdit = () => {
    setIsEditing(false);
    const numValue = parseInt(tempValue, 10);
    
    if (!isNaN(numValue)) {
      // Garante que o valor está dentro dos limites
      const clampedValue = Math.max(min, Math.min(max, numValue));
      onValueChange(clampedValue);
      setTempValue(String(clampedValue));
    } else {
      // Se não for um número válido, volta ao valor anterior
      setTempValue(String(value));
    }
  };

  const handleChangeText = (text) => {
    // Permite apenas números
    const cleaned = text.replace(/[^0-9]/g, '');
    setTempValue(cleaned);
  };

  const decrementDisabled = disabled || value <= min;
  const incrementDisabled = disabled || value >= max;

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.text }]}>
          {label}
        </Text>
      )}
      
      <View
        style={[
          styles.pickerContainer,
          {
            backgroundColor: theme.colors.cardBackground,
            borderColor: theme.colors.border,
            ...theme.shadows.sm,
          },
        ]}
      >
        {/* Botão Decrementar */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleDecrement}
          disabled={decrementDisabled}
          style={[
            styles.button,
            {
              backgroundColor: decrementDisabled
                ? theme.colors.disabled
                : theme.colors.primary,
            },
          ]}
        >
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>

        {/* Valor */}
        <TouchableOpacity 
          style={styles.valueContainer}
          onPress={handleStartEdit}
          activeOpacity={0.7}
          disabled={disabled}
        >
          {isEditing ? (
            <TextInput
              style={[
                styles.valueInput,
                {
                  color: theme.colors.text,
                  fontSize: theme.fontSizes.xxl,
                  fontWeight: theme.fontWeights.bold,
                },
              ]}
              value={tempValue}
              onChangeText={handleChangeText}
              onBlur={handleEndEdit}
              onSubmitEditing={handleEndEdit}
              keyboardType="number-pad"
              selectTextOnFocus
              autoFocus
              maxLength={String(max).length}
            />
          ) : (
            <Text
              style={[
                styles.value,
                {
                  color: disabled ? theme.colors.textSecondary : theme.colors.text,
                  fontSize: theme.fontSizes.xxl,
                  fontWeight: theme.fontWeights.bold,
                },
              ]}
            >
              {value}
            </Text>
          )}
        </TouchableOpacity>

        {/* Botão Incrementar */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleIncrement}
          disabled={incrementDisabled}
          style={[
            styles.button,
            {
              backgroundColor: incrementDisabled
                ? theme.colors.disabled
                : theme.colors.primary,
            },
          ]}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Limites */}
      <View style={styles.limitsContainer}>
        <Text style={[styles.limitText, { color: theme.colors.textSecondary }]}>
          Min: {min}
        </Text>
        <Text style={[styles.limitText, { color: theme.colors.textSecondary }]}>
          Max: {max}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    overflow: 'hidden',
    height: 60,
  },
  button: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  valueContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    textAlign: 'center',
  },
  valueInput: {
    textAlign: 'center',
    width: '100%',
    padding: 0,
    margin: 0,
  },
  limitsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingHorizontal: 4,
  },
  limitText: {
    fontSize: 12,
  },
});

export default NumberPicker;
