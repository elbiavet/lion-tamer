import { useEffect } from "react"
import { useFormik } from "formik"
import { useCashModal, useCashRegisterStore, usePetStore } from "../hooks"
import debounce from "debounce"
import { FaSackDollar } from "react-icons/fa6"


export const CashModal = () => {

    const { activePet } = usePetStore();
    const { activeInvoice, setActiveInvoice } = useCashRegisterStore();
    const { tableList, setTableList, serviceResults, searchService, onSelectedService, onDeleteService, addInvoice, getTotal } = useCashModal();

    const { handleSubmit, submitForm, getFieldProps, values, handleChange, resetForm } = useFormik({
        initialValues: {
            search:'',
        }, 
        onSubmit: values => {
            searchService(values.search.toLowerCase())
        },  
    });

    const initialValuesCashModal = {
        date:new Date().toLocaleDateString(),
        consumedServices: [],
        isPaid: false,
        totalCostInvoice: 0 
    }
 
    //debounce
    const debouncedSubmit = debounce(submitForm, 200);

    useEffect(() => {
        if(activeInvoice !== null){
            setTableList(activeInvoice.consumedServices)
        }
       }, [activeInvoice])

    return (
        <>
            <button 
                type="button" 
                className="btn btn-success d-flex align-items-baseline" 
                data-bs-toggle="modal" 
                data-bs-target="#staticBackdropInvoice"
                onClick={()=> {
                    setActiveInvoice(initialValuesCashModal);
                    resetForm();
                }}
            >
                <span className="d-sm-none d-lg-inline me-1">Cobro</span>
                <span className="fs-5"><FaSackDollar /></span>
            </button>
            
            <div className="modal fade" id="staticBackdropInvoice" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropInvoiceLabel" aria-hidden="true">

                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl modal-fullscreen-sm-down">

                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropInvoiceLabel">
                                Facturación de {activePet?.namePet}
                            </h1>
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
                                        tableList && tableList.map(service => (
                                            <tr key={service.code}>
                                                <th scope="row">{service.code}</th>
                                                <td>{service.service}</td>
                                                <td>{service.cost}</td>
                                                <td>{service.units}</td>
                                                <td>{service.totalCostService}</td>
                                                <td 
                                                    id={service.code.toString()} 
                                                    className="btn text-danger fw-bold"
                                                    onClick={(e)=>onDeleteService(e)}
                                                >
                                                    x
                                                </td>
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
                                        <th scope="col">{getTotal(tableList)}</th>
                                        <th scope="col"></th>
                                    </tr>
                                </tfoot>
                            </table>

                            <form className="d-flex flex-column justify-content-center m-5" onSubmit={handleSubmit} role="search">
                                <div className="d-flex">
                                    <input 
                                        type="search" 
                                        className="form-control me-2" 
                                        placeholder="Buscar Servicio o Producto" 
                                        aria-label="Search" 
                                        aria-controls="autocomplete-results"
                                        {...getFieldProps('search')}
                                        onChange={(e) => {
                                            handleChange(e);
                                            debouncedSubmit();
                                        }}
                                    />
                                    <button className="btn btn-outline-custom" type="submit">Buscar</button>
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
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-bs-dismiss="modal"
                            >
                                Cerrar
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-custom" 
                                data-bs-dismiss="modal" 
                                onClick={()=>addInvoice(tableList)}
                                disabled={tableList.length <= 0}
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}