'use client';
import React from 'react';
import { useCartStore } from '@/store/cartStore';
import { CartItem } from '@/components/cart/CartItem';
import Link from 'next/link';

export default function CartPage() {
  const { cart, totalItems, clearCart } = useCartStore();

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6 text-impacto-purple">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">¡Explora nuestros productos y encuentra algo que te guste!</p>
          <Link
            href="/galeria"
            className="inline-block bg-impacto-purple text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-impacto-purple">Tu Carrito</h1>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-600 transition-colors"
          >
            Vaciar Carrito
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          {cart.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Subtotal ({totalItems()} items)</span>
            <span className="text-xl font-semibold">${totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={() => {/* Implementar proceso de checkout */}}
            className="w-full bg-impacto-purple text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Proceder al Pago
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/galeria"
            className="text-impacto-purple hover:underline"
          >
            ← Continuar Comprando
          </Link>
        </div>
      </div>
    </main>
  );
}
