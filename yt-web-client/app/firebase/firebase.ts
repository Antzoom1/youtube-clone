// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged, 
    User
} from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVCBsU3hR8MBpLZ7dJG11vSEc-Beibqio",
  authDomain: "yt-clone-4d761.firebaseapp.com",
  projectId: "yt-clone-4d761",
  appId: "1:266966889137:web:c46b03e8b492d5aea9e890",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

import { getFunctions } from "firebase/functions";

export const functions = getFunctions(app);

/**
 * Signs the user in with a Google popup.
 * @returns A promise that resolves with the user's credentials.
 */
export function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider)
}

/**
 * Signs the user out.
 * @returns A promise that resolves when the user is signed out.
 */
export function signOut() {
    return auth.signOut()
}

/**
 * Trigger a callback when user auth state changes.
 * @returns A function to unsubscribe callback.
 */
export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback)
}