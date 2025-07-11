import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { ref, set } from 'firebase/database';
import { db } from '../../FIREBASE/Config'; 

const GuardarScreen = () => {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [edad, setEdad] = useState('');

  const guardar = () => {
    if (!cedula || !nombre || !correo || !edad) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    
    set(ref(db, 'users/' + cedula), {
      nombre: nombre,
      correo: correo,
      edad: parseInt(edad), 
    })
    .then(() => {
      Alert.alert('Éxito', 'Datos guardados correctamente en Firebase.');
      setCedula('');
      setNombre('');
      setCorreo('');
      setEdad('');
    })
    .catch((error) => {
      Alert.alert('Error', 'Hubo un problema al guardar los datos: ' + error.message);
      console.error('Error al guardar datos:', error);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Guardar Datos de Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
        keyboardType="numeric"
      />
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
        title="Guardar Usuario"
        onPress={guardar}
        color="#2E8B57" 
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0F8FF',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
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
});

export default GuardarScreen;
