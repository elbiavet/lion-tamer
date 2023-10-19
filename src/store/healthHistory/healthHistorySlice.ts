import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HealthHistory } from '../../interfaces/appInterfaces';

export interface HealthHistoryState {
    historyList:HealthHistory[],
    activeHealthHistory: HealthHistory | null,
    isHealthHistorySaving: boolean,
}

const initialState: HealthHistoryState = {
    historyList:[],
    activeHealthHistory:null,
    isHealthHistorySaving: false,
  }

export const healthHistorySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHealthHistoryList: (state: HealthHistoryState, action: PayloadAction<HealthHistory[]>)  => {
            state.historyList = action.payload;
        },
        onSetActiveHealthHistory: (state: HealthHistoryState, action: PayloadAction<HealthHistory | null>) => {
          state.activeHealthHistory = action.payload;
        },
        onAddNewHealthHistory: (state: HealthHistoryState, action: PayloadAction<HealthHistory>) => {
          state.historyList.push(action.payload);
          state.activeHealthHistory = action.payload;
          state.isHealthHistorySaving = false;
        },
        setSavingHealthHistory: (state: HealthHistoryState) => {
          state.isHealthHistorySaving = true
        },
        onUpdateHealthHistory: (state: HealthHistoryState, action: PayloadAction<HealthHistory>) => {
          state.historyList = state.historyList.map(history => {
            if (history.id === action.payload.id) return action.payload;
            return history;
          })
          state.isHealthHistorySaving = false;
        },
        onDeleteHealthHistory: (state: HealthHistoryState, action: PayloadAction<HealthHistory>) => {
          state.historyList = state.historyList.filter(history => history.id !== action.payload.id);
          state.activeHealthHistory = null;
        }      
    }
});

export const { setHealthHistoryList, onSetActiveHealthHistory, onAddNewHealthHistory, setSavingHealthHistory, onUpdateHealthHistory, onDeleteHealthHistory} = healthHistorySlice.actions;