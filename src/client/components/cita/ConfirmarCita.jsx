import { useContext, useEffect, useState} from "react";
import { Context } from "../../../common/context/Context";
import { MdEdit } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { setAppointment } from "../../../common/supabase/functions";
import { useAuth } from "../../../common/supabase/config";
import { useNavigate } from "react-router-dom";
const ConfirmarCita = () => {
        const navigate = useNavigate()

  const { profile } = useContext(Context);
    const {user} = useAuth()
  const { selectedDate, selectedHour, selectedDayName, setCurrentStep} = useContext(Context);
  const date = `${selectedDate}T${selectedHour}:00`;
  const spanishDate = selectedDate.split("-").reverse().join("-");
  const confirmAppointment = ()=>{
    setAppointment(user.id, date)
    alert('Cita registrada correctamente')
    navigate('/')
  }
  return (
    <>
      <ul>
        {profile && (
          <li>
              <FaUser className="user"></FaUser> 
              {profile.name}{" "}
              {profile.surname}
              <div className="phone">{profile.phone}</div>
              <span></span>
              
          </li>
        )}

        <li>
          <FaCalendar className="date"></FaCalendar>
          {selectedDayName}, {spanishDate} {selectedHour}
          <MdEdit className="edit" onClick={()=>{setCurrentStep(2)}}></MdEdit>
        </li>
      </ul>
      <button type="button" className="confirmar-cita-btn" onClick={confirmAppointment}>
        Confirmar cita
      </button>
    </>
  );
};

export default ConfirmarCita;
