// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbjphIQN9Q2u7nUGlEI4YKD9QJZkEICHM",
  authDomain: "pruebagse-ff072.firebaseapp.com",
  projectId: "pruebagse-ff072",
  storageBucket: "pruebagse-ff072.appspot.com",
  messagingSenderId: "898015901693",
  appId: "1:898015901693:web:b47685e3f64c6555644b94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()

export {
    app,
    db
}