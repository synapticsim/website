import type { Metadata } from 'next';
import { HomePageClient } from './HomePageClient';

export const metadata: Metadata = {
  title: 'Synaptic Simulations',
  description:
    'Synaptic Simulations is developing a high-fidelity Synaptic A220 for Microsoft Flight Simulator 2020 and 2024.',
};

export default function HomePage() {
  return <HomePageClient />;
}
