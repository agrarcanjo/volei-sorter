import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ComponentsDemo from '../screens/ComponentsDemo';
import SettingsScreen from '../screens/SettingsScreen';
import TeamSortConfigScreen from '../screens/teams/TeamSortConfigScreen.js';
import TeamSortGameScreen from '../screens/teams/TeamSortGameScreen.js';
import NumberSortConfigScreen from '../screens/numbers/NumberSortConfigScreen.js';
import NumberSortGameScreen from '../screens/numbers/NumberSortGameScreen.js';
import NextPlayersConfigScreen from '../screens/NextPlayers/NextPlayersConfigScreen.js';
import NextPlayersGameScreen from '../screens/NextPlayers/NextPlayersGameScreen.js';

const Stack = createStackNavigator();

/**
 * Navegação principal do aplicativo
 */
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
          presentation: 'card',
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Vôlei Team Sorter' }}
        />
        <Stack.Screen 
          name="ComponentsDemo" 
          component={ComponentsDemo}
          options={{ title: 'Demonstração de Componentes' }}
        />
        
        {/* Team Sort Flow */}
        <Stack.Screen 
          name="TeamSortConfig" 
          component={TeamSortConfigScreen}
          options={{ title: 'Configurar Times' }}
        />
        <Stack.Screen 
          name="TeamSortGame" 
          component={TeamSortGameScreen}
          options={{ title: 'Sortear Times' }}
        />
        
        {/* Number Sort Flow */}
        <Stack.Screen 
          name="NumberSortConfig" 
          component={NumberSortConfigScreen}
          options={{ title: 'Configurar Números' }}
        />
        <Stack.Screen 
          name="NumberSortGame" 
          component={NumberSortGameScreen}
          options={{ title: 'Sortear Números' }}
        />
        
        {/* Next Players Flow */}
        <Stack.Screen 
          name="NextPlayersConfig" 
          component={NextPlayersConfigScreen}
          options={{ title: 'Configurar Próximos' }}
        />
        <Stack.Screen 
          name="NextPlayersGame" 
          component={NextPlayersGameScreen}
          options={{ title: 'Próximos Jogadores' }}
        />
        
        {/* Settings */}
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ title: 'Configurações' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
