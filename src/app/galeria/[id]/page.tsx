'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { products } from '@/data/products';
import { Product } from '@/types/product';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();

  useEffect(() => {
    // Simulamos una carga de datos
    const timer = setTimeout(() => {
      const foundProduct = products.find(p => p.id === params.id);
      setProduct(foundProduct || null);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Producto no encontrado
        </h1>
        <p className="text-gray-600 mb-8">
          El producto que buscas no existe o ha sido removido.
        </p>
        <Link
          href="/galeria"
          className="inline-flex items-center gap-2 px-6 py-3 bg-impacto-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          <FaArrowLeft />
          <span>Volver a la Galería</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <Link
        href="/galeria"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-impacto-purple mb-8 transition-colors"
      >
        <FaArrowLeft />
        <span>Volver a la Galería</span>
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.image || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-impacto-purple">
              ${product.price.toLocaleString()}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Disponible
            </span>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold text-gray-800">Descripción</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="pt-6 border-t">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Características</h2>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Material de alta calidad</li>
              <li>✓ Instalación profesional disponible</li>
              <li>✓ Garantía incluida</li>
              <li>✓ Envío seguro</li>
            </ul>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-impacto-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <FaShoppingCart />
            <span>Agregar al Carrito</span>
          </button>
        </div>
      </div>
    </div>
  );
}
