import { createContext, useState, useEffect } from "react";
import { getProfile } from "../supabase/functions";
import { getSchedule } from "../supabase/functions";
import { getUserAppointments, getDefaultTimetable} from "../supabase/functions";
import { useAuth } from "../supabase/config";
export const Context = createContext();
export const ContextProvider = (props) => {
  const [profile, setProfile] = useState(null);
  const { user } = useAuth();
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDayName, setSelectedDayName] = useState(null);
  const [newEmail, setNewEmail] = useState(null);

  const [userAppointments, setUserAppointments] = useState(null);
  const [dbSchedule, setDbSchedule] = useState(null);
  const [defaultTimetable, setDefaultTimetable] = useState(null);
  const isReady = user && profile;
  const isAdmin = isReady && user?.app_metadata?.role ==='admin'

  const [date, setDate] = useState(new Date());
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthDays = new Date(year, month + 1, 0).getDate();
  const weekDays = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
  const [hours, setHours] = useState(null)
  const [days, setDays] = useState([])
  useEffect(() => {
    if (!user) {
      return;
    }
    getProfile(user.id, setProfile);
    getSchedule(setDbSchedule);
    getDefaultTimetable(setDefaultTimetable)
    getUserAppointments(user.id, setUserAppointments);
  }, [user]);

  
  const createHoursArr = (start, end) => {
    const startMin = Number(start.split(":")[0]) * 60;
    const endMin = Number(end.split(":")[0]) * 60;
    const duration = 30;
    let arr = [];
    for (let t = startMin; t < endMin; t += duration) {
      const h = String(Math.floor(t / 60)).padStart(2, "0");
      const m = String(Math.floor(t % 60)).padStart(2, "0");
      arr.push(`${h}:${m}`);
    }
    return arr;
  };
  const showDayHours = (days, selectedDate)=>{
    const day = days[Number(selectedDate.split("-").at(-1)) - 1].weekDay;
    const daySlots = defaultTimetable[day];
    let hours;
  
    daySlots.forEach((slot, i) => {
      console.log(slot)
    if (daySlots.length > 1) {
      if (i == 0) hours = createHoursArr(slot.start_time, slot.end_time);
      else hours.push(...createHoursArr(slot.start_time, slot.end_time));
    } else {
      hours = createHoursArr(slot.start_time, slot.end_time);
    }
  });
  return hours
  }
  
  return (
    <Context.Provider
      value={{
        isRegisterActive,
        setIsRegisterActive,
        currentStep,
        setCurrentStep,
        selectedDay,
        setSelectedDay,
        selectedHour,
        setSelectedHour,
        selectedDate,
        setSelectedDate,
        selectedDayName,
        setSelectedDayName,
        profile,
        setProfile,
        newEmail,
        setNewEmail,
        userAppointments,
        setUserAppointments,
        dbSchedule,
        setDbSchedule,
        isAdmin,
        isReady,
        defaultTimetable,
        showDayHours,
        date, 
        setDate, 
        year, 
        month,
        monthDays,
        weekDays,
        hours, 
        setHours,
        days,
        setDays
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
