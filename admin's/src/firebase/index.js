// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6_jNJTOc5uYx4En_nRgOqf4EyOGFsy00",
  authDomain: "tumsa-f.firebaseapp.com",
  projectId: "tumsa-f",
  storageBucket: "tumsa-f.appspot.com",
  messagingSenderId: "665341976469",
  appId: "1:665341976469:web:fad183c75f647a48c9209c",
  measurementId: "G-9098KGQ8QG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const analytics = getAnalytics(app);
const db = getFirestore(app);

export {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  auth,
  db,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc
};
