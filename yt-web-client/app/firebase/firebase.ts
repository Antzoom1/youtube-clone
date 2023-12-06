// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { getFunctions } from "firebase/functions";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3ENpe5WuPz11xbv4f-jZ-JEPuyKD2taQ",
  authDomain: "fir-1a5e1.firebaseapp.com",
  projectId: "fir-1a5e1",
  storageBucket: "fir-1a5e1.appspot.com",
  messagingSenderId: "509382331066",
  appId: "1:509382331066:web:e022831c915a1d56685083",
  measurementId: "G-YJB3TYSKQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export const functions = getFunctions(app);


/**
 * Signs the user in with a Google popup.
 * @returns A promise that resolves with the user's credentials.
 */
export function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider());
  }
  
  /**
   * Signs the user out.
   * @returns A promise that resolves when the user is signed out.
   */
  export function signOut() {
    return auth.signOut();
  }
  
  /**
   * Trigger a callback when user auth state changes.
   * @returns A function to unsubscribe callback.
   */
  export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }