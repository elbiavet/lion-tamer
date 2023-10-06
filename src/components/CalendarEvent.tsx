import { FormValuesCalendarEvent } from "../interfaces/appInterfaces"



interface Props{
  event: FormValuesCalendarEvent
}

export const CalendarEvent = ({event}:Props ) => {
    
  return (
    <div className="event">
        <p><strong>{event.pet}: </strong>{event.title}</p>
        <p>{ event.notes }</p>
    </div>
  )
}
