
import { signInWithEmailAndPassword } from "firebase/auth"
import { FirebaseAuth } from "./firebaseConfig"

interface MyError {
    message: string;
    code?: string;
    // Otras propiedades específicas del error si las hay
  }

export const signInWithEmail = async(email:string, password:string) =>{
    try{
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const {displayName, uid } = resp.user
        return {displayName, uid, email}

    } catch (error) {
        const typedError = error as MyError; // Hacer una conversión de tipo
        return { errorMessage: typedError.message};
    }}


export const logoutFirebase = async() => {
    await FirebaseAuth.signOut()
}