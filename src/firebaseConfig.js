// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, push, onValue, remove, child, get } from 'firebase/database'



const firebaseConfig = {
    apiKey: "AIzaSyDYywuCpaspkz1cBi6YdAmYHB_mLll4bo4",
    authDomain: "chat-f4332.firebaseapp.com",
    databaseURL: "https://chat-f4332-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-f4332",
    storageBucket: "chat-f4332.appspot.com",
    messagingSenderId: "213835022066",
    appId: "1:213835022066:web:eb01a135abd04d490d9a6b",
    measurementId: "G-0DGXJPSH2V",
    databaseURL: "https://chat-f4332-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize Firebase Auth
const auth = getAuth()


//initialize Firebase Realtime Database
const database = getDatabase(app)


export { app, auth, database, ref, set, push, onValue, remove, child, get }