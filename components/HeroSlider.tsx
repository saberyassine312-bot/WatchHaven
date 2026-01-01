
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSliderProps {
  onExplore: () => void;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ onExplore }) => {
  return (
    <section className="relative h-[600px] md:h-[800px] bg-navy overflow-hidden">
      {/* Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=2000" 
        alt="Luxury Watch Background"
        className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow"
      />
      
      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/50 to-transparent flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-block text-gold font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-6 animate-in slide-in-from-left duration-700">
              The 2024 Heritage Collection
            </span>
            <h1 className="text-4xl md:text-7xl font-serif text-white leading-tight mb-8 animate-in slide-in-from-left duration-1000 delay-200">
              Define Your <br />
              <span className="italic text-gold">Legacy</span> Through Time.
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-lg leading-relaxed animate-in slide-in-from-left duration-1000 delay-300">
              Discover unparalleled craftsmanship and timeless elegance in our curated selection of the world's finest horological masterpieces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom duration-1000 delay-500">
              <button 
                onClick={onExplore}
                className="bg-gold text-navy px-8 py-4 font-bold uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-white transition-all transform hover:-translate-y-1"
              >
                <span>Shop Men's</span>
                <ArrowRight size={18} />
              </button>
              <button className="border border-white text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-navy transition-all transform hover:-translate-y-1">
                Explore Women's
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Signals Floating */}
      <div className="absolute bottom-12 right-0 left-0 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-white/60 text-xs tracking-widest uppercase font-bold border-t border-white/10 pt-8">
            <div className="flex items-center space-x-3">
              <span className="text-gold">01</span>
              <span>Swiss-Grade Precision</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gold">02</span>
              <span>2-Year Global Warranty</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gold">03</span>
              <span>Certified Authenticity</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gold">04</span>
              <span>FedEx Overnight Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
