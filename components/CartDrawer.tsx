'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { STUDIO_DATA } from '@/lib/catalog-data';

export default function CartDrawer() {
  const { cart, removeFromCart, clearCart, isDrawerOpen, closeDrawer, setActiveScreen } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'tren' | 'shalom'>('tren');
  const [shalomCity, setShalomCity] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [nameError, setNameError] = useState(false);
  const [shalomError, setShalomError] = useState(false);

  if (!isDrawerOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    if (!customerName.trim()) {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }

    if (deliveryMethod === 'shalom' && !shalomCity.trim()) {
      setShalomError(true);
      hasError = true;
    } else {
      setShalomError(false);
    }

    if (hasError) return;

    const deliveryText =
      deliveryMethod === 'tren'
        ? 'Estación del Tren (Lima) · Reserva S/ 5'
        : 'Envío por Shalom (todo el Perú) · Reserva 50%';

    const catalogListText =
      cart.length > 0
        ? cart.map((c, i) => `${i + 1}. ${c.title}`).join('\n')
        : 'Consulta general de catálogos';

    let message = `Hola AaronInk 👋 Quiero coordinar mi pedido de Tatuajes Semipermanentes:\n\n`;
    message += `👤 *Nombre:* ${customerName.trim()}\n`;
    message += `📍 *Modalidad:* ${deliveryText}\n`;
    if (deliveryMethod === 'shalom' && shalomCity.trim()) {
      message += `📦 *Agencia / Ciudad:* ${shalomCity.trim()}\n`;
    }
    message += `\n📁 *Catálogos Seleccionados:*\n${catalogListText}\n`;
    if (orderNotes.trim()) {
      message += `\n📝 *Detalles o Diseños:* ${orderNotes.trim()}\n`;
    }
    message += `\nListo para enviar captura de los diseños y coordinar el pago/reserva por Yape.`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${STUDIO_DATA.phone}?text=${encoded}`;
    window.open(waUrl, '_blank');
    closeDrawer();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm transition-opacity duration-200 flex justify-end">
      {/* Backdrop overlay dismiss */}
      <div className="absolute inset-0" onClick={closeDrawer} />

      <div className="relative w-full max-w-lg h-full bg-[#09090B] p-6 sm:p-7 flex flex-col justify-between overflow-y-auto z-10 border-l border-[#E63946]/45">
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-[#E63946]/35">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-[2px] bg-[#E63946] flex items-center justify-center text-[#F4F1EA]">
                <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold uppercase text-[#F4F1EA] tracking-wide leading-none">
                  Tu Pedido Flash<span className="text-[#E63946]">.</span>
                </h3>
                <span className="text-xs text-[#A6A29A]">AaronInk Atelier Semipermanente</span>
              </div>
            </div>
            <button
              aria-label="Cerrar pedido"
              className="w-10 h-10 rounded-[2px] bg-[#121215] hover:bg-[#E63946] text-[#F4F1EA] flex items-center justify-center transition-colors cursor-pointer border border-white/15 hover:border-[#E63946]"
              onClick={closeDrawer}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Selected Catalogs List Container */}
          <div className="flex flex-col gap-3 my-6">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase text-[#A6A29A] tracking-wider font-semibold">
                Catálogos Seleccionados:
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase text-[#F4F1EA] font-bold px-3 py-1 rounded-[2px] bg-[#E63946] tabular-nums">
                  {cart.length} {cart.length === 1 ? 'catálogo' : 'catálogos'}
                </span>
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('¿Estás seguro que deseas eliminar todos los catálogos del carrito?')) {
                        clearCart();
                      }
                    }}
                    className="text-xs text-[#A6A29A] hover:text-[#E63946] font-semibold cursor-pointer transition-colors flex items-center gap-1"
                    title="Limpiar todo el carrito"
                  >
                    <span className="material-symbols-outlined text-[14px]">delete_sweep</span>
                    <span className="hidden sm:inline">Limpiar</span>
                  </button>
                )}
              </div>
            </div>

            {/* Empty State */}
            {cart.length === 0 ? (
              <div className="p-8 rounded-[2px] bg-[#0C0C0E] text-center flex flex-col items-center gap-3 border border-white/10">
                <div className="w-12 h-12 rounded-[2px] bg-[#141417] flex items-center justify-center text-[#7C7870] border border-white/10">
                  <span className="material-symbols-outlined text-[24px]">folder_off</span>
                </div>
                <p className="text-xs text-[#A6A29A]">
                  Aún no has agregado catálogos a tu lista.
                </p>
                <button
                  onClick={() => {
                    closeDrawer();
                    setActiveScreen('home');
                    setTimeout(() => {
                      const el = document.getElementById('catalogos-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="text-xs uppercase text-[#E63946] hover:text-[#F4F1EA] font-bold tracking-wider underline decoration-[#E63946] cursor-pointer mt-1"
                  type="button"
                >
                  Explorar los 7 catálogos
                </button>
              </div>
            ) : (
              <ul className="flex flex-col gap-2.5">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between p-3.5 rounded-[2px] bg-[#0C0C0E] text-[#F4F1EA] border border-white/10 hover:border-[#E63946] transition-colors"
                  >
                    <div className="flex items-center gap-3 truncate mr-2">
                      <div className="w-8 h-8 rounded-[2px] bg-[#E63946] flex items-center justify-center text-[#F4F1EA] flex-shrink-0">
                        <span className="material-symbols-outlined text-[16px]">bookmark</span>
                      </div>
                      <span className="font-display text-base uppercase font-bold tracking-wide truncate">
                        {item.title}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-[2px] text-[#A6A29A] hover:text-[#F4F1EA] hover:bg-[#E63946] flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Eliminar ${item.title}`}
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Link to dedicated checkout view */}
            {cart.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  closeDrawer();
                  setActiveScreen('checkout');
                }}
                className="text-xs uppercase tracking-wider text-[#E63946] hover:text-[#F4F1EA] py-1.5 flex items-center gap-1.5 cursor-pointer font-bold"
              >
                <span>Ver pantalla completa de confirmación</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            )}
          </div>

          {/* Order Form Fields */}
          <form className="flex flex-col gap-4 pt-2" onSubmit={handleSubmitOrder}>
            {/* Field: Customer Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#F4F1EA] font-semibold" htmlFor="cart-customer-name">
                Tu Nombre Completo <span className="text-[#E63946]">*</span>
              </label>
              <input
                id="cart-customer-name"
                type="text"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  if (e.target.value.trim()) setNameError(false);
                }}
                placeholder="Ej. Camila Vargas"
                className="w-full px-4 py-3 rounded-[2px] bg-[#050505] text-[#F4F1EA] text-sm placeholder:text-[#7C7870] border border-white/15 focus:border-[#E63946] outline-none transition-colors"
                required
              />
              {nameError && (
                <span className="text-xs text-[#E63946] font-semibold">
                  Por favor ingresa tu nombre
                </span>
              )}
            </div>

            {/* Delivery Radio Options */}
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider text-[#F4F1EA] font-semibold">
                Método de Entrega <span className="text-[#E63946]">*</span>
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {/* Option 1: Tren Eléctrico */}
                <label
                  onClick={() => setDeliveryMethod('tren')}
                  className={`flex items-center gap-3 p-3.5 rounded-[2px] cursor-pointer transition-colors border ${
                    deliveryMethod === 'tren'
                      ? 'border-[#E63946] bg-[#E63946]/10'
                      : 'border-white/10 bg-[#0C0C0E] hover:bg-[#121215]'
                  }`}
                >
                  <input
                    type="radio"
                    name="drawer-delivery"
                    checked={deliveryMethod === 'tren'}
                    onChange={() => setDeliveryMethod('tren')}
                    className="w-4 h-4 accent-[#E63946]"
                  />
                  <div className="flex flex-col">
                    <span className="font-display text-base font-bold uppercase text-[#F4F1EA]">
                      Estación del Tren (Lima)
                    </span>
                    <span className="text-[11px] text-[#E63946] font-bold">
                      Reserva con S/ 5 (Línea 1)
                    </span>
                  </div>
                </label>

                {/* Option 2: Shalom Nacional */}
                <label
                  onClick={() => setDeliveryMethod('shalom')}
                  className={`flex items-center gap-3 p-3.5 rounded-[2px] cursor-pointer transition-colors border ${
                    deliveryMethod === 'shalom'
                      ? 'border-[#E63946] bg-[#E63946]/10'
                      : 'border-white/10 bg-[#0C0C0E] hover:bg-[#121215]'
                  }`}
                >
                  <input
                    type="radio"
                    name="drawer-delivery"
                    checked={deliveryMethod === 'shalom'}
                    onChange={() => setDeliveryMethod('shalom')}
                    className="w-4 h-4 accent-[#E63946]"
                  />
                  <div className="flex flex-col">
                    <span className="font-display text-base font-bold uppercase text-[#F4F1EA]">
                      Envío Shalom (Todo el Perú)
                    </span>
                    <span className="text-[11px] text-[#E63946] font-bold">
                      Reserva 50% de adelanto
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Conditional Shalom City Input */}
            {deliveryMethod === 'shalom' && (
              <div className="flex flex-col gap-1.5 rounded-[2px] bg-[#0C0C0E] p-3.5 border border-[#E63946]">
                <label className="text-xs uppercase tracking-wider text-[#E63946] font-bold" htmlFor="cart-shalom-city">
                  Ciudad o Agencia Shalom <span className="text-[#E63946]">*</span>
                </label>
                <input
                  id="cart-shalom-city"
                  type="text"
                  value={shalomCity}
                  onChange={(e) => {
                    setShalomCity(e.target.value);
                    if (e.target.value.trim()) setShalomError(false);
                  }}
                  placeholder="Ej. Shalom Chiclayo Central o Arequipa Parque Lambramani"
                  className="w-full px-3.5 py-2.5 rounded-[2px] bg-[#050505] text-[#F4F1EA] text-xs placeholder:text-[#7C7870] border border-white/15 focus:border-[#E63946] outline-none transition-colors"
                />
                {shalomError && (
                  <span className="text-xs text-[#E63946] font-semibold">
                    Indica la ciudad o agencia de destino
                  </span>
                )}
              </div>
            )}

            {/* Optional Notes */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-[#A6A29A]" htmlFor="cart-order-notes">
                Comentarios o diseños específicos (Opcional)
              </label>
              <textarea
                id="cart-order-notes"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Ej. Me interesa el diseño de dragón con olas que vi en la lámina 1..."
                rows={2}
                className="w-full px-4 py-3 rounded-[2px] bg-[#050505] text-[#F4F1EA] text-xs placeholder:text-[#7C7870] border border-white/15 focus:border-[#E63946] outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit Button (Green strictly for WhatsApp) */}
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="submit"
                className="w-full py-4 px-5 rounded-[2px] bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs uppercase tracking-wider text-center transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
                <span>Solicitar por WhatsApp</span>
              </button>
              <p className="text-[11px] text-[#7C7870] text-center uppercase tracking-wider">
                Se enviará la orden formateada con tus datos al chat directo de AaronInk (+51 983 753 468)
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
