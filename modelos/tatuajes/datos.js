// ============================================================
//  DATOS DEL LOCAL  —  editar solo este archivo por cada demo
// ============================================================
// Todo lo que cambia de un estudio a otro vive acá.
// Cambiás estos valores y la página entera se adapta sola.

const DATOS = {

  // --- IDENTIDAD -------------------------------------------
  nombre: "NEGRO HUESO",          // nombre del estudio
  siglas: "[N·H]",                // logo corto, se ve en la barra de arriba
  bajada: "ESTUDIO · PRIVADO · CITA PREVIA.",
  ciudad: "BUENOS AIRES — AR",
  acento: "#C6FF00",              // color de acento (verde fluor por defecto)

  // --- INTRO ------------------------------------------------
  intro: {
    activa: true,                 // false = entra directo, sin pantalla de carga
    ruta: "disco://negro_hueso/index — booting",
    version: "v.02 — BA",
    estado: "sesión estable",
  },

  // --- CONTACTO ---------------------------------------------
  whatsapp: "5491122334455",      // solo números, con código de país. Sin + ni espacios
  mensajeWhatsapp: "Hola! Vi la web y quiero cotizar un tatuaje.",
  instagram: "negrohueso.tattoo",
  email: "hola@negrohueso.com",

  // --- UBICACIÓN --------------------------------------------
  direccion: "Thames 1842",
  barrio: "Palermo, CABA",
  mapa: "https://maps.google.com/?q=Thames+1842+Palermo+CABA",
  horarios: [
    { dia: "MAR — VIE", hora: "13:00 — 20:00" },
    { dia: "SÁBADO",    hora: "12:00 — 19:00" },
    { dia: "DOM — LUN", hora: "CERRADO" },
  ],

  // --- SECCIONES (el índice numerado) -----------------------
  // El orden de esta lista es el orden en la página.
  secciones: [
    { id: "trabajos",  titulo: "TRABAJOS",  desc: "Archivo de piezas por estilo. Blackwork, fine line, realismo." },
    { id: "artistas",  titulo: "ARTISTAS",  desc: "Residentes y guests rotativos. Cada uno con su agenda." },
    { id: "reservar",  titulo: "RESERVAR",  desc: "Cotización por WhatsApp. Seña del 30% para fijar fecha." },
    { id: "cuidados",  titulo: "CUIDADOS",  desc: "Antes y después. Qué hacer para que cicatrice bien." },
    { id: "visitanos", titulo: "VISITANOS", desc: "Dirección, horarios y cómo llegar." },
  ],

  // --- TRABAJOS ---------------------------------------------
  // Para cada pieza: estilo (sirve de filtro) e img (ruta a la foto).
  // Dejá img en null y se muestra un placeholder gris.
  estilos: ["TODOS", "BLACKWORK", "FINE LINE", "REALISMO", "OLD SCHOOL"],
  trabajos: [
    { estilo: "BLACKWORK",  img: null, alto: "alto" },
    { estilo: "FINE LINE",  img: null, alto: "bajo" },
    { estilo: "REALISMO",   img: null, alto: "bajo" },
    { estilo: "BLACKWORK",  img: null, alto: "bajo" },
    { estilo: "OLD SCHOOL", img: null, alto: "alto" },
    { estilo: "FINE LINE",  img: null, alto: "alto" },
    { estilo: "REALISMO",   img: null, alto: "bajo" },
    { estilo: "BLACKWORK",  img: null, alto: "bajo" },
    { estilo: "OLD SCHOOL", img: null, alto: "bajo" },
  ],

  // --- ARTISTAS ---------------------------------------------
  artistas: [
    { nombre: "SOL MARTÍNEZ",  rol: "RESIDENTE", estilo: "Blackwork · Ornamental",  ig: "sol.tattoo",   img: null },
    { nombre: "TOMÁS REY",     rol: "RESIDENTE", estilo: "Realismo · Blanco y negro", ig: "tomasrey.ink", img: null },
    { nombre: "LUCÍA FERRER",  rol: "GUEST",     estilo: "Fine line · Botánico",    ig: "lu.fineline",  img: null },
  ],

  // --- RESERVAR (los pasos) ---------------------------------
  pasos: [
    { n: "01", t: "ESCRIBINOS",  d: "Mandá referencia, zona del cuerpo y tamaño aproximado por WhatsApp." },
    { n: "02", t: "COTIZAMOS",   d: "Te pasamos precio y el artista que mejor encaja con la idea." },
    { n: "03", t: "SEÑÁS",       d: "30% por transferencia para fijar la fecha. Se descuenta del total." },
    { n: "04", t: "TE TATUÁS",   d: "Venís, lo hacemos. Material descartable y tinta importada." },
  ],

  // --- CUIDADOS ---------------------------------------------
  cuidados: [
    { t: "ANTES",    items: ["Dormí bien y vení comido.", "Nada de alcohol las 24 hs previas.", "Evitá exponer la zona al sol."] },
    { t: "DESPUÉS",  items: ["Lavá con agua fría y jabón neutro.", "Crema cicatrizante 3 veces por día.", "Nada de pileta ni playa por 3 semanas."] },
    { t: "OJO CON",  items: ["No arranques las costritas.", "Sin sol directo hasta cicatrizar.", "Si notás algo raro, escribinos."] },
  ],

  // --- PREGUNTAS --------------------------------------------
  faq: [
    { q: "¿CUÁNTO SALE?",            r: "Depende del tamaño, la zona y el detalle. Mandanos la referencia por WhatsApp y te cotizamos sin cargo." },
    { q: "¿ATIENDEN SIN TURNO?",     r: "No. Trabajamos solo con cita previa para darle el tiempo que merece a cada pieza." },
    { q: "¿DUELE?",                  r: "Sí, pero es tolerable. Depende de la zona. Hacemos pausas las veces que haga falta." },
    { q: "¿HACEN COBERTURAS?",       r: "Sí. Mandanos una foto del tatuaje actual con buena luz y vemos qué se puede hacer." },
    { q: "¿DESDE QUÉ EDAD?",         r: "Desde los 18 años con DNI. Menores no, bajo ningún concepto." },
  ],
};
