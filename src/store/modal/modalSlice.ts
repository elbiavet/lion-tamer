import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
    isModalOpen: boolean
 }

const initialState: ModalState = {
    isModalOpen: false,
  }

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        onOpenModal: (state: ModalState) => {
          state.isModalOpen = true;  
        },
        onCloseModal: (state: ModalState) => {
            state.isModalOpen = false;  
          },
        
    }
});

export const { onOpenModal, onCloseModal } = modalSlice.actions;