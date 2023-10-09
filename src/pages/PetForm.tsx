import { useFormik } from "formik";
import * as Yup from 'yup';
import { usePetStore } from "../hooks/usePetStore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initialValuesPet as initialValues } from "../assets/data";
import { useEffect } from "react";
import { useOwnerStore } from "../hooks/useOwnerStore";



 
export const PetForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {activePet, startSavingPet, startDeletingPet} = usePetStore();
  const { activeOwner } = useOwnerStore();

  const { handleSubmit, setValues , getFieldProps, errors, touched, resetForm } = useFormik({
      initialValues, 
      onSubmit: values => {
        dispatch(startSavingPet(values))
        if(activePet) navigate(`/owner/${activeOwner.id}`)   
        console.log(values)
      },          
      validationSchema: Yup.object({
        namePet: Yup.string().required('El nombre de la mascota es obligatorio'),
        specie: Yup.string().required('La especie es obligatoria'),
        birthday: Yup.date().required('La fecha de nacimiento es obligatoria').max(new Date()),
        })}
  );

    const handleDeletePet = () =>{
      dispatch(startDeletingPet(activePet))
      resetForm();
  }

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
      {/* {
        activePet && activePet.id && (
          <div className="alert alert-primary d-flex justify-content-center" role="alert">
            <p className="me-4 m-1">Hay una mascota seleccionada actualmente. ¿Quieres crear una nueva?</p>
            <button 
              type="button" 
              className="btn btn-primary align-self-baseline"
              onClick={()=> resetFormValues()}
            >
              Nuevo
            </button>      
          </div> 
        ) 
      } */}
      <form onSubmit={ handleSubmit }>
        <div className="container-fluid m-4">
          <div className="mt-4 mb-4">
            <h2 className="text-center fs-5 fw-bold">Mascota</h2> 
          </div>   
          <div className="row">
            <div className="col form-group m-1">
              <label className="fw-bold">Nombre mascota</label>
              <input type="text"
                className="form-control"
                placeholder="Nombre mascota"
                {...getFieldProps('namePet')}
            />
              { touched.namePet && errors.namePet && <span className='form-error m-1'>{errors.namePet}</span>}
            </div>
            <div className="col form-group m-1 ">
              <label className="fw-bold">Fecha de nacimiento</label>
                <input 
                  type="date" 
                  className="form-control"
                  {...getFieldProps('birthday')} 
                />
            </div>
            <div className="col form-group m-1">
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
            <div className="col form-group m-1">
              <label className="fw-bold">Raza</label>
              <input 
                  type="text"
                  className="form-control"
                  placeholder="Raza"
                  {...getFieldProps('breed')}
              />
              { touched.breed && errors.breed && <span className='form-error m-1'>{errors.breed}</span>}
            </div>
            <div className="col form-group m-1">
              <label className="fw-bold">Capa</label>
              <input 
                  type="text"
                  className="form-control"
                  placeholder="Capa"
                  {...getFieldProps('coat')}
              />
            </div>
            
            <div className="col form-group m-1">
              <label className="fw-bold">Carácter</label>
              <input 
                  type="text"
                  className="form-control"
                  placeholder="Carácter"
                  {...getFieldProps('character')}
              />
            </div>
          </div>
                  
          <div className="row">
            <div className="col form-group m-1">
              <label className="fw-bold">Enfermedades</label>
              <input 
                  type="text"
                  className="form-control"
                  placeholder="Enfermedades"
                  {...getFieldProps('diseases')}
              />
            </div>
            <div className="col form-group m-1">
              <label className="fw-bold">Comentarios</label>
              <textarea
                  rows={2}
                  className="form-control"
                  placeholder="Comentarios"
                  {...getFieldProps('comments')}
              />
            </div>
          </div>
          <div className="form-group m-1 mb-3">
            <label className="fw-bold">Historia Clínica</label>
            <textarea
                rows={5}
                className="form-control"
                placeholder="Historia Clínica"
                {...getFieldProps('history')}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="col-1 btn btn-success m-1">
                  Guardar
            </button>
            <button type="button" className="col-1 btn btn-outline-danger m-1" onClick={()=>{handleDeletePet}}>
                  Eliminar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}



