'use client';

import React from 'react';
import { useCart } from '@/lib/cart-context';
import { STUDIO_DATA } from '@/lib/catalog-data';

interface HeaderProps {
  onNavigateSection?: (sectionId: string) => void;
}

export default function Header({ onNavigateSection }: HeaderProps) {
  const { cart, activeScreen, setActiveScreen } = useCart();

  const handleNavClick = (sectionId: string) => {
    if (activeScreen !== 'home') {
      setActiveScreen('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#050505]/95 backdrop-blur-md border-b border-[#E63946]/35 shadow-[0_10px_40px_rgba(0,0,0,0.7),0_5px_15px_rgba(0,0,0,0.5)]">
      <div className="h-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <button
          onClick={() => {
            setActiveScreen('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group shrink-0"
          type="button"
          aria-label="Volver al inicio"
        >
          <img
            alt="AaronInk Logo"
            className="h-16 sm:h-20 lg:h-[106px] w-auto object-contain"
            src="/assets/aistudio/logo.webp"
          />
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#F4F1EA] group-hover:text-[#E63946] transition-colors duration-200 leading-none">
              AaronInk<span className="text-[#E63946]">.</span>
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#A6A29A] font-medium tracking-wide hidden sm:inline-block mt-0.5">
              Tatuajes Semipermanentes · 12-14 Días
            </span>
          </div>
        </button>

        {/* Navigation Zone - Desktop */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => handleNavClick('catalogos-grid')}
            className="text-xs font-semibold uppercase tracking-wider text-[#A6A29A] hover:text-[#F4F1EA] py-2 px-3.5 transition-colors duration-200 cursor-pointer whitespace-nowrap border-b-2 border-transparent hover:border-[#E63946]/60"
          >
            Catálogos
          </button>
          <button
            onClick={() => handleNavClick('como-funciona')}
            className="text-xs font-semibold uppercase tracking-wider text-[#A6A29A] hover:text-[#F4F1EA] py-2 px-3.5 transition-colors duration-200 cursor-pointer whitespace-nowrap border-b-2 border-transparent hover:border-[#E63946]/60"
          >
            Cómo Funciona
          </button>
          <button
            onClick={() => handleNavClick('pagos')}
            className="text-xs font-semibold uppercase tracking-wider text-[#A6A29A] hover:text-[#F4F1EA] py-2 px-3.5 transition-colors duration-200 cursor-pointer whitespace-nowrap border-b-2 border-transparent hover:border-[#E63946]/60"
          >
            Entregas y Pagos
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => {
            const menu = document.getElementById('mobile-menu');
            if (menu) {
              menu.classList.toggle('hidden');
            }
          }}
          className="lg:hidden w-11 h-11 rounded-[2px] bg-[#0C0C0E] hover:bg-[#161619] text-[#F4F1EA] flex items-center justify-center transition-colors duration-200 cursor-pointer border border-white/15 hover:border-[#E63946]"
          type="button"
          aria-label="Abrir menú"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        {/* Action Controls Zone */}
        <div className="flex items-center gap-2.5">
          {/* Direct WhatsApp Conversion Action (Green strictly for WhatsApp) */}
          <a
            className="bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs uppercase tracking-wider px-3 sm:px-4 py-2.5 rounded-[2px] flex items-center gap-2 transition-colors duration-200 whitespace-nowrap"
            href={`https://wa.me/${STUDIO_DATA.phone}?text=Hola%20AaronInk%20%F0%9F%91%8B%20Quiero%20solicitar%20informaci%C3%B3n%20sobre%20los%20tatuajes%20semipermanentes.`}
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Consultar por WhatsApp"
          >
            <img src="/whatsapp-icon.png" alt="WhatsApp" className="w-[18px] h-[18px]" />
            <span className="hidden md:inline font-bold">Consulta</span>
          </a>

          {/* Cart Button - Direct to Checkout */}
          <button
            aria-label="Ver Carrito"
            className="relative w-11 h-11 rounded-[2px] bg-[#0C0C0E] hover:bg-[#161619] text-[#F4F1EA] flex items-center justify-center transition-colors duration-200 cursor-pointer border border-white/15 hover:border-[#E63946]"
            onClick={() => {
              setActiveScreen('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-[#E63946] text-[#F4F1EA] text-[11px] font-bold flex items-center justify-center rounded-[2px]">
                {cart.length}
              </span>
            )}
          </button>

        </div>

        {/* Mobile Menu Dropdown */}
        <div
          id="mobile-menu"
          className="hidden lg:hidden absolute top-full left-0 w-full bg-[#050505]/98 backdrop-blur-md border-b border-[#E63946]/35 py-4 px-4"
        >
          <nav className="flex flex-col gap-2 max-w-7xl mx-auto">
            <button
              onClick={() => {
                handleNavClick('catalogos-grid');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className="text-sm font-semibold uppercase tracking-wider text-[#A6A29A] hover:text-[#F4F1EA] py-3 px-4 transition-colors duration-200 cursor-pointer text-left border-b border-white/10 hover:border-[#E63946]/60"
            >
              Catálogos
            </button>
            <button
              onClick={() => {
                handleNavClick('como-funciona');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className="text-sm font-semibold uppercase tracking-wider text-[#A6A29A] hover:text-[#F4F1EA] py-3 px-4 transition-colors duration-200 cursor-pointer text-left border-b border-white/10 hover:border-[#E63946]/60"
            >
              Cómo Funciona
            </button>
            <button
              onClick={() => {
                handleNavClick('pagos');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className="text-sm font-semibold uppercase tracking-wider text-[#A6A29A] hover:text-[#F4F1EA] py-3 px-4 transition-colors duration-200 cursor-pointer text-left"
            >
              Entregas y Pagos
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
