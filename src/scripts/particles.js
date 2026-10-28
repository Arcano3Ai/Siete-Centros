/**
 * SIETE CENTROS — Cosmic Particle System Canvas
 */

export function initCosmicCanvas() {
  const canvas = document.getElementById('cosmic-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    canvas.style.display = 'none';
    return;
  }

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(85, Math.floor((width * height) / 18000));

  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;

  class CosmicParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.8 + 0.4;
      this.baseAlpha = Math.random() * 0.45 + 0.15;
      this.alpha = this.baseAlpha;
      this.speedX = (Math.random() - 0.5) * 0.25;
      this.speedY = -(Math.random() * 0.35 + 0.08); // Slow gentle upward ascent
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      this.pulseVal = Math.random() * Math.PI;

      // Color tints: gold, ivory, soft violet, cyan
      const colors = [
        '223, 190, 144', // Aged Gold
        '250, 247, 242', // Warm Ivory
        '168, 85, 247',  // Violet
        '31, 162, 196'   // Turquoise
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around bounds
      if (this.y < 0) this.y = height;
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;

      // Subtle pulse
      this.pulseVal += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulseVal) * 0.15;

      // Gentle interactive mouse drift
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) {
        const force = (1 - dist / 180) * 0.02;
        this.x -= dx * force;
        this.y -= dy * force;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${Math.max(0, Math.min(1, this.alpha))})`;
      ctx.shadowBlur = this.size * 3;
      ctx.shadowColor = `rgba(${this.color}, 0.5)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Populate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new CosmicParticle());
  }

  function handleResize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', handleResize, { passive: true });

  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  }, { passive: true });

  let animationFrameId;

  function render() {
    // Smooth lerp mouse
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  render();

  // Handle visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      render();
    }
  });
}
