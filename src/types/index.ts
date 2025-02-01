// src/types/index.ts
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
  quantity?: number;
};

export type CartItem = Product & {
  quantity: number;
};