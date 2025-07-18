import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import entities from '../engine/entities';
import { GameLoop } from '../engine/systems';
import Head from '../engine/Head';
import Tail from '../engine/Tail';
import Food from '../engine/Food';
import { Ionicons } from '@expo/vector-icons';

const initialState = {
  entities: entities(),
  score: 0,
  gameOver: false,
};

import { ref, push } from 'firebase/database';
import { db, auth } from '../../FIREBASE/Config';

function gameReducer(state: { gameOver: any; entities: { head: any; }; score: number; }, action: { type: any; payload: { touches: any; dispatch: any; events: any; }; }) {
  switch (action.type) {
    case 'tick':
      if (state.gameOver) return state;
      const newEntities = GameLoop(state.entities, action.payload);
      return { ...state, entities: newEntities };
    case 'move-up':
    case 'move-down':
    case 'move-left':
    case 'move-right':
      if (state.gameOver) return state;
      return { ...state, entities: { ...state.entities, head: { ...state.entities.head, speed: getSpeedFromAction(action.type) } } };
    case 'eat':
      return { ...state, score: state.score + 1 };
    case 'game-over':
      if (auth.currentUser) {
        const scoresRef = ref(db, 'scores');
        push(scoresRef, {
          userId: auth.currentUser.uid,
          username: auth.currentUser.displayName || 'Jugador',
          score: state.score,
          createdAt: new Date().toISOString(),
        }).catch(error => {
          console.error("Error al guardar la puntuación:", error);
          Alert.alert("Error", "No se pudo guardar la puntuación.");
        });
      }
      return { ...state, gameOver: true };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function getSpeedFromAction(actionType: any) {
  switch (actionType) {
    case 'move-up': return [0, -1];
    case 'move-down': return [0, 1];
    case 'move-left': return [-1, 0];
    case 'move-right': return [1, 0];
    default: return [1, 0];
  }
}

export default function Juego() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    if (state.gameOver) return;
    const interval = setInterval(() => {
      dispatch({ type: 'tick', payload: { touches: [], dispatch, events: [] } });
    }, 100);
    return () => clearInterval(interval);
  }, [state.gameOver]);

  const handleMove = (direction: string) => {
    dispatch({
      type: direction,
      payload: {
        touches: undefined,
        dispatch: undefined,
        events: undefined
      }
    });
  };

  const handleReset = () => {
    dispatch({
      type: 'reset',
      payload: {
        touches: undefined,
        dispatch: undefined,
        events: undefined
      }
    });
  };

  const { head, tail, food } = state.entities;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gameArea}>
        <Head position={head.position} size={head.size} />
        <Tail elements={tail.elements} size={tail.size} />
        <Food position={food.position} size={food.size} />
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Puntuación: {state.score}</Text>
      </View>

      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <TouchableOpacity onPress={() => handleMove('move-up')} style={styles.controlButton}>
            <Ionicons name="arrow-up" size={30} color="#1ABC9C" />
          </TouchableOpacity>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity onPress={() => handleMove('move-left')} style={styles.controlButton}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMove('move-down')} style={styles.controlButton}>
            <Ionicons name="arrow-down" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMove('move-right')} style={styles.controlButton}>
            <Ionicons name="arrow-forward" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {state.gameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Juego Terminado</Text>
          <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Reiniciar</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2C3E50', justifyContent: 'center' },
  gameArea: {
    flex: 1,
    backgroundColor: '#1A252F',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  scoreContainer: {
    padding: 10,
    alignItems: 'center',
  },
  scoreText: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
  },
  controls: {
    padding: 10,
    alignItems: 'center',
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlButton: {
    backgroundColor: '#34495E',
    margin: 10,
    padding: 15,
    borderRadius: 50,
    width: 60,
    alignItems: 'center',
  },
  controlText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  gameOverContainer: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  gameOverText: {
    color: 'red',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#27AE60',
    padding: 15,
    borderRadius: 10,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
