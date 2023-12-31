
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite"
// import { getEnvironments } from "../helpers/getEnvironments";

// const {
//     VITE_APIKEY,
//     VITE_AUTHDOMAIN,
//     VITE_PROJECTID,
//     VITE_STORAGEBUCKET,
//     VITE_MESSAGINGSENDERID,
//     VITE_APPID,
//   } = getEnvironments();



// dev/prod
const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID 
  }; 

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp )


