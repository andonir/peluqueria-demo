import { useContext, useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import Calendar from "../components/Calendar";
import { Context } from "../../common/context/Context";
import { adminGetAppointments } from "../../common/supabase/functions";
import LogOut from "../components/LogOut";
import Legend from "../components/calendar/Legend";
const Admin = () => {
  const { profiles, isReady, isAdmin } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    adminGetAppointments(isAdmin, setAppointments);
  }, []);
  return (
    <>
      <AdminHeader />
      <main className="admin">
        <div className="admin-top">
          <Legend></Legend>
          <LogOut></LogOut>
        </div>

        <Calendar
          appointments={appointments}
          setAppointments={setAppointments}
        ></Calendar>
      </main>
    </>
  );
};

export default Admin;
