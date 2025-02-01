// src/app/checkout/success/page.tsx
'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import useCartStore from '@/store/cartStore';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const clearCart = useCartStore(state => state.clearCart);

  useEffect(() => {
    const paymentId = searchParams.get('payment_id');
    if (paymentId) {
      // Registrar pago exitoso
      clearCart();
    }
  }, [searchParams, clearCart]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-12 text-center"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-impacto-purple text-6xl mb-4">✓</div>
        <h1 className="text-3xl font-bold mb-4">¡Pago Exitoso!</h1>
        <p className="text-lg mb-8">
          Tu pedido ha sido procesado exitosamente. En breve recibirás un correo de confirmación.
        </p>
        <a
          href="/"
          className="bg-impacto-purple text-white px-6 py-3 rounded hover:bg-opacity-90 transition-colors"
        >
          Volver al Inicio
        </a>
      </div>
    </motion.div>
  );
}