// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-9052c.firebaseapp.com",
  projectId: "real-estate-9052c",
  storageBucket: "real-estate-9052c.appspot.com",
  messagingSenderId: "301342264952",
  appId: "1:301342264952:web:ec7cb1db1b2e2e14f7278d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);