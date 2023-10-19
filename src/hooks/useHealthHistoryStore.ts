import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";

import { onAddNewHealthHistory, onDeleteHealthHistory, onSetActiveHealthHistory, onUpdateHealthHistory, setHealthHistoryList, setSavingHealthHistory } from "../store/healthHistory/healthHistorySlice";
import { HealthHistory } from "../interfaces/appInterfaces";
import { getHealthHistoryPet } from "../helpers/getHealthHistoryPet";


export const useHealthHistoryStore = () => {

  const dispatch = useDispatch();
  const { uid } = useSelector((state:RootState)=> state.auth)
  const { activeOwner } = useSelector((state:RootState)=> state.owner)
  const { activePet } = useSelector((state:RootState)=> state.pet)
  const { historyList, activeHealthHistory, isHealthHistorySaving } = useSelector((state:RootState)=> state.history)
  
  
  //historia activa
  const setActiveHealthHistory = (history:HealthHistory) =>{
      dispatch(onSetActiveHealthHistory({...history}))
  }

  //guardar- actualizar historia
  const startSavingHealthHistory = async(history: HealthHistory)=> {
       
    dispatch(setSavingHealthHistory())
    
    //Actualización
    if( history.id){

        const historyToFirestore = {...history};
        delete historyToFirestore.id;

        try {
            if(!activeOwner || !activePet) throw new Error("No hay usuario o mascota activos")
            
            
            const docRef = doc(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}/pets/${activePet.id}/healthHistory/${history.id}`);

            await setDoc(docRef, historyToFirestore, {merge:true});
            // console.log('Historial de salud actualizado correctamente', resp);
            
            historyToFirestore.id = docRef.id
            //console.log(historyToFirestore)
            dispatch(onUpdateHealthHistory({...historyToFirestore}));
            Swal.fire({
            icon: 'success',
            title: 'Historial de salud actualizado correctamente',
            showConfirmButton: false,
            timer: 1500
            })
        } catch (error){ 
            Swal.fire({
                icon: 'error',
                title: `Error al actualizar el historial de salud: ${error}`,
            })
        }   
    } else {
        //*Nueva 
        try {
            if(activeOwner && activePet){
            
                const newDoc = doc(collection(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}/pets/${activePet.id}/healthHistory/`));
            
            
                await setDoc(newDoc, history);
                history.id = newDoc.id

                dispatch(onAddNewHealthHistory({...history}))
                dispatch(onSetActiveHealthHistory({...history}))
            
                Swal.fire({
                icon: 'success',
                title: 'Historial de salud guardado correctamente',
                showConfirmButton: false,
                timer: 1500
                })
            }
        } catch (error){ 
            Swal.fire({
                icon: 'error',
                title: `Error al guardar el historial de salud: ${error}`,
            })
        }  
    }
};       

  //cargar historial
  const startLoadingHealthHistory = async(petID: string) =>{
      
    if(!uid || !activeOwner || !activeOwner.id || !activePet ) return;
    const ownerID = activeOwner.id

    try{
        const healthHistory = await getHealthHistoryPet(uid, ownerID, petID)
        
        if(!healthHistory) return [];
        dispatch(setHealthHistoryList(healthHistory))

    } catch(error){
        console.log(error)
    }
  } 


  //borrar historial
  const startDeletingHealthHistory = async() => {
   
    if(!uid || !activeOwner || !activePet || !activeHealthHistory) return;
    
    try {
        const docRef = doc(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}/pets/${activePet.id}/healthHistory/${activeHealthHistory.id}`) 
        
        const resp = await deleteDoc(docRef)
        console.log('Historial borrado correctamente', resp);
        
        dispatch(onDeleteHealthHistory(activeHealthHistory))
        Swal.fire({
            icon: 'success',
            title: 'Historial eliminado correctamente',
            showConfirmButton: false,
            timer: 1500
        })
          
    }catch (error) {
        Swal.fire({
            icon: 'error',
            title: `Error al eliminar el historial: ${error}`,
        })
    }   
  }
  
  return {
    historyList, 
    activeHealthHistory, 
    isHealthHistorySaving, 
    setHealthHistoryList,
    hasHealthHistorySelected: !!activeHealthHistory,
    setActiveHealthHistory,
    startSavingHealthHistory,
    startLoadingHealthHistory,
    startDeletingHealthHistory
  }
}
