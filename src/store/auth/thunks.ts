import { Action, ThunkAction } from "@reduxjs/toolkit"
import { AuthState, checkingCredentials, login, logout } from "./authSlice"
import { logoutFirebase, signInWithEmail } from "../../firebase/providers";



export const loginWithEmail = (email: string, password: string ): ThunkAction<void, AuthState, unknown, Action<string>> => {
    return async (dispatch) => {
     
        dispatch(checkingCredentials())

        const { uid, displayName, errorMessage } = await signInWithEmail(email,password)
        if(!uid) return dispatch(logout({errorMessage}))
        dispatch(login({uid, displayName, email }))

    };
  };


  export const startLogout = (): ThunkAction<void, AuthState, unknown, Action<string>> =>{
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(logout('Se ha cerrado la sesión'))
    }
  }

