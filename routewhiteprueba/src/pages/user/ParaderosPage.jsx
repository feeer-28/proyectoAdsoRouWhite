import { Header } from "./components/header";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { ArrowRight, Bus, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const allStops = [
  {
    name: "Parque Caldas",
    description: "Punto de partida y llegada para múltiples rutas en el corazón de la ciudad.",
    slug: "parque-caldas",
  },
  {
    name: "Centro Comercial Campanario",
    description: "Accede al principal centro comercial y sus alrededores en el norte.",
    slug: "campanario",
  },
  {
    name: "Terminal de Transportes",
    description: "Conecta con el transporte intermunicipal y varias rutas urbanas.",
    slug: "terminal-transportes",
  },
  {
    name: "SENA",
    description: "Un paradero clave para estudiantes y trabajadores en la zona occidental.",
    slug: "sena",
  },
  {
    name: "Hospital San José",
    description: "Paradero importante para acceder a los servicios de salud en la zona.",
    slug: "hospital-san-jose",
  },
  {
    name: "Barrio Bolívar",
    description: "Un punto central en uno de los barrios más tradicionales de Popayán.",
    slug: "barrio-bolivar",
  },
  {
    name: "La Esmeralda",
    description: "Parada principal en la comuna sur-oriente de la ciudad.",
    slug: "la-esmeralda",
  },
  {
    name: "Las Guacas",
    description: "Punto de conexión en la zona oriental, cerca de áreas residenciales.",
    slug: "las-guacas",
  },
];

export default function ParaderosPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">
                  Todos los Paraderos
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Encuentra información sobre los paraderos de transporte público en Popayán.
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-12">
              {allStops.map((stop) => (
                <Card
                  key={stop.name}
                  className="flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      {stop.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between p-6">
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {stop.description}
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full mt-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Link to={`/paraderos/${stop.slug}`}>
                        Ver en mapa
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
            <Link to="/nosotros" className="hover:text-foreground">
              Nosotros
            </Link>
            <Link to="/rutas" className="hover:text-foreground">
              Rutas
            </Link>
            <Link to="/paraderos" className="hover:text-foreground">
              Paraderos
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
