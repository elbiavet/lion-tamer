

/* OWNER */

export const initialValuesOwner={
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

export const initialValuesPet={
    // id:'',
    namePet: '',
    specie: '',
    // breed: '',
    // coat: '',
    // character: '',
    birthday: '',
    castrated: false,
    // diseases: [''],
    // diseases: [{
    //   date: '',
    //   diagnosis: ''
    // }],
    // commentsPet: [''],
}

export interface Pet{
  namePet:string,
  specie:string,
  breed?:string,
  coat?:string,
  birthday:string, //! antes estaba en Date
  castrated: boolean,
  character?:string,
  diseases?:string[], //Disease[]
  commentsPet?:string[], 
  history?:string[] //History[] 
}