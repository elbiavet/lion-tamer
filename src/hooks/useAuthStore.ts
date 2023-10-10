
import { checkingCredentials, login, logout } from "../store/auth/authSlice";
import { logoutFirebase, signInWithEmail } from "../firebase/providers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";


export const useAuthStore = () => {

    const { status, uid } = useSelector((state:RootState)=> state.auth)
    const dispatch = useDispatch();

    const loginWithEmail = async(email: string, password: string )=> {
        
        dispatch(checkingCredentials())
        const { uid, displayName, errorMessage } = await signInWithEmail(email,password)
        if(!uid) return dispatch(logout({errorMessage}))
        dispatch(login({uid, displayName, email }))

    };


    const startLogout = async()=>{

        await logoutFirebase();
        dispatch(logout('Se ha cerrado la sesión'))
    }
    

  return {
    uid,
    status,
    loginWithEmail,
    startLogout
    }
}
