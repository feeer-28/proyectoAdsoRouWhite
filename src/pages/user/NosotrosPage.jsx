import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Header } from "./components/header";
import { Bus, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const teamMembers = [
    {
        name: 'Ana García',
        role: 'Líder de Proyecto y UX/UI',
        bio: 'Apasionada por crear experiencias de usuario intuitivas y eficientes. Lidera la visión del producto y se asegura de que RouWhite sea fácil y agradable de usar.',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'woman portrait',
        social: {
            twitter: '#',
            linkedin: '#',
            github: '#'
        }
    },
    {
        name: 'Carlos Martínez',
        role: 'Desarrollador Full-Stack',
        bio: 'El cerebro detrás de la arquitectura técnica. Carlos convierte las ideas en código funcional, trabajando tanto en el backend como en el frontend para dar vida a la aplicación.',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'man portrait',
        social: {
            twitter: '#',
            linkedin: '#',
            github: '#'
        }
    },
    {
        name: 'Laura Rodríguez',
        role: 'Especialista en Datos y GIS',
        bio: 'Laura es la experta en la data de rutas y paraderos. Se encarga de que la información geoespacial sea precisa y esté siempre actualizada para guiarte correctamente.',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'woman developer',
        social: {
            twitter: '#',
            linkedin: '#',
            github: '#'
        }
    },
    {
        name: 'Javier López',
        role: 'Desarrollador Móvil',
        bio: 'Javier se enfoca en que la experiencia en tu teléfono sea impecable. Optimiza la aplicación para que sea rápida y funcional en cualquier dispositivo móvil.',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'man developer',
        social: {
            twitter: '#',
            linkedin: '#',
            github: '#'
        }
    },
    {
        name: 'Sofía Hernández',
        role: 'Marketing y Comunidad',
        bio: 'Sofía es la voz de RouWhite. Conecta con los usuarios, gestiona las redes sociales y se asegura de que la comunidad esté siempre informada y escuchada.',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'woman smiling',
        social: {
            twitter: '#',
            linkedin: '#',
            github: '#'
        }
    }
];

export default function NosotrosPage() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <Header />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Conoce a Nuestro Equipo</h1>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Somos un grupo de innovadores apasionados por mejorar la movilidad en Popayán.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
                            {teamMembers.map((member) => (
                                <Card key={member.name} className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                    <Avatar className="w-24 h-24 mb-4 ring-4 ring-primary/30">
                                        <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.dataAiHint} />
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <CardHeader className="p-0">
                                        <CardTitle className="text-xl font-bold">{member.name}</CardTitle>
                                        <p className="text-primary font-medium">{member.role}</p>
                                    </CardHeader>
                                    <CardContent className="p-0 mt-4">
                                        <p className="text-muted-foreground text-sm">{member.bio}</p>
                                    </CardContent>
                                    <div className="flex gap-4 mt-6">
                                        <a href={member.social.twitter} className="text-muted-foreground hover:text-foreground transition-colors">
                                            <Twitter className="h-6 w-6" />
                                        </a>
                                        <a href={member.social.linkedin} className="text-muted-foreground hover:text-foreground transition-colors">
                                            <Linkedin className="h-6 w-6" />
                                        </a>
                                        <a href={member.social.github} className="text-muted-foreground hover:text-foreground transition-colors">
                                            <Github className="h-6 w-6" />
                                        </a>
                                    </div>
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