
import { Invoice } from "../interfaces/appInterfaces";
import { useOwnerStore } from "../hooks/useOwnerStore";
import Swal from "sweetalert2";
import { useCashRegisterStore } from "../hooks/useCashRegisterStore";
import { usePetStore } from "../hooks/usePetStore";
import { useEffect } from 'react';
import { BsTrash, BsPencil } from "react-icons/bs";
import { CashModal } from "../components/CashModal";


export const InvoicesPetPage = () => {
    const { activeOwner } = useOwnerStore();
    const { activePet } = usePetStore();
    const {activeInvoice, totalInvoicesPet, startDeletingInvoice, startLoadingInvoiceList, setActiveInvoice } = useCashRegisterStore();

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
        activePet && activePet.id && startLoadingInvoiceList(activePet.id)
    },[activePet])
    
    

  return (
    <>     
        {
            activeOwner && activePet && activePet.id &&
            (
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                    <p className="card-title m-2 text-success fw-bold fs-5">Facturación</p>

                        <div className="d-flex justify-content-end" >
                            <CashModal />
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="card-text row">
                            <div className="col-11 col-sm list-group">
                                
                                { totalInvoicesPet.map((invoice:Invoice) => (
                                    <div 
                                        key={invoice.id} 
                                        className={`list-group-item d-flex justify-content-between ${activeInvoice && activeInvoice.id === invoice.id ? "list-group-item-secondary" : ""}`}
                                        onClick={()=> setActiveInvoice(invoice)}
                                    >
                                        <div className="d-inline"> {/* //TODO */}
                                            <span>{invoice.date}: 
                                                <span className="text-success fw-bold"> {invoice.totalCostInvoice}€ </span>
                                            </span> 
                                            ( {
                                            invoice.consumedServices.map(service => (
                                                <span key={service.code} className="me-1">
                                                    {service.service} 
                                                </span>
                                                ))
                                            })
                                        </div>
                                    
                                        <span>
                                            <button 
                                            type="button" 
                                            className={`btn m-1 ${(activeInvoice && activeInvoice.id === invoice.id) ? "btn-primary" : "btn-outline-secondary" }`}
                                            disabled={!(activeInvoice && activeInvoice.id === invoice.id)}
                                            data-bs-toggle="modal" 
                                            data-bs-target="#staticBackdropInvoice"
                                            >
                                                <BsPencil />
                                            </button>
                                            <button 
                                                type="button" 
                                                className={`btn m-1 ${(activeInvoice && activeInvoice.id === invoice.id) ? "btn-danger" : "btn-outline-secondary" }`}
                                                disabled={!(activeInvoice && activeInvoice.id === invoice.id)}
                                                onClick={()=>deleteInvoice()}
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
