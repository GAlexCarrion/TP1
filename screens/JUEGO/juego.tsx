import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { Ionicons } from '@expo/vector-icons';
import Constants from '../engine/constants';
import entities from '../engine/entities';
import { GameLoop } from '../engine/systems';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function JuegoScreen() {
  const [isRunning, setIsRunning] = useState(true);
  const [score, setScore] = useState(0);
  const engineRef = useRef(null);

  // Función para manejar los eventos del motor del juego
  const onEvent = (e:any) => {
    if (e.type === 'eat') {
      setScore(currentScore => currentScore + 10);
    } else if (e.type === 'game-over') {
      setIsRunning(false);
      handleSaveScore(score);
    }
  };

  // Función para guardar la puntuación en Firestore
  // CORRECCIÓN 1: Se añade el tipo 'number' al parámetro finalScore
  const handleSaveScore = async (finalScore: number) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        Alert.alert("Error", "Debes estar autenticado para guardar tu puntuación.");
        return;
    }
    
    try {
        const db = getFirestore();
        await addDoc(collection(db, "scores"), {
            userId: user.uid,
            score: finalScore,
            createdAt: new Date(),
        });
        Alert.alert("Juego Terminado", `Tu puntuación fue: ${finalScore}\n¡Guardada exitosamente!`);
    } catch (error) {
        console.error("Error al guardar la puntuación: ", error);
        Alert.alert("Error", "No se pudo guardar la puntuación.");
    }
  };

  // Función para reiniciar el juego
  const resetGame = () => {
    // CORRECCIÓN 2: Se comprueba que engineRef.current no sea null
    if (engineRef.current as any ) {
        engineRef.current!.swap(entities());
        setIsRunning(true);
        setScore(0);
    }
  };

  const handleMove = (direction: string) => {
    // CORRECCIÓN 2: Se comprueba que engineRef.current no sea null
    if (engineRef.current) {
        engineRef.current.dispatch({ type: direction });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Puntuación: {score}</Text>
      
      <GameEngine
        ref={engineRef}
        style={styles.gameContainer}
        systems={[GameLoop]}
        entities={entities()}
        running={isRunning}
        onEvent={onEvent}
      />

      {!isRunning && (
        <View style={styles.gameOverOverlay}>
          <Text style={styles.gameOverText}>Juego Terminado</Text>
          <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
            <Text style={styles.resetButtonText}>Jugar de Nuevo</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={() => handleMove('move-up')}>
          <Ionicons name="arrow-up-circle" size={60} color="white" />
        </TouchableOpacity>
        <View style={styles.middleControls}>
          <TouchableOpacity style={styles.controlButton} onPress={() => handleMove('move-left')}>
            <Ionicons name="arrow-back-circle" size={60} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={() => handleMove('move-right')}>
            <Ionicons name="arrow-forward-circle" size={60} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.controlButton} onPress={() => handleMove('move-down')}>
          <Ionicons name="arrow-down-circle" size={60} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: 50,
  },
  gameContainer: {
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
    backgroundColor: '#34495E',
    position: 'absolute',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  middleControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  controlButton: {},
  gameOverOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    height: '100%',
  },
  gameOverText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#2ECC71',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
