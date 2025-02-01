// src/components/ui/ScrollProgress.tsx
'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.to(progressRef.current, {
          scaleX: self.progress,
          duration: 0.5,
          ease: "power3.out"
        });
      }
    });
  });

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-impacto-dark/10">
      <div
        ref={progressRef}
        className="h-full bg-impacto-purple origin-left transform scale-x-0"
        style={{ transformOrigin: '0% 50%' }}
      />
    </div>
  );
}