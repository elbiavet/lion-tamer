export const dateEnd = () =>{
    const initialDate = new Date();
    const endDate = initialDate.setMinutes(initialDate.getMinutes() + 5);
    return endDate;
  }