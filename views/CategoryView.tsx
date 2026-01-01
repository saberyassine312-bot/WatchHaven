
import React, { useState } from 'react';
import { Filter, ChevronDown, LayoutGrid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product, Category } from '../types';

interface CategoryViewProps {
  products: Product[];
  category: Category | null;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ products, category, onProductClick, onAddToCart }) => {
  const [sortBy, setSortBy] = useState('featured');
  
  const filteredProducts = category 
    ? products.filter(p => p.category === category)
    : products;

  return (
    <div className="min-h-screen bg-white">
      {/* Category Hero */}
      <div className="bg-navy py-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-xs text-gray-500 uppercase tracking-widest mb-4 flex justify-center space-x-2">
            <span className="hover:text-gold cursor-pointer">Home</span>
            <span>/</span>
            <span className="text-gold">Collections</span>
            {category && (
              <>
                <span>/</span>
                <span className="text-gold">{category}'s</span>
              </>
            )}
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif text-white">
            {category ? `${category}'s Collection` : 'All Collections'}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters & Sorting Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-gray-100 gap-4">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-sm font-bold uppercase tracking-widest">
              <Filter size={18} />
              <span>Filter</span>
            </button>
            <div className="hidden sm:flex items-center space-x-4 border-l border-gray-200 pl-6 text-gray-400">
              <LayoutGrid size={20} className="text-navy" />
              <List size={20} />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              Showing {filteredProducts.length} Results
            </span>
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded px-4 py-2 pr-10 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-gold cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={16} />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map((p) => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onClick={onProductClick} 
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
