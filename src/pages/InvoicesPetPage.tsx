
import { Invoice } from "../interfaces/appInterfaces";
import { useOwnerStore } from "../hooks/useOwnerStore";
import Swal from "sweetalert2";
import { useCashRegisterStore } from "../hooks/useCashRegisterStore";
import { usePetStore } from "../hooks/usePetStore";
import { useEffect } from 'react';
import { BsTrash, BsPencil } from "react-icons/bs";


export const InvoicesPetPage = () => {
    const { activeOwner } = useOwnerStore();
    const { activePet } = usePetStore();
    const { totalInvoicesPet, startDeletingInvoice, startLoadingInvoiceList, setActiveInvoice } = useCashRegisterStore();


    const deleteInvoice = () =>{
        Swal.fire({
            title: '¿Quieres eliminar a esta facturación?',
            text: "No podrás revertirlo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
                startDeletingInvoice()
            }
          })
    }

    useEffect(()=>{
        if(!activePet || !activePet.id) return
        startLoadingInvoiceList(activePet.id)
    },[])
    

  return (
    <>     
    {
        activeOwner && activePet && activePet.id &&
         (
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <p className="card-title m-2"><span className="text-primary fw-bold fs-5 me-4">Facturación</span>{activePet?.namePet} </p>
 
                </div>
                <div className="card-body">
                    <div className="card-text row">
                        <div className="col-11 col-sm list-group">
                            
                            { totalInvoicesPet.map((invoice:Invoice) => (
                                <div 
                                    key={invoice.id} 
                                    className="list-group-item d-flex justify-content-between"
                                    onClick={()=> setActiveInvoice(invoice)}
                                >
                                    <div className="d-inline">
                                        <span className="fw-bold">{invoice.date.slice(0,10)}: </span> 
                                        {
                                        invoice.consumedServices.map(service => (
                                            <span key={service.code} >{service.service} - {service.cost} </span>
                                            ))
                                        }
                                    </div>
                                    <span className="">
                                        <button 
                                            type="button" 
                                            className="btn btn-outline-primary m-1"
                                            data-bs-toggle="modal" 
                                            data-bs-target="#staticBackdrop"
                                        >
                                            <BsPencil />
                                        </button>
                                        <button 
                                            type="button" 
                                            className="btn btn-outline-danger m-1" 
                                            onClick={()=>deleteInvoice()}>
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
