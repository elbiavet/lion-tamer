import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { NavBar } from "../components/NavBar";
import { OwnerForm } from "../pages/OwnerForm";
import { Schedule } from "../pages/Schedule";
import { SideBar } from "../components/SideBar";
import { CashRegister } from "../pages/CashRegister";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { OwnerSearch } from "../pages/OwnerSearch";
import { PetSearch } from "../pages/PetSearch";
import { ClientPage } from "../pages/ClientPage";
import { OwnerResults } from "../pages/OwnerResults";
import { PetPage } from "../pages/PetPage";
import { usePetStore } from "../hooks/usePetStore";




export const Router = () => {

  const status = useCheckAuth()
  const {activePet} = usePetStore();
  
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
          <div className="col-9 p-0">
            {
              status === 'authenticated' &&
              <Routes>
                <Route path="schedule" element={<Schedule />} />
                <Route path="owner-results" element={<OwnerResults />} />
                <Route path="owner" element={< OwnerForm />} /> 
                <Route path="owner/:id" element={<ClientPage />} />
                <Route path="pet" element={<PetPage activePet={activePet}/>} />
                <Route path="cash" element={<CashRegister />} />
                <Route path="/*" element={<Schedule />} />
              </Routes>
            }
          </div>
          <div className="col-2 p-0">
            <SideBar />
          </div>
        </div>
      </>
      )
    }
     
    </BrowserRouter>
  )
}

