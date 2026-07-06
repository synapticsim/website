'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// ─── Utilities ───────────────────────────────────────────────────────────────

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(clamp(scrolled / scrollable, 0, 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);
  return progress;
}

function useFadeIn(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Scroll Zoom Hero ─────────────────────────────────────────────────────────

function ScrollZoomHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progress = useScrollProgress(containerRef);
  const eased = easeInOutCubic(progress);

  const scale = lerp(0.44, 1.05, eased);
  const glowOpacity = lerp(0.05, 0.82, eased);
  const subOpacity = clamp((progress - 0.3) / 0.3, 0, 1);
  const scrollHintOpacity = clamp(1 - progress * 7, 0, 1);
  const logoGlowBlur = lerp(8, 48, eased);
  const logoGlowAlpha = lerp(0.2, 0.9, eased);

  // Sync video currentTime to scroll progress — only play first half of the clip
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const sync = () => {
      if (video.readyState >= 2 && video.duration) {
        video.currentTime = progress * (video.duration * 0.5);
      }
    };
    sync();
    // If metadata not loaded yet, retry when it is
    video.addEventListener('loadedmetadata', sync, { once: true });
    return () => video.removeEventListener('loadedmetadata', sync);
  }, [progress]);

  // Wordmark starts nearly invisible, becomes fully opaque as scroll nears end
  const wordmarkOpacity = lerp(0.08, 1, eased);

  return (
    <div ref={containerRef} style={{ height: '320vh' }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-black flex items-center justify-center">
        {/* Scroll-scrubbed plane video */}
        <video
          ref={videoRef}
          src="/plane-spin.mov"
          preload="auto"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: 0.52, filter: 'brightness(1.5) contrast(1.1)' }}
        />

        {/* Halo ring — transparent center, soft glow at outer band */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: glowOpacity * 0.7,
            background:
              'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 42%, rgba(61,21,237,0.45) 66%, rgba(102,0,159,0.28) 82%, transparent 100%)',
          }}
        />
        {/* Left edge glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: glowOpacity * 0.63,
            background:
              'radial-gradient(ellipse 32% 80% at 0% 50%, rgba(61,21,237,0.6), transparent 75%)',
          }}
        />
        {/* Right edge glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: glowOpacity * 0.63,
            background:
              'radial-gradient(ellipse 32% 80% at 100% 50%, rgba(102,0,159,0.55), transparent 75%)',
          }}
        />

        {/* Zooming content */}
        <div
          className="flex flex-col items-center select-none"
          style={{ transform: `scale(${scale})`, willChange: 'transform' }}
        >
          {/* S logo mark + label — drift upward as scroll progresses */}
          <div
            className="flex flex-col items-center"
            style={{ transform: `translateY(${lerp(-140, -60, eased)}px)` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Synaptic Simulations"
              width={68}
              height={110}
              className="mb-7"
              style={{
                filter: `drop-shadow(0 0 ${logoGlowBlur}px rgba(61,21,237,${logoGlowAlpha}))`,
              }}
            />
            {/* Company name */}
            <p className="text-sm font-bold tracking-tight text-white mb-4">
              Synaptic Simulations
            </p>
          </div>

          {/* Main wordmark + tagline/badge — drift downward */}
          <div
            className="flex flex-col items-center"
            style={{ transform: `translateY(${lerp(160, 60, eased)}px)` }}
          >
            {/* Wordmark */}
            <div
              className="leading-none font-black tracking-tighter text-center pb-3"
              style={{
                fontSize: 'clamp(52px, 10vw, 152px)',
                background: 'linear-gradient(158deg, #ffffff 22%, rgba(190,160,255,0.88) 60%, rgba(200,104,235,0.82) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                opacity: wordmarkOpacity,
                filter: `drop-shadow(0 0 ${lerp(28, 0, eased)}px rgba(120,40,255,${lerp(0.9, 0, eased)})) drop-shadow(0 0 ${lerp(52, 0, eased)}px rgba(102,0,159,${lerp(0.5, 0, eased)}))`,
              }}
            >
              Synaptic A220
            </div>

            {/* Tagline — fades in mid-scroll */}
            <p
              className="mt-6 text-center text-white/50 font-light"
              style={{
                fontSize: 'clamp(14px, 1.8vw, 22px)',
                maxWidth: '520px',
                opacity: subOpacity,
                transform: `translateY(${lerp(16, 0, subOpacity)}px)`,
              }}
            >
              For Microsoft Flight Simulator 2020 &amp; 2024
            </p>

            {/* Status */}
            <p
              className="mt-5 text-sm text-violet-400/70 font-medium tracking-widest uppercase"
              style={{
                opacity: subOpacity,
                transform: `translateY(${lerp(10, 0, subOpacity)}px)`,
              }}
            >
              Coming 2026
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{ opacity: scrollHintOpacity }}
        >
          <span className="text-[11px] uppercase tracking-[0.35em] text-white/40 font-medium">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          {/* Three staggered animated chevrons */}
          {[0, 1, 2].map((i) => (
            <svg
              key={i}
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="text-white/50 -mt-2"
              style={{ animation: `scrollChevron 1.4s ease-in-out ${i * 0.22}s infinite` }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Statement ────────────────────────────────────────────────────────────────

function StatementSection() {
  const { ref, visible } = useFadeIn();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-32 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="section-container text-center">
        <p className="text-sm font-bold tracking-tight text-white mb-6">
          Synaptic Simulations
        </p>
        <h2
          className="font-black tracking-tight mx-auto leading-[1.07]"
          style={{
            fontSize: 'clamp(28px, 4.2vw, 64px)',
            maxWidth: '820px',
            background: 'linear-gradient(155deg, #ffffff 28%, rgba(200,160,255,0.84) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          The most detailed A220<br />
          simulation ever built for<br />
          Microsoft Flight Simulator
        </h2>
      </div>
    </section>
  );
}

// ─── Stats strip ──────────────────────────────────────────────────────────────

function StatsStrip() {
  const { ref, visible } = useFadeIn();
  const stats = [
    { value: '20,000+', label: 'Discord Members' },
    { value: '4+', label: 'Years in Development' },
    { value: 'MSFS 2020', label: 'Platform' },
    { value: 'MSFS 2024', label: 'Platform' },
    { value: 'CAT III', label: 'Autoland' },
    { value: 'Custom FBW', label: 'Fly-By-Wire' },
  ];
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`py-12 border-t border-b transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="section-container">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((s) => (
            <div key={s.label + s.value} className="text-center">
              <p className="text-white font-semibold text-sm">{s.value}</p>
              <p className="text-white/35 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Feature section ──────────────────────────────────────────────────────────

function FeatureSection({
  eyebrow, headline, body, side = 'left', icon,
}: {
  eyebrow: string;
  headline: string;
  body: string;
  side?: 'left' | 'right';
  icon: React.ReactNode;
}) {
  const { ref, visible } = useFadeIn();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-28 border-t transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="section-container">
        <div className={`flex flex-col gap-16 items-center ${side === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
          {/* Icon orb */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div
              className="w-44 h-44 rounded-[2.5rem] flex items-center justify-center text-violet-400"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(61,21,237,0.18), rgba(102,0,159,0.09) 60%, transparent)',
                boxShadow: '0 0 80px rgba(61,21,237,0.14), inset 0 0 40px rgba(61,21,237,0.07)',
                border: '1px solid rgba(61,21,237,0.22)',
              }}
            >
              {icon}
            </div>
          </div>
          {/* Text */}
          <div className="w-full md:w-1/2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-400 mb-5">{eyebrow}</p>
            <h2
              className="font-black tracking-tight mb-6 leading-[1.06] whitespace-pre-line"
              style={{
                fontSize: 'clamp(32px, 4.2vw, 60px)',
                background: 'linear-gradient(140deg, #ffffff 38%, rgba(186,152,255,0.82) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {headline}
            </h2>
            <p className="text-white/52 text-lg leading-relaxed">{body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── A220 CTA section ─────────────────────────────────────────────────────────

function A220CTASection() {
  const { ref, visible } = useFadeIn();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-28 border-t transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Visual */}
          <div className="w-full md:w-1/2">
            <div
              className="relative rounded-2xl overflow-hidden aspect-video flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(61,21,237,0.12), rgba(102,0,159,0.06) 50%, transparent 72%)',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="" aria-hidden="true" width={90} height={146} className="opacity-[0.07]" />
              </div>
              <div className="relative z-10 text-center">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="mx-auto mb-3">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="rgba(255,255,255,0.07)"/>
                </svg>
                <p className="text-white/18 text-xs">Screenshots coming soon</p>
              </div>
              <div
                className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg px-3 py-1.5"
                style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#3D15ED] animate-pulse" />
                <span className="text-xs text-white/50">Final testing — 2026</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-400 mb-5">The aircraft</p>
            <h2
              className="font-black tracking-tight mb-6 leading-[1.06]"
              style={{
                fontSize: 'clamp(32px, 4vw, 56px)',
                background: 'linear-gradient(140deg, #ffffff 38%, rgba(186,152,255,0.82) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Synaptic A220.
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Years in development. Custom FMS, fly-by-wire, full avionics suite, and every aircraft system
              built from the ground up — no defaults, no shortcuts.
            </p>
            <a href="https://discord.gg/synaptic" target="_blank" rel="noreferrer" className="btn-primary">
              Join Discord
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Community section ────────────────────────────────────────────────────────

const platforms = [
  {
    name: 'Discord',
    description: 'Join 20,000+ community members. Development updates, screenshots, and direct team access.',
    href: 'https://discord.gg/synaptic',
    stat: '20,000+ Members',
    icon: (
      <svg width="22" height="22" viewBox="0 0 15 15" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M5.07451 1.82584C5.03267 1.81926 4.99014 1.81825 4.94803 1.82284C4.10683 1.91446 2.82673 2.36828 2.07115 2.77808C2.02106 2.80525 1.97621 2.84112 1.93869 2.88402C1.62502 3.24266 1.34046 3.82836 1.11706 4.38186C0.887447 4.95076 0.697293 5.55032 0.588937 5.98354C0.236232 7.39369 0.042502 9.08728 0.0174948 10.6925C0.0162429 10.7729 0.0351883 10.8523 0.0725931 10.9234C0.373679 11.496 1.02015 12.027 1.66809 12.4152C2.32332 12.8078 3.08732 13.1182 3.70385 13.1778C3.85335 13.1922 4.00098 13.1358 4.10282 13.0255C4.2572 12.8581 4.5193 12.4676 4.71745 12.1643C4.80739 12.0267 4.89157 11.8953 4.95845 11.7901C5.62023 11.9106 6.45043 11.9801 7.50002 11.9801C8.54844 11.9801 9.37796 11.9107 10.0394 11.7905C10.1062 11.8957 10.1903 12.0269 10.2801 12.1643C10.4783 12.4676 10.7404 12.8581 10.8947 13.0255C10.9966 13.1358 11.1442 13.1922 11.2937 13.1778C11.9102 13.1182 12.6742 12.8078 13.3295 12.4152C13.9774 12.027 14.6239 11.496 14.925 10.9234C14.9624 10.8523 14.9813 10.7729 14.9801 10.6925C14.9551 9.08728 14.7613 7.39369 14.4086 5.98354C14.3003 5.55032 14.1101 4.95076 13.8805 4.38186C13.6571 3.82836 13.3725 3.24266 13.0589 2.88402C13.0214 2.84112 12.9765 2.80525 12.9264 2.77808C12.1708 2.36828 10.8907 1.91446 10.0495 1.82284C10.0074 1.81825 9.96489 1.81926 9.92305 1.82584C9.71676 1.85825 9.5391 1.96458 9.40809 2.06355C9.26977 2.16804 9.1413 2.29668 9.0304 2.42682C8.86968 2.61544 8.7143 2.84488 8.61428 3.06225C8.27237 3.03501 7.90138 3.02 7.5 3.02C7.0977 3.02 6.72593 3.03508 6.38337 3.06244C6.28328 2.84501 6.12792 2.61549 5.96716 2.42682C5.85626 2.29668 5.72778 2.16804 5.58947 2.06355C5.45846 1.96458 5.2808 1.85825 5.07451 1.82584Z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    description: 'Live development showcases, feature deep-dives, Q&A sessions, and progress recordings.',
    href: 'https://youtube.com/@SynapticSimulations',
    stat: 'Live Showcases',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    description: 'Track development progress and explore our tooling projects on GitHub.',
    href: 'https://github.com/synapticsim',
    stat: '14 Public Repos',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
];

function CommunitySection() {
  const { ref, visible } = useFadeIn();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-28 border-t transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-400 mb-4">Follow along</p>
          <h2
            className="font-black tracking-tight"
            style={{
              fontSize: 'clamp(32px, 4vw, 54px)',
              background: 'linear-gradient(140deg, #ffffff 38%, rgba(186,152,255,0.82) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Join the Community
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(61,21,237,0.1)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(61,21,237,0.22)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
              }}
            >
              <div className="text-white/50 group-hover:text-white transition-colors mb-5">{p.icon}</div>
              <h3 className="font-semibold text-white text-xl mb-2">{p.name}</h3>
              <p className="text-white/38 text-sm leading-relaxed mb-6">{p.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-violet-400 font-medium">{p.stat}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/25 group-hover:text-white/55 group-hover:translate-x-1 transition-all">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  const { ref, visible } = useFadeIn();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-36 border-t transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="section-container text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="" aria-hidden="true" width={38} height={62} className="mx-auto mb-8 opacity-40" />
        <h2
          className="font-black tracking-tight mb-5"
          style={{
            fontSize: 'clamp(30px, 3.8vw, 52px)',
            background: 'linear-gradient(140deg, #ffffff 38%, rgba(186,152,255,0.82) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Follow Every Step of Development
        </h2>
        <p className="text-white/42 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
          Join our Discord for the latest showcases, announcements, and direct access to the Synaptic team.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="https://discord.gg/synaptic" target="_blank" rel="noreferrer" className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 15 15" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.07451 1.82584C5.03267 1.81926 4.99014 1.81825 4.94803 1.82284C4.10683 1.91446 2.82673 2.36828 2.07115 2.77808C2.02106 2.80525 1.97621 2.84112 1.93869 2.88402C1.62502 3.24266 1.34046 3.82836 1.11706 4.38186C0.887447 4.95076 0.697293 5.55032 0.588937 5.98354C0.236232 7.39369 0.042502 9.08728 0.0174948 10.6925C0.0162429 10.7729 0.0351883 10.8523 0.0725931 10.9234C0.373679 11.496 1.02015 12.027 1.66809 12.4152C2.32332 12.8078 3.08732 13.1182 3.70385 13.1778C3.85335 13.1922 4.00098 13.1358 4.10282 13.0255C4.2572 12.8581 4.5193 12.4676 4.71745 12.1643C4.80739 12.0267 4.89157 11.8953 4.95845 11.7901C5.62023 11.9106 6.45043 11.9801 7.50002 11.9801C8.54844 11.9801 9.37796 11.9107 10.0394 11.7905C10.1062 11.8957 10.1903 12.0269 10.2801 12.1643C10.4783 12.4676 10.7404 12.8581 10.8947 13.0255C10.9966 13.1358 11.1442 13.1922 11.2937 13.1778C11.9102 13.1182 12.6742 12.8078 13.3295 12.4152C13.9774 12.027 14.6239 11.496 14.925 10.9234C14.9624 10.8523 14.9813 10.7729 14.9801 10.6925C14.9551 9.08728 14.7613 7.39369 14.4086 5.98354C14.3003 5.55032 14.1101 4.95076 13.8805 4.38186C13.6571 3.82836 13.3725 3.24266 13.0589 2.88402C13.0214 2.84112 12.9765 2.80525 12.9264 2.77808C12.1708 2.36828 10.8907 1.91446 10.0495 1.82284C10.0074 1.81825 9.96489 1.81926 9.92305 1.82584C9.71676 1.85825 9.5391 1.96458 9.40809 2.06355C9.26977 2.16804 9.1413 2.29668 9.0304 2.42682C8.86968 2.61544 8.7143 2.84488 8.61428 3.06225C8.27237 3.03501 7.90138 3.02 7.5 3.02C7.0977 3.02 6.72593 3.03508 6.38337 3.06244C6.28328 2.84501 6.12792 2.61549 5.96716 2.42682C5.85626 2.29668 5.72778 2.16804 5.58947 2.06355C5.45846 1.96458 5.2808 1.85825 5.07451 1.82584Z" />
        </svg>
            Join Discord
          </a>
          <a href="https://youtube.com/@SynapticSimulations" target="_blank" rel="noreferrer" className="btn-secondary">
            Watch on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Feature data ─────────────────────────────────────────────────────────────

const features: {
  eyebrow: string;
  headline: string;
  body: string;
  side: 'left' | 'right';
  icon: React.ReactNode;
}[] = [
  {
    eyebrow: 'Custom FMS',
    headline: 'Real-world\nflight planning.',
    body: 'A fully custom Flight Management Computer with SID/STAR procedures, constraint-based VNAV, lateral navigation, and real-world performance calculations — built entirely from scratch.',
    side: 'left',
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    eyebrow: 'Interactive Cockpit',
    headline: 'Every switch.\nEvery knob.',
    body: 'Built on the Advanced Cockpit Emulator (ACE) — every button, toggle, and rotary behaves exactly as on the real A220. Nothing is decorative.',
    side: 'right',
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    eyebrow: 'Aircraft Systems',
    headline: 'No defaults.\nNo shortcuts.',
    body: 'Hydraulics, pneumatics, electrical, pressurisation, and fuel systems — all modelled from documentation, with no simulator defaults used anywhere in the chain.',
    side: 'left',
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    eyebrow: 'Dual Platform',
    headline: 'MSFS 2020\nand 2024.',
    body: 'Native compatibility with both Microsoft Flight Simulator 2020 and 2024 — optimised for each platform from the ground up.',
    side: 'right',
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────

export function HomePageClient() {
  return (
    <div className="pt-16">
      <ScrollZoomHero />
      <StatementSection />
      <StatsStrip />
      {features.map((f) => (
        <FeatureSection key={f.eyebrow} {...f} />
      ))}
      <A220CTASection />
      <CommunitySection />
      <FinalCTA />
    </div>
  );
}
