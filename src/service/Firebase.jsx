// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBe0CyEm5gvwCRcxrrjkSctoBR43D91Ixc",
  authDomain: "assignment-51e14.firebaseapp.com",
  databaseURL:
    "https://assignment-51e14-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "assignment-51e14",
  storageBucket: "assignment-51e14.firebasestorage.app",
  messagingSenderId: "78152018586",
  appId: "1:78152018586:web:8cb5bc7fd4ed08dacd4d23",
  measurementId: "G-CSH9YJH16H",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
