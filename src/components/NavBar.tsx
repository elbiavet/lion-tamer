import { FaPaw, FaUser } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import Logo from "../assets/logo-trans.png"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { startLogout } from "../store/auth/thunks";


export const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () =>{
      dispatch(startLogout())
      navigate('/')
    }

  return (
    
    <nav className="navbar navbar-expand-sm navbar-light bg-light border border-2" >
      
      <div className="container-fluid m-0 p-0 row d-flex justify-content-center">

        <NavLink className={({ isActive }) => `col-2 navbar-brand text-center ${ isActive ? "active" :"" }`} to="/schedule"> 
          <img src={Logo} alt="" width={180}/>
        </NavLink>


          <div className="fs-5 col-9"> 
            <ul className="navbar-nav row d-flex justify-content-center align-items-center">
              
              <li className="nav-item col-2 d-flex justify-content-center">
                <div className="dropdown">
                  <button className="btn dropdown-toggle fs-5 fw-bold" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Nueva Ficha
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link className= 'dropdown-item' aria-current="page" to="/owner">Nuevo Propietario</Link>
                    <Link className= 'dropdown-item' aria-current="page" to="/owner-search">Propietario existente</Link>
                  </div>
                </div>
              </li>


              
              <li className="nav-item col-4 row">
                <div className="col d-flex justify-content-center">
                  <NavLink className= {({isActive}) => `nav-link ${ isActive ? "active" :"" }`} to="/pet-search">
                    <FaPaw className="m-2"/>
                  </NavLink>
      
                  <form className="form-inline col m-1">
                    <div className="form-group">
                      <input type="mascota" className="form-control" id="inputMascota" placeholder="Nombre mascota"/>
                    </div>
                  </form>
                </div>
              </li>

              <li className="nav-item col-4 row">
                <div className="col d-flex justify-content-center">
                  <NavLink className= {({isActive}) => `nav-link ${ isActive ? "active" :"" }`} aria-current="page" to="/owner">
                    <FaUser className="m-2"/>
                  </NavLink>
                
                  <form className="form-inline col m-1">
                    <div className="form-group">
                      <input type="propietario" className="form-control" id="inputPropietario" placeholder="Nombre dueño"/>
                    </div>
                  </form>
                </div>
              </li>

              <li className="nav-item col-1 m-1  d-flex justify-content-center align-items-center">
                <NavLink className= {({isActive}) => `nav-link fw-bold ${ isActive ? "active" :"" }`} aria-current="page" to="/cash">Caja</NavLink>
              </li>

              <li className="nav-item col-1 m-1 d-flex justify-content-center align-items-center">
                <button className="btn text-danger fs-3" ><IoLogOutOutline onClick={onLogout} /></button>
              </li>
              
            </ul>
          </div>
        
        </div>
   </nav> 
  )
}