import { supabase } from "./config";

export const register = async (name, surname, email, phone, password) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (authError) {
    console.log(authError);
    return authError;
  }
  console.log(authData);

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .insert([
      {
        id: authData.user.id,
        name,
        surname,
        phone,
        email: authData.user.email,
      },
    ])
    .select("*");
  if (profileError) console.log(profileError);
  console.log(profileData);
};

export const logIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if(error) return error
};
export const logOut = async () => {
  const { data, error } = await supabase.auth.signOut();
  if (error) return console.log(error);
  console.log(data);
};
export const getProfile = async (user_id, setProfile) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user_id);
  if (error) return console.log(error);
  setProfile(data[0]);
};
// Schedule & timetable functions
export const getSchedule = async (setDbSchedule) => {
  const { data, error } = await supabase.rpc("get_public_schedule");
  if (error) return console.log(error);
  let onlyDates = [];
  data.forEach((date, i) => {
    onlyDates.push(date.date);
  });
  setDbSchedule(onlyDates);
};
export const getDefaultTimetable = async(setDefaultTimetable)=>{
  const {data, error} = await supabase.from('default_timetable').select("*")
  if(error) return error;
  const timetableArr = [];
  data.forEach((slot, i)=>{
    if(!timetableArr[slot.week_day]) timetableArr[slot.week_day] = [];
    timetableArr[slot.week_day].push(slot)
  })
  setDefaultTimetable(timetableArr)
}

// Appointments functions
export const setAppointment = async (user_id, date) => {
  if (!user_id) return;
  const { data, error } = await supabase.from("appointments").insert([
    {
      user_id: user_id,
      date: date,
      status: "confirmed",
    },
  ]);
  if (error) return console.log(error);
  console.log(data);
};

export const getUserAppointments = async (user_id, setUserAppointments) => {
  const { data, error } = await supabase
    .from("appointments")
    .select("date, status")
    .eq("user_id", user_id);
  if (error) return console.log(error);
  setUserAppointments(data);
};


// Profile functions

export const updateProfileName = async (
  user_id,
  newName,
  setShowUpdateProfileMenuS,
  setProfile,
) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({ name: newName })
    .eq("id", user_id)
    .select();
  if (error) return console.log(error);
  setShowUpdateProfileMenuS(false);
  setProfile(data[0]);
};

export const updateProfileSurname = async (
  user_id,
  newSurname,
  setShowUpdateProfileMenuS,
  setProfile,
) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({ surname: newSurname })
    .eq("id", user_id)
    .select();
  if (error) return console.log(error);
  setShowUpdateProfileMenuS(false);
  setProfile(data[0]);
};
export const updateProfileEmail = async (
  newEmail,
  setShowUpdateProfileMenuS,
) => {
  const { data, error } = await supabase.auth.updateUser({ email: newEmail });
  if (error) return console.log(error);
  console.log(data);
  alert("Se ha enviado un correo para confirmar el cambio de correo");
  setShowUpdateProfileMenuS(false);
};

export const updateProfilePhone = async (
  user_id,
  newPhone,
  setShowUpdateProfileMenuS,
  setProfile,
) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({ phone: newPhone })
    .eq("id", user_id)
    .select();
  if (error) return console.log(error);
  setProfile(data[0]);
  setShowUpdateProfileMenuS(false);
};

// ADMIN
export const adminGetAppointments = async (isAdmin, setAppointments) => {
  if(!isAdmin) return
  const { data, error } = await supabase
    .from("appointments")
    .select("*, profiles(name, surname, phone, email)");
  if (error) {
    console.log(error);
    return error;
  }
  setAppointments(data);
};
export const adminDeleteAppointment = async(isAdmin, id, setAppointments) =>{
    if(!isAdmin) return
  const {data, error} = await supabase
  .from('appointments')
  .delete()
  .eq('appointment_id', id)
  if(error) return error;
  console.log(data)

  setAppointments(prev=>{
    const updatedAppointments = prev.filter((app, i)=>{
      return app.appointment_id !== id;
    })
    return updatedAppointments
  })
}
export const adminInsertAppointment = async(isAdmin, user_id,date,status, name, surname, phone, setAppointments)=>{
  if(!isAdmin) return
    const {data, error} = await supabase
    .from("appointments")
    .insert([{
      user_id: user_id,
      date,
      status,
      name, // if provided
      surname, // if provided
      phone // if provided
    }]).select().single()
  if(error) return error
  setAppointments((prev)=>[...prev, data])
}