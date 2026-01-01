
import React, { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { View, Category } from '../types';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
  setCategoryFilter: (cat: Category | null) => void;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ setView, setCategoryFilter, cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const categoryLabels: Record<Category, string> = {
    'Men': "Men's Watches",
    'Women': "Women's Watches",
    'Smart': "Smartwatches",
    'Luxury': "Luxury Collection",
    'Sports': "Sports & Diving",
    'Accessories': "Accessories"
  };

  const categories: Category[] = ['Men', 'Women', 'Smart', 'Luxury', 'Sports', 'Accessories'];

  const handleNav = (cat: Category | null) => {
    setCategoryFilter(cat);
    setView(cat ? 'category' : 'home');
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-navy text-white shadow-xl">
      {/* Top utility bar */}
      <div className="bg-[#001224] py-2 px-4 text-center text-xs tracking-widest text-gold uppercase font-semibold border-b border-gold/10">
        Free FedEx Overnight Shipping on All US Orders Over $500
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center space-x-2" 
            onClick={() => handleNav(null)}
          >
            <span className="text-2xl md:text-3xl font-serif tracking-tighter text-gold">WATCH</span>
            <span className="text-2xl md:text-3xl font-serif tracking-tighter text-white">HAVEN</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleNav(cat)}
                className="text-xs font-bold uppercase tracking-widest hover:text-gold transition-colors duration-200"
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button className="p-2 hover:text-gold transition-colors">
              <Search size={22} />
            </button>
            <button 
              onClick={() => setView('admin')}
              className="p-2 hover:text-gold transition-colors"
              title="Inventory Management"
            >
              <User size={22} />
            </button>
            <button 
              onClick={() => setView('cart')}
              className="p-2 hover:text-gold transition-colors relative"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-navy text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="lg:hidden p-2 text-gold"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-navy border-t border-[#002a4a] px-4 py-6 space-y-4 animate-in fade-in slide-in-from-top-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleNav(cat)}
              className="block w-full text-left py-3 text-lg font-medium border-b border-[#002a4a] last:border-0 hover:text-gold transition-colors"
            >
              {categoryLabels[cat]}
            </button>
          ))}
          <div className="flex space-x-4 pt-4">
            <button 
              onClick={() => { setView('admin'); setIsMenuOpen(false); }}
              className="flex-1 bg-[#001224] py-3 rounded text-sm font-bold flex items-center justify-center space-x-2 border border-gold/20"
            >
              <User size={18} /> <span>Admin</span>
            </button>
            <button 
              onClick={() => { setView('cart'); setIsMenuOpen(false); }}
              className="flex-1 bg-gold text-navy py-3 rounded text-sm font-bold flex items-center justify-center space-x-2"
            >
              <ShoppingBag size={18} /> <span>Cart ({cartCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
