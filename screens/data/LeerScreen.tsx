import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { db } from '../../FIREBASE/Config'; 

interface UserData {
  cedula: string;
  nombre: string;
  correo: string;
  edad: number;
}

const LeerScreen = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const usersRef = ref(db, 'users/'); 

    const unsubscribe = onValue(usersRef, (snapshot) => {
      try {
        const data = snapshot.val(); 
        const loadedUsers: UserData[] = [];

        if (data) {
          Object.keys(data).forEach((cedula) => {
            loadedUsers.push({
              cedula: cedula,
              nombre: data[cedula].nombre,
              correo: data[cedula].correo,
              edad: data[cedula].edad,
            });
          });
        }
        setUsers(loadedUsers);
        setLoading(false);
      } catch (e: any) {
        setError('Error al procesar los datos: ' + e.message);
        setLoading(false);
        console.error('Error al leer datos:', e);
      }
    }, (errorObject) => {
      interface FirebaseError {
        code?: string;
        message: string;
      }
      const err = errorObject as FirebaseError;
      setError('Error al conectar con la base de datos: ' + err.message);
      setLoading(false);
      console.error('Error de Firebase:', err.code ?? 'No code', err.message);
    });

    
    return () => {
      unsubscribe();
    };
  }, []); 

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Text style={styles.errorText}>Asegúrate de que tus reglas de Firebase Realtime Database permitan lectura (read: true).</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      {users.length === 0 ? (
        <Text style={styles.noDataText}>No hay usuarios registrados aún.</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.cedula}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <Text style={styles.cardText}><Text style={styles.cardLabel}>Cédula:</Text> {item.cedula}</Text>
              <Text style={styles.cardText}><Text style={styles.cardLabel}>Nombre:</Text> {item.nombre}</Text>
              <Text style={styles.cardText}><Text style={styles.cardLabel}>Correo:</Text> {item.correo}</Text>
              <Text style={styles.cardText}><Text style={styles.cardLabel}>Edad:</Text> {item.edad}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F8FF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFCCCC',
  },
  errorText: {
    color: '#CC0000',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  userCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  cardLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  noDataText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default LeerScreen;
