import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Páginas públicas
import Inicio from "./pages/inicio";
import Rutas from "./pages/Rutas";
import Registro from "./pages/registro";
import Login from "./pages/login";
import Nosotros from "./pages/Nosotros";
import Contactos from "./pages/Contactos";

// Componentes
import Header from "./components/header";
import DashboardLayout from "./pages/Administrador/DashboardLayout";

// Páginas del administrador
import RegistroAdministrador from "./pages/Administrador/registroAdministrador";
import LoginAdministrador from "./pages/Administrador/loginAdministrador";
import DashboardRouWhite from "./pages/Administrador/dashboarAdmin";
import CrearParadero from "./pages/Administrador/crearParadero";
import ListarParaderos from "./pages/Administrador/listarParaderos";
import CrearR from "./pages/Administrador/crearR";
import ListarR from "./pages/Administrador/listarR";

// Layout para rutas públicas
function UsuarioLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId="757412276663-eibo0h04o1dcjh21n0eedqfo210f0vt3.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>

          {/* 🧭 Rutas públicas con Header */}
          <Route element={<UsuarioLayout />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/rutas" element={<Rutas />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro-administrador" element={<RegistroAdministrador rol="admin" />} />
            <Route path="/login-administrador" element={<LoginAdministrador />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contactos" element={<Contactos />} />
          </Route>

          {/* 🔐 Rutas del administrador — con layout encapsulado */}
          <Route element={<DashboardLayout />}>
            <Route path="/admin/dashboard" element={<DashboardRouWhite />} />
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
