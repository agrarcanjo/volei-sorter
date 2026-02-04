import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  Container,
  Card,
  CustomButton,
  NumberPicker,
  Header,
  ThemeToggle,
} from '../components';
import { useTheme } from '../context/ThemeContext';

/**
 * Tela de demonstração dos componentes
 * Útil para testar e validar todos os componentes
 */
const ComponentsDemo = ({ navigation }) => {
  const { theme } = useTheme();
  const [cardFlipped, setCardFlipped] = useState(false);
  const [number, setNumber] = useState(6);

  return (
    <Container padding={false}>
      <Header
        title="Componentes"
        onBack={() => navigation.goBack()}
        showBack={true}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* Toggle de Tema */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Toggle de Tema
          </Text>
          <ThemeToggle />
        </View>

        {/* Botões */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Botões
          </Text>
          <View style={styles.buttonGroup}>
            <CustomButton
              title="Primary"
              variant="primary"
              onPress={() => console.log('Primary')}
              fullWidth
            />
            <CustomButton
              title="Secondary"
              variant="secondary"
              onPress={() => console.log('Secondary')}
              fullWidth
            />
            <CustomButton
              title="Outline"
              variant="outline"
              onPress={() => console.log('Outline')}
              fullWidth
            />
          </View>
          
          <View style={styles.buttonRow}>
            <CustomButton
              title="Small"
              size="small"
              onPress={() => console.log('Small')}
            />
            <CustomButton
              title="Medium"
              size="medium"
              onPress={() => console.log('Medium')}
            />
            <CustomButton
              title="Large"
              size="large"
              onPress={() => console.log('Large')}
            />
          </View>

          <CustomButton
            title="Loading"
            loading={true}
            fullWidth
          />
          
          <CustomButton
            title="Disabled"
            disabled={true}
            fullWidth
          />
        </View>

        {/* Number Picker */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Number Picker
          </Text>
          <NumberPicker
            label="Tamanho do Time"
            value={number}
            onValueChange={setNumber}
            min={2}
            max={12}
          />
        </View>

        {/* Cards */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Cards com Flip
          </Text>
          
          <View style={styles.cardsRow}>
            <Card
              isFlipped={cardFlipped}
              onFlip={() => setCardFlipped(true)}
              size={{ width: 100, height: 100 }}
              backgroundColor={theme.colors.teamRed}
              frontContent={
                <View style={styles.cardContent}>
                  <Text style={styles.cardText}>TIME</Text>
                  <Text style={[styles.cardText, { fontSize: 24 }]}>🔴</Text>
                  <Text style={styles.cardText}>VERMELHO</Text>
                </View>
              }
            />

            <Card
              isFlipped={false}
              onFlip={() => {}}
              size={{ width: 100, height: 100 }}
              backgroundColor={theme.colors.teamBlue}
              frontContent={
                <View style={styles.cardContent}>
                  <Text style={styles.cardText}>TIME</Text>
                  <Text style={[styles.cardText, { fontSize: 24 }]}>🔵</Text>
                  <Text style={styles.cardText}>AZUL</Text>
                </View>
              }
            />

            <Card
              isFlipped={false}
              onFlip={() => {}}
              size={{ width: 100, height: 100 }}
              backgroundColor={theme.colors.next}
              frontContent={
                <View style={styles.cardContent}>
                  <Text style={styles.cardText}>PRÓXIMO</Text>
                  <Text style={[styles.cardText, { fontSize: 32 }]}>⏭️</Text>
                </View>
              }
            />
          </View>

          <CustomButton
            title="Reset Card"
            variant="outline"
            size="small"
            onPress={() => setCardFlipped(false)}
            fullWidth
            style={{ marginTop: 16 }}
          />
        </View>

        {/* Espaçamento final */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonGroup: {
    gap: 12,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 12,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  cardContent: {
    alignItems: 'center',
    gap: 4,
  },
  cardText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default ComponentsDemo;
