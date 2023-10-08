import { Link } from "react-router-dom";
import { useOwnerStore } from "../hooks/useOwnerStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaCat, FaDog, FaUserGroup } from "react-icons/fa6";
import { onSetActiveOwner } from "../store/owners/ownerSlice";
import { usePetStore } from "../hooks/usePetStore";


export const SideBar = () => {

  const { ownerList, activeOwner, startLoadingOwnerList } = useOwnerStore();
  const { activePet, petList, lastPets } = usePetStore();
  const dispatch = useDispatch();

  useEffect(() => {  
    dispatch(startLoadingOwnerList())
    }, [])

  return (
    <div className="container vh-100 border border-2">
        <p className="mt-3 fw-bold">Últimas fichas abiertas</p>

        <p className="mt-3 text-primary">Dueños <FaUserGroup /></p>
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

        <p className="mt-3 text-primary">Mascota Activo</p>
        <div className="list-group">
            {activeOwner && 
              <Link 
                to={`/owner/${activeOwner.id}`} 
                className="list-group-item list-group-item-action"
              >
                {activePet?.namePet}
              </Link>
            }
        </div>

    </div>
  )
}