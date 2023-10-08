import { createSlice } from '@reduxjs/toolkit';
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
        setPetList: (state: PetsState, {payload})  => {
            state.petList = payload;
        },
        setPetSearchList: (state: PetsState, {payload})  => {
            state.petSearchList = payload;
        },
        onSetActivePet: (state: PetsState, {payload})  => {
            state.activePet= payload;
        },
        onAddNewPet: (state: PetsState, {payload})  => {
            state.petList.push(payload);
            state.activePet = payload;
            state.isPetSaving= false;
        },
        setSavingPet:(state: PetsState)  => {
            state.isPetSaving = true
        },
        onUpdatePet: (state: PetsState, {payload}) =>{
            state.petList = state.petList.map(pet => {
                if(pet.id === payload.id) return payload
                return pet
            })
            state.isPetSaving= false;
        },
        onDeletePet: (state: PetsState, { payload }) =>{ 
            state.petList = state.petList.filter(pet => pet.id !== payload.id);
            state.activePet = null;   
        }
    }
});

export const { setPetList, setPetSearchList, onSetActivePet, onAddNewPet, setSavingPet, onUpdatePet, onDeletePet} = petSlice.actions;