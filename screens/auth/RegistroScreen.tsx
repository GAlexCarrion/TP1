import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../../FIREBASE/Config';
import { supabase } from '../../supabase/Conexion'; // Asegúrate de que esta ruta sea correcta para tu cliente Supabase
import * as ImagePicker from 'expo-image-picker';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type AppStackParamList = {
  Auth: undefined; 
  GameModule: undefined; 
};

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;
type AppNavigationProp = StackNavigationProp<AppStackParamList>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const appNavigation = useNavigation<AppNavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permiso denegado", "Se necesita permiso para usar la cámara.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      } else {
        setImage(null);
      }
    }
  };

  const uploadImage = async (uri: string, userId: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileExt = uri.split('.').pop();
      const fileName = `${userId}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, blob, { upsert: true });
      if (error) {
        throw error;
      }
      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error('No se pudo obtener la URL pública de la imagen');
      }
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      Alert.alert("Error", "No se pudo subir la imagen.");
      return null;
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword || !username.trim()) {
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image, user.uid);
      }

      // Aquí deberías guardar el username y la URL de la imagen en tu base de datos (Supabase profiles)
      // Esto es lo que hemos estado depurando en las respuestas anteriores.
      // Asegúrate de que la lógica de upsert a Supabase esté aquí.
      // Ejemplo (re-insertando la lógica de Supabase que ya tenías):
      const profileData = {
        id: user.uid,
        username: username.trim(),
        email: user.email || '',
        avatar_url: imageUrl, // Guardar la URL de la imagen si existe
        created_at: new Date().toISOString()
      };

      const { error: supabaseError } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'id' });

      if (supabaseError) {
        console.error("❌ ERROR DETALLADO AL GUARDAR PERFIL EN SUPABASE:", supabaseError);
        Alert.alert("Error", "Registro exitoso en Firebase, pero no se pudo guardar el perfil en Supabase. Intenta iniciar sesión y actualizar tu perfil.");
      } else {
        Alert.alert('Éxito', 'Cuenta y perfil creados correctamente');
      }

      // Navegación después del registro exitoso
      navigation.navigate('Login'); 

    } catch (error: any) {
      console.error('Error en el registro:', error);
      Alert.alert('Error', error.message || 'Error al crear la cuenta');
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
        placeholderTextColor="#777" // Color de placeholder más oscuro
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
        placeholderTextColor="#777"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña (mínimo 6 caracteres)"
        placeholderTextColor="#777"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        placeholderTextColor="#777"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={pickImage} style={styles.photoButton}>
        <Text style={styles.photoButtonText}>Tomar Foto de Perfil</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      {loading ? (
        <ActivityIndicator size="large" color="#00FF00" /> 
      ) : (
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.registerButtonText}>Registrar Cuenta</Text>
        </TouchableOpacity>
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
    backgroundColor: '#1A252F', // Fondo oscuro como el área de juego de Snake
  },
  title: {
    fontSize: 36, // Un poco más grande
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#00FF00', // Verde vibrante como la serpiente
    textShadowColor: '#000', // Sombra para mejor contraste
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  input: {
    width: '90%',
    padding: 15,
    borderWidth: 2, // Borde más grueso
    borderColor: '#00FF00', // Borde verde
    borderRadius: 8, // Bordes ligeramente cuadrados
    marginBottom: 15,
    fontSize: 18,
    backgroundColor: '#34495E', // Fondo oscuro para los inputs
    color: '#E0E0E0', // Texto claro
    fontFamily: 'monospace', // Fuente que evoca lo retro (si está disponible)
  },
  photoButton: {
    backgroundColor: '#3498DB', // Azul para el botón de foto
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  photoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50, // Completamente redondo
    marginBottom: 15,
    borderWidth: 3, // Borde para la imagen de perfil
    borderColor: '#00FF00', // Borde verde
  },
  registerButton: {
    backgroundColor: '#00FF00', // Verde brillante para el botón principal
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#00FF00', // Sombra del mismo color
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  registerButtonText: {
    color: '#1A252F', // Texto oscuro para contrastar con el botón verde
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  loginButton: {
    marginTop: 20,
  },
  loginText: {
    color: '#3498DB', // Azul para el enlace de login
    fontSize: 16,
    textDecorationLine: 'underline',
    fontFamily: 'monospace',
  },
});

export default RegisterScreen;
