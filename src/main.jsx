import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import {ContextProvider} from "./common/context/Context.jsx"
import { AuthProvider } from "./common/supabase/config.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <HashRouter>
    <ContextProvider>
      <App />
      </ContextProvider>
    </HashRouter>
    </AuthProvider>
  </StrictMode>,
);
