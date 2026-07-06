import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet the team behind Synaptic Simulations — passionate aviation enthusiasts and engineers building the A220 for MSFS.',
};

const teamMembers = [
  {
    handle: 'MikeRomaa',
    role: 'Lead Developer',
    bio: 'Full-stack developer and aviation nerd. Leads core aircraft systems and FMS development.',
    avatarUrl: 'https://avatars.githubusercontent.com/MikeRomaa',
  },
  {
    handle: 'MasterWigu',
    role: 'Systems Developer',
    bio: 'Focused on aircraft systems simulation — hydraulics, electrics, and pneumatics.',
    avatarUrl: 'https://avatars.githubusercontent.com/MasterWigu',
  },
  {
    handle: 'professoralex13',
    role: 'Avionics Developer',
    bio: 'Building the custom avionics suite including PFD, ND, and EWD displays.',
    avatarUrl: 'https://avatars.githubusercontent.com/professoralex13',
  },
  {
    handle: 'SparkyPotato',
    role: 'Tooling & Infrastructure',
    bio: 'Author of core developer tooling including mach — the instrument bundler used throughout the project.',
    avatarUrl: 'https://avatars.githubusercontent.com/SparkyPotato',
  },
  {
    handle: 'Harsh3114',
    role: 'Developer',
    bio: 'Contributing to aircraft systems, avionics, and project infrastructure.',
    avatarUrl: 'https://avatars.githubusercontent.com/Harsh3114',
  },
];

const values = [
  {
    title: 'Built for MSFS',
    desc: 'Deep, focused expertise in Microsoft Flight Simulator 2020 and 2024. Every system is purpose-built for the platform\'s unique capabilities and requirements.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
  },
  {
    title: 'Community Driven',
    desc: 'We develop in public, share WIP footage, and actively engage with our community at every stage.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'No Compromises',
    desc: 'We take the time to do it right. Delays happen because we refuse to ship something that isn\'t ready.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    title: 'Passion Led',
    desc: 'Every contributor is here because they love aviation and simulation — not for profit. That shows in the work.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(61,21,237,0.13),transparent)]" />
        <div className="section-container relative z-10 text-center">
          <p className="text-violet-400 font-medium text-sm uppercase tracking-widest mb-4">Who we are</p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-text mb-6">
            About Synaptic
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            We&apos;re a small, distributed team of developers and aviation enthusiasts united by one goal:
            building the most detailed Synaptic A220 the MSFS community has ever seen.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 border-t border-white/10">
        <div className="section-container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold gradient-text mb-4">What Drives Us</h2>
            <p className="text-white/50 max-w-xl mx-auto">The principles behind every decision we make.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {values.map((v) => (
              <div key={v.title} className="card-surface p-6 hover:border-white/20 transition-colors">
                <div className="text-violet-400 mb-3">{v.icon}</div>
                <h3 className="font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 border-t border-white/10">
        <div className="section-container">
          <div className="mb-12 text-center">
            <p className="text-violet-400 font-medium text-sm uppercase tracking-widest mb-3">The people</p>
            <h2 className="text-3xl font-bold gradient-text mb-4">Meet the Team</h2>
            <p className="text-white/50 max-w-lg mx-auto">
              A dedicated professional team building the most detailed A220 simulation available for MSFS.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <a
                key={member.handle}
                href={`https://github.com/${member.handle}`}
                target="_blank"
                rel="noreferrer"
                className="card-surface p-6 hover:border-white/20 transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={member.avatarUrl}
                    alt={member.handle}
                    width={48}
                    height={48}
                    className="rounded-full border border-white/10"
                  />
                  <div>
                    <p className="font-semibold text-white group-hover:text-violet-400 transition-colors">
                      @{member.handle}
                    </p>
                    <p className="text-xs text-white/40">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{member.bio}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* History blurb */}
      <section className="py-20 border-t border-white/10">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-violet-400 font-medium text-sm uppercase tracking-widest mb-3">Our story</p>
            <h2 className="text-3xl font-bold gradient-text mb-6">Built with Patience</h2>
            <div className="space-y-4 text-white/60 text-base leading-relaxed text-left">
              <p>
                Synaptic Simulations was founded in 2021 with a clear purpose: bring the Synaptic A220
                to Microsoft Flight Simulator to a level of fidelity that no one had achieved before.
              </p>
              <p>
                From the start, the team invested in building bespoke infrastructure — including <span className="text-white font-medium">mach</span>,
                a TypeScript instrument bundler, and the <span className="text-white font-medium">Advanced Cockpit Emulator
                (ACE)</span> — a framework for building interactive MSFS cockpits that is now trusted across the industry.
              </p>
              <p>
                The aircraft has taken longer than originally hoped. That&apos;s a consequence of doing it right.
                Every system is custom-built from the ground up, with no black-box shortcuts. As of early 2026,
                the aircraft is in final testing — and the community of 20,000+ Discord members is along for every step.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
