export interface TrackItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  releaseType: string;
  year: string;
  duration: string;
  durationSeconds: number;
  bpm: number;
  keySignature: string;
  coverImage: string;
  fallbackImage: string;
  description: string;
  credits: string;
  spotifyTrackId: string;
  youtubeVideoId: string;
  synthProfile: {
    baseFreq: number;
    scaleNotes: number[];
    hatDensity: number;
  };
}

export interface StoryChapter {
  id: string;
  index: string;
  title: string;
  location: string;
  era: string;
  headline: string;
  narrative: string;
  pullQuote: string;
  image: string;
  imageAlt: string;
}

export interface VisualFrame {
  id: string;
  title: string;
  format: string;
  year: string;
  location: string;
  director: string;
  image: string;
  imageAlt: string;
  aspectClass: string;
  youtubeVideoId: string;
  notes: string;
}

export interface ProofMetric {
  value: string;
  label: string;
  context: string;
}

export const HERO_ARTIST_IMAGE =
  'https://images.openai.com/static-rsc-4/LRufhpOMNzL7z_GLzQy3WqIHwvNqzjXxeTtqF_rQeuCLhduvdH8OR7eMIROGGUJgR4MAyOAUrzjqeY1zD_ofO_pSdR7rxKzApvQXLGBGoc--wL3FVuyizFKLtk5kXRZ3-z67zzBXPJaguv43jEvJhM8VM0XVOWeJVPPNSKdUSEwZ1rn1TWfcwCbCTwMGnX0U?purpose=fullsize';

export const HERO_FALLBACK_IMAGE = '/src/assets/images/yabi_hero_fallback_1795182684155.jpg';

export const PROOF_METRICS: ProofMetric[] = [
  {
    value: '4.2M+',
    label: 'Independent Streams',
    context: 'Across Spotify, YouTube & SoundCloud (2024–2026)',
  },
  {
    value: '18',
    label: 'Original Releases',
    context: 'Self-written & independently produced catalog',
  },
  {
    value: 'Sudurpashchim',
    label: 'Far-Western Roots',
    context: 'Dhangadhi cadence meets modern 808 architecture',
  },
  {
    value: 'Kathmandu · Global',
    label: 'Touring Circuit',
    context: 'Headline underground sets across South Asia',
  },
];

export const TRACKS: TrackItem[] = [
  {
    id: 'boomerang',
    index: '01',
    title: 'BOOMERANG',
    subtitle: 'Latest Single · Lead Visual',
    releaseType: 'Single',
    year: '2026',
    duration: '03:18',
    durationSeconds: 198,
    bpm: 138,
    keySignature: 'F# Minor',
    coverImage: '/src/assets/images/release_boomerang_cover_1795182683725.jpg',
    fallbackImage: '/src/assets/images/yabi_hero_fallback_1795182684155.jpg',
    description:
      'Sharp metallic percussion, sub-heavy 808 glides, and rapid-fire bilingual delivery turning Far-Western grit into a global stadium statement.',
    credits: 'Written & Performed by YABI · Mixed in Kathmandu',
    spotifyTrackId: '4uLU6hMCjMI75M1A2tKUQC',
    youtubeVideoId: 'dQw4w9WgXcQ',
    synthProfile: {
      baseFreq: 46.25,
      scaleNotes: [185.0, 220.0, 246.94, 277.18, 329.63],
      hatDensity: 2,
    },
  },
  {
    id: 'far-west-anthem',
    index: '02',
    title: 'FAR-WEST ANTHEM',
    subtitle: 'Sudurpashchim Tape',
    releaseType: 'EP Focus Track',
    year: '2025',
    duration: '03:44',
    durationSeconds: 224,
    bpm: 128,
    keySignature: 'D Minor',
    coverImage: '/src/assets/images/release_farwest_cover_1795182683909.jpg',
    fallbackImage: '/src/assets/images/story_editorial_studio_1795182684000.jpg',
    description:
      'Atmospheric mountain horns layered over distorted analog basslines — a defiant tribute to the highways and border towns of Far-Western Nepal.',
    credits: 'Produced by YABI & Kathmandu Sound Collective',
    spotifyTrackId: '3n3Ppam7vgaVa1iaRUc9Lp',
    youtubeVideoId: 'M7lc1UVf-VE',
    synthProfile: {
      baseFreq: 36.71,
      scaleNotes: [146.83, 174.61, 196.0, 220.0, 261.63],
      hatDensity: 1,
    },
  },
  {
    id: 'surrender-sessions',
    index: '03',
    title: 'UNFILTERED (LIVE BOOTH)',
    subtitle: 'Raw Studio Take',
    releaseType: 'Live Cut',
    year: '2025',
    duration: '02:56',
    durationSeconds: 176,
    bpm: 144,
    keySignature: 'C# Minor',
    coverImage: '/src/assets/images/story_editorial_studio_1795182684000.jpg',
    fallbackImage: '/src/assets/images/release_boomerang_cover_1795182683725.jpg',
    description:
      'Recorded in one continuous vocal pass at 3 AM in Patan — dry concrete acoustics, minimal piano tension, and uncompromising cadence.',
    credits: 'One-Take Analog Session · Patan Industrial Studio',
    spotifyTrackId: '0VjIjW4GlUZAMYd2vXMi3b',
    youtubeVideoId: 'aqz-KE-bpKQ',
    synthProfile: {
      baseFreq: 34.65,
      scaleNotes: [138.59, 164.81, 185.0, 207.65, 246.94],
      hatDensity: 3,
    },
  },
  {
    id: 'kathmandu-drift',
    index: '04',
    title: 'NOCTURNE 04',
    subtitle: 'Midnight Underground Set',
    releaseType: 'Single',
    year: '2024',
    duration: '04:02',
    durationSeconds: 242,
    bpm: 120,
    keySignature: 'G Minor',
    coverImage: '/src/assets/images/visual_live_stage_1795182684902.jpg',
    fallbackImage: '/src/assets/images/release_farwest_cover_1795182683909.jpg',
    description:
      'Slow-burn nocturnal trap architecture built for late-night drives through the valley, closing with an extended analog synth outro.',
    credits: 'Written, Arranged & Mastered Independently',
    spotifyTrackId: '7qiZfU4dY1lWllzX7mPBI3',
    youtubeVideoId: 'LXb3EKWsInQ',
    synthProfile: {
      baseFreq: 49.0,
      scaleNotes: [196.0, 233.08, 261.63, 293.66, 349.23],
      hatDensity: 2,
    },
  },
];

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'roots',
    index: '01',
    title: 'Far-West Roots',
    location: 'Dhangadhi · Sudurpashchim',
    era: '2019 — 2022',
    headline: 'A voice forged outside the capital.',
    narrative:
      'Before packed rooms in Kathmandu, YABI built his cadence miles away from Nepal’s mainstream music industry. Growing up in the Far-West shaped an unfiltered perspective — direct, rhythmic, and fiercely self-reliant.',
    pullQuote: '“Nobody hands you a microphone in the Far-West. You build the stage yourself.”',
    image: '/src/assets/images/release_farwest_cover_1795182683909.jpg',
    imageAlt: 'High-contrast monochrome Far-Western Himalayan peaks pierced by a crimson horizon line',
  },
  {
    id: 'sound',
    index: '02',
    title: 'Independent Sound',
    location: 'Kathmandu Valley',
    era: '2023 — 2025',
    headline: 'Artistic rebellion over safe formulas.',
    narrative:
      'Rejecting predictable pop hooks, YABI pairs distorted low-end architecture with stark Nepali lyricism and global trap minimalism. Every release is treated as a complete visual and sonic world.',
    pullQuote: '“If the beat feels comfortable, we tear it down and start again.”',
    image: '/src/assets/images/story_editorial_studio_1795182684000.jpg',
    imageAlt: 'Documentary editorial photograph of YABI recording in a dark minimalist concrete studio',
  },
  {
    id: 'global',
    index: '03',
    title: 'Global Stage',
    location: 'South Asia · International',
    era: '2026 & Beyond',
    headline: 'Modern Nepali hip-hop without borders.',
    narrative:
      'With Boomerang leading a new chapter of visual albums and high-voltage live sets, YABI stands at the intersection of South Asian underground culture and international experimental hip-hop.',
    pullQuote: '“The language is ours. The ambition belongs to the world.”',
    image: '/src/assets/images/visual_live_stage_1795182684902.jpg',
    imageAlt: 'Silhouetted live concert performance in crimson and stark white stage haze',
  },
];

export const VISUAL_FRAMES: VisualFrame[] = [
  {
    id: 'boomerang-film',
    title: 'BOOMERANG — Official Visual',
    format: '4K Anamorphic Film',
    year: '2026',
    location: 'Kathmandu & Lalitpur',
    director: 'Directed by YABI Visual Lab',
    image: '/src/assets/images/visual_live_stage_1795182684902.jpg',
    imageAlt: 'Live stage silhouette under crimson and white spotlights',
    aspectClass: 'md:col-span-2 md:row-span-2',
    youtubeVideoId: 'dQw4w9WgXcQ',
    notes: 'High-contrast performance film shot across industrial concrete corridors and midnight rooftops.',
  },
  {
    id: 'studio-tape',
    title: 'Patan 3AM Sessions',
    format: '35mm Documentary Stills',
    year: '2025',
    location: 'Patan, Nepal',
    director: 'Photography by S. Thapa',
    image: '/src/assets/images/story_editorial_studio_1795182684000.jpg',
    imageAlt: 'Artist standing at a vintage condenser microphone inside a dark recording booth',
    aspectClass: 'md:col-span-1 md:row-span-1',
    youtubeVideoId: 'aqz-KE-bpKQ',
    notes: 'Unscripted analog recording session capturing the raw vocal takes behind Unfiltered.',
  },
  {
    id: 'chrome-sculpture',
    title: 'Kinetic Chrome Study',
    format: 'Album Packaging & Motion',
    year: '2026',
    location: 'Digital Sculpture',
    director: 'Art Direction · Direction 01',
    image: '/src/assets/images/release_boomerang_cover_1795182683725.jpg',
    imageAlt: 'Liquid chrome metallic sculpture under electric red studio lighting',
    aspectClass: 'md:col-span-1 md:row-span-1',
    youtubeVideoId: 'M7lc1UVf-VE',
    notes: 'Custom 3D liquid chrome identity developed for the Boomerang single rollout.',
  },
];
