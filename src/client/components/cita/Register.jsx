import { useContext } from "react";
import { Context } from "../../../common/context/Context";
import { register, getProfile } from "../../../common/supabase/functions";
import { useAuth } from "../../../common/supabase/config";
const Register = () => {
  const { isRegisterActive, setIsRegisterActive, setCurrentStep, setProfile } = useContext(Context);
    const {user} = useAuth();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const surname = e.target.surname.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    register(name, surname, email, phone, password);
    getProfile(user.id, setProfile)
    if (user) setCurrentStep(2);

  };
  const hideRegister = () => {
    setIsRegisterActive(false);
  };
  return (
    <>
      {isRegisterActive && (
        <>
          <form id="register" onSubmit={(e) => handleSubmit(e)}>
            <input type="text" name="name" placeholder="Nombre" required/>
            <input type="text" name="surname" placeholder="Apellido" required/>
            <input type="text" name="email" placeholder="Correo" required/>
            <input type="tel" name="phone" placeholder="Teléfono" required/>
            <input type="password" name="password" placeholder="Contraseña" required/>
            <button type="submit">Registrarse</button>
          </form>
          <div className="bottom">
            <h4>Ya tienes cuenta? </h4>
            <button type="button" onClick={hideRegister}>
              INICIAR SESIÓN
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
