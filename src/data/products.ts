import { Product } from '@/types/product';

export const products: Product[] = [
  { 
    id: '1', 
    name: 'Espejo Decorativo Moderno',
    price: 15000,
    image: '/images/products/espejo-decorativo.jpg',
    category: 'espejos',
    description: 'Espejo decorativo con marco de aluminio, ideal para salas y dormitorios',
    stock: 10
  },
  { 
    id: '2',
    name: 'Vidrio Templado 8mm',
    price: 8000,
    image: '/images/products/vidrio-templado.jpg',
    category: 'vidrios',
    description: 'Vidrio de seguridad templado de 8mm, perfecto para mesas y ventanas',
    stock: 15
  },
  {
    id: '3',
    name: 'Espejo de Baño con LED',
    price: 25000,
    image: '/images/products/espejo-led.jpg',
    category: 'espejos',
    description: 'Espejo de baño con iluminación LED integrada y sistema anti-empañamiento',
    stock: 8
  },
  {
    id: '4',
    name: 'Vidrio Laminado 10mm',
    price: 12000,
    image: '/images/products/vidrio-laminado.jpg',
    category: 'vidrios',
    description: 'Vidrio laminado de seguridad, ideal para barandas y divisiones',
    stock: 12
  },
  {
    id: '5',
    name: 'Espejo Vintage',
    price: 18000,
    image: '/images/products/espejo-vintage.jpg',
    category: 'espejos',
    description: 'Espejo con marco decorativo estilo vintage, perfecto para darle un toque clásico a tu espacio',
    stock: 5
  },
  {
    id: '6',
    name: 'Vidrio Acústico',
    price: 15000,
    image: '/images/products/vidrio-acustico.jpg',
    category: 'vidrios',
    description: 'Vidrio con aislamiento acústico, ideal para ventanas en zonas ruidosas',
    stock: 10
  }
];
