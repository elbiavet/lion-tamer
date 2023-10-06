import { useDispatch } from "react-redux";
import { usePetStore } from "../hooks/usePetStore"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link } from "react-router-dom";

// import { BsSearchHeart } from "react-icons/bs";

export const PetSearch = () => {

  //const { startSearchingPet, petSearchList } = usePetStore();

//   const dispatch = useDispatch();


  const { getFieldProps, touched, errors, handleSubmit, resetForm } = useFormik({
    initialValues:{
        searchingPet:''
    },
    onSubmit: (values) => { 
        //dispatch(startSearchingPet(values.searchingPet))
        console.log(values.searchingPet)
        resetForm()
    },
    validationSchema: Yup.object({
        searchingPet: Yup.string().min(1)
      }),
  });

  
  return (
    <div className="container m-4">
        
        <form className="form-inline row" onSubmit={ handleSubmit }> 
            <div className="form-group col-6">
            <label className="fw-bold mb-1">Nombre de la mascota</label>
                <div className="d-flex">
                 <input 
                     className="form-control" 
                     type="text" 
                     placeholder="Nombre mascota"
                     {...getFieldProps('searchingPet')}
                 />
                 <button type='submit' className="btn btn-primary col-2">Buscar</button>
                </div>

                 { !touched.searchingPet && <span className='form-error m-1'>{errors.searchingPet}</span>}
                 
            </div>     
            
        
        </form>

        <div className="mt-5">
            <p className="fw-bold">Resultados</p>
            <div className="list-group">
                {/* {
                    petSearchList.map(pet => ( 
                        <Link 
                            key={pet.id}
                            to={`/pet/${pet.id}`} 
                            className="list-group-item list-group-item-action"
                            onClick={()=> dispatch(onSetActivePet(pet))}
                            >
                            <span>{pet.pet}</span>
                        </Link>
                    ))
                } */}
            </div>
        </div>
  </div>
  )
}
