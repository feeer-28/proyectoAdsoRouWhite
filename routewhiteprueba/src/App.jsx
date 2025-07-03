import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/inicio";
import Rutas from "./pages/Rutas";
import Registro from "./pages/registro";
import RegistroAdministrador from "./pages/Administrador/registroAdministrador";
import Login from "./pages/login";
import LoginAdministrador from "./pages/Administrador/loginAdministrador";
import DashboardAdmin from "./pages/Administrador/dashboarAdmin";
import CrearParadero from "./pages/Administrador/crearParadero";
import ListarParaderos from "./pages/Administrador/listarParaderos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/rutas" element={<Rutas />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro-administrador" element={<RegistroAdministrador rol="admin" />} />
        <Route path="/login-administrador" element={<LoginAdministrador />} />
        <Route path="/administrador/dashboard" element={<DashboardAdmin />} />
        <Route path="/administrador/crearParadero" element={<CrearParadero />} />
        <Route path="/administrador/listarParaderos" element={<ListarParaderos />} />
        {/* Puedes agregar más rutas aquí según sea necesario */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
