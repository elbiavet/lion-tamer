import { DocumentSnapshot, collection, getDocs} from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/firebaseConfig"
import { Invoice } from "../interfaces/appInterfaces"


export const getInvoices = async(uid:string, ownerID:string, petID: string) => {
    if(!uid) throw new Error ('El uid del usuario no existe')

    try{
      

        const collectionRef = collection(FirebaseDB, `${uid}/lionTamer/owners/${ownerID}/pets/${petID}/invoices`)
        const docs = await getDocs(collectionRef)
        

        const newInvoiceList:Invoice[]  = [];
        docs.forEach((doc: DocumentSnapshot) => newInvoiceList.push({id: doc.id, ...doc.data()} as Invoice))
      
        return newInvoiceList;
        

    }catch(error){
        console.log(error)
    }
}