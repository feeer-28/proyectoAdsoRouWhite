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
import Header from "./components/Header";
import { GoogleOAuthProvider } from '@react-oauth/google';

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
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/administrador/crearParadero" element={<CrearParadero />} />
          <Route path="/administrador/listarParaderos" element={<ListarParaderos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contactos" element={<Contactos />} />
          {/* Puedes agregar más rutas aquí según sea necesario */}
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
