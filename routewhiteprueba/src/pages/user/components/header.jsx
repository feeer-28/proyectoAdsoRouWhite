import { Link } from 'react-router-dom';
import { LogIn, Menu } from 'lucide-react';
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Logo } from "./logo";

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/rutas', label: 'Rutas' },
  { href: '/paraderos', label: 'Paraderos' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
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
          <Button asChild className="hidden md:flex">
            <Link to="/login">
              Iniciar Sesión
              <LogIn className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="p-4 pt-6">
                <Logo />
              </div>
              <nav className="grid gap-4 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex items-center space-x-2 rounded-md p-2 text-lg font-medium hover:bg-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-4 left-4 right-4">
                <Button asChild className="w-full">
                  <Link to="/login">
                    Iniciar Sesión
                    <LogIn className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}