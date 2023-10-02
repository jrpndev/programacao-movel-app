import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDOt_Q9AyE6ai5oxldt1JUwhYXJdhmwS0o",
  authDomain: "cinema-862fe.firebaseapp.com",
  projectId: "cinema-862fe",
  storageBucket: "cinema-862fe.appspot.com",
  messagingSenderId: "760322814645",
  appId: "1:760322814645:web:fee8ac3c327057bad684fc",
  measurementId: "G-EZKBTB0FGC"
};

// Initialize Firebase

if(!firebase.app.length){
  firebase.initializeApp(firebaseConfig);
}

const auth = getAuth(firebase.initializeApp(firebaseConfig));

export {firebase, auth};
