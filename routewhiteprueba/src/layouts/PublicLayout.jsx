// src/layouts/PublicLayout.jsx

import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@userComponents/header.jsx'
import { Footer } from '@userComponents/footer.jsx'

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Contenedor maestro: centra el contenido, fija ancho y da espacio entre secciones */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-16 space-y-24">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
