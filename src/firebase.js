import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, browserLocalPersistence, setPersistence } from "firebase/auth";

// Replace with your app's Firebase project configuration from Vercel/env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app, auth, googleProvider;

// Prevent React from crashing entirely (white screen) if the `.env` vars are not set
if (firebaseConfig.apiKey) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();

  // Set persistence
  setPersistence(auth, browserLocalPersistence).catch(console.error);
} else {
  console.warn("Firebase is NOT initialized! Please set VITE_FIREBASE_* environment variables.");
  // Provide dummy mock objects so destructuring doesn't crash the AuthContext
  auth = { currentUser: null };
  googleProvider = {};
}

export { app, auth, googleProvider };
