import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBi11RI0D7vpbJW4BCypNuzeTOEfdJLYsA",
  authDomain: "project-lecrut.firebaseapp.com",
  projectId: "project-lecrut",
  storageBucket: "project-lecrut.appspot.com",
  messagingSenderId: "300390925658",
  appId: "1:300390925658:web:575fb51aa097bc2cf8df63",
  measurementId: "G-GD2KV2SQEQ"
};
export const firebase = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebase);
export const auth = getAuth(firebase)
export const db = getFirestore(firebase)