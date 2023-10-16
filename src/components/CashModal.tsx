import { useFormik } from "formik"
import { Pet } from "../interfaces/appInterfaces"
import debounce from "debounce"
import { useCashModal } from "../hooks/useCashModal"
import { useEffect } from "react"
import { useCashRegisterStore } from "../hooks/useCashRegisterStore"


interface Props{
    activePet:Pet|null,
}

export const CashModal = ({ activePet }:Props) => {

    const { activeInvoice } = useCashRegisterStore();
    const { tableList, setTableList, serviceResults, searchService, onSelectedService, onDeleteService, addInvoice } = useCashModal();

    const { handleSubmit, submitForm, getFieldProps, values, handleChange } = useFormik({
        initialValues: {
            search:'',
        }, 
        onSubmit: values => {
            searchService(values.search.toLowerCase())
        },  
    });
 
    //debounce
    const debouncedSubmit = debounce(submitForm, 200);
    
    useEffect(()=>{
        activeInvoice && activeInvoice.id && setTableList(activeInvoice.consumedServices)
    },[activeInvoice])

  return (
   
        <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Facturación de {activePet?.namePet}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <table className="table">
                            <thead className="table-primary">
                                <tr>
                                <th scope="col">Código</th>
                                <th scope="col">Servicio</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Unidades</th>
                                <th scope="col">Total</th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tableList.map(service => (
                                        <tr key={service.code}>
                                            <th scope="row">{service.code}</th>
                                            <td>{service.service}</td>
                                            <td>{service.cost}</td>
                                            <td>1</td>
                                            <td>35</td>
                                            <td id={service.code.toString()} className="text-danger fw-bold" onClick={(e)=>onDeleteService(e)}>x</td>
                                        </tr>
                                    ))
                                } 
                                
                            </tbody>
                            <tfoot className="table-info">
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col">Total</th>
                                    <th scope="col">160</th>
                                </tr>
                            </tfoot>
                        </table>
                        <form className="d-flex flex-column justify-content-center m-5" role="search" onSubmit={handleSubmit}>
                            <div className="d-flex">
                                <input 
                                    className="form-control me-2" 
                                    type="search" 
                                    placeholder="Buscar Servicio o Producto" 
                                    aria-label="Search" 
                                    aria-controls="autocomplete-results"
                                    {...getFieldProps('search')}
                                    onChange={(e) => {
                                        handleChange(e);
                                        debouncedSubmit();
                                    }}
                                />
                                <button className="btn btn-outline-primary" type="submit">Buscar</button>
                            </div>
                            
                            <div className="list-group row">
                                { values.search !== '' && serviceResults.map(item => (
                                    <p 
                                        id={`${item.code}`}
                                        key={item.code} 
                                        className="list-group-item list-group-item-action m-2"
                                        onClick={onSelectedService}
                                    >
                                        {item.service} - {item.cost}€
                                    </p>
                                )) }
                            </div> 
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>addInvoice(tableList)}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
  )
}



 