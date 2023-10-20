import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { useOwnerStore } from "../hooks";
import { onSetActiveOwner } from "../store/owners/ownerSlice";


export const OwnerResults = () => {

    const { ownerSearchList } = useOwnerStore();
    const dispatch = useDispatch();
    
  return (
    <div className="container-fluid m-3 mt-4">
        <h2 className="fs-5 fw-bold">Resultados</h2> 
        {
            ownerSearchList.length === 0
                ? (
                    <div className="alert alert-danger" role="alert">
                        <p>No hay ningún propietario con ese nombre.</p>
                        <p>Por favor, vuelve a intentarlo con el nombre completo.</p>
                    </div>
                )
                : (
                    <div className="list-group">
                        {
                            ownerSearchList.map(owner => ( 
                                <Link 
                                    key={owner.id}
                                    to={`/owner/${owner.id}`} 
                                    className="list-group-item list-group-item-action border-primary"
                                    onClick={()=> dispatch(onSetActiveOwner(owner))}
                                    >
                                    <span>{`${owner.ownerFirstName} ${owner.ownerLastName}`}</span>
                                </Link>
                            ))
                        }
                    </div>
                )
        }
    </div>
    
  )
}
