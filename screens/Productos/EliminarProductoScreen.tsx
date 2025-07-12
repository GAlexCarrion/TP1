// screens/productos/EliminarProductoScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { ref, remove } from 'firebase/database';
import { db } from '../../firebase/Config'; // Importa la instancia de la base de datos

// Componente principal de la pantalla de eliminación de productos
const EliminarProductoScreen = () => {
  // Estado para el ID del producto a eliminar
  const [productId, setProductId] = useState('');

  // Función para eliminar el producto en Firebase Realtime Database
  const eliminar = () => { // Nombre de la función similar a 'eliminar'
    if (!productId) {
      Alert.alert('Error', 'Por favor, ingresa el ID del producto a eliminar.');
      return;
    }

    // Mostrar un cuadro de diálogo de confirmación antes de eliminar
    Alert.alert(
      'Confirmar Eliminación',
      `¿Estás seguro de que quieres eliminar el producto con ID: ${productId}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel', // Estilo para el botón de cancelar
        },
        {
          text: 'Eliminar',
          onPress: () => {
            // Si el usuario confirma, procede a eliminar el producto
            remove(ref(db, 'products/' + productId)) // Usa 'remove' para eliminar
              .then(() => {
                Alert.alert('Éxito', `Producto con ID ${productId} eliminado correctamente.`);
                setProductId(''); // Limpiar el campo después de eliminar
              })
              .catch((error) => {
                Alert.alert('Error', 'Hubo un problema al eliminar el producto: ' + error.message);
                console.error('Error al eliminar producto:', error);
              });
          },
          style: 'destructive', // Estilo para el botón de eliminar (rojo)
        },
      ],
      { cancelable: true } // Permite cerrar el diálogo tocando fuera
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Eliminar Producto</Text>

      {/* Campo de entrada para el ID del producto a eliminar */}
      <TextInput
        style={styles.input}
        placeholder="ID del Producto a Eliminar"
        value={productId}
        onChangeText={setProductId} // Conecta el input al estado 'productId'
        autoCapitalize="none"
      />

      {/* Botón para Eliminar el Producto */}
      <Button
        title="Eliminar Producto"
        onPress={eliminar} // Usa la función 'eliminar'
        color="#dc3545" // Color rojo para el botón
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
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#343a40',
    textAlign: 'center',
  },
  input: {
    width: '90%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default EliminarProductoScreen;
