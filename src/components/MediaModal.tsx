import { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, SkipBack, SkipForward, ExternalLink, Volume2 } from 'lucide-react';
import { TrackItem, VisualFrame } from '../data/yabiData';
import { yabiAudio } from '../utils/audioEngine';
import { ResilientImage } from './ResilientImage';

export type ModalTab = 'audio' | 'spotify' | 'youtube';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  tracks: TrackItem[];
  activeTrack: TrackItem;
  onSelectTrack: (track: TrackItem) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  initialTab?: ModalTab;
  activeVisual?: VisualFrame | null;
}

export function MediaModal({
  isOpen,
  onClose,
  tracks,
  activeTrack,
  onSelectTrack,
  isPlaying,
  onTogglePlay,
  initialTab = 'audio',
  activeVisual,
}: MediaModalProps) {
  const [tab, setTab] = useState<ModalTab>(initialTab);
  const [progress, setProgress] = useState(18);
  const barsRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab, activeTrack.id, activeVisual?.id]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Live audio frequency visualizer loop
  useEffect(() => {
    if (!isOpen || tab !== 'audio') return;
    const freqBuffer = new Uint8Array(new ArrayBuffer(32));

    const updateBars = () => {
      const hasSignal = yabiAudio.getFrequencyData(freqBuffer);
      if (barsRef.current) {
        const children = barsRef.current.children;
        for (let i = 0; i < children.length; i++) {
          const el = children[i] as HTMLElement;
          const val = hasSignal ? freqBuffer[i % freqBuffer.length] / 255 : 0.12;
          const scaleY = Math.max(0.14, Math.min(1, val * 1.15));
          el.style.transform = `scaleY(${scaleY})`;
        }
      }
      animRef.current = window.requestAnimationFrame(updateBars);
    };

    animRef.current = window.requestAnimationFrame(updateBars);
    return () => {
      if (animRef.current !== null) window.cancelAnimationFrame(animRef.current);
    };
  }, [isOpen, tab, isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 500);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  if (!isOpen) return null;

  const currentIdx = tracks.findIndex((t) => t.id === activeTrack.id);
  const handlePrev = () => {
    const prevIdx = (currentIdx - 1 + tracks.length) % tracks.length;
    onSelectTrack(tracks[prevIdx]);
    setProgress(0);
  };
  const handleNext = () => {
    const nextIdx = (currentIdx + 1) % tracks.length;
    onSelectTrack(tracks[nextIdx]);
    setProgress(0);
  };

  const displayTitle = activeVisual && tab === 'youtube' ? activeVisual.title : activeTrack.title;
  const displayMeta =
    activeVisual && tab === 'youtube'
      ? `${activeVisual.format} · ${activeVisual.location} · ${activeVisual.year}`
      : `${activeTrack.releaseType} · ${activeTrack.bpm} BPM · ${activeTrack.keySignature} · ${activeTrack.year}`;

  const videoId = activeVisual ? activeVisual.youtubeVideoId : activeTrack.youtubeVideoId;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${displayTitle} media experience`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-[#0B0B0D] text-[#F4F2EE] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold tracking-tight truncate">{displayTitle}</h3>
            <p className="mt-0.5 text-xs text-[#B8BDC7] truncate tabular-nums">{displayMeta}</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Segmented player mode selector */}
            <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#141418] p-1">
              <button
                type="button"
                onClick={() => setTab('audio')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  tab === 'audio' ? 'bg-[#FF1E2D] text-[#FAFAFA]' : 'text-[#B8BDC7] hover:text-[#F4F2EE]'
                }`}
              >
                Studio Audio
              </button>
              <button
                type="button"
                onClick={() => setTab('spotify')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  tab === 'spotify' ? 'bg-[#FF1E2D] text-[#FAFAFA]' : 'text-[#B8BDC7] hover:text-[#F4F2EE]'
                }`}
              >
                Spotify
              </button>
              <button
                type="button"
                onClick={() => setTab('youtube')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  tab === 'youtube' ? 'bg-[#FF1E2D] text-[#FAFAFA]' : 'text-[#B8BDC7] hover:text-[#F4F2EE]'
                }`}
              >
                Visual Film
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close media player"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-[#F4F2EE] transition-colors hover:border-[#FF1E2D] hover:text-[#FF1E2D] cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
          {tab === 'audio' && (
            <div className="grid gap-8 md:grid-cols-[260px_1fr] items-center">
              <div className="aspect-square overflow-hidden rounded-xl border border-white/10 bg-[#141418]">
                <ResilientImage
                  src={activeTrack.coverImage}
                  fallbackSrc={activeTrack.fallbackImage}
                  alt={`${activeTrack.title} artwork`}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between gap-6">
                <div>
                  <p className="text-xs font-medium text-[#B8BDC7]">
                    {activeTrack.index}. {activeTrack.subtitle}
                  </p>
                  <h4 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#F4F2EE]">
                    {activeTrack.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-[#B8BDC7]">
                    {activeTrack.description}
                  </p>
                  <p className="mt-3 text-xs text-[#8E939E]">{activeTrack.credits}</p>
                </div>

                {/* Frequency Visualizer */}
                <div className="rounded-xl border border-white/10 bg-[#050505] p-4">
                  <div className="flex items-center justify-between text-xs text-[#8E939E] mb-3">
                    <span className="inline-flex items-center gap-1.5">
                      <Volume2 className="h-3.5 w-3.5 text-[#FF1E2D]" />
                      {isPlaying ? 'Synthesizing live beat preview' : 'Preview paused'}
                    </span>
                    <span className="font-mono tabular-nums">{activeTrack.duration}</span>
                  </div>

                  <div
                    ref={barsRef}
                    aria-hidden="true"
                    className="flex h-14 items-end gap-1.5"
                  >
                    {Array.from({ length: 28 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="h-full flex-1 origin-bottom rounded-xs bg-gradient-to-t from-[#FF1E2D] to-[#F4F2EE]/80 transition-transform duration-75"
                        style={{ transform: 'scaleY(0.16)' }}
                      />
                    ))}
                  </div>

                  {/* Scrub bar */}
                  <div className="mt-4">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={progress}
                      aria-label="Track playback position"
                      onChange={(e) => setProgress(Number(e.target.value))}
                      className="h-1 w-full cursor-pointer accent-[#FF1E2D]"
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous track"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-[#F4F2EE] hover:border-white/40 cursor-pointer"
                    >
                      <SkipBack className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={onTogglePlay}
                      className="inline-flex h-11 items-center gap-2 rounded-md bg-[#FF1E2D] px-5 text-sm font-semibold text-[#FAFAFA] hover:bg-[#E01524] transition-colors cursor-pointer"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-4 w-4" />
                          <span>Pause Preview</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          <span>Play Beat</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next track"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-[#F4F2EE] hover:border-white/40 cursor-pointer"
                    >
                      <SkipForward className="h-4 w-4" />
                    </button>
                  </div>

                  <span className="font-mono text-xs text-[#8E939E] tabular-nums">
                    Track {currentIdx + 1} of {tracks.length}
                  </span>
                </div>
              </div>
            </div>
          )}

          {tab === 'spotify' && (
            <div className="space-y-4">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#141418]">
                <iframe
                  title={`Spotify player for ${activeTrack.title}`}
                  src={`https://open.spotify.com/embed/track/${activeTrack.spotifyTrackId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="352"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="border-0"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-[#B8BDC7]">
                <span>Streaming via Spotify Embed · YABI Catalog</span>
                <a
                  href={`https://open.spotify.com/track/${activeTrack.spotifyTrackId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-[#F4F2EE] hover:text-[#FF1E2D] transition-colors"
                >
                  <span>Open in Spotify</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}

          {tab === 'youtube' && (
            <div className="space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-[#050505]">
                <iframe
                  title={`YouTube visual for ${displayTitle}`}
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
                  width="100%"
                  height="100%"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
              {activeVisual && (
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#B8BDC7]">
                  <span>{activeVisual.notes}</span>
                  <span className="font-mono text-[#8E939E]">{activeVisual.director}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
