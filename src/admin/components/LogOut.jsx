import { logOut } from "../../common/supabase/functions"
const LogOut = ()=>{
    return <button className="admin-log-out" onClick={()=>logOut()}>Cerrar sesión</button>
}

export default LogOut