import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, MessageCircle, ExternalLink, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { getStoredLanguage, setStoredLanguage, DICTIONARY, Language } from '../../i18n/translations';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  action?: {
    type: 'whatsapp' | 'link';
    label: string;
    url: string;
  };
}

export const TantricConciergeBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasUnread, setHasUnread] = useState<boolean>(true);
  const [currentLang, setCurrentLang] = useState<Language>(getStoredLanguage());
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const t = DICTIONARY[currentLang];

  // Sound chime for bot messages
  const playSacredPing = (frequency = 528) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.3);
    } catch {
      // Graceful silence
    }
  };

  // Sync language changes from global listener
  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ lang: Language }>;
      if (customEvent.detail?.lang) {
        setCurrentLang(customEvent.detail.lang);
      }
    };
    window.addEventListener('siete-centros-lang-changed', handleLangChange);
    return () => window.removeEventListener('siete-centros-lang-changed', handleLangChange);
  }, []);

  // Initialize welcome message when language changes
  useEffect(() => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: t.bot.welcome,
        time: now,
        action: {
          type: 'whatsapp',
          label: t.bot.whatsappDirect,
          url: 'https://wa.me/525512345678?text=Hola%20Sofía,%20estoy%20en%20el%20portal%20de%20Siete%20Centros%20y%20me%20gustaría%20información'
        }
      }
    ]);
  }, [currentLang]);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const handleToggleLang = () => {
    const nextLang: Language = currentLang === 'es' ? 'en' : 'es';
    setStoredLanguage(nextLang);
    setCurrentLang(nextLang);
  };

  // Tantric Knowledge Engine
  const generateResponse = (query: string, lang: Language): { text: string; action?: Message['action'] } => {
    const q = query.toLowerCase().trim();

    if (lang === 'es') {
      // Breathwork
      if (q.includes('breathwork') || q.includes('respir') || q.includes('prana') || q.includes('holotrop')) {
        return {
          text: 'El Breathwork Somático en Siete Centros combina modulación del nervio vago, hiperventilación circular consciente y frecuencias armónicas a 432 Hz. Permite liberar cargas emocionales acumuladas en la fascia y el psoas, equilibrando los hemisferios cerebrales y accediendo a estados de profunda claridad no dual.',
          action: {
            type: 'link',
            label: 'Explorar Página de Breathwork ↗',
            url: '/breathwork.html'
          }
        };
      }

      // Kriya Yoga
      if (q.includes('kriya') || q.includes('sushumna') || q.includes('espina') || q.includes('columna') || q.includes('kundalini')) {
        return {
          text: 'Kriya Yoga es el arte tántrico de magnetizar la columna vertebral (Sushumna Nadi). A través de bīja mantras (LAM, VAM, RAM, YAM, HAM, OM, KSHAM) y visualización del prana ascendente, transmutamos la energía densa de los centros inferiores en devoción y supra-conciencia en el loto coronal.',
          action: {
            type: 'link',
            label: 'Explorar Práctica de Kriya Yoga ↗',
            url: '/kriya-yoga.html'
          }
        };
      }

      // Tantra & Polaridad
      if (q.includes('tantra') || q.includes('polaridad') || q.includes('shiva') || q.includes('shakti') || q.includes('pareja') || q.includes('sexual')) {
        return {
          text: 'Nuestra visión del Tantra trasciende lo convencional: es la alquimia sagrada entre Shiva (el testigo inmóvil y consciente) y Shakti (la danza viva de la energía). En sesiones individuales o de parejas cultivamos consentimiento consciente, tacto sin demanda y expansión del éxtasis somático en todo el cuerpo.',
          action: {
            type: 'link',
            label: 'Ver Inmersión de Tantra ↗',
            url: '/tantra.html'
          }
        };
      }

      // Círculos de Palabra
      if (q.includes('circulo') || q.includes('círculo') || q.includes('palabra') || q.includes('fuego') || q.includes('comunidad')) {
        return {
          text: 'Los Círculos de Palabra son altares comunitarios en torno al fuego ceremonial. Bajo el código del bastón de la palabra, practicamos escucha sagrada sin interrupciones ni consejos forzados. Un espacio íntimo para verbalizar la sombra y ser sostenido en hermandad.',
          action: {
            type: 'link',
            label: 'Conocer Círculos de Palabra ↗',
            url: '/circulos-de-palabra.html'
          }
        };
      }

      // Retiros 2026
      if (q.includes('retiro') || q.includes('inmersion') || q.includes('inmersión') || q.includes('tepoztlan') || q.includes('valle') || q.includes('tulum') || q.includes('precio') || q.includes('fecha')) {
        return {
          text: 'Para 2026 tenemos 3 inmersiones residenciales de lujo consciente: \n• Tepoztlán (18-21 Junio): Templo de la Serpiente y el Silencio\n• Valle de Bravo (24-27 Septiembre): Alquimia de la Sombra y el Fuego\n• Tulum (12-16 Noviembre): Portal Ouroboros y Renacimiento.\n\nIncluyen hospedaje de diseño, alimentación ayurvédica y todas las ceremonias.',
          action: {
            type: 'link',
            label: 'Ver Agenda y Cupos de Retiros ↗',
            url: '/retiros.html'
          }
        };
      }

      // Sofía
      if (q.includes('sofia') || q.includes('sofía') || q.includes('guia') || q.includes('guía') || q.includes('quien') || q.includes('maestra')) {
        return {
          text: 'Sofía es la fundadora y guardiana ceremonial de Siete Centros. Ha dedicado más de una década al estudio directo de tradiciones tántricas en Rishikesh (India), chamanismo vegetal en el Amazonas y somática clínica en Europa. Sostiene el espacio desde una presencia impecable que no impone, sino que despierta tu propia soberanía.',
          action: {
            type: 'whatsapp',
            label: 'Escribir a Sofía en WhatsApp ↗',
            url: 'https://wa.me/525512345678?text=Hola%20Sofía,%20me%20gustaría%20conocer%20más%20sobre%20tus%20sesiones%20personalizadas'
          }
        };
      }

      // WhatsApp / Reserva
      if (q.includes('whatsapp') || q.includes('agenda') || q.includes('reserv') || q.includes('costo') || q.includes('inversion') || q.includes('contacto')) {
        return {
          text: 'Puedes iniciar contacto privado y agendar una sesión de valoración directamente con Sofía vía WhatsApp. Su equipo te compartirá los cupos disponibles y detalles de preparación.',
          action: {
            type: 'whatsapp',
            label: 'Abrir Chat de WhatsApp Directo ↗',
            url: 'https://wa.me/525512345678?text=Hola%20Sofía,%20quisiera%20agendar%20un%20espacio%20o%20conocer%20cupos%20disponibles'
          }
        };
      }

      // Fallback amigable
      return {
        text: 'Esa es una búsqueda profunda. En Siete Centros abordamos ese proceso integrando Breathwork somático, Kriya Yoga y Tantra meditativo. Puedes explorar nuestras páginas dedicadas o escribirnos directamente a WhatsApp para una orientación personalizada.',
        action: {
          type: 'whatsapp',
          label: 'Consultar Directo por WhatsApp ↗',
          url: `https://wa.me/525512345678?text=Hola%20Sofía,%20tengo%20una%20consulta%20específica:%20${encodeURIComponent(query)}`
        }
      };
    } else {
      // English Logic
      if (q.includes('breath') || q.includes('respir') || q.includes('prana') || q.includes('vagal')) {
        return {
          text: 'Somatic Breathwork at Siete Centros merges vagus nerve regulation, conscious circular breathing, and 432 Hz Tibetan harmonic sound. It gently releases deep trauma stored in the psoas and fascia, resetting brain waves into peak non-dual clarity.',
          action: {
            type: 'link',
            label: 'Explore Breathwork Page ↗',
            url: '/breathwork.html'
          }
        };
      }

      if (q.includes('kriya') || q.includes('spine') || q.includes('sushumna') || q.includes('kundalini')) {
        return {
          text: 'Kriya Yoga is the sacred tantric science of magnetizing the Sushumna Nadi (central spinal channel). Through bīja mantras (LAM, VAM, RAM, YAM, HAM, OM, KSHAM) and rising prana visualization, heavy physical density is transmuted into radiant coronal bliss.',
          action: {
            type: 'link',
            label: 'Explore Kriya Yoga Practice ↗',
            url: '/kriya-yoga.html'
          }
        };
      }

      if (q.includes('tantra') || q.includes('polar') || q.includes('shiva') || q.includes('shakti') || q.includes('couple') || q.includes('sacred sex')) {
        return {
          text: 'Our Tantric practice moves far beyond pop culture: it is the sacred reconciliation of Shiva (still, luminous witness) and Shakti (vibrant ecstatic pulse). Offered for individuals and couples with absolute conscious consent, boundary reverence, and non-demanding touch.',
          action: {
            type: 'link',
            label: 'Discover Tantra Experience ↗',
            url: '/tantra.html'
          }
        };
      }

      if (q.includes('circle') || q.includes('word') || q.includes('fire') || q.includes('community')) {
        return {
          text: 'Word Circles are communal sanctuaries centered around the sacred ceremonial fire. Under the sacred talking stick ethos, we practice judgment-free presence with zero unsolicited advice—a rare vessel for somatic truth.',
          action: {
            type: 'link',
            label: 'Enter Word Circles ↗',
            url: '/circulos-de-palabra.html'
          }
        };
      }

      if (q.includes('retreat') || q.includes('immersion') || q.includes('tepoztlan') || q.includes('valle') || q.includes('tulum') || q.includes('date') || q.includes('cost')) {
        return {
          text: 'Our 2026 Sanctuary Immersions:\n• Tepoztlán (June 18-21): Temple of the Serpent & Silence\n• Valle de Bravo (Sept 24-27): Alchemy of Shadow & Fire\n• Tulum (Nov 12-16): Ouroboros & Rebirth Portal.\n\nAll include boutique eco-luxury lodging, Ayurvedic organic cuisine, and deep guided ceremonies.',
          action: {
            type: 'link',
            label: 'View Retreats & Availability ↗',
            url: '/retiros.html'
          }
        };
      }

      if (q.includes('sofia') || q.includes('founder') || q.includes('guide') || q.includes('teacher')) {
        return {
          text: 'Sofia is the founder and space guardian of Siete Centros. With over a decade of immersion with master yogis in Rishikesh (India), Amazonian vegetal medicine, and European clinical somatics, she holds a grounded, uncompromising field of authentic transformation.',
          action: {
            type: 'whatsapp',
            label: 'Chat with Sofia on WhatsApp ↗',
            url: 'https://wa.me/525512345678?text=Hello%20Sofia,%20I%20would%20love%20to%20learn%20more%20about%20your%20private%20sessions'
          }
        };
      }

      if (q.includes('whatsapp') || q.includes('book') || q.includes('price') || q.includes('contact') || q.includes('schedule')) {
        return {
          text: 'You can connect directly with Sofia and her sanctuary team via WhatsApp to check session availability, exchange pricing, and receive pre-ceremony intake guidelines.',
          action: {
            type: 'whatsapp',
            label: 'Open WhatsApp Chat Directly ↗',
            url: 'https://wa.me/525512345678?text=Hello%20Sofia,%20I%20would%20like%20to%20reserve%20a%20spot%20or%20inquire%20about%20sessions'
          }
        };
      }

      return {
        text: 'That touches a deep aspect of conscious transformation. At Siete Centros, we navigate this through Somatic Breathwork, Kriya Yoga, and Tantric integration. You can explore our dedicated portals or message Sofia directly via WhatsApp.',
        action: {
          type: 'whatsapp',
          label: 'Ask Sofia on WhatsApp ↗',
          url: `https://wa.me/525512345678?text=Hello%20Sofia,%20I%20have%20a%20question:%20${encodeURIComponent(query)}`
        }
      };
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    playSacredPing(432);

    setTimeout(() => {
      const resp = generateResponse(text, currentLang);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: resp.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: resp.action
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      playSacredPing(528);
    }, 700);
  };

  const handleResetChat = () => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'bot',
        text: t.bot.welcome,
        time: now,
        action: {
          type: 'whatsapp',
          label: t.bot.whatsappDirect,
          url: 'https://wa.me/525512345678?text=Hola%20Sofía,%20quisiera%20información%20de%20Siete%20Centros'
        }
      }
    ]);
  };

  return (
    <>
      {/* Botón Flotante Reducido con Emblema Tántrico Sagrado de los 7 Chakras */}
      <div className="tantric-bot-launcher-container" id="tantric-bot-launcher-root">
        {!isOpen && (
          <div className="bot-launcher-relative-wrap">
            {/* Mensaje Holístico Flotante: Solo visible al pasar el mouse */}
            <div className="bot-hover-tooltip" role="tooltip">
              <div className="tooltip-inner">
                <span className="tooltip-symbol">🙏</span>
                <span className="tooltip-msg">{t.bot.hoverGreeting}</span>
              </div>
              <div className="tooltip-arrow" aria-hidden="true" />
            </div>

            <button
              type="button"
              className="tantric-bot-trigger-btn"
              onClick={() => setIsOpen(true)}
              aria-label={t.bot.title}
              title={t.bot.title}
            >
              {/* Halo de Resplandor Místico */}
              <div className="trigger-aura-pulse" aria-hidden="true" />

              {/* Ícono Tántrico Sagrado de los 7 Chakras & Kundalini Spiral */}
              <svg
                className="tantric-chakra-emblem"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FAF7F2" />
                    <stop offset="50%" stopColor="#DFBE90" />
                    <stop offset="100%" stopColor="#A8824B" />
                  </linearGradient>
                  <radialGradient id="binduGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="40%" stopColor="#DFBE90" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>

                {/* Anillo de Protección y 7 Puntos Sagrados de los Chakras */}
                <circle cx="50" cy="50" r="46" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                <circle cx="50" cy="50" r="39" stroke="#DFBE90" strokeWidth="1.2" opacity="0.8" />

                {/* Geometría Sagrada Tántrica: Dos triángulos entrelazados (Yantra / Sello de Shiva-Shakti) */}
                <polygon points="50,16 78,64 22,64" stroke="url(#goldGradient)" strokeWidth="1.4" fill="rgba(223, 190, 144, 0.08)" />
                <polygon points="50,84 22,36 78,36" stroke="url(#goldGradient)" strokeWidth="1.4" fill="rgba(223, 190, 144, 0.08)" />

                {/* 7 Pétalos Circulares Radiantes de los Centros */}
                <circle cx="50" cy="18" r="3.2" fill="#C084FC" /> {/* Corona */}
                <circle cx="68" cy="27" r="2.8" fill="#818CF8" /> {/* 3er Ojo */}
                <circle cx="77" cy="46" r="2.8" fill="#60A5FA" /> {/* Garganta */}
                <circle cx="71" cy="69" r="2.8" fill="#34D399" /> {/* Corazón */}
                <circle cx="50" cy="82" r="3.2" fill="#F87171" /> {/* Raíz */}
                <circle cx="29" cy="69" r="2.8" fill="#FB923C" /> {/* Sacro */}
                <circle cx="23" cy="46" r="2.8" fill="#FACC15" /> {/* Plexo */}

                {/* Espiral Kundalini Central & Punto Bindu */}
                <path
                  d="M 50 50 m -12 0 a 12 12 0 1 0 24 0 a 12 12 0 1 0 -24 0 M 50 50 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0"
                  stroke="url(#goldGradient)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.9"
                />
                <circle cx="50" cy="50" r="3.5" fill="url(#binduGlow)" />
              </svg>

              {hasUnread && <span className="trigger-unread-ping" />}
            </button>
          </div>
        )}
      </div>

      {/* Ventana Modal del Oráculo Tántrico */}
      {isOpen && (
        <aside className="tantric-bot-modal-window" role="dialog" aria-label={t.bot.title}>
          {/* Cabecera del Bot */}
          <div className="bot-header">
            <div className="bot-header-left">
              <div className="bot-avatar-emblem">
                <svg viewBox="0 0 100 100" className="header-chakra-svg" fill="none">
                  <circle cx="50" cy="50" r="42" stroke="#DFBE90" strokeWidth="1.5" />
                  <polygon points="50,18 76,62 24,62" stroke="#FAF7F2" strokeWidth="1.2" fill="rgba(223, 190, 144, 0.15)" />
                  <polygon points="50,82 24,38 76,38" stroke="#FAF7F2" strokeWidth="1.2" fill="rgba(223, 190, 144, 0.15)" />
                  <circle cx="50" cy="50" r="4" fill="#DFBE90" />
                </svg>
                <span className="avatar-live-status" />
              </div>
              <div className="bot-identity">
                <div className="bot-identity-title-row">
                  <h3 className="bot-title">{t.bot.title}</h3>
                  <span className="bot-badge">{t.bot.badge}</span>
                </div>
                <p className="bot-subtitle">{t.bot.subtitle}</p>
              </div>
            </div>

            <div className="bot-header-controls">
              {/* Selector de Idioma (ES / EN) */}
              <button
                type="button"
                className="bot-lang-switch-btn"
                onClick={handleToggleLang}
                title={currentLang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              >
                <span className={currentLang === 'es' ? 'lang-active' : ''}>ES</span>
                <span className="lang-sep">|</span>
                <span className={currentLang === 'en' ? 'lang-active' : ''}>EN</span>
              </button>

              {/* Sonido On/Off */}
              <button
                type="button"
                className="bot-icon-btn"
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? 'Silenciar campanadas' : 'Activar campanadas'}
              >
                {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </button>

              {/* Reiniciar Chat */}
              <button
                type="button"
                className="bot-icon-btn"
                onClick={handleResetChat}
                title="Reiniciar conversación"
              >
                <RefreshCw size={14} />
              </button>

              {/* Cerrar Ventana */}
              <button
                type="button"
                className="bot-icon-btn bot-close-btn"
                onClick={() => setIsOpen(false)}
                title="Minimizar Oráculo"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Cuerpo de Mensajes */}
          <div className="bot-messages-scroll-area">
            {messages.map((m) => (
              <div key={m.id} className={`bot-bubble-row ${m.sender}`}>
                {m.sender === 'bot' && (
                  <div className="bot-mini-avatar" aria-hidden="true">
                    <Sparkles size={13} color="#DFBE90" />
                  </div>
                )}
                <div className="bot-bubble-content">
                  <div className="bot-bubble-text">{m.text}</div>

                  {m.action && (
                    <div className="bot-bubble-action-box">
                      <a
                        href={m.action.url}
                        target={m.action.type === 'whatsapp' ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className={`bot-action-pill ${m.action.type}`}
                      >
                        {m.action.type === 'whatsapp' ? (
                          <MessageCircle size={14} />
                        ) : (
                          <ExternalLink size={14} />
                        )}
                        <span>{m.action.label}</span>
                      </a>
                    </div>
                  )}

                  <span className="bot-bubble-timestamp">{m.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="bot-bubble-row bot">
                <div className="bot-mini-avatar">
                  <Sparkles size={13} color="#DFBE90" />
                </div>
                <div className="bot-bubble-content typing">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chips de Preguntas Sugeridas */}
          <div className="bot-chips-tray">
            <span className="bot-chips-title">{t.bot.suggestionsTitle}</span>
            <div className="bot-chips-scroll">
              {t.bot.chips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="bot-chip-btn"
                  onClick={() => handleSendMessage(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Formulario de Entrada */}
          <form
            className="bot-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              type="text"
              className="bot-input-field"
              placeholder={t.bot.inputPlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              aria-label={t.bot.inputPlaceholder}
            />
            <button
              type="submit"
              className="bot-send-btn"
              disabled={!inputText.trim() || isTyping}
              aria-label={t.bot.send}
            >
              <Send size={15} />
            </button>
          </form>

          {/* Nota al Pie */}
          <div className="bot-disclaimer-bar">
            <span>{t.bot.disclaimer}</span>
          </div>
        </aside>
      )}
    </>
  );
};
