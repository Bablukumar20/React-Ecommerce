import React, { createContext, useContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

import { auth, googleProvider, githubProvider, db } from "../firebase";

import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // 🔥 SAVE USER TO FIRESTORE
  // =========================
  const saveUserToFirestore = async (userData) => {
    if (!userData?.uid) return;

    try {
      const userRef = doc(db, "users", userData.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: userData.uid,
          email: userData.email || "",
          name: userData.displayName || "",
          photoURL: userData.photoURL || "",
          cart: [],
          createdAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.log("Firestore user save error:", error);
    }
  };

  // =========================
  // EMAIL SIGNUP
  // =========================
  const signup = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await saveUserToFirestore(res.user);
    return res;
  };

  // =========================
  // EMAIL LOGIN
  // =========================
  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    await saveUserToFirestore(res.user);
    return res;
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => signOut(auth);

  // =========================
  // GOOGLE LOGIN
  // =========================
  const loginWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    await saveUserToFirestore(res.user);
    return res;
  };

  // =========================
  // GITHUB LOGIN
  // =========================
  const loginWithGithub = async () => {
    const res = await signInWithPopup(auth, githubProvider);
    await saveUserToFirestore(res.user);
    return res;
  };

  // =========================
  // AUTH STATE LISTENER
  // =========================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await saveUserToFirestore(currentUser);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        loginWithGoogle,
        loginWithGithub,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;