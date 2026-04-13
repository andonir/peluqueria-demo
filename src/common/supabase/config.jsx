import { createClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

 export const supabase = createClient('https://dtjhxzlsfomvnypysdxu.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0amh4emxzZm9tdm55cHlzZHh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5OTU2MzgsImV4cCI6MjA4NzU3MTYzOH0.R24wbXa2E7hD9QulyChjA1n1HI1EsEXNbXX4BBc1Izw');

// CONTEXTO AUTHCONTEXT

const AuthContext = createContext({user:null, session:null})
export const AuthProvider = ({children})=>{
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        // Sesión inicial
        supabase.auth.getSession().then(({data})=>{
            setSession(data.session);
            setUser(data.session?.user ?? null)
            setLoading(false)
        })
        // Cambios de sesión
        const {data} = supabase.auth.onAuthStateChange((e, session)=>{
            setSession(session);
            setUser(session?.user??null);
        })
        return () => data.subscription.unsubscribe();
    },[])
    // useEffect(()=>{
    //     console.log(session)
    // },[session])

    return(
        <AuthContext.Provider value={{user,session,loading}}>
            {children}
        </AuthContext.Provider>
    )
}

 export const useAuth = ()=> useContext(AuthContext)


