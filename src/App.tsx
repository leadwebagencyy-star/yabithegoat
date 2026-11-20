import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, Disc3, Pause, Play, Volume2 } from 'lucide-react';
import {
  HERO_ARTIST_IMAGE,
  HERO_FALLBACK_IMAGE,
  PROOF_METRICS,
  TRACKS,
  VISUAL_FRAMES,
  TrackItem,
  VisualFrame,
} from './data/yabiData';
import { yabiAudio } from './utils/audioEngine';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Header } from './components/Header';
import { DistortedText } from './components/DistortedText';
import { ResilientImage } from './components/ResilientImage';
import { StorySection } from './components/StorySection';
import { ConnectSection } from './components/ConnectSection';
import { MediaModal, ModalTab } from './components/MediaModal';

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const heroVisualRef = useRef<HTMLDivElement | null>(null);

  const [activeTrack, setActiveTrack] = useState<TrackItem>(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<ModalTab>('audio');
  const [activeVisual, setActiveVisual] = useState<VisualFrame | null>(null);

  // Subtle parallax on hero portrait (compositor-only transform)
  const { scrollYProgress } = useScroll({
    target: heroVisualRef,
    offset: ['start start', 'end start'],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    return () => {
      yabiAudio.stop();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'top') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const el = document.getElementById(sectionId);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -64 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTrack = (track: TrackItem, startPlayback = true) => {
    setActiveTrack(track);
    if (startPlayback) {
      yabiAudio.start(track);
      setIsPlaying(true);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      yabiAudio.stop();
      setIsPlaying(false);
    } else {
      yabiAudio.start(activeTrack);
      setIsPlaying(true);
    }
  };

  const openTrackModal = (track: TrackItem, tab: ModalTab = 'audio') => {
    setActiveVisual(null);
    setActiveTrack(track);
    setModalTab(tab);
    setModalOpen(true);
    if (tab === 'audio') {
      yabiAudio.start(track);
      setIsPlaying(true);
    } else {
      yabiAudio.stop();
      setIsPlaying(false);
    }
  };

  const openVisualModal = (visual: VisualFrame) => {
    yabiAudio.stop();
    setIsPlaying(false);
    setActiveVisual(visual);
    setModalTab('youtube');
    setModalOpen(true);
  };

  return (
    <div id="top" className="relative min-h-screen bg-[#050505] text-[#F4F2EE]">
      {/* Subtle analog film grain overlay */}
      <div aria-hidden="true" className="film-grain fixed inset-0 z-30" />

      <Preloader />
      <CustomCursor />

      <Header onNavigate={scrollToSection} />

      <main>
        {/* HERO SPLIT */}
        <section className="mx-auto max-w-[1440px] px-6 pt-10 pb-14 md:px-10 md:pt-14 md:pb-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-stretch">
            {/* Left typographic column */}
            <div className="lg:col-span-7 flex flex-col justify-between py-2">
              <div>
                <p className="font-mono text-xs font-medium text-[#B8BDC7] tracking-wide">
                  Artist · Nepal · Creative Direction 01
                </p>

                <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight text-[#F4F2EE] sm:text-7xl xl:text-[5.5rem] leading-[0.94] text-balance">
                  <DistortedText text="YABI" />
                  <br />
                  <span className="text-[#B8BDC7]">
                    <DistortedText text="THE G.O.A.T" accentDot />
                  </span>
                </h1>

                <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#B8BDC7] sm:text-xl">
                  Independent sound. Unfiltered identity. Modern Nepali hip-hop forged in Far-Western roots with international ambition.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
                <button
                  type="button"
                  data-cursor="LISTEN"
                  onClick={() => openTrackModal(TRACKS[0], 'audio')}
                  className="inline-flex items-center gap-2.5 rounded-md bg-[#FF1E2D] px-6 py-3.5 text-sm font-semibold text-[#FAFAFA] transition-colors duration-150 hover:bg-[#E01524] whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
                >
                  <span>Listen to Boomerang</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('releases')}
                  className="inline-flex items-center gap-2 py-2 text-sm font-medium text-[#B8BDC7] hover:text-[#F4F2EE] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
                >
                  <span>Scroll to explore</span>
                  <ArrowDown className="h-4 w-4 text-[#FF1E2D]" />
                </button>
              </div>
            </div>

            {/* Right full-height artist visual */}
            <div ref={heroVisualRef} className="lg:col-span-5">
              <div
                data-cursor="EXPLORE"
                onClick={() => scrollToSection('story')}
                className="group relative h-[420px] sm:h-[520px] lg:h-full lg:min-h-[580px] overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0D] cursor-pointer"
              >
                <motion.div style={{ y: portraitY }} className="h-full w-full scale-[1.04]">
                  <ResilientImage
                    src={HERO_ARTIST_IMAGE}
                    fallbackSrc={HERO_FALLBACK_IMAGE}
                    alt="Editorial monochrome portrait of Nepali hip-hop artist YABI"
                    className="h-full w-full object-cover object-top grayscale contrast-125 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </motion.div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                />

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-[#FF1E2D]">The Sound of a Generation</p>
                    <p className="mt-1 font-display text-lg font-bold text-[#F4F2EE]">
                      YABI · Sudurpashchim to Kathmandu
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#B8BDC7] tabular-nums">2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width 4-column proof strip directly below hero split */}
          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROOF_METRICS.map((metric) => (
              <div key={metric.label} className="space-y-1.5">
                <div className="font-display text-2xl font-bold tracking-tight text-[#F4F2EE] tabular-nums">
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-[#F4F2EE]">{metric.label}</div>
                <div className="text-xs leading-relaxed text-[#8E939E]">{metric.context}</div>
              </div>
            ))}
          </div>
        </section>

        {/* MARQUEE DIVIDER RIBBON */}
        <div
          aria-hidden="true"
          className="overflow-hidden border-y border-white/10 bg-[#0B0B0D] py-3.5 select-none"
        >
          <div className="animate-marquee font-mono text-xs tracking-widest text-[#B8BDC7] uppercase">
            <span className="mx-6">
              Independent Sound · Far-Western Roots · Modern Nepali Hip-Hop · International Ambition · Boomerang 2026 ·
            </span>
            <span className="mx-6">
              Independent Sound · Far-Western Roots · Modern Nepali Hip-Hop · International Ambition · Boomerang 2026 ·
            </span>
            <span className="mx-6">
              Independent Sound · Far-Western Roots · Modern Nepali Hip-Hop · International Ambition · Boomerang 2026 ·
            </span>
          </div>
        </div>

        {/* 01. LATEST RELEASE & INTERACTIVE AUDIO EXPERIENCE */}
        <section id="releases" className="py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="font-mono text-xs font-medium tracking-wide text-[#B8BDC7]">
                  01. Latest Release
                </p>
                <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-[#F4F2EE] sm:text-5xl md:text-6xl leading-[1.02] text-balance">
                  <DistortedText text="The music speaks" accentDot />
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#B8BDC7]">
                Select any release below to trigger an instant studio beat preview, or launch the embedded Spotify and visual players.
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-12 items-stretch">
              {/* Featured Release Artwork Card */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0B0B0D] p-6 sm:p-8">
                <div>
                  <div
                    data-cursor="LISTEN"
                    onClick={() => handleSelectTrack(activeTrack, !(isPlaying && activeTrack.id === activeTrack.id))}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-[#141418] cursor-pointer"
                  >
                    <ResilientImage
                      src={activeTrack.coverImage}
                      fallbackSrc={activeTrack.fallbackImage}
                      alt={`${activeTrack.title} release cover`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePlay();
                      }}
                      aria-label={isPlaying ? `Pause ${activeTrack.title}` : `Play ${activeTrack.title}`}
                      className="absolute bottom-4 right-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FF1E2D] text-[#FAFAFA] shadow-lg transition-transform duration-150 hover:scale-105 cursor-pointer"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                    </button>
                  </div>

                  <div className="mt-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#B8BDC7] tabular-nums">
                      <span>{activeTrack.releaseType}</span>
                      <span aria-hidden="true">·</span>
                      <span>{activeTrack.bpm} BPM</span>
                      <span aria-hidden="true">·</span>
                      <span>{activeTrack.keySignature}</span>
                      <span aria-hidden="true">·</span>
                      <span>{activeTrack.year}</span>
                    </div>

                    <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#F4F2EE]">
                      {activeTrack.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#B8BDC7]">
                      {activeTrack.description}
                    </p>
                  </div>
                </div>

                {/* Direct Embedded Player Triggers */}
                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
                  <button
                    type="button"
                    onClick={() => openTrackModal(activeTrack, 'audio')}
                    className="inline-flex items-center gap-2 rounded-md bg-[#F4F2EE] px-4 py-2.5 text-xs font-semibold text-[#050505] hover:bg-white transition-colors whitespace-nowrap cursor-pointer min-h-[40px]"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>Studio Player</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openTrackModal(activeTrack, 'spotify')}
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-4 py-2.5 text-xs font-medium text-[#F4F2EE] hover:border-[#FF1E2D] transition-colors whitespace-nowrap cursor-pointer min-h-[40px]"
                  >
                    <span>Spotify Embed</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openTrackModal(activeTrack, 'youtube')}
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-4 py-2.5 text-xs font-medium text-[#F4F2EE] hover:border-[#FF1E2D] transition-colors whitespace-nowrap cursor-pointer min-h-[40px]"
                  >
                    <span>Watch Visual</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Tracklist Index */}
              <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0B0B0D] p-6 sm:p-8">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs text-[#8E939E]">
                    <span>Selected Catalog</span>
                    <span className="font-mono tabular-nums">4 Tracks</span>
                  </div>

                  <div className="divide-y divide-white/10">
                    {TRACKS.map((track) => {
                      const isActive = track.id === activeTrack.id;
                      const isRowPlaying = isActive && isPlaying;
                      return (
                        <div
                          key={track.id}
                          className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 transition-colors ${
                            isActive ? 'text-[#F4F2EE]' : 'text-[#B8BDC7]'
                          }`}
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <button
                              type="button"
                              onClick={() => {
                                if (isActive) {
                                  handleTogglePlay();
                                } else {
                                  handleSelectTrack(track, true);
                                }
                              }}
                              aria-label={isRowPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                              className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border transition-colors cursor-pointer ${
                                isRowPlaying
                                  ? 'border-[#FF1E2D] bg-[#FF1E2D] text-[#FAFAFA]'
                                  : isActive
                                  ? 'border-white/40 text-[#F4F2EE] hover:border-[#FF1E2D]'
                                  : 'border-white/15 text-[#B8BDC7] hover:border-white/40 hover:text-[#F4F2EE]'
                              }`}
                            >
                              {isRowPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                            </button>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2.5">
                                <span className="font-mono text-xs text-[#FF1E2D] tabular-nums">
                                  {track.index}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleSelectTrack(track, true)}
                                  className="font-display text-lg font-bold tracking-tight text-left truncate hover:text-[#FF1E2D] transition-colors cursor-pointer"
                                >
                                  {track.title}
                                </button>
                              </div>
                              <p className="mt-0.5 text-xs text-[#8E939E] truncate">
                                {track.subtitle} · {track.credits}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pl-15 sm:pl-0">
                            <span className="font-mono text-xs text-[#8E939E] tabular-nums">
                              {track.bpm} BPM · {track.duration}
                            </span>
                            <button
                              type="button"
                              onClick={() => openTrackModal(track, 'audio')}
                              className="inline-flex items-center gap-1 text-xs font-medium text-[#F4F2EE] hover:text-[#FF1E2D] transition-colors whitespace-nowrap cursor-pointer min-h-[36px]"
                            >
                              <span>Listen</span>
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5 text-xs text-[#8E939E]">
                  <span>Latest track: BOOMERANG — Out on all platforms</span>
                  <button
                    type="button"
                    onClick={() => openTrackModal(TRACKS[0], 'spotify')}
                    className="inline-flex items-center gap-1.5 font-medium text-[#F4F2EE] hover:text-[#FF1E2D] transition-colors cursor-pointer"
                  >
                    <span>Open Full Release Player</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VISUALS BENTO SHOWCASE */}
        <section id="visuals" className="border-t border-white/10 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="font-mono text-xs font-medium tracking-wide text-[#B8BDC7]">
                  Visual Archive & Showreel
                </p>
                <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-[#F4F2EE] sm:text-5xl leading-[1.04] text-balance">
                  <DistortedText text="Cinema built around the sound" accentDot />
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#B8BDC7]">
                Click any frame to inspect the film cut, director notes, and stage production archive.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 md:grid-rows-2">
              {VISUAL_FRAMES.map((frame) => (
                <button
                  key={frame.id}
                  type="button"
                  data-cursor="VIEW"
                  onClick={() => openVisualModal(frame)}
                  className={`group relative min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0D] text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF1E2D] ${frame.aspectClass}`}
                >
                  <ResilientImage
                    src={frame.image}
                    alt={frame.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
                  />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs text-[#B8BDC7]">
                        {frame.format} · {frame.year}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold text-[#F4F2EE] group-hover:text-[#FF1E2D] transition-colors">
                        {frame.title}
                      </h3>
                    </div>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/50 text-[#F4F2EE] transition-colors group-hover:border-[#FF1E2D] group-hover:bg-[#FF1E2D]">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 02. THE STORY */}
        <StorySection onExploreVisuals={() => openVisualModal(VISUAL_FRAMES[0])} />

        {/* 03. CONNECT */}
        <ConnectSection />
      </main>

      {/* CLEAN FOOTER */}
      <footer className="border-t border-white/10 bg-[#050505] py-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <div className="font-display text-lg font-extrabold tracking-tight text-[#F4F2EE]">
              YABI®
            </div>
            <p className="mt-1 text-xs text-[#8E939E]">
              Sudurpashchim · Kathmandu · Independent Nepali Hip-Hop
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#B8BDC7]">
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F4F2EE] transition-colors"
            >
              Spotify
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F4F2EE] transition-colors"
            >
              YouTube
            </a>
            <a
              href="https://soundcloud.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F4F2EE] transition-colors"
            >
              SoundCloud
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F4F2EE] transition-colors"
            >
              Instagram
            </a>
          </div>

          <p className="text-xs text-[#8E939E] tabular-nums">
            © 2026 YABI. All rights reserved.
          </p>
        </div>
      </footer>

      {/* DISCREET ACTIVE AUDIO BAR (only shown while playing when modal is closed) */}
      {isPlaying && !modalOpen && (
        <div className="fixed bottom-4 right-4 z-40 flex items-center gap-3 rounded-xl border border-white/15 bg-[#0B0B0D]/95 px-4 py-2.5 shadow-2xl backdrop-blur-md">
          <Disc3 className="h-4 w-4 text-[#FF1E2D] animate-spin" style={{ animationDuration: '4s' }} />
          <button
            type="button"
            onClick={() => openTrackModal(activeTrack, 'audio')}
            className="text-left cursor-pointer"
          >
            <div className="text-xs font-semibold text-[#F4F2EE] leading-none">{activeTrack.title}</div>
            <div className="mt-1 font-mono text-[11px] text-[#8E939E] tabular-nums">
              {activeTrack.bpm} BPM · Open Player
            </div>
          </button>
          <button
            type="button"
            onClick={handleTogglePlay}
            aria-label="Pause audio preview"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#FF1E2D] text-[#FAFAFA] hover:bg-[#E01524] cursor-pointer"
          >
            <Pause className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* FULLSCREEN MEDIA & LIGHTBOX MODAL */}
      <MediaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        tracks={TRACKS}
        activeTrack={activeTrack}
        onSelectTrack={(track) => handleSelectTrack(track, true)}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        initialTab={modalTab}
        activeVisual={activeVisual}
      />
    </div>
  );
}
