import { useState } from "react";
import Header from "./client/components/Header";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./client/pages/Landing";
import Cita from "./client/pages/Cita";
import Profile from "./client/pages/Profile";
import AdminLogIn from "./admin/pages/AdminLogIn";
import Admin from "./admin/pages/Admin";
import { Context } from "./common/context/Context";
import { useContext, useEffect } from "react";
import { useAuth } from "./common/supabase/config";
function App() {
  const { isAdmin, isReady } = useContext(Context);
  const { user } = useAuth();
  return (
    <Routes>
      {/* CLIENT */}
      <Route path="/" element={<Navigate to="/client/" replace />} />
      <Route path="/client/" element={<Landing />}></Route>
      <Route path="/client/profile" element={<Profile />}></Route>
      <Route path="/client/appointment" element={<h1>OK APPOINTMENT</h1>} />
      {/* <Route path="/client/appointment" element={<Cita />}></Route> */}
      <Route path="*" element={<Navigate to="/client/" replace />} />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          !user ? (
            <Navigate to="/admin/login" />
          ) : !isReady ? (
            <h3>Loading...</h3>
          ) : isAdmin ? (
            <Admin />
          ) : (
            <Navigate to="/admin/login" />
          )
        }
      ></Route>
      <Route path="/admin/login" element={<AdminLogIn />}></Route>
    </Routes>
  );
}

export default App;
