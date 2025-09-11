// src/pages/user/ParaderosPage.jsx

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@userComponents/ui/card.jsx'
import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@userComponents/ui/button.jsx'
import { AnimatedSection } from '@userComponents/animated-section.jsx'

const allStops = [
  {
    name: 'Parque Caldas',
    description: 'Punto de partida y llegada para múltiples rutas en el corazón de la ciudad.',
    slug: 'parque-caldas',
  },
  {
    name: 'Centro Comercial Campanario',
    description: 'Accede al principal centro comercial y sus alrededores en el norte.',
    slug: 'campanario',
  },
  {
    name: 'Terminal de Transportes',
    description: 'Conecta con el transporte intermunicipal y varias rutas urbanas.',
    slug: 'terminal-transportes',
  },
  {
    name: 'SENA',
    description: 'Un paradero clave para estudiantes y trabajadores en la zona occidental.',
    slug: 'sena',
  },
  {
    name: 'Hospital San José',
    description: 'Paradero importante para acceder a los servicios de salud en la zona.',
    slug: 'hospital-san-jose',
  },
  {
    name: 'Barrio Bolívar',
    description: 'Un punto central en uno de los barrios más tradicionales de Popayán.',
    slug: 'barrio-bolivar',
  },
  {
    name: 'La Esmeralda',
    description: 'Parada principal en la comuna sur-oriente de la ciudad.',
    slug: 'la-esmeralda',
  },
  {
    name: 'Las Guacas',
    description: 'Punto de conexión en la zona oriental, cerca de áreas residenciales.',
    slug: 'las-guacas',
  },
]

export default function ParaderosPage() {
  return (
    <AnimatedSection className="py-12">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
        <h1 className="text-3xl font-bold sm:text-5xl">Todos los Paraderos</h1>
        <p className="text-muted-foreground">
          Encuentra información sobre los paraderos de transporte público en Popayán.
        </p>
      </div>

      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {allStops.map((stop) => (
          <Card
            key={stop.slug}
            className="flex flex-col rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {stop.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between p-6">
              <p className="text-muted-foreground text-sm mb-4 flex-1">{stop.description}</p>
              <Button
                asChild
                variant="outline"
                className="w-full mt-auto border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Link to={`/paraderos`}>Ver en mapa <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </AnimatedSection>
  )
}
