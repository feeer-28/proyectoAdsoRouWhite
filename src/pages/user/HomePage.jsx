import React, { useState } from "react";
import { Header } from "./components/header";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Button } from "./components/ui/button"; // ✅ Este es el que faltaba
import { AnimatedSection } from "./components/animated-section";
import { useToast } from "./hooks/use-toast";


const allRoutes = [
  { name: 'Ruta 1: Centro - Campanario', slug: 'ruta-1-centro-campanario', description: 'Recorre los puntos más importantes del centro histórico y el norte de la ciudad.' },
  { name: 'Ruta 2: La Esmeralda - Centro', slug: 'ruta-2-la-esmeralda-centro', description: 'Conecta el sur-oriente con el corazón de Popayán.' },
  { name: 'Ruta 3: Retiro - Las Guacas', slug: 'ruta-3-retiro-las-guacas', description: 'Una ruta transversal que te lleva de occidente a oriente.' },
  { name: 'Ruta 5: Hospital - Terminal', slug: 'ruta-5-hospital-terminal', description: 'Ruta clave para acceder a servicios de salud y de transporte intermunicipal.' },
  { name: 'Ruta 6: Norte - Centro - Sur', slug: 'ruta-6-norte-centro-sur', description: 'Atraviesa la ciudad de punta a punta, ideal para viajes largos.'},
  { name: 'Ruta 7: Variante - Campamento', slug: 'ruta-7-variante-campamento', description: 'Cubre la zona de la variante y el área de campamento, vital para trabajadores.'},
];

const featuredStops = [
    { name: 'Parque Caldas', description: 'Punto de partida y llegada para múltiples rutas en el corazón de la ciudad.', slug: 'parque-caldas' },
    { name: 'Centro Comercial Campanario', description: 'Accede al principal centro comercial y sus alrededores en el norte.', slug: 'campanario' },
    { name: 'Terminal de Transportes', description: 'Conecta con el transporte intermunicipal y varias rutas urbanas.', slug: 'terminal-transportes' },
    { name: 'SENA', description: 'Un paradero clave para estudiantes y trabajadores en la zona occidental.', slug: 'sena' }
];

const teamMembers = [
    { name: 'Ana García', image: 'https://placehold.co/400x400.png', dataAiHint: 'woman portrait' },
    { name: 'Carlos Martínez', image: 'https://placehold.co/400x400.png', dataAiHint: 'man portrait' },
    { name: 'Laura Rodríguez', image: 'https://placehold.co/400x400.png', dataAiHint: 'woman developer' },
    { name: 'Javier López', image: 'https://placehold.co/400x400.png', dataAiHint: 'man developer' },
    { name: 'Sofía Hernández', image: 'https://placehold.co/400x400.png', dataAiHint: 'woman smiling' }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationActive, setLocationActive] = useState(false);
  const { toast } = useToast();
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRoutes = searchQuery
    ? allRoutes.filter(route =>
        route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const showSearchResults = searchQuery.length > 0;

  const handleLocationClick = () => {
    setLocationActive(true);
    toast({
      title: "Ubicación Activada",
      description: "Mostrando paraderos y rutas cercanas en tiempo real.",
      variant: "default",
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
          <section className="relative w-full h-screen flex items-center justify-center text-white">
            <img
              src="https://hotelcaminoreal.com.co/wp-content/uploads/2017/12/popayan.jpg"
              alt="Popayán"
              className="z-0 absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="container px-4 md:px-6 z-20 text-center">
              <div className="flex flex-col justify-center items-center space-y-6">
                {!showSearchResults ? (
                  <>
                    <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      La forma más fácil de moverte por <span className="text-primary">Popayán</span>
                    </h1>
                    <p className="max-w-[600px] text-lg md:text-xl">
                      Con RouWhite, encuentra las rutas de bus que necesitas en segundos. Activa tu ubicación para ver paraderos cercanos en tiempo real.
                    </p>
                  </>
                ) : (
                  <h2 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Resultados de la Búsqueda</h2>
                )}
                <div className="w-full max-w-2xl space-y-4">
                  <div className="w-full max-w-md mx-auto">
                      <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
                        <Input
                          type="search"
                          placeholder="Busca una ruta o destino..."
                          className="flex-1 bg-white/90 text-foreground"
                          value={searchQuery}
                          onChange={handleSearchChange}
                        />
                        <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
                          <Search className="h-4 w-4" />
                          <span className="sr-only">Buscar</span>
                        </Button>
                      </form>
                  </div>
                  {!showSearchResults && (
                      <Button variant="outline" className="w-full sm:w-auto bg-transparent border-white hover:bg-white hover:text-black disabled:opacity-70 disabled:cursor-not-allowed" onClick={handleLocationClick} disabled={locationActive}>
                          {locationActive ? <CheckCircle className="mr-2 h-4 w-4" /> : <MapPin className="mr-2 h-4 w-4" />}
                          {locationActive ? 'Ubicación Activada' : 'Activar ubicación en tiempo real'}
                      </Button>
                  )}
                </div>
                {showSearchResults && (
                  <div className="w-full max-w-3xl pt-8">
                      <Card className="bg-card/20 backdrop-blur-sm border-white/20">
                          <CardContent className="p-6">
                              {filteredRoutes.length > 0 ? (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                                  {filteredRoutes.map((route) => (
                                      <Card key={route.name} className="bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-colors duration-300">
                                          <CardHeader>
                                              <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                                              <Bus className="h-5 w-5 text-accent"/>
                                              {route.name}
                                              </CardTitle>
                                          </CardHeader>
                                          <CardContent>
                                              <p className="text-white/80 text-sm mb-4">{route.description}</p>
                                              <Button asChild variant="outline" className="w-full mt-auto bg-transparent text-white border-white hover:bg-white hover:text-black">
                                              <Link to={`/rutas/${route.slug}`}>
                                                  Ver detalles
                                                  <ArrowRight className="ml-2 h-4 w-4" />
                                              </Link>
                                              </Button>
                                          </CardContent>
                                      </Card>
                                  ))}
                                  </div>
                              ) : (
                                  <p>No se encontraron rutas para &quot;{searchQuery}&quot;.</p>
                              )}
                          </CardContent>
                      </Card>
                  </div>
                )}
              </div>
            </div>
          </section>

          <AnimatedSection>
            <section id="rutas" className="w-full py-12 md:py-24">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm bg-primary/20 text-primary">Navegación Fácil</div>
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Nuestras Rutas</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Explora las rutas disponibles y encuentra la que mejor se adapte a tu viaje, sin complicaciones.
                    </p>
                  </div>
                </div>
                <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {allRoutes.slice(0, 4).map((route) => (
                    <Card key={route.name} className="flex flex-col transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl rounded-xl overflow-hidden">
                      <CardHeader className="bg-card">
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
                <div className="text-center mt-12">
                    <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link to="/rutas">Ver Todas las Rutas</Link>
                    </Button>
                </div>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection>
              <section id="paraderos" className="w-full py-12 md:py-24 bg-muted/40">
                  <div className="container px-4 md:px-6">
                      <div className="flex flex-col items-center justify-center space-y-4 text-center">
                          <div className="space-y-2">
                              <div className="inline-block rounded-lg bg-primary/20 px-3 py-1 text-sm text-primary">Puntos Clave</div>
                              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Paraderos Destacados</h2>
                              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                  Encuentra los paraderos más importantes de la ciudad y planifica tu viaje con antelación.
                              </p>
                          </div>
                      </div>
                      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {featuredStops.map((stop) => (
                              <Card key={stop.name} className="flex flex-col transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl rounded-xl overflow-hidden">
                                  <CardHeader className="bg-card">
                                      <CardTitle className="text-lg font-bold flex items-center gap-2">
                                          <MapPin className="h-6 w-6 text-primary" />
                                          {stop.name}
                                      </CardTitle>
                                  </CardHeader>
                                  <CardContent className="flex-1 flex flex-col justify-between p-6">
                                      <p className="text-muted-foreground text-sm mb-4 flex-1">{stop.description}</p>
                                      <Button asChild variant="outline" className="w-full mt-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                                          <Link to={`/paraderos/${stop.slug}`}>
                                              Ver en mapa
                                              <ArrowRight className="ml-2 h-4 w-4" />
                                          </Link>
                                      </Button>
                                  </CardContent>
                              </Card>
                          ))}
                      </div>
                      <div className="text-center mt-12">
                          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                              <Link to="/paraderos">Ver Todos los Paraderos</Link>
                          </Button>
                      </div>
                  </div>
              </section>
          </AnimatedSection>

          <AnimatedSection>
              <section id="nosotros" className="w-full py-12 md:py-24">
                  <div className="container px-4 md:px-6">
                      <div className="flex flex-col items-center justify-center space-y-8 text-center">
                        <div className="space-y-4">
                           <div className="inline-block rounded-lg bg-primary/20 px-3 py-1 text-sm text-primary">Nuestro Equipo</div>
                             <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Conoce al Equipo</h2>
                               <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                 El equipo apasionado que hace posible RouWhite, dedicado a mejorar tu experiencia de viaje.
                               </p>
                        </div>
                          <div className="mx-auto grid max-w-4xl grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-8">
                              {teamMembers.map((member) => (
                                  <div key={member.name} className="flex flex-col items-center gap-3 text-center transition-transform duration-300 hover:scale-105">
                                      <Avatar className="w-24 h-24 ring-4 ring-primary/20 hover:ring-primary/40 transition-all duration-300">
                                          <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.dataAiHint} />
                                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <span className="font-medium text-sm">{member.name}</span>
                                  </div>
                              ))}
                          </div>
                          <div className="text-center">
                              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                                  <Link to="/nosotros">Más sobre Nosotros <Users className="ml-2 h-4 w-4"/></Link>
                              </Button>
                          </div>
                      </div>
                  </div>
              </section>
          </AnimatedSection>
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
