
import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ChevronRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartViewProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onBack: () => void;
}

const CartView: React.FC<CartViewProps> = ({ items, onUpdateQuantity, onRemove, onCheckout, onBack }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-gray-100 p-8 rounded-full text-gray-300 mb-8">
          <ShoppingBag size={80} />
        </div>
        <h2 className="text-3xl font-serif text-navy mb-4">Your Treasury is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">It seems you haven't selected any timepieces yet. Explore our curated collections to find your perfect match.</p>
        <button 
          onClick={onBack}
          className="bg-navy text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-[#002a4a] transition-all rounded shadow-lg"
        >
          Start Exploring
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-navy font-bold text-xs uppercase tracking-widest mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Collections</span>
        </button>

        <h1 className="text-4xl font-serif text-navy mb-12">Shopping Treasury</h1>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* List */}
          <div className="lg:w-2/3 space-y-10">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 pb-10 border-b border-gray-100 last:border-0">
                <div className="w-28 h-28 sm:w-40 sm:h-40 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                  <img src={item.images[0]} className="w-full h-full object-cover" alt={item.name} />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <p className="text-gold font-bold text-[10px] uppercase tracking-widest mb-1">{item.brand}</p>
                      <h3 className="text-xl font-serif text-navy mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-400 mb-4">{item.category}'s Collection</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-navy tracking-tight">${(item.price * item.quantity).toLocaleString()}</p>
                      <p className="text-xs text-gray-400 font-medium tracking-tight">${item.price.toLocaleString()} per unit</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6">
                    {/* Professional Luxury Quantity Selector for Cart */}
                    <div className="flex items-center h-10 bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden group hover:border-navy transition-colors duration-300">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                        className="w-10 h-full flex items-center justify-center text-navy hover:bg-gray-50 transition-colors disabled:opacity-20 border-r border-gray-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} strokeWidth={2.5} />
                      </button>
                      
                      <div className="w-10 flex items-center justify-center">
                        <span className="text-navy font-black text-sm select-none">
                          {item.quantity}
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        disabled={item.quantity >= 10}
                        className="w-10 h-full flex items-center justify-center text-navy hover:bg-gray-50 transition-colors disabled:opacity-20 border-l border-gray-100"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} strokeWidth={2.5} />
                      </button>
                    </div>

                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group"
                    >
                      <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:w-1/3">
            <div className="bg-navy text-white p-10 rounded-xl shadow-2xl sticky top-32 border border-gold/10">
              <h2 className="text-2xl font-serif mb-8 border-b border-white/10 pb-4">Treasury Total</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 uppercase tracking-widest font-bold">Items Subtotal</span>
                  <span className="font-bold text-lg tracking-tight">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 uppercase tracking-widest font-bold">Priority Shipping</span>
                  <span className="font-bold text-gold uppercase tracking-tighter">
                    {shipping === 0 ? 'Complimentary' : `$${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-gold/60 italic">Free overnight shipping on orders over $500</p>
                )}
                <div className="flex justify-between items-center text-xs border-t border-white/5 pt-6">
                  <span className="text-gray-400 uppercase tracking-widest font-bold">Estimated Tax</span>
                  <span className="text-[10px] uppercase tracking-tighter opacity-50">Calculated later</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-white/10 pt-8 mb-12">
                <span className="text-gold uppercase tracking-[0.2em] font-bold text-xs">Order Total</span>
                <span className="text-4xl font-bold tracking-tighter">${total.toLocaleString()}</span>
              </div>

              <button 
                onClick={onCheckout}
                className="w-full h-16 bg-gold text-navy py-4 font-bold uppercase tracking-[0.2em] text-xs hover:bg-white hover:shadow-lg transition-all rounded flex items-center justify-center gap-3 group"
              >
                <span>Finalize Acquisition</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-12 flex flex-col items-center gap-6">
                <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">Secure Global Payments</p>
                <div className="flex items-center justify-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" className="h-4" alt="Amex" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
