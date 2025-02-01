'use client';

import { useEffect, useRef } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ServicesSection from '@/components/home/ServicesSection';
import '@/styles/global.css';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Limitar el efecto parallax del hero
      if (heroRef.current) {
        const heroBackground = heroRef.current.querySelector('.hero-background');
        if (heroBackground instanceof HTMLElement) {
          const scrolled = Math.min(window.scrollY, window.innerHeight);
          const translateY = scrolled * 0.3; // Reducir la velocidad del parallax
          heroBackground.style.transform = `translateY(${translateY}px)`;
        }
      }

      // Animar las tarjetas de productos solo cuando están en vista
      if (productsRef.current) {
        const cards = productsRef.current.querySelectorAll('.product-card');
        const containerRect = productsRef.current.getBoundingClientRect();
        
        if (containerRect.top < window.innerHeight && containerRect.bottom > 0) {
          cards.forEach((card, index) => {
            if (!card.classList.contains('animate')) {
              setTimeout(() => {
                card.classList.add('animate');
              }, index * 150); // Agregar un pequeño retraso entre cada tarjeta
            }
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="main-container overflow-x-hidden">
      <section ref={heroRef} className="hero-section h-screen relative">
        <div className="hero-background absolute inset-0">
          <HeroSection />
        </div>
      </section>

      <section className="section-wrapper bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-impacto-purple mb-12">
            Productos Destacados
          </h2>
          <div ref={productsRef} className="products-wrapper">
            <FeaturedProducts />
          </div>
        </div>
      </section>

      <section className="services-section bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-impacto-purple mb-12">
          </h2>
          <ServicesSection />
        </div>
      </section>
    </div>
  );
}