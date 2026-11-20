'use client';

import React from 'react';
import { useCart } from '@/lib/cart-context';
import { ALL_CATALOGS, STUDIO_DATA } from '@/lib/catalog-data';


export default function HomeScreen() {
  const { setActiveScreen, setSelectedCatalogId } = useCart();

  const handleOpenCatalog = (catalogId: string) => {
    setSelectedCatalogId(catalogId);
    setActiveScreen('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full text-[#F4F1EA]">
      {/* ==========================================
          HERO SECTION: INK FLASH STUDIO
      =========================================== */}
      <section className="relative w-full overflow-hidden bg-[#050505] py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 border-b border-[#E63946]/35 max-h-[600px] sm:max-h-[550px] lg:max-h-[600px]">
        {/* Decorative Coral Red Diagonal Brand Shape on Right Edge */}
        <div className="hidden lg:block absolute top-0 right-0 w-[260px] h-full bg-[#E63946]/15 coral-slash pointer-events-none" />

        {/* Hero Background Tattoo Photography */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <img
            src="/assets/aistudio/slider_h6_1_133626f3.jpg"
            alt="Tattooed artist portrait background"
            className="w-full h-full object-cover object-[60%_center] sm:object-[65%_center] opacity-90"
            referrerPolicy="no-referrer"
          />
          {/* Gradientes optimizados para móvil - más oscuros para mejor legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 sm:via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/50 to-[#050505]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start gap-4 sm:gap-5">
          {/* Studio Specimen Label (Sharp editorial tag, no pill) */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-[2px] bg-[#0C0C0E]/80 backdrop-blur-sm border border-[#E63946]/45 text-[#F4F1EA] text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 bg-[#E63946]" />
            <span>Atelier Semipermanente Clínico · Lima, Perú</span>
          </div>

          {/* Heavy Condensed Headline with Coral Red Final Dot + Animation */}
          <div className="flex flex-col gap-4 max-w-5xl">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#F4F1EA] leading-[0.94] font-bold animate-fade-in-up text-shadow-strong">
              TATUAJES{' '}
              <span className="text-[#F4F1EA]">
                SEMIPERMANENTES<span className="text-[#E63946] animate-pulse">.</span>
              </span>
            </h1>
            <p className="font-headline text-xs sm:text-base lg:text-lg uppercase tracking-wide text-[#F4F1EA] flex items-center gap-2 font-bold pb-2 border-b border-[#E63946] w-fit animate-fade-in-up animation-delay-200 text-shadow-soft">
              <span className="material-symbols-outlined text-[16px] sm:text-[20px] text-[#E63946]">verified_user</span>
              <span className="text-[10px] sm:text-base leading-tight">DURAN 12-14 DÍAS · 100% INDOLORO</span>
            </p>
          </div>

          {/* Hero Sharp Actions (Solid Coral Red Primary) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-16 sm:pt-20 lg:pt-8 w-full sm:w-auto">
            <a
              className="w-full sm:w-auto px-8 py-4 rounded-[2px] bg-[#E63946] hover:bg-[#D62839] text-[#F4F1EA] font-bold text-sm sm:text-base uppercase tracking-wider text-center transition-colors duration-200 flex items-center justify-center gap-2"
              href="#catalogos-grid"
            >
              <span className="material-symbols-outlined text-[20px]">photo_library</span>
              <span>Ver Catálogos (+450 Diseños)</span>
            </a>
          </div>

          {/* Micro Specs Straight Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 w-full pt-3">
            <div className="p-2 sm:p-4 rounded-[2px] bg-[#0C0C0E]/90 backdrop-blur-sm border border-white/20 hover:border-[#E63946]/60 flex flex-col transition-colors duration-200 min-h-[60px] sm:min-h-[65px] justify-center">
              <span className="text-[8px] sm:text-[11px] uppercase font-semibold text-[#A6A29A] tracking-wider leading-tight mb-0.5">Fórmula Activa</span>
              <span className="font-display text-[10px] sm:text-lg lg:text-xl uppercase text-[#F4F1EA] font-bold leading-[1.1]">Genipa Americana</span>
            </div>
            <div className="p-2 sm:p-4 rounded-[2px] bg-[#0C0C0E]/90 backdrop-blur-sm border border-white/20 hover:border-[#E63946]/60 flex flex-col transition-colors duration-200 min-h-[60px] sm:min-h-[65px] justify-center">
              <span className="text-[8px] sm:text-[11px] uppercase font-semibold text-[#A6A29A] tracking-wider leading-tight mb-0.5">Desarrollo</span>
              <span className="font-display text-[10px] sm:text-lg lg:text-xl uppercase text-[#E63946] font-bold leading-[1.1]">24-36 Horas</span>
            </div>
            <div className="p-2 sm:p-4 rounded-[2px] bg-[#0C0C0E]/90 backdrop-blur-sm border border-white/20 hover:border-[#E63946]/60 flex flex-col transition-colors duration-200 min-h-[60px] sm:min-h-[65px] justify-center">
              <span className="text-[8px] sm:text-[11px] uppercase font-semibold text-[#A6A29A] tracking-wider leading-tight mb-0.5">Resistencia</span>
              <span className="font-display text-[10px] sm:text-lg lg:text-xl uppercase text-[#F4F1EA] font-bold leading-[1.1]">Agua y Sudor</span>
            </div>
            <div className="p-2 sm:p-4 rounded-[2px] bg-[#0C0C0E]/90 backdrop-blur-sm border border-white/20 hover:border-[#E63946]/60 flex flex-col transition-colors duration-200 min-h-[60px] sm:min-h-[65px] justify-center">
              <span className="text-[8px] sm:text-[11px] uppercase font-semibold text-[#A6A29A] tracking-wider leading-tight mb-0.5">Sensación</span>
              <span className="font-display text-[10px] sm:text-lg lg:text-xl uppercase text-[#E63946] font-bold leading-[1.1]">Cero Dolor</span>
            </div>
          </div>
          
        </div>
      </section>

      {/* ==========================================
          CATALOG MATRIX: 7 REAL CATALOGS
      =========================================== */}
      <section className="w-full bg-[#050505] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20 border-t border-[#E63946]/35" id="catalogos-grid">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Grid Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#E63946] px-3 py-1 rounded-[2px] bg-[#0C0C0E] border-b border-[#E63946]">
                Archivos Flash Oficiales
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#F4F1EA] mt-2 leading-[0.96]">
                LOS 7 CATÁLOGOS REALES<span className="text-[#E63946]">.</span>
              </h2>
              <p className="font-body text-[#A6A29A] text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
                Cada catálogo contiene láminas de alta resolución. Añádelos a tu orden o solicita de inmediato por WhatsApp enviando la captura del diseño que deseas.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[#A6A29A] text-xs uppercase font-semibold px-4 py-2 rounded-[2px] bg-[#0C0C0E] border border-white/10 w-fit">
              <span className="material-symbols-outlined text-[18px] text-[#E63946]">sync</span>
              <span>Plantillas listas para estarcido dérmico</span>
            </div>
          </div>

          {/* Matrix of 7 Large-Photo Straight Editorial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_CATALOGS.map((catalog) => {
              return (
                <article
                  key={catalog.id}
                  id={catalog.id}
                  onClick={() => handleOpenCatalog(catalog.id)}
                  className="group relative bg-[#0C0C0E] flex flex-col transition-all duration-300 border border-white/10 hover:border-[#E63946] cursor-pointer overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.6),0_4px_15px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.8),0_8px_25px_rgba(230,57,70,0.4)]"
                  style={{ borderRadius: '3%' }}
                >
                  {/* Image Container - Fixed aspect ratio 4:5 */}
                  <div className="relative w-full pb-[125%] overflow-hidden bg-[#050505]" style={{ borderRadius: '3% 3% 0 0' }}>
                    <img
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      alt={catalog.alt}
                      src={catalog.coverImage}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />
                    <div className="absolute bottom-3 right-3 px-3 py-1 text-xs uppercase font-bold bg-[#E63946] text-[#F4F1EA]" style={{ borderRadius: '8px' }}>
                      {catalog.badgeLabel}
                    </div>
                  </div>

                  {/* Content Container - Fixed height for consistency */}
                  <div className="flex flex-col p-6 flex-grow">
                    {/* Title - max 2 lines */}
                    <h3 className="font-display text-2xl font-bold uppercase text-[#F4F1EA] group-hover:text-[#E63946] transition-colors tracking-tight leading-tight line-clamp-2 mb-3">
                      {catalog.title}
                    </h3>
                    
                    {/* Description - max 2 lines */}
                    <p className="font-body text-[#A6A29A] text-sm leading-relaxed line-clamp-2 mb-6 flex-grow">
                      {catalog.description}
                    </p>

                    {/* Button - Always at bottom */}
                    <button
                      className="w-full px-5 py-3 bg-[#E63946] group-hover:bg-[#D62839] text-[#F4F1EA] font-bold text-xs uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCatalog(catalog.id);
                      }}
                      type="button"
                      style={{ borderRadius: '8px' }}
                    >
                      <span className="material-symbols-outlined text-[18px]">photo_library</span>
                      <span>Ver catálogo</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          CÓMO FUNCIONA: 3 PASOS TÁCTICOS
      =========================================== */}
      <section className="w-full bg-[#050505] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20 border-t border-[#E63946]/35 relative overflow-hidden" id="como-funciona">
        <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E63946] px-3 py-1 rounded-[2px] bg-[#0C0C0E] border-b border-[#E63946] w-fit">
              Protocolo Simple y Directo
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#F4F1EA] mt-3 leading-[0.96]">
              CÓMO FUNCIONA<span className="text-[#E63946]">.</span>
            </h2>
            <p className="font-body text-[#A6A29A] text-sm sm:text-base max-w-xl mt-1 leading-relaxed">
              Sin intermediarios confusos. Gestionamos tu pedido directamente desde el estudio mediante atención personal por WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Paso 1 */}
            <div className="bg-[#0C0C0E] p-7 sm:p-8 rounded-[2px] flex flex-col justify-between relative group border border-white/10 hover:border-[#E63946] transition-colors duration-200">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E63946]/40">
                  <span className="font-display text-6xl font-bold leading-none text-[#E63946]">
                    01
                  </span>
                  <div className="w-11 h-11 rounded-[2px] bg-[#121215] border border-white/10 flex items-center justify-center text-[#E63946]">
                    <span className="material-symbols-outlined text-[24px]">collections_bookmark</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-2xl font-bold uppercase text-[#F4F1EA] tracking-tight">
                    Elige tus catálogos
                  </h3>
                  <p className="font-body text-[#A6A29A] text-sm leading-relaxed">
                    Explora las colecciones por zona corporal o temática. Agrega tus favoritos a tu lista de pedido temporal con el botón de carrito.
                  </p>
                </div>
              </div>
              <div className="pt-5 mt-8 border-t border-white/10 text-[#A6A29A] text-xs font-semibold uppercase tracking-wider">
                Paso inicial · Sin registro
              </div>
            </div>

            {/* Paso 2 */}
            <div className="bg-[#0C0C0E] p-7 sm:p-8 rounded-[2px] flex flex-col justify-between relative group border border-white/10 hover:border-[#E63946] transition-colors duration-200">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E63946]/40">
                  <span className="font-display text-6xl font-bold leading-none text-[#E63946]">
                    02
                  </span>
                  <div className="w-11 h-11 rounded-[2px] bg-[#121215] border border-white/10 flex items-center justify-center text-[#E63946]">
                    <span className="material-symbols-outlined text-[24px]">photo_camera</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-2xl font-bold uppercase text-[#F4F1EA] tracking-tight">
                    Envíame la captura
                  </h3>
                  <p className="font-body text-[#A6A29A] text-sm leading-relaxed">
                    Abre el enlace directo a WhatsApp y mándame la captura del diseño exacto que más te gusta del catálogo para confirmar medidas y escala.
                  </p>
                </div>
              </div>
              <div className="pt-5 mt-8 border-t border-white/10 text-[#A6A29A] text-xs font-semibold uppercase tracking-wider">
                Atención humana inmediata
              </div>
            </div>

            {/* Paso 3 */}
            <div className="bg-[#0C0C0E] p-7 sm:p-8 rounded-[2px] flex flex-col justify-between relative group border border-white/10 hover:border-[#E63946] transition-colors duration-200">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E63946]/40">
                  <span className="font-display text-6xl font-bold leading-none text-[#E63946]">
                    03
                  </span>
                  <div className="w-11 h-11 rounded-[2px] bg-[#121215] border border-white/10 flex items-center justify-center text-[#E63946]">
                    <span className="material-symbols-outlined text-[24px]">local_shipping</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-2xl font-bold uppercase text-[#F4F1EA] tracking-tight">
                    Reserva y recibe tu tatuaje
                  </h3>
                  <p className="font-body text-[#A6A29A] text-sm leading-relaxed">
                    Coordina tu entrega en Estación del Tren Eléctrico (Lima) o con envío rápido vía Shalom a todo el Perú listo para transferir en piel.
                  </p>
                </div>
              </div>
              <div className="pt-5 mt-8 border-t border-white/10 text-[#E63946] text-xs font-bold uppercase tracking-wider">
                Garantía 12-14 días en piel
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          ENTREGAS Y RESERVA & PAGO POR YAPE
      =========================================== */}
      <section className="w-full bg-[#080809] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20 border-t border-[#E63946]/35 relative overflow-hidden" id="pagos">
        <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E63946] px-3 py-1 rounded-[2px] bg-[#0C0C0E] border-b border-[#E63946] w-fit">
              Logística y Medios de Pago
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#F4F1EA] mt-3 leading-[0.96]">
              ENTREGAS, RESERVA Y PAGOS<span className="text-[#E63946]">.</span>
            </h2>
            <p className="font-body text-[#A6A29A] text-sm sm:text-base max-w-xl mt-1 leading-relaxed">
              Facilidad de entrega presencial en Lima Metropolitana y despachos diarios blindados a nivel nacional.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Delivery Modalities (Span 7) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Modalidad A: Estación del Tren */}
              <div className="p-6 sm:p-8 rounded-[2px] bg-[#0C0C0E] flex flex-col justify-between gap-6 border border-white/10 hover:border-[#E63946]/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-[2px] bg-[#E63946] text-[#F4F1EA] shrink-0">
                    <span className="material-symbols-outlined text-[26px]">train</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-display text-2xl font-bold uppercase text-[#F4F1EA] tracking-tight">
                        Método A: Estación del Tren Eléctrico (Lima)
                      </h3>
                      <span className="px-3 py-1 rounded-[2px] bg-[#E63946] text-[#F4F1EA] text-xs uppercase font-bold">
                        Reserva con {STUDIO_DATA.trenDeposit}
                      </span>
                    </div>
                    <p className="font-body text-[#A6A29A] text-sm leading-relaxed">
                      Entregas coordinadas en las estaciones principales de la Línea 1 (Gamarra, La Cultura, Angamos, Cabitos, Villa El Salvador y estaciones céntricas).
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[#A6A29A] text-xs uppercase font-semibold">
                      <span className="material-symbols-outlined text-[16px] text-[#E63946]">schedule</span>
                      <span>{STUDIO_DATA.trenSchedule}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-[2px] bg-[#050505] text-[#A6A29A] text-xs border-l-2 border-[#E63946]">
                  <span className="text-[#F4F1EA] font-semibold">Saldo restante:</span> Se abona al momento de recibir el producto en mano en la estación elegida.
                </div>
              </div>

              {/* Modalidad B: Envío Shalom */}
              <div className="p-6 sm:p-8 rounded-[2px] bg-[#0C0C0E] flex flex-col justify-between gap-6 border border-white/10 hover:border-[#E63946]/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-[2px] bg-[#E63946] text-[#F4F1EA] shrink-0">
                    <span className="material-symbols-outlined text-[26px]">local_shipping</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-display text-2xl font-bold uppercase text-[#F4F1EA] tracking-tight">
                        Método B: Envíos por Shalom a todo el Perú
                      </h3>
                      <span className="px-3 py-1 rounded-[2px] bg-[#E63946] text-[#F4F1EA] text-xs uppercase font-bold">
                        Reserva {STUDIO_DATA.shalomDeposit}
                      </span>
                    </div>
                    <p className="font-body text-[#A6A29A] text-sm leading-relaxed">
                      Envíos a todas las agencias Shalom y Olva Courier de provincias (Arequipa, Cusco, Trujillo, Chiclayo, Huancayo, Piura, etc.) o entrega a domicilio.
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[#A6A29A] text-xs uppercase font-semibold">
                      <span className="material-symbols-outlined text-[16px] text-[#E63946]">inventory_2</span>
                      <span>Embalaje hermético anti-humedad para protección del adhesivo</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-[2px] bg-[#050505] text-[#A6A29A] text-xs border-l-2 border-[#E63946]">
                  <span className="text-[#F4F1EA] font-semibold">Envío de Clave y Guía:</span> Recibes foto del voucher de envío y código de seguimiento al despachar.
                </div>
              </div>
            </div>

            {/* Yape Module (Span 5) with subtle Coral Diagonal Ribbon */}
            <div className="lg:col-span-5 bg-[#0C0C0E] p-6 sm:p-8 rounded-[2px] flex flex-col justify-between relative overflow-hidden border border-[#E63946]/50">
              <div className="hidden sm:block absolute -top-4 -right-12 w-36 h-24 bg-[#E63946]/20 coral-slash pointer-events-none" />
              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex items-center justify-between pb-3 border-b border-[#E63946]/35">
                  <span className="px-3.5 py-1 rounded-[2px] bg-[#E63946] text-[#F4F1EA] text-xs uppercase font-bold tracking-wider">
                    Yape / Plin Oficial
                  </span>
                  <span className="text-xs uppercase text-[#A6A29A] font-semibold">Sin Comisión</span>
                </div>

                <div className="flex flex-col gap-2 p-6 rounded-[2px] bg-[#050505] border border-white/10">
                  <span className="text-xs uppercase text-[#A6A29A] tracking-wider font-semibold">
                    Número de Yape &amp; Plin:
                  </span>
                  <span className="font-display text-5xl sm:text-6xl text-[#E63946] leading-none tracking-tight font-bold tabular-nums">
                    {STUDIO_DATA.yapeNumber}
                  </span>
                  <div className="pt-4 flex items-center justify-between border-t border-white/10 mt-2">
                    <span className="text-xs text-[#A6A29A]">Titular Oficial:</span>
                    <span className="font-display text-lg text-[#F4F1EA] uppercase font-bold tracking-wide">
                      {STUDIO_DATA.yapeOwner}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 font-body text-xs sm:text-sm text-[#A6A29A]">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#E63946] text-[20px] shrink-0 mt-0.5">check_circle</span>
                    <p>Realiza tu depósito de reserva (S/ 5 para Estación del Tren o 50% para Shalom nacional).</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#E63946] text-[20px] shrink-0 mt-0.5">check_circle</span>
                    <p>Toma una captura nítida de tu pantalla con la constancia de pago.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#E63946] text-[20px] shrink-0 mt-0.5">info</span>
                    <p className="text-[#F4F1EA] font-semibold">Envía tu comprobante para confirmar tu reserva al instante.</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 relative z-10">
                <a
                  className="w-full px-6 py-4 rounded-[2px] bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs uppercase tracking-wider text-center transition-colors duration-200 flex items-center justify-center gap-2"
                  href={`https://wa.me/${STUDIO_DATA.phone}?text=Hola%20AaronInk%2C%20te%20env%C3%ADo%20mi%20comprobante%20de%20reserva%2E`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  <span>Enviar comprobante por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
