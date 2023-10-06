import { useEffect } from 'react';
import { useFormik } from 'formik';
import Modal from 'react-modal';
import * as Yup from 'yup';
import { format } from 'date-fns';
import { dateEnd } from '../helpers/dateEnd';
import { AiOutlineCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { FormValuesCalendarEvent } from '../interfaces/appInterfaces';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Modal.css'
import { useCalendarStore } from '../hooks/useCalendarStore';
import { useModalStore } from '../hooks/useModalStore';
import { useDispatch } from 'react-redux';


Modal.setAppElement('#root');

const initialValues:FormValuesCalendarEvent={
  pet:'',
  start: new Date(),
  end: new Date(dateEnd()),
  title:'',
  notes:''
}

export const CalendarModal = () => {

    const { activeEvent, startSavingEvent, isEventSaving } = useCalendarStore();
    const { isModalOpen, closeModal, openModal } = useModalStore();
   
    const dispatch = useDispatch();
 

    const { handleSubmit, values, setValues , getFieldProps, errors, touched, resetForm, handleChange } = useFormik({
      initialValues,
      onSubmit: values => { 
        dispatch(startSavingEvent(values))
        closeModal();
        resetForm()
      },
      validationSchema: Yup.object({
          pet: Yup.string().required('El nombre de la mascota es obligatorio'),
          start: Yup.date().required().default(() => new Date()),
          end: Yup.date().required().default(() => new Date(dateEnd()))/* .min(format(dateEnd(), 'yyyy-MM-dd hh:mm') , 'La cita debe tener una duración mínima de 5 minutos')*/,
          title: Yup.string().required('El titulo de la cita es obligatorio')
        }),
    });

    const setOpenModal = () => {
      openModal();
      setValues(initialValues)
    }
  
    const setCloseModal= () => {
      closeModal();
      resetForm()
    }

    useEffect(() => {
      if(activeEvent !== null){
       setValues({...activeEvent})
      }
     }, [activeEvent])
     
    return (
      <div>
        <button className='btn rounded-circle btn-fab' onClick={setOpenModal} disabled={isEventSaving}>
          <AiOutlinePlus />
        </button>
        <Modal
          isOpen={isModalOpen}
          /* onAfterOpen={afterOpenModal} */
          onRequestClose={setCloseModal}
          className='modal'
          overlayClassName='modal-fondo'
          closeTimeoutMS={200}
        >
          <div className='d-flex justify-content-between'>
            <p className='fs-4 fw-bold text-primary'>Nueva Cita</p>
            <button className='btn fs-4 rounded-circle' onClick={closeModal}><AiOutlineCloseCircle /></button>
          </div>
          
          <form onSubmit={ handleSubmit }>

            <div className='form-group mb-2 d-flex flex-column'>
              <label>Fecha y hora inicio</label>
              <input 
                type='datetime-local' 
                className='form-control m-1' 
                name='start'
                value={format(new Date(values.start), 'yyyy-MM-dd HH:mm')} //!OJO, con hh daba problemas de formato
                onChange={handleChange}
                />
                { !touched.start && <span className='form-error m-1'>{JSON.stringify(errors.start)}</span>} 
            </div>

            <div className='form-group mb-2 d-flex flex-column'>
              <label>Fecha y hora fin</label>
              <input 
                type='datetime-local' 
                className='form-control m-1' 
                name='end'
                value={format(new Date(values.end), 'yyyy-MM-dd HH:mm')}
                min={(values.start).toLocaleString()} 
                onChange={handleChange}
                />
              { touched.end && <span className='form-error m-1'>{JSON.stringify(errors.end)}</span>} 
            </div> 

            <div className='form-group mb-2'>
              <label>Nombre mascota</label>
              <input
                  type='text'
                  className='form-control'
                  placeholder='Nombre mascota'
                  {...getFieldProps('pet')}

              />
              { touched.pet && errors.pet && <span className='form-error m-1'>{errors.pet}</span>}
            </div>
        
            {/* <div className='form-group mb-2'>
              <label>Nombre propietario</label>
              <input
                  type='text'
                  className='form-control'
                  placeholder='Nombre propietario'
                  {...getFieldProps('owner')}
              />
                { touched.owner && errors.owner && <span className='form-error m-1'>{errors.owner}</span>}
            </div> */}
            
          <div className='form-group mb-2'>
              <label>Titulo</label>
              <input 
                  type='text' 
                  className='form-control'
                  placeholder='Título del evento'
                  {...getFieldProps('title')}
              />
              { touched.title && errors.title && <span className='form-error m-1'>{errors.title}</span>}
          </div>

          <div className='form-group mb-2'>
            <label>Notas</label>
            <textarea 
              className='form-control'
              placeholder='Notas'
              rows={3}
              {...getFieldProps('notes')}
            />
      
          </div>

          <button type='submit' className='btn btn-outline-primary' disabled={ isEventSaving }>Guardar</button>

          </form>
        </Modal>
      </div>
    )
}


