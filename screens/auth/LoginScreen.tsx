import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../../FIREBASE/Config'; 

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
      appNavigation.replace('GameModule'); 
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
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Iniciar Sesión"
          onPress={handleLogin}
          color="#6A5ACD" 
        />
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0F8FF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '90%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 18,
    backgroundColor: '#FFF',
  },
  registerButton: {
    marginTop: 20,
  },
  registerText: {
    color: '#4682B4',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
