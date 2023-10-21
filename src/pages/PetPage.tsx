import { useNavigate } from "react-router-dom";
import { useOwnerStore, usePetStore } from "../hooks";
import Swal from "sweetalert2";
import { InvoicesPetPage } from "./InvoicesPetPage";
import { PetHealthHistory } from "./PetHealthHistory";
import { getBirthday } from "../helpers";
import { format } from "date-fns";


export const PetPage = () => {
    const { activeOwner } = useOwnerStore();
    const { activePet, startDeletingPet } = usePetStore();
    const navigate = useNavigate();

    const deletePetModal = () =>{
        Swal.fire({
            title: '¿Quieres eliminar a esta mascota?',
            text: "No podrás revertirlo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
              startDeletingPet()
            }
          })
    }

  return (
    <>     
    {
        activeOwner && activePet && activePet.id 
        ? (
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <p className="card-title m-2"><span className="text-custom fw-bold fs-5 me-4">{activePet?.namePet.toUpperCase()}</span> ({activeOwner.ownerFirstName} {activeOwner.ownerLastName})</p>
                    <div className="m-1">
                        <button 
                            type="button" 
                            className="btn btn-outline-custom m-1"
                            onClick={()=> navigate('/pet')}
                        >
                            Editar
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-outline-danger m-1" 
                            onClick={()=>deletePetModal()}>
                            Eliminar
                        </button>
                    </div>  
                </div>
                <div className="card-body">
                    <div className="card-text row">
                        <div className="col-5 col-sm">
                            <p className="m-1">
                                <span className="fw-bold me-1">Edad:</span>     
                                {getBirthday(activePet?.birthday)}
                                </p>
                            <p className="m-1">
                                <span className="fw-bold me-1">Fecha nacimiento:</span> 
                                {format(new Date(activePet?.birthday), "dd-MM-yyyy")} 
                            </p>
                            <p className="m-1"><span className="fw-bold">Especie:</span> {activePet?.specie}</p>
                            <p className="m-1" ><span className="fw-bold">Raza:</span> {activePet?.breed}</p>
                            
                            <p className="m-1"><span className="fw-bold">Comentarios:</span> {activePet?.commentsPet}</p>
                        </div>
                        <div className="col-5 col-sm">
                            <p className="m-1"><span className="fw-bold">Castrado:</span> 
                                {`${activePet.castrated}` == 'true' ? <> Si</> : <> No</>}
                            </p>
                            <p className="m-1"><span className="fw-bold">Capa:</span> {activePet?.coat}</p>
                            <p className="m-1"><span className="fw-bold">Carácter</span> {activePet?.character} </p> 
                        </div>
                    </div>
               
                </div>
                <PetHealthHistory />
                <InvoicesPetPage />
            </div>
        )
        : (
            <div className="container-fluid mt-4">
                <h2 className="fs-5 fw-bold">Resultados</h2> 
                <div className="alert alert-danger" role="alert">
                    <p className="m-2"> No hay ninguna mascota seleccionada. Por favor, busca en la ficha del propietario.</p>    
                </div> 
            </div>
        )    
    }
    </>
  )
}
