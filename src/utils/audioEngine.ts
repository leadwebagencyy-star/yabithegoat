import { TrackItem } from '../data/yabiData';

class YabiAudioEngine {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private masterGain: GainNode | null = null;
  private intervalId: number | null = null;
  private step = 0;
  private isPlaying = false;
  private currentTrack: TrackItem | null = null;

  private ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.45;
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
  }

  public start(track: TrackItem) {
    this.stop();
    this.ensureContext();
    this.currentTrack = track;
    this.isPlaying = true;
    this.step = 0;

    const sixteenthMs = (60 / track.bpm / 4) * 1000;
    this.triggerStep();
    this.intervalId = window.setInterval(() => {
      if (this.isPlaying) {
        this.triggerStep();
      }
    }, sixteenthMs);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public getFrequencyData(target: Uint8Array<ArrayBuffer>): boolean {
    if (!this.analyser || !this.isPlaying) {
      return false;
    }
    this.analyser.getByteFrequencyData(target);
    return true;
  }

  private triggerStep() {
    if (!this.ctx || !this.masterGain || !this.currentTrack) return;
    const now = this.ctx.currentTime;
    const s = this.step % 16;
    const { baseFreq, scaleNotes, hatDensity } = this.currentTrack.synthProfile;

    // 808 Sub Kick on trap pattern
    if (s === 0 || s === 6 || s === 10) {
      this.play808(now, baseFreq * (s === 10 ? 1.122 : 1));
    }

    // Crisp Trap Snare on 4 & 12
    if (s === 4 || s === 12) {
      this.playSnare(now);
    }

    // Metallic Hi-Hats
    if (s % 2 === 0 || (hatDensity > 1 && (s === 7 || s === 15)) || (hatDensity > 2 && s === 11)) {
      this.playHat(now, s === 7 ? 0.09 : 0.045);
    }

    // Dark Minor Bell / Pad pluck
    if (s === 0 || s === 3 || s === 8 || s === 14) {
      const note = scaleNotes[(this.step + s) % scaleNotes.length];
      this.playPluck(now, note);
    }

    this.step = (this.step + 1) % 64;
  }

  private play808(time: number, freq: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 2.4, time);
    osc.frequency.exponentialRampToValueAtTime(freq, time + 0.06);

    gain.gain.setValueAtTime(0.95, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.42);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.44);
  }

  private playSnare(time: number) {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 0.14;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.28));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(950, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.42, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.14);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(time);
  }

  private playHat(time: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(6500, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.005, time + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(time);
  }

  private playPluck(time: number, freq: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, time);
    filter.frequency.exponentialRampToValueAtTime(320, time + 0.35);

    gain.gain.setValueAtTime(0.22, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.38);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.4);
  }
}

export const yabiAudio = new YabiAudioEngine();
