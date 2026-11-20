'use client';

import React from 'react';
import { STUDIO_DATA } from '@/lib/catalog-data';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] py-16 pb-28 border-t border-[#E63946]/35 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Studio Profile */}
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-2">
              <span className="font-display text-3xl font-bold uppercase tracking-tight text-[#F4F1EA]">
                {STUDIO_DATA.name}<span className="text-[#E63946]">.</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A6A29A] max-w-sm leading-relaxed">
              Estudio especializado en tatuajes semipermanentes de fórmula orgánica de jagua con duración clínica garantizada de 12 a 14 días. Cero dolor, máxima fidelidad y estética de aguja 3RL.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[2px] bg-[#0C0C0E] text-[#F4F1EA] w-fit border border-[#E63946]/45 text-xs uppercase tracking-wider font-bold">
              <span className="material-symbols-outlined text-[16px] text-[#E63946]">verified</span>
              <span>12-14 Días · Tintas seguras libres de dolor</span>
            </div>
          </div>

          {/* Payments and Transfers */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-lg font-bold uppercase text-[#F4F1EA] tracking-wider flex items-center gap-2 pb-1.5 border-b border-[#E63946]/40 w-fit">
              <span className="w-2 h-2 bg-[#E63946]" />
              <span>Pagos y Depósitos</span>
            </h4>
            <div className="flex flex-col gap-2 text-xs sm:text-sm text-[#A6A29A]">
              <p>
                <span className="text-[#F4F1EA] font-semibold">Yape / Plin:</span>{' '}
                <span className="text-[#E63946] font-bold tracking-wider tabular-nums">{STUDIO_DATA.yapeNumber}</span>
              </p>
              <p>
                <span className="text-[#F4F1EA] font-semibold">Titular Oficial:</span> {STUDIO_DATA.yapeOwner}
              </p>
              <p className="text-[#7C7870] text-xs leading-relaxed pt-1">
                Entregas presenciales en Estaciones del Tren Eléctrico (Lima) y despachos diarios a nivel nacional vía Shalom y Olva Courier.
              </p>
            </div>
          </div>

          {/* Direct Support */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-lg font-bold uppercase text-[#F4F1EA] tracking-wider flex items-center gap-2 pb-1.5 border-b border-[#E63946]/40 w-fit">
              <span className="w-2 h-2 bg-[#E63946]" />
              <span>Atención Directa</span>
            </h4>
            <div className="flex flex-col gap-2 text-xs sm:text-sm text-[#A6A29A]">
              <p>
                <span className="text-[#F4F1EA] font-semibold">WhatsApp Estudio:</span>{' '}
                <a
                  href={`https://wa.me/${STUDIO_DATA.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E63946] hover:text-[#F4F1EA] underline decoration-[#E63946] font-semibold transition-colors"
                >
                  {STUDIO_DATA.phoneFormatted}
                </a>
              </p>
              <p>
                <span className="text-[#F4F1EA] font-semibold">Horario:</span> {STUDIO_DATA.schedule}
              </p>
              <p className="text-[#7C7870] text-xs leading-relaxed pt-1">
                Asesoría de colocación, catálogo personalizado y cuidados dérmicos post-aplicación.
              </p>
            </div>
          </div>
        </div>

        {/* Legal & Manifesto Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs uppercase text-[#7C7870] tracking-wider">
            © 2026 AaronInk. Todos los derechos reservados. Lima, Perú.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#A6A29A] uppercase tracking-widest font-medium">
              Blackwork · Minimal · Neo-Traditional · Script · Irezumi
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
