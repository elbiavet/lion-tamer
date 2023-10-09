
import { checkingCredentials, login, logout } from "../store/auth/authSlice";
import { logoutFirebase, signInWithEmail } from "../firebase/providers";
import { useDispatch } from "react-redux";


export const useAuthStore = () => {

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
    loginWithEmail,
    startLogout
    }
}
