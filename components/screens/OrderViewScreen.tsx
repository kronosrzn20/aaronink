'use client';

import React, { useEffect, useState } from 'react';
import { ALL_CATALOGS } from '@/lib/catalog-data';

interface OrderViewScreenProps {
  orderData: {
    items: string[];
    clientName: string;
    deliveryMode: string;
    agency?: string;
    notes?: string;
  };
}

export default function OrderViewScreen({ orderData }: OrderViewScreenProps) {
  const [designs, setDesigns] = useState<any[]>([]);

  useEffect(() => {
    // Buscar los diseños en todos los catálogos
    const foundDesigns: any[] = [];
    
    orderData.items.forEach((itemId) => {
      ALL_CATALOGS.forEach((catalog) => {
        const design = catalog.designs.find((d) => d.id === itemId);
        if (design) {
          foundDesigns.push({
            ...design,
            catalogName: catalog.title,
          });
        }
      });
    });

    setDesigns(foundDesigns);
  }, [orderData.items]);

  const deliveryText =
    orderData.deliveryMode === 'tren'
      ? 'Estación del Tren (Lima) - Reserva S/ 5'
      : `Envío por Shalom - 50% Adelanto${orderData.agency ? ` - ${orderData.agency}` : ''}`;

  return (
    <div className="flex flex-col w-full text-[#F4F1EA] min-h-screen">
      {/* Header Banner */}
      <section className="w-full bg-[#050505] px-4 sm:px-6 lg:px-8 py-4 border-b border-[#E63946]/35">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E63946]" />
            <span className="text-[#F4F1EA] font-bold">Vista de Orden del Cliente</span>
          </div>
          <div className="flex items-center gap-2 text-[#A6A29A]">
            <span className="material-symbols-outlined text-[#E63946] text-[16px]">verified</span>
            <span>Solicitud Recibida</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full bg-[#050505] px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Client Info Card */}
          <div className="rounded-[2px] bg-[#0C0C0E] p-6 sm:p-8 border border-[#E63946]/60">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E63946]/40">
              <span className="material-symbols-outlined text-[#E63946] text-[28px]">person</span>
              <h1 className="font-display text-3xl sm:text-4xl uppercase text-[#F4F1EA] tracking-tight font-bold">
                Datos del Cliente
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wider text-[#E63946] font-bold">Nombre Completo</span>
                <span className="font-display text-2xl uppercase text-[#F4F1EA] font-bold">
                  {orderData.clientName}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wider text-[#E63946] font-bold">Modalidad de Entrega</span>
                <span className="text-base text-[#F4F1EA] font-semibold">{deliveryText}</span>
              </div>

              {orderData.notes && (
                <div className="md:col-span-2 flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-wider text-[#E63946] font-bold">Comentarios</span>
                  <p className="text-sm text-[#A6A29A] leading-relaxed bg-[#050505] p-4 rounded-[2px] border border-white/10">
                    {orderData.notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Designs Gallery */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between rounded-[2px] bg-[#0C0C0E] px-6 py-4 border border-white/10 border-b border-b-[#E63946]/45">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#E63946] text-[24px]">gallery_thumbnail</span>
                <h2 className="font-display text-2xl font-bold uppercase text-[#F4F1EA] tracking-wide">
                  Diseños Seleccionados
                </h2>
              </div>
              <span className="text-xs bg-[#E63946] text-[#F4F1EA] px-3.5 py-1 rounded-[2px] uppercase tracking-wider font-bold tabular-nums">
                {designs.length} {designs.length === 1 ? 'Diseño' : 'Diseños'}
              </span>
            </div>

            {designs.length === 0 ? (
              <div className="rounded-[2px] bg-[#0C0C0E] p-10 text-center flex flex-col items-center gap-4 border border-white/10">
                <div className="w-16 h-16 rounded-[2px] bg-[#141417] flex items-center justify-center text-[#A6A29A] border border-white/15">
                  <span className="material-symbols-outlined text-[32px]">search_off</span>
                </div>
                <div className="flex flex-col gap-1.5 max-w-md">
                  <h3 className="font-display text-2xl uppercase text-[#F4F1EA] font-bold">
                    No se encontraron diseños
                  </h3>
                  <p className="text-sm text-[#A6A29A]">
                    Los diseños seleccionados pueden haber sido actualizados en el catálogo.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {designs.map((design, idx) => (
                  <article
                    key={`${design.id}-${idx}`}
                    className="group rounded-[2px] bg-[#0C0C0E] overflow-hidden border border-white/10 hover:border-[#E63946] transition-colors duration-200 flex flex-col"
                  >
                    {/* Image */}
                    <div className="w-full aspect-[4/5] bg-[#050505] overflow-hidden relative">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={design.title}
                        src={design.image}
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2 left-2 bg-[#E63946] text-[#F4F1EA] text-[10px] font-bold px-2.5 py-1 rounded-[2px] uppercase tracking-wider">
                        {design.catalogName}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col gap-2">
                      <h3 className="font-display text-lg font-bold uppercase text-[#F4F1EA] leading-tight group-hover:text-[#E63946] transition-colors">
                        {design.title}
                      </h3>
                      {design.subtitle && (
                        <p className="text-xs text-[#A6A29A]">{design.subtitle}</p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Instructions for Vendor */}
          <div className="rounded-[2px] bg-[#0C0C0E] p-6 sm:p-7 flex flex-col gap-4 border border-[#E63946]/60">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#E63946] text-[24px]">info</span>
              <span className="text-sm text-[#E63946] uppercase tracking-widest font-bold">
                Instrucciones para el Vendedor
              </span>
            </div>
            <div className="flex flex-col gap-3 text-sm text-[#A6A29A] leading-relaxed">
              <p>
                Esta vista muestra todos los diseños que el cliente ha seleccionado. Puedes usar esta pantalla para:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Verificar exactamente qué diseños quiere el cliente</li>
                <li>Tomar medidas y preparar el presupuesto final</li>
                <li>Confirmar disponibilidad de cada diseño</li>
                <li>Coordinar detalles de entrega o envío</li>
              </ul>
              <p className="text-[#E63946] font-semibold mt-2">
                💡 Guarda este link o toma un screenshot para tu registro de pedidos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
