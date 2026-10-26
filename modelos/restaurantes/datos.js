// ============================================================
//  DATOS DEL LOCAL  —  editar este archivo por cada restaurante
// ============================================================
//  OJO: la carta NO va acá. Va en carta.json, que es el archivo
//  que después va a escupir el sistema de gestión.
//  Acá va todo lo demás: identidad, contacto, horarios, textos.
// ============================================================

const DATOS = {

  // --- IDENTIDAD -------------------------------------------
  nombre: "La Esquina",
  etiqueta: "Cocina de barrio · desde 1998",   // va arriba del nombre
  bajada: "Pastas caseras, parrilla y una carta corta que cambia con la estación.",
  acento: "#9A3412",            // terracota: cálido, no grita

  // --- CONTACTO ---------------------------------------------
  whatsapp: "5491100000000",    // ejemplo: no es una línea real
  telefonoVisible: "11 4000-0000",
  mensajeWhatsapp: "Hola! Quiero reservar una mesa en La Esquina.",
  instagram: "laesquina.resto",
  email: "hola@laesquina.com.ar",

  // --- RESERVAS ---------------------------------------------
  // Si el local toma reservas por otro lado (TheFork, Meitre),
  // poné el link acá y los botones llevan ahí en vez de a WhatsApp.
  linkReservas: null,
  textoCta: "Guardamos tu mesa.\nSin seña, sin vueltas.",

  // --- UBICACIÓN --------------------------------------------
  direccion: "Av. Córdoba 4700",
  barrio: "Palermo, CABA",
  mapa: "https://maps.google.com/?q=Av+Cordoba+4700+Palermo+CABA",

  // `dias` son los números de día que cubre cada fila, con
  // domingo = 0. Sirve para marcar el horario de hoy.
  horarios: [
    { dia: "Martes a jueves", hora: "12:00 — 15:30 · 20:00 — 00:00", dias: [2, 3, 4] },
    { dia: "Viernes y sábado", hora: "12:00 — 16:00 · 20:00 — 01:00", dias: [5, 6] },
    { dia: "Domingo",          hora: "12:00 — 16:00",                 dias: [0] },
    { dia: "Lunes",            hora: "Cerrado", cerrado: true,        dias: [1] },
  ],

  // --- FOTO DEL LOCAL --------------------------------------
  // Si es null, la banda de la foto no se muestra.
  fotoLocal: null,

  // --- SECCIONES (los links de la barra) --------------------
  secciones: [
    { id: "carta",     titulo: "La carta" },
    { id: "salon",     titulo: "El salón" },
    { id: "reservar",  titulo: "Reservar" },
    { id: "visitanos", titulo: "Visitanos" },
  ],

  // --- EL SALÓN ---------------------------------------------
  // Tres datos que la gente busca antes de reservar.
  salon: [
    { n: "60",  t: "Cubiertos",  d: "Salón principal más una vereda con ocho mesas cuando acompaña el clima." },
    { n: "12",  t: "Mesa larga", d: "Para cumpleaños y mesas de trabajo. Reservala con 48 horas de anticipación." },
    { n: "Sí",  t: "Accesible",  d: "Entrada a nivel, baño adaptado y espacio entre mesas para silla de ruedas." },
  ],

  // --- TEXTOS DE SECCIÓN ------------------------------------
  notas: {
    carta: "Los precios se actualizan desde el sistema de gestión. Si algo se agotó, aparece marcado.",
    salon: "Somos un lugar chico. El fin de semana conviene reservar.",
    reservar: "Te confirmamos por el mismo WhatsApp. No cobramos seña.",
    visitanos: "A tres cuadras del subte D, estación Scalabrini Ortiz.",
  },

  // --- RESERVAR (los pasos) ---------------------------------
  pasos: [
    { n: "I",   t: "Escribinos",     d: "Decinos día, horario y cuántos son. Por WhatsApp es lo más rápido." },
    { n: "II",  t: "Te confirmamos", d: "En el momento si hay lugar. Si está completo, te ofrecemos otro horario." },
    { n: "III", t: "Venís",          d: "Guardamos la mesa 15 minutos. Si se te hace tarde, avisanos y la sostenemos." },
  ],

  // --- PREGUNTAS --------------------------------------------
  faq: [
    { q: "¿Hace falta reservar?",        r: "De martes a jueves normalmente entrás sin reserva. Viernes, sábado y domingo al mediodía conviene reservar, sobre todo si son más de cuatro." },
    { q: "¿Tienen opciones sin TACC?",   r: "Sí, están marcadas en la carta. Avisá al mozo igual: separamos utensilios para evitar contaminación cruzada." },
    { q: "¿Puedo ir con chicos?",        r: "Claro. Tenemos sillas altas y media porción en los principales." },
    { q: "¿Se puede ir con perro?",      r: "En la vereda sí, siempre. Adentro solo perros de asistencia." },
    { q: "¿Qué medios de pago toman?",   r: "Efectivo, débito, crédito y transferencia. Con efectivo hacemos un descuento." },
  ],
};
