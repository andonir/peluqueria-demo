import Header from "../components/Header";
import ProfileData from "../components/profile/ProfileData";
import Appointments from "../components/profile/Appointments";
import { useAuth } from "../../common/supabase/config";
import LoginRegister from "../components/cita/LoginRegister";
import { useContext } from "react";
import { Context } from "../../common/context/Context";
import ProfileButtons from "../components/profile/ProfileButtons";
const Profile = () => {
  const {user} = useAuth()
  const {isRegisterActive} = useContext(Context)
  return (
    <>
      <Header></Header>
      {user ? <div className="profile-container">
      
        <h2>Mi perfil</h2>
        <ProfileData></ProfileData>
        <Appointments></Appointments>
        <ProfileButtons></ProfileButtons>
      </div> : <div className="login-register login-register-profile">
        {isRegisterActive ? <h3>Registrarse</h3>: <h3>Iniciar sesión</h3>}
        <LoginRegister></LoginRegister>
        </div>}
    </>
  );
};

export default Profile;
