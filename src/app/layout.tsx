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
    'Synaptic Simulations is developing a high-fidelity Synaptic A220 for Microsoft Flight Simulator 2020 and 2024.',
  keywords: ['Synaptic Simulations', 'Synaptic A220', 'MSFS', 'Microsoft Flight Simulator', 'MSFS 2020', 'MSFS 2024', 'flight sim add-on'],
  openGraph: {
    type: 'website',
    siteName: 'Synaptic Simulations',
    title: 'Synaptic Simulations',
    description:
      'Developing a high-fidelity Synaptic A220 for Microsoft Flight Simulator 2020 and 2024.',
    url: 'https://synapticsim.com',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SynapticSim',
    creator: '@SynapticSim',
  },
  icons: {
    icon: '/favicon.ico',
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
