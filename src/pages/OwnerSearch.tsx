import { useDispatch } from "react-redux";
import { useOwnerStore } from "../hooks/useOwnerStore"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { onSetActiveOwner } from "../store/owners/ownerSlice";
// import { BsSearchHeart } from "react-icons/bs";

export const OwnerSearch = () => {

  const { startSearchingOwner, ownerSearchList } = useOwnerStore();

  const dispatch = useDispatch();


  const { getFieldProps, touched, errors, handleSubmit, resetForm } = useFormik({
    initialValues:{
        searchingOwner:''
    },
    onSubmit: (values) => { 
        dispatch(startSearchingOwner(values.searchingOwner))
        console.log(values.searchingOwner)
        resetForm()
    },
    validationSchema: Yup.object({
        searchingOwner: Yup.string().min(1)
      }),
  });

  
  return (
    <div className="container m-4">
        
        <form className="form-inline row" onSubmit={ handleSubmit }> 
            <div className="form-group col-6">
            <label className="fw-bold mb-1">Nombre del Propietario</label>
                <div className="d-flex">
                 <input 
                     className="form-control" 
                     type="text" 
                     placeholder="Nombre dueño"
                     {...getFieldProps('searchingOwner')}
                 />
                 <button type='submit' className="btn btn-primary col-2">Buscar</button>
                </div>

                 { !touched.searchingOwner && <span className='form-error m-1'>{errors.searchingOwner}</span>}
                 
            </div>     
            
        
        </form>

        <div className="mt-5">
            <p className="fw-bold">Resultados</p>
            <div className="list-group">
                {
                    ownerSearchList.map(owner => ( 
                        <Link 
                            key={owner.id}
                            to={`/owner/${owner.id}`} 
                            className="list-group-item list-group-item-action"
                            onClick={()=> dispatch(onSetActiveOwner(owner))}
                            >
                            <span>{`${owner.ownerFirstName} ${owner.ownerLastName}`}</span>
                        </Link>
                    ))
                }
            </div>
        </div>
  </div>
  )
}
