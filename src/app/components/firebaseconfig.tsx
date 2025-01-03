"use client"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyARD0RXkzE8UvLx_q3RYcYK-FpBEFxT1kI",
  authDomain: "tablebooking-665f2.firebaseapp.com",
  projectId: "tablebooking-665f2",
  storageBucket: "tablebooking-665f2.firebasestorage.app",
  messagingSenderId: "436961447961",
  appId: "1:436961447961:web:31a8066476cd1f0648da88",
  measurementId: "G-KC924JRNL5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);