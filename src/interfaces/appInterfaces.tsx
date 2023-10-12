

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
}

  // export interface History{
  //   date: string,
  //   case: string
  // } 

export interface Services{
  code: number,
  service: string,
  cost: number
}
  

export interface OwnerPayment{
  pet:string,
  case:string,
  amount: number
}
