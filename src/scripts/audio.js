/**
 * SIETE CENTROS — Meditative Soundscape Engine
 * Canción de Fondo Oficial: "Bienvenida al Silencio" (432Hz Master Ambient)
 * Implementa Web Audio API con GainNode y fallback directo HTML5 Audio con volumen suave.
 * Optimizado para dispositivos móviles (iOS Safari, Android Chrome).
 */

class SoundscapeEngine {
  constructor() {
    this.audioElement = null;
    this.ctx = null;
    this.sourceNode = null;
    this.gainNode = null;
    this.hasWebAudio = false;
    this.isPlaying = false;
    this.trackTitle = 'Bienvenida al Silencio';
    this.subscribers = new Set();
    this.isInitialized = false;
    this.candidateIndex = 0;
    this.candidates = [];
  }

  resolveCandidatePaths() {
    const isGhPages = typeof window !== 'undefined' && window.location.pathname.startsWith('/Siete-Centros');
    const basePath = isGhPages ? '/Siete-Centros' : '';

    return [
      `${basePath}/audio/bienvenida-al-silencio.mp3`,
      './audio/bienvenida-al-silencio.mp3',
      'audio/bienvenida-al-silencio.mp3',
      '../audio/bienvenida-al-silencio.mp3'
    ];
  }

  init() {
    if (this.isInitialized) return;

    try {
      this.candidates = this.resolveCandidatePaths();
      this.candidateIndex = 0;

      // 1. Elemento de audio HTML5 nativo para máxima compatibilidad móvil
      this.audioElement = new Audio();
      this.audioElement.src = this.candidates[0];
      this.audioElement.loop = true;
      this.audioElement.preload = 'auto';
      this.audioElement.playsInline = true;
      this.audioElement.setAttribute('playsinline', 'true');
      this.audioElement.setAttribute('webkit-playsinline', 'true');

      // 2. Intentar inicializar Web Audio API para fades de alta fidelidad si está disponible
      const AudioContextClass = typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null;
      if (AudioContextClass) {
        try {
          this.ctx = new AudioContextClass();
          this.gainNode = this.ctx.createGain();
          this.sourceNode = this.ctx.createMediaElementSource(this.audioElement);
          this.sourceNode.connect(this.gainNode);
          this.gainNode.connect(this.ctx.destination);
          this.gainNode.gain.setValueAtTime(0.0001, this.ctx.currentTime);
          this.hasWebAudio = true;
        } catch (e) {
          // Si createMediaElementSource falla por sandbox o CORS móvil, omitir Web Audio limpiamente
          console.warn('SIETE CENTROS: Modo HTML5 Audio directo activo para compatibilidad móvil', e);
          this.hasWebAudio = false;
          this.gainNode = null;
          this.sourceNode = null;
          this.audioElement.volume = 0.75;
        }
      } else {
        this.hasWebAudio = false;
        this.audioElement.volume = 0.75;
      }

      // Ciclo y reintentos ante error de ruta
      this.audioElement.addEventListener('ended', () => {
        if (this.isPlaying) {
          this.audioElement.currentTime = 0;
          this.audioElement.play().catch(() => {});
        }
      });

      this.audioElement.addEventListener('error', () => {
        if (this.candidateIndex < this.candidates.length - 1) {
          this.candidateIndex++;
          console.warn(`SIETE CENTROS: Reintentando audio con ruta alternativa: ${this.candidates[this.candidateIndex]}`);
          this.audioElement.src = this.candidates[this.candidateIndex];
          if (this.isPlaying) {
            this.audioElement.play().catch(() => {});
          }
        }
      });

      // Calentamiento del contexto de audio en la primera interacción móvil
      if (typeof window !== 'undefined') {
        const unlockUserGesture = () => {
          if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
          }
          window.removeEventListener('click', unlockUserGesture);
          window.removeEventListener('touchstart', unlockUserGesture);
        };
        window.addEventListener('click', unlockUserGesture, { passive: true, once: true });
        window.addEventListener('touchstart', unlockUserGesture, { passive: true, once: true });
      }

      this.isInitialized = true;
    } catch (err) {
      console.warn('SIETE CENTROS: Audio init error', err);
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
      try {
        await this.ctx.resume();
      } catch {}
    }

    try {
      await this.audioElement.play();
      this.isPlaying = true;

      if (this.hasWebAudio && this.ctx && this.gainNode) {
        const now = this.ctx.currentTime;
        this.gainNode.gain.cancelScheduledValues(now);
        this.gainNode.gain.setValueAtTime(Math.max(this.gainNode.gain.value, 0.0001), now);
        this.gainNode.gain.exponentialRampToValueAtTime(0.75, now + 2.0);
      } else if (this.audioElement) {
        this.fadeVolume(0.1, 0.75, 1800);
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

    if (this.hasWebAudio && this.ctx && this.gainNode) {
      const now = this.ctx.currentTime;
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.setValueAtTime(Math.max(this.gainNode.gain.value, 0.0001), now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      setTimeout(() => {
        if (!this.isPlaying && this.audioElement) {
          this.audioElement.pause();
        }
      }, 1250);
    } else if (this.audioElement) {
      this.fadeVolume(this.audioElement.volume, 0, 1200, () => {
        if (!this.isPlaying && this.audioElement) this.audioElement.pause();
      });
    }

    this.isPlaying = false;
    this.notify();
    return false;
  }

  fadeVolume(from, to, duration, onComplete) {
    const steps = 20;
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
