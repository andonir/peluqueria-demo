import { FaCheck } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Context } from "../../../common/context/Context";
import { useContext } from "react";
const HoursMenu = ({
  selectedSpanishDate,
  setShowHoursMenu,
  orderedAppointments,
  handleHourClick,
}) => {
  const {
    selectedDate,
    hours,
  } = useContext(Context);

  return (
    <div className="hours-menu">
      <div className="hours-top">
        <h3>Horario</h3>
        <h4>{selectedSpanishDate}</h4>
        <button className="exit-btn" onClick={() => setShowHoursMenu(false)}>
          x
        </button>
      </div>
      <div className="hours">
        {hours?.map((hour, i) => {
          const appointmentInfo = orderedAppointments?.[selectedDate]?.[hour];
          return (
            <div
              className={appointmentInfo ? "hour booked-hour" : "hour"}
              key={i}
              onClick={() => handleHourClick(appointmentInfo, hour)}
            >
              <div className="appointment-hour">
                <p>{hour} </p>
                <MdEdit></MdEdit>
              </div>

              <p className={"appointment-status"}>
                {appointmentInfo ? (
                  appointmentInfo.status === "confirmed" ? (
                    <>
                      Confirmado <FaCheck className="check-icon" />
                    </>
                  ) : (
                    appointmentInfo.status
                  )
                ) : (
                  "Libre"
                )}
                {/*  */}
              </p>
              <p className="appointment-user">
                {appointmentInfo ? (
                  <>
                    {appointmentInfo.name} {appointmentInfo.surname}
                  </>
                ) : (
                  "-------------"
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HoursMenu;
