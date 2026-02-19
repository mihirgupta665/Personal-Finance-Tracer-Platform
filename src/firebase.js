import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

function readEnv(key, fallback = "") {
  const value = import.meta.env[key];
  return typeof value === "string" && value.trim() ? value : fallback;
}

const firebaseConfig = {
  apiKey: readEnv("VITE_FIREBASE_API_KEY", "AIzaSyAtVRul8GDaDFoSDfWZezJ9GxA3a60A_W8"),
  authDomain: readEnv("VITE_FIREBASE_AUTH_DOMAIN", "finance-tracer-c51ad.firebaseapp.com"),
  projectId: readEnv("VITE_FIREBASE_PROJECT_ID", "finance-tracer-c51ad"),
  storageBucket: readEnv("VITE_FIREBASE_STORAGE_BUCKET", "finance-tracer-c51ad.firebasestorage.app"),
  messagingSenderId: readEnv("VITE_FIREBASE_MESSAGING_SENDER_ID", "234896263279"),
  appId: readEnv("VITE_FIREBASE_APP_ID", "1:234896263279:web:c2a5d22a583f5de38e259a")
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
