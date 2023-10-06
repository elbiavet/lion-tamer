
import { signInWithEmailAndPassword } from "firebase/auth"
import { FirebaseAuth } from "./firebaseConfig"


export const signInWithEmail = async(email:string, password:string) =>{
    try{
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const {displayName, uid } = resp.user
        return {displayName, uid, email}

    } catch (error){
        return {errorMessage: error.message}
    }
}


export const logoutFirebase = async() => {
    await FirebaseAuth.signOut()
}