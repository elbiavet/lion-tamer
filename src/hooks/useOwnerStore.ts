import { useDispatch, useSelector } from "react-redux"
import { FirebaseDB } from "../firebase/firebaseConfig";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { RootState } from "../store/store"
import { onAddNewOwner, onDeleteOwner, onSetActiveOwner, onUpdateOwner, setOwnerList, setOwnerSearchList, setSavingOwner } from "../store/owners/ownerSlice";
import { onSetActivePet } from "../store/pet/petSlice";
import { getOwnersList, getSearchOwners } from "../helpers";
import Swal from "sweetalert2";
import { Owner } from "../interfaces/appInterfaces";


export const useOwnerStore = () => {

    const { uid } = useSelector((state:RootState) => state.auth)
    const { activeOwner, isOwnerSaving, ownerList, ownerSearchList } = useSelector((state:RootState) => state.owner)
    // const {  } = useSelector((state:RootState) => state.cash)
    const dispatch = useDispatch();

    //usuario activo
    const setActiveOwner = (owner:Owner) =>{
        dispatch(onSetActiveOwner(owner))
    }

    //guardar- actualizar usuario
    const startSavingOwner = async(owner:Owner)=> {

        dispatch(setSavingOwner())
        
       //* Actualización
        if( owner.id){
            const ownerToFirestore = {...owner};
            delete ownerToFirestore.id;
            try {

                const docRef = doc(FirebaseDB, `${uid}/lionTamer/owners/${owner.id}`);
                await setDoc(docRef, ownerToFirestore, {merge:true});
                
                
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
                await setDoc(newDoc, owner);
                
                owner.id = newDoc.id
                dispatch(onAddNewOwner({...owner}))
                dispatch(onSetActiveOwner({...owner}))
                dispatch(onSetActivePet(null))
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

 
    //cargar lista usuarios
    const startLoadingOwnerList = async()=>{
        
        if(!uid) return;
        try{
            const owners = await getOwnersList(uid)
            if(!owners) return [];
            dispatch(setOwnerList(owners))

        } catch(error){
            console.log(error)
        }
    }

    //buscar usuario por nombre
    const startSearchingOwner = async( inputValue: string ) =>{
        
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

    //borrar propietario
    const startDeletingOwner = async() => {
            
        try {
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
            })
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

