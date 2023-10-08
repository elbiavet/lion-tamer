import { useDispatch } from "react-redux";
import { useOwnerStore } from "../hooks/useOwnerStore"
import { usePetStore } from "../hooks/usePetStore";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PetPage } from "./PetPage";
import { onSetActivePet } from "../store/pet/petSlice";


export const ClientPage = () => {

    const {activeOwner, startDeletingOwner} = useOwnerStore();
    const {petList, startLoadingPetList, activePet} = usePetStore();
    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate();
    
    const handleDeleteOwner = () =>{
        dispatch(startDeletingOwner(activeOwner))
    }


    useEffect(() => {
       dispatch(startLoadingPetList(id))
    }, [id])
    
  return (
    
    <div className="container m-4">
        <div className="card">
            <div className="card-header d-flex justify-content-between">
                <h5 className="card-title m-2">{activeOwner?.ownerFirstName} {activeOwner?.ownerLastName}</h5>
                <div className="m-1">
                    <button 
                        type="button" 
                        className="btn btn-outline-primary m-1"
                        onClick={()=> navigate('/owner')}
                        >
                            Editar
                        </button>
                        <button type="button" className="btn btn-outline-danger m-1" onClick={(handleDeleteOwner)}>
                            Eliminar
                    </button>
                </div>  
            </div>
            <div className="card-body">
                
                <div className="card-text">
                    <p className="m-1"><span className="fw-bold">DNI:</span> {activeOwner?.dni}</p>
                    <p className="m-1" ><span className="fw-bold">Email:</span> {activeOwner?.email}</p>
                    <p className="m-1"><span className="fw-bold">Dirección:</span> {activeOwner?.address}</p>

                    <p className="m-1"><span className="fw-bold">Teléfonos de contacto:</span> {activeOwner?.tlf} - {activeOwner?.tlf2}</p>
                    <p className="m-1"><span className="fw-bold">Comentarios:</span> {activeOwner?.commentsOwner}</p>
                    
                    <div className="d-flex justify-content-start">
                    <p className="m-1"><span className="fw-bold">Sus mascotas:</span></p>
                            {
                                petList.map((pet) => 
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-primary m-1" 
                                        key={pet.id}
                                        onClick={()=> dispatch(onSetActivePet({...pet}))}
                                        >
                                            {pet.namePet}
                                        
                                    </button>)
                            } 


        </div>
                </div>
           
            </div>
        </div>

        

        {
            activeOwner && activePet && (
                <PetPage activePet={activePet}/>
            ) 
        } 
       
    


  
    </div>
)}