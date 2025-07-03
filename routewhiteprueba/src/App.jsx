import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

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

// 🔁 Subcomponente que controla si mostrar o no el Header
const AppRoutes = () => {
  const location = useLocation();

  // Rutas donde NO se mostrará el header
  const rutasSinHeader = [
    "/login",
    "/login-administrador",
    "/registro",
    "/registro-administrador",
    "/administrador/dashboarAdmin",
    "/administrador/crearParadero",
    "/administrador/listarParaderos"
  ];

  const mostrarHeader = !rutasSinHeader.includes(location.pathname);

  return (
    <>
      {mostrarHeader && <Header />}
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
      </Routes>
    </>
  );
};

function App() {
  return (
    <GoogleOAuthProvider clientId="757412276663-eibo0h04o1dcjh21n0eedqfo210f0vt3.apps.googleusercontent.com">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
