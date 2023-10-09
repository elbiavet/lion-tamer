import { DocumentSnapshot, collection, getDocs, query, where } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/firebaseConfig"
import { Owner } from "../interfaces/appInterfaces"


export const getSearchOwners = async(uid:string, searchValue:string) => {
    if(!uid) throw new Error ('El uid del usuario no existe')

    try{
        //! OJO, son busquedas exactas

        const collectionRef = collection(FirebaseDB, `${uid}/lionTamer/owners`)
        const queryOwner = query(collectionRef, where("ownerFirstName", "==", `${searchValue}`));

        const resp = await getDocs(queryOwner);
        const newSearchOwnerList: Owner[] = [];
        resp.forEach((doc: DocumentSnapshot) => newSearchOwnerList.push({id: doc.id, ...doc.data()} as Owner))
        console.log(newSearchOwnerList)
        return newSearchOwnerList;
     
    }catch(error){
        console.log(error)
    }
}




        

