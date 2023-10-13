import { useFormik } from "formik"
import { Pet, Service } from "../interfaces/appInterfaces"
import { dataServices } from "../assets/data"
import { useState } from "react"
import debounce from "debounce"
import { useCashRegisterStore } from "../hooks/useCashRegisterStore"
// import { TableComponent } from "./TableComponent"


interface Props{
    activePet:Pet|null,
}

export const CashModal = ({ activePet }:Props) => {

    const [serviceResults, setServiceResults] = useState<Service[]>([])
    const [tableList, setTableList] = useState<Service[]>([])
    const {startSavingInvoice} = useCashRegisterStore();
 

    const { handleSubmit, submitForm, getFieldProps, values, handleChange } = useFormik({
        initialValues: {
            search:'',
        }, 
        onSubmit: values => {
            console.log(values.search)
            searchService(values.search.toLowerCase())
        },  
    });
 
    //buscar servicio
    const searchService = (value:string) =>{
        const filteredServices = dataServices.filter(item => item.service.toLowerCase().includes(value));
        setServiceResults(filteredServices);
    }

    //debounce
    const debouncedSubmit = debounce(submitForm, 200);


    const onSelected = (e: React.MouseEvent<HTMLElement>) : void =>{
        
        const target = e.target as HTMLElement;
        const selectedId = target.id;

        if (!selectedId) return;
               
        const newServiceAdded= serviceResults.find(item => `${item.code}` == selectedId);
    
        if (!newServiceAdded) return;
        setTableList(prevTableList => [...prevTableList, newServiceAdded]);

        } 
    
        const onDelete= (e: React.MouseEvent<HTMLElement>) : void =>{

            const target = e.target as HTMLElement;
            const selectedId = target.id;
           
    
            if (!selectedId) return;
            setTableList(tableList.filter(service => `${service.code}` !== selectedId));
        }

        const addInvoice = (tableList:Service[]) =>{
            
            console.log(tableList)
            //startSavingInvoice(invoice)
        }
        

  return (
    <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Facturación
        </button>

        <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Facturación de {activePet?.namePet}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* <TableComponent services={tableList} setServices={setTableList}/> */}

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
                                            <td id={service.code.toString()} className="text-danger fw-bold" onClick={(e)=>onDelete(e)}>x</td>
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
                                        onClick={onSelected}
                                    >
                                        {item.service} - {item.cost}€
                                    </p>
                                )) }
                            </div> 
                        </form>

                        
                        

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>addInvoice(tableList)}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}



 