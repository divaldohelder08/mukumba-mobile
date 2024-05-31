// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from  "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCmGFzaOsAqhy6mlLE2lDJuXGU9PmXY0WU",
  authDomain: "my-app-e14ab.firebaseapp.com",
  projectId: "my-app-e14ab",
  storageBucket: "my-app-e14ab.appspot.com",
  messagingSenderId: "515893778761",
  appId: "1:515893778761:web:6c70eff7f12ee672956298",
  measurementId: "G-CCH23F9LZ2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)