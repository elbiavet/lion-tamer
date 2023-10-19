import { useDispatch } from "react-redux";
import { useFormik } from "formik"
import { useOwnerStore } from "../hooks/useOwnerStore";
import * as Yup from 'yup';
import { useEffect } from "react";
import { PetForm } from "./PetForm";
import { onSetActiveOwner } from "../store/owners/ownerSlice";
import { initialValuesOwner as initialValues } from "../assets/initialValues";

export const OwnerForm = () => {

  const { startSavingOwner, activeOwner, startDeletingOwner } = useOwnerStore();
  const dispatch = useDispatch();

  // regex para dni español y extranjero
  const regex = /(([X-Z]{1})([-]?)(\d{7})([-]?)([A-Z]{1}))|((\d{8})([-]?)([A-Z]{1}))/


  const { handleSubmit, setValues , getFieldProps, errors, touched, resetForm } = useFormik({
      initialValues, 
      onSubmit: values => {
        startSavingOwner(values)
        console.log(values)
      },          
      validationSchema: Yup.object({
        ownerFirstName: Yup.string().required('El nombre es obligatorio'),
        dni: Yup.string().required('El dni del propietario es obligatorio').matches(regex, 'Debe introducir un DNI válido'),
        email: Yup.string().email('Debe introducir un email válido'),
        tlf: Yup.number().required('El teléfono del propietario es obligatorio').positive().min(9, 'El teléfono debe tener al menos 9 cifras'),
        })}
  );

    const handleDeleteOwner = () =>{
      startDeletingOwner()
      resetForm();
  }

  const resetFormValues = ()=>{
    resetForm()
    dispatch(onSetActiveOwner(null))
  }

    useEffect(() => {
    if(activeOwner && activeOwner.id){
     setValues({...activeOwner})
    }
   }, [activeOwner])

   
  return (
  <div>
      {
        activeOwner && (
          <div className="alert alert-danger d-flex flex-column flex-sm-row justify-content-center align-items-center m-2 m-sm-1 m-lg-0" role="alert">
            <p className="me-sm-4 m-1">Hay un propietario seleccionado actualmente. ¿Quieres crear uno nuevo?</p>
            <button 
              type="button" 
              className="btn btn-custom align-self-sm-baseline"
              onClick={()=> resetFormValues()}
            >
              Nuevo
            </button>      
          </div> 
        ) 
      }
    <form onSubmit={ handleSubmit }>
        <div className="container-fluid m-2 m-sm-4">
              <div className="mt-4 mb-4">
                <h2 className="text-center fs-5 fw-bold">Propietario</h2> 
              </div>  
          
              <div className="row mb-3">
                <div className="col-11 col-sm-5 col-lg-3 form-group m-sm-1 ">
                  <label className="fw-bold">Nombre</label>
                  <input type="text"
                    className="form-control"
                    placeholder="Nombre"
                    {...getFieldProps('ownerFirstName')}
                    />
                  { touched.ownerFirstName && errors.ownerFirstName && <span className='form-error m-1'>{errors.ownerFirstName}</span>}
                </div>

                <div className="col-11 col-sm-6 col-lg-5 form-group m-sm-1">
                  <label className="fw-bold">Apellidos</label>
                  <input type="text"
                    className="form-control"
                    placeholder="Apellidos"
                    {...getFieldProps('ownerLastName')}
                    />
                  { touched.ownerLastName && errors.ownerLastName && <span className='form-error m-sm-1'>{errors.ownerLastName}</span>}
                </div>
                

                <div className="col-11 col-sm-5 col-lg-3 form-group m-sm-1">
                   <label className="fw-bold">DNI</label>
                  <input 
                      type="text"
                      className="form-control"
                      placeholder="DNI"
                      {...getFieldProps('dni')}
                  />
                  { touched.dni && errors.dni && <span className='form-error m-sm-1'>{errors.dni}</span>}
                </div>
              </div>

              <div className="row mb-3">
                   
                <div className="col-11 col-sm-5 col-lg-4 form-group m-sm-1">
                   <label className="fw-bold">Email</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      {...getFieldProps('email')}
                  />
                  { touched.email && errors.email && <span className='form-error m-sm-1'>{errors.email}</span>}

                </div>
                <div className="col-11 col-sm-6 col-lg-7 form-group m-sm-1">
                   <label className="fw-bold">Dirección</label>
                  <input 
                      type="text"
                      className="form-control"
                      placeholder="Dirección"
                      {...getFieldProps('address')}
                  />
                </div>
              </div>
 
              <div className="row mb-3">            
                <div className="col-11 col-sm-5 col-lg-4">
                  <div className="form-group m-sm-1">
                     <label className="fw-bold">Teléfono de contacto</label>
                    <input 
                        type="number"
                        className="form-control"
                        placeholder="Teléfono"
                        {...getFieldProps('tlf')}
                    />
                  { touched.tlf && errors.tlf && <span className='form-error m-sm-1'>{errors.tlf}</span>}

                  </div>
                  <div className="form-group m-sm-1">
                     <label className="fw-bold">Teléfono secundario</label>
                    <input 
                        type="number"
                        className="form-control"
                        placeholder="Teléfono secundario"
                        {...getFieldProps('tlf2')}
                    />
                  </div>
                </div>
                <div className="col-11 col-sm-6 col-lg-7 form-group m-sm-1">
                   <label className="fw-bold">Comentarios</label>
                  <textarea 
                      rows={3}
                      className="form-control"
                      placeholder="Comentarios"
                      {...getFieldProps('commentsOwner')}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="col-5 col-sm-3 col-lg-1 btn btn-success m-1">
                      Guardar
                </button>
                <button type="button" className="col-5 col-sm-3 col-lg-1 btn btn-outline-danger m-1" onClick={()=>{handleDeleteOwner()}}>
                      Eliminar
                </button>
              </div>
            </div>
            
    </form>
          { activeOwner && <PetForm />}
  </div>

         
        
    
  )
}
