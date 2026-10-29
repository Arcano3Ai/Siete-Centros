/**
 * SIETE CENTROS — Meditative Soundscape Engine
 * Canción de Fondo Oficial: "Bienvenida al Silencio" (432Hz Master Ambient)
 * Motor optimizado para ultra-estabilidad en dispositivos móviles (iOS Safari, Android Chrome).
 * Utiliza HTML5 Audio nativo para evitar bloqueos de tokens de gesto en WebKit y caídas de volumen.
 */

class SoundscapeEngine {
  constructor() {
    this.audioElement = null;
    this.isPlaying = false;
    this.trackTitle = 'Bienvenida al Silencio';
    this.subscribers = new Set();
    this.isInitialized = false;
    this.candidateIndex = 0;
    this.candidates = [];
    this.fadeTimer = null;
  }

  resolveCandidatePaths() {
    const isGhPages = typeof window !== 'undefined' && window.location.pathname.toLowerCase().includes('siete-centros');
    const basePath = isGhPages ? '/Siete-Centros' : '';

    return [
      `${basePath}/audio/bienvenida-al-silencio.mp3`,
      './audio/bienvenida-al-silencio.mp3',
      '/audio/bienvenida-al-silencio.mp3',
      'audio/bienvenida-al-silencio.mp3',
      `${basePath}/audio/Bienvenida al Silencio.mp3`,
      './audio/Bienvenida al Silencio.mp3',
      '../audio/bienvenida-al-silencio.mp3'
    ];
  }

  init() {
    if (this.isInitialized) return;

    try {
      this.candidates = this.resolveCandidatePaths();
      this.candidateIndex = 0;

      // Elemento de audio HTML5 nativo de ultra-alta compatibilidad móvil
      this.audioElement = new Audio();
      this.audioElement.src = this.candidates[0];
      this.audioElement.loop = true;
      this.audioElement.preload = 'auto';
      this.audioElement.playsInline = true;
      this.audioElement.setAttribute('playsinline', 'true');
      this.audioElement.setAttribute('webkit-playsinline', 'true');
      this.audioElement.volume = 0.75;

      // Ciclo en bucle continuo
      this.audioElement.addEventListener('ended', () => {
        if (this.isPlaying && this.audioElement) {
          this.audioElement.currentTime = 0;
          this.audioElement.play().catch(() => {});
        }
      });

      // Recuperación automática ante error de ruta
      this.audioElement.addEventListener('error', (e) => {
        if (this.candidateIndex < this.candidates.length - 1) {
          this.candidateIndex++;
          console.warn(`SIETE CENTROS: Reintentando audio con ruta alternativa [${this.candidateIndex}]: ${this.candidates[this.candidateIndex]}`);
          if (this.audioElement) {
            this.audioElement.src = this.candidates[this.candidateIndex];
            if (this.isPlaying) {
              this.audioElement.play().catch(() => {});
            }
          }
        }
      });

      this.isInitialized = true;
    } catch (err) {
      console.warn('SIETE CENTROS: Error al inicializar audio', err);
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

  play() {
    if (!this.isInitialized) this.init();
    if (!this.audioElement) return false;

    try {
      // 1. Marcar estado activo y notificar UI inmediatamente para respuesta táctil instantánea
      this.isPlaying = true;
      this.notify();

      // 2. Invocar play() de forma síncrona dentro de la interacción del usuario
      const playPromise = this.audioElement.play();

      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.isPlaying = true;
          this.fadeVolume(0.1, 0.75, 1400);
          this.notify();
        }).catch((err) => {
          console.warn('SIETE CENTROS: Autoplay bloqueado por el navegador (requiere toque de usuario)', err);
          this.isPlaying = false;
          this.notify();
        });
      }

      return true;
    } catch (err) {
      console.warn('SIETE CENTROS: Excepción al ejecutar play()', err);
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  pause() {
    if (!this.isPlaying || !this.audioElement) return false;

    this.isPlaying = false;
    this.notify();

    this.fadeVolume(this.audioElement.volume, 0, 900, () => {
      if (!this.isPlaying && this.audioElement) {
        this.audioElement.pause();
      }
    });

    return false;
  }

  fadeVolume(from, to, duration, onComplete) {
    if (!this.audioElement) return;
    clearInterval(this.fadeTimer);

    // Intentar asignar volumen si la plataforma lo permite (Android/Desktop)
    try {
      this.audioElement.volume = Math.min(Math.max(from, 0), 1);
    } catch {
      // iOS ignora la asignación de volumen por JS de forma nativa
    }

    const steps = 15;
    const intervalTime = Math.max(Math.floor(duration / steps), 25);
    const delta = (to - from) / steps;
    let currentStep = 0;

    this.fadeTimer = setInterval(() => {
      currentStep++;
      const nextVol = Math.min(Math.max(from + delta * currentStep, 0), 1);
      try {
        if (this.audioElement) this.audioElement.volume = nextVol;
      } catch {}

      if (currentStep >= steps) {
        clearInterval(this.fadeTimer);
        try {
          if (this.audioElement) this.audioElement.volume = to;
        } catch {}
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

// Inicialización temprana y precalentamiento táctil en móviles
if (typeof window !== 'undefined') {
  // Exponer para acceso global
  window.__soundscape = soundscape;
  window.toggleSieteCentrosAudio = () => soundscape.toggle();

  const warmUpAudio = () => {
    soundscape.init();
    window.removeEventListener('click', warmUpAudio);
    window.removeEventListener('touchstart', warmUpAudio);
  };
  window.addEventListener('click', warmUpAudio, { passive: true, once: true });
  window.addEventListener('touchstart', warmUpAudio, { passive: true, once: true });
}

