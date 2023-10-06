import { collection, getDocs} from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/firebaseConfig"
import { Pet } from "../interfaces/appInterfaces"


export const getPetList = async(uid:string, ownerID:string) => {
    if(!uid) throw new Error ('El uid del usuario no existe')
    

    try{
        const collectionRef = collection(FirebaseDB, `${uid}/lionTamer/owners/${ownerID}/pets`)
        const docs = await getDocs(collectionRef)
        

        const newPetList:Pet[]  = [];
        docs.forEach((doc) => newPetList.push({id: doc.id, ...doc.data()}))
        return newPetList;
        

    }catch(error){
        console.log(error)
    }
}