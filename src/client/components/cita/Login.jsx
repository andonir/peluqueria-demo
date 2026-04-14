import { Context } from "../../../common/context/Context";
import { useContext } from "react";
import { logIn } from "../../../common/supabase/functions";
import { useAuth } from "../../../common/supabase/config";
const LogIn = () => {
  const { isRegisterActive, setIsRegisterActive, setCurrentStep, setProfile } =
    useContext(Context);
  const {user} = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    logIn(email, password);
    if (user) setCurrentStep(2);
  };
  const showRegister = () => {
    setIsRegisterActive(true);
  };
  return (
    <>
      {!isRegisterActive && (
        <>
          <form id="login" onSubmit={(e) => handleSubmit(e)}>
            <input type="text" name="email" placeholder="Correo" required/>
            <input type="password" name="password" placeholder="Contraseña" required/>
            <button type="submit">Iniciar sesión</button>
          </form>
          <div className="bottom">
            <h4>No tienes cuenta?</h4>
            <button type="button" onClick={showRegister}>
              REGÍSTRATE AHORA
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default LogIn;
