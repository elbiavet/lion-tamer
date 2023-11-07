import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useCalendarStore, useModalStore } from '../hooks';
import { dateEnd } from '../helpers/dateEnd';
import Modal from 'react-modal';
import * as Yup from 'yup';
import '../styles/CalendarModal.css'
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { initialValuesCalendar as initialValues } from '../assets/initialValues';
// import { OwnerSearch } from '../pages';



Modal.setAppElement('#root');


export const CalendarModal = () => {

    const { activeEvent, startSavingEvent, isEventSaving } = useCalendarStore();
    const { isModalOpen, closeModal, openModal } = useModalStore();
    
    const { handleSubmit, values, setValues , getFieldProps, errors, touched, resetForm, handleChange } = useFormik({
      initialValues,
      onSubmit: values => { 
        startSavingEvent(values)
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
          +
        </button>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={setCloseModal}
          className='calendar-modal'
          overlayClassName='calendar-modal-fondo'
          closeTimeoutMS={200}
        >
          <div className='d-flex justify-content-between'>
            <p className='fs-4 fw-bold text-custom'>Nueva Cita</p>
            <button className='btn fs-4 rounded-circle' onClick={closeModal}><AiOutlineCloseCircle /></button>
          </div>
          
          <form onSubmit={ handleSubmit }>

            <div className='d-lg-flex justify-content-start'>
              <div className='form-group mb-2 d-flex flex-column'>
                <label>Fecha y hora inicio</label>
                <input 
                  type='datetime-local' 
                  className='form-control m-1' 
                  name='start'
                  value={values.start}
                  onChange={handleChange}
                  />
                  { !touched.start && <span className='form-error m-1'>{JSON.stringify(errors.start)}</span>} 
              </div>

              <div className='form-group mb-2 d-flex flex-column mx-lg-3'>
                <label>Fecha y hora fin</label>
                <input 
                  type='datetime-local' 
                  className='form-control m-1' 
                  name='end'
                  value={values.end}
                  min={values.start} 
                  onChange={handleChange}
                  />
                { touched.end && <span className='form-error m-1'>{JSON.stringify(errors.end)}</span>} 
              </div> 

            </div>
            
            {/* //!aqui dueño */}
            <div className='form-group mb-2'>
              <label>Nombre dueño</label>
              <input
                  type='text'
                  className='form-control'
                  placeholder='Nombre dueño'
                  {...getFieldProps('owner')}
              />
              {/* <OwnerSearch /> */}
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

          <button type='submit' className='btn btn-outline-custom' disabled={ isEventSaving }>Guardar</button>

          </form>
        </Modal>
      </div>
    )
}


