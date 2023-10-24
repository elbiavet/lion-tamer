

export interface CalendarEventInterface{
    id?:string,
    pet:string, //! PONER Pet
    owner?:string,
    start?: string, 
    end?: string, 
    title:string,
    notes?:string
  }

export interface Owner{
  id?:string,
  ownerFirstName: string,
  ownerLastName:string,
  ownerLastName2?:string,
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
  // history?:string[]
 //invoices?:Invoice[]
}

export interface Invoice{
  id?:string,
  date:string,
  consumedServices: Service[],
  isPaid: boolean,
  totalCostInvoice: number 
}

export interface Service{
  code: number,
  service: string,
  cost: number
  units?: number,
  totalCostService?: number
}
  
export interface HealthHistory{
  id?: string,
  visitDate: string,
  reason: string,
  case: string,
} 