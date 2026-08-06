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

  // Phase 0 (0–12%):   dead zone — nothing moves
  // Phase 1 (12–50%):  video zooms out, UI stays put
  // Phase 2 (50–88%):  video plays, UI animates in
  // Phase 3 (88–100%): dead zone — everything frozen at final state

  const zoomProgress = clamp((progress - 0.12) / 0.38, 0, 1);
  const videoScale = lerp(1.75, 1.0, easeInOutCubic(zoomProgress));

  const uiProgress = clamp((progress - 0.50) / 0.38, 0, 1);
  const uiEased = easeInOutCubic(uiProgress);

  const scale = lerp(0.44, 1.05, uiEased);
  const glowOpacity = lerp(0.05, 0.82, uiEased);
  const subOpacity = clamp((uiProgress - 0.4) / 0.35, 0, 1);
  const scrollHintOpacity = clamp(1 - progress * 7, 0, 1);

  // Sync video currentTime to scroll progress — only play first half of the clip
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const sync = () => {
      if (video.readyState >= 2 && video.duration) {
        video.currentTime = clamp((progress - 0.50) / 0.38, 0, 1) * (video.duration * 0.5);
        video.pause();
      }
    };
    sync();
    // If metadata not loaded yet, retry when it is
    video.addEventListener('loadedmetadata', sync, { once: true });
    return () => video.removeEventListener('loadedmetadata', sync);
  }, [progress]);

  // Wordmark fades in when phase 2 starts
  const wordmarkOpacity = clamp(uiProgress / 0.4, 0, 1);

  return (
    <div ref={containerRef} style={{ height: '320vh' }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-black flex items-center justify-center">
        {/* Scroll-scrubbed plane video */}
        <video
          ref={videoRef}
          src="/plane-spin.mov"
          preload="auto"
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-contain md:object-cover pointer-events-none"
          style={{ opacity: lerp(0.59, 0.82, uiEased), filter: `brightness(${lerp(1.69, 2.6, uiEased)}) contrast(1.05)`, transform: `scale(${videoScale})`, transformOrigin: '50% 45%', willChange: 'transform' }}
        />

        {/* Soft edge vignette — no ring, just feathered darkness */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: glowOpacity,
            background:
              'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 45%, rgba(2,2,10,0.75) 100%)',
          }}
        />
        {/* Bottom bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: glowOpacity,
            background:
              'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(61,21,237,0.35), transparent 65%)',
          }}
        />
        {/* Left bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: glowOpacity * 0.5,
            background:
              'radial-gradient(ellipse 40% 70% at 0% 60%, rgba(61,21,237,0.4), transparent 70%)',
          }}
        />
        {/* Right bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: glowOpacity * 0.5,
            background:
              'radial-gradient(ellipse 40% 70% at 100% 60%, rgba(102,0,159,0.4), transparent 70%)',
          }}
        />

        {/* Zooming content */}
        <div
          className="flex flex-col items-center select-none"
          style={{ transform: `scale(${scale})`, willChange: 'transform' }}
        >
          {/* Wordmark — drifts in from above, sits above the plane */}
          <div
            className="flex flex-col items-center"
            style={{ transform: `translateY(${lerp(-200, -160, uiEased)}px)` }}
          >
            {/* Wordmark */}
            <div
              className="leading-none font-black tracking-tighter text-center select-none"
              style={{
                fontSize: 'clamp(40px, 7.5vw, 110px)',
                paddingBottom: '0.15em',
                background: 'linear-gradient(158deg, #ffffff 22%, rgba(190,160,255,0.88) 60%, rgba(200,104,235,0.82) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                opacity: wordmarkOpacity,
              }}
            >
              Synaptic A220
            </div>
          </div>

          {/* Tagline + status — drift up from below, sits under the plane */}
          <div
            className="flex flex-col items-center"
            style={{ transform: `translateY(${lerp(200, 140, uiEased)}px)` }}
          >
            {/* Tagline — fades in mid-scroll */}
            <div
              className="leading-none font-black tracking-tighter text-center"
              style={{
                fontSize: 'clamp(16px, 2.2vw, 38px)',
                paddingBottom: '0.15em',
                background: 'linear-gradient(158deg, #ffffff 22%, rgba(190,160,255,0.88) 60%, rgba(200,104,235,0.82) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                opacity: subOpacity,
                transform: `translateY(${lerp(16, 0, subOpacity)}px)`,
              }}
            >
              For Microsoft Flight Simulator 2020 &amp; 2024
            </div>

            {/* Status — outer wrapper controls fade/translate, inner controls pulse */}
            <div
              className="mt-4"
              style={{
                opacity: subOpacity,
                transform: `translateY(${lerp(10, 0, subOpacity)}px)`,
              }}
            >
              <div
                className="font-black tracking-tighter text-center"
                style={{
                  fontSize: 'clamp(16px, 2.2vw, 36px)',
                  paddingBottom: '0.15em',
                  background: 'linear-gradient(158deg, rgba(150,100,255,0.9) 0%, rgba(200,104,235,0.95) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmerPulse 2.2s ease-in-out infinite',
                }}
              >
                Available Now
              </div>
              <div
                className="mt-2 text-center text-white/40 font-medium tracking-wide"
                style={{
                  fontSize: 'clamp(11px, 1.4vw, 16px)',
                  opacity: subOpacity,
                }}
              >
                Exclusively on the Microsoft Flight Simulator Marketplace
              </div>
            </div>
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
      className={`pt-36 pb-16 relative overflow-hidden transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      {/* Giant watermark text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-black tracking-tighter whitespace-nowrap"
          style={{
            fontSize: 'clamp(120px, 22vw, 340px)',
            background: 'linear-gradient(180deg, rgba(61,21,237,0.12) 0%, transparent 80%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >A220</span>
      </div>
      <div className="section-container text-center relative z-10">
        <h2
          className="font-black tracking-tight mx-auto leading-[1.1]"
          style={{
            fontSize: 'clamp(32px, 5.5vw, 80px)',
            maxWidth: '900px',
            paddingBottom: '0.1em',
            background: 'linear-gradient(160deg, #ffffff 25%, rgba(210,170,255,0.9) 60%, rgba(180,100,255,0.85) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          The most detailed A220<br />simulation ever built for<br />Microsoft Flight Simulator
        </h2>
      </div>
    </section>
  );
}

// ─── Trailer section ──────────────────────────────────────────────────────────

function TrailerSection() {
  const { ref, visible } = useFadeIn();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`pt-8 pb-24 relative transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="section-container">
        <div
          className="relative w-full mx-auto rounded-2xl overflow-hidden"
          style={{
            maxWidth: '960px',
            aspectRatio: '16 / 9',
            boxShadow: '0 0 80px rgba(61, 21, 237, 0.25), 0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/2eU2yiqG690?rel=0&modestbranding=1&color=white"
            title="Synaptic A220 — Definitive Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      </div>
    </section>
  );
}

// ─── Feature list ─────────────────────────────────────────────────────────────

const featureItems = [
  'Custom Flight Management System',
  'Custom Fly-By-Wire System',
  'Faithful Proline Fusion Avionics',
  'Customizable Electronic Checklists',
  'Modeling of Systems Component Connections',
  'SimBrief & MSFS EFB Uplink',
  'Graphical Flight Planning',
];

function FeatureListSection() {
  const { ref, visible } = useFadeIn();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`pb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-4xl mx-auto">
          {featureItems.map((feature, i) => (
            <div
              key={feature}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 hover:bg-white/[0.03]"
              style={{
                border: '1px solid rgba(255,255,255,0.07)',
                transitionDelay: `${i * 25}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(6px)',
                transition: `opacity 0.5s ease ${i * 25}ms, transform 0.5s ease ${i * 25}ms, background 0.2s ease`,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                <circle cx="12" cy="12" r="10" stroke="rgba(139,92,246,0.4)" strokeWidth="1.5"/>
                <polyline points="8 12 11 15 16 9" stroke="rgba(139,92,246,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-white/70 text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Showcase section ─────────────────────────────────────────────────────────

const screenshotFiles: string[] = [
  '1.png', '2.png', '3.png', '4.png', '5.png', '6.png',
  '7.png', '8.png', '9.png', '10.png', '11.png', '12.png',
  '13.png', '14.png', '15.png', '16.png', '17.png', '18.png',
  '19.png', '20.png', '21.png', '22.png', '23.png', '24.png',
  '25.png', '26.png', '27.png', '28.png', '29.png', '30.png',
  'image.png', '4 (2).png',
];

function ShowcaseSection() {
  const { ref, visible: sectionVisible } = useFadeIn();
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const INITIAL_COUNT = 10;
  const displayedFiles = expanded ? screenshotFiles : screenshotFiles.slice(0, INITIAL_COUNT);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => i === null ? null : (i + 1) % screenshotFiles.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => i === null ? null : (i - 1 + screenshotFiles.length) % screenshotFiles.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex]);

  return (
    <>
      <section
        ref={ref as React.RefObject<HTMLElement>}
      className={`py-16 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ borderTop: '1px solid transparent', borderImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent) 1' }}
      >
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedFiles.map((file, idx) => (
              <div
                key={file}
                className={`relative group cursor-pointer rounded-xl overflow-hidden ${idx === 0 ? 'md:col-span-2 lg:col-span-3' : ''}`}
                onClick={() => setLightboxIndex(screenshotFiles.indexOf(file))}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/screenshots/${encodeURIComponent(file)}`}
                  alt=""
                  className="w-full aspect-video object-cover block transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-full p-3 backdrop-blur-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                      <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                    </svg>
                  </div>
                </div>
                {/* S logo watermark */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.svg"
                  alt=""
                  aria-hidden="true"
                  className="absolute bottom-2.5 left-2.5 w-5 opacity-40 pointer-events-none select-none"
                />
              </div>
            ))}
          </div>

          {/* Bottom fade + expand */}
          <div className="relative">
            {!expanded && screenshotFiles.length > INITIAL_COUNT && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setExpanded(true)}
                  className="inline-flex items-center gap-2.5 border border-white/12 text-white/60 hover:text-white hover:border-white/30 font-medium text-sm px-6 py-3 rounded-lg transition-all duration-200 hover:bg-white/5"
                >
                  View all {screenshotFiles.length} screenshots
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.95)', animation: 'fadeInScale 0.2s ease' }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Main image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/screenshots/${encodeURIComponent(screenshotFiles[lightboxIndex])}`}
            alt=""
            className="max-h-[80vh] max-w-[88vw] object-contain rounded-xl"
            style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 32px 80px rgba(0,0,0,0.8)', animation: 'fadeInUp 0.25s ease' }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Close */}
          <button
            className="absolute top-5 right-6 text-white/40 hover:text-white transition-colors w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-3 rounded-full hover:bg-white/8"
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + screenshotFiles.length) % screenshotFiles.length); }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-3 rounded-full hover:bg-white/8"
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % screenshotFiles.length); }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          {/* Thumbnail filmstrip */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const half = 3;
              const start = Math.max(0, Math.min(lightboxIndex - half, screenshotFiles.length - (half * 2 + 1)));
              return screenshotFiles.slice(start, start + half * 2 + 1).map((f, i) => {
                const actualIdx = start + i;
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={f}
                    src={`/screenshots/${encodeURIComponent(f)}`}
                    alt=""
                    onClick={() => setLightboxIndex(actualIdx)}
                    className="object-cover rounded cursor-pointer flex-shrink-0 transition-all duration-200"
                    style={{
                      width: actualIdx === lightboxIndex ? 64 : 48,
                      height: actualIdx === lightboxIndex ? 40 : 30,
                      opacity: actualIdx === lightboxIndex ? 1 : 0.4,
                      outline: actualIdx === lightboxIndex ? '2px solid rgba(139,92,246,0.8)' : 'none',
                      outlineOffset: '2px',
                    }}
                  />
                );
              });
            })()}
          </div>

          {/* Counter */}
          <p className="absolute top-5 left-1/2 -translate-x-1/2 text-white/25 text-xs tabular-nums">
            {lightboxIndex + 1} / {screenshotFiles.length}
          </p>
        </div>
      )}
    </>
  );
}

// ─── Community section ────────────────────────────────────────────────────────

const platforms = [
  {
    name: 'Discord',
    description: 'Join 20,000+ community members. Development updates, screenshots, and a direct channel with the Synaptic team.',
    href: 'https://discord.gg/synaptic',
    stat: '20,000+ Members',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942.0209-.0407.0098-.0895-.0321-.1195-.6519-.2476-1.2754-.5495-1.8784-.8874a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    description: 'Screenshots, behind-the-scenes previews, and visual development updates.',
    href: 'https://www.instagram.com/synapticsim/',
    stat: '@synapticsim',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
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
      className={`pt-16 pb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ borderTop: '1px solid transparent', borderImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent) 1' }}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.09)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(61,21,237,0.07)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(61,21,237,0.3)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(61,21,237,0.12), inset 0 0 0 1px rgba(61,21,237,0.15)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
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

// ─── Export ───────────────────────────────────────────────────────────────────

export function HomePageClient() {
  return (
    <div className="pt-16">
      <ScrollZoomHero />
      <StatementSection />
      <TrailerSection />
      <FeatureListSection />
      <ShowcaseSection />
      <CommunitySection />
    </div>
  );
}
