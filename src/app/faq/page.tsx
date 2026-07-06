import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about the Synaptic A220',
};

const iniLink = <a href="https://inibuilds.com/" target="_blank" rel="noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors">iniBuilds</a>;

const faqs: { category: string; items: { q: string; a: ReactNode }[] }[] = [
  {
    category: 'The Aircraft',
    items: [
      {
        q: 'What is the Synaptic A220?',
        a: "The Synaptic A220 is a high-fidelity simulation of the Airbus A220 (formerly Bombardier C-Series) for Microsoft Flight Simulator 2020 and 2024.",
      },
      {
        q: 'How much will it cost?',
        a: 'Pricing will be announced closer to release. Follow our Discord and social channels for official announcements.',
      },
      {
        q: 'Which variant of the A220 is being modelled?',
        a: 'Our release variant is the Synaptic A220-300. The Synaptic A220-100 and Synaptic A220 ACJ will be released after the A220-300 launch.',
      },
      {
        q: 'Will there be liveries?',
        a: <span>Yes, in conjunction with the {iniLink} livery team, we plan to ship a selection of real-world airline liveries at launch.</span>,
      },
    ],
  },
  {
    category: 'Development & Release',
    items: [
      {
        q: 'When will the Synaptic A220 be released?',
        a: "The Synaptic A220 is planned for release in summer of 2026.",
      },
      {
        q: 'Why has development taken this long?',
        a: 'The Synaptic team has rebuilt the 3D model with incredible accuracy from the ground up over the past few years, and all core aircraft systems have been rewritten to achieve our standards for accuracy and performance.',
      },
      {
        q: "What is the team's relationship with iniBuilds?",
        a: <span>{iniLink} are our publishing partner for the Synaptic A220. They are also responsible for the animations, textures, sounds (in collaboration with Echo19), and EFB for the Synaptic A220.</span>,
      },
      {
        q: 'Will there be Hoppie integration?',
        a: 'We are not planning to support Hoppie. One of our developers is working with the major networks and aircraft developers to create a new CPDLC standard which we will be implementing instead.',
      },
    ],
  },
  {
    category: 'Technical',
    items: [
      {
        q: 'What platforms is the A220 built for?',
        a: "The aircraft is being developed for Microsoft Flight Simulator 2020 and Microsoft Flight Simulator 2024. It is not currently planned for X-Plane or Prepar3D.",
      },
      {
        q: 'What programming languages and tools are used?',
        a: "The project uses TypeScript and Rust as its primary languages. Custom tooling includes Mach (a MSFS instrument bundler) and ACE (the Advanced Cockpit Emulator), developed in-house and available on GitHub.",
      },
      {
        q: 'How can I get involved with the community?',
        a: 'Join the Discord server! It\'s the best place to connect with the team and fellow community members, ask questions, and stay up to date with development progress.',
      },

    ],
  },
  {
    category: 'Community',
    items: [
      {
        q: 'Where can I follow development?',
        a: <span>Our primary channel to follow development is the <a href="https://discord.gg/synaptic" target="_blank" rel="noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors">Synaptic Discord server</a>. Development updates, live demos, and announcements are also posted on <a href="https://www.instagram.com/synapticsim/" target="_blank" rel="noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors">Instagram</a>, <a href="https://youtube.com/@SynapticSimulations" target="_blank" rel="noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors">YouTube</a>, and <a href="https://twitter.com/SynapticSim" target="_blank" rel="noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors">Twitter</a>.</span>,
      },

    ],
  },
];

export default function FAQPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(61,21,237,0.13),transparent)]" />
        <div className="section-container relative z-10 text-center">
          <p className="text-violet-400 font-medium text-sm uppercase tracking-widest mb-4">
            Got questions?
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-text mb-6">
            FAQ
          </h1>
          <p className="text-xl text-white/60 max-w-xl mx-auto">
            Answers to the most common questions about Synaptic Simulations and the Synaptic A220 project.
          </p>
        </div>
      </section>

      {/* FAQ sections */}
      <div className="section-container pb-24">
        <div className="max-w-3xl mx-auto space-y-16">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-6">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <details
                    key={item.q}
                    className="card-surface group cursor-pointer"
                  >
                    <summary className="flex items-start justify-between gap-4 p-6 select-none list-none">
                      <span className="font-medium text-white">{item.q}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0 text-white/30 mt-0.5 transition-transform group-open:rotate-45"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </summary>
                    <div className="px-6 pb-6">
                      <div className="text-white/60 leading-relaxed text-sm border-t border-white/10 pt-4">{item.a}</div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="max-w-3xl mx-auto mt-20 card-surface p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Still have questions?</h3>
          <p className="text-white/50 text-sm mb-6 max-w-sm mx-auto">
            Join our Discord — the community and team are friendly and happy to help with anything not covered here.
          </p>
          <a href="https://discord.gg/synaptic" target="_blank" rel="noreferrer" className="btn-primary">
            Ask on Discord
          </a>
        </div>
      </div>
    </div>
  );
}
