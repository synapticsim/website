import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Docs & Tooling',
  description: 'Documentation, setup guides, and tools for the Synaptic A220.',
};

const tools = [
  {
    href: 'https://docs.synapticsim.com/',
    label: 'Documentation',
    category: 'Docs',
    title: 'Setup & Usage Guide',
    description:
      'Step-by-step installation, configuration, and feature documentation for the Synaptic A220. Covers everything from first install to advanced systems.',
    badge: 'Work in Progress',
    arrow: true,
  },
  {
    href: 'https://ecl.synapticsim.com/',
    label: 'ECL Editor',
    category: 'Tooling',
    title: 'Aircraft Checklist Editor',
    description:
      'Customize your own checklists or add your airline\'s specific procedures. Build, preview, and export Electronic Checklist (ECL) profiles directly for the A220.',
    badge: null,
    arrow: true,
  },
];

export default function DocsPage() {
  return (
    <div className="pt-16">
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(61,21,237,0.13),transparent)]" />
        <div className="section-container relative z-10 text-center">
          <p className="text-violet-400 font-medium text-sm uppercase tracking-widest mb-4">Resources</p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-text mb-6 pb-2">Docs &amp; Tooling</h1>
          <p className="text-xl text-white/60 max-w-xl mx-auto">
            Everything you need to set up, operate, and customise the Synaptic A220.
          </p>
        </div>
      </section>

      <div className="section-container pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {tools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <div className="card-surface p-8 hover:border-white/20 transition-all h-full flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full border text-violet-400 bg-violet-400/10 border-violet-400/20">
                    {tool.category}
                  </span>
                  {tool.badge && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full border text-amber-400 bg-amber-400/10 border-amber-400/20">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
                  {tool.title}
                </h2>
                <p className="text-white/55 leading-relaxed flex-1 mb-6">{tool.description}</p>
                <div className="flex items-center gap-2 text-sm text-violet-400 font-medium mt-auto">
                  Open {tool.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
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
