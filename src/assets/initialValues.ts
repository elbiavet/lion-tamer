import { format } from "date-fns"
import { dateEnd } from "../helpers/dateEnd"
import { CalendarEventInterface, Owner, Pet } from "../interfaces/appInterfaces"

/* CALENDAR */

export const initialValuesCalendar:CalendarEventInterface={
    pet:'',
    start: format(new Date(), 'yyyy-MM-dd hh:mm'),
    end: format(new Date(dateEnd()), 'yyyy-MM-dd hh:mm'),
    title:'',
    notes:''
  }
  

/* OWNER */

export const initialValuesOwner:Owner={
  ownerFirstName:'',
  ownerLastName:'',
  tlf: 0,
  email:'',
  dni:'',
}

export const initialValuesPet:Pet={
    namePet: '',
    specie: '',
    birthday: '',
    castrated: false,
}
