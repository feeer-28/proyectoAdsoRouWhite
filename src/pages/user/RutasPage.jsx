import { Header } from "./components/header";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { ArrowRight, Bus } from 'lucide-react';
import { Link } from 'react-router-dom';

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
];

export default function RutasPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Todas las Rutas</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explora todas las rutas de transporte público disponibles en Popayán.
                </p>
              </div>
            </div>
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {allRoutes.map((route) => (
                <Card key={route.name} className="flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Bus className="h-6 w-6 text-primary" />
                        {route.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between p-6">
                        <p className="text-muted-foreground text-sm mb-4 flex-1">{route.description}</p>
                        <Button asChild variant="outline" className="w-full mt-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        <Link to={`/rutas/${route.slug}`}>
                            Ver detalles
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        </Button>
                    </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-card">
        <div className="container mx-auto py-8 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Bus className="h-5 w-5 text-primary" />
                <p>&copy; {new Date().getFullYear()} RouWhite.</p>
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