import { useEffect } from "react";
import { FirebaseAuth } from "../firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth/authSlice";
import { useCalendarStore } from "./useCalendarStore";


export const useCheckAuth = () =>{

    const { status } = useSelector((state:RootState)=> state.auth)
    const dispatch = useDispatch();
    const { startLoadingEventList } = useCalendarStore();

    
    useEffect(() => {

      onAuthStateChanged( FirebaseAuth, async( user )=>{
        if( !user ) return dispatch(logout(''))
        const { uid, email, displayName } = user;

        dispatch(login({ uid, email, displayName }))

        dispatch(startLoadingEventList(uid))
       
      })

    }, [])



    return status
}
