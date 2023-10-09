import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store";
import { Pet } from "../interfaces/appInterfaces";
import { PetsState, onAddNewPet, onSetActivePet, setSavingPet, onUpdatePet, setPetList, onDeletePet } from "../store/pet/petSlice";
import { Action, Dispatch, ThunkAction } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";
import { getPetList } from "../helpers/getPetList";


export const usePetStore = () => {

    const {activePet, isPetSaving, petList } = useSelector((state:RootState)=> state.pet)
    const dispatch = useDispatch();
  
    //mascota activa
    const setActivePet = (pet:Pet) =>{
        dispatch(onSetActivePet(pet))
    }
  

    //guardar- actualizar mascota
    const startSavingPet = (pet: Pet): ThunkAction<void, PetsState, unknown, Action>=> {
        return async (dispatch: Dispatch, getState:()=> RootState) => {

            dispatch(setSavingPet())
            const {uid} = getState().auth;
            const {activeOwner} = getState().owner;
            
           //* Actualización
            if( pet.id){

                const petToFirestore = {...pet};
                delete petToFirestore.id;

                try {
                    if(!activeOwner) throw new Error("No hay usuario activo")
                    const docRef = doc(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}/pets/${pet.id}`);
                    const resp = await setDoc(docRef, petToFirestore, {merge:true});
                    console.log('Documento actualizado correctamente', resp);
                    
                    petToFirestore.id = docRef.id
                    console.log(petToFirestore)
                    dispatch(onUpdatePet({...petToFirestore}));
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
        };

         //cargar lista mascotas
      const startLoadingPetList = (ownerID: string): ThunkAction<void, PetsState, unknown, Action> =>{
        return async(dispatch: Dispatch, getState:()=> RootState)=>{
            
          const { uid } = getState().auth;
          if(!uid) return;

            try{
                const pets = await getPetList(uid, ownerID)
                
                if(!pets) return [];
                dispatch(setPetList(pets))

            } catch(error){
                console.log(error)
            }
        
        } 
      }


      
        const startDeletingPet = (): ThunkAction<void, PetsState, unknown, Action<string>>  => {
         return async(dispatch, getState:()=> RootState )=>{
            
            try {
                const {uid} = getState().auth
                if(!uid) return;
                
                const { activeOwner } = getState().owner
                if(!activeOwner) return;
              
                if(!activePet) return; 
    
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

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `Error al eliminar la mascota: ${error}`,
                })
            }   
       
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
    startDeletingPet
  }
}


                    
    


