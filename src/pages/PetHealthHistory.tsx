import { useEffect } from 'react';
import { useOwnerStore, usePetStore,useHealthHistoryStore } from "../hooks";
import Swal from "sweetalert2";
import { HealthHistoryModal } from "../components";
import { HealthHistory } from "../interfaces/appInterfaces";
import { BsPencil, BsTrash } from "react-icons/bs";


export const PetHealthHistory = () => {

    const { activeOwner } = useOwnerStore();
    const { activePet } = usePetStore();
    const { historyList, activeHealthHistory, setActiveHealthHistory, startDeletingHealthHistory, startLoadingHealthHistory } = useHealthHistoryStore();
 

    const deleteHealthHistory = () =>{
        Swal.fire({
            title: '¿Quieres eliminar esta visita médica?',
            text: "No podrás revertirlo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
                startDeletingHealthHistory()
            }
          })
    }

    useEffect(()=>{
        activePet && activePet.id && startLoadingHealthHistory(activePet.id)
    },[activePet])
    
    

  return (
    <>     
    {
        activeOwner && activePet && activePet.id &&
         (
            <div className="card">
                    <div className="card-header d-flex justify-content-between">
                    <p className="card-title m-2 text-custom fw-bold fs-5">Historial de salud</p>

                        <div className="d-flex justify-content-end" >
                            
                            {<HealthHistoryModal activePet={activePet}/>}
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="card-text row">
                            <div className="col-11 col-sm list-group">
                                
                                { historyList.map((history: HealthHistory) => (
                                    <div 
                                        key={history.id} 
                                        className={`list-group-item d-flex justify-content-between ${activeHealthHistory && activeHealthHistory.id === history.id ? "list-group-item-secondary" : ""}`}
                                        onClick={()=> setActiveHealthHistory(history)}
                                    >
                                        <div className="d-inline">
                                            <span>{history.visitDate}: 
                                                <span className="fw-bold"> {history.reason} </span>
                                            </span> 
                                            
                                        </div>
                                    
                                        <span>
                                            <button 
                                            type="button" 
                                            className={`btn m-1 ${(activeHealthHistory && activeHealthHistory.id === history.id) ? "btn-custom" : "btn-outline-secondary" }`}
                                            disabled={!(activeHealthHistory && activeHealthHistory.id === history.id)}
                                            data-bs-toggle="modal" 
                                            data-bs-target="#staticBackdropHealthHistory"
                                            >
                                                <BsPencil />
                                            </button>
                                            <button 
                                                type="button" 
                                                className={`btn m-1 ${(activeHealthHistory && activeHealthHistory.id === history.id) ? "btn-danger" : "btn-outline-secondary" }`}
                                                disabled={!(activeHealthHistory && activeHealthHistory.id === history.id)}
                                                onClick={()=>deleteHealthHistory()}
                                            >
                                                <BsTrash />
                                            </button>
                                        </span>    
                                    </div>) 
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    </>
  )
}
