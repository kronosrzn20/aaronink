'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { STUDIO_DATA } from '@/lib/catalog-data';

export default function CheckoutScreen() {
  const { cart, removeFromCart, setActiveScreen } = useCart();
  const [clientName, setClientName] = useState('');
  const [deliveryMode, setDeliveryMode] = useState<'tren' | 'shalom'>('tren');
  const [shalomAgency, setShalomAgency] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [nameError, setNameError] = useState(false);
  const [agencyError, setAgencyError] = useState(false);
  const [generalError, setGeneralError] = useState(false);

  const isNameValid = clientName.trim().length >= 3;
  const isAgencyValid = deliveryMode === 'tren' || shalomAgency.trim().length >= 3;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    if (!isNameValid) {
      setNameError(true);
      valid = false;
    } else {
      setNameError(false);
    }

    if (deliveryMode === 'shalom' && !isAgencyValid) {
      setAgencyError(true);
      valid = false;
    } else {
      setAgencyError(false);
    }

    if (!valid) {
      setGeneralError(true);
      return;
    }

    setGeneralError(false);

    const deliveryText =
      deliveryMode === 'tren'
        ? `Estacion del Tren (Lima) - Reserva ${STUDIO_DATA.trenDeposit}`
        : `Envio por Shalom (todo el Peru) - Reserva ${STUDIO_DATA.shalomDeposit}`;

    // Crear objeto con datos de la orden
    const orderData = {
      items: cart.map((item) => item.id),
      clientName: clientName.trim(),
      deliveryMode: deliveryMode,
      agency: deliveryMode === 'shalom' ? shalomAgency.trim() : undefined,
      notes: orderNotes.trim() || undefined,
    };

    // Codificar en base64
    const orderJson = JSON.stringify(orderData);
    const orderBase64 = btoa(orderJson);

    // Generar URL de la orden (funciona tanto en local como en Vercel)
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const orderUrl = `${baseUrl}?order=${orderBase64}`;

    // Crear lista simple de diseños
    const catalogListString =
      cart.length > 0
        ? cart.map((c, idx) => `${idx + 1}. ${c.title}`).join('\n')
        : '(Consulta general de catalogo)';

    let message = `Hola! 👋 Quiero consultar sobre estos tatuajes semipermanentes:\n\n`;
    message += `*Mi nombre:* ${clientName.trim()}\n`;
    message += `*Entrega:* ${deliveryText}\n`;

    if (deliveryMode === 'shalom' && shalomAgency.trim()) {
      message += `*Ciudad/Agencia:* ${shalomAgency.trim()}\n`;
    }

    message += `\n*Diseños que me interesan:*\n${catalogListString}\n`;

    if (orderNotes.trim()) {
      message += `\n*Consulta:*\n${orderNotes.trim()}\n`;
    }

    message += `\n📸 *Aqui puedes ver las fotos de los diseños:*\n`;
    message += `${orderUrl}\n\n`;
    message += `Espero tu respuesta para coordinar! 😊`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${STUDIO_DATA.phone}?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="flex flex-col w-full text-[#F4F1EA]">
      {/* Top Archival Status Banner */}
      <section className="w-full bg-[#050505] px-4 sm:px-6 lg:px-8 py-3.5 border-b border-[#E63946]/35">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-widest text-[#A6A29A]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E63946]" />
            <span className="text-[#F4F1EA] font-bold">Mesa de Reservas Directa</span>
            <span className="text-[#7C7870]">/</span>
            <span className="text-[#E63946] font-bold">Sin formularios bancarios complejos</span>
          </div>
          <div className="flex items-center gap-2 text-[#A6A29A]">
            <span>Fórmula Orgánica 12-14 Días</span>
            <span>•</span>
            <span>Lima &amp; Provincias</span>
          </div>
        </div>
      </section>

      {/* Main Atelier Checkout Workspace */}
      <section className="w-full bg-[#050505] px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Headline Block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 rounded-[2px] bg-[#0C0C0E] p-6 sm:p-9 border border-white/10 border-b border-b-[#E63946]/45">
            <div className="flex flex-col gap-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-[#050505] border-b border-[#E63946] w-fit text-[#E63946] text-xs uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-[18px]">ink_pen</span>
                <span>AaronInk Flash Session</span>
                <span className="text-[#A6A29A]">#CONFIRM-ORDER</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase text-[#F4F1EA] tracking-tight leading-[0.96] font-bold">
                Tu Pedido de Tatuajes Semipermanentes<span className="text-[#E63946]">.</span>
              </h1>
              <p className="text-sm sm:text-base text-[#A6A29A] leading-relaxed">
                Fórmula botánica con fidelidad de 12 a 14 días en piel. Cero agujas, máxima definición.{' '}
                <span className="text-[#F4F1EA] font-semibold">
                  Sin pagos automáticos con tarjeta ni registros extensos.
                </span>{' '}
                Coordinamos los detalles y modelos exactos directamente a tu WhatsApp personal.
              </p>
            </div>
            <div className="rounded-[2px] bg-[#050505] p-5 flex flex-col gap-1.5 min-w-[240px] border border-[#E63946]/45">
              <span className="text-xs text-[#E63946] uppercase tracking-widest font-bold">
                Garantía de Atención
              </span>
              <div className="flex items-center gap-2 text-[#E63946]">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span className="font-display text-xl font-bold uppercase text-[#F4F1EA] tracking-wide">
                  Reserva Asistida
                </span>
              </div>
              <span className="text-xs text-[#A6A29A]">
                {STUDIO_DATA.yapeOwner} te responderá en menos de 10 min.
              </span>
            </div>
          </div>

          {/* Main Layout Columns: Flash Sheets List + WhatsApp Booking Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Selected Flash Catalogs (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center justify-between rounded-[2px] bg-[#0C0C0E] px-6 py-4 border border-white/10 border-b border-b-[#E63946]/45 shadow-[0_6px_25px_rgba(0,0,0,0.5),0_3px_12px_rgba(0,0,0,0.3)]">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#E63946] text-[20px]">layers</span>
                  <h2 className="font-display text-xl font-bold uppercase text-[#F4F1EA] tracking-wide">
                    Catálogos Seleccionados
                  </h2>
                </div>
                <span className="text-xs bg-[#E63946] text-[#F4F1EA] px-3.5 py-1 rounded-[2px] uppercase tracking-wider font-bold tabular-nums">
                  {cart.length} {cart.length === 1 ? 'Colección' : 'Colecciones'}
                </span>
              </div>

              {/* Empty State */}
              {cart.length === 0 ? (
                <div className="rounded-[2px] bg-[#0C0C0E] p-10 text-center flex flex-col items-center gap-4 border border-white/10">
                  <div className="w-16 h-16 rounded-[2px] bg-[#141417] flex items-center justify-center text-[#A6A29A] border border-white/15">
                    <span className="material-symbols-outlined text-[32px]">remove_shopping_cart</span>
                  </div>
                  <div className="flex flex-col gap-1.5 max-w-md">
                    <h3 className="font-display text-3xl uppercase text-[#F4F1EA] font-bold">
                      Tu pedido está vacío
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A6A29A] leading-relaxed">
                      Selecciona catálogos desde la galería para coordinar tu envío o entrega por WhatsApp.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveScreen('home')}
                    className="bg-[#E63946] hover:bg-[#D62839] text-[#F4F1EA] text-xs uppercase tracking-wider px-7 py-3.5 rounded-[2px] font-bold transition-colors duration-200 cursor-pointer mt-1"
                    type="button"
                  >
                    Volver al Catálogo General
                  </button>
                </div>
              ) : (
                /* Catalog List Container */
                <div className="flex flex-col gap-4">
                  {cart.map((item) => (
                    <article
                      key={item.id}
                      className="group rounded-[2px] bg-[#0C0C0E] hover:bg-[#121215] transition-all duration-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden border border-white/10 hover:border-[#E63946] shadow-[0_8px_30px_rgba(0,0,0,0.6),0_4px_15px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.8),0_8px_25px_rgba(230,57,70,0.3)]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-28 sm:w-28 sm:h-28 rounded-[2px] bg-[#050505] overflow-hidden flex-shrink-0 relative border border-white/15">
                          {item.image ? (
                            <img
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                              alt={item.title}
                              src={item.image}
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#121215] flex items-center justify-center">
                              <span className="material-symbols-outlined text-[#E63946] text-[28px]">bookmark</span>
                            </div>
                          )}
                          <span className="absolute bottom-1.5 left-1.5 bg-[#050505]/95 text-[#E63946] text-[10px] font-bold px-2 py-0.5 rounded-[2px] border-l-2 border-[#E63946]">
                            FLASH
                          </span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[11px] text-[#E63946] uppercase tracking-widest font-bold">
                            Láminas Calibradas
                          </span>
                          <h3 className="font-display text-2xl font-bold uppercase text-[#F4F1EA] group-hover:text-[#E63946] transition-colors leading-none">
                            {item.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#A6A29A] mt-1">
                            <span className="bg-[#141417] px-2.5 py-0.5 rounded-[2px] text-[#F4F1EA] font-semibold text-[11px] border border-white/10">
                              {item.subtitle || `${item.count || 30}+ Diseños`}
                            </span>
                            <span>•</span>
                            <span>Escala Real</span>
                            <span>•</span>
                            <span className="text-[#E63946] font-bold">12-14 Días</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2.5">
                        <span className="text-xs text-[#A6A29A] uppercase tracking-wider font-medium">
                          Catálogo Activo
                        </span>
                        <button
                          aria-label={`Quitar ${item.title}`}
                          className="text-[#F4F1EA] hover:bg-[#E63946] px-4 py-2 rounded-[2px] text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-200 cursor-pointer border border-white/15 hover:border-[#E63946] font-bold"
                          onClick={() => removeFromCart(item.id)}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                          <span>Quitar</span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Catalog Navigation / Add More */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[2px] bg-[#0C0C0E] p-5 border border-white/10">
                <button
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#161619] hover:bg-[#222227] text-[#F4F1EA] text-xs uppercase tracking-wider px-6 py-3.5 rounded-[2px] font-bold transition-colors duration-200 cursor-pointer border border-white/15 hover:border-[#E63946]"
                  onClick={() => setActiveScreen('home')}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#E63946]">add_circle</span>
                  <span>Explorar Más Catálogos (+)</span>
                </button>
                <div className="flex items-center gap-2 text-[#A6A29A] text-xs uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[#E63946] text-[18px]">verified_user</span>
                  <span>Plantillas hipoalergénicas testeadas</span>
                </div>
              </div>

              {/* Visual Process Micro Infographic */}
              <div className="rounded-[2px] bg-[#0C0C0E] p-6 sm:p-7 flex flex-col gap-4 border border-[#E63946]/60">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#E63946] text-[24px]">info</span>
                  <span className="text-sm text-[#E63946] uppercase tracking-widest font-bold">
                    Como funciona el proceso
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-[2px] bg-[#050505] p-5 flex flex-col gap-2 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 rounded-full bg-[#E63946] text-[#F4F1EA] text-xs font-bold flex items-center justify-center">1</span>
                      <span className="text-[#E63946] font-bold text-xs uppercase tracking-wider">Envias mensaje</span>
                    </div>
                    <span className="font-display text-base text-[#F4F1EA] font-bold uppercase">Con tus datos</span>
                    <span className="text-xs text-[#A6A29A] leading-relaxed">
                      Se abre WhatsApp con mensaje pre-cargado incluyendo un enlace. Solo presiona enviar.
                    </span>
                  </div>
                  <div className="rounded-[2px] bg-[#050505] p-5 flex flex-col gap-2 border border-[#E63946]/60">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 rounded-full bg-[#E63946] text-[#F4F1EA] text-xs font-bold flex items-center justify-center">2</span>
                      <span className="text-[#E63946] font-bold text-xs uppercase tracking-wider">Revisamos enlace</span>
                    </div>
                    <span className="font-display text-base text-[#F4F1EA] font-bold uppercase">Vemos tus diseños</span>
                    <span className="text-xs text-[#A6A29A] leading-relaxed">
                      Hacemos clic en el enlace y vemos EXACTAMENTE los diseños que seleccionaste con fotos.
                    </span>
                  </div>
                  <div className="rounded-[2px] bg-[#050505] p-5 flex flex-col gap-2 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 rounded-full bg-[#E63946] text-[#F4F1EA] text-xs font-bold flex items-center justify-center">3</span>
                      <span className="text-[#E63946] font-bold text-xs uppercase tracking-wider">Coordinamos</span>
                    </div>
                    <span className="font-display text-base text-[#F4F1EA] font-bold uppercase">Medidas y reserva</span>
                    <span className="text-xs text-[#A6A29A] leading-relaxed">
                      Confirmamos medidas, agendamos entrega y envias seña por Yape.
                    </span>
                  </div>
                </div>
                
                {/* Nota importante */}
                <div className="rounded-[2px] bg-[#E63946]/10 border-l-4 border-[#E63946] p-4 flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#E63946] text-[20px] shrink-0 mt-0.5">link</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold uppercase text-[#E63946] tracking-wider">NUEVO: MAS FACIL!</span>
                    <span className="text-xs text-[#F4F1EA] leading-relaxed">
                      El mensaje de WhatsApp incluye un <strong>enlace clickeable</strong> donde el vendedor puede ver TODAS las fotos de los diseños que seleccionaste. Ya no necesitas enviar capturas de pantalla manualmente!
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Reservation Form & WhatsApp Trigger (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="rounded-[2px] bg-[#0C0C0E] p-6 sm:p-8 flex flex-col gap-6 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6),0_5px_20px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between pb-4 border-b border-[#E63946]/40">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#E63946] text-[24px]">assignment_turned_in</span>
                    <h2 className="font-display text-2xl font-bold uppercase text-[#F4F1EA] tracking-wide">
                      Datos de Reserva
                    </h2>
                  </div>
                  <span className="text-xs text-[#F4F1EA] uppercase tracking-widest font-bold px-3 py-1 rounded-[2px] bg-[#161619] border border-white/10">
                    Paso Final
                  </span>
                </div>

                {/* Form Body */}
                <form className="flex flex-col gap-5" onSubmit={handleOrderSubmit}>
                  {/* Input: Full Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-[#F4F1EA] font-semibold flex items-center justify-between" htmlFor="client-name">
                      <span>Tu Nombre Completo <span className="text-[#E63946] font-bold">*</span></span>
                      <span className="text-[#7C7870] text-[11px] font-normal lowercase">
                        {isNameValid ? 'Correcto' : 'Requerido'}
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="client-name"
                        type="text"
                        value={clientName}
                        onChange={(e) => {
                          setClientName(e.target.value);
                          if (e.target.value.trim().length >= 3) setNameError(false);
                        }}
                        placeholder="Ej. Samir Coronado Vargas"
                        className={`w-full rounded-[2px] bg-[#050505] text-[#F4F1EA] text-sm px-4 py-3.5 outline-none placeholder:text-[#7C7870] transition-all border shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)] ${
                          nameError ? 'border-[#E63946] bg-[#E63946]/10' : 'border-white/15 focus:border-[#E63946] focus:shadow-[inset_0_2px_6px_rgba(0,0,0,0.2),0_0_0_3px_rgba(230,57,70,0.1)]'
                        }`}
                        required
                      />
                      {isNameValid && (
                        <span className="absolute right-4 top-3.5 material-symbols-outlined text-[#E63946] text-[20px]">
                          check
                        </span>
                      )}
                    </div>
                    {nameError && (
                      <p className="text-xs text-[#E63946] flex items-center gap-1 pt-0.5 font-semibold">
                        <span className="material-symbols-outlined text-[14px]">error</span>
                        <span>Por favor ingresa tu nombre y apellido para el registro de tu pedido.</span>
                      </p>
                    )}
                  </div>

                  {/* Selector: Delivery Mode */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs uppercase tracking-wider text-[#F4F1EA] font-semibold">
                      Modalidad de Entrega / Envío <span className="text-[#E63946] font-bold">*</span>
                    </label>
                    <div className="flex flex-col gap-3">
                      {/* Option 1: Tren Eléctrico */}
                      <label
                        onClick={() => setDeliveryMode('tren')}
                        className={`cursor-pointer p-4 rounded-[2px] transition-colors duration-200 flex items-start gap-3 border ${
                          deliveryMode === 'tren'
                            ? 'border-[#E63946] bg-[#E63946]/10'
                            : 'border-white/10 bg-[#050505] hover:bg-[#121215]'
                        }`}
                      >
                        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className={`material-symbols-outlined text-[20px] ${deliveryMode === 'tren' ? 'text-[#E63946]' : 'text-[#7C7870]'}`}>
                            {deliveryMode === 'tren' ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1.5 w-full">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="font-display text-lg font-bold uppercase text-[#F4F1EA]">
                              Estación del Tren (Lima)
                            </span>
                            <span className="bg-[#E63946] text-[#F4F1EA] text-xs px-3 py-0.5 rounded-[2px] uppercase tracking-wider font-bold">
                              Reserva S/ 5
                            </span>
                          </div>
                          <p className="text-xs text-[#A6A29A] leading-relaxed">
                            Entregas presenciales de Lunes a Sábado de{' '}
                            <span className="text-[#F4F1EA] font-semibold">4:00 p.m. a 7:00 p.m.</span> en cualquier estación de la Línea 1.
                          </p>
                        </div>
                      </label>

                      {/* Option 2: Shalom Nacional */}
                      <label
                        onClick={() => setDeliveryMode('shalom')}
                        className={`cursor-pointer p-4 rounded-[2px] transition-colors duration-200 flex items-start gap-3 border ${
                          deliveryMode === 'shalom'
                            ? 'border-[#E63946] bg-[#E63946]/10'
                            : 'border-white/10 bg-[#050505] hover:bg-[#121215]'
                        }`}
                      >
                        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className={`material-symbols-outlined text-[20px] ${deliveryMode === 'shalom' ? 'text-[#E63946]' : 'text-[#7C7870]'}`}>
                            {deliveryMode === 'shalom' ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1.5 w-full">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="font-display text-lg font-bold uppercase text-[#F4F1EA]">
                              Envío por Shalom (Todo el Perú)
                            </span>
                            <span className="bg-[#E63946] text-[#F4F1EA] text-xs px-3 py-0.5 rounded-[2px] uppercase tracking-wider font-bold">
                              50% Adelanto
                            </span>
                          </div>
                          <p className="text-xs text-[#A6A29A] leading-relaxed">
                            Despacho express a agencias Shalom en todo el territorio nacional con código de rastreo.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Conditional Field: Shalom Agency / City */}
                  {deliveryMode === 'shalom' && (
                    <div className="flex flex-col gap-2 rounded-[2px] bg-[#050505] p-4 border border-[#E63946]">
                      <label className="text-xs uppercase tracking-wider text-[#F4F1EA] font-semibold flex items-center justify-between" htmlFor="shalom-agency">
                        <span>Ciudad o Agencia Shalom de Destino <span className="text-[#E63946] font-bold">*</span></span>
                        <span className="text-xs text-[#E63946] uppercase font-bold">Obligatorio</span>
                      </label>
                      <input
                        id="shalom-agency"
                        type="text"
                        value={shalomAgency}
                        onChange={(e) => {
                          setShalomAgency(e.target.value);
                          if (e.target.value.trim().length >= 3) setAgencyError(false);
                        }}
                        placeholder="Ej. Chiclayo - Agencia Central Av. Bolognesi"
                        className={`w-full rounded-[2px] bg-[#0C0C0E] text-[#F4F1EA] text-sm px-4 py-3 outline-none placeholder:text-[#7C7870] transition-all border shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)] ${
                          agencyError ? 'border-[#E63946] bg-[#E63946]/10' : 'border-white/15 focus:border-[#E63946] focus:shadow-[inset_0_2px_6px_rgba(0,0,0,0.2),0_0_0_3px_rgba(230,57,70,0.1)]'
                        }`}
                      />
                      {agencyError && (
                        <p className="text-xs text-[#E63946] flex items-center gap-1 font-semibold">
                          <span className="material-symbols-outlined text-[14px]">error</span>
                          <span>Escribe tu ciudad o agencia Shalom para preparar la guía de despacho.</span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Input: Optional Comments */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-[#F4F1EA] font-semibold flex items-center justify-between" htmlFor="order-notes">
                      <span>Comentarios o Consultas sobre tus Diseños</span>
                      <span className="text-[#7C7870] text-xs uppercase font-normal">Opcional</span>
                    </label>
                    <textarea
                      id="order-notes"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="Ej. Quiero saber las medidas exactas del dragón del catálogo de brazo o pedir un tamaño específico..."
                      rows={2}
                      className="w-full rounded-[2px] bg-[#050505] text-[#F4F1EA] text-sm px-4 py-3.5 outline-none placeholder:text-[#7C7870] transition-all resize-none border border-white/15 focus:border-[#E63946] shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)] focus:shadow-[inset_0_2px_6px_rgba(0,0,0,0.2),0_0_0_3px_rgba(230,57,70,0.1)]"
                    />
                  </div>

                  {/* Global Form Validation Alert Box */}
                  {generalError && (
                    <div className="rounded-[2px] bg-[#E63946]/15 text-[#F4F1EA] p-4 flex items-start gap-2.5 border border-[#E63946]">
                      <span className="material-symbols-outlined text-[20px] flex-shrink-0 text-[#E63946]">warning</span>
                      <span className="text-xs uppercase tracking-wide font-bold">
                        Completa los campos obligatorios antes de enviar tu WhatsApp.
                      </span>
                    </div>
                  )}

                  {/* GIANT PRIMARY WHATSAPP ACTION BUTTON (Green strictly for WhatsApp) */}
                  <button
                    className="w-full min-h-[58px] rounded-[2px] bg-[#16A34A] hover:bg-[#15803D] text-white font-display text-xl sm:text-2xl uppercase tracking-wider px-6 py-4 flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer text-center shadow-[0_10px_40px_rgba(22,163,74,0.6),0_5px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_60px_rgba(22,163,74,0.8),0_8px_30px_rgba(22,163,74,0.4)]"
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-[28px]">send</span>
                    <span className="font-bold">ENVIAR SOLICITUD</span>
                  </button>

                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-[#A6A29A] text-xs">
                      <span className="material-symbols-outlined text-[#16A34A] text-[16px]">check_circle</span>
                      <span>Se abrirá WhatsApp con tu mensaje y enlace a tus diseños</span>
                    </div>
                    <div className="rounded-[2px] bg-[#16A34A]/10 border border-[#16A34A]/30 px-4 py-2.5">
                      <span className="text-xs text-[#F4F1EA] font-semibold">
                        💡 El vendedor hará clic en el enlace y verá todas las fotos de tus diseños automáticamente
                      </span>
                    </div>
                  </div>
                </form>
              </div>

              {/* YAPE PAYMENT DETAILS & CONFIRMATION CARD */}
              <div className="rounded-[2px] bg-[#0C0C0E] p-6 sm:p-8 flex flex-col gap-6 border border-[#E63946]/50 relative overflow-hidden">
                <div className="hidden sm:block absolute -top-4 -right-12 w-32 h-20 bg-[#E63946]/20 coral-slash pointer-events-none" />
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#E63946]/35 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-[2px] bg-[#E63946] flex items-center justify-center text-[#F4F1EA]">
                      <span className="material-symbols-outlined text-[22px]">qr_code_2</span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#F4F1EA] tracking-wide">
                      Datos de Yape para tu Reserva
                    </h3>
                  </div>
                  <span className="bg-[#E63946] text-[#F4F1EA] text-xs px-3 py-1 rounded-[2px] uppercase font-bold tracking-wider shrink-0">
                    Titular Verificado
                  </span>
                </div>

                {/* Numbers Card */}
                <div className="rounded-[2px] bg-[#050505] p-6 flex flex-col gap-4 border border-white/10 relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-[#A6A29A] uppercase tracking-wider font-medium">
                        Número Oficial Yape / Plin
                      </span>
                      <span className="font-display text-4xl sm:text-5xl text-[#E63946] tracking-wider font-bold mt-1 tabular-nums">
                        {STUDIO_DATA.yapeNumber}
                      </span>
                    </div>
                    <div className="flex flex-col sm:text-right">
                      <span className="text-xs text-[#A6A29A] uppercase tracking-wider font-medium">
                        Titular de la Cuenta
                      </span>
                      <span className="font-display text-xl text-[#F4F1EA] uppercase font-bold mt-1">
                        {STUDIO_DATA.yapeOwner}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-[2px] bg-[#121215] p-4 flex items-center gap-2.5 border-l-2 border-[#E63946]">
                    <span className="material-symbols-outlined text-[#E63946] text-[18px] flex-shrink-0">check</span>
                    <p className="text-xs text-[#F4F1EA] font-semibold uppercase tracking-wide">
                      NO es necesario copiar nada engorroso, solo transfiere desde tu app Yape o Plin al número indicado.
                    </p>
                  </div>
                </div>

                {/* Secondary WhatsApp Voucher Button (Green strictly for WhatsApp) */}
                <div className="flex flex-col gap-2.5 relative z-10">
                  <p className="text-xs text-[#A6A29A]">
                    ¿Ya realizaste tu transferencia o adelanto? Envía tu comprobante para confirmar tu reserva al instante:
                  </p>
                  <a
                    className="w-full min-h-[50px] rounded-[2px] bg-[#16A34A] hover:bg-[#15803D] text-white text-xs uppercase tracking-wider px-5 py-3.5 flex items-center justify-center gap-2 transition-colors duration-200 font-bold"
                    href={`https://wa.me/${STUDIO_DATA.phone}?text=Hola%20AaronInk,%20te%20env%C3%ADo%20mi%20comprobante%20de%20reserva.`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                    <span>Enviar Comprobante por WhatsApp</span>
                  </a>
                </div>

                {/* Security Footnote */}
                <div className="flex items-center gap-1.5 text-[#7C7870] text-xs relative z-10">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  <span>Comprobantes procesados y validados manualmente para tu total tranquilidad.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
