import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQ1Dfo6uqqTI9c4LHzKlid1obPX0gDrfM",
  authDomain: "crhis-app.firebaseapp.com",
  projectId: "crhis-app",
  storageBucket: "crhis-app.appspot.com",
  messagingSenderId: "306024677799",
  appId: "1:306024677799:web:504c1970d8ff6dcc057682",
  measurementId: "G-59MP49YH7Y",
};

// Initialize Firebase

if(!firebase.app.length){
  firebase.initializeApp(firebaseConfig);
}

const auth = getAuth(firebase.initializeApp(firebaseConfig));

export {firebase, auth};
