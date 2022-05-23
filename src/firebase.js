import { firebase, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // put your credentials here
  apiKey: "AIzaSyCj411kLJG_pLIrXUDMYCrwQz01GgdK3oA",

  authDomain: "ingsoft-9d0f5.firebaseapp.com",

  projectId: "ingsoft-9d0f5",

  storageBucket: "ingsoft-9d0f5.appspot.com",

  messagingSenderId: "491889383585",

  appId: "1:491889383585:web:c24e89a6c9659310e5b8e0",

  databaseURL: "https://ingsoft-9d0f5.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const colRef = collection(db, "events");
export const auth = getAuth(app);
