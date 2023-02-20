import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBHWoX-vXHdi1tX8tKdfP9kTPl9TSERkpg",
  authDomain: "opto-blossom-plus.firebaseapp.com",
  projectId: "opto-blossom-plus",
  storageBucket: "opto-blossom-plus.appspot.com",
  messagingSenderId: "80359570949",
  appId: "1:80359570949:web:c77e77a1fdbf86a897a66c",
  measurementId: "G-1B69GM0SB9",
});

//init firebase db
const db = getFirestore();

//init firebase auth
const auth = getAuth();
export { auth, db, firebaseApp };
