// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpOcRfRThrmZuWk2DGsDDLrKnXn_scSnE",
  authDomain: "camotocode-42585.firebaseapp.com",
  databaseURL: "https://camotocode-42585-default-rtdb.firebaseio.com",
  projectId: "camotocode-42585",
  storageBucket: "camotocode-42585.appspot.com",
  messagingSenderId: "1050151223764",
  appId: "1:1050151223764:web:103849a93de42c5590d641",
  measurementId: "G-H31KDL5T55",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
