import './globals.css';
import { ReactNode } from 'react';
import AnimatedLayout from '@/components/layout/AnimatedLayout';
import { Poppins, Playfair_Display } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`scroll-smooth ${poppins.variable} ${playfairDisplay.variable}`}>
      <head>
        <title>Impacto Cristal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-impacto-light antialiased overflow-x-hidden font-sans">
        <AnimatedLayout>
          {children}
        </AnimatedLayout>
      </body>
    </html>
  );
}