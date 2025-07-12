// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOGPiH7gS1H5clL2kfDTwfCxT9OYmwtuc",
  authDomain: "actividadautonomaejercicio1.firebaseapp.com",
  databaseURL: "https://actividadautonomaejercicio1-default-rtdb.firebaseio.com",
  projectId: "actividadautonomaejercicio1",
  storageBucket: "actividadautonomaejercicio1.firebasestorage.app",
  messagingSenderId: "768278468495",
  appId: "1:768278468495:web:ee37922f302e87a9f51dfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
