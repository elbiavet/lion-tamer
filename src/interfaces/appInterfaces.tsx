

export interface CalendarEventInterface{
    id?:string,
    pet:string, //! PONER Pet
    start?: string, 
    end?: string, 
    title:string,
    notes?:string
  }

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
  //invoices:Invoice[]
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
  commentsPet?:string[], 
  history?:string[] //History[] 
 //invoices?:Invoice[]
}

  // export interface History{
  //   date: string,
  //   case: string
  // } 

export interface Invoice{
  id?:string,
  date:string,
  consumedServices: Service[],
  //total: number
  isPaid: boolean
}

export interface Service{
  code: number,
  service: string,
  cost: number
}
  