import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Image } from 'react-native';
import { getAuth } from 'firebase/auth';
import { supabase } from '../supabase/Conexion';

export default function PerfilUsuarioScreen() {
  const [username, setUsername] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const firebaseAuth = getAuth();

  useEffect(() => {
    const loadProfile = async () => {
      const user = firebaseAuth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.uid)
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        if (data) {
          setUsername(data.username);
          setAvatarUrl(data.avatar_url);
        }
      } catch (error: any) {
        console.error("Error al cargar perfil desde Supabase:", error.message);
        Alert.alert('Error', 'No se pudo cargar tu perfil. Intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const saveProfile = async () => {
    const user = firebaseAuth.currentUser;
    if (!user) {
      Alert.alert('Error', 'Debes estar autenticado para guardar tu perfil.');
      return;
    }
    if (!username.trim()) {
      Alert.alert('Error', 'El nombre de usuario no puede estar vacío.');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: user.uid, username: username.trim(), avatar_url: avatarUrl }, { onConflict: 'id' });

      if (error) throw error;
      Alert.alert('Éxito', 'Perfil guardado correctamente.');
    } catch (error: any) {
      console.error("Error al guardar perfil en Supabase:", error.message);
      Alert.alert('Error', 'No se pudo guardar tu perfil. Intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarPlaceholderText}>Sin foto</Text>
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        placeholderTextColor="#ccc"
        value={username}
        onChangeText={setUsername}
        editable={!saving}
      />
      <TouchableOpacity
        style={styles.saveButton}
        onPress={saveProfile}
        disabled={saving}
      >
        <Text style={styles.saveButtonText}>
          {saving ? 'Guardando...' : 'Guardar Perfil'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3E50',
  },
  loadingText: {
    marginTop: 10,
    color: 'white',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 30,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#34495E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarPlaceholderText: {
    color: '#ccc',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '90%',
    backgroundColor: '#34495E',
    color: 'white',
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
