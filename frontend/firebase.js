// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDV_StjuRZPeNw4DDBTsABFcgweqmfxC4",
  authDomain: "compliance-d7b1f.firebaseapp.com",
  projectId: "compliance-d7b1f",
  storageBucket: "compliance-d7b1f.firebasestorage.app",
  messagingSenderId: "673618731678",
  appId: "1:673618731678:web:fd0eb0b5e2b897fa3e118f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db}