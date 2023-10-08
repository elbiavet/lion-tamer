import { useDispatch } from "react-redux";
import { useOwnerStore } from "../hooks/useOwnerStore";
import { usePetStore } from "../hooks/usePetStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Pet } from "../interfaces/appInterfaces";

interface Props{
    activePet:Pet|null,
}

export const PetPage = ({activePet}:Props) => {
    // const {activeOwner, startDeletingOwner} = useOwnerStore();
    const {petList, startLoadingPetList, startDeletingPet} = usePetStore();
    const dispatch = useDispatch();
    // const {id} = useParams();
    const navigate = useNavigate();
    
    const handleDeletePet = () =>{
        dispatch(startDeletingPet(activePet))
    }


    // useEffect(() => {
    //    dispatch(startLoadingPetList(id))
    // }, [id])

  return (
    <div className="card">
    { activePet !== null 
        ? (<>
            <div className="card-header d-flex justify-content-between">
                <h5 className="card-title m-2">{activePet?.namePet}</h5>
                <div className="m-1">
                    <button 
                        type="button" 
                        className="btn btn-outline-primary m-1"
                        onClick={()=> navigate('/owner')}
                        >
                            Editar
                        </button>
                        <button type="button" className="btn btn-outline-danger m-1" onClick={()=>handleDeletePet()}>
                            Eliminar
                    </button>
                </div>  
            </div>
            <div className="card-body">
                
                <div className="card-text">
                    <p className="col-5 m-1"><span className="fw-bold">Edad:</span> {activePet?.birthday}</p>
                    <p className="col-5 m-1"><span className="fw-bold">Castrado:</span> {activePet?.castrated}</p>
                    <p className="col-5 m-1"><span className="fw-bold">Especie:</span> {activePet?.specie}</p>
                    <p className="col-4 m-1" ><span className="fw-bold">Raza:</span> {activePet?.breed}</p>
                    <p className="col-7 m-1"><span className="fw-bold">Capa:</span> {activePet?.coat}</p>
                    <p className="col-4 m-1"><span className="fw-bold">Character</span> {activePet?.character} </p> 
                    <p className="col-7 m-1"><span className="fw-bold">Enfermedades:</span> Hacer un map</p>
                    <p className="col-7 m-1"><span className="fw-bold">Comentarios:</span> {activePet?.commentsPet}</p>
                </div>
            </div></>
        )
        : ( 
            <div className="container-fluid m-3 mt-4">
                <p className="fw-bold">Resultados</p>
                <div className="alert alert-danger" role="alert">
                    <p>No hay ninguna mascota seleccionada.</p>
                    <p>Por favor, busca la ficha del propietario.</p>
                </div>
            </div>
        )
    
    }
    </div>
  )
}
