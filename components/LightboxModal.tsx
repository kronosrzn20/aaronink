'use client';

import React, { useEffect } from 'react';
import { FlashDesign, STUDIO_DATA } from '@/lib/catalog-data';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  designs: FlashDesign[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function LightboxModal({
  isOpen,
  onClose,
  designs,
  currentIndex,
  onNavigate,
}: LightboxModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        const next = (currentIndex - 1 + designs.length) % designs.length;
        onNavigate(next);
      }
      if (e.key === 'ArrowRight') {
        const next = (currentIndex + 1) % designs.length;
        onNavigate(next);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex, designs.length, onClose, onNavigate]);

  if (!isOpen || !designs[currentIndex]) return null;

  const current = designs[currentIndex];
  const encodedMsg = encodeURIComponent(
    `Hola AaronInk, quiero solicitar el diseño: ${current.code} - ${current.title} (${current.dims}). ¿Tienen disponibilidad inmediata?`
  );
  const waUrl = `https://wa.me/${STUDIO_DATA.phone}?text=${encodedMsg}`;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prev = (currentIndex - 1 + designs.length) % designs.length;
    onNavigate(prev);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = (currentIndex + 1) % designs.length;
    onNavigate(next);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#050505]/96 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none"
    >
      {/* Top Bar inside Lightbox */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-[#E63946]/35">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#E63946]" />
          <span className="font-display text-2xl uppercase text-[#E63946] tracking-wider font-bold">
            {current.code}
          </span>
          <span className="text-[#7C7870] hidden sm:inline">·</span>
          <span className="font-display text-lg sm:text-xl font-bold uppercase text-[#F4F1EA] hidden sm:inline truncate max-w-md">
            {current.title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#A6A29A] hidden md:inline uppercase tracking-widest bg-[#0C0C0E] px-4 py-1.5 rounded-[2px] border border-white/10">
            ESC o Flechas para navegar
          </span>
          <button
            aria-label="Cerrar Visor"
            className="w-11 h-11 rounded-[2px] bg-[#0C0C0E] hover:bg-[#E63946] text-[#F4F1EA] flex items-center justify-center transition-colors cursor-pointer border border-white/15 hover:border-[#E63946]"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>
      </div>

      {/* Center Stage: Image with Nav Arrows */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden my-3">
        <button
          aria-label="Diseño Anterior"
          className="absolute left-2 sm:left-6 z-20 w-12 h-12 rounded-[2px] bg-[#0C0C0E]/90 hover:bg-[#E63946] text-[#F4F1EA] flex items-center justify-center transition-colors duration-200 cursor-pointer border border-white/15 hover:border-[#E63946]"
          onClick={handlePrev}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span>
        </button>

        <div className="relative max-h-full max-w-full flex flex-col items-center justify-center p-2">
          <div className="relative rounded-[2px] overflow-hidden border border-white/15 bg-[#0C0C0E]">
            <img
              className="max-h-[64vh] sm:max-h-[70vh] md:max-h-[74vh] w-auto object-contain"
              alt={current.alt}
              src={current.image}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Floating Spec Tag on Lightbox */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 bg-[#0C0C0E] rounded-[2px] px-5 py-2 border border-[#E63946]/45">
            <span className="text-xs uppercase tracking-wider text-[#F4F1EA] font-semibold">
              {current.dims}
            </span>
            <span className="text-[#7C7870]">|</span>
            <span className="text-xs uppercase tracking-wider text-[#E63946] font-bold">
              {current.style}
            </span>
            <span className="text-[#7C7870]">|</span>
            <span className="text-xs uppercase tracking-wider text-[#A6A29A] font-semibold">
              {current.duration}
            </span>
          </div>
        </div>

        <button
          aria-label="Siguiente Diseño"
          className="absolute right-2 sm:right-6 z-20 w-12 h-12 rounded-[2px] bg-[#0C0C0E]/90 hover:bg-[#E63946] text-[#F4F1EA] flex items-center justify-center transition-colors duration-200 cursor-pointer border border-white/15 hover:border-[#E63946]"
          onClick={handleNext}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">arrow_forward_ios</span>
        </button>
      </div>

      {/* Lightbox Bottom Conversion Action Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0C0C0E] rounded-[2px] p-4 sm:p-5 border border-white/10 border-t border-t-[#E63946]/45">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#A6A29A]">
          <span className="material-symbols-outlined text-[#E63946] text-[20px]">verified</span>
          <span>Captura o pide con un toque. Duración clínica garantizada: 12-14 días con fórmula botánica.</span>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            className="w-full sm:w-auto bg-[#16A34A] hover:bg-[#15803D] text-white text-xs uppercase tracking-wider px-6 py-3.5 rounded-[2px] font-bold flex items-center justify-center gap-2 transition-colors duration-200"
            href={waUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>Enviar captura de este diseño a WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
