import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Owner } from '../../interfaces/appInterfaces';

export interface OwnersState {
    ownerList:Owner[],
    ownerLastList:Owner[], //! NUEVO
    ownerSearchList:Owner[],
    activeOwner: Owner | null,
    isOwnerSaving: boolean
}

const initialState: OwnersState = {
    ownerList:[],
    ownerLastList:[],//! NUEVO
    ownerSearchList:[],
    activeOwner:null,
    isOwnerSaving: false
  }

export const ownerSlice = createSlice({
    name: 'owner',
    initialState,
    reducers: {
        setOwnerList: (state: OwnersState, action: PayloadAction<Owner[]>)  => {
            state.ownerList = action.payload;
        },
        setOwnerLastList: (state: OwnersState, action: PayloadAction<Owner[]>)  => {
            state.ownerLastList = action.payload;
        },
        addOwnerLastList: (state: OwnersState, action: PayloadAction<Owner>)  => { //! NUEVO
            state.ownerLastList.push(action.payload)    
        },
        setOwnerSearchList: (state: OwnersState, {payload})  => {
            state.ownerSearchList = payload;
        },
        onSetActiveOwner: (state: OwnersState, action: PayloadAction<Owner>)  => {
            state.activeOwner= action.payload;
        },
        onAddNewOwner: (state: OwnersState, action: PayloadAction<Owner>)  => {
            state.ownerList.push(action.payload);
            state.activeOwner = null; 
            state.isOwnerSaving= false;
        },
        setSavingOwner:(state: OwnersState)  => {
            state.isOwnerSaving = true
        },
        onUpdateOwner: (state: OwnersState, {payload}) =>{
            state.ownerList = state.ownerList.map(owner => {
                if(owner.id === payload.id) return payload
                return owner
            })
            state.isOwnerSaving= false;
        },
        onDeleteOwner: (state: OwnersState, { payload }) =>{ 
            state.ownerList = state.ownerList.filter(owner => owner.id !== payload.id);
            state.activeOwner = null;   
        }
    }
});

export const { setOwnerList, setOwnerSearchList, setOwnerLastList, addOwnerLastList, onSetActiveOwner, onAddNewOwner, setSavingOwner, onUpdateOwner, onDeleteOwner} = ownerSlice.actions;