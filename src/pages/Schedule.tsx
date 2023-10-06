
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCalendarStore } from '../hooks/useCalendarStore';
import { useModalStore } from '../hooks/useModalStore';
import { useDispatch } from 'react-redux';
import { getMessages } from '../helpers/getMessages';
import { CalendarEvent } from '../components/CalendarEvent';
import { CalendarModal } from '../components/CalendarModal';
import { localizer } from '../helpers/localizer';
import { CalendarEventInterface } from '../interfaces/appInterfaces';
import { FaTrashCan } from "react-icons/fa6";


export const Schedule = () => {

  // const [lastView, setLastView] = useState(localStorage.getItem('lastView')|| 'agenda')

  /* const eventStyleGetter = ( event: CalendarEvent) =>{ //event: event,start,end,isSelected
    console.log(event)

  } */

  const {openModal} = useModalStore();
  
  const {eventList, setActiveEvent, activeEvent, hasEventSelected, startDeletingEvent } = useCalendarStore();


  const dispatch = useDispatch()

  const handleDoubleClick = () => {
    openModal()
  }
  
  const handleSelect = (event: CalendarEventInterface) => {
    setActiveEvent(event)
    console.log(activeEvent)
  }


  const handleDeleteEvent = () =>{
    dispatch(startDeletingEvent())
  }
  

  // const onViewChanged = (view:View) => {
  //   localStorage.setItem('lastView', view)
  //   setLastView( view )
  // }

  return (
    <div>

      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor= {(event)=> new Date(event.start)}  // startAccessor= 'start'
        endAccessor={(event)=> new Date(event.end)} // endAccessor='end'
        style={{ height: 590 }}
        culture='es'
        messages={ getMessages() }
        //TODO: style para eventos: eventPropGetter={ eventStyleGetter }  
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





