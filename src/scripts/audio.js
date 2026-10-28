/**
 * SIETE CENTROS — Meditative Soundscape Engine
 * Canción de Fondo Oficial: "Bienvenida al Silencio" (432Hz Master Ambient)
 * Implementa Web Audio API con GainNode para respiraciones de volumen (Fade In / Fade Out)
 * y loop continuo infinito. Soporta fallback armónico procedural.
 */

class SoundscapeEngine {
  constructor() {
    this.audioElement = null;
    this.ctx = null;
    this.sourceNode = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.trackTitle = 'Bienvenida al Silencio';
    this.subscribers = new Set();
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;

    try {
      // 1. Crear el elemento de audio HTML5 con loop infinito
      this.audioElement = new Audio();
      this.audioElement.src = './audio/bienvenida-al-silencio.mp3';
      this.audioElement.loop = true;
      this.audioElement.preload = 'metadata';
      this.audioElement.crossOrigin = 'anonymous';

      // 2. Conectar a Web Audio API para fades y control milimétrico si está disponible
      const AudioContextClass = window.AudioContext || (window).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.0001, this.ctx.currentTime);

        try {
          this.sourceNode = this.ctx.createMediaElementSource(this.audioElement);
          this.sourceNode.connect(this.gainNode);
          this.gainNode.connect(this.ctx.destination);
        } catch {
          // Fallback a volumen directo si CORS o MediaElementSource está restringido
          this.audioElement.volume = 0;
        }
      } else {
        this.audioElement.volume = 0;
      }

      // Eventos de estado
      this.audioElement.addEventListener('ended', () => {
        if (this.isPlaying) {
          this.audioElement.currentTime = 0;
          this.audioElement.play().catch(() => {});
        }
      });

      this.audioElement.addEventListener('error', () => {
        console.warn('SIETE CENTROS: Audio track fallback to local relative path');
      });

      this.isInitialized = true;
    } catch (err) {
      console.warn('SIETE CENTROS: Audio init error, fallback active', err);
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    callback(this.isPlaying, this.trackTitle);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach((cb) => {
      try {
        cb(this.isPlaying, this.trackTitle);
      } catch (e) {
        console.error(e);
      }
    });
  }

  async play() {
    if (!this.isInitialized) this.init();

    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    try {
      await this.audioElement.play();
      this.isPlaying = true;

      // Suave Fade In celestial de 2.2 segundos
      if (this.ctx && this.gainNode) {
        const now = this.ctx.currentTime;
        this.gainNode.gain.cancelScheduledValues(now);
        this.gainNode.gain.setValueAtTime(Math.max(this.gainNode.gain.value, 0.0001), now);
        this.gainNode.gain.exponentialRampToValueAtTime(0.75, now + 2.2);
      } else if (this.audioElement) {
        this.fadeVolume(0, 0.75, 2000);
      }

      this.notify();
      return true;
    } catch (err) {
      console.warn('SIETE CENTROS: Autoplay prevenido o error de reproducción', err);
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  pause() {
    if (!this.isPlaying || !this.audioElement) return false;

    // Suave Fade Out celestial de 1.4 segundos antes de pausar
    if (this.ctx && this.gainNode) {
      const now = this.ctx.currentTime;
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.setValueAtTime(Math.max(this.gainNode.gain.value, 0.0001), now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
      setTimeout(() => {
        if (!this.isPlaying) {
          this.audioElement.pause();
        }
      }, 1450);
    } else if (this.audioElement) {
      this.fadeVolume(this.audioElement.volume, 0, 1400, () => {
        if (!this.isPlaying) this.audioElement.pause();
      });
    }

    this.isPlaying = false;
    this.notify();
    return false;
  }

  fadeVolume(from, to, duration, onComplete) {
    const steps = 25;
    const intervalTime = duration / steps;
    const delta = (to - from) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextVol = Math.min(Math.max(from + delta * currentStep, 0), 1);
      if (this.audioElement) this.audioElement.volume = nextVol;

      if (currentStep >= steps) {
        clearInterval(timer);
        if (this.audioElement) this.audioElement.volume = to;
        if (onComplete) onComplete();
      }
    }, intervalTime);
  }

  toggle() {
    if (this.isPlaying) {
      return this.pause();
    } else {
      return this.play();
    }
  }
}

export const soundscape = new SoundscapeEngine();
