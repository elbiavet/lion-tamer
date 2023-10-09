import { FaPaw, FaUser, FaCashRegister } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import Logo from "../assets/logo-trans.png"
import { NavLink, useNavigate } from "react-router-dom"
// import { useDispatch } from "react-redux";
import { OwnerSearch } from "../pages/OwnerSearch";
import { useAuthStore } from '../hooks/useAuthStore';



export const NavBar = () => {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const { startLogout } = useAuthStore();

    const onLogout = () =>{
      //dispatch(startLogout())
      startLogout()
      navigate('/')
    }

  return (
    
    <nav className="navbar navbar-expand-sm navbar-light text-primary bg-light border border-2" >
      
      <div className="container-fluid m-0 p-0 row d-flex justify-content-center">

        <NavLink className={({ isActive }) => `col-2 navbar-brand text-center ${ isActive ? "active" :"" }`} to="/schedule"> 
          <img src={Logo} alt="" width={180}/>
        </NavLink>


          <div className="fs-5 col-9"> 
            <ul className="navbar-nav row d-flex justify-content-evenly align-items-center">
              
              <li className="nav-item col-1">
                <NavLink className= {({isActive}) => `nav-link fw-bold fs-4 link-primary ${ isActive ? "active" :"" }`} aria-current="page" to={`/owner`}><FaUser className="m-2"/></NavLink>
              </li>

              <li className="nav-item col-1">
                <NavLink className= {({isActive}) => `nav-link fw-bold fs-4 link-primary ${ isActive ? "active" :"" }`} aria-current="page" to={`/pet`}><FaPaw className="m-2"/></NavLink>
              </li>

              <li className="nav-item col-5 row">
                  <OwnerSearch />
              </li>
       
              <li className="nav-item col-1 m-1  d-flex justify-content-center align-items-center">
                <NavLink className= {({isActive}) => `nav-link fw-bold fs-4 link-primary ${ isActive ? "active" :"" }`} aria-current="page" to="/cash"><FaCashRegister /></NavLink>
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