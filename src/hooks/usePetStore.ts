import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store";
import { Pet } from "../interfaces/appInterfaces";
import { PetsState, onAddNewPet, onSetActivePet, setSavingPet, onUpdatePet, setPetList } from "../store/pet/petSlice";
import { Action, Dispatch, ThunkAction } from "@reduxjs/toolkit";
import { collection, doc, setDoc } from "firebase/firestore/lite";
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
                    const docRef = doc(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}/${pet.id}`);
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
                 
                    const resp = await setDoc(newDoc, pet);
                    console.log('Documento guardado correctamente', resp);

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


  return {
    activePet, 
    isPetSaving, 
    petList,
    hasPetSelected: !!activePet,
    setActivePet,
    startSavingPet,
    startLoadingPetList,

  }
}


                    
    



    // //buscar usuario por nombre
    // const startSearchingOwner = ( inputValue: string ): ThunkAction<void, OwnersState, unknown, Action> =>{
    //     return async(dispatch: Dispatch, getState:()=> RootState)=>{
            
    //         const {uid} = getState().auth;
    //         if(!uid) return;

    //         try{
    //             const resp = await getSearchOwners(uid, inputValue)
    //             // if(resp) return [];
    //             dispatch(setOwnerSearchList(resp))
               
    //         } catch(error){
    //             console.log(error)
    //         }
    //     } 
    // }

    //     const startDeletingOwner = (): ThunkAction<void, OwnersState, unknown, Action<string>>  => {
    //      return async(dispatch, getState:()=> RootState )=>{
            
    //         try {
    //             const {uid} = getState().auth
    //             if(!uid) return;
                
    //             if(!activeOwner) return; 
    
    //             const docRef = doc(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}`) 
                
    //             const resp = await deleteDoc(docRef)
    //             console.log('Propietario borrado correctamente', resp);
                
    //             dispatch(onDeleteOwner(activeOwner))
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Propietario eliminado correctamente',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //               })

    //         } catch (error) {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: `Error al eliminar el propietario: ${error}`,
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             })
    //         }   
       
    //     }
    // }

 