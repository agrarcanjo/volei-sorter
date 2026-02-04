import * as Haptics from 'expo-haptics';

/**
 * Utilitários para feedback háptico (vibração)
 */

export const hapticLight = () => {
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch (error) {
    // Haptics pode não estar disponível em alguns dispositivos
    console.log('Haptic feedback not available');
  }
};

export const hapticMedium = () => {
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } catch (error) {
    console.log('Haptic feedback not available');
  }
};

export const hapticHeavy = () => {
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  } catch (error) {
    console.log('Haptic feedback not available');
  }
};

export const hapticSuccess = () => {
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch (error) {
    console.log('Haptic feedback not available');
  }
};

export const hapticWarning = () => {
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  } catch (error) {
    console.log('Haptic feedback not available');
  }
};

export const hapticError = () => {
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  } catch (error) {
    console.log('Haptic feedback not available');
  }
};

/**
 * Sequência de vibração para celebração (revelar todos)
 */
export const hapticCelebration = async () => {
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTimeout(async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, 100);
    setTimeout(async () => {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 200);
  } catch (error) {
    console.log('Haptic feedback not available');
  }
};
