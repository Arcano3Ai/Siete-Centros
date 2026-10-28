/**
 * SIETE CENTROS — Modals & Interactive Sheet System
 * Handles rich experience drawers, community manifest, and agenda demo dialogs.
 */

const EXPERIENCES_DATA = {
  tantra: {
    tag: 'Conexión Consciente',
    title: 'Tantra y Conexión Consciente',
    lead: '«Reconoce lo divino en ti a través del reflejo del otro».',
    image: '/images/exp_tantra.jpg',
    desc: 'Un espacio sagrado para desmantelar condicionamientos, habitar el cuerpo sin expectativas y explorar la polaridad y la devoción. A través de la respiración compartida, la mirada sostenida y el tacto consciente, aprendemos a mover la energía vital con ternura y poder.',
    bullets: [
      'Exploración de la presencia compartida y la comunicación de límites claros.',
      'Activación y circulación de energía sutil a lo largo de la columna vertebral.',
      'Integración del erotismo consciente, el respeto mutuo y la sanación de heridas vinculares.',
      'Espacio contenido, libre de exigencias y en estricto consentimiento consciente.'
    ]
  },
  kriya: {
    tag: 'Alineación Energética',
    title: 'Kriya Yoga',
    lead: '«La ciencia interior para serenar la mente y purificar los canales sutiles».',
    image: '/images/exp_kriya.jpg',
    desc: 'El Kriya Yoga es una práctica milenaria de acción yóguica que combina asanas de sostén, pranayamas de aceleración yóguica y concentración meditativa profunda. Dirige la energía pránica a través de los siete centros para trascender la turbulencia mental.',
    bullets: [
      'Purificación de Sushumna Nadi (el canal energético central).',
      'Despertar de la vitalidad profunda sin fatiga física ni tensión.',
      'Técnicas ancestrales de concentración y quietud mental.',
      'Apto tanto para practicantes dedicados como para buscadores con disciplina interior.'
    ]
  },
  breathwork: {
    tag: 'Medicina de la Respiración',
    title: 'Breathwork Somático',
    lead: '«Cada respiración es una oportunidad de nacer de nuevo».',
    image: '/images/exp_breathwork.jpg',
    desc: 'La respiración consciente continua desbloquea memorias somáticas alojadas en el tejido fascial, reequilibrando el sistema nervioso autónomo. En un entorno cuidado con música en frecuencias sanadoras, el breathwork abre portales a comprensiones trascendentes.',
    bullets: [
      'Liberación de tensiones psicosomáticas y emociones reprimidas.',
      'Regulación profunda del tono vagal y calma profunda del cortisol.',
      'Experiencias de claridad introspectiva y conexión con el cuerpo sutil.',
      'Facilitación con apoyo sonoro, aromaterapia botánica y contención experta.'
    ]
  },
  meditacion: {
    tag: 'Silencio y Vacío Fértil',
    title: 'Meditación y Presencia',
    lead: '«No busques la paz; reconoce el testigo silencioso que ya eres».',
    image: '/images/exp_meditacion.jpg',
    desc: 'Lejos de intentar forzar la mente a estar en blanco, nuestras prácticas de meditación enseñan el arte de atestiguar los fenómenos sin juicio. Cultivamos una atención ecuánime que te permite sostener el movimiento de la vida con dignidad y ternura.',
    bullets: [
      'Desidentificación con la rumiación y los patrones mentales automáticos.',
      'Enraizamiento en la sensación somática y el anclaje del instante.',
      'Cultivo de la compasión incondicional hacia los propios procesos.',
      'Prácticas sentadas, caminatas conscientes y contemplación sensorial.'
    ]
  },
  circulos: {
    tag: 'Palabra & Hermandad',
    title: 'Círculos de Palabra',
    lead: '«Cuando una voz habla con verdad, todas las almas en el círculo descansan».',
    image: '/images/exp_circulos.jpg',
    desc: 'Una ceremonia secular inspirada en los consejos ancestrales de los pueblos originarios. Nos sentamos en ronda en torno al fuego o un altar de ofrenda para escuchar sin interrumpir, sin aconsejar y sin juzgar, honrando la historia viva de cada participante.',
    bullets: [
      'Uso del bastón de palabra para una presencia activa y oratoria sagrada.',
      'Espacio libre de consejos no solicitados: pura escucha empática.',
      'Tejido de confianza, vulnerabilidad compartida y sanación colectiva.',
      'Celebraciones de ciclos lunares, solsticios y transiciones vitales.'
    ]
  },
  retiros: {
    tag: 'Inmersión Holística',
    title: 'Retiros y Encuentros Grupales',
    lead: '«Desconectar de la prisa del mundo para reconectar con el ritmo de la tierra».',
    image: '/images/exp_retiros.jpg',
    desc: 'Convivencias inmersivas de varios días en reservas naturales, diseñadas con arquitectura consciente. Integramos los siete centros a través de nutrición pránica consciente, ceremonias de cacao, breathwork, kriya yoga matutino y silencio contemplativo.',
    bullets: [
      'Alojamientos selectos integrados en bosques y montañas sagradas.',
      'Menús vegetarianos y ayurvédicos con ingredientes de cultivo orgánico local.',
      'Itinerario equilibrado entre actividades guiadas y tiempo de integración solitaria.',
      'Grupos reducidos para salvaguardar la intimidad y la profundidad del trabajo.'
    ]
  },
  sofia: {
    tag: 'Terapeuta & Facilitadora',
    title: 'Sofía — Acompañamiento Somático & Energético',
    lead: '«El cuerpo guarda la memoria de todo lo vivido; a través del tacto consciente y la presencia, abrimos el espacio para renacer».',
    image: '/images/sofia.jpg',
    desc: 'Con más de 12 años de devota trayectoria en disciplinas somáticas, tantra devocional y yoga de la energía, Sofía ofrece un espacio de contención incondicional donde cada persona puede desarmar sus corazas y reconectar con su pulso vital primordial.',
    bullets: [
      'Acompañamiento individual personalizado y respetuoso de tus propios tiempos.',
      'Integración de respiración consciente, biodinámica y tacto somático.',
      'Marco de consentimiento riguroso, confidencialidad y reverencia sagrada.',
      'Sesiones individuales en cabina consagrada o inmersiones privadas.'
    ]
  },
  terapia1: {
    tag: 'Sesión Individual',
    title: 'Armonización Somática y Desbloqueo de Chakras',
    lead: '«Reordenamiento del campo sutil y descompresión de centros bloqueados».',
    image: '/images/terapia1.jpg',
    desc: 'Una sesión presencial íntima de 90 minutos guiada por Sofía, diseñada para diagnosticar y liberar puntos de estancamiento pránico a lo largo del eje espinal y los siete centros a través del toque suave, aceites botánicos y resonancia acústica.',
    bullets: [
      'Lectura somática del estado de tus siete vórtices energéticos.',
      'Liberación fascial suave en puntos marmas y meridianos sutiles.',
      'Armonización con diapasones en frecuencias sagradas (432 Hz y 528 Hz).',
      'Integración final en silencio profundo y té ceremonial de hierbas nativas.'
    ]
  },
  terapia2: {
    tag: 'Sesión Respiratoria',
    title: 'Kriya Breathwork & Reprogramación Celular',
    lead: '«Liberación de cargas somáticas y profunda calma del sistema nervioso».',
    image: '/images/terapia2.jpg',
    desc: 'Inmersión respiratoria individual guiada por Sofía. A través de ciclos de respiración consciente conectada, desbloqueamos memorias alojadas en los tejidos, restaurando la oxigenación celular y facilitando comprensiones espirituales profundas.',
    bullets: [
      'Calibración personalizada del patrón respiratorio y diagnóstico diafragmático.',
      'Descarga segura de estrés crónico y tensión psicosomática acumulada.',
      'Música diseñada en ondas theta para favorecer estados lúcidos expandidos.',
      'Protocolo guiado de regreso a tierra con asistencia física y emocional.'
    ]
  },
  terapia3: {
    tag: 'Sesión de Polaridad',
    title: 'Tantra Terapéutico & Sanación del Vínculo',
    lead: '«Reconciliación con la inocencia del cuerpo y el fuego sagrado creador».',
    image: '/images/terapia3.jpg',
    desc: 'Trabajo somático enfocado en sanar heridas vinculares, reprogramar la relación con el goce y desmitificar la energía kundalini en estricta contención, reverencia y absoluto respeto al consentimiento consciente.',
    bullets: [
      'Desarticulación de culpas corporales y memorias de contracción energética.',
      'Canalización del fuego vital desde los centros inferiores hacia el corazón.',
      'Ejercicios de micro-movimiento pélvico y presencia somática ocular.',
      'Espacio contenido, libre de juicios y enfocado en la soberanía personal.'
    ]
  },
  terapia4: {
    tag: 'Sesión de Integración',
    title: 'Integración del Silencio & Cierre de Ciclos',
    lead: '«Acompañamiento íntimo en umbrales de vida y transiciones del alma».',
    image: '/images/terapia4.jpg',
    desc: 'Ceremonia personalizada para integrar procesos de cambio vital, duelos, separaciones o culminación de etapas trascendentes. Sofía sostiene un altar íntimo para bendecir lo vivido y sembrar claridad para el nuevo ciclo.',
    bullets: [
      'Ritual simbólico de liberación y corte de cordones energéticos obsoletos.',
      'Unción con bálsamos de mirra, copal y rosas silvestres.',
      'Práctica de contemplación en quietud y oratoria del alma.',
      'Plan de hábitos somáticos sugeridos para los siguientes 21 días.'
    ]
  }
};

export function initModals() {
  const modalBackdrop = document.getElementById('interactive-modal');
  if (!modalBackdrop) return;

  const closeBtn = modalBackdrop.querySelector('.modal-close-btn');
  const modalHeroImg = modalBackdrop.querySelector('.modal-hero-img');
  const modalTag = modalBackdrop.querySelector('.modal-tag');
  const modalTitle = modalBackdrop.querySelector('.modal-title');
  const modalLead = modalBackdrop.querySelector('.modal-lead');
  const modalDesc = modalBackdrop.querySelector('.modal-desc');
  const modalBulletsList = modalBackdrop.querySelector('.modal-bullets');
  const modalDemoBox = modalBackdrop.querySelector('.modal-demo-box');

  function openModal(data) {
    if (modalHeroImg) modalHeroImg.src = data.image || '/images/hero_cosmic_dawn.jpg';
    if (modalTag) modalTag.textContent = data.tag || 'Siete Centros';
    if (modalTitle) modalTitle.textContent = data.title || 'Experiencia';
    if (modalLead) modalLead.textContent = data.lead || '';
    if (modalDesc) modalDesc.textContent = data.desc || '';

    if (modalBulletsList) {
      modalBulletsList.innerHTML = (data.bullets || [])
        .map(
          (b) => `
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${b}</span>
        </li>
      `
        )
        .join('');
    }

    if (modalDemoBox) {
      modalDemoBox.innerHTML = `
        <p>Esta experiencia forma parte de nuestro programa anual. Puedes manifestar tu interés o unirte a la lista de espera prioritaria:</p>
        <button type="button" class="btn btn-primary modal-demo-btn" id="modal-interest-btn">
          <span>Manifestar Interés · Demostración</span>
        </button>
      `;

      const interestBtn = document.getElementById('modal-interest-btn');
      if (interestBtn) {
        interestBtn.addEventListener('click', () => {
          interestBtn.innerHTML = `<span>✓ Interés Registrado · Gracias por tu presencia</span>`;
          interestBtn.style.background = 'rgba(30, 142, 98, 0.85)';
          interestBtn.disabled = true;
        });
      }
    }

    modalBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    modalBackdrop.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modalBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
    modalBackdrop.setAttribute('aria-hidden', 'true');
  }

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Attach to Experience Cards
  const expButtons = document.querySelectorAll('.exp-card [data-exp]');
  expButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const expKey = btn.getAttribute('data-exp');
      if (EXPERIENCES_DATA[expKey]) {
        openModal(EXPERIENCES_DATA[expKey]);
      }
    });
  });

  // Attach to Therapy Session Cards & Sofia Profile
  const sessionButtons = document.querySelectorAll('[data-session]');
  sessionButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sessionKey = btn.getAttribute('data-session');
      if (EXPERIENCES_DATA[sessionKey]) {
        openModal(EXPERIENCES_DATA[sessionKey]);
      }
    });
  });

  // Attach to Community CTA
  const communityBtn = document.getElementById('btn-community-open');
  if (communityBtn) {
    communityBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal({
        tag: 'Manifiesto de Comunidad',
        title: 'La Comunidad de los Siete Centros',
        lead: '«Creamos un santuario donde no necesitas encajar, solo estar presente».',
        image: '/images/community_circle.jpg',
        desc: 'Nuestra comunidad no es un club social ni un dogma espiritual: es un punto de encuentro vivo para quienes anhelan conversaciones honestas, prácticas somáticas compartidas y el calor de una tribu despierta.',
        bullets: [
          'Acuerdo de confidencialidad y contención en todos los encuentros.',
          'Respeto absoluto por el ritmo, proceso y biografía de cada individuo.',
          'Encuentros mensuales presenciales y ceremonias de solsticio.',
          'Acceso preferencial a retiros, meditaciones de luna y talleres.'
        ]
      });
    });
  }

  // Attach to Agenda Events
  const agendaButtons = document.querySelectorAll('.event-row-card [data-agenda]');
  agendaButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const eventTitle = btn.getAttribute('data-event-title') || 'Encuentro Especial';
      const eventDate = btn.getAttribute('data-event-date') || 'Próxima Fecha';
      const eventLoc = btn.getAttribute('data-event-loc') || 'Sede Siete Centros';

      openModal({
        tag: 'Convocatoria & Demostración',
        title: eventTitle,
        lead: `«${eventDate} — ${eventLoc}»`,
        image: '/images/hero_cosmic_dawn.jpg',
        desc: 'Módulo interactivo de demostración de agenda. En la fase completa, este espacio permite reservar plazas, consultar el itinerario detallado de actividades y coordinar los traslados hacia el santuario.',
        bullets: [
          'Cupos limitados a 18 participantes para salvaguardar la experiencia.',
          'Incluye todas las sesiones, materiales de práctica y refrigerio botánico.',
          'Orientación previa sobre preparación somática y alimentación recomendada.'
        ]
      });
    });
  }
);
}
