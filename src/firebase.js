import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// =========================
// 🔥 FIREBASE CONFIG
// =========================
const firebaseConfig = {
  apiKey: "AIzaSyCI4vLvI2b1SSpxQhY5DfkFCX1UISXgrgc",
  authDomain: "ecommerce-store-d24ba.firebaseapp.com",
  projectId: "ecommerce-store-d24ba",
  storageBucket: "ecommerce-store-d24ba.appspot.com",
  messagingSenderId: "1054923211322",
  appId: "1:1054923211322:web:7d4843664bddfcabe9ab03",
};

// =========================
// 🔥 INIT FIREBASE APP
// =========================
const app = initializeApp(firebaseConfig);

// =========================
// 🔥 AUTH SERVICE
// =========================
export const auth = getAuth(app);

// =========================
// 🔥 FIRESTORE DATABASE
// =========================
export const db = getFirestore(app);

// =========================
// 🔥 AUTH PROVIDERS
// =========================
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// =========================
// 🔥 OPTIONAL: SCOPES (GOOD PRACTICE)
// =========================
googleProvider.addScope("email");
googleProvider.addScope("profile");