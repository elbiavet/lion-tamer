import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCalendarStore, useModalStore } from '../hooks';
import { getMessages, localizer } from '../helpers';
import { CalendarEvent, CalendarModal } from '../components';
import { CalendarEventInterface } from '../interfaces/appInterfaces';
import { FaTrashCan } from "react-icons/fa6";


export const Schedule = () => {

  const {openModal} = useModalStore();
  
  const {eventList, setActiveEvent, activeEvent, hasEventSelected, startDeletingEvent } = useCalendarStore();


  const handleDoubleClick = () => {
    openModal()
  }
  
  const handleSelect = (event: CalendarEventInterface) => {
    setActiveEvent(event)
    console.log(activeEvent)
  }

  const handleDeleteEvent = () =>{
    startDeletingEvent()
  }
  

  return (
    <div className="px-3">

      <Calendar
        localizer={localizer}
        events={eventList}
        //* no funcionaba la opción de la documentación: startAccessor= 'start' y la que si funcionaba daba error de TS: endAccessor={(event)=>new Date(event.end)} 
        startAccessor={(event)=> new Date(`${event.start}`)}   
        endAccessor={(event)=>new Date(`${event.end}`)} 
        style={{ height: "90vh" }}
        culture='es'
        messages={ getMessages() }
       components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ handleDoubleClick }
        onSelectEvent={ handleSelect }
        // onView={ onViewChanged } 
        defaultView={"day"}
        min={new Date(0, 0, 0, 9, 0, 0)}
        max={new Date(0, 0, 0, 21, 0, 0)} 
        //step={15} esto es para que me muestre franjas de media hora
      />

      <CalendarModal />
      {
        hasEventSelected && <button className='btn rounded-circle btn-fab2' onClick={ handleDeleteEvent }><FaTrashCan /></button> 
      }
    </div>
  )
}





