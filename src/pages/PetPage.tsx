import { useDispatch } from "react-redux";
import { usePetStore } from "../hooks/usePetStore";
import { useNavigate } from "react-router-dom";
import { Pet } from "../interfaces/appInterfaces";
import { useOwnerStore } from "../hooks/useOwnerStore";

interface Props{
    activePet:Pet|null,
}

export const PetPage = ({ activePet }:Props) => {
    const { activeOwner } = useOwnerStore();
    const {startDeletingPet} = usePetStore();
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <>     
    {
        activeOwner && activePet && activePet.id 
        ? (
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <p className="card-title m-2"><span className="text-primary fw-bold fs-5 me-4">{activePet?.namePet.toUpperCase()}</span> ({activeOwner.ownerFirstName} {activeOwner.ownerLastName})</p>
                    <div className="m-1">
                        <button 
                            type="button" 
                            className="btn btn-outline-primary m-1"
                            onClick={()=> navigate('/owner')}
                            >
                                Editar
                            </button>
                            <button type="button" className="btn btn-outline-danger m-1" onClick={()=>dispatch(startDeletingPet(activePet))}>
                                Eliminar
                        </button>
                    </div>  
                </div>
                <div className="card-body">
                    <div className="card-text row">
                        <div className="col">
                            <p className="m-1"><span className="fw-bold">Edad:</span> {activePet?.birthday}</p>
                            <p className="m-1"><span className="fw-bold">Castrado:</span> {activePet?.castrated}</p>
                            <p className="m-1"><span className="fw-bold">Especie:</span> {activePet?.specie}</p>
                            <p className="m-1" ><span className="fw-bold">Raza:</span> {activePet?.breed}</p>
                            <p className="m-1"><span className="fw-bold">Capa:</span> {activePet?.coat}</p>
                            <p className="m-1"><span className="fw-bold">Character</span> {activePet?.character} </p> 
                            <p className="m-1"><span className="fw-bold">Enfermedades:</span> Hacer un map</p>
                            <p className="m-1"><span className="fw-bold">Comentarios:</span> {activePet?.commentsPet}</p>
                        </div>
                        <div className="col">
                            <p className="m-1"><span className="fw-bold">Historia Clínica:</span> {activePet?.history}</p> 
                        </div>
                    </div>
                </div>
            </div>
        )
        : (
            <div className="container-fluid mt-4">
                <h2 className="fs-5 fw-bold">Resultados</h2> 
                <div className="alert alert-danger" role="alert">
                    <p className="m-2"> No hay ninguna mascota seleccionada. Por favor, busca en la ficha del propietario.</p>    
                </div> 

                {/* <div className="alert alert-primary d-flex" role="alert">
                    <p className="m-1 me-3">No hay un propietario seleccionado actualmente. ¿Quieres crear uno nuevo?</p>
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={()=> resetFormValues()}
                    >
                    Nuevo
                    </button>      
                </div>  */}
            </div>
        )    
    }
    </>
  )
}
