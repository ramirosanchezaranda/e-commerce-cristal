'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGlassMartini, FaGift, FaGem, FaHandsHelping } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: FaGlassMartini,
    title: 'Cristalería Fina',
    description: 'Selección exclusiva de cristalería para eventos especiales'
  },
  {
    icon: FaGift,
    title: 'Regalos Únicos',
    description: 'Piezas especiales para momentos inolvidables'
  },
  {
    icon: FaGem,
    title: 'Decoración Premium',
    description: 'Elementos decorativos que transforman espacios'
  },
  {
    icon: FaHandsHelping,
    title: 'Asesoría Personalizada',
    description: 'Expertos ayudándote a elegir lo mejor'
  }
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (section && cards) {
      // Parallax background effect
      gsap.to(section, {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Cards stagger animation
      gsap.from(cards.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cards,
          start: 'top bottom-=100',
          end: 'center center',
          toggleActions: 'play none none reverse'
        }
      });

      // Horizontal scroll for cards on mobile
      if (window.innerWidth < 768) {
        gsap.to(cards, {
          x: () => -(cards.scrollWidth - window.innerWidth + 32),
          ease: 'none',
          scrollTrigger: {
            trigger: cards,
            start: 'center center',
            end: () => `+=${cards.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen py-24 bg-gradient-to-b from-background via-background/95 to-background overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(146,63,168,0.1),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-impacto-purple to-impacto-gold bg-clip-text text-transparent">
            Nuestros Servicios
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Descubre nuestra gama completa de servicios diseñados para hacer de cada ocasión un momento especial
          </p>
        </motion.div>

        {/* Services Cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative bg-background/50 backdrop-blur-sm border border-foreground/5 rounded-lg p-6 hover:border-impacto-purple/20 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute -inset-px bg-gradient-to-b from-impacto-purple/10 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300" />
              
              <service.icon className="text-4xl text-impacto-purple mb-4 transform group-hover:scale-110 transition-transform duration-300" />
              
              <h3 className="text-lg font-medium text-foreground/90 mb-2">
                {service.title}
              </h3>
              
              <p className="text-sm text-foreground/60">
                {service.description}
              </p>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-impacto-purple to-impacto-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
