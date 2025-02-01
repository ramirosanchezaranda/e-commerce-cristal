'use client';
import React from 'react';
import Image from 'next/image';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCartStore } from '@/store/cartStore';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export const CartItem: React.FC<CartItemProps> = ({ id, name, price, quantity, image }) => {
  const { addToCart, removeFromCart } = useCartStore();

  const handleIncrement = () => {
    addToCart({ id, name, price, image });
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      removeFromCart(id);
    } else {
      // Implementar la lógica para decrementar
      const item = { id, name, price, image };
      // Por ahora usamos removeFromCart, pero deberíamos implementar decrementQuantity
      removeFromCart(id);
      addToCart({ ...item, quantity: quantity - 1 });
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        {image && (
          <div className="relative w-20 h-20">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
        <div>
          <h3 className="font-medium text-gray-800">{name}</h3>
          <p className="text-gray-600">${price.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDecrement}
            className="p-1 text-gray-500 hover:text-impacto-purple transition-colors"
          >
            <FaMinus size={14} />
          </button>
          <span className="w-8 text-center">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="p-1 text-gray-500 hover:text-impacto-purple transition-colors"
          >
            <FaPlus size={14} />
          </button>
        </div>
        <button
          onClick={() => removeFromCart(id)}
          className="p-1 text-red-500 hover:text-red-600 transition-colors"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
};
