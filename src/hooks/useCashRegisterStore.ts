import { useDispatch, useSelector } from "react-redux"
import { FirebaseDB } from "../firebase/firebaseConfig";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { RootState } from "../store/store"
import { Invoice, Service } from "../interfaces/appInterfaces";

import { onDeleteInvoice, onSetActiveInvoice, setTotalInvoicesDay, onAddNewInvoice, onUpdateEvent, onSetActiveInvoice} from "../store/cash/cashRegisterSlice";
import Swal from "sweetalert2";


export const useCashRegisterStore = () => {

    const { uid } = useSelector((state:RootState) => state.auth)
    const { activeOwner, isOwnerSaving, ownerList, ownerSearchList } = useSelector((state:RootState) => state.owner)
    const { activePet, isPetSaving, petList } = useSelector((state:RootState) => state.pet)
    const { activeInvoice, totalInvoicesDay } = useSelector((state:RootState) => state.cash)
    const dispatch = useDispatch();

    

    //Cobro activo
    const setActiveInvoice = (invoice:Invoice) =>{
        dispatch(onSetActiveInvoice(invoice))
    }

    
  //guardar- actualizar facturacion
  const startSavingInvoice = async(tableList:Service[])=> {
       
    try {
        if(activeOwner && activePet){
            const newDoc = doc(collection(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}/pets/${activePet.id}/invoices/`));
        
            //TODO: crear el Invoice
            await setDoc(newDoc, tableList);
            tableList.id = newDoc.id
            
            dispatch(onAddNewInvoice({...tableList}))
            dispatch(onSetActiveInvoice({...tableList}))
        
            Swal.fire({
            icon: 'success',
            title: 'Facturación guardada correctamente',
            showConfirmButton: false,
            timer: 1500
            })
        }
    } catch (error){ 
        Swal.fire({
            icon: 'error',
            title: `Error al guardar la facturación: ${error}`,
        })
    }  }

//     dispatch(setSavingInvoice())
    
//     //Actualización
//     if( invoice.id){
//         const invoiceToFirestore = {...invoice};
//         delete invoiceToFirestore.id;
//         try {
//             if(!activeOwner) throw new Error("No hay usuario activo")
//             const docRef = doc(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}/invoices/${invoice.id}`);
//             const resp = await setDoc(docRef, invoiceToFirestore, {merge:true});
//             console.log('Documento actualizado correctamente', resp);
            
//             invoiceToFirestore.id = docRef.id
//             console.log(invoiceToFirestore)
//             dispatch(onUpdateInvoice({...invoiceToFirestore}));
//             Swal.fire({
//               icon: 'success',
//               title: 'Mascota actualizada correctamente',
//               showConfirmButton: false,
//               timer: 1500
//             })
//     } catch (error){ 
//           Swal.fire({
//               icon: 'error',
//               title: `Error al actualizar la facturacion: ${error}`,
//           })
//       }   
//     } else {
//         //*Nueva facturacion
//         try {
//           if(activeOwner){
//             const newDoc = doc(collection(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}/invoices`));
         
//             await setDoc(newDoc, invoice);
//             invoice.id = newDoc.id
            
//             dispatch(onAddNewInvoice({...invoice}))
//             dispatch(onSetActiveInvoice({...invoice}))
           
//             Swal.fire({
//               icon: 'success',
//               title: 'Mascota guardada correctamente',
//               showConfirmButton: false,
//               timer: 1500
//             })
//           }
//       } catch (error){ 
//           Swal.fire({
//               icon: 'error',
//               title: `Error al guardar la facturacion: ${error}`,
//           })
//       }  
//     }       
//   };

//   //cargar lista facturacions
//   const startLoadingInvoiceList = async(ownerID: string) =>{
      
//     if(!uid) return;
//     try{
//         const invoices = await getInvoiceList(uid, ownerID)
        
//         if(!invoices) return [];
//         dispatch(setInvoiceList(invoices))
//     } catch(error){
//         console.log(error)
//     }
//   } 
  


//   //borrar facturacion
//   const startDeletingInvoice = async() => {
//     if(!uid) return;
//     if(!activeOwner) return;
//     if(!activeInvoice) return; 
//     try {
       
//         const docRef = doc(FirebaseDB, `${uid}/lionTamer/owners/${activeOwner.id}/invoices/${activeInvoice.id}`) 
        
//         const resp = await deleteDoc(docRef)
//         console.log('Mascota borrado correctamente', resp);
        
//         dispatch(onDeleteInvoice(activeInvoice))
//         Swal.fire({
//             icon: 'success',
//             title: 'Mascota eliminada correctamente',
//             showConfirmButton: false,
//             timer: 1500
//         })
          
//     }catch (error) {
//         Swal.fire({
//             icon: 'error',
//             title: `Error al eliminar la facturacion: ${error}`,
//         })
//     }   
//   }
  

    //borrar una facturacion
    const startDeletingInvoice = async() => {
        dispatch(onDeleteInvoice(activeInvoice))
            
    //     try {
    //         if(!uid) return;
            
    //         if(!activeInvoice) return; 

    //         const docRef = doc(FirebaseDB, `${uid}/lionTamer/owners/${activeInvoice.id}`) 
            
    //         const resp = await deleteDoc(docRef)
    //         console.log('Propietario borrado correctamente', resp);
            
    //         dispatch(onDeleteInvoice(activeInvoice))
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Propietario eliminado correctamente',
    //             showConfirmButton: false,
    //             timer: 1500
    //           })
    //     } catch (error) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: `Error al eliminar el propietario: ${error}`,
    //         })
    //     }   
     }

    return {
        activeInvoice, 
        // isInvoiceSaving, 
        ownerList,
        ownerSearchList,
        setActiveInvoice,
        startSavingInvoice,
        // startLoadingInvoiceList,
        // startSearchingInvoice,
        startDeletingInvoice,
  }
}

