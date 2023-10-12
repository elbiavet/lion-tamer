import { createSlice } from '@reduxjs/toolkit';
import { Owner } from '../../interfaces/appInterfaces';

export interface OwnersState {
    ownerList:Owner[],
    ownerSearchList:Owner[],
    activeOwner: Owner | null,
    isOwnerSaving: boolean
}

const initialState: OwnersState = {
    ownerList:[],
    ownerSearchList:[],
    activeOwner:null,
    isOwnerSaving: false
  }

export const ownerSlice = createSlice({
    name: 'owner',
    initialState,
    reducers: {
        setOwnerList: (state: OwnersState, {payload})  => {
            state.ownerList = payload;
        },
        setOwnerSearchList: (state: OwnersState, {payload})  => {
            state.ownerSearchList = payload;
        },
        onSetActiveOwner: (state: OwnersState, {payload})  => {
            state.activeOwner= payload;
        },
        onAddNewOwner: (state: OwnersState, {payload})  => {
            state.ownerList.push(payload);
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

export const { setOwnerList, setOwnerSearchList, onSetActiveOwner, onAddNewOwner, setSavingOwner, onUpdateOwner, onDeleteOwner} = ownerSlice.actions;