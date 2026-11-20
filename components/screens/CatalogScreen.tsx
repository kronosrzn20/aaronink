'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { ALL_CATALOGS, STUDIO_DATA, FlashDesign } from '@/lib/catalog-data';
import LightboxModal from '@/components/LightboxModal';

export default function CatalogScreen() {
  const {
    addToCart,
    setActiveScreen,
    selectedCatalogId,
    setSelectedCatalogId,
    cart,
  } = useCart();

  const [activeFilter, setActiveFilter] = useState<'all' | 'oriental' | 'chicano' | 'geometric' | 'nordic' | 'biomech'>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Find active catalog or fallback to Brazo Completo
  const currentCatalog =
    ALL_CATALOGS.find((c) => c.id === selectedCatalogId) || ALL_CATALOGS[1];

  const designs = currentCatalog.designs;
  const filteredDesigns =
    activeFilter === 'all'
      ? designs
      : designs.filter((d) => d.category === activeFilter);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleAddCatalog = () => {
    addToCart({
      id: currentCatalog.id,
      title: currentCatalog.title,
      count: currentCatalog.designsCount,
      subtitle: currentCatalog.subtitle,
      image: currentCatalog.coverImage,
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleQuickWhatsAppSingle = (e: React.MouseEvent, design: FlashDesign) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hola AaronInk, me interesa el diseño ${design.code} (${design.title}) del catálogo de ${currentCatalog.title}.`
    );
    window.open(`https://wa.me/${STUDIO_DATA.phone}?text=${text}`, '_blank');
  };

  const handleAddDesignToCart = (e: React.MouseEvent, design: FlashDesign) => {
    e.stopPropagation();
    addToCart({
      id: design.id,
      title: design.title,
      subtitle: design.categoryLabel,
      image: design.image,
    });
  };

  return (
    <div className="flex flex-col w-full text-[#F4F1EA]">
      {/* Hero Image Banner - Cover Image del Catálogo */}
      <section className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
        <img
          src={currentCatalog.coverImage}
          alt={currentCatalog.alt}
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay gradient para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        
        {/* Badge y título sobre la imagen */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#E63946] text-[#F4F1EA] text-xs font-bold uppercase tracking-wider mb-3">
              <span className="material-symbols-outlined text-[16px]">collections_bookmark</span>
              <span>{currentCatalog.badgeLabel}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#F4F1EA] leading-none">
              {currentCatalog.title}<span className="text-[#E63946]">.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Top Specimen Header */}
      <section className="relative w-full bg-[#050505] px-4 sm:px-6 lg:px-8 py-10 md:py-12 overflow-hidden border-b border-[#E63946]/35">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-7">
          {/* Breadcrumb & Catalog Switcher Dropdown */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A6A29A] font-medium">
              <button
                onClick={() => setActiveScreen('home')}
                className="hover:text-[#E63946] transition-colors cursor-pointer"
              >
                Inicio
              </button>
              <span className="text-[#7C7870]">/</span>
              <button
                onClick={() => setActiveScreen('home')}
                className="hover:text-[#E63946] transition-colors cursor-pointer"
              >
                Catálogos
              </button>
              <span className="text-[#7C7870]">/</span>
              <span className="text-[#F4F1EA] font-bold">{currentCatalog.title}</span>
            </nav>

            {/* Rapid Switcher for All 7 Real Catalogs */}
            <div className="relative inline-flex items-center bg-[#0C0C0E] rounded-[2px] px-4 py-2.5 gap-2.5 border border-[#E63946]/45 w-full sm:w-auto">
              <span className="material-symbols-outlined text-[#E63946] text-[18px] shrink-0">folder_open</span>
              <label className="sr-only" htmlFor="catalogSwitcher">
                Cambiar de catálogo
              </label>
              <select
                id="catalogSwitcher"
                value={currentCatalog.id}
                onChange={(e) => setSelectedCatalogId(e.target.value)}
                className="bg-transparent text-xs uppercase tracking-wider text-[#F4F1EA] font-bold focus:outline-none cursor-pointer pr-4 w-full sm:w-auto"
              >
                {ALL_CATALOGS.map((cat, idx) => (
                  <option key={cat.id} value={cat.id} className="bg-[#0C0C0E] text-[#F4F1EA]">
                    0{idx + 1}. {cat.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <p className="font-body text-sm sm:text-base text-[#A6A29A] max-w-3xl leading-relaxed">
            {currentCatalog.description}
          </p>

          {/* Spec Tags Row */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-[2px] bg-[#0C0C0E] text-[#F4F1EA] text-xs uppercase tracking-wider font-semibold border border-[#E63946]/45 min-h-[44px]">
              <span className="material-symbols-outlined text-[16px] text-[#E63946]">timer</span>
              <span>Duración: 12-14 Días</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-[2px] bg-[#0C0C0E] text-[#F4F1EA] text-xs uppercase tracking-wider font-semibold border border-white/10 min-h-[44px]">
              <span className="material-symbols-outlined text-[16px] text-[#E63946]">view_quilt</span>
              <span>{currentCatalog.designsCount} Diseños</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-[2px] bg-[#0C0C0E] text-[#F4F1EA] text-xs uppercase tracking-wider font-semibold border border-white/10 min-h-[44px]">
              <span className="material-symbols-outlined text-[16px] text-[#E63946]">water_drop</span>
              <span>Resistente al Agua</span>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Gallery Filter Tabs */}
      <section className="w-full bg-[#050505]/95 px-4 sm:px-6 lg:px-8 py-4 border-b border-[#E63946]/35 sticky top-28 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            {[
              { id: 'all', label: `Todos (${designs.length})` },
              { id: 'oriental', label: 'Oriental' },
              { id: 'chicano', label: 'Chicano' },
              { id: 'geometric', label: 'Geometría' },
              { id: 'nordic', label: 'Nórdico' },
              { id: 'biomech', label: 'Biomecánico' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                className={`text-xs uppercase tracking-wider px-4 py-2.5 transition-all duration-200 cursor-pointer font-bold whitespace-nowrap shrink-0 border min-h-[44px] ${
                  activeFilter === tab.id
                    ? 'bg-[#E63946] text-[#F4F1EA] border-[#E63946] shadow-lg shadow-[#E63946]/30'
                    : 'bg-[#0C0C0E] hover:bg-[#161619] text-[#A6A29A] hover:text-[#F4F1EA] border-white/10 hover:border-[#E63946]/50 shadow-md'
                }`}
                type="button"
                style={{ borderRadius: '10px' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MASONRY GALLERY SECTION */}
      <section className="w-full bg-[#050505] px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance] space-y-6">
            {filteredDesigns.map((design, idx) => {
              const originalIndex = designs.findIndex((d) => d.id === design.id);

              return (
                <div
                  key={design.id}
                  className="break-inside-avoid group relative bg-[#0C0C0E] transition-all duration-200 overflow-hidden border border-white/10 hover:border-[#E63946] p-3 shadow-[0_8px_30px_rgba(0,0,0,0.6),0_4px_15px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.8),0_8px_25px_rgba(230,57,70,0.4)]"
                  style={{ borderRadius: '3%' }}
                >
                  <div
                    className="relative overflow-hidden bg-[#050505] cursor-pointer"
                    onClick={() => handleOpenLightbox(originalIndex >= 0 ? originalIndex : idx)}
                    style={{ borderRadius: '2%' }}
                  >
                    <img
                      className="w-full min-h-[260px] h-auto object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      alt={design.alt}
                      src={design.image}
                      referrerPolicy="no-referrer"
                    />

                    {/* Overlay Action Buttons - Always visible on mobile/tablet, hover on desktop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3 gap-2">
                      <button
                        className="w-full bg-[#E63946] hover:bg-[#D62839] text-[#F4F1EA] text-xs font-bold uppercase tracking-wider py-2.5 flex items-center justify-center gap-2 cursor-pointer transition-colors min-h-[44px]"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenLightbox(originalIndex >= 0 ? originalIndex : idx);
                        }}
                        type="button"
                        style={{ borderRadius: '8px' }}
                      >
                        <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                        <span className="hidden sm:inline">Ver Completo</span>
                        <span className="sm:hidden">Ver</span>
                      </button>
                      <button
                        className="w-full bg-[#F4F1EA] hover:bg-white text-[#050505] text-xs font-bold uppercase tracking-wider py-2.5 flex items-center justify-center gap-2 cursor-pointer transition-colors min-h-[44px]"
                        onClick={(e) => handleAddDesignToCart(e, design)}
                        type="button"
                        style={{ borderRadius: '8px' }}
                      >
                        <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                        <span className="hidden sm:inline">Al Carrito</span>
                        <span className="sm:hidden">Carrito</span>
                      </button>
                      <button
                        className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold uppercase tracking-wider py-2.5 flex items-center justify-center gap-2 cursor-pointer transition-colors min-h-[44px]"
                        onClick={(e) => handleQuickWhatsAppSingle(e, design)}
                        type="button"
                        style={{ borderRadius: '8px' }}
                      >
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                        <span className="hidden sm:inline">WhatsApp</span>
                        <span className="sm:hidden">Pedir</span>
                      </button>
                    </div>
                  </div>

                  <div className="px-1 pt-4 pb-1 flex flex-col gap-1.5 border-t border-white/10 mt-3">
                    <span className="font-display text-xl font-bold uppercase text-[#F4F1EA] leading-tight tracking-wide group-hover:text-[#E63946] transition-colors">
                      {design.title}
                    </span>
                    <div className="flex items-center justify-between text-xs text-[#A6A29A] uppercase tracking-wider pt-0.5">
                      <span>{design.categoryLabel}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* APPLICATION PROTOCOL & INK SCIENCE STRIP */}
      <section className="w-full bg-[#050505] px-4 sm:px-6 lg:px-8 py-16 border-t border-[#E63946]/35">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 rounded-[2px] bg-[#0C0C0E] flex flex-col gap-2.5 border border-white/10 hover:border-[#E63946] transition-colors">
            <span className="font-display text-5xl text-[#E63946] font-bold pb-2 border-b border-[#E63946]/40 w-fit">01</span>
            <span className="font-display text-xl font-bold uppercase text-[#F4F1EA] tracking-wide mt-1">Colocación 90 Seg</span>
            <p className="text-xs sm:text-sm text-[#A6A29A] leading-relaxed">
              Limpia la zona con alcohol, posiciona la lámina transfer y presiona uniformemente con un paño húmedo durante 90 segundos.
            </p>
          </div>
          <div className="p-7 rounded-[2px] bg-[#0C0C0E] flex flex-col gap-2.5 border border-white/10 hover:border-[#E63946] transition-colors">
            <span className="font-display text-5xl text-[#E63946] font-bold pb-2 border-b border-[#E63946]/40 w-fit">02</span>
            <span className="font-display text-xl font-bold uppercase text-[#F4F1EA] tracking-wide mt-1">Oxidación Jagua</span>
            <p className="text-xs sm:text-sm text-[#A6A29A] leading-relaxed">
              El color inicial es translúcido. Reacciona con la queratina de la piel y alcanza máxima oscuridad en 24 a 36 horas.
            </p>
          </div>
          <div className="p-7 rounded-[2px] bg-[#0C0C0E] flex flex-col gap-2.5 border border-white/10 hover:border-[#E63946] transition-colors">
            <span className="font-display text-5xl text-[#E63946] font-bold pb-2 border-b border-[#E63946]/40 w-fit">03</span>
            <span className="font-display text-xl font-bold uppercase text-[#F4F1EA] tracking-wide mt-1">12 a 14 Días</span>
            <p className="text-xs sm:text-sm text-[#A6A29A] leading-relaxed">
              Sin brillo plástico. Luce como un tatuaje real con aguja bajo la dermis superficial, resistente a ducha y sudor.
            </p>
          </div>
          <div className="p-7 rounded-[2px] bg-[#0C0C0E] flex flex-col gap-2.5 border border-white/10 hover:border-[#E63946] transition-colors">
            <span className="font-display text-5xl text-[#E63946] font-bold pb-2 border-b border-[#E63946]/40 w-fit">04</span>
            <span className="font-display text-xl font-bold uppercase text-[#F4F1EA] tracking-wide mt-1">Cero Dolor</span>
            <p className="text-xs sm:text-sm text-[#A6A29A] leading-relaxed">
              100% orgánico, hipoalergénico y con desvanecimiento progresivo natural sin dejar manchas ni marcas dérmicas.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM CHECKOUT NOTIFICATION */}
      <section className="w-full bg-[#050505] px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 p-7 sm:p-9 rounded-[2px] bg-[#0C0C0E] border border-[#E63946]/45">
          <div className="flex flex-col gap-2.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E63946]" />
              <span className="text-xs uppercase tracking-widest text-[#E63946] font-bold">
                Pago Seguro
              </span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl uppercase text-[#F4F1EA] tracking-tight font-bold">
              Paga vía Yape o Plin<span className="text-[#E63946]">.</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#A6A29A] leading-relaxed">
              Número oficial: <strong className="text-[#F4F1EA] font-bold">{STUDIO_DATA.yapeNumber}</strong> a nombre de{' '}
              <strong className="text-[#F4F1EA] font-bold">{STUDIO_DATA.yapeOwner}</strong>. Envíos express a Lima en 24h y despachos diarios a provincias.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <button
              className="flex-1 lg:flex-initial bg-[#161619] hover:bg-[#222227] text-[#F4F1EA] text-xs uppercase tracking-wider px-6 py-4 rounded-[2px] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-white/15 hover:border-[#E63946] min-h-[44px]"
              onClick={() => {
                setActiveScreen('checkout');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] text-[#E63946]">shopping_bag</span>
              <span>Ver Mi Carrito ({cart.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        designs={designs}
        currentIndex={lightboxIndex}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}
