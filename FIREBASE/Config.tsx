// firebase/config.tsx
// Este archivo configura la conexión a Firebase y sus servicios

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyD9e5Dj31PYvj-mQWCkfxJyJk6k2hyStsI",
  authDomain: "proyectomoviles2-c5837.firebaseapp.com",
  projectId: "proyectomoviles2-c5837",
  storageBucket: "proyectomoviles2-c5837.firebasestorage.app",
  messagingSenderId: "912787231356",
  appId: "1:912787231356:web:29d5cd2ee5621bf6316ff9"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const auth = getAuth(app);

console.log("Firebase Realtime Database y Auth inicializados.");
