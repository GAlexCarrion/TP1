import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type GameDrawerParamList = {
  WelcomeGame: undefined;
  Game: undefined;
  Score: undefined;
  Login: undefined;
  Register: undefined;
};

type BienvenidoNavigationProp = DrawerNavigationProp<GameDrawerParamList, 'WelcomeGame'>;

const Bienvenido = () => { 
  const navigation = useNavigation<BienvenidoNavigationProp>();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
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

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>

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
    backgroundColor: '#0B3D0B', // Fondo oscuro verde serpiente
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
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#27AE60',
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
    color: '#27AE60', // Verde vibrante
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Arial',
    textShadowColor: '#145214',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  welcomeMessage: {
    fontSize: 20,
    color: '#82E0AA',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
  },
  loginButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#1E8449',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#1E8449',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  creditsContainer: {
    marginTop: 20,
  },
  creditsText: {
    fontSize: 14,
    color: '#82E0AA',
  },
});

export default Bienvenido;
