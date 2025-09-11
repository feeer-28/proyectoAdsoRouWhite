// src/App.jsx

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Layouts
import PublicLayout from './layouts/PublicLayout.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'

// Páginas públicas (usuario)
import HomePage from './pages/user/HomePage.jsx'
import NosotrosPage from './pages/user/NosotrosPage.jsx'
import RutasPage from './pages/user/RutasPage.jsx'
import RutaDetailPage from './pages/user/RutaDetailPage.jsx'
import ParaderosPage from './pages/user/ParaderosPage.jsx'
import LoginUsuario from './pages/user/auth/login.jsx'
import RegistroUsuario from './pages/user/auth/registro.jsx'


// Autenticación administrador
import RegistroAdministrador from './pages/Administrador/auth/registroAdministrador.jsx'
import LoginAdministrador from './pages/Administrador/auth/loginAdministrador.jsx'

// Panel administrativo
import DashboardAdmin from './pages/Administrador/dashboard/dashboarAdmin.jsx'
import CrearParadero from './pages/Administrador/paraderos/crearParadero.jsx'
import ListarParaderos from './pages/Administrador/paraderos/listarParaderos.jsx'
import CrearR from './pages/Administrador/rutas/crearR.jsx'
import ListarR from './pages/Administrador/rutas/listarR.jsx'

function App() {
  return (
    <GoogleOAuthProvider clientId="757412276663-eibo0h04o1dcjh21n0eedqfo210f0vt3.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas bajo PublicLayout */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="nosotros" element={<NosotrosPage />} />
            <Route path="rutas" element={<RutasPage />} />
            <Route path="rutas/:id" element={<RutaDetailPage />} />
            <Route path="paraderos" element={<ParaderosPage />} />
            <Route path="login" element={<LoginUsuario />} />
            <Route path="registro" element={<RegistroUsuario />} />
          </Route>

          {/* Autenticación administrador sin layout */}
          <Route path="/registro-administrador" element={<RegistroAdministrador rol="admin" />} />
          <Route path="/login-administrador" element={<LoginAdministrador />} />

          {/* Panel administrativo bajo DashboardLayout */}
          <Route path="/administrador" element={<DashboardLayout />}>
            <Route index element={<DashboardAdmin />} />
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="crearParadero" element={<CrearParadero />} />
            <Route path="listarParaderos" element={<ListarParaderos />} />
            <Route path="crearR" element={<CrearR />} />
            <Route path="listarR" element={<ListarR />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
