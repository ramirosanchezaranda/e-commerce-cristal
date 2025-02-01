'use client';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { initMercadoPago } from '@mercadopago/sdk-react';
import axios from 'axios';

export default function CheckoutPage() {
  const { cart, totalItems } = useCartStore();
  const [loading, setLoading] = useState(true);
  
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  useEffect(() => {
    const initializeMercadoPago = async () => {
      initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!);
      setLoading(false);
    };
    initializeMercadoPago();
  }, []);

  const handlePayment = async () => {
    try {
      const response = await axios.post('/api/checkout', {
        items: cart.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      });
      
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  if (loading) {
    return <div>Loading payment system...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-4 last:mb-0">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-600">Cantidad: {item.quantity}</p>
            </div>
            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">Total Items:</p>
          <p className="font-medium">{totalItems()}</p>
        </div>
        <div className="flex justify-between items-center mb-6">
          <p className="text-lg font-medium">Total:</p>
          <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-impacto-purple text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Proceder al Pago
        </button>
      </div>
    </div>
  );
}
