import { useState, useEffect } from 'react';
import { Header } from "@userComponents/header.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "@userComponents/ui/card.jsx";
import { Button } from "@userComponents/ui/button.jsx";
import { Bus, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const routesData = {
    'ruta-1-centro-campanario': {
      name: 'Ruta 1: Centro - Campanario',
      description: 'Recorre los puntos más importantes del centro histórico y el norte de la ciudad.',
      stops: ['Parque Caldas', 'Puente del Humilladero', 'Morro de Tulcán', 'Centro Comercial Campanario'],
      schedule: 'Lunes a Sábado: 5:00 AM - 10:00 PM'
    },
    'ruta-2-la-esmeralda-centro': {
      name: 'Ruta 2: La Esmeralda - Centro',
      description: 'Conecta el sur-oriente con el corazón de Popayán.',
      stops: ['La Esmeralda', 'Barrio Bolívar', 'Galería La 13', 'Parque Caldas'],
      schedule: 'Lunes a Domingo: 5:30 AM - 9:00 PM'
    },
    'ruta-3-retiro-las-guacas': {
      name: 'Ruta 3: Retiro - Las Guacas',
      description: 'Una ruta transversal que te lleva de occidente a oriente.',
      stops: ['El Retiro', 'SENA', 'Terminal de Transportes', 'Las Guacas'],
      schedule: 'Lunes a Sábado: 6:00 AM - 9:30 PM'
    },
    'ruta-4-julumito-centro': {
      name: 'Ruta 4: Julumito - Centro',
      description: 'Acercando las veredas a la zona urbana de la ciudad.',
      stops: ['Vereda Julumito', 'Puente deprimido', 'Carrera 9na', 'Parque Caldas'],
      schedule: 'Lunes a Viernes: 6:00 AM - 7:00 PM'
    },
    'ruta-5-hospital-terminal': {
        name: 'Ruta 5: Hospital - Terminal',
        description: 'Ruta clave para acceder a servicios de salud y de transporte intermunicipal.',
        stops: ['Hospital San José', 'Clínica La Estancia', 'Barrio Modelo', 'Terminal de Transportes'],
        schedule: 'Lunes a Sábado: 5:45 AM - 9:00 PM'
    },
    'ruta-6-norte-centro-sur': {
        name: 'Ruta 6: Norte - Centro - Sur',
        description: 'Atraviesa la ciudad de punta a punta, ideal para viajes largos.',
        stops: ['Campanario', 'Centro', 'Barrio Bolívar', 'La Esmeralda'],
        schedule: 'Lunes a Domingo: 5:00 AM - 10:30 PM'
    },
    'ruta-7-variante-campamento': {
        name: 'Ruta 7: Variante - Campamento',
        description: 'Cubre la zona de la variante y el área de campamento, vital para trabajadores.',
        stops: ['Variante Sur', 'El Uvo', 'Puelenje', 'Campamento'],
        schedule: 'Lunes a Viernes: 6:15 AM - 8:00 PM'
    },
    'ruta-8-los-robles-centro': {
        name: 'Ruta 8: Los Robles - Centro',
        description: 'Conecta el popular barrio Los Robles directamente con el centro de la ciudad.',
        stops: ['Barrio Los Robles', 'Avenida Panamericana', 'Carrera 6ta', 'Parque Caldas'],
        schedule: 'Lunes a Sábado: 6:00 AM - 9:00 PM'
    },
};

export default function RutaDetailPage({ params }) {
  const route = routesData[params.slug];
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
      setCurrentYear(new Date().getFullYear());
  }, []);

  if (!route) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <Header />
            <main className="flex-1 flex items-center justify-center text-center">
                <div>
                    <h1 className="text-4xl font-bold">Ruta no encontrada</h1>
                    <p className="text-muted-foreground mt-2">La ruta que buscas no existe.</p>
                    <Button asChild className="mt-6">
                        <Link to="/rutas">Volver a todas las rutas</Link>
                    </Button>
                </div>
            </main>
        </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Button asChild variant="outline">
              <Link to="/rutas">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a todas las rutas
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            <div className="flex items-center justify-center bg-muted rounded-lg shadow-lg relative aspect-video">
                 <img
                    src="https://placehold.co/600x400.png"
                    alt="Mapa de la ruta"
                    data-ai-hint="map placeholder"
                    className="object-cover rounded-lg w-full h-full"
                  />
            </div>
            
            <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">{route.name}</h1>
                    <p className="text-muted-foreground md:text-lg">{route.description}</p>
                </div>

                <Card className="rounded-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary"/>
                            <span>Horario</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{route.schedule}</p>
                    </CardContent>
                </Card>

                <Card className="rounded-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <MapPin className="h-5 w-5 text-primary"/>
                           <span>Paraderos Principales</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {route.stops.map((stop) => (
                                <li key={stop} className="flex items-center gap-3">
                                    <div className="h-2.5 w-2.5 rounded-full bg-primary/50" />
                                    <span>{stop}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

          </div>
        </div>
      </main>
      <footer className="border-t bg-card">
        <div className="container mx-auto py-8 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Bus className="h-5 w-5 text-primary" />
                <p>&copy; {currentYear} PayánTransit.</p>
            </div>
            <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
                <Link to="/nosotros" className="hover:text-foreground">Nosotros</Link>
                <Link to="/rutas" className="hover:text-foreground">Rutas</Link>
                <Link to="/paraderos" className="hover:text-foreground">Paraderos</Link>
            </nav>
        </div>
      </footer>
    </div>
  );
}
