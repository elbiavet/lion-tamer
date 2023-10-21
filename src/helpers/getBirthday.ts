
import { differenceInYears, differenceInMonths } from "date-fns";

export const getBirthday = (date:string) =>{

    const dateBirthday = new Date(date);
    const today = new Date();

    const ageInYears = differenceInYears(today, dateBirthday);

    if(ageInYears === 1){
        return `${ageInYears} año`
    } else if(ageInYears > 1){
        return `${ageInYears} años`
    } else if(ageInYears < 1){
        const ageInMonths = differenceInMonths(today, dateBirthday);
        return `${ageInMonths} meses` 
    }
}

