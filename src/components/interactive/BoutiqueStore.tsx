import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  X,
  Plus,
  Minus,
  Trash2,
  Check,
  ShieldCheck,
  Eye,
  Heart,
  Sparkles,
  Package,
  Truck,
  Lock,
  ArrowRight,
  ChevronRight,
  Info,
  Tag,
  AlertCircle
} from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  category: 'femenina' | 'masculino' | 'pareja' | 'lubricacion' | 'masaje' | 'kits';
  categoryLabel: string;
  subType?: 'ondas_aire' | 'rabbit' | 'wand' | 'app' | 'punto_g' | 'bala' | 'flexible' | 'termico';
  price: number;
  originalPrice?: number;
  badge?: 'Novedad' | 'Destacado' | 'Ritual Seleccionado' | 'Exclusivo';
  shortDesc: string;
  fullDesc: string;
  materials: string;
  dimensions: string;
  specs: string[];
  noiseLevel?: string;
  waterproof?: string;
  batteryLife?: string;
  vibeModes?: string;
  usage: string;
  care: string;
  image: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

const PRODUCTS_DATA: Product[] = [
  // =========================================================================
  // 1. ESTIMULACIÓN FEMENINA & VIBRADORES (CATÁLOGO INSPIRADO EN DDURAZNO · PRESENTACIÓN ELEVADA)
  // =========================================================================
  {
    id: 'prod-fem-01',
    name: 'Succionador de Clítoris por Ondas de Aire · Pulsación Lunar',
    category: 'femenina',
    categoryLabel: 'Estimulación Femenina',
    subType: 'ondas_aire',
    price: 1790,
    originalPrice: 2150,
    badge: 'Destacado',
    shortDesc: 'Tecnología de pulsación sónica de aire sin fricción mecánica directa para el despertar progresivo del placer clitoridiano.',
    fullDesc: 'Inspirado en la tecnología de ondas de presión aerodinámicas de alta gama, este estimulador envuelve el centro sensorial con pulsaciones invisibles que activan más de 8,000 terminaciones nerviosas. A diferencia de los vibradores convencionales que saturan los tejidos, sus 11 frecuencias de marea permiten transitar de una caricia etérea a clímax somáticos multidimensionales.',
    materials: 'Silicona líquida biocompatible ultra aterciopelada de grado médico (FDA & RoHS), libre de ftalatos y BPA, anillo exterior dorado con acabado satinado.',
    dimensions: '12.4 cm largo × 4.8 cm ancho × 5.0 cm prof. Peso: 110 g.',
    specs: ['Ondas de Aire Sónicas', '11 Frecuencias', 'IPX7 Sumergible', '< 32 dB Ultra Silencioso', 'Carga Magnética'],
    noiseLevel: '< 32 dB (Prácticamente inaudible)',
    waterproof: 'IPX7 (100% sumergible en tina o regadera)',
    batteryLife: 'Hasta 120 minutos continuos (Batería Li-ion)',
    vibeModes: '11 niveles de presión sónica pulsátil',
    usage: 'Aplicar una gota de lubricante a base de agua en la boquilla. Colocar sobre el centro sin presionar fuertemente; sincronizar la respiración profunda con las primeras olas de succión.',
    care: 'Boquilla de silicona desmontable para lavado higiénico con agua tibia y jabón neutro. Secar al aire en su estuche hermético.',
    image: './images/chakra_7_conciencia.jpg',
    inStock: true
  },
  {
    id: 'prod-fem-02',
    name: 'Vibrador Conejo de Doble Estimulación · Frecuencia Shakti Dual',
    category: 'femenina',
    categoryLabel: 'Estimulación Femenina',
    subType: 'rabbit',
    price: 2290,
    originalPrice: 2650,
    badge: 'Novedad',
    shortDesc: 'Doble motor independiente para estimulación simultánea del Punto G y clítoris con orejitas vibratorias flexibles.',
    fullDesc: 'El diseño arquetípico "Rabbit" perfeccionado con ergonomía somática. Cuenta con dos motores silenciosos de alto par calibrados por separado: uno en el eje curvo interno para masajear la esponja uretral y el punto G, y otro en el estimulador externo clitoridiano. Proporciona una experiencia de placer integral distribuida en toda la pelvis.',
    materials: 'Silicona dérmica hipoalergénica de tacto sedoso y núcleo flexible con memoria anatómica.',
    dimensions: '21.5 cm largo total (12.8 cm insertables) × 3.5 cm diámetro máx.',
    specs: ['Doble Motor Independiente', '12 Patrones Duales', 'Punto G + Clítoris', 'IPX7 Resistente al Agua', 'Silicona Sedosa'],
    noiseLevel: '< 38 dB',
    waterproof: 'IPX7 resistente a inmersión',
    batteryLife: '90 minutos de uso continuo por carga',
    vibeModes: '12 patrones de vibración combinables (144 combinaciones posibles)',
    usage: 'Abundante lubricación con gel base agua. Introducir suavemente en exhalación relajando el suelo pélvico, ajustando las orejitas sobre el clítoris.',
    care: 'Lavar con agua templada y limpiador antibacteriano para juguetes. Evitar aceites minerales que puedan degradar la silicona.',
    image: './images/chakra_2_sacro.jpg',
    inStock: true
  },
  {
    id: 'prod-fem-03',
    name: 'Varita de Masaje Somático de Alta Potencia · Deep Resonance Wand',
    category: 'femenina',
    categoryLabel: 'Estimulación Femenina',
    subType: 'wand',
    price: 1950,
    originalPrice: 2300,
    badge: 'Ritual Seleccionado',
    shortDesc: 'Masajeador de cabezal flexible oscilante con vibraciones de baja frecuencia para desbloqueo pélvico y placer expansivo.',
    fullDesc: 'La legendaria varita mágica ("Magic Wand") reinventada para el ritual contemporáneo. Su cabezal de silicona oscilante flexible de 360° transmite pulsos de profundidad muscular incomparables, ideales para disolver la coraza pélvica, liberar el nervio pudendo y activar zonas erógenas amplias (vulva, monte de venus, sacro, cuello y espalda).',
    materials: 'Cabezal de silicona médica ultra-flexible, mango ergonómico anti-deslizante con polímero ABS satinado.',
    dimensions: '25.0 cm longitud total × 5.2 cm diámetro de cabezal esférico.',
    specs: ['Vibración Profunda Masiva', 'Cabezal Flexible 360°', '20 Patrones + 8 Velocidades', 'Batería 180 min', 'Uso Corporal & Íntimo'],
    noiseLevel: '< 40 dB en frecuencias profundas',
    waterproof: 'Resistente a salpicaduras (Cabezal 100% lavable)',
    batteryLife: '180 minutos de potencia sostenida',
    vibeModes: '8 velocidades progresivas + 20 patrones rítmicos',
    usage: 'Comenzar acariciando el bajo vientre, muslos internos y glúteos para calentar los tejidos antes de posar el cabezal sobre la vulva.',
    care: 'Limpiar el cabezal de silicona con paño húmedo y jabón suave. Carga rápida mediante puerto USB magnético.',
    image: './images/chakra_3_poder.jpg',
    inStock: true
  },
  {
    id: 'prod-fem-04',
    name: 'Vibrador Inteligente con App & Control a Distancia · Conexión Sin Fronteras',
    category: 'femenina',
    categoryLabel: 'Estimulación Femenina',
    subType: 'app',
    price: 2450,
    originalPrice: 2890,
    badge: 'Destacado',
    shortDesc: 'Vibrador anatómico manos libres sincronizable por Bluetooth e Internet con smartphone para juego a distancia y en público.',
    fullDesc: 'Diseñado para encajar de manera imperceptible en la lencería o sostenerse contra la vulva con comodidad anatómica total. Mediante su aplicación encriptada (iOS y Android), tu pareja puede tomar el control de la vibración desde la misma habitación o desde cualquier ciudad del mundo, permitiendo también vibrar al ritmo de la música o de la voz.',
    materials: 'Silicona líquida bio-compatible grado alimenticio, antena Bluetooth 5.0 de bajo consumo, chip de encriptación segura.',
    dimensions: '9.2 cm largo × 3.8 cm ancho curvado × 2.6 cm espesor.',
    specs: ['Control por App Móvil', 'Distancia Ilimitada', 'Modo Manos Libres Panty', '< 30 dB Ultra Discreto', 'Sincronización Musical'],
    noiseLevel: '< 30 dB (Silencio absoluto bajo la ropa)',
    waterproof: 'IPX8 (Completamente sumergible)',
    batteryLife: '100 minutos de juego interactivo',
    vibeModes: 'Modos infinitos customizables desde la pantalla táctil de tu teléfono',
    usage: 'Emparejar con la aplicación móvil en segundos. Deslizar en la braga o sostener con el dedo durante meditaciones de polaridad o paseos compartidos.',
    care: 'Lavar con agua corriente y jabón neutro. Guardar en su bolsa de viaje de terciopelo incluida.',
    image: './images/chakra_6_vision.jpg',
    inStock: true
  },
  {
    id: 'prod-fem-05',
    name: 'Vibrador Ergonómico de Punto G · Alquimia del Eje Sagrado',
    category: 'femenina',
    categoryLabel: 'Estimulación Femenina',
    subType: 'punto_g',
    price: 1680,
    originalPrice: 1990,
    badge: 'Exclusivo',
    shortDesc: 'Curvatura en S biomecánicamente optimizada con punta acentuada para despertar el portal interno del placer.',
    fullDesc: 'Moldeado con una pronunciada curvatura S que encuentra de forma orgánica y sin esfuerzo la pared anterior del canal vaginal. Su motor sónico concentra la energía en el extremo biselado, transmitiendo micro-pulsos que invitan al punto G a expandirse y abrirse a estados de placer tántrico prolongado.',
    materials: 'Silicona biocompatible satinada con tacto aterciopelado "velvet touch", estructura interna de precisión.',
    dimensions: '19.0 cm largo (12.5 cm insertables) × 3.2 cm diámetro en cabezal.',
    specs: ['Curvatura S Anatómica', 'Punta de Enfoque Punto G', '10 Modos de Pulso', 'IPX7 Sumergible', 'Batería Recargable'],
    noiseLevel: '< 35 dB',
    waterproof: 'IPX7 sumergible',
    batteryLife: '120 minutos por ciclo de carga',
    vibeModes: '10 frecuencias de pulsación sónica ascendente',
    usage: 'Acompañar con abundante lubricante base agua. Realizar movimientos suaves de "ven aquí" combinados con respiración circular.',
    care: 'Aclarar bajo agua tibia y secar con toalla de microfibra limpia.',
    image: './images/chakra_1_raiz.jpg',
    inStock: true
  },
  {
    id: 'prod-fem-06',
    name: 'Micro-Vibrador de Bala Portátil · Gota de Oro Silenciosa',
    category: 'femenina',
    categoryLabel: 'Estimulación Femenina',
    subType: 'bala',
    price: 1190,
    originalPrice: 1450,
    badge: 'Novedad',
    shortDesc: 'Diseño ultra-compacto tipo joya minimalista con vibración puntual de alta frecuencia y máxima portabilidad.',
    fullDesc: 'La discreción hecha arte. Este micro-estimulador cabe en la palma de la mano o en el bolsillo más pequeño. Su motor de rotor excéntrico de alta velocidad produce vibraciones punteras muy concentradas, ideales para clítoris, pezones, cuello y puntos marmas durante el juego previo o el autoplacer espontáneo.',
    materials: 'Cuerpo de aleación de zinc hipoalergénica dorada con punta de silicona grado médico ultra suave.',
    dimensions: '7.8 cm largo × 2.0 cm diámetro. Peso: 48 g.',
    specs: ['Tamaño de Bolsillo Lipstick', 'Punta de Silicona Suave', '10 Modos de Frecuencia', 'IPX7 Impermeable', 'Carga USB Rápida'],
    noiseLevel: '< 33 dB',
    waterproof: 'IPX7 resistente al agua',
    batteryLife: '75 minutos continuos',
    vibeModes: '10 modos de vibración progresiva',
    usage: 'Ideal para viaje o mesilla de noche. Encender con una pulsación de 2 segundos en la base dorada.',
    care: 'Limpiar con un paño húmedo y secar antes de guardar.',
    image: './images/emblema_dorado.png',
    inStock: true
  },
  {
    id: 'prod-fem-07',
    name: 'Estimulador Flexible 360° · Ondas de Conciencia Corporal',
    category: 'femenina',
    categoryLabel: 'Estimulación Femenina',
    subType: 'flexible',
    price: 1850,
    badge: 'Ritual Seleccionado',
    shortDesc: 'Cuerpo completamente moldeable con memoria que adopta y sostiene cualquier curvatura deseada por tu anatomía.',
    fullDesc: 'Construido sobre una médula interna de articulación continua revestida de silicona médica ultra-gruesa. Puedes doblarlo en ángulo recto para usar como conejito, arquearlo para el punto G o mantenerlo recto para estimulación externa. Se adapta a tu cuerpo en lugar de forzar a tu cuerpo a adaptarse al juguete.',
    materials: 'Silicona biocompatible de 4mm de espesor sobre estructura de aleación flexible memoria-shape.',
    dimensions: '22.0 cm largo total × 3.0 cm grosor uniforme.',
    specs: ['Flexibilidad 360° con Memoria', 'Multi-Posición Universal', '8 Modos de Vibración', 'IPX7 Sumergible', 'Carga Magnética'],
    noiseLevel: '< 36 dB',
    waterproof: 'IPX7 sumergible',
    batteryLife: '90 minutos de uso continuo',
    vibeModes: '8 modos de ritmo armónico continuo e intermitente',
    usage: 'Moldear con las manos antes o durante el ritual para descubrir el ángulo de mayor resonancia somática.',
    care: 'Lavar con agua templada. La médula flexible resiste más de 10,000 ciclos de flexión.',
    image: './images/chakra_4_corazon.jpg',
    inStock: true
  },
  {
    id: 'prod-fem-08',
    name: 'Vibrador Térmico Somático · Fuego Cálido 38°C',
    category: 'femenina',
    categoryLabel: 'Estimulación Femenina',
    subType: 'termico',
    price: 2350,
    originalPrice: 2750,
    badge: 'Novedad',
    shortDesc: 'Sistema de calentamiento termostático inteligente que alcanza la temperatura corporal biológica de 38°C.',
    fullDesc: 'El frío o la temperatura ambiente pueden generar micro-contracciones involuntarias en los tejidos pélvicos. Este instrumento de alquimia moderna integra micro-resistencias cerámicas que elevan su temperatura interna a 38°C en menos de 3 minutos, imitando el calor vivo de un amante y propiciando la vasodilatación y el relax fascial profundo.',
    materials: 'Silicona médica termoconductora hipoalergénica, núcleo cerámico térmico autoregulado.',
    dimensions: '19.5 cm largo (13.0 cm insertables) × 3.4 cm diámetro.',
    specs: ['Efecto Calor 38°C Fisiológico', 'Relajación Suelo Pélvico', '10 Modos de Vibración', 'IPX7 Impermeable', 'Sensor Inteligente'],
    noiseLevel: '< 34 dB',
    waterproof: 'IPX7 (Completamente sellado)',
    batteryLife: '75 minutos con calor + vibración activados',
    vibeModes: '10 frecuencias de pulsación combinadas con calor',
    usage: 'Activar el botón de calor 3 minutos antes del uso. Disfrutar de la sensación tibia junto a lubricante a base de agua.',
    care: 'Desconectar siempre de la carga antes de lavar. Almacenar seco.',
    image: './images/hero_cosmic_dawn.jpg',
    inStock: true
  },

  // 2. BIENESTAR MASCULINO
  {
    id: 'prod-masc-01',
    name: 'Masturbador Somático Vacío Cósmico',
    category: 'masculino',
    categoryLabel: 'Bienestar Masculino',
    price: 1980,
    originalPrice: 2350,
    badge: 'Destacado',
    shortDesc: 'Manga de textura interna geométrica con modulación de succión y presencia somática masculina.',
    fullDesc: 'Desarrollado para el cultivo de la energía Jing y la prolongación del orgasmo valle según el linaje taoísta. Su cámara anatómica permite practicar la no-eyaculación y la redistribución del fuego vital por el eje espinal.',
    materials: 'Polímero termo-sensible ultrasuave Cyberskin de memoria lenta, carcasa de aluminio mate reciclable.',
    dimensions: '17.5 cm × 7.0 cm interior flexible adaptable',
    specs: ['Textura Geométrica', 'Succión Modulable', 'Cultivo Taoísta Jing', 'Aluminio Cepillado'],
    usage: 'Aplicar abundante lubricante acuoso en la entrada y canal. Practicar respiración diafragmática profunda durante el ritual.',
    care: 'Extraer la manga interna tras cada uso, enjuagar con agua templada y secar a la sombra.',
    image: './images/chakra_3_poder.jpg',
    inStock: true
  },
  {
    id: 'prod-masc-02',
    name: 'Estimulador Perineal & Masajeador de Próstata Shiva Pulse',
    category: 'masculino',
    categoryLabel: 'Bienestar Masculino',
    price: 2400,
    badge: 'Novedad',
    shortDesc: 'Doble motor sincronizado para estimulación prostática y perineal con ángulo ergonómico milimétrico.',
    fullDesc: 'El centro Muladhara masculino resguarda el portal más potente de dicha y regulación nerviosa. Este instrumento activa el punto sagrado prostático facilitando orgasmos somáticos de cuerpo completo sin tensión pélvica.',
    materials: 'Silicona médica de grado quirúrgico, recubrimiento soft-touch satinado, resistente al agua IPX7.',
    dimensions: '14.5 cm longitud total × 3.2 cm cabeza prostática',
    specs: ['Doble Motor Sincronizado', 'Ángulo Anatómico Exacto', 'IPX7 Sumergible', 'Carga Magnética'],
    usage: 'Utilizar exclusivamente con lubricante a base de agua. Introducción lenta acompañada de exhalación con sonido.',
    care: 'Carga magnética por contacto, autonomía de 90 minutos continuos.',
    image: './images/chakra_1_raiz.jpg',
    inStock: true
  },

  // 3. EXPERIENCIAS EN PAREJA
  {
    id: 'prod-par-01',
    name: 'Anillo Vibrador & Conector Shiva-Shakti',
    category: 'pareja',
    categoryLabel: 'Experiencias en Pareja',
    price: 1450,
    badge: 'Destacado',
    shortDesc: 'Anillo ergonómico elástico de alta contención con micro-almohadilla vibrante para ambos amantes.',
    fullDesc: 'Permite sincronizar el pulso del pene con la estimulación simultánea del clítoris durante la unión sagrada (Maithuna). Prolonga la erección y magnifica el contacto íntimo piel con piel sin entorpecer el movimiento.',
    materials: 'Silicona ultra elástica con memoria de recuperación inmediata, motor micro-sónico silencioso.',
    dimensions: 'Diámetro expandible 2.5 cm a 5.0 cm',
    specs: ['Estimulación Simultánea', 'Silicona Elástica Ultra-Soft', '7 Modos de Pulso', 'Recargable USB'],
    usage: 'Colocar en la base al inicio de la unión. Ajustar entre 7 frecuencias de resonancia armónica.',
    care: 'Limpiar con toallitas íntimas biodegradables o agua tibia con jabón suave.',
    image: './images/chakra_4_corazon.jpg',
    inStock: true
  },
  {
    id: 'prod-par-02',
    name: 'Vibrador Doble para Conexión Tántrica Yab-Yum',
    category: 'pareja',
    categoryLabel: 'Experiencias en Pareja',
    price: 2850,
    badge: 'Ritual Seleccionado',
    shortDesc: 'Diseño en forma de U flexible para uso simultáneo durante la penetración consciente.',
    fullDesc: 'Un extremo estimula internamente el punto G y las paredes vaginales mientras el otro reposa en el clítoris y transmite vibraciones compartidas al amante durante el abrazo sagrado Yab-Yum.',
    materials: 'Silicona flexible con memoria adaptable al contorno corporal íntimo, control remoto discreto inalámbrico.',
    dimensions: 'Longitud insertable 8.5 cm × 3.0 cm grosor',
    specs: ['Diseño Forma U Flexible', 'Uso en Penetración', 'Control Remoto Inalámbrico', 'IPX7 Sumergible'],
    usage: 'Flexionar con las manos antes de introducir para adecuarlo a la anatomía femenina particular.',
    care: 'Totalmente sumergible. Almacenar seco en su estuche hermético.',
    image: './images/exp_tantra.jpg',
    inStock: true
  },
  {
    id: 'prod-par-03',
    name: 'Juego de Cartas & Oráculo de Intimidad Consciente',
    category: 'pareja',
    categoryLabel: 'Experiencias en Pareja',
    price: 890,
    badge: 'Novedad',
    shortDesc: 'Baraja ceremonial de 54 cartas con rituales de mirada, tacto, verdad compartida y límites sagrados.',
    fullDesc: 'Una invitación para salir del automatismo y adentrarse en la intimidad tántrica de alta presencia. Dividido en 3 niveles de profundidad: Mirada & Silencio, Toque Desinteresado y Alquimia del Fuego.',
    materials: 'Cartulina de lino 350g con barniz dorado mate y bordes en pan de oro metalizado.',
    dimensions: 'Caja rígida 14 cm × 9 cm × 4 cm',
    specs: ['54 Cartas Rituales', 'Bordes Pan de Oro', '3 Niveles de Conexión', 'Guía Tántrica Incluida'],
    usage: 'Elegir una carta por velada. Respirar juntos 3 minutos antes de comenzar la consigna propuesta.',
    care: 'Conservar en altar o mesilla de noche en su caja protectora.',
    image: './images/community_circle.jpg',
    inStock: true
  },

  // 4. LUBRICACIÓN Y CUIDADO
  {
    id: 'prod-lub-01',
    name: 'Elixir de Seda Botánica · Lubricante Base Agua & Aloe Puro',
    category: 'lubricacion',
    categoryLabel: 'Lubricación y Cuidado',
    price: 580,
    badge: 'Destacado',
    shortDesc: 'Fórmula biocompatible enriquecida con caléndula, aloe vera orgánico y ácido hialurónico vegetal.',
    fullDesc: 'Hidrata y respeta con delicadeza el microbioma vaginal e íntimo. Su textura imita con precisión milimétrica la lubricación natural del cuerpo sin dejar sensación pegajosa ni alterar el pH natural.',
    materials: 'Extracto de aloe vera orgánico, hialuronato de sodio, extracto de manzanilla, base acuosa purificada.',
    dimensions: 'Frasco de vidrio violeta Miron 100 ml con dispensador dosificador dos gotas.',
    specs: ['Base Agua Biocompatible', 'Aloe Vera + Hialurónico', 'pH Fisiológico Equilibrado', 'Vidrio Violeta Miron'],
    usage: 'Aplicar la cantidad deseada sobre la piel íntima o juguetes. Compatible con silicona y látex.',
    care: 'Mantener protegido de la luz solar directa en lugar fresco.',
    image: './images/chakra_5_voz.jpg',
    inStock: true
  },
  {
    id: 'prod-lub-02',
    name: 'Néctar de Silicona Ultra Deslizante Terciopelo',
    category: 'lubricacion',
    categoryLabel: 'Lubricación y Cuidado',
    price: 640,
    badge: 'Ritual Seleccionado',
    shortDesc: 'Deslizamiento infinito para exploraciones sensoriales prolongadas e hidro-rituales bajo la ducha.',
    fullDesc: 'Formulado para prácticas que requieren máxima sedosidad duradera sin necesidad de reaplicación constante. No se absorbe con el agua, ideal para masajes genitales y exploraciones tántricas de larga duración.',
    materials: 'Dimeticona purificada de grado médico no comedogénica, vitamina E antioxidante.',
    dimensions: 'Frasco de vidrio esmerilado con bomba dosificadora 120 ml.',
    specs: ['Deslizamiento Infinito', 'Hidro-Ritual Ducha & Tina', 'Grado Médico No Comedogénico', 'Larga Duración'],
    usage: 'Unas pocas gotas rinden para todo el ritual. No utilizar directamente sobre juguetes de silicona suave.',
    care: 'Cerrar herméticamente tras su uso.',
    image: './images/chakra_2_sacro.jpg',
    inStock: true
  },

  // 5. MASAJE Y SENSUALIDAD
  {
    id: 'prod-mas-01',
    name: 'Vela Ceremonial para Masaje Tibio Sándalo & Vainilla de Papantla',
    category: 'masaje',
    categoryLabel: 'Masaje y Sensualidad',
    price: 780,
    badge: 'Destacado',
    shortDesc: 'Cera vegetal de soja y manteca de karité que funde a baja temperatura para verter directo sobre la piel.',
    fullDesc: 'Al encenderse, llena el santuario con notas balsámicas de sándalo sagrado y vainilla silvestre. Su cera derretida alcanza la temperatura exacta de 38°C para nutrir profundamente los tejidos y relajar el sistema nervioso.',
    materials: 'Cera de soja no transgénica, manteca de karité virgen, aceites esenciales de grado aromaterapia.',
    dimensions: 'Cuenco artesanal de cerámica negra con pico vertedor 220 g (45h combustión).',
    specs: ['Funde a 38°C Tibio', '100% Cera de Soja & Karité', 'Aromaterapia Sándalo', 'Cuenco de Cerámica'],
    usage: 'Encender 15 minutos antes del masaje. Apagar la llama y verter el aceite tibio en las palmas de las manos.',
    care: 'Recortar la mecha de algodón antes de cada encendido.',
    image: './images/hero_cosmic_dawn.jpg',
    inStock: true
  },
  {
    id: 'prod-mas-02',
    name: 'Aceite de Tacto Consciente Rosa Damascena & Jojoba Dorada',
    category: 'masaje',
    categoryLabel: 'Masaje y Sensualidad',
    price: 890,
    badge: 'Novedad',
    shortDesc: 'Aceite corporal consagrado para despertar la piel como el órgano de percepción no dual más vasto.',
    fullDesc: 'Prensado en frío a partir de semillas de jojoba dorada y flores frescas de rosa damascena. Penetra sin obstruir poros dejando un velo perfumado que reconecta al amante con el centro del corazón.',
    materials: 'Aceite de jojoba orgánico prensado en frío, absoluto de rosa damascena, aceite de almendras dulces.',
    dimensions: 'Frasco de cristal ámbar protector con gotero de precisión 100 ml.',
    specs: ['Prensado en Frío', 'Absoluto de Rosa Damascena', 'Jojoba Orgánica', 'Rápida Absorción'],
    usage: 'Calentar entre las manos frotando enérgicamente antes de posarlas sobre la espalda, pecho o vientre.',
    care: 'Almacenar en ambiente fresco y seco.',
    image: './images/exp_meditacion.jpg',
    inStock: true
  },

  // 6. KITS Y RITUALES
  {
    id: 'prod-kit-01',
    name: 'Caja Ritual Sagrada Shiva & Shakti · Edición Parejas',
    category: 'kits',
    categoryLabel: 'Kits y Rituales',
    price: 3450,
    originalPrice: 4100,
    badge: 'Destacado',
    shortDesc: 'Experiencia completa de iniciación tántrica: vela de masaje, pluma de ganso, aceite botánico y oráculo.',
    fullDesc: 'La caja ceremonial de SIETE CENTROS reúne todos los elementos necesarios para consagrar una noche de conexión sin metas ni presiones. Incluye guía impresa con 5 rituales paso a paso creados por nuestros facilitadores.',
    materials: 'Caja rígida con acabado terciopelo negro y estampación dorada, 5 elementos ceremoniales en su interior.',
    dimensions: '32 cm × 24 cm × 9 cm',
    specs: ['Caja de Lujo Terciopelo', '5 Elementos Ceremoniales', 'Guía Tántrica de Iniciación', 'Edición Parejas'],
    usage: 'Diseñado para abrir un espacio de intimidad de 2 a 3 horas de presencia compartida.',
    care: 'Todos los elementos son reutilizables y recargables.',
    image: './images/logo_siete_centros_luxury.png',
    inStock: true
  },
  {
    id: 'prod-kit-02',
    name: 'Kit de Exploración Sensorial & Presencia Íntima Individual',
    category: 'kits',
    categoryLabel: 'Kits y Rituales',
    price: 2890,
    originalPrice: 3300,
    badge: 'Novedad',
    shortDesc: 'Vibrador táctil compacto, elixir de seda botánica 50ml, antifaz de seda pura y guía de autoplacer meditativo.',
    fullDesc: 'Un viaje de autodescubrimiento para habitar el templo del propio cuerpo. Desactiva la prisa y cultiva una relación de reverencia hacia la propia energía sexual como fuente de vitalidad y bienestar.',
    materials: 'Antifaz de seda mora 22 momme, estimulador ergonómico en silicona médica, frasco dosificador de cristal.',
    dimensions: 'Estuche de viaje rígido discreto 22 cm × 14 cm × 6 cm',
    specs: ['Antifaz de Seda Mora', 'Micro-Vibrador de Lujo', 'Elixir 50ml', 'Estuche Rígido Discreto'],
    usage: 'Recomendado para sesiones semanales de auto-conexión y liberación somática.',
    care: 'Mantener en su estuche discreto con cierre hermético.',
    image: './images/chakra_4_corazon.jpg',
    inStock: true
  }
];

const CATEGORIES = [
  { id: 'all', label: 'Todos los Rituales' },
  { id: 'femenina', label: 'Estimulación Femenina' },
  { id: 'masculino', label: 'Bienestar Masculino' },
  { id: 'pareja', label: 'Experiencias en Pareja' },
  { id: 'lubricacion', label: 'Lubricación & Cuidado' },
  { id: 'masaje', label: 'Masaje & Sensualidad' },
  { id: 'kits', label: 'Kits & Rituales' }
];

const CART_STORAGE_KEY = 'siete_centros_boutique_cart';

export const BoutiqueStore: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubType, setSelectedSubType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [couponError, setCouponError] = useState<string>('');

  // Formulario de Envío Discreto
  const [shippingForm, setShippingForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    notes: 'Empaque 100% discreto y confidencial sin rótulos comerciales.'
  });

  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  // Sincronizar Carrito con LocalStorage y Despachar Evento Global para la Navbar
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      window.dispatchEvent(new CustomEvent('siete_centros_cart_updated', { detail: { count: totalItems } }));
    } catch (e) {
      console.warn('Could not save cart state', e);
    }
  }, [cart]);

  // Escuchar si desde la barra de navegación u otro botón se pide abrir el carrito
  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener('siete_centros_open_cart', handleOpenCart);
    return () => window.removeEventListener('siete_centros_open_cart', handleOpenCart);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesCat = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSub =
        selectedCategory !== 'femenina' ||
        selectedSubType === 'all' ||
        product.subType === selectedSubType;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.shortDesc.toLowerCase().includes(q) ||
        product.categoryLabel.toLowerCase().includes(q) ||
        (product.specs && product.specs.some(s => s.toLowerCase().includes(q)));
      return matchesCat && matchesSub && matchesSearch;
    });
  }, [selectedCategory, selectedSubType, searchQuery]);

  const cartTotalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  // Envío gratuito en compras superiores a $1,500 MXN
  const shippingCost = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= 1500 ? 0 : 180;
  }, [subtotal]);

  const discountAmount = useMemo(() => {
    return couponApplied ? Math.round(subtotal * 0.1) : 0;
  }, [couponApplied, subtotal]);

  const finalTotal = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + shippingCost);
  }, [subtotal, discountAmount, shippingCost]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'SIETECENTROS' || clean === 'CONCIENCIA10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponApplied(false);
      setCouponError('Cupón inválido. Prueba con SIETECENTROS para 10% OFF.');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingForm.name || !shippingForm.phone || !shippingForm.address) {
      alert('Por favor completa los campos de nombre, teléfono y dirección.');
      return;
    }
    setOrderConfirmed(true);
  };

  // Generar link de confirmación a WhatsApp Concierge
  const generateWhatsAppCheckoutLink = () => {
    const itemsList = cart
      .map((item) => `• ${item.quantity}x ${item.product.name} ($${item.product.price * item.quantity} MXN)`)
      .join('\n');

    const message = `✦ NUEVO PEDIDO BOUTIQUE SIETE CENTROS ✦\n\n` +
      `Cliente: ${shippingForm.name}\n` +
      `Teléfono: ${shippingForm.phone}\n` +
      `Ciudad: ${shippingForm.city || 'No especificada'} (CP: ${shippingForm.postalCode || 'S/N'})\n` +
      `Dirección: ${shippingForm.address}\n\n` +
      `PRODUCTOS:\n${itemsList}\n\n` +
      `Subtotal: $${subtotal.toLocaleString()} MXN\n` +
      `Envío Discreto: ${shippingCost === 0 ? 'GRATIS' : `$${shippingCost} MXN`}\n` +
      (couponApplied ? `Descuento Cupón: -$${discountAmount.toLocaleString()} MXN\n` : '') +
      `TOTAL FINAL: $${finalTotal.toLocaleString()} MXN\n\n` +
      `Nota: ${shippingForm.notes}\n` +
      `Deseo proceder con el pago y confirmación segura de mi pedido.`;

    return `https://wa.me/5215512345678?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="boutique-luxury-section" id="boutique" aria-label="Boutique de Bienestar Íntimo y Placer Consciente">
      {/* Header Institucional de la Boutique */}
      <header className="boutique-header">
        <div className="boutique-eyebrow">
          <Sparkles size={13} />
          <span>E-Commerce de Lujo & Bienestar</span>
        </div>
        <h2 className="boutique-title">BOUTIQUE</h2>
        <div className="boutique-subtitle">Rituales de Placer</div>
        <p className="boutique-intro">
          «Una selección especial de productos para explorar tus sentidos, descubrir nuevas experiencias y disfrutar de tu intimidad».
        </p>
      </header>

      {/* Toolbar: Buscador, Filtros y Carrito Trigger */}
      <div className="boutique-toolbar">
        <div className="boutique-search-box">
          <Search size={16} className="boutique-search-icon" />
          <input
            type="text"
            className="boutique-search-input"
            placeholder="Buscar por producto, ritual o experiencia..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="boutique-toolbar-actions">
          <button
            type="button"
            className="boutique-cart-trigger"
            onClick={() => setIsCartOpen(true)}
            aria-label="Abrir Carrito de Compras"
          >
            <ShoppingBag size={17} />
            <span>Mi Carrito</span>
            <span className="boutique-cart-count">{cartTotalItems}</span>
          </button>
        </div>
      </div>

      {/* Categorías Tabs */}
      <nav className="boutique-categories-nav" aria-label="Categorías de la Boutique">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`boutique-cat-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(cat.id);
              setSelectedSubType('all');
            }}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {/* Sub-Filtros Especializados de Vibradores (Estilo Ddurazno · Curaduría Siete Centros) */}
      {(selectedCategory === 'femenina' || selectedCategory === 'all') && (
        <div className="boutique-subfilters-bar" aria-label="Filtros por tipo de vibrador">
          <span className="subfilters-label">
            <Filter size={12} />
            <span>Colección Vibradores:</span>
          </span>
          <div className="subfilters-pills">
            {[
              { id: 'all', label: 'Todos los Modelos' },
              { id: 'ondas_aire', label: '✦ Ondas de Aire' },
              { id: 'rabbit', label: '✦ Conejito (Rabbit Dual)' },
              { id: 'wand', label: '✦ Varita Wand Alta Potencia' },
              { id: 'app', label: '✦ App & Control Distancia' },
              { id: 'punto_g', label: '✦ Punto G Ergonómico' },
              { id: 'bala', label: '✦ Bala Discreta de Lujo' },
              { id: 'flexible', label: '✦ Moldeable 360°' },
              { id: 'termico', label: '✦ Calor Fisiológico 38°C' }
            ].map((sub) => (
              <button
                key={sub.id}
                type="button"
                className={`subfilter-pill-btn ${selectedSubType === sub.id ? 'active' : ''}`}
                onClick={() => {
                  if (selectedCategory !== 'femenina') setSelectedCategory('femenina');
                  setSelectedSubType(sub.id);
                }}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid de Productos */}
      <div className="boutique-products-grid">
        {filteredProducts.map((prod) => (
          <article key={prod.id} className="product-card">
            <div className="product-card-media" onClick={() => setSelectedProduct(prod)}>
              <img src={prod.image} alt={prod.name} className="product-card-img" loading="lazy" />
              <div className="product-card-overlay" />

              {/* Badges de producto */}
              <div className="product-badge-group">
                {prod.badge && (
                  <span
                    className={`product-badge ${
                      prod.badge === 'Novedad'
                        ? 'product-badge-new'
                        : prod.badge === 'Exclusivo'
                        ? 'product-badge-exclusive'
                        : 'product-badge-featured'
                    }`}
                  >
                    {prod.badge}
                  </span>
                )}
                {prod.category === 'femenina' && (
                  <span className="product-badge product-badge-discreet">
                    Envío 100% Discreto
                  </span>
                )}
              </div>

              {/* Botón rápido para abrir modal */}
              <button
                type="button"
                className="product-card-details-quick"
                title="Ver Ficha y Ritual"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(prod);
                }}
              >
                <Eye size={16} />
              </button>
            </div>

            <div className="product-card-content">
              <div className="product-card-header-meta">
                <span className="product-category-tag">{prod.categoryLabel}</span>
                {prod.noiseLevel && (
                  <span className="product-noise-pill" title="Nivel de sonido">
                    {prod.noiseLevel.split(' ')[0]} {prod.noiseLevel.split(' ')[1]}
                  </span>
                )}
              </div>

              <h3 className="product-card-name" onClick={() => setSelectedProduct(prod)}>
                {prod.name}
              </h3>
              <p className="product-card-desc">{prod.shortDesc}</p>

              {/* Pastillas de especificaciones rápidas */}
              {prod.specs && prod.specs.length > 0 && (
                <div className="product-specs-chips-row">
                  {prod.specs.slice(0, 3).map((spec, sIdx) => (
                    <span key={sIdx} className="product-spec-chip">
                      {spec}
                    </span>
                  ))}
                </div>
              )}

              <div className="product-card-price-row">
                <span className="product-price">${prod.price.toLocaleString()} MXN</span>
                {prod.originalPrice && (
                  <span className="product-price-original">
                    ${prod.originalPrice.toLocaleString()} MXN
                  </span>
                )}
              </div>

              <div className="product-card-discreet-footer">
                <ShieldCheck size={13} className="discreet-icon" />
                <span>Envío neutro a todo México · Sin logos</span>
              </div>

              <button
                type="button"
                className="product-add-cart-btn"
                onClick={() => addToCart(prod)}
              >
                <ShoppingBag size={14} />
                <span>Agregar al Carrito</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'rgba(255,255,255,0.6)' }}>
          <p>No se encontraron rituales ni productos con esos criterios de búsqueda.</p>
          <button
            type="button"
            className="boutique-cat-btn"
            style={{ marginTop: '1rem' }}
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
          >
            Restablecer Filtros
          </button>
        </div>
      )}

      {/* ====================================================================
          DRAWER LATERAL DE CARRITO
          ==================================================================== */}
      {isCartOpen && (
        <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-drawer-header">
              <h3 className="cart-drawer-title">
                <ShoppingBag size={18} color="var(--gold-bright, #E5C07B)" />
                <span>Tu Carrito Sensorial</span>
              </h3>
              <button
                type="button"
                className="cart-drawer-close"
                onClick={() => setIsCartOpen(false)}
                aria-label="Cerrar Carrito"
              >
                <X size={20} />
              </button>
            </div>

            <div className="cart-drawer-items">
              {cart.length === 0 ? (
                <div className="cart-empty-message">
                  <ShoppingBag size={48} className="cart-empty-icon" />
                  <p>Tu carrito está vacío.</p>
                  <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                    Explora nuestra selección para invocar nuevas sensaciones y bienestar íntimo.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="cart-item">
                    <img src={item.product.image} alt={item.product.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <h4 className="cart-item-title">{item.product.name}</h4>
                      <div className="cart-item-price">
                        ${(item.product.price * item.quantity).toLocaleString()} MXN
                      </div>
                      <div className="cart-item-controls">
                        <div className="cart-qty-selector">
                          <button
                            type="button"
                            className="cart-qty-btn"
                            onClick={() => updateQuantity(item.product.id, -1)}
                            aria-label="Disminuir cantidad"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="cart-qty-number">{item.quantity}</span>
                          <button
                            type="button"
                            className="cart-qty-btn"
                            onClick={() => updateQuantity(item.product.id, 1)}
                            aria-label="Aumentar cantidad"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <button
                          type="button"
                          className="cart-remove-btn"
                          onClick={() => removeFromCart(item.product.id)}
                          aria-label="Eliminar producto"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-drawer-footer">
                {/* Cupones */}
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Cupón (ej. SIETECENTROS)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    style={{ padding: '0.45rem 0.8rem', fontSize: '0.82rem', flex: 1 }}
                  />
                  <button
                    type="submit"
                    className="boutique-cat-btn"
                    style={{ padding: '0.45rem 0.8rem' }}
                  >
                    Aplicar
                  </button>
                </form>

                {couponApplied && (
                  <div style={{ color: '#34D399', fontSize: '0.8rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Check size={14} /> Cupón del 10% de descuento aplicado con éxito.
                  </div>
                )}
                {couponError && (
                  <div style={{ color: '#F43F5E', fontSize: '0.8rem', marginBottom: '0.8rem' }}>
                    {couponError}
                  </div>
                )}

                <div className="cart-subtotal-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()} MXN</span>
                </div>

                <div className="cart-subtotal-row">
                  <span>Envío Discreto</span>
                  <span>{shippingCost === 0 ? 'GRATIS (Supera $1,500)' : `$${shippingCost} MXN`}</span>
                </div>

                {couponApplied && (
                  <div className="cart-subtotal-row" style={{ color: '#34D399' }}>
                    <span>Descuento (10%)</span>
                    <span>-${discountAmount.toLocaleString()} MXN</span>
                  </div>
                )}

                <div className="cart-total-row">
                  <span>Total</span>
                  <span className="cart-total-amount">${finalTotal.toLocaleString()} MXN</span>
                </div>

                <div className="cart-discreet-notice">
                  <ShieldCheck size={16} color="var(--gold-bright, #E5C07B)" />
                  <span>Empaque 100% discreto, sin referencias exteriores de producto.</span>
                </div>

                <button
                  type="button"
                  className="cart-checkout-btn"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                >
                  <span>Proceder al Checkout</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL DE DETALLE DE PRODUCTO ELEVADO (PRESENTACIÓN PREMIUM DE LUJO)
          ==================================================================== */}
      {selectedProduct && (
        <div className="cart-drawer-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cart-drawer-close"
              style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}
              onClick={() => setSelectedProduct(null)}
              aria-label="Cerrar Ficha"
            >
              <X size={20} />
            </button>

            <div className="product-modal-media">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="product-modal-img" />
              <div className="product-modal-badge-float">
                <span className="product-modal-badge-cert">
                  <ShieldCheck size={14} />
                  <span>Grado Médico Biocompatible</span>
                </span>
              </div>
            </div>

            <div className="product-modal-body">
              <div className="product-modal-header-meta">
                <span className="product-category-tag">{selectedProduct.categoryLabel}</span>
                {selectedProduct.badge && (
                  <span className="product-badge product-badge-featured">
                    {selectedProduct.badge}
                  </span>
                )}
              </div>

              <h3 className="product-modal-title">
                {selectedProduct.name}
              </h3>

              <div className="product-card-price-row" style={{ marginBottom: '1rem' }}>
                <span className="product-price" style={{ fontSize: '1.45rem' }}>
                  ${selectedProduct.price.toLocaleString()} MXN
                </span>
                {selectedProduct.originalPrice && (
                  <span className="product-price-original" style={{ fontSize: '1rem' }}>
                    ${selectedProduct.originalPrice.toLocaleString()} MXN
                  </span>
                )}
              </div>

              {/* Grid de 4 Especificaciones Rápidas */}
              <div className="product-specs-grid-mini">
                <div className="spec-mini-card">
                  <span className="spec-mini-icon">🤫</span>
                  <div className="spec-mini-text">
                    <span className="spec-mini-label">Sonido</span>
                    <span className="spec-mini-val">{selectedProduct.noiseLevel || '< 35 dB Silencioso'}</span>
                  </div>
                </div>

                <div className="spec-mini-card">
                  <span className="spec-mini-icon">💧</span>
                  <div className="spec-mini-text">
                    <span className="spec-mini-label">Agua</span>
                    <span className="spec-mini-val">{selectedProduct.waterproof || 'IPX7 Sumergible'}</span>
                  </div>
                </div>

                <div className="spec-mini-card">
                  <span className="spec-mini-icon">⚡</span>
                  <div className="spec-mini-text">
                    <span className="spec-mini-label">Carga</span>
                    <span className="spec-mini-val">{selectedProduct.batteryLife || 'Recargable USB Magnético'}</span>
                  </div>
                </div>

                <div className="spec-mini-card">
                  <span className="spec-mini-icon">🎛️</span>
                  <div className="spec-mini-text">
                    <span className="spec-mini-label">Frecuencias</span>
                    <span className="spec-mini-val">{selectedProduct.vibeModes || 'Múltiples Modos'}</span>
                  </div>
                </div>
              </div>

              <p className="product-modal-desc-full">
                {selectedProduct.fullDesc}
              </p>

              {/* Ficha Técnica y Ritual */}
              <ul className="product-specs-list">
                <li className="product-spec-item">
                  <span className="product-spec-label">Materiales:</span>
                  <span>{selectedProduct.materials}</span>
                </li>
                <li className="product-spec-item">
                  <span className="product-spec-label">Dimensiones:</span>
                  <span>{selectedProduct.dimensions}</span>
                </li>
                <li className="product-spec-item">
                  <span className="product-spec-label">Ritual de Uso:</span>
                  <span>{selectedProduct.usage}</span>
                </li>
                <li className="product-spec-item">
                  <span className="product-spec-label">Cuidados:</span>
                  <span>{selectedProduct.care}</span>
                </li>
              </ul>

              {/* Banner de Garantía y Envío Discreto México */}
              <div className="product-modal-discreet-banner">
                <Package size={18} className="banner-icon" />
                <div className="banner-text">
                  <strong>Envío 100% Discreto a Todo México:</strong> Empaque completamente neutro, sin nombres de productos ni logotipos comerciales en el exterior. Privacidad blindada.
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '1.2rem', display: 'flex', gap: '1rem' }}>
                <button
                  type="button"
                  className="cart-checkout-btn"
                  style={{ flex: 1 }}
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>Agregar al Carrito (${selectedProduct.price.toLocaleString()} MXN)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL DE CHECKOUT & CONFIRMACIÓN DISCRETA
          ==================================================================== */}
      {isCheckoutOpen && (
        <div className="cart-drawer-overlay" onClick={() => setIsCheckoutOpen(false)}>
          <div className="checkout-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cart-drawer-close"
              style={{ position: 'absolute', top: '1rem', right: '1rem' }}
              onClick={() => {
                setIsCheckoutOpen(false);
                setOrderConfirmed(false);
              }}
            >
              <X size={20} />
            </button>

            {!orderConfirmed ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  <Lock size={18} color="var(--gold-bright, #E5C07B)" />
                  <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: 'var(--gold, #C5A880)', textTransform: 'uppercase' }}>
                    Checkout Seguro & Confidencial
                  </span>
                </div>
                <h3 className="boutique-title" style={{ fontSize: '1.4rem' }}>Datos de Envío Discreto</h3>
                <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.7)', margin: '0.3rem 0 1rem 0' }}>
                  Todos los paquetes se envían en cajas lisas, precintadas y sin ninguna referencia al contenido o la marca.
                </p>

                <form onSubmit={handleCheckoutSubmit} className="checkout-form">
                  <div className="form-group">
                    <label className="form-label">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="Tu nombre o pseudónimo preferido"
                      value={shippingForm.name}
                      onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Teléfono WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        className="form-input"
                        placeholder="+52 55 ..."
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Correo Electrónico</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="correo@ejemplo.com"
                        value={shippingForm.email}
                        onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Dirección Completa de Entrega *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="Calle, Número exterior e interior, Colonia"
                      value={shippingForm.address}
                      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Ciudad / Estado</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Ej. CDMX / Tepoztlán"
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Código Postal</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Ej. 06700"
                        value={shippingForm.postalCode}
                        onChange={(e) => setShippingForm({ ...shippingForm, postalCode: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Instrucciones Especiales de Entrega</label>
                    <input
                      type="text"
                      className="form-input"
                      value={shippingForm.notes}
                      onChange={(e) => setShippingForm({ ...shippingForm, notes: e.target.value })}
                    />
                  </div>

                  <div style={{ background: 'rgba(197, 168, 128, 0.08)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(197,168,128,0.2)', marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#FFFFFF', fontWeight: 600 }}>
                      <span>Total a Coordinar:</span>
                      <span style={{ color: 'var(--gold-bright, #E5C07B)' }}>${finalTotal.toLocaleString()} MXN</span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.4rem' }}>
                      Incluye {cartTotalItems} {cartTotalItems === 1 ? 'producto' : 'productos'} con entrega y empaque discreto.
                    </div>
                  </div>

                  <button type="submit" className="cart-checkout-btn" style={{ marginTop: '0.5rem' }}>
                    <span>Confirmar y Finalizar Pedido</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(52, 211, 153, 0.15)', border: '1px solid #34D399', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem auto', color: '#34D399' }}>
                  <Check size={32} />
                </div>
                <h3 className="boutique-title" style={{ fontSize: '1.6rem', color: '#FFFFFF' }}>
                  ¡Pedido Preparado con Éxito!
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.8)', maxWidth: '420px', margin: '0.8rem auto 1.5rem auto', lineHeight: '1.6' }}>
                  Tu orden ha sido registrada para atención personalizada por nuestro Concierge. Para formalizar el pago seguro (transferencia SPEI, tarjeta o enlace seguro) y coordinar el despacho inmediato:
                </p>

                <a
                  href={generateWhatsAppCheckoutLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cart-checkout-btn"
                  style={{ textDecoration: 'none', display: 'inline-flex' }}
                >
                  <Lock size={16} />
                  <span>Abrir Chat Seguro en WhatsApp con Detalle de Pedido ↗</span>
                </a>

                <div style={{ marginTop: '1.5rem', fontSize: '0.76rem', color: 'rgba(255,255,255,0.5)' }}>
                  Garantía de confidencialidad, empaque discreto e higiene total certificada de SIETE CENTROS.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

