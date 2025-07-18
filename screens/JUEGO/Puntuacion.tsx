import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ref, push, get, query, orderByChild, limitToLast } from 'firebase/database';
import { db, auth } from '../../FIREBASE/Config'

interface Score {
    id: string;
    userId: string;
    username?: string;
    score: number;
    createdAt: any;
}

export default function Puntuacion() {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
        try {
            const scoresRef = query(ref(db, 'scores'), orderByChild('score'), limitToLast(100));
            const snapshot = await get(scoresRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                const scoresArray: Score[] = Object.keys(data).map(key => ({
                    id: key,
                    userId: data[key].userId,
                    score: data[key].score,
                    createdAt: data[key].createdAt,
                }));
                scoresArray.sort((a, b) => b.score - a.score);
                setScores(scoresArray);
            } else {
                setScores([]);
            }
        } catch (error) {
            console.error("Error al obtener puntuaciones: ", error);
            Alert.alert("Error", "No se pudieron cargar las puntuaciones.");
        } finally {
            setLoading(false);
        }
    };

    fetchScores();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="trophy" size={40} color="#FFD700" />
        <Text style={styles.title}>Tabla de Puntuaciones</Text>
      </View>

      <FlatList
        data={scores}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.scoreItem}>
            <Ionicons name="medal" size={24} color="#F39C12" style={styles.medalIcon} />
            <Text style={styles.rank}>{index + 1}</Text>
            <Ionicons name="person-circle" size={28} color="#2980B9" style={styles.playerIcon} />
            <Text style={styles.player}>{item.username || 'Jugador'}</Text> 
            <Text style={styles.score}>{item.score} pts</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="sad-outline" size={40} color="white" />
            <Text style={styles.emptyText}>No hay puntuaciones guardadas.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1B2631' },
  header: { padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#34495E', backgroundColor: '#17202A', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.7, shadowRadius: 6, elevation: 8 },
  title: { fontSize: 30, fontWeight: '900', color: '#F1C40F', marginTop: 10, textShadowColor: '#B7950B', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 4 },
  scoreItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, backgroundColor: '#212F3D', marginHorizontal: 15, marginVertical: 6, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.5, shadowRadius: 8, elevation: 10 },
  medalIcon: { marginRight: 8 },
  playerIcon: { marginRight: 8 },
  rank: { color: '#F1C40F', fontSize: 20, fontWeight: 'bold', width: 30, textAlign: 'center' },
  player: { color: 'white', fontSize: 18, flex: 1 },
  score: { color: '#2ECC71', fontSize: 18, fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 },
  emptyText: { color: 'white', textAlign: 'center', marginTop: 10, fontSize: 18 }
});
