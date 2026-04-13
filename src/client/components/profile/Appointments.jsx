import { useContext, useEffect, useState } from "react";
import { Context } from "../../../common/context/Context";
import { FaCheck } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../../common/supabase/config";
const Appointments = () => {
    const {user} = useAuth()
  const { userAppointments } = useContext(Context);
  const [spanishUserAppointments, setSpanishUserAppointments] = useState([]);
  useEffect(() => {
    if (!userAppointments) return;
    setSpanishUserAppointments(
      userAppointments.map((app, i) => {
        let date = app.date.split("T")[0].split("-").reverse().join("-");
        let hour = app.date.split("T")[1].split(":").slice(0, 2).join(":");
        let status = app.status
        return { date, hour, status};
      }),
    );
  }, [userAppointments]);
  useEffect(()=>{
    if(!user) setSpanishUserAppointments(null)
  },[user])
  return (
    <>
      <div className="appointments">
        <h3>Mis citas</h3>
        <ul className="appointments-ul">
        {spanishUserAppointments &&
          spanishUserAppointments.map((app, i) => {
            return (
              <li className="appointment" key={i}>
                <p className="appointment-date">{app.date}</p>
                <p className="appointment-hour">{app.hour}</p>
                <p className="appointment-status">{app.status == 'confirmed' ? (
                    <>Confirmado <FaCheck className="check-icon" /></>
                ): app.status}</p>
                <MdEdit onClick={() => showUpdateProfileMenuF("nombre")} className="edit-icon"></MdEdit>
                
              </li>
            );
          })}
      </ul>
      </div>
    </>
  );
};

export default Appointments;
