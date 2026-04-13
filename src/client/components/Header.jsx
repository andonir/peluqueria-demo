import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
const Header = () => {
    const [showNav, setShowNav] = useState(false)
    const location= useLocation();
    
    return (
    <>
      <header>
        <FaBars className="bars-icon" onClick={()=>setShowNav(!showNav)}/>
        <h2>Peluquería Usurbil</h2>
        <nav className={showNav ? 'show' : ''}>
          <ul>
            <li>
              <Link to={"/client"} className= {location.pathname=='/client'? 'link selected' : 'link'}>Inicio</Link>
            </li>
            <li>
              <Link to={"/client/profile"} className={location.pathname=='/profile'? 'link selected' : 'link'}>Perfil</Link>
            </li>
            <li>
                <a href="/client/appointment" className={location.pathname=='/appointment'? 'link selected' : 'link'}target="_blank" rel="noopener noreferrer">Pedir cita</a>
            </li>
          </ul>
        </nav>
      </header>
      <hr className="header-hr" />
    </>
  );
};

export default Header;
