import { useDispatch, useSelector } from "react-redux"
import { CalendarEventInterface } from '../interfaces/appInterfaces';
import { CalendarState, onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, setEventList, setSaving } from "../store/calendar/calendarSlice";
import { RootState } from "../store/store";
import { Action, Dispatch, ThunkAction } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/firebaseConfig";
import { getEventsFirebase } from "../helpers/getEventsFirebase";
import { timestampToDate } from "../helpers/timestampToDate";

// Define tu tipo de acción para el thunk
// type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string> // Action<typeof onDeleteEvent>
// >;

export const useCalendarStore = () => {

    const {eventList, activeEvent, isEventSaving } = useSelector((state: RootState)=> state.calendar)

    const dispatch = useDispatch();

    const setActiveEvent = (calendarEvent:CalendarEventInterface) =>{
        dispatch(onSetActiveEvent(calendarEvent))
    }


    const startSavingEvent = (calendarEvent: CalendarEventInterface/* , uid: string */): ThunkAction<void, CalendarState, unknown, Action>=> {
        return async (dispatch: Dispatch, getState:()=> RootState) => {

            dispatch(setSaving())
            const {uid} = getState().auth;
            
           //* Actualización
            if( calendarEvent.id){

                const eventToFirestore = {...calendarEvent};
                delete eventToFirestore.id;

                try {
                    //*ojo, no hago "doc(collection...)". Si lo hiciera sería: 
                    //*const docRef = doc(collection(FirebaseDB, `${uid}/lionTamer/calendar/`), `/${calendarEvent.id}`);
                    
                    const docRef = doc(FirebaseDB, `${uid}/lionTamer/calendar/${calendarEvent.id}`);
                    const resp = await setDoc(docRef, eventToFirestore, {merge:true});
                    console.log('Documento actualizado correctamente', resp);
                    
                    eventToFirestore.id = docRef.id
                    console.log(eventToFirestore)
                    dispatch(onUpdateEvent({...eventToFirestore}));
        

              } catch (error){ console.error('Error al actualizar el documento:', error) }   

            } else {
                //!     //TODO: TAREA: QUE LA FECHA DE UNA CITA SE GRABE SIEMPRE CON EL MISMO FORMATO
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
      };

  
    const startLoadingEventList = (uid:string): ThunkAction<void, CalendarState, unknown, Action> =>{
        return async(dispatch: Dispatch)=>{
            
            const events = await getEventsFirebase(uid)
            
            if(!events) return [];

            //TODO: OJO CON COMO SE GUARDAN LAS FECHAS EN EL MODAL. A VECES NO APARECEN
            //*He tenido que tranformar la fecha porque firebase a veces la devuelve como TimeStamp, a veces como string


            events.map((event:CalendarEventInterface) => {
                typeof(event.start) !== 'string' 
                    ? (event.start= timestampToDate(event.start)) 
                    : (event.start= new Date(event.start))
                typeof(event.end) !== 'string' 
                    ? (event.end= timestampToDate(event.end)) 
                    : (event.end= new Date(event.end))

                }
            )

            dispatch(setEventList(events))
        } 
    }
    

    const startDeletingEvent = (): ThunkAction<void, CalendarState, unknown, Action<string>>  => {
         return async(dispatch, getState:()=> RootState )=>{
            
            try {
                const {uid} = getState().auth
                if(!uid) return;
                
                //const {id} = getState().calendar.activeEvent
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
