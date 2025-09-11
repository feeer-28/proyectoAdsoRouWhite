// src/userComponents/footer.jsx

import React from 'react'
import { Link } from 'react-router-dom'
import { Bus } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-card text-muted-foreground text-sm">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Bus className="h-4 w-4 text-primary" />
          <span>© {new Date().getFullYear()} ROUW.</span>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link to="/nosotros" className="hover:text-foreground">Nosotros</Link>
          <Link to="/rutas" className="hover:text-foreground">Rutas</Link>
          <Link to="/paraderos" className="hover:text-foreground">Paraderos</Link>
        </nav>
      </div>
    </footer>
  )
}
