
import React, { useState } from 'react';
import { Star, Truck, ShieldCheck, Heart, Share2, Plus, Minus, ChevronRight, Facebook, Send, Twitter, ExternalLink, Copy, Check } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface ProductViewProps {
  products: Product[];
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onProductClick: (product: Product) => void;
}

const ProductView: React.FC<ProductViewProps> = ({ products, product, onAddToCart, onProductClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [copied, setCopied] = useState(false);

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const shareUrl = product.marketingLink || window.location.href;
  const shareText = `Check out this masterpiece: ${product.name} by ${product.brand} at WatchHaven.`;
  const shareImage = product.images[0];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { name: 'WhatsApp', icon: <Send size={18} />, url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, color: 'bg-[#25D366]' },
    { name: 'Facebook', icon: <Facebook size={18} />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, color: 'bg-[#1877F2]' },
    { name: 'X', icon: <Twitter size={18} />, url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, color: 'bg-[#000000]' },
    { name: 'Pinterest', icon: <Share2 size={18} />, url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(shareImage)}&description=${encodeURIComponent(shareText)}`, color: 'bg-[#E60023]' },
  ];

  return (
    <div className="bg-[#F8FAFC]">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
          <button className="hover:text-gold cursor-pointer transition-colors" onClick={() => window.location.reload()}>Home</button>
          <ChevronRight size={12} className="mx-3 text-gray-300" />
          <span className="text-navy">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Gallery */}
          <div className="lg:w-1/2 space-y-6">
            <div className="aspect-[4/5] bg-white overflow-hidden rounded-2xl group border border-slate-200 shadow-lg relative">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" 
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`w-24 h-24 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${mainImage === img ? 'border-gold shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`Gallery ${i}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Info Card */}
          <div className="lg:w-1/2 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
            <div className="mb-10 pb-10 border-b border-slate-100">
              <p className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-4">{product.brand}</p>
              <h1 className="text-4xl md:text-5xl font-serif text-navy mb-6 leading-tight">{product.name}</h1>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-navy">{product.rating}</span>
                </div>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{product.reviewsCount} Reviews</span>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <p className="text-3xl font-bold text-navy">
                  ${product.price.toLocaleString()}
                </p>
                {product.discount && (
                  <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter border border-red-100">
                    Save {product.discount}%
                  </span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed text-lg font-medium">
                {product.description}
              </p>
            </div>

            {/* Purchase Controls */}
            <div className="space-y-10">
              <div className="flex flex-col sm:flex-row items-end gap-6">
                
                {/* Professional Quantity Selector - FIXED COLOR */}
                <div className="space-y-3 w-full sm:w-auto">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 block ml-1">Quantity</label>
                  <div className="flex items-center h-14 bg-white border-2 border-slate-200 rounded-xl shadow-sm overflow-hidden group hover:border-navy transition-all duration-300">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="w-14 h-full flex items-center justify-center text-navy hover:bg-slate-50 transition-colors disabled:opacity-20 border-r border-slate-100"
                    >
                      <Minus size={18} strokeWidth={2.5} />
                    </button>
                    
                    <div className="flex-grow min-w-[60px] flex items-center justify-center bg-white">
                      {/* CRITICAL: FORCED NAVY COLOR ON WHITE BACKGROUND */}
                      <span className="text-[#001A33] font-bold text-xl select-none tracking-tight">
                        {quantity}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      disabled={quantity >= 10}
                      className="w-14 h-full flex items-center justify-center text-navy hover:bg-slate-50 transition-colors disabled:opacity-20 border-l border-slate-100"
                    >
                      <Plus size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                <div className="flex-grow w-full">
                  <button 
                    onClick={() => onAddToCart(product, quantity)}
                    className="w-full h-14 bg-navy text-white font-bold uppercase tracking-[0.25em] text-[11px] hover:bg-[#002a4a] transition-all rounded-xl shadow-lg active:scale-[0.98] flex items-center justify-center gap-3 group"
                  >
                    <span>Add to Collection</span>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  Limit 10 units • <span className="text-gold">Secure Checkout</span>
                </p>
              </div>

              {/* Enhanced Sharing Section */}
              <div className="bg-slate-50 p-6 rounded-2xl space-y-5 border border-slate-200/60 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-3">
                    <Share2 size={18} className="text-navy" />
                    <span className="text-xs font-bold uppercase tracking-widest text-navy">Share Masterpiece</span>
                  </div>
                  <button 
                    onClick={handleCopyLink}
                    className="text-[10px] font-bold uppercase tracking-widest text-gold hover:text-navy flex items-center gap-2 transition-all"
                  >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    {copied ? 'Link Copied' : 'Copy Link'}
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {socialLinks.map((link) => (
                    <a 
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${link.color} text-white py-3 rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-sm`}
                    >
                      {link.icon} <span>{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-32">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Refined Selection</span>
              <h2 className="text-3xl md:text-4xl font-serif text-navy">You May Also Admire</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onClick={onProductClick} 
                  onAddToCart={(prod) => onAddToCart(prod, 1)} 
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductView;
