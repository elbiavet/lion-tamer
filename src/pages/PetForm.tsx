import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { usePetStore, useOwnerStore } from "../hooks";
import { initialValuesPet as initialValues } from "../assets/initialValues";


export const PetForm = () => {

  const navigate = useNavigate();
  const {activePet, startSavingPet, startDeletingPet} = usePetStore();
  const { activeOwner } = useOwnerStore();

  const { handleSubmit, setValues , getFieldProps, errors, touched, resetForm } = useFormik({
      initialValues, 
      onSubmit: values => {
        startSavingPet(values)
        if(activePet && activeOwner) navigate(`/owner/${activeOwner.id}`)   
        console.log(values)
      },          
      validationSchema: Yup.object({
        namePet: Yup.string().required('El nombre de la mascota es obligatorio'),
        specie: Yup.string().required('La especie es obligatoria'),
        birthday: Yup.date().required('La fecha de nacimiento es obligatoria').max(new Date()),
        castrated: Yup.boolean().required('Es una información obligatoria'),
        })}
  );

  // const resetFormValues = ()=>{
  //   resetForm()
  //   dispatch(onSetActivePet(null))
  // }

    useEffect(() => {
    if(activePet && activePet.id){
     setValues({...activePet})
    }
   }, [activePet])

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <div className="container-fluid m-2 m-sm-4">
          <div className="mt-4 mb-4">
            <h2 className="text-center fs-5 fw-bold">Mascota</h2> 
          </div>   

          <div className="row">

            <div className="col-sm-5 col-lg form-group m-1">
              <label className="fw-bold" htmlFor="namePet">Nombre mascota</label>
              <input type="text"
                className="form-control"
                placeholder="Nombre mascota"
                {...getFieldProps('namePet')}
            />
              { touched.namePet && errors.namePet && <span className='form-error m-1'>{errors.namePet}</span>}
            </div>
            <div className="col-sm-5 col-lg form-group m-1 ">
              <label className="fw-bold">Fecha de nacimiento</label>
                <input 
                  type="date" 
                  className="form-control"
                  {...getFieldProps('birthday')} 
                />
                { touched.birthday && errors.birthday && <span className='form-error m-1'>{errors.birthday}</span>}
            </div>
            <div className="col-sm-5 col-lg form-group m-1">
              <label className="fw-bold">Especie</label>
              <input 
                  type="text"
                  className="form-control"
                  placeholder="Especie"
                  {...getFieldProps('specie')}
              />
              { touched.specie && errors.specie && <span className='form-error m-1'>{errors.specie}</span>}
            </div>
          </div>
          <div className="row">
            <div className="col-sm col-lg form-group m-sm-1">
              <label className="fw-bold">Raza</label>
              <input 
                  type="text"
                  className="form-control"
                  placeholder="Raza"
                  {...getFieldProps('breed')}
              />
            </div>
            <div className="col-sm col-lg form-group m-sm-1">
              <label className="fw-bold">Capa</label>
              <input 
                  type="text"
                  className="form-control"
                  placeholder="Capa"
                  {...getFieldProps('coat')}
              />
            </div>
            
            <div className="col-sm col-lg form-group m-1">
              <label className="fw-bold">Carácter</label>
              <select 
                  className="form-control"
                  {...getFieldProps('character')}
              >
                  <option value="bueno">Bueno</option>
                  <option value="cariñoso" selected>Cariñoso</option>
                  <option value="miedoso" selected>Miedoso</option>
                  <option value="mordedor" selected>Nervioso</option>
                  <option value="agresivo" selected>Agresivo</option>
                  <option value="mordedor" selected>Mordedor</option>
               </select>
            </div>
          </div>
                  
          <div className="row">
            <div className="col-lg form-group m-1">
              <label className="fw-bold me-2">¿Está castrad@?</label>
              <select 
                  className="form-control"
                  {...getFieldProps('castrated')}
                >
                  <option value="true">Si</option>
                  <option value="false" selected>No</option>
              </select>
            </div>
            <div className="col-lg form-group m-1">
              <label className="fw-bold">Comentarios</label>
              <textarea
                  rows={2}
                  className="form-control"
                  placeholder="Comentarios"
                  {...getFieldProps('comments')}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="col-5 col-sm-3 col-lg-1 btn btn-success m-1">
                  Guardar
            </button>
            <button 
              type="button" 
              className="col-5 col-sm-3 col-lg-1 btn btn-outline-danger m-1" 
              onClick={()=>{
                startDeletingPet()
                resetForm();
              }}
            >
                  Eliminar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}



