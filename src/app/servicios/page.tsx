import React from 'react';

export default function Services() {
  const services = [
    {
      title: 'Instalación de Cristales',
      description: 'Servicio profesional de instalación para todo tipo de cristales y vidrios.',
    },
    {
      title: 'Reparación y Mantenimiento',
      description: 'Mantenimiento preventivo y reparación de cristales dañados.',
    },
    {
      title: 'Asesoría Personalizada',
      description: 'Consultoría experta para ayudarte a elegir la mejor solución en cristalería.',
    },
    {
      title: 'Servicios de Emergencia',
      description: 'Atención rápida para emergencias relacionadas con cristales.',
    },
  ];

  return (
    <main className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-center mb-12 text-impacto-purple">
        Nuestros Servicios
      </h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-4 text-impacto-purple">
              {service.title}
            </h2>
            <p className="text-gray-700">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold mb-4">¿Necesitas un servicio personalizado?</h3>
        <p className="text-gray-700 mb-6">
          Contáctanos para discutir tus necesidades específicas
        </p>
        <a
          href="/contacto"
          className="inline-block bg-impacto-purple text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Contactar Ahora
        </a>
      </div>
    </main>
  );
}
