'use client';

import React, { useEffect, useState } from 'react';
import { CartProvider, useCart } from '@/lib/cart-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import BottomStickyBar from '@/components/BottomStickyBar';
import HomeScreen from '@/components/screens/HomeScreen';
import CatalogScreen from '@/components/screens/CatalogScreen';
import CheckoutScreen from '@/components/screens/CheckoutScreen';
import OrderViewScreen from '@/components/screens/OrderViewScreen';
import Toast from '@/components/Toast';

function MainApp() {
  const { activeScreen, setActiveScreen, toastMessage, toastVisible, hideToast } = useCart();
  const [orderViewData, setOrderViewData] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Marcar que estamos en el cliente
    setIsClient(true);

    // Detectar si hay parámetros de orden en la URL
    const params = new URLSearchParams(window.location.search);
    const orderParam = params.get('order');

    if (orderParam) {
      try {
        // Decodificar base64
        const decoded = atob(orderParam);
        const orderData = JSON.parse(decoded);
        setOrderViewData(orderData);
      } catch (error) {
        console.error('Error al decodificar orden:', error);
        setOrderViewData(null);
      }
    } else {
      // Si no hay parámetro de orden, asegurar que orderViewData sea null
      setOrderViewData(null);
    }
  }, []);

  // Escuchar cambios en la URL (cuando se limpia desde el Header)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const orderParam = params.get('order');
      
      if (!orderParam) {
        setOrderViewData(null);
        setActiveScreen('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setActiveScreen]);

  // Mientras no estemos en el cliente, mostrar loading
  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F4F1EA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#E63946] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#A6A29A] text-sm">Cargando...</span>
        </div>
      </div>
    );
  }

  // Si hay datos de orden, mostrar OrderViewScreen
  if (orderViewData) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F4F1EA] flex flex-col justify-between selection:bg-[#E63946] selection:text-[#F4F1EA]">
        <Header />
        <main className="w-full flex-1 pt-28">
          <OrderViewScreen orderData={orderViewData} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F1EA] flex flex-col justify-between selection:bg-[#E63946] selection:text-[#F4F1EA]">
      <Header />

      {/* Dynamic Screen Content */}
      <main className="w-full flex-1 pt-28">
        {activeScreen === 'home' && <HomeScreen />}
        {activeScreen === 'catalog' && <CatalogScreen />}
        {activeScreen === 'checkout' && <CheckoutScreen />}
      </main>

      <Footer />
      <BottomStickyBar />
      <CartDrawer />
      
      {/* Toast Notification */}
      <Toast 
        message={toastMessage} 
        isVisible={toastVisible} 
        onClose={hideToast}
        type="success"
      />
    </div>
  );
}

export default function Page() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
