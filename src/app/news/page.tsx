import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News',
  description: 'Latest updates, development milestones, and announcements from Synaptic Simulations.',
};

const newsItems = [
  {
    url: 'https://forum.inibuilds.com/topic/36970-synaptic-a220-development-update-june-2026/',
    date: 'June 16, 2026',
    category: 'Development Update',
    title: 'Synaptic A220 Development Update — June 2026',
    summary: 'FSExpo 2026 wrap-up, a fully rewritten FMS, CAT III autoland, RNP/AR approaches, detailed visuals, the iconic engine howl by Echo19, and a look at what remains before release.',
    featured: true,
  },
  {
    url: 'https://forum.inibuilds.com/topic/30864-synaptic-a220-fsexpo-update/',
    date: 'June 24, 2025',
    category: 'Development Update',
    title: 'Synaptic A220 — FSExpo Update',
    summary: 'New system implementations, visual polish, and community-facing features. Plus the announcement of a sound design partnership with Echo19.',
    featured: false,
  },
  {
    url: 'https://forum.inibuilds.com/topic/29996-synaptic-a220-april-2025-update/',
    date: 'April 29, 2025',
    category: 'Development Update',
    title: 'Synaptic A220 — April 2025 Update',
    summary: 'High-fidelity exterior and interior modeling, emergent systems behavior, a fully custom electrical system with 646 components, custom flight control laws, Navigraph integration, the MKP, and plug-and-play checklists.',
    featured: false,
  },
  {
    url: 'https://forum.inibuilds.com/topic/22893-state-of-avionics-update-synaptic-a22x/',
    date: 'April 29, 2024',
    category: 'Development Update',
    title: 'State of Avionics Update | Synaptic A22X',
    summary: 'Lead avionics developer Mike provides insight into new avionics feature additions: ACE software, CPDLC integration, A220 checklists, and graphical flight planning.',
    featured: false,
  },
  {
    url: 'https://forum.inibuilds.com/profile/42191-synaptic-simulations/',
    date: 'January 30, 2024',
    category: 'Announcement',
    title: 'Statement from Synaptic Simulations — Synaptic A22X Project Future',
    summary: 'Synaptic Simulations announces the transition to a paid add-on, a partnership with iniBuilds, and the upcoming release of the A220 for both desktop and Xbox editions of Microsoft Flight Simulator.',
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  'Development Update': 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  Announcement: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
};

export default function NewsPage() {
  const featured = newsItems.find((n) => n.featured);
  const rest = newsItems.filter((n) => !n.featured);

  return (
    <div className="pt-16">
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(61,21,237,0.13),transparent)]" />
        <div className="section-container relative z-10 text-center">
          <p className="text-violet-400 font-medium text-sm uppercase tracking-widest mb-4">Development Updates</p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-text mb-6">News &amp; Updates</h1>
          <p className="text-xl text-white/60 max-w-xl mx-auto">
            Development milestones and announcements from the Synaptic team, posted on the iniBuilds forum.
          </p>
        </div>
      </section>

      <div className="section-container pb-24">
        {featured && (
          <div className="mb-12">
            <a href={featured.url} target="_blank" rel="noreferrer" className="group block">
              <div className="card-surface p-8 hover:border-white/20 transition-all">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[featured.category] ?? 'text-white/50 bg-white/5 border-white/10'}`}>
                    {featured.category}
                  </span>
                  <span className="text-xs text-white/30">Latest</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-white/60 leading-relaxed mb-6 max-w-2xl">{featured.summary}</p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <span className="text-sm text-white/30">{featured.date}</span>
                  <span className="text-sm text-violet-400 font-medium flex items-center gap-1.5">
                    Read on iniBuilds forum
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((item) => (
            <a key={item.url} href={item.url} target="_blank" rel="noreferrer" className="group block">
              <div className="card-surface p-6 hover:border-white/20 transition-all h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[item.category] ?? 'text-white/50 bg-white/5 border-white/10'}`}>
                    {item.category}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-violet-400 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-4">{item.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/30">{item.date}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/25 group-hover:text-violet-400 transition-all">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}