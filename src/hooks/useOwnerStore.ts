import { useDispatch, useSelector } from "react-redux"
import { Action, Dispatch, ThunkAction } from "@reduxjs/toolkit";
import { FirebaseDB } from "../firebase/firebaseConfig";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { RootState } from "../store/store"
import { Owner } from "../interfaces/appInterfaces";
import { OwnersState, onAddNewOwner, onDeleteOwner, onSetActiveOwner, onUpdateOwner, setOwnerList, setOwnerSearchList, setSavingOwner } from "../store/owners/ownerSlice";
import { getOwnersList } from "../helpers/getOwnersList";
import { getSearchOwners } from "../helpers/getSearchOwners";
import Swal from "sweetalert2";


export const useOwnerStore = () => {

    const { activeOwner, isOwnerSaving, ownerList, ownerSearchList } = useSelector((state:RootState) => state.owner)
    const dispatch = useDispatch();

    //usuario activo
    const setActiveOwner = (owner:Owner) =>{
        dispatch(onSetActiveOwner(owner))
    }

    //guardar- actualizar usuario
    const startSavingOwner = (owner:Owner): ThunkAction<void, OwnersState, unknown, Action>=> {
        return async (dispatch: Dispatch, getState:()=> RootState) => {

            dispatch(setSavingOwner())
            const {uid} = getState().auth;
            
           //* Actualización
            if( owner.id){

                const ownerToFirestore = {...owner};
                delete ownerToFirestore.id;

                try {
 
                    const docRef = doc(FirebaseDB, `${uid}/lionTamer/owners/${owner.id}`);
                    const resp = await setDoc(docRef, ownerToFirestore, {merge:true});
                    // console.log('Propietario actualizado correctamente', resp);
                    
                    ownerToFirestore.id = docRef.id
                    console.log(ownerToFirestore)
                    dispatch(onUpdateOwner({...ownerToFirestore}));
                    Swal.fire({
                        icon: 'success',
                        title: 'Propietario actualizado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                      })

              } catch (error){ 
                    Swal.fire({
                        icon: 'error',
                        title: `Error al actualizar el propietario: ${error}`,
                    })
                }   

            } else {
             
                //*Nuevo propietario
                try {

                    const newDoc = doc(collection(FirebaseDB, `${uid}/lionTamer/owners`));
                    const resp = await setDoc(newDoc, owner);
                    //console.log('Propietario guardado correctamente', resp);
                    
                    owner.id = newDoc.id
                    dispatch(onAddNewOwner({...owner}))
                    dispatch(onSetActiveOwner({...owner}))
                    Swal.fire({
                        icon: 'success',
                        title: 'Propietario guardado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                      })

                } catch (error){ 
                    Swal.fire({
                        icon: 'error',
                        title: `Error al guardar el propietario: ${error}`,
                    })
                }   
            }   
        };
      };

 
      //cargar lista usuarios
      const startLoadingOwnerList = (): ThunkAction<void, OwnersState, unknown, Action> =>{
        return async(dispatch: Dispatch, getState:()=> RootState)=>{
            
            const {uid} = getState().auth;
            if(!uid) return;

            try{
                const owners = await getOwnersList(uid)
            
                if(!owners) return [];
                dispatch(setOwnerList(owners))

            } catch(error){
                console.log(error)
            }
        } 
    }

    //buscar usuario por nombre
    const startSearchingOwner = ( inputValue: string ): ThunkAction<void, OwnersState, unknown, Action> =>{
        return async(dispatch: Dispatch, getState:()=> RootState)=>{
            
            const {uid} = getState().auth;
            if(!uid) return;

            try{
                const resp = await getSearchOwners(uid, inputValue)
                dispatch(setOwnerSearchList(resp))
                
               
            } catch(error){
                Swal.fire({
                    icon: 'error',
                    title: `Error al intentar acceder a la base de datos: ${error}`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } 
    }

        const startDeletingOwner = (): ThunkAction<void, OwnersState, unknown, Action<string>>  => {
         return async(dispatch, getState:()=> RootState )=>{
            
            try {
                const {uid} = getState().auth
                if(!uid) return;
                
                if(!activeOwner) return; 
    
                const docRef = doc(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}`) 
                
                const resp = await deleteDoc(docRef)
                console.log('Propietario borrado correctamente', resp);
                
                dispatch(onDeleteOwner(activeOwner))
                Swal.fire({
                    icon: 'success',
                    title: 'Propietario eliminado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                  })

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: `Error al eliminar el propietario: ${error}`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }   
       
        }
    }

    return {
        activeOwner, 
        isOwnerSaving, 
        ownerList,
        ownerSearchList,
        setActiveOwner,
        startSavingOwner,
        startLoadingOwnerList,
        startSearchingOwner,
        startDeletingOwner,
  }
}

