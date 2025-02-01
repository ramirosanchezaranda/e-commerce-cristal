'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export default function Loader() {
  useEffect(() => {
    // Animación del texto
    gsap.from('.loader-text span', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // Animación de la línea
    gsap.from('.loader-line', {
      scaleX: 0,
      duration: 1.2,
      delay: 0.5,
      ease: 'power2.inOut'
    });

    // Animación de salida
    const tl = gsap.timeline({
      delay: 2.5
    });

    tl.to('.loader-content', {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    }).to('.loader-container', {
      yPercent: -100,
      duration: 0.8,
      ease: 'power2.inOut'
    });
  }, []);

  return (
    <div className="loader-container fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="loader-content flex flex-col items-center">
        <div className="loader-text text-3xl md:text-4xl font-light mb-4">
          {Array.from('IMPACTO CRISTAL').map((letter, index) => (
            <span key={index} className="inline-block">
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </div>
        <div className="loader-line w-24 h-[1px] bg-current"></div>
      </div>
    </div>
  );
}
