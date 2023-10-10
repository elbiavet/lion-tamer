import { Formik, Form, Field, ErrorMessage } from "formik"
import { useSelector } from "react-redux";
import * as Yup from 'yup';
import "../styles/Pages.css"
import { RootState } from '../store/store';
import { useAuthStore } from "../hooks/useAuthStore";
import logo from "../assets/logo-blue-trans.png"

export const Login = () => {

   
    const { errorMessage } = useSelector((state: RootState) => state.auth)
    const { loginWithEmail } = useAuthStore();


    const handleSubmit= (email: string, password: string)=> {
        loginWithEmail(email,password)
    }

    return (
         <Formik 
            initialValues={{
              email:'',
              password:'',
            }} 
            onSubmit={({email,password}) => handleSubmit(email,password)}
            validationSchema= {
              Yup.object({
              email: Yup.string().required('El email es obligatorio').email('El email no es válido'),
              password: Yup.string().required('La contraseña es obligatoria'),
            })
          }>
            { () => (
                <div className="vh-100 d-flex align-items-center bg-login"tabIndex={0} data-bs-toggle="tooltip" title="Si quieres probar la aplicación: nube@gmail.com --> 123456">
                    <div className="container container-login animate__animated animate__zoomIn">
                    <div className="text-center m-3" tabIndex={0} data-bs-toggle="tooltip" title="Si quieres probar la aplicación: nube@gmail.com --> 123456">
                        <img src={logo} alt="Logo Lion Tamer" width={250}/>
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
                                    <button 
                                        type="submit"
                                        className="btn btn-primary w-100" 
                                    >Entrar</button>
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