/**
 * Romantic Instrumental Music Generator (Web Audio API)
 * Plays a tender, romantic music box / acoustic chime melody with soft resonance.
 * Completely free of external audio host failure, CORS issues, or copyright claims.
 */

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private step: number = 0;
  private masterGain: GainNode | null = null;

  // Romantic pentatonic chord progression (F major / D minor / Bb / C)
  // dreamy, tender, music-box aesthetic
  private sequence: Array<{ note: number; duration: number }> = [
    // Bar 1 - Fmaj9
    { note: 349.23, duration: 0.6 }, // F4
    { note: 440.00, duration: 0.6 }, // A4
    { note: 523.25, duration: 0.6 }, // C5
    { note: 659.25, duration: 0.8 }, // E5
    { note: 523.25, duration: 0.5 }, // C5
    { note: 440.00, duration: 0.5 }, // A4

    // Bar 2 - Dm9
    { note: 293.66, duration: 0.6 }, // D4
    { note: 349.23, duration: 0.6 }, // F4
    { note: 440.00, duration: 0.6 }, // A4
    { note: 523.25, duration: 0.8 }, // C5
    { note: 440.00, duration: 0.5 }, // A4
    { note: 349.23, duration: 0.5 }, // F4

    // Bar 3 - Bbmaj7
    { note: 233.08, duration: 0.6 }, // Bb3
    { note: 349.23, duration: 0.6 }, // F4
    { note: 440.00, duration: 0.6 }, // A4
    { note: 466.16, duration: 0.8 }, // Bb4
    { note: 523.25, duration: 0.5 }, // C5
    { note: 440.00, duration: 0.5 }, // A4

    // Bar 4 - Cadd9 / Csus
    { note: 261.63, duration: 0.6 }, // C4
    { note: 329.63, duration: 0.6 }, // E4
    { note: 392.00, duration: 0.6 }, // G4
    { note: 587.33, duration: 0.9 }, // D5
    { note: 523.25, duration: 0.6 }, // C5
    { note: 392.00, duration: 0.6 }, // G4

    // Bar 5 - Higher melody accent
    { note: 659.25, duration: 0.7 }, // E5
    { note: 698.46, duration: 0.7 }, // F5
    { note: 659.25, duration: 0.6 }, // E5
    { note: 523.25, duration: 0.8 }, // C5
    { note: 440.00, duration: 0.8 }, // A4
    { note: 349.23, duration: 0.8 }, // F4
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, dur: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Dual oscillator for rich, warm chime timbre
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.001, now); // soft sparkle overtone

    // Delicate bell-like envelope
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.2, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + dur * 1.8);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + dur * 2);
    osc2.stop(now + dur * 2);
  }

  public play() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    const playNext = () => {
      if (!this.isPlaying) return;
      const current = this.sequence[this.step % this.sequence.length];
      this.playTone(current.note, current.duration);
      this.step++;
      const intervalMs = Math.max(380, current.duration * 680);
      this.timerId = window.setTimeout(playNext, intervalMs);
    };

    playNext();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const romanticSynthesizer = new RomanticAudioSynthesizer();
