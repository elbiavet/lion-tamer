import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useOwnerStore } from "../hooks/useOwnerStore"
import * as Yup from 'yup';
import { BsSearchHeart } from "react-icons/bs";


export const OwnerSearch = () => {

  const { startSearchingOwner } = useOwnerStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getFieldProps, touched, errors, handleSubmit, resetForm } = useFormik({
    initialValues:{
        searchingOwner:''
    },
    onSubmit: (values) => { 
        dispatch(startSearchingOwner(values.searchingOwner))
        console.log(values.searchingOwner)
        resetForm()
        navigate('/owner-results')
    },
    validationSchema: Yup.object({
        searchingOwner: Yup.string().min(1)
      }),
  });

  
  return (
        <form className="d-flex" role="search" onSubmit={ handleSubmit }>
            <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Nombre dueño" 
                {...getFieldProps('searchingOwner')}
            />
            <button 
                type="submit"
                className="btn btn-primary"
            > Buscar
                {/* <BsSearchHeart className="me-0 fs-5"/> */}
            </button>
            { !touched.searchingOwner && <span className='form-error m-1'>{errors.searchingOwner}</span>}
        </form>
     )
    }