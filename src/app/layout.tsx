import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Synaptic Simulations',
    template: '%s | Synaptic Simulations',
  },
  description:
    'Home of the A220 for Microsoft Flight Simulator.',
  keywords: ['Synaptic Simulations', 'Synaptic A220', 'MSFS', 'Microsoft Flight Simulator', 'MSFS 2020', 'MSFS 2024', 'flight sim add-on'],
  openGraph: {
    type: 'website',
    siteName: 'Synaptic Simulations',
    title: 'Synaptic Simulations',
    description:
      'Home of the A220 for Microsoft Flight Simulator.',
    url: 'https://synapticsim.com',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SynapticSim',
    creator: '@SynapticSim',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col">
        {/* Fixed aurora blobs — behind all content */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          {/* Top-right large violet */}
          <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '65vw', height: '65vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(61,21,237,0.28) 0%, transparent 65%)', filter: 'blur(80px)' }} />
          {/* Mid-left purple */}
          <div style={{ position: 'absolute', top: '30%', left: '-15%', width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(102,0,159,0.22) 0%, transparent 65%)', filter: 'blur(100px)' }} />
          {/* Bottom center */}
          <div style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '70vw', height: '40vw', background: 'radial-gradient(ellipse, rgba(61,21,237,0.20) 0%, transparent 65%)', filter: 'blur(80px)' }} />
          {/* Mid-right accent */}
          <div style={{ position: 'absolute', top: '60%', right: '-5%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(180,0,255,0.14) 0%, transparent 65%)', filter: 'blur(90px)' }} />
        </div>
        <div className="relative flex flex-col min-h-screen" style={{ zIndex: 1 }}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
