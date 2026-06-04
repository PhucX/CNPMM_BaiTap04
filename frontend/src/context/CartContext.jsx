import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { addCartItem, getCart, removeCartItem, updateCartItem } from '../services/cart.service';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [], totalItems: 0, subtotal: 0 });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user || user.role !== 'member') return;
    setLoading(true);
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, color, size, quantity) => {
    try {
      await addCartItem(productId, color, size, quantity);
      await fetchCart(); // Refresh cart data
      return true;
    } catch (err) {
      console.error('Add to cart failed:', err);
      return false;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      await updateCartItem(itemId, quantity);
      await fetchCart();
    } catch (err) {
      console.error('Update quantity failed:', err);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await removeCartItem(itemId);
      await fetchCart();
    } catch (err) {
      console.error('Remove from cart failed:', err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateQuantity, removeFromCart, refreshCart: fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
