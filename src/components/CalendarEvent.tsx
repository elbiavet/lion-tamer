import { CalendarEventInterface } from "../interfaces/appInterfaces"



interface Props{
  event: CalendarEventInterface
}

export const CalendarEvent = ({event}:Props ) => {
    
  return (
    <div className="event">
        <p><strong>{event.pet}: </strong>{event.title}</p>
        <p>{ event.notes }</p>
    </div>
  )
}
