import { MdEdit } from "react-icons/md";
import { useAuth } from "../../../common/supabase/config";
import { Context } from "../../../common/context/Context";
import { useContext, useEffect, useState } from "react";
import UpdateProfileMenu from "./UpdateProfileMenu";
const ProfileData = () => {
  const { profile, newEmail, setNewEmail } = useContext(Context);
  const { user } = useAuth();
  const [showUpdateProfileMenuS, setShowUpdateProfileMenuS] = useState(false);
  const [dataToChange, setDataToChange] = useState(null);
  const showUpdateProfileMenuF = (data) => {
    setShowUpdateProfileMenuS(true);
    setDataToChange(data);
  };
  useEffect(() => {
    if (!user) return;
    if (user.email == newEmail) alert("ha cambiado el email");
  }, [user]);
  return (
    <>
      <div className="profile-data">
        <UpdateProfileMenu
          showUpdateProfileMenuS={showUpdateProfileMenuS}
          setShowUpdateProfileMenuS={setShowUpdateProfileMenuS}
          dataToChange={dataToChange}
          setDataToChange={setDataToChange}
        ></UpdateProfileMenu>
        <h3>Información personal</h3>
        {profile && user && (
          <ul>
            <li>
              <p>Nombre: {profile.name}</p>
              <MdEdit className="edit-icon" onClick={() => showUpdateProfileMenuF("nombre")}></MdEdit>
            </li>
            <li>
              <p>Apellido: {profile.surname}</p>
              <MdEdit className="edit-icon"
                onClick={() => showUpdateProfileMenuF("apellido")}
              ></MdEdit>
            </li>
            <li>
              <p>Correo: {user.email}</p>
              <MdEdit className="edit-icon" onClick={() => showUpdateProfileMenuF("correo")}></MdEdit>
            </li>
            <li>
              <p>Teléfono: {profile.phone}</p>
              <MdEdit className="edit-icon" onClick={() => showUpdateProfileMenuF("teléfono")}></MdEdit>
            </li>
            <li>
              <p>Contraseña: **********</p>
              <MdEdit className="edit-icon"></MdEdit>
            </li>
          </ul>
        )}
        
      </div>
    </>
  );
};

export default ProfileData;
