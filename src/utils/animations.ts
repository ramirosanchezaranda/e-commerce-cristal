// src/utils/animations.ts
import { gsap } from 'gsap';

export const fadeInUp = (element: HTMLElement) => {
  gsap.from(element, {
    duration: 0.8,
    y: 50,
    opacity: 0,
    ease: "power3.out"
  });
};

export const staggerChildren = (parent: HTMLElement, children: string) => {
  gsap.from(parent.querySelectorAll(children), {
    duration: 0.6,
    y: 20,
    opacity: 0,
    stagger: 0.1,
    ease: "power2.out"
  });
};