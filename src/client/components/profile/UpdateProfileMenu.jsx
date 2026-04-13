    import { useContext } from "react";
import { useAuth } from "../../../common/supabase/config";
    import { updateProfileName, updateProfilePhone } from "../../../common/supabase/functions";
    import { updateProfileSurname } from "../../../common/supabase/functions";
    import { updateProfileEmail } from "../../../common/supabase/functions";
    updateProfilePhone
import { Context } from "../../../common/context/Context";
const UpdateProfileMenu = ({showUpdateProfileMenuS,setShowUpdateProfileMenuS, dataToChange, setDataToChange})=>{
    const {user} = useAuth()
    const {setProfile, setNewEmail, newEmail} = useContext(Context)
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(dataToChange == 'nombre'){
            const newName = e.target.input.value;
            updateProfileName(user.id, newName, setShowUpdateProfileMenuS,setProfile)
        }
        if(dataToChange == 'apellido'){
            const newSurname = e.target.input.value;
            updateProfileSurname(user.id, newSurname, setShowUpdateProfileMenuS,setProfile)
        }
        if(dataToChange == 'correo'){
            setNewEmail(e.target.input.value)
            updateProfileEmail(newEmail, setShowUpdateProfileMenuS)
        }
        if(dataToChange == "teléfono"){
            const newPhone = e.target.input.value;
            updateProfilePhone(user.id, newPhone, setShowUpdateProfileMenuS, setProfile)
        }
    }
    const cancel = ()=>{
        setDataToChange(null)
        setShowUpdateProfileMenuS(false)
    }
    return <>
        {showUpdateProfileMenuS && <div className="update-profile-menu">
            <h4>Cambiar {dataToChange}</h4>
            <button type="button" className="cancel" onClick={cancel}>x</button>
            <form id="updateProfileForm" onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" name='input' placeholder={`Nuevo ${dataToChange}`}/>
                <button type="submit">Confirmar</button>
            </form>
        </div>}
        
    </>
}

export default UpdateProfileMenu;