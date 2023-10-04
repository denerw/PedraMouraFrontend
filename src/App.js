import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "scenes/admin";
import Login from "scenes/login";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import { themeSettings } from "theme";

import Maintenances from "scenes/maintenances";
import Vehicles from "scenes/vehicles";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={< Login/>} />
        </Routes>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/api/auth/google/callback" element={""} />
              <Route path="/api/auth/callback" element={<authCallBackPage />} />
              
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/veiculos" element={<Vehicles />} />
              <Route path="/manutencao" element={<Maintenances />} />
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
