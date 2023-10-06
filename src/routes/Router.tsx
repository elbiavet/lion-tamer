import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { NavBar } from "../components/NavBar";
import { PetForm } from "../pages/PetForm";
import { OwnerForm } from "../pages/OwnerForm";
import { Schedule } from "../pages/Schedule";
import { SideBar } from "../components/SideBar";
import { CashRegister } from "../pages/CashRegister";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { OwnerSearch } from "../pages/OwnerSearch";
import { NewOwnerForm } from "../pages/NewOwnerForm";
import { PetSearch } from "../pages/PetSearch";
import { ClientPage } from "../pages/ClientPage";




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
        <div className="row">
          <div className="col-10">
            {
              status === 'authenticated' &&
              <Routes>
                <Route path="schedule" element={<Schedule />} />
                <Route path="owner-search" element={<OwnerSearch />} />
                <Route path="owner" element={< NewOwnerForm/>} /> //!OwnerForm 
                <Route path="owner/:id" element={<ClientPage />} />
                <Route path="owner/:id/pet" element={<PetForm />} />
                <Route path="pet-search" element={<PetSearch />} />
                <Route path="cash" element={<CashRegister />} />
                <Route path="/*" element={<Schedule />} />
              </Routes>
            }
          </div>
          <div className="col-2">
            <SideBar />
          </div>
        </div>
      </>
      )
    }
     
    </BrowserRouter>
  )
}

