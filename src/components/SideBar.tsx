import { Link } from "react-router-dom";
import { useOwnerStore } from "../hooks/useOwnerStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaUserGroup } from "react-icons/fa6";
import { onSetActiveOwner } from "../store/owners/ownerSlice";
import { usePetStore } from "../hooks/usePetStore";
import { useAuthStore } from "../hooks/useAuthStore";


export const SideBar = () => {

  const { ownerList, activeOwner, startLoadingOwnerList } = useOwnerStore();
  const { uid } = useAuthStore();
  const { activePet } = usePetStore();
  const dispatch = useDispatch();

  useEffect(() => {  
    startLoadingOwnerList()
    }, [uid])

  return (
    <div className="container h-100 border border-2">
        <p className="mt-3 fw-bold">Últimas fichas añadidas</p>

        <p className="mt-3 text-primary">Dueños <FaUserGroup /></p>
          <div className="list-group">
            { ownerList.length > 0 
              ? (
                ownerList.slice(-3).map(owner => 
                  <Link 
                    key={owner.id}
                    to={`/owner/${owner.id}`} 
                    className="list-group-item list-group-item-action" 
                    onClick={()=> dispatch(onSetActiveOwner(owner))}
                  >
                  {owner.ownerFirstName}
                  </Link>)
                )
              : <p>pensando</p>
          }
          </div>


        <p className="mt-3 text-primary">Propietario Activo</p>
        <div className="list-group">
            {activeOwner 
             ?(
              <Link 
                to={`/owner/${activeOwner.id}`} 
                className="list-group-item list-group-item-action"
              >
                {activeOwner.ownerFirstName}
              </Link>
              )
              :(
                <p>Ninguno seleccionado</p>
              ) 
            }
        </div>

        <p className="mt-3 text-primary">Mascota Activa</p>
        <div className="list-group">
            {
            
            activeOwner && activePet?.namePet
              ?( 
                <Link 
                  to={`/owner/${activeOwner.id}`} 
                  className="list-group-item list-group-item-action"
                >
                  {activePet.namePet}
                </Link>
              )
              :(
              <p>Ninguna seleccionada</p>
              )
                
            }
        </div>

    </div>
  )
}