// src/app/checkout/page.tsx
'use client';
import { useEffect, useState } from 'react';
import useCartStore from '@/store/cartStore';
import { loadMercadoPago } from '@mercadopago/sdk-react';
import axios from 'axios';

export default function CheckoutPage() {
  const { cart, totalPrice } = useCartStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeMercadoPago = async () => {
      await loadMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!);
      setLoading(false);
    };
    initializeMercadoPago();
  }, []);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post('/api/checkout', {
        items: cart
      });
      
      const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, {
        locale: 'es-AR'
      });
      
      mp.checkout({
        preference: {
          id: data.id
        },
        render: {
          container: '.checkout-container',
          label: 'Pagar',
        }
      });
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-impacto-purple">Finalizar Compra</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
            {/* Listado de productos */}
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Total: ${totalPrice()}</h3>
            {!loading && (
              <div className="checkout-container">
                <button 
                  onClick={handlePayment}
                  className="w-full bg-impacto-purple text-white py-3 rounded hover:bg-opacity-90 transition-colors"
                >
                  Proceder al Pago
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}