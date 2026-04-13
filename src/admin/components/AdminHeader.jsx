import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
const AdminHeader = () => {
    
    return (
    <>
      <header className="admin-header">
        <h2>Peluquería</h2>
        <h4>Página del administrador</h4>
      </header>
      <hr className="header-hr" />
    </>
  );
};

export default AdminHeader;
