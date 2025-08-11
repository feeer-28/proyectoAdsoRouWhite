import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import Inicio from "./pages/user/inicio";

// Layout del administrador
import DashboardLayout from "./layouts/DashboardLayout";

// Páginas del administrador
import RegistroAdministrador from "./pages/Administrador/auth/registroAdministrador";
import LoginAdministrador from "./pages/Administrador/auth/loginAdministrador";
import DashboarAdmin from "./pages/Administrador/dashboard/dashboarAdmin";
import CrearParadero from "./pages/Administrador/paraderos/crearParadero";
import ListarParaderos from "./pages/Administrador/paraderos/listarParaderos";

// ⚠️ No incluyo ListarRutas porque ese archivo NO EXISTE en tu estructura actual

function App() {
  return (
    <GoogleOAuthProvider clientId="757412276663-eibo0h04o1dcjh21n0eedqfo210f0vt3.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          {/* 🧭 Ruta pública */}
          <Route path="/" element={<Inicio />} />

          {/* 🔐 Rutas del administrador */}
          <Route path="/registro-administrador" element={<RegistroAdministrador rol="admin" />} />
          <Route path="/login-administrador" element={<LoginAdministrador />} />

          {/* 🧱 Rutas protegidas con layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/admin/dashboard" element={<DashboarAdmin />} />
            <Route path="/administrador/crearParadero" element={<CrearParadero />} />
            <Route path="/administrador/listarParaderos" element={<ListarParaderos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
