import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../../FIREBASE/Config'; 
import { Ionicons } from '@expo/vector-icons';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type AppStackParamList = {
  Auth: undefined; 
  GameModule: undefined; 
};

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;
type AppNavigationProp = StackNavigationProp<AppStackParamList>; 

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const appNavigation = useNavigation<AppNavigationProp>(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingresa tu correo y contraseña.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Éxito', '¡Inicio de sesión exitoso!');
      // Reset de navegación para evitar volver a Bienvenido
      appNavigation.reset({
        index: 0,
        routes: [{ name: 'GameModule' }],
      });
    } catch (error: any) {
      let errorMessage = 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'El formato del correo electrónico es inválido.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'El usuario ha sido deshabilitado.';
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Credenciales inválidas. Verifica tu correo o contraseña.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Demasiados intentos fallidos. Intenta más tarde.';
      }
      Alert.alert('Error de autenticación', errorMessage);
      console.error('Error de inicio de sesión:', error.code, error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="game-controller" size={80} color="#27AE60" style={styles.icon} />
      <Text style={styles.title}>Snake Game</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        placeholderTextColor="#A9A9A9"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#A9A9A9"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#27AE60" />
      ) : (
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
        <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate aquí.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B3D0B',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#27AE60',
    marginBottom: 40,
    fontFamily: 'Arial',
    textShadowColor: '#145214',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  input: {
    width: '90%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#27AE60',
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 18,
    color: 'white',
    backgroundColor: '#145214',
  },
  loginButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 12,
    shadowColor: '#1E8449',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 10,
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  registerButton: {
    marginTop: 25,
  },
  registerText: {
    color: '#82E0AA',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
