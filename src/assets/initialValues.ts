/* CALENDAR */

export const initialValuesCalendar:CalendarEventInterface={
    pet:'',
    start: format(new Date(), 'yyyy-MM-dd hh:mm'),
    end: format(new Date(dateEnd()), 'yyyy-MM-dd hh:mm'),
    title:'',
    notes:''
  }
  

import { format } from "date-fns"
/* OWNER */

import { CalendarEventInterface, Owner, Pet } from "../interfaces/appInterfaces"
import { dateEnd } from "../helpers/dateEnd"

export const initialValuesOwner:Owner={
  ownerFirstName:'',
  ownerLastName:'',
  // address:'',
  tlf: 0,
  // tlf2: 0,
  email:'',
  dni:'',
  // commentsOwner:'',
  
  // pets:[{
  //   id:'',
  //   namePet: '',
  //   specie: '',
  //   breed: '',
  //   coat: '',
  //   character: '',
  //   birthday: '',
  //   castrated: false,
  //   diseases: [{
  //       date: '',
  //       diagnosis: ''
  //     }],
  //   commentsPet: [''],
  // },]
}

export const initialValuesPet:Pet={
    // id:'',
    namePet: '',
    specie: '',
    // breed: '',
    // coat: '',
    // character: '',
    birthday: '',
    castrated: false,
    // diseases: [{
    //   date: '',
    //   diagnosis: ''
    // }],
    // commentsPet: [''],
}
