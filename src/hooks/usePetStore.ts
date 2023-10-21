import { useDispatch, useSelector } from "react-redux"
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/firebaseConfig";
import { RootState } from "../store/store";
import Swal from "sweetalert2";
import { onAddNewPet, onSetActivePet, setSavingPet, onUpdatePet, setPetList, onDeletePet, setPetSearchList } from "../store/pet/petSlice";
import { getPetList, getSearchPet } from "../helpers";
import { Pet } from "../interfaces/appInterfaces";


export const usePetStore = () => {

  const dispatch = useDispatch();
  const { uid } = useSelector((state:RootState)=> state.auth)
  const { activeOwner } = useSelector((state:RootState)=> state.owner)
  const { activePet, isPetSaving, petList } = useSelector((state:RootState)=> state.pet)
  
  //mascota activa
  const setActivePet = (pet:Pet) =>{
      dispatch(onSetActivePet({...pet}))
  }
  

  //guardar- actualizar mascota
  const startSavingPet = async(pet: Pet)=> {
       
    dispatch(setSavingPet())
    
    //Actualización
    if( pet.id){
        const petToFirestore = {...pet};
        delete petToFirestore.id;
        try {
            if(!activeOwner) throw new Error("No hay usuario activo")
            const docRef = doc(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}/pets/${pet.id}`);
            const resp = await setDoc(docRef, petToFirestore, {merge:true});
            console.log('Documento actualizado correctamente', resp);
            
            petToFirestore.id = docRef.id
            
            dispatch(onUpdatePet({...petToFirestore}));
            dispatch(onSetActivePet({...pet}))
            Swal.fire({
              icon: 'success',
              title: 'Mascota actualizada correctamente',
              showConfirmButton: false,
              timer: 1500
            })
    } catch (error){ 
          Swal.fire({
              icon: 'error',
              title: `Error al actualizar la mascota: ${error}`,
          })
      }   
    } else {
        //*Nueva mascota
        try {
          if(activeOwner){
            const newDoc = doc(collection(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}/pets`));
         
            await setDoc(newDoc, pet);
            pet.id = newDoc.id
            
            dispatch(onAddNewPet({...pet}))
            dispatch(onSetActivePet({...pet}))
           
            Swal.fire({
              icon: 'success',
              title: 'Mascota guardada correctamente',
              showConfirmButton: false,
              timer: 1500
            })
          }
      } catch (error){ 
          Swal.fire({
              icon: 'error',
              title: `Error al guardar la mascota: ${error}`,
          })
      }  
    }       
  };

  //cargar lista mascotas
  const startLoadingPetList = async(ownerID: string) =>{
      
    if(!uid) return;
    try{
        const pets = await getPetList(uid, ownerID)
        
        if(!pets) return [];
        dispatch(setPetList(pets))
    } catch(error){
        console.log(error)
    }
  } 
  
  //buscar mascota por nombre //TODO: no sé si es necesario
  const startSearchingPet = async( ownerID: string, inputValue: string ) =>{
    
    if(!uid) return;
    try{
        const resp = await getSearchPet(uid, ownerID, inputValue)
        if(!resp) return;
        dispatch(setPetSearchList(resp))
        
       
    } catch(error){
        Swal.fire({
            icon: 'error',
            title: `Error al intentar acceder a la base de datos: ${error}`,
            showConfirmButton: false,
            timer: 1500
        })
    }
}

  //borrar mascota
  const startDeletingPet = async() => {
    if(!uid) return;
    if(!activeOwner) return;
    if(!activePet) return; 
    try {
       
        const docRef = doc(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}/pets/${activePet.id}`) 
        
        const resp = await deleteDoc(docRef)
        console.log('Mascota borrado correctamente', resp);
        
        dispatch(onDeletePet(activePet))
        Swal.fire({
            icon: 'success',
            title: 'Mascota eliminada correctamente',
            showConfirmButton: false,
            timer: 1500
        })
          
    }catch (error) {
        Swal.fire({
            icon: 'error',
            title: `Error al eliminar la mascota: ${error}`,
        })
    }   
  }
  
  return {
    activePet, 
    isPetSaving, 
    petList,
    hasPetSelected: !!activePet,
    setActivePet,
    startSavingPet,
    startLoadingPetList,
    startDeletingPet,
    startSearchingPet
  }
}


                    
    


