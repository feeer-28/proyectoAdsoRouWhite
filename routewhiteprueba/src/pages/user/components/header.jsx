// src/components/header.jsx

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LogIn, Menu } from 'lucide-react'
import { Button } from '@userComponents/ui/button.jsx'
import { Logo } from '@userComponents/logo.jsx'
import { Sheet, SheetContent, SheetTrigger } from '@userComponents/ui/sheet.jsx'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/rutas', label: 'Rutas' },
  { href: '/paraderos', label: 'Paraderos' },
]

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 flex h-16 items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Login button */}
          <Button >
            <Link to="/login" className="flex items-center">
              Iniciar Sesión
              <LogIn className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          {/* Mobile menu */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left">
              <nav className="mt-10 grid gap-6 text-lg font-medium">
                <Logo />

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsSheetOpen(false)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
