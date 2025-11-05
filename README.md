# MARKHUB

### Persyaratan Sistem

- Node.js (versi 18 atau lebih tinggi)
- NPM atau Yarn

### Instalasi

1. Kloning repositori:

   ```bash
   git clone <repository-url>
   cd markhub
   ```

2. Instal dependensi:

   ```bash
   npm install
   ```

3. Buat file `.env.local` di direktori root dengan variabel lingkungan berikut:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=""
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
   NEXT_PUBLIC_FIREBASE_APP_ID=""
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=""

   EXTERNAL_API_BASE_URL=""
   ```

   **Cara mendapatkan kredensial Firebase:**

   1. Kunjungi [Firebase Console](https://console.firebase.google.com/).
   2. Buat proyek baru atau pilih proyek yang ada.
   3. Di bagian "Project settings" (ikon roda gigi), pilih tab "General".
   4. Gulir ke bawah ke bagian "Your apps" dan klik ikon web (</>) untuk menambahkan aplikasi web.
   5. Daftarkan aplikasi Anda dengan nama (misalnya, "MARKHUB").
   6. Salin kredensial yang diberikan:
      - `apiKey` → `NEXT_PUBLIC_FIREBASE_API_KEY`
      - `authDomain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
      - `projectId` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
      - `storageBucket` → `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
      - `messagingSenderId` → `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
      - `appId` → `NEXT_PUBLIC_FIREBASE_APP_ID`
      - `measurementId` → `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (opsional, jika menggunakan Analytics)
   7. Aktifkan Authentication di Firebase Console dengan mengklik "Authentication" di sidebar kiri, lalu "Get started", dan aktifkan "Email/Password" sebagai penyedia login.
   8. Untuk `EXTERNAL_API_BASE_URL`, gunakan URL dasar API eksternal yang menyediakan data produk (misalnya, `https://api.example.com`).

4. Jalankan server pengembangan:

   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

6. Navigasi ke halaman login dan masuk dengan kredensial Firebase Anda.

## Variabel Lingkungan

- `NEXT_PUBLIC_FIREBASE_API_KEY` - Kunci API Firebase.
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Domain Auth Firebase.
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - ID proyek Firebase.
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Bucket penyimpanan Firebase.
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - ID pengirim pesan Firebase.
- `NEXT_PUBLIC_FIREBASE_APP_ID` - ID aplikasi Firebase.
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` - ID pengukuran Firebase.
- `EXTERNAL_API_BASE_URL` - URL dasar API eksternal untuk data produk.
