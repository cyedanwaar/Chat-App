import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reakt-chat.firebaseapp.com",
  projectId: "reakt-chat",
  storageBucket: "reakt-chat.appspot.com",
  messagingSenderId: "289104656824",
  appId: "1:289104656824:web:e1fcb114bcf9a763a2b74d",
  measurementId: "G-XWGN3NS685"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()