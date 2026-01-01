
import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import { Product, Category } from '../types';
import { Watch, ShieldCheck, Truck, RefreshCw, ArrowRight } from 'lucide-react';

interface HomeViewProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onCategoryClick: (cat: Category) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ products, onProductClick, onAddToCart, onCategoryClick }) => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-[#F8FAFC]">
      <HeroSlider onExplore={() => onCategoryClick('Men')} />

      {/* Categories Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Heritage</span>
            <h2 className="text-4xl font-serif text-navy mb-4">Curated Collections</h2>
            <p className="text-gray-600 max-w-lg font-medium">Experience horological excellence through our diverse selection of luxury timepieces.</p>
          </div>
          <button onClick={() => onCategoryClick('Luxury')} className="hidden md:flex items-center space-x-2 text-navy font-bold border-b-2 border-gold pb-1 hover:text-gold transition-all group">
            <span>Discover All Collections</span>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: 'Luxury', name: "Luxury Collection", image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800' },
            { id: 'Smart', name: "Smartwatches", image: 'https://images.unsplash.com/photo-1544117518-2b02a6996ee9?auto=format&fit=crop&q=80&w=800' },
            { id: 'Men', name: "Men's Watches", image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&q=80&w=800' },
          ].map((cat) => (
            <div 
              key={cat.id}
              onClick={() => onCategoryClick(cat.id as Category)}
              className="relative h-[500px] overflow-hidden group cursor-pointer rounded-xl shadow-md"
            >
              <img 
                src={cat.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                alt={cat.name} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent transition-all group-hover:via-navy/50" />
              <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                <h3 className="text-3xl font-serif mb-4 transform group-hover:-translate-y-2 transition-transform duration-500">{cat.name}</h3>
                <button className="w-fit bg-white text-navy px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-navy transition-all transform opacity-90 group-hover:opacity-100">
                  Explore Collection
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-slate-100/50 py-24 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">New Arrivals</span>
            <h2 className="text-4xl md:text-5xl font-serif text-navy">Exquisite Craftsmanship</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((p) => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onClick={onProductClick} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals Bar */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: <Truck size={32} />, title: "US Express Shipping", desc: "Complimentary overnight FedEx delivery on orders over $500." },
              { icon: <ShieldCheck size={32} />, title: "Certified Luxury", desc: "Every timepiece is meticulously authenticated by our master horologists." },
              { icon: <RefreshCw size={32} />, title: "Concierge Returns", desc: "Seamless 30-day return policy for your complete peace of mind." },
              { icon: <Watch size={32} />, title: "2-Year Warranty", desc: "Comprehensive coverage on all mechanical movements and components." }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="bg-navy p-5 rounded-full text-gold mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  {item.icon}
                </div>
                <h4 className="font-bold text-navy mb-2 uppercase tracking-wide text-sm">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed px-4 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
