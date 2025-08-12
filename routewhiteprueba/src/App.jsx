// src/App.jsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Inicio from "./pages/user/inicio.jsx";

// Layout del administrador
import DashboardLayout from "./layouts/DashboardLayout.jsx";

// Auth administrador
import RegistroAdministrador from "./pages/Administrador/auth/registroAdministrador.jsx";
import LoginAdministrador    from "./pages/Administrador/auth/loginAdministrador.jsx";

// Dashboard & paraderos
import DashboarAdmin   from "./pages/Administrador/dashboard/dashboarAdmin.jsx";
import CrearParadero   from "./pages/Administrador/paraderos/crearParadero.jsx";
import ListarParaderos from "./pages/Administrador/paraderos/listarParaderos.jsx";

// Rutas
import CrearR  from "./pages/Administrador/rutas/crearR.jsx";
import ListarR from "./pages/Administrador/rutas/listarR.jsx";

function App() {
  return (
    <GoogleOAuthProvider clientId="TU_CLIENT_ID_AQUÍ">
      <BrowserRouter>
        <Routes>

          {/* Public */}
          <Route path="/" element={<Inicio />} />

          {/* Registro y Login Admin */}
          <Route
            path="/registro-administrador"
            element={<RegistroAdministrador rol="admin" />}
          />
          <Route
            path="/login-administrador"
            element={<LoginAdministrador />}
          />

          {/* Área protegida Admin - ruta original */}
          <Route path="/administrador" element={<DashboardLayout />}>
            <Route index element={<DashboarAdmin />} />
            <Route path="dashboard" element={<DashboarAdmin />} />
            <Route path="crearParadero"   element={<CrearParadero />} />
            <Route path="listarParaderos" element={<ListarParaderos />} />
            <Route path="rutas/crear"  element={<CrearR />} />
            <Route path="rutas/listar" element={<ListarR />} />
            <Route path="crearR"  element={<CrearR />} />
            <Route path="listarR" element={<ListarR />} />
          </Route>

          {/* Área protegida Admin - alias /admin */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<DashboarAdmin />} />
            <Route path="dashboard" element={<DashboarAdmin />} />
            <Route path="crearParadero"   element={<CrearParadero />} />
            <Route path="listarParaderos" element={<ListarParaderos />} />
            <Route path="rutas/crear"  element={<CrearR />} />
            <Route path="rutas/listar" element={<ListarR />} />
            <Route path="crearR"  element={<CrearR />} />
            <Route path="listarR" element={<ListarR />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
