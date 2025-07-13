import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type GameDrawerParamList = {
  WelcomeGame: undefined;
  Game: undefined;
  Score: undefined;
};

type BienvenidoNavigationProp = DrawerNavigationProp<GameDrawerParamList, 'WelcomeGame'>;

const Bienvenido = () => { 
  const navigation = useNavigation<BienvenidoNavigationProp>();

  const handleStartGame = () => {
    navigation.navigate('Game');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://placehold.co/600x400/2E8B57/FFFFFF?text=Snake+Game+Welcome' }} 
          style={styles.gameImage}
          resizeMode="contain"
          onError={(e) => console.log('Error al cargar la imagen:', e.nativeEvent.error)}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.gameTitle}>Snake Game</Text>
        <Text style={styles.welcomeMessage}>¡Deslízate hacia la victoria!</Text>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
        <Text style={styles.startButtonText}>Empezar</Text>
      </TouchableOpacity>

      <View style={styles.creditsContainer}>
        <Text style={styles.creditsText}>Desarrollado para el Taller 1</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F0F8FF', 
    padding: 20,
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameImage: {
    width: '90%',
    height: '90%',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  gameTitle: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#2E8B57', // Un verde serpiente
    marginBottom: 10,
    textAlign: 'center',
  },
  welcomeMessage: {
    fontSize: 20,
    color: '#4682B4',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  startButton: {
    backgroundColor: '#3CB371', 
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 10,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  creditsContainer: {
    marginTop: 20,
  },
  creditsText: {
    fontSize: 14,
    color: '#999',
  },
});

export default Bienvenido;
