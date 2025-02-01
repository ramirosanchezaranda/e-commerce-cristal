'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: 'Cristal Templado',
    description: 'Máxima resistencia y seguridad para tus espacios',
    price: 299.99,
    image: '/images/1.png',
    category: 'Seguridad'
  },
  {
    id: 2,
    name: 'Vidrio Decorativo',
    description: 'Elegancia y estilo para interiores',
    price: 199.99,
    image: '/images/2.png',
    category: 'Decoración'
  },
  {
    id: 3,
    name: 'Espejo Biselado',
    description: 'Acabados perfectos para un toque de distinción',
    price: 159.99,
    image: '/images/3.png',
    category: 'Espejos'
  },
  {
    id: 4,
    name: 'Mampara de Ducha',
    description: 'Diseño moderno y funcional',
    price: 449.99,
    image: '/images/4.png',
    category: 'Baño'
  },
  {
    id: 5,
    name: 'Cristal Laminado',
    description: 'Seguridad y aislamiento acústico',
    price: 399.99,
    image: '/images/5.png',
    category: 'Seguridad'
  },
  {
    id: 6,
    name: 'Vitrina de Exhibición',
    description: 'Elegancia para mostrar tus productos',
    price: 599.99,
    image: '/images/6.png',
    category: 'Comercial'
  }
];

export default function FeaturedProducts() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    const slides = gsap.utils.toArray<HTMLElement>(".slide");
    const totalSlides = slides.length - 1;
    
    // Timeline principal con configuración mejorada
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-wrapper",
        pin: true,
        pinSpacing: true,
        start: "top top",
        end: () => `+=${window.innerWidth * totalSlides}`,
        scrub: {
          ease: "power1.inOut",
          smoothing: 1
        },
        invalidateOnRefresh: true,
        snap: {
          snapTo: (value) => Math.round(value * totalSlides) / totalSlides,
          duration: { min: 0.2, max: 0.3 },
          delay: 0.1,
          ease: "power1.inOut"
        }
      }
    });

    // Animación horizontal del slider con mejor rendimiento
    tl.to(slides, {
      xPercent: -100 * totalSlides,
      ease: "none",
      duration: totalSlides
    });

    // Actualizar barra de progreso con mejor rendimiento
    const progressTrigger = ScrollTrigger.create({
      trigger: ".section-wrapper",
      start: "top top",
      end: () => `+=${window.innerWidth * totalSlides}`,
      onUpdate: (self) => {
        if (progressRef.current) {
          gsap.to(progressRef.current, {
            scaleX: self.progress,
            duration: 0.1,
            overwrite: true,
            ease: "none"
          });
        }
      }
    });

    // Cleanup mejorado
    return () => {
      tl.kill();
      progressTrigger.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.set(slides, { clearProps: "all" });
    };
  }, []);

  return (
    <section className="section-wrapper">
      <div className="products-wrapper">
        <div ref={sliderRef} className="horiz-slider">
          {products.map((product) => (
            <div key={product.id} className="slide">
              <div className="slide-content">
                <div className="text-content">
                  <h2 className="slide-text text-2xl md:text-3xl mb-2">{product.name}</h2>
                  <p className="slide-description text-base">{product.description}</p>
                </div>
                <div className="product-image-container">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="product-image"
                    style={{
                      objectFit: 'contain'
                    }}
                    priority
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="progress-bar">
          <div ref={progressRef} className="progress-fill"></div>
        </div>
      </div>
    </section>
  );
}