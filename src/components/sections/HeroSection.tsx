'use client';
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
        opacity: 0,
        y: 50
      });

      // Animation timeline
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 1
        }
      });

      tl.to(titleRef.current, { opacity: 1, y: 0 })
        .to(subtitleRef.current, { opacity: 1, y: 0 }, "-=0.5")
        .to(buttonRef.current, { opacity: 1, y: 0 }, "-=0.5");

      // Scroll animation for the entire section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        toggleActions: "play reverse play reverse",
        onEnter: () => tl.play(),
        onLeave: () => tl.reverse(),
        onEnterBack: () => tl.play(),
        onLeaveBack: () => tl.reverse()
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[140dvh] lg:min-h-[100dvh] w-full flex items-center justify-center pt-24 pb-12 lg:py-0 overflow-hidden"
    >
      {/* Fondo con parallax */}
      <div className="hero-background absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/90 backdrop-blur-sm"></div>
        <Image
          src="/images/1.png"
          alt="Cristalería de calidad"
          fill
          className="object-cover opacity-70"
          priority
          sizes="100vw"
        />
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 relative z-10 -mt-20 lg:mt-0">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8 items-center">
          <div className="relative z-10 max-w-2xl mx-auto lg:mx-0 w-full">
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-2 md:p-6 lg:p-12">
              <div className="text-center lg:text-left space-y-3 lg:space-y-6 md:space-y-4">
                <h1 
                  ref={titleRef}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 font-primary tracking-tight leading-[1.1]"
                >
                  Transformando espacios con{' '}
                  <span className="text-impacto-purple inline-block">cristal</span>
                </h1>
                
                <p 
                  ref={subtitleRef}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 font-secondary max-w-xl mx-auto lg:mx-0"
                >
                  Diseños <span className="text-impacto-gold font-medium">exclusivos</span> que elevan la{' '}
                  <span className="text-impacto-purple font-medium">elegancia</span> de tu hogar
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link
                    href="/galeria"
                    ref={buttonRef}
                    className="w-full sm:w-auto px-8 py-3 bg-impacto-purple text-white rounded-xl hover:bg-impacto-purple/90 transition-all duration-300 font-primary text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Explorar <span className="text-impacto-gold font-medium">Colección</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative w-full max-w-lg mx-auto lg:max-w-none border-rounded">
            <div className="aspect-square lg:aspect-[4/3] relative">
              <Image
                src="/images/2.png"
                alt="Impacto Cristal Showcase"
                fill
                className="object-contain drop-shadow-2xl border-rounded"
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 40vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}