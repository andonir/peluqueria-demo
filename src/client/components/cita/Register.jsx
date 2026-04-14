import { useContext } from "react";
import { Context } from "../../../common/context/Context";
import { register } from "../../../common/supabase/functions";
const Register = () => {
  const { isRegisterActive, setIsRegisterActive } = useContext(Context);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const surname = e.target.surname.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    register(name, surname, email, phone, password);
  };
  const hideRegister = () => {
    setIsRegisterActive(false);
  };
  return (
    <>
      {isRegisterActive && (
        <>
          <form id="register" onSubmit={(e) => handleSubmit(e)}>
            <input type="text" name="name" placeholder="Nombre" />
            <input type="text" name="surname" placeholder="Apellido" />
            <input type="text" name="email" placeholder="Correo" />
            <input type="tel" name="phone" placeholder="Teléfono" />
            <input type="password" name="password" placeholder="Contraseña" />
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
