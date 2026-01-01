
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Heritage Chronograph Blue',
    brand: 'Haven Elite',
    price: 1250,
    category: 'Men',
    description: 'A timeless piece featuring a deep navy dial, sapphire crystal, and genuine Italian leather strap. Precision movement for the modern gentleman.',
    specs: ['42mm Case', 'Sapphire Crystal', '10ATM Water Resistance', 'Swiss Quartz Movement'],
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.8,
    reviewsCount: 124,
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Grace Rose Gold',
    brand: 'Haven Femme',
    price: 850,
    category: 'Women',
    description: 'Elegant and understated. The Grace collection features a minimalist face with diamond markers and a sleek rose gold mesh band.',
    specs: ['32mm Case', 'Diamond Markers', '5ATM Water Resistance', 'Japanese Movement'],
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509048191080-d2984bad6ad5?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.9,
    reviewsCount: 89,
    isNew: true
  },
  {
    id: '3',
    name: 'Cosmos V3 Pro',
    brand: 'Haven Tech',
    price: 499,
    category: 'Smart',
    description: 'The ultimate wearable. Tracks fitness, heart rate, and sleep with a stunning AMOLED display. 10-day battery life for the active lifestyle.',
    specs: ['AMOLED Display', 'Heart Rate Sensor', 'GPS Enabled', 'iOS/Android Compatible'],
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aac291ba597?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.5,
    reviewsCount: 342,
    discount: 15
  },
  {
    id: '4',
    name: 'Royal Oak Skeleton',
    brand: 'Grand Haven',
    price: 15400,
    category: 'Luxury',
    description: 'A masterpiece of mechanical engineering. See every gear turn in this hand-wound skeletonized masterpiece crafted from 18k solid gold.',
    specs: ['40mm Case', '18k Gold', 'Mechanical Hand-Wind', 'Limited Edition'],
    images: [
      'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 5.0,
    reviewsCount: 12,
    isBestSeller: true
  },
  {
    id: '5',
    name: 'Oceanic Diver 300',
    brand: 'Haven Sport',
    price: 950,
    category: 'Sports',
    description: 'Professional grade diving watch. Unidirectional ceramic bezel and luminous markers for maximum visibility in the deep.',
    specs: ['44mm Case', '300m Depth', 'Ceramic Bezel', 'Automatic Movement'],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.7,
    reviewsCount: 56
  },
  {
    id: '6',
    name: 'Premium Leather Winder',
    brand: 'Haven Care',
    price: 299,
    category: 'Accessories',
    description: 'Keep your automatic watches perfectly timed with our dual-watch winder. Crafted with walnut wood and premium leather.',
    specs: ['Dual Motor', 'Silent Operation', 'Battery/AC Power', 'Walnut Wood'],
    images: [
      'https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.6,
    reviewsCount: 28
  }
];
