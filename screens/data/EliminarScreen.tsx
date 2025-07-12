import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { ref, remove } from 'firebase/database';
import { db } from '../../FIREBASE/Config'; 

const EliminarScreen = () => {
  const [cedula, setCedula] = useState('');

  const eliminar = () => {
    if (!cedula) {
      Alert.alert('Error', 'Por favor, ingresa la cédula del usuario a eliminar.');
      return;
    }

    remove(ref(db, 'users/' + cedula))
    .then(() => {
      Alert.alert('Éxito', `Usuario con cédula ${cedula} eliminado correctamente.`);
      setCedula(''); 
    })
    .catch((error) => {
      Alert.alert('Error', 'Hubo un problema al eliminar el usuario: ' + error.message);
      console.error('Error al eliminar datos:', error);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Eliminar Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Cédula del usuario a eliminar"
        value={cedula}
        onChangeText={setCedula}
        keyboardType="numeric"
      />

      <Button
        title="Eliminar Usuario"
        onPress={eliminar}
        color="#DC143C" 
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
});

export default EliminarScreen;
