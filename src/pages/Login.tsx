import { Formik, Form, Field, ErrorMessage } from "formik"
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { loginWithEmail } from "../store/auth/thunks";
import "../styles/Pages.css"

export const Login = () => {

    const dispatch = useDispatch();
    const { errorMessage } = useSelector(state => state.auth)

    const handleSubmit= (email: string, password: string)=> {
        dispatch(loginWithEmail(email,password))
    }

    return (
         <Formik 
            initialValues={{
              email:'',
              password:'',
            }} 
            // onSubmit={({email,password}) => dispatch(loginWithEmail(email,password))}
            onSubmit={({email,password}) => handleSubmit(email,password)}
            validationSchema= {
              Yup.object({
              email: Yup.string().required('El email es obligatorio').email('El email no es válido'),
              password: Yup.string().required('La contraseña es obligatoria'),
            })
          }>
            { () => (
                <div className="vh-100 d-flex align-items-center bg-login">
                    <div className="container container-login animate__animated animate__zoomIn">
                    <div className="text-center m-3">
                        <img src="src/assets/logo-blue-small.jpg" alt="Logo Lion Tamer" width={250}/>
                    </div>
                    <div className="row">
                        <div className="col-md-11 m-3">
                            <Form> 
                                <div className="form-group m-2">
                                    <Field 
                                        type="text"
                                        className="form-control"
                                        placeholder="Correo"
                                        name= "email"
                                    />
                                    <span className="text-danger"><ErrorMessage name="email" /></span>
                                </div>
                                <div className="form-group m-2">
                                    <Field
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                        name = "password"
                                    />
                                    <span className="text-danger"><ErrorMessage name="password" /></span>
                                </div>
                                <div className="form-group m-2">
                                    <input 
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        value="Entrar" 
                                    />
                                </div>
                            </Form>
                            { errorMessage && <span>{errorMessage}</span> }
                            <p className="text-end">&copy; Elbia Losana</p>
                        </div>
                    </div>
                </div>
            </div>
              )
            }

          </Formik>
          
          
    )
}