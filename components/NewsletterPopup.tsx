
import React, { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';

const NewsletterPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasShown = localStorage.getItem('newsletter_shown');
      if (!hasShown) {
        setIsOpen(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('newsletter_shown', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-white max-w-2xl w-full rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-white md:text-gray-500 hover:text-gold z-10"
        >
          <X size={24} />
        </button>

        <div className="md:w-1/2 bg-navy relative min-h-[200px]">
          <img 
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            alt="Newsletter"
          />
          <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
            <p className="text-gold font-bold text-xs uppercase tracking-widest mb-2">Exclusive Offer</p>
            <h2 className="text-3xl font-serif">Join the Haven Society</h2>
          </div>
        </div>

        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <p className="text-gray-600 mb-6">
            Subscribe to receive $50 off your first purchase over $500 and early access to limited edition releases.
          </p>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                placeholder="Your email address"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
              />
            </div>
            <button className="w-full bg-navy text-white py-3 font-bold uppercase tracking-widest hover:bg-[#002a4a] transition-colors rounded">
              Subscribe Now
            </button>
          </form>
          <p className="text-[10px] text-gray-400 mt-6 text-center">
            By signing up, you agree to receive marketing communications. View our Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
