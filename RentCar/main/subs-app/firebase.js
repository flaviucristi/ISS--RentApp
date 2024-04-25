// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import firestore from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxXlPkTYJbrD9eKqyrV4K8UVB43NHffnY",
  authDomain: "cars-36f8e.firebaseapp.com",
  databaseURL: "https://cars-36f8e-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "cars-36f8e",
  storageBucket: "cars-36f8e.appspot.com",
  messagingSenderId: "448545758614",
  appId: "1:448545758614:web:6b700875891e096dee51b7",
  measurementId: "G-D3XHWPYVC3"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
// const app = initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = getDatabase(app);

export { auth, db };
