import { DocumentSnapshot, collection, getDocs, or, query, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/firebaseConfig";
import { Owner } from "../interfaces/appInterfaces";

export const getSearchOwners = async (uid: string, searchValue: string) => {
  if (!uid) throw new Error('El uid del usuario no existe');

  //! OJO, firestore solo deja busquedas exactas

  try {
    const collectionRef = collection(FirebaseDB, `${uid}/lionTamer/owners`);
    const queryOwner = query(collectionRef,  
        or(where("ownerFirstName", "==", searchValue),
           where("ownerLastName", "==", searchValue)
        )
    );

    const resp = await getDocs(queryOwner);
    const newSearchOwnerList: Owner[] = [];
    resp.forEach((doc: DocumentSnapshot) => {
      newSearchOwnerList.push({ id: doc.id, ...doc.data() } as Owner);
    });

    return newSearchOwnerList;

  } catch (error) {
    console.log(error);
  }
};

  
        

