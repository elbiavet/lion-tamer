
import { Invoice, Service } from "../interfaces/appInterfaces"
import { dataServices } from "../assets/data"
import { useState } from "react"
import { useCashRegisterStore } from "../hooks/useCashRegisterStore"


export const useCashModal = () => {

    const [serviceResults, setServiceResults] = useState<Service[]>([])
    const [tableList, setTableList] = useState<Service[]>([])
    const {startSavingInvoice, activeInvoice} = useCashRegisterStore();
 

        //buscar servicio
        const searchService = (value:string) =>{
            const filteredServices = dataServices.filter(item => item.service.toLowerCase().includes(value));
            setServiceResults(filteredServices);
        }
    
        //seleccionar servicio
        const onSelectedService = (e: React.MouseEvent<HTMLElement>) : void =>{
            
            const target = e.target as HTMLElement;
            const selectedId = target.id;
    
            if (!selectedId) return;
                   
            const newServiceAdded= serviceResults.find(item => `${item.code}` == selectedId);
        
            if (!newServiceAdded) return;
            setTableList(prevTableList => [...prevTableList, newServiceAdded]);
    
        } 

        //borrar servicio
        const onDeleteService= (e: React.MouseEvent<HTMLElement>) : void =>{
            const target = e.target as HTMLElement;
            const selectedId = target.id;
           
    
            if (!selectedId) return;
            setTableList(tableList.filter(service => `${service.code}` !== selectedId));
        }
        
        //añadir facturación
        const addInvoice = (tableList:Service[]) =>{

            if(activeInvoice) {
                const newInvoice:Invoice = {
                    id: activeInvoice.id,
                    date: (new Date()).toLocaleString(),
                    consumedServices: tableList,
                    isPaid: false,  
                }
                startSavingInvoice(newInvoice)
            } else{
                const newInvoice:Invoice = {
                    date: (new Date()).toLocaleString(),
                    consumedServices: tableList,
                    isPaid: false,  
                }
                startSavingInvoice(newInvoice)
            }
        }
            
    
    return {
        tableList,
        setTableList,
        serviceResults,
        searchService,
        onSelectedService,
        onDeleteService,
        addInvoice,
  }
}
