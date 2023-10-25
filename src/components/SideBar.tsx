import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useOwnerStore, usePetStore, useAuthStore } from "../hooks";
import { FaUserGroup, FaPaw, FaUser } from "react-icons/fa6";



export const SideBar = () => {

  const { ownerList, activeOwner, setActiveOwner, startLoadingOwnerList, ownerLastList, createOwnersList } = useOwnerStore();
  const { uid } = useAuthStore();
  const { activePet } = usePetStore();


  useEffect(() => {  
    startLoadingOwnerList()
    }, [uid])

    useEffect(()=>{
      activeOwner && createOwnersList(activeOwner)
  },[activeOwner])


  return (
    <div className="container vh-100 border border-2">
      <div className="m-3">
        <p className="text-custom d-flex align-items-center">
          <FaUser /> 
          <span className="p-1"> Propietario Actual</span>
        </p>
        <div className="list-group">
            {activeOwner && activeOwner.ownerFirstName.length > 1 
             ?(
              <Link 
                to={`/owner/${activeOwner.id}`} 
                className="list-group-item list-group-item-action list-group-item-custom"
              >
                {activeOwner.ownerFirstName}
              </Link>
              )
              :(
                <p>Ninguno seleccionado</p>
              ) 
            }
        </div>

        <p className="mt-3 text-custom d-flex align-items-center">
          <FaPaw /> 
          <span className="p-1"> Mascota Actual</span>
        </p>
        <div className="list-group">
            {
            
            activeOwner && activePet?.namePet
              ?( 
                <Link 
                  to={`/pet/${activePet.id}`} 
                  className="list-group-item list-group-item-action list-group-item-custom"
                >
                  {activePet.namePet}
                </Link>
              )
              :(
              <p>Ninguna seleccionada</p>
              )
                
            }
        </div>

        <p className="mt-3 fw-bold">Últimas fichas</p>

        <p className="mt-3 text-custom d-flex align-items-center">
          <FaUserGroup /> 
          <span className="p-1"> Dueños</span>
        </p>
        <div className="list-group">
          { 
            ownerLastList.length > 0 
              ? (
                ownerLastList.slice(-3).map(owner => 
                  <Link 
                    key={owner.id}
                    to={`/owner/${owner.id}`} 
                    className="list-group-item list-group-item-action list-group-item-secondary" 
                    onClick={()=> setActiveOwner(owner)}
                  >
                  {owner.ownerFirstName}
                  </Link>)
                )
              : (
        
                ownerList.length > 0 && ownerList.slice(-3).map(owner => 
                  <Link 
                    key={owner.id}
                    to={`/owner/${owner.id}`} 
                    className="list-group-item list-group-item-action list-group-item-secondary" 
                    onClick={()=> setActiveOwner(owner)}
                  >
                  {owner.ownerFirstName}
                  </Link>)
              
                )
            }
        </div>
      </div>
    </div>
  )
}