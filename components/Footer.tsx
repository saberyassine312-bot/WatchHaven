
import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white pt-16 pb-8 border-t border-[#002a4a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-serif tracking-tighter text-gold">WATCH</span>
            <span className="text-2xl font-serif tracking-tighter text-white">HAVEN</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Since 1994, WatchHaven has been the premier destination for discerning collectors across the United States. We curate only the finest timepieces that blend heritage with innovation.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="hover:text-gold transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-gold transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-gold transition-colors"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-gold font-bold uppercase tracking-widest text-xs mb-6">Explore</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pre-Owned Luxury</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Watch Haven Blog</a></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-gold font-bold uppercase tracking-widest text-xs mb-6">Customer Care</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Track My Order</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Warranty & Repairs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-gold font-bold uppercase tracking-widest text-xs mb-6">Get In Touch</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-gold flex-shrink-0" />
              <span>5th Avenue, Suite 1200<br />New York, NY 10018</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-gold flex-shrink-0" />
              <span>+1 (800) HAVEN-94</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-gold flex-shrink-0" />
              <span>concierge@watchhaven.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#002a4a] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© 2024 WatchHaven Inc. All Rights Reserved.</p>
        <div className="mt-4 md:mt-0 flex items-center space-x-6">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Visa" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Mastercard" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Paypal" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Amex" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
