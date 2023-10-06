import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
    status: string,
    uid: string | null,
    email: string | null,
    displayName: string | null,
    errorMessage: string | null,
  }

  const initialState: AuthState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    errorMessage: null,
  }

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: AuthState, {payload} ) => {
            state.status = 'authenticated',
            state.uid= payload.uid,
            state.email= payload.email,
            state.displayName= payload.displayName,
            state.errorMessage= null
        },
        logout: (state: AuthState, {payload}) =>{
            state.status = 'not-authenticated',
            state.uid= null,
            state.email= null,
            state.displayName= null,
            state.errorMessage= payload.errorMessage
        },
        checkingCredentials: (state: AuthState) =>{
            state.status= 'checking'
        },

    }
        
})

export const { login, logout, checkingCredentials } = authSlice.actions;