import axios from "axios";
// Import auth dan signOut dari Firebase
import { auth } from "@/app/firebase-auth/Firebase-auth";
import { getIdToken, signOut } from "firebase/auth";

const baseURL = "";

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const user = auth.currentUser;

      if (user) {
        try {
          // Mendapatkan token terbaru
          const token = await getIdToken(user);

          if (token) {
            if (!config.headers) {
              (config as any).headers = {};
            }
            localStorage.setItem("firebase_id_token", token);

            // Menggunakan format token langsung
            (config.headers as any).Authorization = token;
          }
        } catch (error) {
          console.error("Error getting ID token in interceptor:", error);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const status = error.response?.status; // Deteksi jika server mengembalikan 401 (Unauthorized)

    if (status === 401) {
      console.warn(
        "API returned 401 Unauthorized. Forcing client-side logout to clear session."
      );

      try {
        // Hapus token dari LocalStorage sebelum logout
        localStorage.removeItem("firebase_id_token"); // Memaksa sesi Firebase di klien berakhir

        await signOut(auth);
        window.location.href = "/login";
      } catch (logoutError) {
        console.error("Error during forced logout:", logoutError);
      }
    }

    return Promise.reject(error);
  }
);
