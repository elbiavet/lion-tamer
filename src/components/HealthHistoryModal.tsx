

import { Pet } from "../interfaces/appInterfaces"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useHealthHistoryStore } from "../hooks/useHealthHistoryStore";
import { FaBookMedical } from "react-icons/fa6";

interface Props{
    activePet: Pet|null,
}

export const HealthHistoryModal = ({ activePet }:Props) => {

    const {startSavingHealthHistory, setActiveHealthHistory } = useHealthHistoryStore();

    const initialValues = {
        visitDate: new Date().toLocaleDateString(),
        reason: '',
        case: ''
    }

    const { handleSubmit, getFieldProps } = useFormik({
        initialValues,
        onSubmit: values => startSavingHealthHistory(values),
        validationSchema: Yup.object({
            reason: Yup.string().required('El motivo de la visita es obligatorio'),
            case: Yup.string().required('La descripción de la visita es obligatoria')
          }), 
    });

    return (
        <>
            <button 
                type="button" 
                className="btn btn-success d-flex align-items-baseline" 
                data-bs-toggle="modal" 
                data-bs-target="#staticBackdropHealthHistory"
                onClick={()=> setActiveHealthHistory(initialValues)}
            >
                <span className="d-sm-none d-lg-inline me-1">Visita</span>
                <span className="fs-5"><FaBookMedical /></span>
            </button>
       
            <div className="modal fade" id="staticBackdropHealthHistory" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropHealthHistoryLabel" aria-hidden="true">

                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl modal-fullscreen-sm-down">

                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropHealthHistoryLabel">
                                Visita médica de {activePet?.namePet}
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={ handleSubmit }>
                                <div className="row">
                                    <div className='form-group mb-2 d-flex flex-column col-3'>
                                        <label className="fw-bold">Fecha de la visita</label>
                                        <span>{new Date().toLocaleDateString()}</span>
                                    </div> 
                                    <div className='form-group mb-2 d-flex flex-column col-9'>
                                        <label className="fw-bold">Motivo de la consulta</label>
                                        <input 
                                            type="text" 
                                            className="form-control me-2" 
                                            {...getFieldProps('reason')}/>
                                    </div>
                                </div>
                                
                                <div className='form-group mb-2 d-flex flex-column'>
                                    <label className="fw-bold">Descripción</label>
                                    <textarea 
                                        rows={10} 
                                        className="form-control me-2" 
                                        {...getFieldProps('case')}/>
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
                                        type="submit" 
                                        className="btn btn-primary" 
                                        data-bs-dismiss="modal" 
                                    >
                                        Aceptar
                                    </button>
                                </div>

                            </form>
                        </div>

                
                    </div>
                </div>
            </div>
        </>
    )
}