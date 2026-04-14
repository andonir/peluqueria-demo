import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Header = () => {
    const [showNav, setShowNav] = useState(false)
    const location= useLocation();
      useEffect(()=>{console.log(location)},[location])
    return (
    <>
      <header>
        <FaBars className="bars-icon" onClick={()=>setShowNav(!showNav)}/>
        <h2>Peluquería</h2>
        <nav className={showNav ? 'show' : ''}>
          <ul>
            <li>
              <NavLink to={"/client"} end className={({isActive})=>isActive? 'link selected' : 'link'} >Inicio</NavLink>
            </li>
            <li>
              <NavLink to={"/client/profile"} end className={({isActive})=>isActive? 'link selected' : 'link'}>Perfil</NavLink>
            </li>
            <li>
                <a href="#/client/appointment" className='link' target="_blank" rel="noopener noreferrer">Pedir cita</a>
            </li>
          </ul>
        </nav>
      </header>
      <hr className="header-hr" />
    </>
  );
};

export default Header;
