/**
 * Paleta de Cores do Aplicativo
 * Suporta temas claro e escuro
 */

export const COLORS = {
  // Tema Claro
  light: {
    background: '#F5F5F5',
    cardBackground: '#FFFFFF',
    text: '#212121',
    textSecondary: '#757575',
    primary: '#2196F3',
    primaryDark: '#1976D2',
    
    // Cores dos Times
    teamRed: '#F44336',
    teamRedLight: '#FFCDD2',
    teamBlue: '#2196F3',
    teamBlueLight: '#BBDEFB',
    next: '#FF9800',
    nextLight: '#FFE0B2',
    
    // Próximos Jogadores
    inside: '#4CAF50',
    insideLight: '#C8E6C9',
    outside: '#F44336',
    outsideLight: '#FFCDD2',
    
    // UI Elements
    border: '#E0E0E0',
    shadow: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
    disabled: '#BDBDBD',
  },
  
  // Tema Escuro
  dark: {
    background: '#121212',
    cardBackground: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    primary: '#90CAF9',
    primaryDark: '#42A5F5',
    
    // Cores dos Times
    teamRed: '#EF5350',
    teamRedLight: '#E57373',
    teamBlue: '#42A5F5',
    teamBlueLight: '#64B5F6',
    next: '#FFB74D',
    nextLight: '#FFCC80',
    
    // Próximos Jogadores
    inside: '#66BB6A',
    insideLight: '#81C784',
    outside: '#EF5350',
    outsideLight: '#E57373',
    
    // UI Elements
    border: '#2C2C2C',
    shadow: 'rgba(0, 0, 0, 0.5)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    disabled: '#424242',
  },
};

// Cores Neutras (usadas em ambos os temas)
export const NEUTRAL_COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// Gradientes
export const GRADIENTS = {
  light: {
    primary: ['#2196F3', '#1976D2'],
    teamRed: ['#F44336', '#D32F2F'],
    teamBlue: ['#2196F3', '#1565C0'],
    next: ['#FF9800', '#F57C00'],
    inside: ['#4CAF50', '#388E3C'],
    outside: ['#F44336', '#C62828'],
  },
  dark: {
    primary: ['#90CAF9', '#42A5F5'],
    teamRed: ['#EF5350', '#E53935'],
    teamBlue: ['#42A5F5', '#1E88E5'],
    next: ['#FFB74D', '#FFA726'],
    inside: ['#66BB6A', '#4CAF50'],
    outside: ['#EF5350', '#E53935'],
  },
};
