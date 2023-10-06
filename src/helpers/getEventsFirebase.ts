import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/firebaseConfig"
import { CalendarEventInterface } from "../interfaces/appInterfaces"


export const getEventsFirebase = async(uid:string) => {
    if(!uid) throw new Error ('El uid del usuario no existe')

    try{
        const collectionRef = collection(FirebaseDB, `${uid}/lionTamer/calendar`)
        const docs = await getDocs(collectionRef)

        const newEventList:CalendarEventInterface[]  = [];
        docs.forEach((doc) => newEventList.push({id: doc.id, ...doc.data()}))
        return newEventList;
        

    }catch(error){
        console.log(error)
    }
}




