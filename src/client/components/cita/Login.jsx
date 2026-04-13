import { Context } from "../../../common/context/Context";
import { useContext } from "react";
import { logIn } from "../../../common/supabase/functions";
const LogIn = () => {
  const { isRegisterActive, setIsRegisterActive,setCurrentStep } = useContext(Context);
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    logIn(email,password)
    setCurrentStep(2)
  };
  const showRegister = () => {
    setIsRegisterActive(true);
  };
  return (
    <>
      {!isRegisterActive && (
        <>
        
          <form id="login" onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" name="email" placeholder="Correo" />
            <input type="password" name="password" placeholder="Contraseña" />
            <button type="submit">Iniciar sesión</button>
          </form>
          <h4>
            No tienes cuenta?{" "}
            <button type="button" onClick={showRegister}>
              REGÍSTRATE AHORA
            </button>
          </h4>
        </>
      )}
    </>
  );
};

export default LogIn;
