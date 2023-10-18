import { useDispatch, useSelector } from "react-redux"
import { FirebaseDB } from "../firebase/firebaseConfig";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { RootState } from "../store/store"
import { Invoice } from "../interfaces/appInterfaces";
import { onDeleteInvoice, onSetActiveInvoice, setTotalInvoicesPet, onAddNewInvoice, setSavingInvoice, onUpdateInvoice} from "../store/cash/cashRegisterSlice";
import Swal from "sweetalert2";
import { getInvoices } from "../helpers/getInvoices";


export const useCashRegisterStore = () => {

    const { uid } = useSelector((state:RootState) => state.auth)
    const { activeOwner } = useSelector((state:RootState) => state.owner)
    const { activePet } = useSelector((state:RootState) => state.pet)
    const { totalInvoicesPet, activeInvoice, isInvoiceSaving  } = useSelector((state:RootState) => state.cash)
    const dispatch = useDispatch();

    
    const setActiveInvoice = (invoice:Invoice | null) =>{
        dispatch(onSetActiveInvoice(invoice))
    }

    
    //guardar- actualizar facturacion
    const startSavingInvoice = async(invoice:Invoice)=> {
       
        dispatch(setSavingInvoice())
        if(!activeOwner || !activePet) throw new Error("No hay usuario o mascota activos")

        //Actualización
        if( invoice.id){

            const invoiceToFirestore = {...invoice};
            delete invoiceToFirestore.id;
            
            try {
                const docRef = doc(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}/pets/${activePet.id}/invoices/${invoice.id}`);

                await setDoc(docRef, invoiceToFirestore, {merge:true});
                
                invoiceToFirestore.id = docRef.id
 
                dispatch(onUpdateInvoice({...invoiceToFirestore}));
                Swal.fire({
                icon: 'success',
                title: 'Facturación actualizada correctamente',
                showConfirmButton: false,
                timer: 1500
                })
            } catch (error){ 
                Swal.fire({
                    icon: 'error',
                    title: `Error al actualizar la facturacion: ${error}`,
                })
            }   
        } else {
            //*Nueva facturación
            try {
               
                const newDoc = doc(collection(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}/pets/${activePet.id}/invoices/`));
            
                await setDoc(newDoc, invoice);
                invoice.id = newDoc.id
                dispatch(onAddNewInvoice({...invoice}))
            
                Swal.fire({
                icon: 'success',
                title: 'Facturación guardada correctamente',
                showConfirmButton: false,
                timer: 1500
                })
                
            } catch (error){ 
                Swal.fire({
                    icon: 'error',
                    title: `Error al guardar la facturación: ${error}`,
                })
            }  
        }
    };       

//   cargar lista facturación
    const startLoadingInvoiceList = async(petID: string) =>{
        
        if(!uid || !activeOwner || !activeOwner.id || !activePet ) return;
        const ownerID = activeOwner.id

        try{
            const invoices = await getInvoices(uid, ownerID, petID,)
            if(!invoices) return [];
            dispatch(setTotalInvoicesPet(invoices))

        } catch(error){
            console.log(error)
        }
    } 
  

    //borrar una facturación
    const startDeletingInvoice = async() => {
        
        activeInvoice && dispatch(onDeleteInvoice(activeInvoice))
        
            
        try {
            if(!uid || !activeOwner || !activePet || !activeInvoice) return;

            const docRef = doc(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}/pets/${activePet.id}/invoices/${activeInvoice.id}`) 
            
            const resp = await deleteDoc(docRef)
            console.log('Facturación borrada correctamente', resp);
            
            dispatch(onDeleteInvoice(activeInvoice))
            Swal.fire({
                icon: 'success',
                title: 'Facturación eliminada correctamente',
                showConfirmButton: false,
                timer: 1500
              })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `Error al eliminar la facturación: ${error}`,
            })
        }   
     }

    return {
        activeInvoice, 
        isInvoiceSaving, 
        totalInvoicesPet,
        setActiveInvoice,
        startSavingInvoice,
        startLoadingInvoiceList,
        startDeletingInvoice,
  }
}

