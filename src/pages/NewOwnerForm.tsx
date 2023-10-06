import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik"
import { useOwnerStore } from "../hooks/useOwnerStore";
import * as Yup from 'yup';
import { initialValuesOwner as initialValues } from "../assets/data";
import { useEffect, useState } from "react";
import { Owner } from "../interfaces/appInterfaces";


export const NewOwnerForm = () => {

  const { ownerList, startSavingOwner, startLoadingOwnerList, activeOwner, startDeletingOwner } = useOwnerStore();
  const dispatch = useDispatch();

  // regex para dni español y extranjero
  const regex = /(([X-Z]{1})([-]?)(\d{7})([-]?)([A-Z]{1}))|((\d{8})([-]?)([A-Z]{1}))/


  const navigate = useNavigate();
  
  const newPet = () => {
    if(activeOwner) navigate(`/owner/${activeOwner.id}`) 
  }

  const { handleSubmit, values, setValues, getFieldProps, errors, touched, resetForm } = useFormik({
      initialValues, 
      onSubmit: values => {
        dispatch(startSavingOwner(values))
        //resetForm()

      },          
      validationSchema: Yup.object({
        ownerFirstName: Yup.string().required('El nombre es obligatorio'),
        dni: Yup.string().required('El dni del propietario es obligatorio').matches(regex, 'Debe introducir un DNI válido'),
        email: Yup.string().email('Debe introducir un email válido'),
        tlf: Yup.number().required('El teléfono del propietario es obligatorio').positive().min(9, 'El teléfono debe tener al menos 9 cifras'),
        })}
  );

    const handleDeleteOwner = () =>{
      dispatch(startDeletingOwner(activeOwner))
      resetForm();
  }

  return (
    <form onSubmit={ handleSubmit }>
        <div className="container m-4">
              <div className="row mt-4 mb-4">
                <h2 className="col-9 text-center fs-5 fw-bold">Nuevo Propietario</h2> 
            
                <button type="submit" className="col-1 btn btn-outline-primary m-1">
                        Guardar
                  </button>
                  <button type="button" className="col-1 btn btn-outline-danger m-1" onClick={handleDeleteOwner}>
                        Eliminar
                  </button>
              </div>  
          
              <div className="row">
                <div className="col-3 form-group m-1">
                  <label className="fw-bold">Nombre</label>
                  <input type="text"
                    className="form-control"
                    placeholder="Nombre"
                    {...getFieldProps('ownerFirstName')}
                    />
                  { touched.ownerFirstName && errors.ownerFirstName && <span className='form-error m-1'>{errors.ownerFirstName}</span>}
                </div>

                <div className="col-5 form-group m-1">
                  <label className="fw-bold">Apellidos</label>
                  <input type="text"
                    className="form-control"
                    placeholder="Apellidos"
                    {...getFieldProps('ownerLastName')}
                    />
                  { touched.ownerLastName && errors.ownerLastName && <span className='form-error m-1'>{errors.ownerLastName}</span>}
                </div>
                

                <div className="col-3 form-group m-1">
                   <label className="fw-bold">DNI</label>
                  <input 
                      type="text"
                      className="form-control"
                      placeholder="DNI"
                      {...getFieldProps('dni')}
                  />
                  { touched.dni && errors.dni && <span className='form-error m-1'>{errors.dni}</span>}
                </div>
              </div>

              <div className="row">
                   
                <div className="col-4 form-group m-1">
                   <label className="fw-bold">Email</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      {...getFieldProps('email')}
                  />
                  { touched.email && errors.email && <span className='form-error m-1'>{errors.email}</span>}

                </div>
                <div className="col-7 form-group m-1">
                   <label className="fw-bold">Dirección</label>
                  <input 
                      type="text"
                      className="form-control"
                      placeholder="Dirección"
                      {...getFieldProps('address')}
                  />
                </div>
              </div>

              <div className="row">            
                <div className="col-4">
                  <div className="form-group m-1">
                     <label className="fw-bold">Teléfono de contacto</label>
                    <input 
                        type="number"
                        className="form-control"
                        placeholder="Teléfono"
                        {...getFieldProps('tlf')}
                    />
                  { touched.tlf && errors.tlf && <span className='form-error m-1'>{errors.tlf}</span>}

                  </div>
                  <div className="form-group m-1">
                     <label className="fw-bold">Teléfono secundario</label>
                    <input 
                        type="number"
                        className="form-control"
                        placeholder="Teléfono secundario"
                        {...getFieldProps('tlf2')}
                    />
                  </div>
                </div>
                <div className="col-7 form-group m-1">
                   <label className="fw-bold">Comentarios</label>
                  <textarea 
                      rows={2}
                      className="form-control"
                      placeholder="Comentarios"
                      {...getFieldProps('comments')}
                  />
                </div>
              </div>
    
          </div>
    </form>

  )
}
