'use client';

import { ReactNode, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import AnimationProvider from '@/components/providers/AnimationProvider';
import Loader from '@/components/ui/Loader';

export default function AnimatedLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // El Loader se ocultará automáticamente después de su animación
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3800); // Este tiempo debe ser mayor que la duración total de las animaciones del Loader

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimationProvider>
      <div className="flex flex-col min-h-screen">
        {isLoading && <Loader />}
        <AnimatePresence mode="wait" initial={false}>
          {!isLoading && (
            <>
              <ScrollProgress />
              <Navbar />
              <motion.main
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
                className="flex-grow pt-20"
              >
                {children}
              </motion.main>
              <Footer />
            </>
          )}
        </AnimatePresence>
      </div>
    </AnimationProvider>
  );
}
