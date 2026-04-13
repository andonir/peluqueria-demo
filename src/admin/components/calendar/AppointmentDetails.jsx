import { adminDeleteAppointment, adminInsertAppointment } from "../../../common/supabase/functions";
import { Context } from "../../../common/context/Context";
import { useContext } from "react";
const AppointmentDetails = ({
  selectedAppInfo,
  setShowAppDetails,
  selectedSpanishDate,
  setAppointments,
  newAppHour,
}) => {
  const { isAdmin, selectedDate } = useContext(Context);
  const handleDeleteApp = (id) => {
    adminDeleteAppointment(isAdmin, id, setAppointments);
    setShowAppDetails(false)
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const status = "confirmed";
    const insertDate = `${selectedDate}T${newAppHour}:00`;
    const name = e.target.name.value;
    const surname = e.target.surname.value;
    const phone = e.target.phone.value;
    adminInsertAppointment(
      isAdmin,
      null,
      insertDate,
      status,
      name,
      surname,
      phone,
      setAppointments,
    );
    setShowAppDetails(false)
  };
  return (
    <div className="appointment-details">
      <div className="appointment-details-top">
        <h4>
          {selectedAppInfo ? " Detalles de la reserva" : "Añadir reserva"}
        </h4>
        <button className="exit-btn" onClick={() => setShowAppDetails(false)}>
          x
        </button>
      </div>
      {selectedAppInfo ? (
        <>
          <div className="appointment-details-info">
            <p>
              Fecha: {selectedSpanishDate} {selectedAppInfo?.hour}
            </p>
            <p>
              Nombre: {selectedAppInfo?.name} {selectedAppInfo?.surname}
            </p>
            <p>Teléfono: {selectedAppInfo?.phone}</p>
            <p>Correo: {selectedAppInfo?.email}</p>
          </div>
          <div className="appointment-details-btns">
            <button
              className="delete-appointment"
              onClick={() => handleDeleteApp(selectedAppInfo?.id)}
            >
              Eliminar reserva
            </button>
          </div>
        </>
      ) : (
        <div className="new-appointment">
          <p>
            Fecha: {selectedSpanishDate} {newAppHour}
          </p>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <input type="text" name="name" placeholder="Nombre" required />
            <input type="text" name="surname" placeholder="Apellido" required />
            <input type="tel" name="phone" placeholder="Teléfono" required />
            <button type="submit">Añadir</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AppointmentDetails;
