import { useDispatch } from "react-redux";
import { useOwnerStore } from "../hooks/useOwnerStore"
import { usePetStore } from "../hooks/usePetStore";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PetPage } from "./PetPage";
import { onSetActivePet } from "../store/pet/petSlice";
import { initialValuesPet } from "../assets/initialValues";


export const ClientPage = () => {

    const { activeOwner, startDeletingOwner } = useOwnerStore();
    const {petList, startLoadingPetList, activePet} = usePetStore();
    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate();
    
    const handleDeleteOwner = () =>{
        startDeletingOwner()
    }

    useEffect(() => {
        id && startLoadingPetList(id)
        dispatch(onSetActivePet(initialValuesPet)) //TODO: esto es lo que hace el resetform de la mascota. cambiar
    }, [id])
    

  return (
    <>
    {
        !activeOwner
            ? (
                <div className="container-fluid m-3 mt-4">
                    <h2 className="fs-5 fw-bold">Resultados</h2> 
                    <div className="alert alert-danger" role="alert">
                        <p> No hay ningún propietario seleccionado.</p>    
                    </div> 
                </div>
            )
            : (
                <div className="container m-2 m-sm-4">
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <h5 className="card-title m-2">{activeOwner?.ownerFirstName} {activeOwner?.ownerLastName}</h5>
                        <div className="m-1">
                            <button 
                                type="button" 
                                className="btn btn-outline-custom m-1"
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
                        
                        <div className="card-text row">
                            <div className="col">
                                <p className="m-1"><span className="fw-bold">DNI:</span> {activeOwner?.dni}</p>
                                <p className="m-1" ><span className="fw-bold">Email:</span> {activeOwner?.email}</p>
                                <p className="m-1"><span className="fw-bold">Dirección:</span> {activeOwner?.address}</p>
        
                                <p className="m-1"><span className="fw-bold">Teléfonos de contacto:</span> {activeOwner?.tlf} - {activeOwner?.tlf2}</p>
                                <p className="m-1"><span className="fw-bold">Comentarios:</span> {activeOwner?.commentsOwner}</p>
                            </div>
                            <div className="col">
                                <p className="m-1"><span className="fw-bold">Sus mascotas:</span></p>
                                    {
                                        activeOwner && petList.map((pet) => 
                                            <button 
                                                type="button" 
                                                className="btn btn-custom m-1" 
                                                key={pet.id}
                                                onClick={()=> {
                                                    dispatch(onSetActivePet({...pet}))
                                                }}
                                            >
                                                {pet.namePet}
                                                
                                            </button>)
                                    } 
                                <div className="mt-3 d-flex align-items-center">
                                    <p className="m-1 fw-bold">¿Otra mascota?</p>
                                    <button 
                                    type="button" 
                                    className="btn btn-warning m-1"
                                    onClick={()=> navigate('/owner')}
                                    >
                                        Nuevo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        
                {
                    activeOwner && activePet && (<PetPage />) 
                } 
        
            </div>
            )
        }
    </>
)}