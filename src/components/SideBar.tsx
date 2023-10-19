import { Link } from "react-router-dom";
import { useOwnerStore } from "../hooks/useOwnerStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaUserGroup, FaPaw, FaUser } from "react-icons/fa6";
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
    <div className="container vh-100 border border-2">

        <p className="mt-3 text-primary d-flex align-items-center">
          <FaUser /> 
          <span className="p-1"> Propietario Activo</span>
        </p>
        <div className="list-group">
            {activeOwner 
             ?(
              <Link 
                to={`/owner/${activeOwner.id}`} 
                className="list-group-item list-group-item-action list-group-item-info"
              >
                {activeOwner.ownerFirstName}
              </Link>
              )
              :(
                <p>Ninguno seleccionado</p>
              ) 
            }
        </div>

        <p className="mt-3 text-primary d-flex align-items-center">
          <FaPaw /> 
          <span className="p-1"> Mascota Activa</span>
        </p>
        <div className="list-group">
            {
            
            activeOwner && activePet?.namePet
              ?( 
                <Link 
                  to={`/owner/${activeOwner.id}`} 
                  className="list-group-item list-group-item-action list-group-item-info"
                >
                  {activePet.namePet}
                </Link>
              )
              :(
              <p>Ninguna seleccionada</p>
              )
                
            }
        </div>

        <p className="mt-3 fw-bold">Últimas fichas añadidas</p>

        <p className="mt-3 text-primary d-flex align-items-center">
          <FaUserGroup /> 
          <span className="p-1"> Dueños</span>
        </p>
        <div className="list-group">
          { ownerList.length > 0 
            ? (
              ownerList.slice(-3).map(owner => 
                <Link 
                  key={owner.id}
                  to={`/owner/${owner.id}`} 
                  className="list-group-item list-group-item-action list-group-item-secondary" 
                  onClick={()=> dispatch(onSetActiveOwner(owner))}
                >
                {owner.ownerFirstName}
                </Link>)
              )
            : <p>Cargando...</p>
        }
        </div>


    </div>
  )
}