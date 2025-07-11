import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { ref, update, get } from 'firebase/database'; 
import { db } from '../../FIREBASE/Config'; 

const EditarScreen = () => {
  const [cedulaBusqueda, setCedulaBusqueda] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [edad, setEdad] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userFound, setUserFound] = useState(false); 

  const buscarUsuario = async () => {
    if (!cedulaBusqueda) {
      Alert.alert('Error', 'Por favor, ingresa una cédula para buscar.');
      return;
    }
    setIsLoading(true);
    setUserFound(false);
    setNombre('');
    setCorreo('');
    setEdad('');

    try {
      const userRef = ref(db, 'users/' + cedulaBusqueda);
      const snapshot = await get(userRef); 

      if (snapshot.exists()) {
        const userData = snapshot.val();
        setNombre(userData.nombre);
        setCorreo(userData.correo);
        setEdad(userData.edad.toString()); 
        setUserFound(true);
        Alert.alert('Éxito', 'Usuario encontrado. Puedes editar sus datos.');
      } else {
        Alert.alert('No encontrado', 'No se encontró ningún usuario con esa cédula.');
        setUserFound(false);
      }
    } catch (error: any) {
      Alert.alert('Error', 'Hubo un problema al buscar el usuario: ' + error.message);
      console.error('Error al buscar usuario:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const editar = () => {
    if (!cedulaBusqueda || !nombre || !correo || !edad) {
      Alert.alert('Error', 'Por favor, completa todos los campos para actualizar.');
      return;
    }

    update(ref(db, 'users/' + cedulaBusqueda), {
      nombre: nombre,
      correo: correo,
      edad: parseInt(edad),
    })
    .then(() => {
      Alert.alert('Éxito', 'Datos del usuario actualizados correctamente.');
      setCedulaBusqueda('');
      setNombre('');
      setCorreo('');
      setEdad('');
      setUserFound(false);
    })
    .catch((error) => {
      Alert.alert('Error', 'Hubo un problema al actualizar los datos: ' + error.message);
      console.error('Error al actualizar datos:', error);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Datos de Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Cédula del usuario a editar"
        value={cedulaBusqueda}
        onChangeText={setCedulaBusqueda}
        keyboardType="numeric"
      />
      <Button
        title="Buscar Usuario"
        onPress={buscarUsuario}
        color="#4682B4" 
        disabled={isLoading}
      />

      {isLoading && <ActivityIndicator size="small" color="#0000ff" style={{ marginTop: 15 }} />}

      {userFound && (
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>Datos del Usuario:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Edad"
            value={edad}
            onChangeText={setEdad}
            keyboardType="numeric"
          />
          <Button
            title="Actualizar Datos"
            onPress={editar}
            color="#FFA500" 
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0F8FF',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '90%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#555',
  },
});

export default EditarScreen;
