
export type Category = 'Men' | 'Women' | 'Smart' | 'Luxury' | 'Sports' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: Category;
  description: string;
  specs: string[];
  images: string[];
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  discount?: number;
  marketingLink?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type View = 'home' | 'category' | 'product' | 'cart' | 'checkout' | 'admin';
