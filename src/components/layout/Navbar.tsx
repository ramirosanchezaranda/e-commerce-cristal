// src/components/layout/Navbar.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useCartStore, CartState } from '@/store/cartStore';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = useCartStore((state: CartState) => state.totalItems());
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar entrance animation
      const navLinks = gsap.utils.toArray('.nav-link');
      gsap.from(navLinks, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });

      // Hide/show navbar on scroll
      ScrollTrigger.create({
        start: 'top top',
        end: 99999,
        onUpdate: (self) => {
          const scrollVelocity = self.getVelocity();
          if (scrollVelocity < -50) {
            gsap.to(navRef.current, { y: 0, duration: 0.3 });
          } else if (scrollVelocity > 50 && self.direction === 1) {
            gsap.to(navRef.current, { y: -100, duration: 0.3 });
          }
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/galeria', label: 'Galería' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/nosotros', label: 'Sobre Nosotros' },
    { href: '/contacto', label: 'Contacto' }
  ];

  return (
    <motion.nav
      ref={navRef}
      className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-md text-black z-[1000] transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="text-2xl font-primary font-bold text-impacto-purple">
              Impacto Cristal
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 font-secondary">
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-800 hover:text-impacto-purple transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-800 hover:text-impacto-purple transition-colors"
            >
              <FaSearch className="text-xl" />
            </motion.button>

            <Link href="/carrito">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <FaShoppingCart className="text-xl text-gray-800 hover:text-impacto-purple transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-impacto-purple text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-gray-800 hover:text-impacto-purple transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/90 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-800 hover:text-impacto-purple transition-colors duration-200 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;