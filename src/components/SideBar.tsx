import { Link } from "react-router-dom";
import { useOwnerStore } from "../hooks/useOwnerStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaCat, FaDog, FaUserGroup } from "react-icons/fa6";
import { onSetActiveOwner } from "../store/owners/ownerSlice";


export const SideBar = () => {

  const { ownerList, activeOwner, startLoadingOwnerList } = useOwnerStore();
  const dispatch = useDispatch();

  useEffect(() => {  
    dispatch(startLoadingOwnerList())
    }, [])

  return (
    <div className="container h-100 border border-2">
        <p className="mt-3 fw-bold">Últimas fichas abiertas</p>

        <p className="mt-3 text-primary">Mascotas <FaCat /><FaDog /></p>
        <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action "/* active */>Michi</a>
            <a href="#" className="list-group-item list-group-item-action">Fufi</a>
            <a href="#" className="list-group-item list-group-item-action">Señor Don Gato</a>
        </div>

        <p className="mt-3 text-primary">Dueños<FaUserGroup /></p>
          <div className="list-group">
            { ownerList.length > 0 && (
                ownerList.slice(-3).map(owner => 
                  <Link 
                    key={owner.id}
                    to={`/owner/${owner.id}`} 
                    className="list-group-item list-group-item-action" 
                    onClick={()=> dispatch(onSetActiveOwner(owner))}
                  >
                  {owner.ownerFirstName}
                  </Link>)
            )}
          </div>

        <p className="mt-3 text-primary">Propietario Activo</p>
        <div className="list-group">
            {activeOwner && 
              <Link 
                to={`/owner/${activeOwner.id}`} 
                className="list-group-item list-group-item-action"
              >
                {activeOwner.ownerFirstName}
              </Link>
            }
        </div>

    </div>
  )
}