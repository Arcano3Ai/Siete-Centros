/**
 * SIETE CENTROS — Meditative Soundscape Engine
 * Pure Web Audio API: 432Hz harmonic drone with warm low-pass breathing modulation.
 * Requires zero external audio files. 100% offline, resilient and lightweight.
 */

class SoundscapeEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];
    this.noiseNode = null;
    this.filterNode = null;
    this.lfoNode = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    
    this.ctx = new AudioContextClass();

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm Low-pass Filter for cosmic breath
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(320, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(1.5, this.ctx.currentTime);
    this.filterNode.connect(this.masterGain);

    // 432Hz Sacred Tuned Frequencies (A4 = 432Hz -> A2 = 108Hz, E3 = 162Hz, A3 = 216Hz, C#4 = 270Hz)
    const baseFreqs = [108, 162, 216, 270];

    baseFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      // Soft sine waves with subtle detuning for celestial choral effect
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.detune.setValueAtTime((idx % 2 === 0 ? 3 : -3), this.ctx.currentTime);

      const amp = idx === 0 ? 0.35 : 0.15;
      oscGain.gain.setValueAtTime(amp, this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.filterNode);
      osc.start();
      this.oscillators.push(osc);
    });

    // Subtle gentle noise generator for atmospheric wind / breath
    this.createAtmosphericNoise();

    // LFO for slow breathing swells (0.1 Hz = 10 second breath cycle)
    this.lfoNode = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    this.lfoNode.type = 'sine';
    this.lfoNode.frequency.setValueAtTime(0.08, this.ctx.currentTime); // ~12s breath
    lfoGain.gain.setValueAtTime(120, this.ctx.currentTime);
    this.lfoNode.connect(lfoGain);
    lfoGain.connect(this.filterNode.frequency);
    this.lfoNode.start();
  }

  createAtmosphericNoise() {
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Pink noise approximation for warm air
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.015;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(450, this.ctx.currentTime);
    noiseFilter.Q.setValueAtTime(0.8, this.ctx.currentTime);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(this.masterGain);
    whiteNoise.start();
  }

  toggle() {
    if (!this.ctx) {
      this.init();
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.isPlaying) {
      // Fade in smoothly over 2.5 seconds
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 2.5);
      this.isPlaying = true;
    } else {
      // Fade out smoothly over 1.5 seconds
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
      this.isPlaying = false;
    }

    return this.isPlaying;
  }
}

export const soundscape = new SoundscapeEngine();
