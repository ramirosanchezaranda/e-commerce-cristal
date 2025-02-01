'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsapSetup } from '@/lib/gsap.config';

gsap.registerPlugin(ScrollTrigger);

interface AnimationProviderProps {
  children: React.ReactNode;
}

export default function AnimationProvider({ children }: AnimationProviderProps) {
  const scope = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize GSAP configuration
    gsapSetup();
    
    // Create GSAP context
    const ctx = gsap.context(() => {}, scope);
    
    // Enable ScrollTrigger on the scope
    ScrollTrigger.refresh();

    return () => {
      // Cleanup
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={scope} className="relative w-full">
      {children}
    </div>
  );
}