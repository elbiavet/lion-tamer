import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CashState {
    moneyAmountDay: number,
    paymentListDay: 
 }

const initialState: CashState = {
    moneyAmountDay: 0,
  }

export const cashSlice = createSlice({
    name: 'cash',
    initialState,
    reducers: {
        addPayment: (state: CashState, {payload}: PayloadAction<number>) => {
            state.moneyAmountDay += payload; 
        },
       
    }
});

export const { login,  } = cashSlice.actions;