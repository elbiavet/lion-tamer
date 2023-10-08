
export interface FormValuesCalendarEvent{
    pet:string,
    start: Date, 
    end: Date, 
    title:string,
    notes?:string
  }

  export interface CalendarEventInterface{
    id?:string,
    pet:string, //! PONER Pet
    start: Date, 
    end: Date, 
    title:string,
    notes?:string
  }

  
  export interface Pet{
    id?: string,
    namePet:string,
    specie:string,
    breed?:string,
    coat?:string,
    castrated: boolean,
    birthday:string, //! antes estaba en Date
    character?:string,
    diseases?:string[], //Disease[]
    commentsPet?:string[], 
    history?:string[] //History[] 
  }

  // export interface Disease{
  //   date: string,
  //   diagnosis: string
  // } 

  // export interface History{
  //   date: string,
  //   case: string
  // } 

  export interface Owner{
    id?:string,
    ownerFirstName: string,
    ownerLastName:string,
    dni:string,
    address?:string,
    tlf: number,
    tlf2?:number,
    email:string,
    commentsOwner?:string,
    // pets?:Pet[]
  }
    