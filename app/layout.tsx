import type {Metadata} from 'next';
import { Oswald, Hanken_Grotesk } from 'next/font/google';
import './globals.css';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AaronInk - Tatuajes Semipermanentes (12-14 Días)',
  description: 'Atelier semipermanente clínico en Lima, Perú. Tatuajes botánicos que duran de 12 a 14 días. 100% indoloro, realista y resistente al agua.',
  openGraph: {
    title: 'AaronInk - Tatuajes Semipermanentes (12-14 Días)',
    description: 'Atelier semipermanente clínico en Lima, Perú. Tatuajes botánicos que duran de 12 a 14 días. 100% indoloro y resistente al agua.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AaronInk - Tatuajes Semipermanentes (12-14 Días)',
    description: 'Atelier semipermanente clínico en Lima, Perú. Tatuajes botánicos que duran de 12 a 14 días.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className={`dark ${oswald.variable} ${hanken.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050505] text-[#F4F1EA] antialiased min-h-screen selection:bg-[#E63946] selection:text-[#F4F1EA] relative overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
