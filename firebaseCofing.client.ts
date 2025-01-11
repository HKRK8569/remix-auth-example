import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCo-vjbKcp--d6jrHWcJ4gIMAK49OfLPrE",
  authDomain: "test-auth-a85c2.firebaseapp.com",
  projectId: "test-auth-a85c2",
  storageBucket: "test-auth-a85c2.firebasestorage.app",
  messagingSenderId: "81919094790",
  appId: "1:81919094790:web:6177471f5d73d1f41a5387",
  measurementId: "G-SZHNTS5WN9",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
