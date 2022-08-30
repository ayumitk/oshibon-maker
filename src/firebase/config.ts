import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3kiaQKEf-mT2_EI_ZG_nW_MGjfcnSRRw",
  authDomain: "oshibon-maker-45160.firebaseapp.com",
  projectId: "oshibon-maker-45160",
  storageBucket: "oshibon-maker-45160.appspot.com",
  messagingSenderId: "1069768229979",
  appId: "1:1069768229979:web:640623785a763931a06b7e",
  measurementId: "G-F3JNNYCW0T"
};

// init firebase
initializeApp(firebaseConfig);

// init firebase auth
const db = getFirestore();
const auth = getAuth();

export { db, auth };
