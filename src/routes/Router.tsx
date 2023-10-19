import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { NavBar } from "../components/NavBar";
import { OwnerForm } from "../pages/OwnerForm";
import { Schedule } from "../pages/Schedule";
import { SideBar } from "../components/SideBar";
import { CashRegister } from "../pages/CashRegister";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { ClientPage } from "../pages/ClientPage";
import { OwnerResults } from "../pages/OwnerResults";
import { PetPage } from "../pages/PetPage";
import { CashModal } from "../components/CashModal";




export const Router = () => {

  const status = useCheckAuth()

  
  // if(status === 'not-authenticated'){ return (<Login />)}


  return(
    <BrowserRouter>
    { 
      status === 'not-authenticated' 
      ? (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )
      :(<>
        <NavBar />
        <div className="row d-flex justify-content-evenly">
          <div className="col-8 col-sm-9 p-0">
            {
              status === 'authenticated' &&
              <Routes>
                <Route path="schedule" element={<Schedule />} />
                <Route path="owner-results" element={<OwnerResults />} />
                <Route path="owner" element={< OwnerForm />} /> 
                <Route path="owner/:id" element={<ClientPage />} />
                <Route path="pet" element={<PetPage />} />
                <Route path="cashModal" element={<CashModal />} /> {/* //!QUITAR? */}
                <Route path="cash" element={<CashRegister />} />
                <Route path="/*" element={<Schedule />} />
              </Routes>
            }
          </div>
          <div className="col-3 col-sm-2 p-0">
            <SideBar />
          </div>
        </div>
      </>
      )
    }
     
    </BrowserRouter>
  )
}

