// import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
// import { usePetStore } from "../hooks"
import * as Yup from 'yup';
import { FaMagnifyingGlass } from "react-icons/fa6";


export const PetSearch = () => {

//   const { startSearchingPet } = usePetStore();

//   const navigate = useNavigate();

  const { getFieldProps, touched, errors, handleSubmit, resetForm } = useFormik({
    initialValues:{
        searchingPet:''
    },
    onSubmit: (values) => { 
        // startSearchingPet(ownerID, values.searchingPet) //TODO
        console.log(values.searchingPet)
        resetForm()
        // navigate('/owner-results')
    },
    validationSchema: Yup.object({
        searchingPet: Yup.string().min(1)
      }),
  });

  
  
  return (
        <form className="d-flex" role="search" onSubmit={ handleSubmit }>
            <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Nombre dueño" 
                {...getFieldProps('searchingPet')}
            />
            <button 
                type="submit"
                className="btn btn-outline-custom"
            >
                <FaMagnifyingGlass className="me-0 fs-5"/>
            </button>
            { !touched.searchingPet && <span className='form-error m-1'>{errors.searchingPet}</span>}
        </form>
     )
    }