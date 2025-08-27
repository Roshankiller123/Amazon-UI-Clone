import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ not /lite

const firebaseConfig = {
  apiKey: "AIzaSyAoRHuy4mg3cViV2n46fxNlzZkX0AUu-Y4",
  authDomain: "ui-clone-c6fea.firebaseapp.com",
  projectId: "ui-clone-c6fea",
  storageBucket: "ui-clone-c6fea.firebasestorage.app",
  messagingSenderId: "229741878414",
  appId: "1:229741878414:web:f7b4e9d1f72cbc767d3ddf",
  measurementId: "G-NC1VHHKQN2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
