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
import { PetForm } from "../pages";




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
        <div className="row d-flex justify-content-center">
          <div className="col-8 col-sm-9 col-lg-10 p-0">
            <div className="container m-1 m-sm-2 m-lg-3 m-xl-4">
            {
              status === 'authenticated' &&
              <Routes>
                <Route path="schedule" element={<Schedule />} />
                <Route path="owner-results" element={<OwnerResults />} />
                <Route path="owner" element={< OwnerForm />} /> 
                <Route path="owner/:id" element={<ClientPage />} />
                <Route path="pet/:id" element={<PetPage />} />
                <Route path="pet" element={< PetForm />} /> 
                <Route path="cash" element={<CashRegister />} />
                <Route path="/*" element={<Schedule />} />
              </Routes>
            }
            </div>
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

