
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import CategoryView from './views/CategoryView';
import ProductView from './views/ProductView';
import CartView from './views/CartView';
import AdminView from './views/AdminView';
import NewsletterPopup from './components/NewsletterPopup';
import { View, Product, Category, CartItem } from './types';
import { PRODUCTS as INITIAL_PRODUCTS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Smooth scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProduct, selectedCategory]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: Math.min(10, item.quantity + quantity) } : item
        );
      }
      return [...prev, { ...product, quantity: Math.min(10, quantity) }];
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.min(10, Math.max(1, item.quantity + delta));
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Admin Actions
  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to remove this timepiece from the collection?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView 
            products={products}
            onProductClick={handleProductClick} 
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onCategoryClick={(cat) => { setSelectedCategory(cat); setCurrentView('category'); }}
          />
        );
      case 'category':
        return (
          <CategoryView 
            products={products}
            category={selectedCategory} 
            onProductClick={handleProductClick} 
            onAddToCart={(p) => handleAddToCart(p, 1)}
          />
        );
      case 'product':
        return selectedProduct ? (
          <ProductView 
            products={products}
            product={selectedProduct} 
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
          />
        ) : null;
      case 'cart':
        return (
          <CartView 
            items={cart} 
            onUpdateQuantity={updateCartQuantity} 
            onRemove={removeFromCart}
            onCheckout={() => alert("Checkout integration would follow here. Using test gateway.")}
            onBack={() => setCurrentView('home')}
          />
        );
      case 'admin':
        return (
          <AdminView 
            products={products}
            onAdd={addProduct}
            onUpdate={updateProduct}
            onDelete={deleteProduct}
          />
        );
      default:
        return <HomeView onProductClick={handleProductClick} onAddToCart={(p) => handleAddToCart(p, 1)} onCategoryClick={(cat) => { setSelectedCategory(cat); setCurrentView('category'); }} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        currentView={currentView} 
        setView={setCurrentView} 
        setCategoryFilter={setSelectedCategory}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <Footer />
      <NewsletterPopup />
    </div>
  );
};

export default App;
