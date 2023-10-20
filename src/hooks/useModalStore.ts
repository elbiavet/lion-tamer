import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { onCloseModal, onOpenModal } from "../store/modal/modalSlice";


export const useModalStore = () => {

    const { isModalOpen } = useSelector((state: RootState)=>state.modal)
    const dispatch = useDispatch();

    const openModal = () => {
        dispatch(onOpenModal());
    }
    
    const closeModal= () => {
         dispatch(onCloseModal());
     }

  return {
    isModalOpen,
    openModal,
    closeModal
  }
}
