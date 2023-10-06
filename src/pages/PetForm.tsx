import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { usePetStore } from "../hooks/usePetStore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initialValuesPet as initialValues } from "../assets/data";
import { useOwnerStore } from "../hooks/useOwnerStore";


export const PetForm = () => {
  const dispatch = useDispatch();
  const {startSavingPet} = usePetStore();
  const {activeOwner} = useOwnerStore();
  const navigate = useNavigate();

  return (
    
      <Formik 
        initialValues={ initialValues }
        onSubmit={values =>{ 
          dispatch(startSavingPet(values))  
          if(activeOwner) navigate(`/owner/${activeOwner.id}`) //TODO: comprobar si funciona, cuota excedida      
        }} 
        validationSchema= {Yup.object({
            namePet: Yup.string().required('El nombre de la mascota es obligatorio'),
            specie: Yup.string().required('La especie es obligatoria'),
            birthday: Yup.date().required('La fecha de nacimiento es obligatoria').max(new Date()),
          })}
      >
        {() => (
          
          <Form>
            <div className="container m-4">
              <div className="row mt-4 mb-4">
                <h2 className="col-10 text-center fs-5 fw-bold">Nueva Mascota</h2> 
                {/* <h2 className="text-center fs-5 fw-bold"> {` ${pets[0].pet} `} {pets[0].specie === 'canino' ? <FaDog /> : <FaCat />}</h2> ) */}
                <button type="submit" className="col-1 btn btn-outline-primary ">
                        Guardar
                  </button>
              </div>   
              <div className="row">
                <div className="col form-group m-1">
                  <label className="fw-bold">Nombre mascota</label>
                  <Field type="text" name="namePet"
                    className="form-control"
                    placeholder="Nombre mascota"
                />
                <span className='form-error m-1'><ErrorMessage name="namePet" /></span>
                </div>

                {/* <div className="col form-group m-1">
                  <label className="fw-bold">Nombre propietario</label>
                  <Field
                      type="text" name="owner"
                      className="form-control"
                      placeholder="Nombre propietario"
                  />
                  <span className='form-error m-1'><ErrorMessage name="owner" /></span>
                </div> */}
              </div>
              <div className="row">
                <div className="col form-group m-1 ">
                  <label className="fw-bold">Fecha de nacimiento</label>
                  <Field type="date" name="birthday" className="form-control" />
                </div>
                <div className="col form-group m-1">
                  <label className="fw-bold">Especie</label>
                  <Field 
                      type="text" name ="specie"
                      className="form-control"
                      placeholder="Especie"
                  />
                  <span className='form-error m-1'><ErrorMessage name="specie" /></span>
                </div>
                  
                <div className="col form-group m-1">
                  <label className="fw-bold">Raza</label>
                  <Field 
                      type="text" name="breed" 
                      className="form-control"
                      placeholder="Raza"
                  />
                  <span className='form-error m-1'><ErrorMessage name="breed" /></span>
                </div>

                <div className="col form-group m-1">
                  <label className="fw-bold">Capa</label>
                  <Field 
                      type="text" name="coat" 
                      className="form-control"
                      placeholder="Capa"
                  />
                </div>
              </div>
                
              <div className="row">
              
              <div className="col form-group m-1">
                <label className="fw-bold">Carácter</label>
                <Field 
                    type="text" name="character"
                    className="form-control"
                    placeholder="Carácter"
                />
              </div>

              <div className="col form-group m-1">
                <label className="fw-bold">Enfermedades</label>
                <Field 
                    type="text" name="diseases"
                    className="form-control"
                    placeholder="Enfermedades"
                />
              </div>

              <div className="col form-group m-1">
                <label className="fw-bold">Comentarios</label>
                <Field as="textarea" name="comments"
                    rows={2}
                    className="form-control"
                    placeholder="Comentarios"
                />
              </div>
            </div>

            <div className="form-group m-1">
                <label className="fw-bold">Historia Clínica</label>
                <Field as="textarea" name="history" 
                    rows={5}
                    className="form-control"
                    placeholder="Historia Clínica"
                />
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-outline-primary m-4">
                Guardar
              </button>
            </div>
          </div>
        </Form>
        
       )}
    </Formik>
    
  )
}



