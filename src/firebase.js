import { initializeApp } from "firebase/app"

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4JAtn-ezvQZ-vxlbQa67p9_cbA8DCdv8",
  authDomain: "neotrade-ai-26d0b.firebaseapp.com",
  projectId: "neotrade-ai-26d0b",
  storageBucket: "neotrade-ai-26d0b.firebasestorage.app",
  messagingSenderId: "1054300567120",
  appId: "1:1054300567120:web:3c7f877177f9c5a4c28355",
  measurementId: "G-3NGRSMYG3Q"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
