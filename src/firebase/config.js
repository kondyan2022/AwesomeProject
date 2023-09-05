// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcIsi5P6oUaaebaWEXglqDjWPgYAvyb38",
  authDomain: "awersomeproject-6ebca.firebaseapp.com",
  projectId: "awersomeproject-6ebca",
  storageBucket: "awersomeproject-6ebca.appspot.com",
  messagingSenderId: "167334574179",
  appId: "1:167334574179:web:229a3b8a4485c7b5882056",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
