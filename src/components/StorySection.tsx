import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { STORY_CHAPTERS } from '../data/yabiData';
import { DistortedText } from './DistortedText';
import { ResilientImage } from './ResilientImage';

interface StorySectionProps {
  onExploreVisuals: () => void;
}

export function StorySection({ onExploreVisuals }: StorySectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const chapter = STORY_CHAPTERS[activeIdx];

  return (
    <section id="story" className="border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs font-medium tracking-wide text-[#B8BDC7]">
              02. The Story
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-[#F4F2EE] sm:text-5xl md:text-6xl leading-[1.02] text-balance">
              <DistortedText text="More than music" accentDot />
            </h2>
          </div>

          {/* Interactive chapter selector */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Artist journey chapters">
            {STORY_CHAPTERS.map((item, idx) => {
              const selected = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveIdx(idx)}
                  className={`rounded-md px-4 py-2.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
                    selected
                      ? 'bg-[#F4F2EE] text-[#050505]'
                      : 'border border-white/15 text-[#B8BDC7] hover:border-white/35 hover:text-[#F4F2EE]'
                  }`}
                >
                  <span className="font-mono tabular-nums mr-1.5">{item.index}.</span>
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column balanced split */}
        <div className="grid gap-10 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0B0B0D] p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#B8BDC7]">
                  <span className="font-mono text-[#FF1E2D] tabular-nums">{chapter.era}</span>
                  <span aria-hidden="true">·</span>
                  <span>{chapter.location}</span>
                </div>

                <h3 className="font-display text-3xl font-bold tracking-tight text-[#F4F2EE] sm:text-4xl leading-tight text-balance">
                  {chapter.headline}
                </h3>

                <p className="text-base leading-relaxed text-[#B8BDC7]">
                  {chapter.narrative}
                </p>

                <blockquote className="pt-4 border-t border-white/10 font-display text-lg font-medium text-[#F4F2EE] italic">
                  {chapter.pullQuote}
                </blockquote>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <span className="text-xs text-[#8E939E]">
                An artist · A voice · A story still being written
              </span>
              <button
                type="button"
                onClick={onExploreVisuals}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F4F2EE] hover:text-[#FF1E2D] transition-colors cursor-pointer"
              >
                <span>Explore the Journey</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[360px] lg:min-h-[480px] overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0D]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0.2, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.2 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full"
                >
                  <ResilientImage
                    src={chapter.image}
                    alt={chapter.imageAlt}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-[#FF1E2D] tabular-nums">
                    Chapter {chapter.index}
                  </p>
                  <p className="mt-1 font-display text-xl font-bold text-[#F4F2EE]">
                    {chapter.title}
                  </p>
                </div>
                <span className="text-xs text-[#B8BDC7]">{chapter.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
