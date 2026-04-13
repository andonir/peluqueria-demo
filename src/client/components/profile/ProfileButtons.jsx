import { logOut } from "../../../common/supabase/functions";

const ProfileButtons = () =>{
    return <div className="profile-buttons">
          <button type="button" className="log-out" onClick={logOut}>
            Cerrar sesión
          </button>
          <button type="button" className="delete-account">
            Eliminar cuenta
          </button>
        </div>
}

export default ProfileButtons