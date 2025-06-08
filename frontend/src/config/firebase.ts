// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo02NjRktWs-JsV0C-HlevkSJlyPDSkF8",
  authDomain: "web-photobooth-526fc.firebaseapp.com",
  projectId: "web-photobooth-526fc",
  storageBucket: "web-photobooth-526fc.firebasestorage.app",
  messagingSenderId: "1018295171831",
  appId: "1:1018295171831:web:72e41114562d7b3629b1f2",
  measurementId: "G-8X5GM5QFYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { auth, googleProvider, signInWithPopup };