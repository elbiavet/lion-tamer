import { createSlice } from '@reduxjs/toolkit';
import { CalendarEventInterface } from '../../interfaces/appInterfaces';

 export interface CalendarState {
    eventList: CalendarEventInterface[],
    activeEvent: CalendarEventInterface | null,
    isEventSaving: boolean
  }

const initialState: CalendarState = {
    eventList: [],
    activeEvent: null,
    isEventSaving: false
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setEventList: (state: CalendarState, {payload})  => {
            state.eventList = payload;
        },
        onSetActiveEvent: (state: CalendarState, {payload})  => {
            //toggle evento activo
            (state.activeEvent && state.activeEvent.id === payload.id)
                ? (state.activeEvent = null) 
                : (state.activeEvent= payload)
        },
        onAddNewEvent: (state: CalendarState, {payload})  => {
            state.eventList.push(payload); 
            state.activeEvent = null;
            state.isEventSaving= false;
        },
        setSaving:(state: CalendarState)  => {
            state.isEventSaving = true
        },
        onUpdateEvent: (state: CalendarState, {payload}) =>{
            state.eventList = state.eventList.map(event => {
                if(event.id === payload.id) return payload
                return event
            })
            state.isEventSaving= false;
        },
        onDeleteEvent: (state: CalendarState, { payload }) =>{ 
            state.eventList = state.eventList.filter(event => event.id !== payload.id);
            state.activeEvent = null;   
        }
    }
});

export const { setEventList, onSetActiveEvent, onAddNewEvent, setSaving, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;