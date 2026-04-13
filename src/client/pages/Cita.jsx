import Header from "../components/Header"
import Pasos from "../components/cita/Pasos"
import LoginRegister from "../components/cita/LoginRegister"
import ReservarHora from "../components/cita/ReservarHora"
import ConfirmarCita from "../components/cita/ConfirmarCita"
import { Context } from "../../common/context/Context"
import { useContext } from "react"
const Cita = ()=>{
    const {isRegisterActive, setIsRegisterActive, currentStep, setCurrentStep} = useContext(Context)
    return <>
    <main className="cita-main">
    <div className="cita-header">
        <header>
            <h3>Peluquería</h3>    
        </header>
        <Pasos></Pasos>
        <hr/>
    </div>
    {currentStep == 1 &&  <div className="login-register">
        {isRegisterActive ? <h3>Registrarse</h3>: <h3>Iniciar sesión</h3>}
        <LoginRegister></LoginRegister>
    </div>}
    
    {currentStep ==2 && <div className="reservar-hora">
        <h3>Reservar hora</h3>
        <ReservarHora></ReservarHora>
    </div>}
    {currentStep ==3 && <div className="confirmar-cita">
        <h3>Confirmar cita</h3>
        <ConfirmarCita/>
    </div>}
    
    </main>
    </>
}

export default Cita