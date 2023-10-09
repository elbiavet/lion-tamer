import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pet } from '../../interfaces/appInterfaces';

export interface PetsState {
    petList:Pet[],
    petSearchList:Pet[],
    activePet: Pet | null,
    isPetSaving: boolean,
}

const initialState: PetsState = {
    petList:[],
    petSearchList:[],
    activePet:null,
    isPetSaving: false,
  }

export const petSlice = createSlice({
    name: 'pet',
    initialState,
    reducers: {
        setPetList: (state: PetsState, action: PayloadAction<Pet[]>)  => {
            state.petList = action.payload;
        },
        setPetSearchList: (state: PetsState, action: PayloadAction<Pet[]>) => {
            state.petSearchList = action.payload;
        },
        onSetActivePet: (state: PetsState, action: PayloadAction<Pet | null>) => {
          state.activePet = action.payload;
        },
        onAddNewPet: (state: PetsState, action: PayloadAction<Pet>) => {
          state.petList.push(action.payload);
          state.activePet = action.payload;
          state.isPetSaving = false;
        },
        setSavingPet: (state: PetsState) => {
          state.isPetSaving = true
        },
        onUpdatePet: (state: PetsState, action: PayloadAction<Pet>) => {
          state.petList = state.petList.map(pet => {
            if (pet.id === action.payload.id) return action.payload;
            return pet;
          })
          state.isPetSaving = false;
        },
        onDeletePet: (state: PetsState, action: PayloadAction<Pet>) => {
          state.petList = state.petList.filter(pet => pet.id !== action.payload.id);
          state.activePet = null;
        }      
    }
});

export const { setPetList, setPetSearchList, onSetActivePet, onAddNewPet, setSavingPet, onUpdatePet, onDeletePet} = petSlice.actions;