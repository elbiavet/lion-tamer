import { useOwnerStore } from "../hooks/useOwnerStore"


export const CashRegister = () => {

  const {activeOwner} = useOwnerStore();

  return (
    <div className="container mt-4">

    <div className="text-center">
      <p className="fs-5 fw-bold">Caja Recepción</p>
    </div>

    <div className="alert alert-info" role="alert">
      Esta funcionalidad aún no está implememtada
    </div>

  </div>
  )
}
