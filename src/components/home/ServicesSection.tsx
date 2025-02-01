'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Diseño Personalizado',
    description: 'Creamos soluciones únicas adaptadas a tus necesidades específicas.',
    highlightedDescription: <>Creamos soluciones <span className="text-impacto-purple">únicas</span> adaptadas a tus necesidades <span className="text-impacto-gold">específicas</span>.</>,
    image: '/images/2.png'
  },
  {
    title: 'Instalación Profesional',
    description: 'Equipo experto para una instalación segura y precisa.',
    highlightedDescription: <>Equipo <span className="text-impacto-gold">experto</span> para una instalación <span className="text-impacto-purple">segura</span> y precisa.</>,
    image: '/images/3.png'
  },
  {
    title: 'Mantenimiento',
    description: 'Servicio de mantenimiento y reparación para mantener tus cristales en perfecto estado.',
    highlightedDescription: <>Servicio de mantenimiento y reparación para mantener tus cristales en <span className="text-impacto-purple">perfecto</span> <span className="text-impacto-gold">estado</span>.</>,
    image: '/images/4.png'
  }
];

export default function ServicesSection() {
  return (
    <div className="w-full py-16">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-impacto-purple"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Nuestros Servicios
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto justify-items-center">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow w-full max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-64 w-full">
                <div className="absolute inset-0 bg-white/70 backdrop-blur-md rounded-[20px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-impacto-purple">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.highlightedDescription}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
