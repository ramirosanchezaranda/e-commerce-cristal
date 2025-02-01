import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Registrar plugins
const plugins = [ScrollTrigger, TextPlugin];
plugins.forEach(plugin => gsap.registerPlugin(plugin));

// Configuración global de GSAP
export const gsapSetup = () => {
  if (typeof window !== 'undefined') {
    // Basic GSAP configuration
    gsap.config({
      autoSleep: 60,
      nullTargetWarn: false,
      force3D: true
    });
    
    // ScrollTrigger configuration
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize'
    });
    
    // Enable smooth scroll
    ScrollTrigger.normalizeScroll(true);
    
    // Match media configuration for responsive animations
    const mm = gsap.matchMedia();
    
    // Desktop animations
    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.defaults({
        markers: process.env.NODE_ENV === 'development',
        scrub: false,
        start: "top bottom",
        end: "top top"
      });
    });
    
    // Mobile animations
    mm.add("(max-width: 767px)", () => {
      ScrollTrigger.defaults({
        markers: false,
        scrub: false,
        start: "top bottom",
        end: "top 85%"
      });
    });
  }
};

export type GSAPContext = gsap.Context;