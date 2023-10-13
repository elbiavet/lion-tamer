import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Invoice } from '../../interfaces/appInterfaces';

export interface CashState {
    totalInvoicesDay: Invoice[],
    activeInvoice: Invoice | null,
    /* activeInvoice:{
        pet: string,
        consumedServices: Service[],
        total: number
        isPaid: boolean
    } */
 }

//      eventList: CalendarEventInterface[],
//     activeEvent: CalendarEventInterface | null,
//     isEventSaving: boolean

const initialState: CashState = {
    totalInvoicesDay: [],
    activeInvoice: null,
  }

export const cashRegisterSlice = createSlice({
    name: 'cash',
    initialState,
    reducers: {
        setTotalInvoicesDay: (state: CashState, {payload})  => {
            state.totalInvoicesDay = payload;
        },
        onSetActiveInvoice: (state: CashState, {payload})  => {
            //toggle evento activo
            (state.activeInvoice && state.activeInvoice.id === payload.id)
                ? (state.activeInvoice = null) 
                : (state.activeInvoice= payload)
        },
        onAddNewInvoice: (state: CashState, action: PayloadAction<Invoice>)  => {
            state.totalInvoicesDay.push(action.payload); 
            state.activeInvoice = null;
            // state.isEventSaving= false;
        },
        //setSaving:(state: CashState)  => {
        //     state.isEventSaving = true
        //},
        onUpdateInvoice: (state: CashState, {payload}) =>{
            state.totalInvoicesDay = state.totalInvoicesDay.map(event => {
                if(event.id === payload.id) return payload
                return event
            })
            // state.isEventSaving= false;
        },
        onDeleteInvoice: (state: CashState, { payload }) =>{ 
            state.totalInvoicesDay = state.totalInvoicesDay.filter(event => event.id !== payload.id);
            state.activeInvoice = null;   
        }
    }
});

export const { setTotalInvoicesDay, onSetActiveInvoice, onAddNewInvoice, onUpdateInvoice, onDeleteInvoice } = cashRegisterSlice.actions;