// src/pages/user/HomePage.jsx

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, ArrowRight, Users, CheckCircle } from 'lucide-react'
import { useToast } from '@userHooks/use-toast.js'
import { AnimatedSection } from '@userComponents/animated-section.jsx'
import { Input } from '@userComponents/ui/input.jsx'
import { Button } from '@userComponents/ui/button.jsx'
import { Card, CardHeader, CardTitle, CardContent } from '@userComponents/ui/card.jsx'
import { Avatar, AvatarImage, AvatarFallback } from '@userComponents/ui/avatar.jsx'

const allRoutes = [
  {
    name: 'Ruta 1: Centro - Campanario',
    slug: 'ruta-1-centro-campanario',
    description:
      'Recorre los puntos más importantes del centro histórico y el norte de la ciudad.',
  },
  {
    name: 'Ruta 2: La Esmeralda - Centro',
    slug: 'ruta-2-la-esmeralda-centro',
    description: 'Conecta el sur-oriente con el corazón de Popayán.',
  },
  {
    name: 'Ruta 3: Retiro - Las Guacas',
    slug: 'ruta-3-retiro-las-guacas',
    description: 'Una ruta transversal que te lleva de occidente a oriente.',
  },
  {
    name: 'Ruta 5: Hospital - Terminal',
    slug: 'ruta-5-hospital-terminal',
    description:
      'Ruta clave para acceder a servicios de salud y transporte intermunicipal.',
  },
]

const featuredStops = [
  {
    name: 'Parque Caldas',
    slug: 'parque-caldas',
    description:
      'Punto de partida y llegada para múltiples rutas en el corazón de la ciudad.',
  },
  {
    name: 'Centro Comercial Campanario',
    slug: 'campanario',
    description:
      'Accede al principal centro comercial y sus alrededores en el norte.',
  },
  {
    name: 'Terminal de Transportes',
    slug: 'terminal-transportes',
    description:
      'Conecta con el transporte intermunicipal y varias rutas urbanas.',
  },
  {
    name: 'SENA',
    slug: 'sena',
    description:
      'Paradero clave para estudiantes y trabajadores en la zona occidental.',
  },
]

const teamMembers = [
  { name: 'Ana García', image: 'https://placehold.co/400x400.png' },
  { name: 'Carlos Martínez', image: 'https://placehold.co/400x400.png' },
  { name: 'Laura Rodríguez', image: 'https://placehold.co/400x400.png' },
  { name: 'Javier López', image: 'https://placehold.co/400x400.png' },
  { name: 'Sofía Hernández', image: 'https://placehold.co/400x400.png' },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [locationActive, setLocationActive] = useState(false)
  const { toast } = useToast()

  const handleSearchChange = (e) => setSearchQuery(e.target.value)
  const handleLocationClick = () => {
    setLocationActive(true)
    toast({
      title: 'Ubicación Activada',
      description: 'Mostrando paraderos y rutas cercanas en tiempo real.',
    })
  }

  const filteredRoutes = searchQuery
    ? allRoutes.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const showSearchResults = searchQuery.trim().length > 0

  return (
    <>
      {/* Hero */}
      <AnimatedSection className="relative w-full min-h-screen flex flex-col items-center justify-center text-white px-4 py-16 overflow-visible">
        <img
          src="https://hotelcaminoreal.com.co/wp-content/uploads/2017/12/popayan.jpg"
          alt="Popayán"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl text-center space-y-6">
          <h1 className="text-5xl font-bold">
            La forma más fácil de moverte por{' '}
            <span className="text-primary">Popayán</span>
          </h1>
          <p className="text-lg md:text-xl">
            Con RouWhite, encuentra las rutas de bus que necesitas en segundos.
            Activa tu ubicación para ver paraderos cercanos.
          </p>

          <div className="mt-10 space-y-4">
            <form
              className="mx-auto flex max-w-md space-x-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="search"
                placeholder="Busca una ruta o destino..."
                className="flex-1 bg-white/90 text-foreground"
                value={searchQuery}
                onChange={handleSearchChange}
                icon={<Search className="h-5 w-5 text-muted-foreground" />}
              />
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <span className="sr-only">Buscar</span>
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <Button
              variant="outline"
              className="mx-auto bg-transparent border-white text-white hover:bg-white hover:text-black disabled:opacity-70 transition-all"
              onClick={handleLocationClick}
              disabled={locationActive}
            >
              {locationActive ? (
                <CheckCircle className="mr-2 h-4 w-4" />
              ) : (
                <MapPin className="mr-2 h-4 w-4" />
              )}
              {locationActive
                ? 'Ubicación Activada'
                : 'Activar ubicación en tiempo real'}
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Busca tu ruta (opcional resultados) */}
      {showSearchResults && (
        <AnimatedSection className="py-16">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h2 className="text-2xl font-semibold">Resultados de búsqueda</h2>
          </div>
          <div className="mt-6 max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRoutes.length > 0 ? (
              filteredRoutes.map((route) => (
                <Card key={route.slug} className="hover:shadow-lg transition-shadow flex flex-col h-full">
                  <CardHeader>
                    <CardTitle>{route.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow">
                    <p className="mb-4 text-muted-foreground">
                      {route.description}
                    </p>
                    <Link
                      to={`/rutas/${route.slug}`}
                      className="mt-auto inline-flex items-center text-primary hover:underline"
                    >
                      Ver detalles <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No se encontraron rutas para “{searchQuery}”.
              </p>
            )}
          </div>
        </AnimatedSection>
      )}

      {/* Nuestras Rutas */}
      <AnimatedSection
        id="routes"
        className="py-12 "
      >
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold">Nuestras Rutas</h2>
          <p className="text-muted-foreground">
            Explora las rutas disponibles y encuentra la que mejor se adapte a tu
            viaje, sin complicaciones.
          </p>
        </div>

        <div className="mt-8 max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allRoutes.map((route) => (
            <Card key={route.slug} className="hover:shadow-lg transition-shadow flex flex-col h-full">
              <CardHeader>
                <CardTitle>{route.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <p className="mb-4 text-muted-foreground">{route.description}</p>
                <Link
                  to={`/rutas/${route.slug}`}
                  className="mt-auto inline-flex items-center text-primary hover:underline"
                >
                  Ver detalles <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link to="/rutas">Ver Todas las Rutas</Link>
          </Button>
        </div>

      </AnimatedSection>

      {/* Paraderos Destacados */}
      <AnimatedSection
        id="paraderos"
        className="py-12 bg-muted/40 rounded-xl"
      >
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="inline-block bg-primary/20 px-3 py-1 text-sm text-primary rounded-lg">
            Puntos Clave
          </span>
          <h2 className="text-3xl font-bold">Paraderos Destacados</h2>
          <p className="text-muted-foreground">
            Encuentra los paraderos más importantes de la ciudad y planifica tu
            viaje con antelación.
          </p>
        </div>

        <div className="mt-10 max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredStops.map((stop) => (
            <Card key={stop.slug} className="hover:shadow-lg transition-shadow flex flex-col h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  {stop.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <p className="mb-4 text-muted-foreground">{stop.description}</p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-auto text-primary border-primary hover:bg-primary hover:text-white transition-all"
                >
                  <Link to="/paraderos">Ver en mapa</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/paraderos">Ver Todos los Paraderos</Link>
          </Button>
        </div>
      </AnimatedSection>

      {/* Nuestro Equipo */}
      <AnimatedSection
        id="nosotros"
        className="py-12"
      >
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="inline-block bg-primary/20 px-3 py-1 text-sm text-primary rounded-lg">
            Nuestro Equipo
          </span>
          <h2 className="text-3xl font-bold">Conoce al Equipo</h2>
          <p className="text-muted-foreground">
            El equipo apasionado que hace posible RouWhite, dedicado a mejorar tu
            experiencia de viaje.
          </p>
        </div>

        <div className="mt-10 max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 justify-center">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center gap-2">
              <Avatar className="w-24 h-24 ring-4 ring-primary/20 hover:ring-primary/40 transition-all">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">{member.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 mb-20 text-center">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/nosotros">
              Más sobre Nosotros <Users className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </AnimatedSection>
    </>
  )
}
