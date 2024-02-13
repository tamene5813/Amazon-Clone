import firebase from "firebase/compat/app";
//auth
import { getAuth } from "firebase/compat/auth";

import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQqFh9ZoFa7kuf4HmR3ny35-WB_QwiySw",
  authDomain: "clone-5a2ec.firebaseapp.com",
  projectId: "clone-5a2ec",
  storageBucket: "clone-5a2ec.appspot.com",
  messagingSenderId: "884313512224",
  appId: "1:884313512224:web:5cd5d20d262eb9d17b9f45",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = app.firestore();
