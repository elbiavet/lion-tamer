import { DocumentSnapshot, collection, getDocs} from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/firebaseConfig"
import { Owner } from "../interfaces/appInterfaces"


export const getOwnersList = async(uid:string) => {
    if(!uid) throw new Error ('El uid del usuario no existe')

    try{
        const collectionRef = collection(FirebaseDB, `${uid}/lionTamer/owners`)
        const docs = await getDocs(collectionRef)

        const newOwnerList:Owner[]  = [];
        docs.forEach((doc: DocumentSnapshot) => newOwnerList.push({ id: doc.id, ...doc.data() } as Owner));
        
        return newOwnerList;

    }catch(error){
        console.log(error)
    }
}



