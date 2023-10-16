import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";

import { onAddNewHealthHistory, onSetActiveHealthHistory, onUpdateHealthHistory, setHealthHistoryList, setSavingHealthHistory } from "../store/healthHistory/healthHistorySlice";
import { HealthHistory } from "../interfaces/appInterfaces";


export const useHealthHistoryStore = () => {

  const dispatch = useDispatch();
  const { uid } = useSelector((state:RootState)=> state.auth)
  const { activeOwner } = useSelector((state:RootState)=> state.owner)
  const { petList, activePet } = useSelector((state:RootState)=> state.pet)
  const { activeHealthHistory } = useSelector((state:RootState)=> state.history)
  
  
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
            
            
            const docRef = doc(collection(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}/pets/${activePet.id}/healthHistory/${history.id}`));

            const resp = await setDoc(docRef, historyToFirestore, {merge:true});
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
  const startLoadingHealthHistoryList = async(petID: string) =>{
      
    if(!uid) return;

    try{
        const healthHistory = await getHealthHistoryList(uid, ownerID:activeOwner?.id, petID, invoiceID)
        
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
       
        const docRef = doc(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}/pets/${activeHealthHistory.id}`) 
        
        const resp = await deleteDoc(docRef)
        console.log('Mascota borrado correctamente', resp);
        
        dispatch(onDeleteHealthHistory(activeHealthHistory))
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
    activeHealthHistory, 
    isHealthHistorySaving, 
    petList,
    hasHealthHistorySelected: !!activeHealthHistory,
    setActiveHealthHistory,
    startSavingHealthHistory,
    startLoadingHealthHistoryList,
    startDeletingHealthHistory
  }
}
