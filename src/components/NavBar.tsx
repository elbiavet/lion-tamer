import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuthStore, useOwnerStore, usePetStore } from '../hooks';
import { OwnerSearch } from "../pages";
import { FaPaw, FaUser, FaCashRegister } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import Logo from "../assets/logo-blue-trans.png"
import { initialValuesOwner } from "../assets/initialValues";


export const NavBar = () => {
    const navigate = useNavigate();
    const { startLogout } = useAuthStore();
    const { activeOwner, setActiveOwner } = useOwnerStore();
    const { activePet } = usePetStore();

    const onLogout = () =>{
      startLogout()
      navigate('/')
    }

  return (
    
    <nav className="navbar navbar-expand-sm navbar-light bg-light border border-2" >
      
      <div className="container-fluid m-0 p-0 row d-flex justify-content-center align-items-center">

        <NavLink className={({ isActive }) => `col-8 col-sm-3 col-lg-2 navbar-brand text-center ${ isActive ? "active" :"" }`} to="/schedule"  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Calendario"> 
          <img src={Logo} alt="" width={180}/>
        </NavLink>

        <div className="fs-5 col-2 col-sm-8 col-lg-10"> 

          <button className="btn btn-custom navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu">
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

                <li className="nav-item col col-lg-3 row">
                    <div className="d-flex align-items-baseline">
                      <OwnerSearch />
                    </div>
                </li>

                <li className="nav-item col col-sm-2 col-lg-2">
                  <div className="dropdown" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ficha Propietario">
                      <div className="dropdown-toggle d-flex align-items-baseline fs-4" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <FaUser className="d-lg-none d-xl-inline text-custom"/>
                        <p className="d-sm-none d-lg-inline m-0 mx-2 fw-bold  text-secondary">Cliente</p>
                      </div>
                    
                    <div className="dropdown-menu">
                      {activeOwner && (
                        <Link 
                        className="dropdown-item" 
                        to={`/owner/${activeOwner.id}`}
                        >
                          Propietario Activo
                        </Link>
                      )}
                      <Link className="dropdown-item" to="/owner" onClick={()=>setActiveOwner(initialValuesOwner)}>Nuevo</Link>
                    </div>
                  </div>
                </li>
                
                <li className="nav-item col col-sm-2 col-lg-2">
                  <NavLink 
                    className= {({isActive}) => `nav-link fw-bold fs-4 link-custom ${ isActive ? "active" :"" }`} 
                    aria-current="page" 
                    to={`/pet/${activePet?.id}`}
                    data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ficha mascota"
                  >
                    <div className="d-flex align-items-baseline">
                      <FaPaw className="d-lg-none d-xl-inline align-self-center"/>
                      <p className="d-sm-none d-lg-inline m-0 mx-2 text-secondary">Mascota</p>
                    </div>
                  </NavLink>
                </li>
        
                <li className="nav-item col col-sm-2 col-lg-2">
                  <NavLink 
                    className= {({isActive}) => `nav-link fw-bold fs-4 link-custom ${ isActive ? "active" :"" }`} 
                    aria-current="page" 
                    to="/cash"
                    data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cobros"
                    >
                      <div className="d-flex align-items-baseline">
                        <FaCashRegister className="d-lg-none d-xl-inline"/>
                        <p className="d-sm-none d-lg-inline m-0 mx-2 text-secondary">Cobros</p>
                    </div>
                      
                    </NavLink>
                </li>
                <li className="nav-item col col-sm-2 col-lg-2">
                  <button 
                    className="btn text-danger nav-link fw-bold fs-4 link-custom"  
                    data-bs-toggle="tooltip" 
                    data-bs-placement="bottom" 
                    title="Cerrar sesión"
                    onClick={onLogout}
                  >
                  <div className="d-flex align-items-baseline">
                        <IoLogOutOutline 
                          className="d-lg-none d-xl-inline align-self-center fs-3" 
                        />
                        <p className="d-sm-none d-lg-inline m-0 mx-2 text-danger">Salir</p>
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