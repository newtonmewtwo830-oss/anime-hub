import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtjkb2CrAlktD5txiuzUW_PrKpL3RhZtI",
  authDomain: "anime-hub-ae9f6.firebaseapp.com",
  databaseURL: "https://anime-hub-ae9f6-default-rtdb.firebaseio.com",
  projectId: "anime-hub-ae9f6",
  storageBucket: "anime-hub-ae9f6.firebasestorage.app",
  messagingSenderId: "842177234766",
  appId: "1:842177234766:web:e21a75eaa1ee190b68401f",
  measurementId: "G-62KL87FC43"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);