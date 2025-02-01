'use client';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const socialLinks = [
  { icon: FaFacebook, href: '#', label: 'Facebook', color: '#4267B2' },
  { icon: FaInstagram, href: '#', label: 'Instagram', color: '#E1306C' },
  { icon: FaWhatsapp, href: '#', label: 'WhatsApp', color: '#25D366' },
  { icon: FaEnvelope, href: 'mailto:contacto@impactocristal.com', label: 'Email', color: '#EA4335' }
];

const quickLinks = [
  { href: '/galeria', label: 'Galería' },
  { href: '/nosotros', label: 'Sobre Nosotros' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/contacto', label: 'Contacto' }
];

const Footer = () => {
  return (
    <footer className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información de contacto */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 font-primary">Contacto</h3>
            <div className="flex items-center space-x-2 font-secondary">
              <FaMapMarkerAlt className="text-black" />
              <span>123 Calle Principal, Ciudad</span>
            </div>
            <div className="flex items-center space-x-2 font-secondary">
              <FaPhone className="text-black" />
              <span>+123 456 7890</span>
            </div>
            <div className="flex items-center space-x-2 font-secondary">
              <FaEnvelope className="text-black" />
              <span>contacto@impactocristal.com</span>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-primary">Enlaces Rápidos</h3>
            <ul className="space-y-2 font-secondary">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-impacto-purple transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-primary">Síguenos</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-black hover:text-impacto-purple transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="text-2xl" />
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-primary">Newsletter</h3>
            <p className="mb-4 font-secondary">Suscríbete para recibir nuestras últimas novedades</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-impacto-purple font-secondary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-impacto-purple transition-colors duration-200 font-primary"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center font-secondary">
          <p>&copy; {new Date().getFullYear()} Impacto Cristal. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;