import { useContext, useEffect, useState, useRef } from "react";
import { generateAnualCalendarClient } from "../../../common/calendario/calendario";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { getUserAppointments } from "../../../common/supabase/functions";
import { useAuth } from "../../../common/supabase/config";
import { getSchedule } from "../../../common/supabase/functions";
import { Context } from "../../../common/context/Context";
const ReservarHora = () => {
  const { user } = useAuth();
  const {
    currentStep,
    setCurrentStep,
    selectedDay,
    setSelectedDay,
    selectedHour,
    setSelectedHour,
    selectedDate,
    setSelectedDate,
    setSelectedDayName,
    userAppointments,
    setUserAppointments,
    dbSchedule,
    setDbSchedule,
    date,
    setDate,
    year,
    month,
    monthDays,
    weekDays,
    hours,
    setHours,
    showDayHours
  } = useContext(Context);
  const [dayCount, setDayCount] = useState(7);
  const showedDays = 7;
  const calendar = generateAnualCalendarClient(2026);
  const selectedWeek = calendar.slice(dayCount - 7, dayCount);

  let days = [];
  for (let i = 0; i < monthDays; i++) {
    let weekDay = new Date(year, month, i + 1).getDay();
    let dayName = weekDays[weekDay];
    days.push({ number: i + 1, weekDay, name: dayName });
  }

  const increaseDayCount = () => {
    setDayCount((prev) => Math.min(prev + showedDays, calendar.length));
  };
  const decreaseDayCount = () => {
    setDayCount((prev) => Math.max(prev - showedDays, showedDays));
  };
  const selectDay = (e, date, i) => {
    setSelectedDate(`${date.year}-${date.month[0]}-${date.day[0]}`);
    setSelectedDay(date.day[0]);
    setSelectedDayName(date.day[1]);
    setHours(showDayHours(days, `${date.year}-${date.month[0]}-${date.day[0]}`));
  };
  const selectHour = (e, hour) => {
    setSelectedHour(hour);
    // bookAppointment()
  };

  const finalStep = () => {
    setCurrentStep(3);
  };

  return (
    <>
      <div className="calendario-container">
        <FaArrowLeft
          className={"flecha"}
          onClick={decreaseDayCount}
        ></FaArrowLeft>
        <div className="calendario-dias">
          {selectedWeek.map((date, i) => {
            return (
              <div
                key={i}
                className={
                  selectedDay == date.day[0]
                    ? "tarjeta-dia day-selected"
                    : "tarjeta-dia"
                }
                onClick={(e) => selectDay(e, date, i)}
              >
                <span className="nombre-dia">{date.day[1]}</span>
                <span className="numero-dia">{date.day[0]}</span>
                <span className="nombre-mes">{date.month[1]}</span>
              </div>
            );
          })}
        </div>

        <FaArrowRight
          className={"flecha"}
          onClick={increaseDayCount}
        ></FaArrowRight>
      </div>
      {selectedDay && (
        <div className="hours">
          {hours?.map((hour, i) => {
            const appointment = `${selectedDate}T${hour}:00`;
            let isBooked = false;
            let isBookedByMe = false;
            if (dbSchedule)
              dbSchedule.forEach((date, i) => {
                if (date == appointment) isBooked = true;
                if (userAppointments)
                  userAppointments.forEach((app, i) => {
                    if (app.date == appointment) isBookedByMe = true;
                  });
              });
            return (
              <div
                key={i}
                className={
                  isBookedByMe
                    ? "hour booked-by-me"
                    : isBooked
                      ? "hour booked"
                      : hour == selectedHour
                        ? "hour hour-selected"
                        : "hour"
                }
                onClick={(e) => {
                  if (!isBooked && !isBookedByMe) selectHour(e, hour);
                }}
              >
                {hour}
              </div>
            );
          })}
        </div>
      )}
      <button
        type="button"
        className={
          selectedHour ? "next-button next-button-active" : "next-button"
        }
        onClick={finalStep}
      >
        Siguiente
      </button>
    </>
  );
};

export default ReservarHora;
