//app/firebase-auth/getTokenFirebase.ts

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHGvnljXPxN_O6928GiY8S7qV9956MBLs",
  authDomain: "technical-test-dashboard.firebaseapp.com",
  projectId: "technical-test-dashboard",
  storageBucket: "technical-test-dashboard.firebasestorage.app",
  messagingSenderId: "1089452188029",
  appId: "1:1089452188029:web:e273a1a3e462ded07e6c14",
  measurementId: "G-CNN4F70JT1",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const loginAndGetToken = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const userSession = await signInWithEmailAndPassword(auth, email, password);
    const user = userSession.user;

    const idToken = await user.getIdToken();
    return idToken;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
