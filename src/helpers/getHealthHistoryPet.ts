import { DocumentSnapshot, collection, getDocs} from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/firebaseConfig"
import { HealthHistory } from "../interfaces/appInterfaces"


export const getHealthHistoryPet = async(uid:string, ownerID:string, petID: string) => {

    if(!uid) throw new Error ('El uid del usuario no existe')

    try{
      
        const collectionRef = collection(FirebaseDB, `${uid}/lionTamer/owners/${ownerID}/pets/${petID}/healthHistory`)
        const docs = await getDocs(collectionRef)
        

        const newHealthHistoryList:HealthHistory[]  = [];
        docs.forEach((doc: DocumentSnapshot) => newHealthHistoryList.push({id: doc.id, ...doc.data()} as HealthHistory))
      
        return newHealthHistoryList;
        

    }catch(error){
        console.log(error)
    }
}