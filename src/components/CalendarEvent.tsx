import { CalendarEventInterface } from "../interfaces/appInterfaces"



interface Props{
  event: CalendarEventInterface
}

export const CalendarEvent = ({event}:Props ) => {
    
  return (
    <div className="event">
        <p><span className="fw-bold">{event.pet}</span>{event.owner && <span> ({event.owner})</span>} : {event.title}</p>
        <p>{ event.notes }</p>
    </div>
  )
}
