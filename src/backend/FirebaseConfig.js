// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJGZUwpHEmIQPwbqOSJKq6oPvu1Z8Fl4U",
  authDomain: "innovators-hub-music-8b2e3.firebaseapp.com",
  projectId: "innovators-hub-music-8b2e3",
  storageBucket: "innovators-hub-music-8b2e3.firebasestorage.app",
  messagingSenderId: "757359115938",
  appId: "1:757359115938:web:099f45c52bdf42423be1fb"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const __AUTH=getAuth(firebaseApp)
export const __DB=getFirestore(firebaseApp)