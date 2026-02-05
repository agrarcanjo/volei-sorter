import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { hapticLight } from '../utils/haptics';

/**
 * Botão customizado com suporte a temas
 * 
 * Props:
 * - title: string - Texto do botão
 * - onPress: function - Callback ao pressionar
 * - variant: 'primary' | 'secondary' | 'outline' - Estilo do botão
 * - size: 'small' | 'medium' | 'large' - Tamanho do botão
 * - disabled: boolean - Se está desabilitado
 * - loading: boolean - Se está em loading
 * - icon: element - Ícone opcional
 * - fullWidth: boolean - Se ocupa largura total
 */
const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  style,
}) => {
  const { theme } = useTheme();

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      hapticLight();
      onPress();
    }
  };

  // Define cores baseadas no variant
  const getColors = () => {
    switch (variant) {
      case 'primary':
        return {
          background: disabled ? theme.colors.disabled : theme.colors.primary,
          text: '#FFFFFF',
          border: 'transparent',
        };
      case 'secondary':
        return {
          background: disabled ? theme.colors.disabled : theme.colors.cardBackground,
          text: disabled ? theme.colors.textSecondary : theme.colors.primary,
          border: theme.colors.border,
        };
      case 'outline':
        return {
          background: 'transparent',
          text: disabled ? theme.colors.disabled : theme.colors.primary,
          border: disabled ? theme.colors.disabled : theme.colors.primary,
        };
      default:
        return {
          background: theme.colors.primary,
          text: '#FFFFFF',
          border: 'transparent',
        };
    }
  };

  // Define padding baseado no size
  const getPadding = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 8, paddingHorizontal: 16 };
      case 'medium':
        return { paddingVertical: 12, paddingHorizontal: 24 };
      case 'large':
        return { paddingVertical: 16, paddingHorizontal: 32 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 24 };
    }
  };

  // Define tamanho da fonte baseado no size
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return theme.fontSizes.sm;
      case 'medium':
        return theme.fontSizes.md;
      case 'large':
        return theme.fontSizes.lg;
      default:
        return theme.fontSizes.md;
    }
  };

  const colors = getColors();
  const padding = getPadding();
  const fontSize = getFontSize();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
          ...padding,
          ...theme.shadows.sm,
        },
        fullWidth && styles.fullWidth,
        style,
      ]}
      accessibilityLabel={title}
      accessibilityHint={disabled ? 'Botão desabilitado' : loading ? 'Carregando...' : `Toque para ${title.toLowerCase()}`}
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator color={colors.text} size="small" />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text
            style={[
              styles.text,
              {
                color: colors.text,
                fontSize,
                fontWeight: theme.fontWeights.semibold,
              },
              icon && styles.textWithIcon,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
    minHeight: 44, // Área mínima de toque acessível
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
  textWithIcon: {
    marginLeft: 8,
  },
});

export default React.memo(CustomButton);
