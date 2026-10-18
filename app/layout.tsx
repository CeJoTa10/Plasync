import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'EcoLeak: Capture the Leak | Ocean Hackathon MVP',
  description: 'Plataforma multimodal e gamificada de detecção e triagem de vazamentos de resíduos costeiros com IA de Visão, conectando ONGs a escolas e governança ESG.',
  keywords: ['Ocean Hackathon', 'EcoLeak', 'Capture the Leak', 'IA de Visão', 'Reciclagem', 'Educação Ambiental', 'EJA', 'ESG'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#06101e] text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950">
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
