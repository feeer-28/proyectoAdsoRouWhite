import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

// Páginas públicas
import Inicio from "./pages/inicio";
import Rutas from "./pages/Rutas";
import Registro from "./pages/registro";
import Login from "./pages/login";
import Nosotros from "./pages/Nosotros";
import Contactos from "./pages/Contactos";
import Header from "./components/Header";

// Páginas administrador
import RegistroAdministrador from "./pages/Administrador/registroAdministrador";
import LoginAdministrador from "./pages/Administrador/loginAdministrador";
import DashboardRouWhite from "./pages/Administrador/dashboarAdmin";
import CrearParadero from "./pages/Administrador/crearParadero";
import ListarParaderos from "./pages/Administrador/listarParaderos";

// 📌 Agregamos las rutas faltantes de “Rutas”
import CrearR from "./pages/Administrador/crearR";
import ListarR from "./pages/Administrador/listarR";

function App() {
  return (
    <GoogleOAuthProvider clientId="757412276663-eibo0h04o1dcjh21n0eedqfo210f0vt3.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas con Header */}
          <Route path="/" element={<><Header /><Inicio /></>} />
          <Route path="/rutas" element={<><Header /><Rutas /></>} />
          <Route path="/registro" element={<><Header /><Registro /></>} />
          <Route path="/login" element={<><Header /><Login /></>} />
          <Route path="/registro-administrador" element={<><Header /><RegistroAdministrador rol="admin" /></>} />
          <Route path="/login-administrador" element={<><Header /><LoginAdministrador /></>} />
          <Route path="/nosotros" element={<><Header /><Nosotros /></>} />
          <Route path="/contactos" element={<><Header /><Contactos /></>} />

          {/* Rutas del administrador SIN Header */}
          <Route path="/admin/dashboard" element={<DashboardRouWhite />} />
          <Route path="/administrador/crearParadero" element={<CrearParadero />} />
          <Route path="/administrador/listarParaderos" element={<ListarParaderos />} />
          <Route path="/administrador/crearR" element={<CrearR />} />
          <Route path="/administrador/listarR" element={<ListarR />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
