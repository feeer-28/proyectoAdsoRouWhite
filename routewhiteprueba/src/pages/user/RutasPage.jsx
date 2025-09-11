// src/pages/user/RutasPage.jsx

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@userComponents/ui/card.jsx'
import { ArrowRight, Bus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatedSection } from '@userComponents/animated-section.jsx'

const allRoutes = [
  {
    name: 'Ruta 1: Centro - Campanario',
    slug: 'ruta-1-centro-campanario',
    description: 'Recorre los puntos más importantes del centro histórico y el norte de la ciudad.',
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
    name: 'Ruta 4: Julumito - Centro',
    slug: 'ruta-4-julumito-centro',
    description: 'Acercando las veredas a la zona urbana de la ciudad.',
  },
  {
    name: 'Ruta 5: Hospital - Terminal',
    slug: 'ruta-5-hospital-terminal',
    description: 'Ruta clave para acceder a servicios de salud y de transporte intermunicipal.',
  },
  {
    name: 'Ruta 6: Norte - Centro - Sur',
    slug: 'ruta-6-norte-centro-sur',
    description: 'Atraviesa la ciudad de punta a punta, ideal para viajes largos.',
  },
  {
    name: 'Ruta 7: Variante - Campamento',
    slug: 'ruta-7-variante-campamento',
    description: 'Cubre la zona de la variante y el área de campamento, vital para trabajadores.',
  },
  {
    name: 'Ruta 8: Los Robles - Centro',
    slug: 'ruta-8-los-robles-centro',
    description: 'Conecta el popular barrio Los Robles directamente con el centro de la ciudad.',
  },
]

export default function RutasPage() {
  return (
    <AnimatedSection className="py-12">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
        <h1 className="text-3xl font-bold sm:text-5xl">Todas las Rutas</h1>
        <p className="text-muted-foreground">
          Explora todas las rutas de transporte público disponibles en Popayán.
        </p>
      </div>

      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {allRoutes.map((route) => (
          <Card
            key={route.name}
            className="flex flex-col rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Bus className="h-6 w-6 text-primary" />
                {route.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between p-6">
              <p className="text-muted-foreground text-sm mb-4 flex-1">{route.description}</p>
              <Link
                to={`/rutas/${route.slug}`}
                className="mt-auto inline-flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-md transition-colors"
              >
                Ver detalles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </AnimatedSection>
  )
}
