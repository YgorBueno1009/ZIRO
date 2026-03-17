import { createContext, useContext, useState, useCallback } from 'react';

// ─────────────────────────────────────
//  ZIRO — Store Global
//  Carrinho, Favoritos e Conta em um único contexto.
//  Pronto para substituir por chamadas à API Java no futuro:
//  - addToCart    → POST /api/cart/items
//  - removeFromCart → DELETE /api/cart/items/{id}
//  - toggleWishlist → POST/DELETE /api/wishlist/{productId}
//  - login/logout → POST /api/auth/login | /api/auth/logout
// ─────────────────────────────────────

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  // ── CART ──
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, qty }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter(i => i.id !== productId));
  }, []);

  const updateQty = useCallback((productId, qty) => {
    if (qty < 1) return;
    setCartItems(prev => prev.map(i => i.id === productId ? { ...i, qty } : i));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const cartTotal = cartItems.reduce((sum, i) => sum + i.val * i.qty, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  // ── WISHLIST ──
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      return exists ? prev.filter(i => i.id !== product.id) : [...prev, product];
    });
  }, []);

  const isWished = useCallback((productId) => {
    return wishlist.some(i => i.id === productId);
  }, [wishlist]);

  // ── USER / AUTH ──
  const [user, setUser] = useState(null); // null = não logado

  const login = useCallback((userData) => {
    // Futuramente: await fetch('/api/auth/login', { method:'POST', body: ... })
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateUser = useCallback((data) => {
    setUser(prev => ({ ...prev, ...data }));
  }, []);

  return (
    <StoreContext.Provider value={{
      // cart
      cartItems, addToCart, removeFromCart, updateQty, clearCart,
      cartTotal, cartCount,
      // wishlist
      wishlist, toggleWishlist, isWished,
      // user
      user, login, logout, updateUser,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore deve ser usado dentro de <StoreProvider>');
  return ctx;
}
