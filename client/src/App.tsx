import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import ProductGrid from './components/ProductGrid';
import type { Product } from './components/ProductGrid';
import Cart from './components/Cart';
import type { CartItem } from './components/Cart';
import ProductDetail from './pages/ProductDetail';
import CheckoutModal from './components/CheckoutModal';
import { ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from './ui/theme';

function getCartFromStorage(): CartItem[] {
  try {
    const data = localStorage.getItem('cart');
    if (!data) return [];
    const parsed: CartItem[] = JSON.parse(data);
    // Validate and filter out any invalid items
    return Array.isArray(parsed)
      ? parsed.filter(item => item && typeof item._id === 'string' && typeof item.quantity === 'number')
      : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(cart: CartItem[]) {
  // Only save if cart is a valid array
  if (Array.isArray(cart)) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [theme, setTheme] = useState<string>("");

  // Only set cartItems from localStorage on first mount, not on every render
  useEffect(() => {
    const stored = getCartFromStorage();
    if (stored.length > 0) {
      setCartItems(stored);
    }
  }, []);

  // Save cart to localStorage only when cartItems changes (not on every render)
  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/').then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => {
      setProducts(data);
    }).catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    })
  }, []);
  console.log(products);
  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const found = prev.find((item: any) => (item._id === (product as any)._id));
      if (found) {
        return prev.map((item: any) =>
          item._id === (product as any)._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const { id, ...rest } = product as any;
        return [...prev, { ...rest, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (_id: string) => {
    setCartItems((prev) => prev.filter((item: any) => item._id !== _id));
  };

  const handleQuantityChange = (_id: string, newQty: number) => {
    setCartItems((prev) =>
      prev.flatMap((item: any) => {
        if (item._id === _id) {
          if (newQty < 1) return [];
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const handleCheckout = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  ;
  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <Navbar themeName={theme} setTheme={setTheme} cartCount={cartCount} onCartClick={handleCartOpen} />
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={handleCartClose}
        ModalProps={{ keepMounted: true }}
        aria-label="cart drawer"
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 1 }}
      >
        <Box sx={{ width: { xs: 340, sm: 400 }, maxWidth: '100vw' }} role="presentation">
          <Cart
            cartItems={cartItems}
            onRemove={handleRemoveFromCart as any}
            onQuantityChange={handleQuantityChange as any}
            onCheckoutClick={() => setCheckoutOpen(true)}
          />
        </Box>
      </Drawer>
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onCheckout={handleCheckout}
      />
      <Routes>
        <Route path="/" element={
          <>
            <ProductGrid products={products} onAddToCart={handleAddToCart} />
          </>
        } />
        <Route path="/product/:id" element={<ProductDetail products={products} onAddToCart={handleAddToCart} />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
