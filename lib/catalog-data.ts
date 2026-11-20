export interface FlashDesign {
  id: string;
  code: string;
  title: string;
  category: 'oriental' | 'chicano' | 'geometric' | 'nordic' | 'biomech' | 'minimal';
  categoryLabel: string;
  dims: string;
  style: string;
  image: string;
  alt: string;
  duration: string;
}

export interface CatalogInfo {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  designsCount: number;
  coverImage: string;
  alt: string;
  description: string;
  specimenId: string;
  pricePerSheet: string;
  badgeLabel: string;
  tagColor?: string;
  designs: FlashDesign[];
}

// Helper function to generate design arrays
function generateDesigns(
  prefix: string,
  count: number,
  folder: string,
  categoryLabel: string,
  category: 'oriental' | 'chicano' | 'geometric' | 'nordic' | 'biomech' | 'minimal' = 'minimal'
): FlashDesign[] {
  const designs: FlashDesign[] = [];
  for (let i = 1; i <= count; i++) {
    const num = i.toString().padStart(2, '0');
    designs.push({
      id: `${prefix}-${num}`,
      code: `#${prefix.toUpperCase()}-${num}`,
      title: `Diseño ${prefix.charAt(0).toUpperCase() + prefix.slice(1)} ${num}`,
      category,
      categoryLabel,
      dims: 'Tamaño Real',
      style: 'Semipermanente',
      image: `/designs/${folder}/${prefix}-${num}.png`,
      alt: `Tatuaje semipermanente ${prefix} ${num}`,
      duration: '12-14 Días'
    });
  }
  return designs;
}

// Generate designs for each catalog
const BRAZO_DESIGNS = generateDesigns('brazo', 16, 'brazo-completo', 'Brazo Completo', 'oriental');
const ESPALDA_DESIGNS = generateDesigns('espalda', 6, 'espalda-pecho', 'Espalda y Pecho', 'geometric');
const CUELLO_DESIGNS = generateDesigns('cuello', 12, 'cuello', 'Cuello', 'chicano');
const MUJERES_DESIGNS = generateDesigns('mujeres', 35, 'mujeres', 'Para Mujeres', 'minimal');
const ANTEBRAZO_DESIGNS = generateDesigns('antebrazo', 41, 'antebrazo', 'Antebrazo', 'geometric');
const ABDOMEN_DESIGNS = generateDesigns('abdomen', 17, 'abdomen', 'Abdomen', 'biomech');
const MANO_DESIGNS = generateDesigns('mano', 15, 'mano', 'Mano y Dedos', 'minimal');

export const ALL_CATALOGS: CatalogInfo[] = [
  {
    id: 'cat-espalda-pecho',
    code: '#CAT-01',
    title: 'Espalda y Pecho',
    subtitle: 'Gran Formato',
    designsCount: 6,
    coverImage: 'https://cdn.tatspark.com/images/Black-And-Grey-Japanese-dragon-tattoo-design-for-men-on-back-15ea69efc0_thumbnail.webp',
    alt: 'Large back and chest semi-permanent tattoo composition',
    description: 'Composiciones completas de alto impacto: dragones orientales, ángeles caídos, cráneos geométricos y motivos biomecánicos de cobertura total.',
    specimenId: 'ARK-BCK-01',
    pricePerSheet: 'S/ 55.00',
    badgeLabel: '6 Diseños',
    designs: ESPALDA_DESIGNS
  },
  {
    id: 'cat-brazo-completo',
    code: '#CAT-02',
    title: 'Brazo Completo',
    subtitle: 'Sleeve Collection',
    designsCount: 16,
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgQRZajBA1mg22sYvPHsrS92PFMDhslKwQ2JuJPgFfnoAqH4fpvY-8Hcl0&s=10',
    alt: 'Full sleeve tattoo sheet preview',
    description: 'Mangas continuas ensamblables: estilo nórdico vikingo, maorí polinesio, relojes barrocos con rosas y armaduras samurái fluidas.',
    specimenId: 'ARK-SLV-08',
    pricePerSheet: 'S/ 45.00',
    badgeLabel: '16 Diseños',
    designs: BRAZO_DESIGNS
  },
  {
    id: 'cat-cuello',
    code: '#CAT-03',
    title: 'Cuello',
    subtitle: 'Throat & Nape',
    designsCount: 12,
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG0p60T0J4lLG_YRHO9vkGYT_i1hgxXBxFccPG2SpiCg&s',
    alt: 'Chicano and dark lettering tattoo flash applied on neck',
    description: 'Piezas simétricas para garganta, nuca y laterales: mariposas dark, alas extendidas, espinas de alambre y lettering gótico.',
    specimenId: 'ARK-NCK-03',
    pricePerSheet: 'S/ 35.00',
    badgeLabel: '12 Diseños',
    designs: CUELLO_DESIGNS
  },
  {
    id: 'cat-mujeres',
    code: '#CAT-04',
    title: 'Para Mujeres',
    subtitle: 'Fine Line & Flora',
    designsCount: 35,
    coverImage: 'https://eslamoda.com/wp-content/uploads/sites/2/2025/11/IMG_0263-600x800.jpg',
    alt: 'Elegant delicate botanical tattoo flash compilation',
    description: 'Colección dedicada a la sutileza: ramas de olivo, constelaciones zodiacales, aves en vuelo libre y flores silvestres.',
    specimenId: 'ARK-WMS-04',
    pricePerSheet: 'S/ 30.00',
    badgeLabel: '35 Diseños',
    tagColor: 'tertiary',
    designs: MUJERES_DESIGNS
  },
  {
    id: 'cat-antebrazo',
    code: '#CAT-05',
    title: 'Antebrazo',
    subtitle: 'Forearm Specimen',
    designsCount: 41,
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPVxmHZcLQZ58SZGQQ2DM5mjgetueDTs_7wlQZ07aFncb0aqWexiZxTA1c&s=10',
    alt: 'Forearm semi permanent tattoo sheet displaying sacred geometry',
    description: 'La zona más versátil: mandalas envolventes, brújulas náuticas, ojos realistas, leones con coronas y flechas geométricas.',
    specimenId: 'ARK-FAR-05',
    pricePerSheet: 'S/ 35.00',
    badgeLabel: '41 Diseños',
    designs: ANTEBRAZO_DESIGNS
  },
  {
    id: 'cat-abdomen',
    code: '#CAT-06',
    title: 'Abdomen',
    subtitle: 'Ribs & Torso',
    designsCount: 17,
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuXgtl1GMl2BkrJ97blwyINcTCkdOms2KG9ayc0-knV1OhxEbE3e4r6YGr&s=10',
    alt: 'Abdominal curvature tattoo placement',
    description: 'Diseños adaptados a la curvatura abdominal y costillas: lemas curvados, murciélagos, serpientes entrelazadas y filigranas simétricas.',
    specimenId: 'ARK-ABD-06',
    pricePerSheet: 'S/ 40.00',
    badgeLabel: '17 Diseños',
    designs: ABDOMEN_DESIGNS
  },
  {
    id: 'cat-mano',
    code: '#CAT-07',
    title: 'Mano y Dedos',
    subtitle: 'Hand & Knuckles',
    designsCount: 15,
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFr6fYYo7TAjgJ0ghKUWB2nwy0MPT2uEU5Wom60VW7TU9tBHi7q2HRiJWP&s=10',
    alt: 'Hand and fingers semi-permanent tattoo flash sheet',
    description: 'Simbolismo denso para nudillos y dorso: telarañas, runas nórdicas, espadas pequeñas en dedos y sellos esotéricos con durabilidad optimizada.',
    specimenId: 'ARK-HND-07',
    pricePerSheet: 'S/ 25.00',
    badgeLabel: '15 Diseños',
    designs: MANO_DESIGNS
  }
];

export interface CartItem {
  id: string;
  title: string;
  count?: number;
  image?: string;
  subtitle?: string;
}

export const INITIAL_CART_ITEMS: CartItem[] = [];

export const STUDIO_DATA = {
  name: 'AaronInk Studio',
  headline: 'TATUAJES SEMIPERMANENTES (12-14 DÍAS)',
  phone: '51983753468',
  phoneFormatted: '+51 983 753 468',
  yapeNumber: '983753468',
  yapeOwner: 'Samir Coronado',
  schedule: 'Lunes a Sábado 9:00 AM - 8:00 PM',
  trenSchedule: 'Lunes a Sábado · 4:00 p.m. a 7:00 p.m.',
  trenDeposit: 'S/ 5',
  shalomDeposit: '50% Adelanto'
};
