import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDGMU1ho8MSAaBKre77gMRXiCrtvNpw5pA",
  authDomain: "opto-collectit.firebaseapp.com",
  projectId: "opto-collectit",
  storageBucket: "opto-collectit.appspot.com",
  messagingSenderId: "615984283004",
  appId: "1:615984283004:web:5fe41c6ca9f6c319f7b8f9",
  measurementId: "G-59N36053YD",
});

//init firebase db
const db = getFirestore();

//init firebase auth
const auth = getAuth();
export { auth, db, firebaseApp };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
