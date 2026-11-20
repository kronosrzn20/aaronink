---
name: Cobalt Flash
colors:
  surface: '#111317'
  surface-dim: '#111317'
  surface-bright: '#37393d'
  surface-container-lowest: '#0c0e11'
  surface-container-low: '#1a1c1f'
  surface-container: '#1e2023'
  surface-container-high: '#282a2d'
  surface-container-highest: '#333538'
  on-surface: '#e2e2e6'
  on-surface-variant: '#c3c6d7'
  inverse-surface: '#e2e2e6'
  inverse-on-surface: '#2f3034'
  outline: '#8d90a0'
  outline-variant: '#434655'
  surface-tint: '#b4c5ff'
  primary: '#b4c5ff'
  on-primary: '#002a78'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#0053db'
  secondary: '#4ae176'
  on-secondary: '#003915'
  secondary-container: '#00b954'
  on-secondary-container: '#004119'
  tertiary: '#ffb596'
  on-tertiary: '#581e00'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#6bff8f'
  secondary-fixed-dim: '#4ae176'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005321'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#111317'
  on-background: '#e2e2e6'
  surface-variant: '#333538'
typography:
  display:
    fontFamily: Oswald
    fontSize: 4.5rem
    fontWeight: '700'
    lineHeight: 4.75rem
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Oswald
    fontSize: 2.75rem
    fontWeight: '700'
    lineHeight: 3rem
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Oswald
    fontSize: 3rem
    fontWeight: '600'
    lineHeight: 3.25rem
    letterSpacing: 0.01em
  headline-lg-mobile:
    fontFamily: Oswald
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: 0.01em
  headline-md:
    fontFamily: Oswald
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: 0.02em
  headline-sm:
    fontFamily: Oswald
    fontSize: 1.375rem
    fontWeight: '500'
    lineHeight: 1.625rem
    letterSpacing: 0.03em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.1em
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system channels the uncompromising, visceral energy of traditional tattoo parlors reimagined through a clinical, modern lens. Drawing inspiration from authentic flash sheets, technical needle gauges, and modern semi-permanent body art, the identity balances raw counter-culture edge with surgical precision. 

The aesthetic is grounded in Dark Brutalism, characterized by strict rectangular grids, zero-radius geometries, and deep archival surfaces. Dense typography evokes hand-stamped stencil labels and editorial posters, creating an atmosphere that feels underground, tactile, and deliberately high-contrast. The emotional response is one of craftsmanship, permanence, and decisive style—inviting users into an authentic atelier where every edge is razor-sharp and every mark is intentional.

## Colors

The color palette centers on intense contrast and deep ink density:

- **Primary (`#2563EB`)**: Electric Cobalt Ink. Used for active states, key interactive highlights, focus rings, and high-impact graphic marks. Reflects fresh technical stencil fluid.
- **Secondary (`#22C55E`)**: WhatsApp Emerald. Reserved strictly for real-world conversion actions: booking inquiries, direct artist consultations, and WhatsApp triggers.
- **Neutral Canvas (`#0B0D10` to `#13171D`)**: Inky Midnight Blacks. `#0B0D10` serves as the canvas substrate, while `#13171D` defines container sheets and elevated panels.
- **Structural Gray (`#262C36`)**: Sharp hairline borders mimicking stencil cuts and flash partition frames.
- **Typography Tones (`#F4F4F2` & `#9CA3AF`)**: Crisp flash-paper off-white for headlines with tempered, functional cool grays for secondary metadata and technical disclaimers.

Color usage must remain disciplined: surfaces remain pitch-black or charcoal; cobalt acts as the needle tip, directing focus without overwhelming the layout.

## Typography

The typographic hierarchy juxtaposes the condensed impact of **Oswald** with the clean geometric functionalism of **Hanken Grotesk**.

- **Display & Headline Levels (Oswald)**: Rendered primarily in uppercase to emulate tattoo flash sheets, block prints, and classic workshop specimen posters. The tight line heights and condensed width allow aggressive visual scaling even within dense layout grids.
- **Body & Technical Metadata (Hanken Grotesk)**: Chosen for its neutral, highly legible rhythm across mobile screens. Body copy uses generous line heights against the dark background to preserve readability.
- **Label Tokens**: All metadata, pricing, flash numbers, and badges are styled with wide tracking (`0.08em` to `0.1em`) and uppercase transformation to function like technical stencil labeling.

## Layout & Spacing

The layout operates on a strict, modular structural grid reminiscent of divided physical flash frames:

- **Grid Architecture**: 12-column layout on desktop, 6-column on tablet, and 2-column or 4-column on mobile. Visual dividers and component containers align precisely with column boundaries without floating offsets.
- **Rhythm & Cadence**: Spacing values adhere to strict 4px/8px baselines. Containers utilize flush or tightly packed modular spacing rather than expansive open margins, enforcing an editorial, archival poster composition.
- **Flash Grid System**: Product displays and flash sheets use a tiled matrix structure separated by 1px inky borders (`#262C36`) rather than loose cards floating in negative space.
- **Breakpoints**:
  - `Mobile` (< 640px): 1rem margins, collapsed 1-to-2 column flash sheets.
  - `Tablet` (640px – 1024px): 2rem margins, 6 columns, multi-tier panels.
  - `Desktop` (> 1024px): 3rem outer framing margins, 12 columns, high-density flash galleries.

## Elevation & Depth

This design system avoids blurred drop shadows and skeuomorphic blurs. Depth is achieved purely through **tonal stratification and razor borders**:

1. **Substrate Level (Z-0)**: Deep carbon base (`#0B0D10`).
2. **Sheet Containers (Z-1)**: Midnight slate tint (`#13171D`) bounded by a 1px border of `#262C36`.
3. **Selected / Focused Overlays (Z-2)**: Border switches instantly from `#262C36` to `#2563EB`, paired with a solid 1px or 2px inset hairline. 
4. **Modals & Drawers (Z-3)**: Pure charcoal backdrop with opaque `#0B0D10` overlay, framed with a sharp 2px solid border (`#2563EB` or `#F4F4F2`). No atmospheric shadow is permitted; the visual separation is sharp, technical, and physical.

## Shapes

The geometric rule across the entire design system is **absolute zero radius (0px)**. 

Every visual module—including buttons, badge chips, modal windows, form controls, and preview matrices—must feature square, unfilleted corners. This zero-tolerance geometry reinforces the brutalist aesthetic of razor blades, metal ink trays, and cut paper sheets. No soft or pill-shaped tokens exist within this ecosystem.

## Components

### Buttons
- **Primary Action (Flash / Select)**: Sharp rectangular box, `#2563EB` background, `#FFFFFF` text, bold Oswald uppercase, 0px border. Hover transitions instantly to `#1D4ED8` without easing lag.
- **Direct Conversion (WhatsApp Booking)**: Solid `#22C55E` background, `#0B0D10` bold text. Includes a hard 1px outline in `#16A34A` for high-impact edge sharpness.
- **Secondary / Ghost**: Pure transparent background, 1px `#262C36` border, `#F4F4F2` text. On hover, background shifts to `#13171D` with a `#2563EB` hairline border.

### Chips & Badges
- **Technical Indicator (Duration / Style)**: Rectangular tag with `#13171D` fill, 1px `#262C36` border, and uppercase label-sm typography in `#9CA3AF`.
- **Active State / Duration (12-14 Days)**: Solid `#2563EB` fill or 1px `#2563EB` outline with bright cobalt text.

### Tattoo Flash Cards
- Composed of `#13171D` background with 1px `#262C36` framing border.
- Images sit flush against the card borders with a technical specimen watermark (`e.g., #INK-0492`) positioned at the bottom left using `label-sm`.
- Interaction: On hover or active tap, the 1px perimeter border snaps to `#2563EB` with zero transition delay.

### Form Inputs
- Fully boxed rectangular fields with `#0B0D10` background, 1px `#262C36` border, and crisp off-white (`#F4F4F2`) input text.
- Focus state replaces the border with a 2px `#2563EB` ring without corner rounding. Placeholder text uses `#4B5563`.

### Selection Controls (Checkboxes & Radios)
- Both elements are square (0px border radius).
- Unchecked: 1px `#262C36` border on `#0B0D10`.
- Checked: Solid `#2563EB` fill with a sharp white geometric checkmark or inner square indicator.

### Flash Sheet Matrix Lists
- List items span full container width, separated by 1px hairline horizontal rules in `#262C36`.
- Typography alternates between condensed Oswald titles and tabular monospace metadata for sizes, placements, and estimated lifespan.