import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Invoice } from '../../interfaces/appInterfaces';

export interface CashState {
    totalInvoicesPet: Invoice[],
    activeInvoice: Invoice | null,
    isInvoiceSaving: boolean
 }

const initialState: CashState = {
    totalInvoicesPet: [],
    activeInvoice: null,
    isInvoiceSaving: false
  }

export const cashRegisterSlice = createSlice({
    name: 'cash',
    initialState,
    reducers: {
        setTotalInvoicesPet: (state: CashState, {payload})  => {
            state.totalInvoicesPet = payload;
        },
        onSetActiveInvoice: (state: CashState, {payload})  => {
            state.activeInvoice= payload;
            //toggle evento activo
            // (state.activeInvoice && state.activeInvoice.id === payload.id)
            //     ? (state.activeInvoice = null) 
            //     : (state.activeInvoice= payload)
        },
        onAddNewInvoice: (state: CashState, action: PayloadAction<Invoice>)  => {
            state.totalInvoicesPet.push(action.payload); 
            state.activeInvoice = null;
            state.isInvoiceSaving= false;
        },
        setSavingInvoice:(state: CashState)  => {
            state.isInvoiceSaving = true
        },
        onUpdateInvoice: (state: CashState, action: PayloadAction<Invoice>) =>{
            state.totalInvoicesPet = state.totalInvoicesPet.map(invoice => {
                if(invoice.id === action.payload.id) return action.payload
                return invoice
            })
            state.isInvoiceSaving= false;
        },
        onDeleteInvoice: (state: CashState, action: PayloadAction<Invoice>) =>{ 
            state.totalInvoicesPet = state.totalInvoicesPet.filter(invoice => invoice.id !== action.payload.id);
            state.activeInvoice = null;   
        }
    }
});

export const { setTotalInvoicesPet, onSetActiveInvoice, onAddNewInvoice, setSavingInvoice, onUpdateInvoice, onDeleteInvoice } = cashRegisterSlice.actions;