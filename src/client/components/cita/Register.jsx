import { useContext } from "react"
import { Context } from "../../../common/context/Context"
import { register } from "../../../common/supabase/functions"
const Register = ()=>{
    const {isRegisterActive, setIsRegisterActive} = useContext(Context)
    const handleSubmit = (e)=>{
      e.preventDefault()
      const name = e.target.name.value;
      const surname = e.target.surname.value;
      const email = e.target.email.value;
      const phone = e.target.phone.value;
      const password = e.target.password.value;
      register(name,surname,email,phone,password)
    }
    const hideRegister = ()=>{
        setIsRegisterActive(false)
    }
    return<>
    {isRegisterActive && ( 
        <>
        <form id="register" onSubmit={(e)=>handleSubmit(e)}>
        <input type="text" name="name" placeholder="name"/>
        <input type="text" name="surname" placeholder="surname"/>
        <input type="text" name="email" placeholder="Correo" />
        <input type="tel" name="phone" placeholder="Teléfono"/>
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Registrarse</button>
  </form> 
   <h4>
            Ya tienes cuenta?{" "}
            <button type="button" onClick={hideRegister}>
              INICIAR SESIÓN
            </button>
          </h4>
  </>
  )} 
    </>
}

export default Register