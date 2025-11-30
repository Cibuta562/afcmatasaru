// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD4q-KmKWC-sG2OFScCM4lm6y1WtArN2qs",
    authDomain: "afcmatasaru.firebaseapp.com",
    projectId: "afcmatasaru",
    storageBucket: "afcmatasaru.firebasestorage.app",
    messagingSenderId: "932845065676",
    appId: "1:932845065676:web:63378f378d5318eaefb969",
    measurementId: "G-KQWRVS14V2"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
