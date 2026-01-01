
import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative overflow-hidden aspect-[4/5] bg-gray-100 cursor-pointer" onClick={() => onClick(product)}>
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-navy text-white text-[10px] font-bold px-2 py-1 uppercase tracking-tighter">New Arrival</span>
          )}
          {product.isBestSeller && (
            <span className="bg-gold text-navy text-[10px] font-bold px-2 py-1 uppercase tracking-tighter">Best Seller</span>
          )}
          {product.discount && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-tighter">-{product.discount}%</span>
          )}
        </div>
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button 
            className="p-3 bg-white text-navy rounded-full hover:bg-gold transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform delay-75"
            title="Quick View"
          >
            <Eye size={20} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="p-3 bg-white text-navy rounded-full hover:bg-gold transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform delay-150"
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{product.brand}</p>
        <h3 className="font-serif text-lg text-navy mb-2 cursor-pointer hover:text-gold transition-colors" onClick={() => onClick(product)}>
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviewsCount})</span>
        </div>

        <div className="mt-auto flex justify-between items-center">
          <p className="text-xl font-bold text-navy">
            ${product.price.toLocaleString()}
            {product.discount && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                ${Math.round(product.price * (1 + product.discount/100)).toLocaleString()}
              </span>
            )}
          </p>
          <button 
            onClick={() => onAddToCart(product)}
            className="text-navy hover:text-gold font-bold text-sm underline underline-offset-4"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
