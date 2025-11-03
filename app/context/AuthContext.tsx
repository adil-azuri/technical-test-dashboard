// src/context/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, onAuthStateChanged, signOut, getIdToken } from "firebase/auth";

import { auth } from "@/app/firebase-auth/Firebase-auth";

interface Auth_Context_type {
  user: User | null;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
  loading: boolean;
}

const AuthContext = createContext<Auth_Context_type | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //check status auth user
    const authListener = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => authListener();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const getToken = async () => {
    if (!user) return null;
    return await getIdToken(user);
  };

  const value = { user, logout, getToken, loading };

  return (
    <AuthContext.Provider value={value}>
      {/* Hanya render children setelah state otentikasi awal dimuat */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
