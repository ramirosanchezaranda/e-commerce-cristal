import React from 'react';

export default function AboutUs() {
  return (
    <main className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-center mb-12 text-impacto-purple">
        Sobre Nosotros
      </h1>
      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Nuestra Historia</h2>
          <p className="text-gray-700 mb-6">
            En Impacto Cristal, nos enorgullecemos de nuestra trayectoria en el mercado
            de cristalería y servicios relacionados. Desde nuestros inicios, nos hemos
            dedicado a ofrecer productos de la más alta calidad y un servicio excepcional
            a nuestros clientes.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
          <p className="text-gray-700 mb-6">
            Nuestra misión es proporcionar soluciones innovadoras y de calidad en
            cristalería, satisfaciendo las necesidades de nuestros clientes con
            productos duraderos y un servicio personalizado.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Valores</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3">
            <li>Calidad en cada producto y servicio</li>
            <li>Compromiso con la satisfacción del cliente</li>
            <li>Innovación constante</li>
            <li>Responsabilidad y profesionalismo</li>
            <li>Trabajo en equipo</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
