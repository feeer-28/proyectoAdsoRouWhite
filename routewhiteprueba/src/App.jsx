// src/App.jsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Landing pública
import HomePage from "./pages/user/HomePage.jsx";
import NosotrosPage from "./pages/user/NosotrosPage.jsx";
import RutasPage from "./pages/user/RutasPage.jsx";
import RutaDetailPage from "./pages/user/RutaDetailPage.jsx";
import ParaderosPage from "./pages/user/ParaderosPage.jsx";

// Auth usuario
// import Login from "./pages/user/auth/login.jsx";
// import Registro from "./pages/user/auth/registro.jsx";

// Layout del administrador
import DashboardLayout from "./layouts/DashboardLayout.jsx";

// Auth administrador
import RegistroAdministrador from "./pages/Administrador/auth/registroAdministrador.jsx";
import LoginAdministrador from "./pages/Administrador/auth/loginAdministrador.jsx";

// Dashboard & paraderos
import DashboarAdmin from "./pages/Administrador/dashboard/dashboarAdmin.jsx";
import CrearParadero from "./pages/Administrador/paraderos/crearParadero.jsx";
import ListarParaderos from "./pages/Administrador/paraderos/listarParaderos.jsx";

// Rutas
import CrearR from "./pages/Administrador/rutas/crearR.jsx";
import ListarR from "./pages/Administrador/rutas/listarR.jsx";

function App() {
  return (
    <GoogleOAuthProvider clientId="TU_CLIENT_ID_AQUÍ">
      <BrowserRouter>
        <Routes>

          {/* ✅ Landing pública */}
          <Route path="/" element={<HomePage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/rutas" element={<RutasPage />} />
          <Route path="/rutas/:id" element={<RutaDetailPage />} />
          <Route path="/paraderos" element={<ParaderosPage />} />

          {/* ✅ Auth administrador */}
          <Route
            path="/registro-administrador"
            element={<RegistroAdministrador rol="admin" />}
          />
          <Route
            path="/login-administrador"
            element={<LoginAdministrador />}
          />

          {/* ✅ Área protegida Admin */}
          <Route path="/administrador" element={<DashboardLayout />}>
            <Route index element={<DashboarAdmin />} />
            <Route path="dashboard" element={<DashboarAdmin />} />
            <Route path="crearParadero" element={<CrearParadero />} />
            <Route path="listarParaderos" element={<ListarParaderos />} />
            <Route path="rutas/crear" element={<CrearR />} />
            <Route path="rutas/listar" element={<ListarR />} />
            <Route path="crearR" element={<CrearR />} />
            <Route path="listarR" element={<ListarR />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
