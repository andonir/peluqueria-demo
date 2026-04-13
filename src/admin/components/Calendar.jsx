import { useState, useMemo, useContext, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import HoursMenu from "./calendar/HoursMenu";
import AppointmentDetails from "./calendar/AppointmentDetails";
import { Context } from "../../common/context/Context";
const Calendar = ({ appointments, setAppointments }) => {
  const months = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE",
  ];
  const [showHoursMenu, setShowHoursMenu] = useState(false);
  const [showAppDetails, setShowAppDetails] = useState(false);
  const [selectedSpanishDate, setSelectedSpanishDate] = useState(null);
  const [selectedAppInfo, setSelectedAppInfo] = useState(null);
  const [newAppHour, setNewAppHour] = useState(null);
  const {
    hours,
    setHours,
    selectedDate,
    setSelectedDate,
    setDate,
    year,
    month,
    monthDays,
    weekDays,
    days,
    setDays,
    showDayHours
  } = useContext(Context);
  useEffect(() => {
    let forDays = [];
    for (let i = 0; i < monthDays; i++) {
      let weekDay = new Date(year, month, i + 1).getDay();
      let dayName = weekDays[weekDay];
      forDays.push({ number: i + 1, weekDay, name: dayName });
    }
    setDays(forDays);
  }, []);

  const changeMonth = (action) => {
    if (action == "previous") {
      let newDate = new Date(year, month - 1);
      setDate(newDate);
    } else {
      let newDate = new Date(year, month + 1);
      setDate(newDate);
    }
  };
  const handleDayClick = (processedDay, processedMonth) => {
    setShowHoursMenu(true);
    setSelectedDate(`${year}-${processedMonth}-${processedDay}`);
    setSelectedSpanishDate(`${processedDay}-${processedMonth}-${year}`);
    setHours(showDayHours(days, `${year}-${processedMonth}-${processedDay}`));
  };
  const handleHourClick = (appointmentInfo, hour) => {
    setShowAppDetails(true);
    setSelectedAppInfo(appointmentInfo);
    setNewAppHour(hour);
  };

  // Crear lookup de appointments

  const orderedAppointments = useMemo(() => {
    const map = {};
    appointments?.forEach((app, i) => {
      const date = app.date.split("T")[0];
      const hour = app.date.split("T")[1].slice(0, -3);
      if (!map[date]) map[date] = {};
      if (!map[date][hour])
        if (app.profiles) {
          map[date][hour] = {
            id: app.appointment_id,
            user_id: app.user_id,
            status: app.status,
            hour: hour,
            name: app.profiles.name,
            surname: app.profiles.surname,
            phone: app.profiles.phone,
            email: app.profiles.email,
          };
        } else {
          map[date][hour] = {
            id: app.appointment_id,
            user_id: app.user_id,
            status: app.status,
            hour: hour,
            name: app.name,
            surname: app.surname,
            phone: app.phone,
            email: "no disponible",
          };
        }
    });
    return map;
  }, [appointments]);
  console.log(appointments);
  return (
    <div className="calendar">
      {showHoursMenu && (
        <HoursMenu
          selectedSpanishDate={selectedSpanishDate}
          setShowHoursMenu={setShowHoursMenu}
          hours={hours}
          orderedAppointments={orderedAppointments}
          handleHourClick={handleHourClick}
        />
      )}
      {showAppDetails && (
        <AppointmentDetails
          selectedAppInfo={selectedAppInfo}
          setShowAppDetails={setShowAppDetails}
          selectedSpanishDate={selectedSpanishDate}
          setAppointments={setAppointments}
          newAppHour={newAppHour}
          selectedDate={selectedDate}
        />
      )}

      <div className="calendar-top">
        <FaArrowLeft
          className="arrow-icon"
          onClick={() => changeMonth("previous")}
        />
        <h3 className="month">{months[month]}</h3>
        <FaArrowRight
          className="arrow-icon"
          onClick={() => changeMonth("next")}
        />
        <h3 className="year">{year}</h3>
      </div>

      <div className="calendar-days">
        <div className="week-day">LUN</div>
        <div className="week-day">MAR</div>
        <div className="week-day">MIÉ</div>
        <div className="week-day">JUE</div>
        <div className="week-day">VIE</div>
        <div className="week-day">SÁB</div>
        <div className="week-day">DOM</div>

        {days.map((day, i) => {
          const processedDay = String(day.number).padStart(2, "0");
          const processedMonth = String(month+1).padStart(2, "0");
          const dayDate = `${year}-${processedMonth}-${processedDay}`;
          const dayAppointments = orderedAppointments[dayDate]
            ? Object.keys(orderedAppointments[dayDate])
            : null;
          const morningAppointments = dayAppointments?.filter((app, i) => {
            const appHour = Number(app.split(":")[0]);
            if (appHour < 15) return true;
            return false;
          });
          const afternoonAppointments = dayAppointments?.filter((app, i) => {
            const appHour = Number(app.split(":")[0]);
            if (appHour >= 15) return true;
            return false;
          });
          return (
            <div
              className="day"
              key={i}
              style={{ gridColumn: day.weekDay == 0 ? 7 : day.weekDay }}
              onClick={() => handleDayClick(processedDay, processedMonth)}
            >
              <p className="day-number">{day.number}</p>
              <div
                className={
                  morningAppointments?.length < 3 || !morningAppointments
                    ? "day-morning green"
                    : morningAppointments?.length >= 3 &&
                        morningAppointments?.length <= 8
                      ? "day-morning orange"
                      : morningAppointments?.length == 9
                        ? "day-morning red"
                        : "day-morning"
                }
              ></div>
              <div
                className={
                  afternoonAppointments?.length < 3 || !afternoonAppointments
                    ? "day-afternoon green"
                    : afternoonAppointments?.length >= 3 &&
                        afternoonAppointments?.length <= 12
                      ? "day-afternoon orange"
                      : afternoonAppointments?.length == 13
                        ? "day-afternoon red"
                        : "day-afternoon"
                }
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
