import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from "./pages/inicio";
import Rutas from "./pages/Rutas";
import Registro from "./pages/registro";
import RegistroAdministrador from "./pages/Administrador/registroAdministrador";
import Login from "./pages/login";
import LoginAdministrador from "./pages/Administrador/loginAdministrador";
import DashboardAdmin from './pages/Administrador/dashboarAdmin';
import CrearParadero from "./pages/Administrador/crearParadero";
import ListarParaderos from "./pages/Administrador/listarParaderos";
import Nosotros from "./pages/Nosotros";
import Contactos from "./pages/Contactos";
import Header from "./components/header";
import { GoogleOAuthProvider } from '@react-oauth/google';

import { GoogleOAuthProvider } from "@react-oauth/google";

// Layout del administrador
import DashboardLayout from "./layouts/DashboardLayout";

// Páginas del administrador
import RegistroAdministrador from "./pages/Administrador/auth/registroAdministrador";
import LoginAdministrador from "./pages/Administrador/auth/loginAdministrador";
import DashboarAdmin from "./pages/Administrador/dashboard/dashboarAdmin.jsx"; // 👈 nombre corregido

import CrearParadero from "./pages/Administrador/paraderos/crearParadero";
import ListarParaderos from "./pages/Administrador/paraderos/listarParaderos";
import CrearR from "./pages/Administrador/rutas/crearR";
import ListarR from "./pages/Administrador/rutas/listarR";


function App() {
  return (
    <GoogleOAuthProvider clientId="757412276663-eibo0h04o1dcjh21n0eedqfo210f0vt3.apps.googleusercontent.com">
      <BrowserRouter>
        <Header />
        <Routes>

          <Route path="/" element={<Inicio />} />
          <Route path="/rutas" element={<Rutas />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro-administrador" element={<RegistroAdministrador rol="admin" />} />
          <Route path="/login-administrador" element={<LoginAdministrador />} />
          <Route path="/administrador/dashboarAdmin" element={<DashboardAdmin />} />
          <Route path="/administrador/crearParadero" element={<CrearParadero />} />
          <Route path="/administrador/listarParaderos" element={<ListarParaderos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contactos" element={<Contactos />} />
          {/* Puedes agregar más rutas aquí según sea necesario */}

          {/* 🔐 Rutas del administrador */}
          <Route path="/registro-administrador" element={<RegistroAdministrador rol="admin" />} />
          <Route path="/login-administrador" element={<LoginAdministrador />} />
          <Route element={<DashboardLayout />}>
            <Route path="/admin/dashboard" element={<DashboarAdmin />} />
            <Route path="/administrador/crearParadero" element={<CrearParadero />} />
            <Route path="/administrador/listarParaderos" element={<ListarParaderos />} />
            <Route path="/administrador/crearR" element={<CrearR />} />
            <Route path="/administrador/listarR" element={<ListarR />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
