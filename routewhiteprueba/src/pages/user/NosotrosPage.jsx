// src/pages/user/NosotrosPage.jsx

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@userComponents/ui/avatar.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@userComponents/ui/card.jsx'
import { Github, Linkedin, Twitter } from 'lucide-react'

const teamMembers = [
  {
    name: 'Ana García',
    role: 'Líder de Proyecto y UX/UI',
    bio: 'Apasionada por crear experiencias de usuario intuitivas y eficientes. Lidera la visión del producto y se asegura de que PayánTransit sea fácil y agradable de usar.',
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'woman portrait',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
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
      github: '#',
    },
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
      github: '#',
    },
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
      github: '#',
    },
  },
  {
    name: 'Sofía Hernández',
    role: 'Marketing y Comunidad',
    bio: 'Sofía es la voz de PayánTransit. Conecta con los usuarios, gestiona las redes sociales y se asegura de que la comunidad esté siempre informada y escuchada.',
    image: 'https://placehold.co/400x400.png',
    dataAiHint: 'woman smiling',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
]

export default function NosotrosPage() {
  const [currentYear] = useState(new Date().getFullYear())

  return (
    <main className="w-full py-12 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl font-bold sm:text-5xl">Conoce a Nuestro Equipo</h1>
          <p className="max-w-3xl mx-auto text-muted-foreground text-base sm:text-lg">
            Somos un grupo de innovadores apasionados por mejorar la movilidad en Popayán.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card
              key={member.name}
              className="flex flex-col items-center text-center p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
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
                <a href={member.social.twitter} className="text-muted-foreground hover:text-foreground">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href={member.social.linkedin} className="text-muted-foreground hover:text-foreground">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href={member.social.github} className="text-muted-foreground hover:text-foreground">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
