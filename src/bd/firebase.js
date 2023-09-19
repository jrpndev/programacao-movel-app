import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

auth

export { auth };
