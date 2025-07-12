import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../../FIREBASE/Config';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Éxito', '¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
      navigation.navigate('Login'); 
    } catch (error: any) {
      let errorMessage = 'Error al registrar la cuenta. Por favor, inténtalo de nuevo.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'El correo electrónico ya está en uso.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'El formato del correo electrónico es inválido.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'La contraseña es demasiado débil (debe tener al menos 6 caracteres).';
      }
      Alert.alert('Error de registro', errorMessage);
      console.error('Error de registro:', error.code, error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>

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
        placeholder="Contraseña (mínimo 6 caracteres)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Registrar Cuenta"
          onPress={handleRegister}
          color="#3CB371" 
        />
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
        <Text style={styles.loginText}>¿Ya tienes una cuenta? Inicia sesión.</Text>
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
  loginButton: {
    marginTop: 20,
  },
  loginText: {
    color: '#4682B4',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
