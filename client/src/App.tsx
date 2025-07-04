import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Navbar from './Navbar'
import { Routes, Route } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import ProductGrid from './ProductGrid';
import type { Product } from './ProductGrid';
import Cart from './Cart';
import type { CartItem } from './Cart';
import ProductDetail from './ProductDetail';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://via.placeholder.com/200x140?text=Headphones',
    description: 'High-quality wireless headphones with noise cancellation.',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 149.99,
    image: 'https://via.placeholder.com/200x140?text=Smart+Watch',
    description: 'Track your fitness and notifications on the go.',
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 59.99,
    image: 'https://via.placeholder.com/200x140?text=Speaker',
    description: 'Portable speaker with deep bass and long battery life.',
  },
  {
    id: 4,
    name: 'Fitness Tracker',
    price: 79.99,
    image: 'https://via.placeholder.com/200x140?text=Fitness+Tracker',
    description: 'Monitor your health and activity 24/7.',
  },
  {
    id: 5,
    name: 'Portable Charger',
    price: 29.99,
    image: 'https://via.placeholder.com/200x140?text=Charger',
    description: 'Charge your devices anywhere, anytime.',
  },
  {
    id: 6,
    name: 'VR Headset',
    price: 199.99,
    image: 'https://via.placeholder.com/200x140?text=VR+Headset',
    description: 'Experience immersive virtual reality games and apps.',
  },
  {
    id: 7,
    name: 'Gaming Mouse',
    price: 49.99,
    image: 'https://via.placeholder.com/200x140?text=Gaming+Mouse',
    description: 'Precision mouse for gaming and productivity.',
  },
  {
    id: 8,
    name: 'Mechanical Keyboard',
    price: 89.99,
    image: 'https://via.placeholder.com/200x140?text=Keyboard',
    description: 'Tactile mechanical keyboard with RGB lighting.',
  },
  {
    id: 9,
    name: 'Smart Light Bulb',
    price: 19.99,
    image: 'https://via.placeholder.com/200x140?text=Light+Bulb',
    description: 'Control your lighting from your phone.',
  },
  {
    id: 10,
    name: 'Noise Cancelling Earbuds',
    price: 129.99,
    image: 'https://via.placeholder.com/200x140?text=Earbuds',
    description: 'Enjoy music with active noise cancellation.',
  },
];

function getCartFromStorage(): CartItem[] {
  try {
    const data = localStorage.getItem('cart');
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveCartToStorage(cart: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCartFromStorage());
  }, []);

  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: number, newQty: number) => {
    setCartItems((prev) =>
      prev.flatMap((item) => {
        if (item.id === id) {
          if (newQty < 1) return [];
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar cartCount={cartCount} onCartClick={handleCartOpen} />
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={handleCartClose}
        ModalProps={{ keepMounted: true }}
        aria-label="cart drawer"
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 1 }}
      >
        <Box sx={{ width: { xs: 340, sm: 400 }, maxWidth: '100vw' }} role="presentation">
          <Cart cartItems={cartItems} onRemove={handleRemoveFromCart} onQuantityChange={handleQuantityChange} />
        </Box>
      </Drawer>
      <Routes>
        <Route path="/" element={
          <>
            <ProductGrid products={MOCK_PRODUCTS} onAddToCart={handleAddToCart} />
          </>
        } />
        <Route path="/product/:id" element={<ProductDetail products={MOCK_PRODUCTS} onAddToCart={handleAddToCart} />} />
      </Routes>
    </>
  )
}

export default App
