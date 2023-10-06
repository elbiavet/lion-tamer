import { useDispatch } from "react-redux";
import { useOwnerStore } from "../hooks/useOwnerStore"
import { usePetStore } from "../hooks/usePetStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { petList1 } from '../assets/data';


export const ClientPage = () => {

    const {activeOwner, startDeletingOwner, ownerList} = useOwnerStore();
    const {petList, startLoadingPetList} = usePetStore();
    
    const dispatch = useDispatch();
    
    const handleDeleteOwner = () =>{
        dispatch(startDeletingOwner(activeOwner))
    }

    const {id} = useParams();
 

    useEffect(() => {
       dispatch(startLoadingPetList(id))
    }, [id, petList])
    
  return (
    
    <div className="container m-4">

        <div className="row mt-4 mb-4">
          <h2 className="col-9 text-center fs-5 fw-bold">Ficha del Propietario</h2> 
    
          <button type="button" className="col-1 btn btn-outline-primary m-1">
                  Editar
            </button>
            <button type="button" className="col-1 btn btn-outline-danger m-1" onClick={(handleDeleteOwner)}>
                  Eliminar
            </button>
        </div>  
    
        <div className="row">
            <p className="col-5 m-1"><span className="fw-bold">Nombre: </span>{activeOwner?.ownerFirstName} {activeOwner?.ownerLastName}</p>
            <p className="col-5 m-1"><span className="fw-bold">DNI:</span> {activeOwner?.dni}</p>
        </div>

        <div className="row">
            <p className="col-4 m-1" ><span className="fw-bold">Email:</span> {activeOwner?.email}</p>
            <p className="col-7 m-1"><span className="fw-bold">Dirección:</span> {activeOwner?.address}</p>
        </div>

        <div className="row">            
            <p className="col-4 m-1"><span className="fw-bold">Teléfonos de contacto:</span> {activeOwner?.tlf} - {activeOwner?.tlf2}</p>
            <p className="col-7 m-1"><span className="fw-bold">Comentarios:</span> {activeOwner?.commentsOwner}</p>
        </div>
        

        {
            petList.map((pet) => <p className="btn btn-outline-primary" key={pet.id}>{pet.namePet}</p>)
        }
    
    </div>
)}