import { useFormik } from "formik"
import { Pet, Services } from "../interfaces/appInterfaces"
import { dataServices } from "../assets/data"
import { useState } from "react"

interface Props{
    activePet:Pet|null,
}

export const CashModal = ({ activePet }:Props) => {

    const [serviceResults, setServiceResults] = useState<Services[]>([])

    const searchService = (value:string) =>{

        const filteredServices = dataServices.filter(item => item.service.includes(value));
        setServiceResults(filteredServices);
    }



    const {handleChange, handleSubmit, getFieldProps} = useFormik({
        initialValues: {
            search:'',
        }, 
        onSubmit: values => {
            searchService(values.search)
        },  
    });

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
                        <table className="table">
                            <thead className="table-primary">
                                <tr>
                                <th scope="col">Código</th>
                                <th scope="col">Servicio</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Unidades</th>
                                <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">1</th>
                                <td>Consulta</td>
                                <td>35</td>
                                <td>1</td>
                                <td>35</td>
                                </tr>
                                <tr>
                                <th scope="row">5</th>
                                <td>Vacuna</td>
                                <td>25</td>
                                <td>1</td>
                                <td>25</td>
                                </tr>
                                <tr>
                                <th scope="row">11</th>
                                <td>Castración gato macho</td>
                                <td>100</td>
                                <td>1</td>
                                <td>100</td>
                                </tr>
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

                        <form className="d-flex justify-content-center m-5" role="search" onSubmit={handleSubmit}>
                            <input 
                                className="form-control me-2" 
                                type="search" 
                                placeholder="Buscar Servicio o Producto" 
                                aria-label="Search" 
                                {...getFieldProps('search')}
                            />
                            <button className="btn btn-outline-primary" type="submit">Buscar</button>
                            
                            { JSON.stringify(serviceResults) }
                        </form>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}


