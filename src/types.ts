// src/types.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // De opcional a requerido
  category: string;
  stock: number;
  createdAt: Date;
}