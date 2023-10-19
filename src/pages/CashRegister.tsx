import { InvoicesPetPage } from "./InvoicesPetPage"

export const CashRegister = () => {

  return (
    <div className="container mt-4">

    <div className="text-center">
      <p className="fs-5 fw-bold">Caja Recepción</p>
    </div>

    <div className="alert alert-info" role="alert">
      Esta funcionalidad aún no está implementada. Pero sí hay facturación en la ficha de cada mascota.
    </div>

    <InvoicesPetPage />
    

  </div>
  )
}
