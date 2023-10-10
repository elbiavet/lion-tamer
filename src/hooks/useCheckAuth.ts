import { useEffect } from "react";
import { FirebaseAuth } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth/authSlice";
import { useCalendarStore } from "./useCalendarStore";
import { useAuthStore } from "./useAuthStore";


export const useCheckAuth = () =>{

    const { status } = useAuthStore()
    const dispatch = useDispatch();
    const { startLoadingEventList } = useCalendarStore();

    
    useEffect(() => {

      onAuthStateChanged( FirebaseAuth, async( user )=>{
        if( !user ) return dispatch(logout(''))
        const { uid, email, displayName } = user;

        dispatch(login({ uid, email, displayName }))
        
        startLoadingEventList(uid)
      
      })

    }, [])


    return status
}
