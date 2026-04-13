import '../styles/admin.css'
import { logIn } from '../../common/supabase/functions';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../common/context/Context';
import { useContext, useEffect } from 'react';
import { useAuth } from '../../common/supabase/config';
const AdminLogIn = () => {
    const {user} = useAuth()
    const navigate = useNavigate()
    const {isAdmin, isReady} = useContext(Context)
    useEffect(()=>{
      if(isAdmin) navigate('/admin')
    },[isAdmin])
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    logIn(email,password, navigate)
    if(isAdmin) navigate('/admin')
    if(isReady && !isAdmin){
      alert('No eres admin. Redirigiendo....')
      navigate('/client')
    }

  };

  return (
    <div className="admin-login">
      <h2>Admin login</h2>
      <form id="adminLogin" onSubmit={(e) => handleSubmit(e)}>
        <input type="text" name="email" placeholder="Correo" />
        <input type="password" name="password" placeholder="Contraseña" />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default AdminLogIn;
