// src/store/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartState {
  cart: CartItem[];
  totalItems: () => number;
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      totalItems: () => get().cart.reduce((total, item) => total + item.quantity, 0),
      addToCart: (product) => {
        const existing = get().cart.find(p => p.id === product.id);
        if (existing) {
          set({
            cart: get().cart.map(p => 
              p.id === product.id 
                ? {...p, quantity: p.quantity + 1} 
                : p
            )
          });
        } else {
          set({ cart: [...get().cart, {...product, quantity: 1}] });
        }
      },
      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter(p => p.id !== productId)
        });
      },
      clearCart: () => {
        set({ cart: [] });
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);