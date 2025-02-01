'use client';
import { useState } from 'react';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/types';
import { products } from '@/data/products';

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 100000
  });

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filters.category === 'all' || product.category === filters.category) &&
    product.price >= filters.minPrice &&
    product.price <= filters.maxPrice
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con filtros */}
      <div className="bg-white py-6 px-4 border-b">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-impacto-purple mb-6">Galería de Productos</h1>
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              placeholder=" Buscar productos..."
              className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-impacto-purple focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <select
                className="p-2 border rounded-lg bg-white"
                value={filters.category}
                onChange={(e) => setFilters(prev => ({...prev, category: e.target.value}))}
              >
                <option value="all">Todas las categorías</option>
                <option value="espejos">Espejos</option>
                <option value="vidrios">Vidrios</option>
              </select>
              
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Precio mínimo"
                  className="w-24 p-2 border rounded-lg"
                  min="0"
                  value={filters.minPrice}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    minPrice: Number(e.target.value)
                  }))}
                />
                <input
                  type="number"
                  placeholder="Precio máximo"
                  className="w-24 p-2 border rounded-lg"
                  min="0"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    maxPrice: Number(e.target.value)
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenedor de productos */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No se encontraron productos que coincidan con tu búsqueda.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}