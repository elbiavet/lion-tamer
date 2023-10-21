import { DocumentSnapshot, collection, getDocs, query, where } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/firebaseConfig"
import { Pet } from "../interfaces/appInterfaces"


export const getSearchPet = async(uid:string, ownerID: string, searchValue:string) => {
    if(!uid) throw new Error ('El uid del usuario no existe')

    try{
        //! OJO, son busquedas exactas

        const collectionRef = collection(FirebaseDB, `${uid}/lionTamer/owners/${ownerID}/pets`)
        const queryPet = query(collectionRef, where("petName", "==", `${searchValue}`));

        const resp = await getDocs(queryPet);
        const newSearchPetList: Pet[] = [];
        resp.forEach((doc: DocumentSnapshot) => newSearchPetList.push({id: doc.id, ...doc.data()} as Pet))
        console.log(newSearchPetList)
        return newSearchPetList;
     
    }catch(error){
        console.log(error)
    }
}




        

