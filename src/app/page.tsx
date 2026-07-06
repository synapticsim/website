import type { Metadata } from 'next';
import { HomePageClient } from './HomePageClient';

export const metadata: Metadata = {
  title: 'Synaptic Simulations',
  description:
    'Home of the A220 for Microsoft Flight Simulator.',
};

export default function HomePage() {
  return <HomePageClient />;
}
