import { useDispatch, useSelector } from "react-redux"
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/firebaseConfig";
import { RootState } from "../store/store";
import { getEventsFirebase } from "../helpers/getEventsFirebase";
import { CalendarEventInterface } from '../interfaces/appInterfaces';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, setEventList, setSaving } from "../store/calendar/calendarSlice";


export const useCalendarStore = () => {

    const {eventList, activeEvent, isEventSaving } = useSelector((state: RootState)=> state.calendar)
    const { uid } = useSelector((state: RootState)=> state.auth)

    const dispatch = useDispatch();

    const setActiveEvent = (calendarEvent:CalendarEventInterface) =>{
        dispatch(onSetActiveEvent(calendarEvent))
    }


    const startSavingEvent = async(calendarEvent: CalendarEventInterface) => {
        
        dispatch(setSaving())
        
       //* Actualización
        if( calendarEvent.id){
            const eventToFirestore = {...calendarEvent};
            delete eventToFirestore.id;
            
            try {
                const docRef = doc(FirebaseDB, `${uid}/lionTamer/calendar/${calendarEvent.id}`);
                const resp = await setDoc(docRef, eventToFirestore, {merge:true});
                console.log('Documento actualizado correctamente', resp);
                
                eventToFirestore.id = docRef.id
                console.log(eventToFirestore)
                dispatch(onUpdateEvent({...eventToFirestore}));
    
          } catch (error){ console.error('Error al actualizar el documento:', error) }   
        } else {
          
            //*Nuevo evento en el calendario
            try {
                const newDoc = doc(collection(FirebaseDB, `${uid}/lionTamer/calendar`));
                const resp = await setDoc(newDoc, calendarEvent);
                console.log('Documento guardado correctamente', resp);
                
                calendarEvent.id = newDoc.id
                dispatch(onAddNewEvent({...calendarEvent}))
                dispatch(onSetActiveEvent({...calendarEvent}))
          } catch (error) {
                console.error('Error al guardar el documento:', error);
          }   
        }   
    };
      
      
    const startLoadingEventList = async(uid:string) =>{

        try{
            const events = await getEventsFirebase(uid)
            if(!events) return [];
            dispatch(setEventList(events))

        } catch(error){
            console.log(error)
        }
    } 
    
    const startDeletingEvent = async()=> {
         
        try {
            if(!uid) return;
            if(!activeEvent) return; 
            const { id } = activeEvent;
            const docRef = doc(FirebaseDB, `${uid}/lionTamer/calendar/${id}`) 
            
            const resp = await deleteDoc(docRef)
            console.log('Documento borrado correctamente', resp);
            
            dispatch(onDeleteEvent(activeEvent))
        } catch (error) {
            console.error('Error al borrar el documento:', error);
        }    
    }

  return {
    isEventSaving,
    eventList, 
    activeEvent,
    setActiveEvent,
    startLoadingEventList,
    startSavingEvent,
    startDeletingEvent,
    hasEventSelected: !!activeEvent,
  }
}

