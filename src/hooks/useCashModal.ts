
import { Invoice, Service } from "../interfaces/appInterfaces"
import { dataServices } from "../assets/data"
import { useState } from "react"
import { useCashRegisterStore } from "../hooks/useCashRegisterStore"


export const useCashModal = () => {

    const [serviceResults, setServiceResults] = useState<Service[]>([])
    const [tableList, setTableList] = useState<Service[]>([])
    const {startSavingInvoice, activeInvoice } = useCashRegisterStore();
 

        //buscar servicio
        const searchService = (value:string) =>{
            const filteredServices = dataServices.filter(item => item.service.toLowerCase().includes(value));
            setServiceResults(filteredServices);
        }
        
        
        //seleccionar servicio
        const onSelectedService = (e: React.MouseEvent<HTMLElement>) : void => {
            const target = e.target as HTMLElement;
            const selectedId = target.id;
        
            if (!selectedId) return;
        
            const serviceSelected = serviceResults.find(item => `${item.code}` == selectedId);
            if (!serviceSelected) return;
        
            const units = 1;
        
            if (serviceSelected && tableList.find(service => service.code === serviceSelected.code)) {
                
                setTableList(prevTableList => prevTableList.map(element => {
                    if (element.code === serviceSelected.code) {

                        const newServiceAdded: Service = {
                            ...element,
                            units: element.units! + 1,
                            totalCostService: (element.units! + 1) * element.cost
                        }
                        return newServiceAdded;
                        
                    } return element;
                    
                }))
            } else {
                const newServiceAdded: Service = {
                    ...serviceSelected,
                    units: units,
                    totalCostService: units * serviceSelected.cost
                };
        
                setTableList(prevTableList => [...prevTableList, newServiceAdded]);
            }
        }
        

        //borrar servicio
        const onDeleteService= (e: React.MouseEvent<HTMLElement>) : void =>{
            const target = e.target as HTMLElement;
            const selectedId = target.id;
           
    
            if (!selectedId) return;
            setTableList(tableList.filter(service => `${service.code}` !== selectedId));
        }

        //obtener total
        const getTotal = (tableList:Service[])=>{
            const arrayCost = tableList.map(element => element.totalCostService)
            const total = arrayCost.reduce((prev, curr) => {return prev! + curr!}, 0);
            return total
        }
        
        //añadir facturación
        const addInvoice = (tableList:Service[]) =>{

            if(activeInvoice) {
                const newInvoice:Invoice = {
                    id: activeInvoice.id,
                    date: (new Date()).toLocaleDateString(),
                    consumedServices: tableList,
                    isPaid: false,  
                    totalCostInvoice:getTotal(tableList)|| 0
                }
                startSavingInvoice(newInvoice)
            
            } else{
                const newInvoice:Invoice = {
                    date: (new Date()).toLocaleDateString(),
                    consumedServices: tableList,
                    isPaid: false,  
                    totalCostInvoice:getTotal(tableList) || 0
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
        getTotal,
        addInvoice,
  }
}
