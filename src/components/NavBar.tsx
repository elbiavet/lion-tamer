import { FaPaw, FaUser, FaCashRegister } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import Logo from "../assets/logo-blue-trans.png"
import { NavLink, useNavigate } from "react-router-dom"
import { OwnerSearch } from "../pages/OwnerSearch";
import { useAuthStore } from '../hooks/useAuthStore';



export const NavBar = () => {
    const navigate = useNavigate();
    const { startLogout } = useAuthStore();

    const onLogout = () =>{
      startLogout()
      navigate('/')
    }

  return (
    
    <nav className="navbar navbar-expand-sm navbar-light text-primary bg-light border border-2" >
      
      <div className="container-fluid m-0 p-0 row d-flex justify-content-center align-items-center">

        <NavLink className={({ isActive }) => `col-8 col-sm-3 col-lg-2 navbar-brand text-center ${ isActive ? "active" :"" }`} to="/schedule"  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Calendario"> 
          <img src={Logo} alt="" width={180}/>
        </NavLink>

        <div className="fs-5 col-2 col-sm-8 col-lg-10"> 

          <button className="btn btn-primary navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu">
            <span className="navbar-toggler-icon"></span>
          </button>


          <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel">

          <div className="offcanvas-header">
            <h3 className="offcanvas-title m-2" id="offcanvasMenuLabel">Menú</h3>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>

          <div className="offcanvas-body row d-flex flex-sm-row justify-content-sm-center align-items-sm-center">
    
          <div> 
              <ul className="navbar-nav row d-flex flex-sm-row justify-content-sm-center justify-content-lg-around align-items-center">
                
                <li className="nav-item col col-sm-2 col-lg-2">
                  <NavLink 
                    className= {({isActive}) => `nav-link fw-bold fs-4 link-primary ${ isActive ? "active" :"" }`} 
                    aria-current="page" 
                    to={`/owner`}  
                    data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ficha Propietario"
                  >
                    <div className="d-flex align-items-baseline">
                      <FaUser className="m-lg-2"/>
                      <p className="d-sm-none d-lg-inline m-0 mx-2 text-secondary">Cliente</p>
                    </div>
                  </NavLink>
                </li>

                <li className="nav-item col col-sm-2 col-lg-2">
                  <NavLink 
                    className= {({isActive}) => `nav-link fw-bold fs-4 link-primary ${ isActive ? "active" :"" }`} 
                    aria-current="page" 
                    to={`/pet`}
                    data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ficha mascota"
                  >
                    <div className="d-flex align-items-baseline">
                      <FaPaw className="m-lg-2"/>
                      <p className="d-sm-none d-lg-inline m-0 mx-2 text-secondary">Mascota</p>
                    </div>
                  </NavLink>
                </li>

                <li className="nav-item col col-lg-4 row">
                    <div className="d-flex align-items-baseline">
                      <OwnerSearch />
                    </div>
                </li>
        
                <li className="nav-item col col-sm-1 m-1 d-flex justify-content-sm-center align-items-center">
                  <NavLink 
                    className= {({isActive}) => `nav-link fw-bold fs-4 link-primary ${ isActive ? "active" :"" }`} 
                    aria-current="page" 
                    to="/cash"
                    data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cobros"
                    >
                      <div className="d-flex align-items-baseline">
                        <FaCashRegister className="m-lg-2"/>
                        <p className="d-sm-none d-lg-inline m-0 mx-2 text-secondary">Cobros</p>
                    </div>
                      
                    </NavLink>
                </li>

                <li className="nav-item col col-sm-1 p-0 m-sm-1 d-flex justify-content-sm-center align-items-center">
                  <button className="btn text-danger fs-3"  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cerrar sesión">
                    <div className="d-flex align-items-baseline">
                      <IoLogOutOutline onClick={onLogout} />
                        <p className="d-sm-none mx-2">Cerrar sesión</p>
                    </div>
                      
                    
                  </button>
                </li>
                
              </ul>
            </div>
            </div>
   
        </div>
      </div>

          
        
        </div>
   </nav> 
  )
}