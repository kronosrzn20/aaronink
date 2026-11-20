'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, INITIAL_CART_ITEMS } from './catalog-data';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  activeScreen: 'home' | 'catalog' | 'checkout';
  setActiveScreen: (screen: 'home' | 'catalog' | 'checkout') => void;
  selectedCatalogId: string;
  setSelectedCatalogId: (id: string) => void;
  toastMessage: string;
  toastVisible: boolean;
  showToast: (message: string) => void;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('aaronink_order_cart');
        if (stored) {
          const parsed = JSON.parse(stored);
          // Validar que es un array válido
          if (Array.isArray(parsed)) {
            // Filtrar items inválidos o duplicados
            const validItems = parsed.filter((item, index, self) => 
              item && 
              item.id && 
              item.title &&
              self.findIndex(i => i.id === item.id) === index
            );
            if (validItems.length > 0) {
              return validItems;
            }
          }
          // Si hay datos corruptos, limpiar localStorage
          localStorage.removeItem('aaronink_order_cart');
        }
      } catch (error) {
        // Si hay error parseando, limpiar localStorage
        console.warn('Error loading cart from localStorage, clearing...', error);
        localStorage.removeItem('aaronink_order_cart');
      }
    }
    return INITIAL_CART_ITEMS;
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState<'home' | 'catalog' | 'checkout'>('home');
  const [selectedCatalogId, setSelectedCatalogId] = useState('cat-brazo-completo');
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    try {
      if (cart.length === 0) {
        // Si el carrito está vacío, asegurarse de limpiar el localStorage
        localStorage.removeItem('aaronink_order_cart');
      } else {
        localStorage.setItem('aaronink_order_cart', JSON.stringify(cart));
      }
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.id === item.id);
      if (exists) {
        setToastMessage('Este diseño ya está en tu carrito');
        setToastVisible(true);
        return prev;
      }
      setToastMessage('✓ Agregado al carrito');
      setToastVisible(true);
      return [...prev, item];
    });
    // Ya no abrimos el drawer, el usuario debe ir al checkout manualmente
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        activeScreen,
        setActiveScreen,
        selectedCatalogId,
        setSelectedCatalogId,
        toastMessage,
        toastVisible,
        showToast,
        hideToast,
      }}
    >
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
