'use client';

import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'success' | 'error' | 'info';
}

export default function Toast({ message, isVisible, onClose, type = 'success' }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Se cierra automáticamente después de 3 segundos

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'bg-[#16A34A]' : type === 'error' ? 'bg-[#E63946]' : 'bg-[#0C0C0E]';
  const icon = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';

  return (
    <div className="fixed top-24 right-4 z-[100] animate-slide-in">
      <div className={`${bgColor} text-white px-6 py-4 rounded-[2px] shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex items-center gap-3 min-w-[280px] border border-white/20`}>
        <span className="material-symbols-outlined text-[24px]">{icon}</span>
        <span className="font-semibold text-sm flex-1">{message}</span>
        <button
          onClick={onClose}
          className="material-symbols-outlined text-[20px] hover:opacity-70 transition-opacity cursor-pointer"
          aria-label="Cerrar notificación"
        >
          close
        </button>
      </div>
    </div>
  );
}
