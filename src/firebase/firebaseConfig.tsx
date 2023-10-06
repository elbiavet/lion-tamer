
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite"

/* import { getEnvironments } from "../helpers/getEnvironments";

const {
    VITE_APIKEY,
    VITE_AUTHDOMAIN,
    VITE_PROJECTID,
    VITE_STORAGEBUCKET,
    VITE_MESSAGINGSENDERID,
    VITE_APPID,
  } = getEnvironments(); */

  // dev/prod
/* const firebaseConfig = {
    apiKey: VITE_APIKEY,
    authDomain: VITE_AUTHDOMAIN,
    projectId: VITE_PROJECTID,
    storageBucket: VITE_STORAGEBUCKET,
    messagingSenderId: VITE_MESSAGINGSENDERID,
    appId: VITE_APPID 
  }; */

const firebaseConfig = {
  apiKey: "AIzaSyCTg0mVaVPdYjefRxd2hGrt7uM4ocJqam0",
  authDomain: "react-cursos-576e8.firebaseapp.com",
  projectId: "react-cursos-576e8",
  storageBucket: "react-cursos-576e8.appspot.com",
  messagingSenderId: "240371612883",
  appId: "1:240371612883:web:d374e2f6314523afc9e826"
};


export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp )


