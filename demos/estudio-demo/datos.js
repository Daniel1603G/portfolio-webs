// ============================================================
//  DEMO DE MUESTRA  —  NEGRO HUESO
// ============================================================
//  Estudio FICTICIO. No existe, no es ningun local real.
//  Sirve para dos cosas:
//    1. mostrar el modelo funcionando, sin usar el nombre de nadie
//    2. ir al portfolio como pieza propia
//
//  Las imagenes son patrones geometricos generados por codigo
//  (ver generar-fotos.js). No hay tatuajes ni personas reales.
//
//  Para armar la web de un local, se copia esta carpeta y se
//  edita SOLO este archivo. Ver ../../modelos/tatuajes/LEEME.md
// ============================================================

const DATOS = {

  // --- IDENTIDAD -------------------------------------------
  nombre: "NEGRO HUESO",
  siglas: "[N·H]",
  bajada: "ESTUDIO · PRIVADO · CITA PREVIA.",
  ciudad: "BUENOS AIRES — AR",
  acento: "#C6FF00",              // verde fluor

  // --- INTRO ------------------------------------------------
  intro: {
    activa: true,
    ruta: "disco://negro_hueso/index — booting",
    version: "v.02 — BA",
    estado: "sesión estable",
  },

  // --- CONTACTO ---------------------------------------------
  // Numero de ejemplo: no corresponde a ninguna linea real.
  whatsapp: "5491100000000",
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

  // --- FOTO DEL LOCAL (hero) -------------------------------
  fotoLocal: "fotos/local.svg",

  // --- SECCIONES (el índice numerado) -----------------------
  secciones: [
    { id: "trabajos",  titulo: "TRABAJOS",  desc: "Archivo de piezas por estilo. Blackwork, fine line, realismo." },
    { id: "artistas",  titulo: "ARTISTAS",  desc: "Residentes y guests rotativos. Cada uno con su agenda." },
    { id: "reservar",  titulo: "RESERVAR",  desc: "Cotización por WhatsApp. Seña del 30% para fijar fecha." },
    { id: "cuidados",  titulo: "CUIDADOS",  desc: "Antes y después. Qué hacer para que cicatrice bien." },
    { id: "visitanos", titulo: "VISITANOS", desc: "Dirección, horarios y cómo llegar." },
  ],

  // --- TRABAJOS ---------------------------------------------
  estilos: ["TODOS", "BLACKWORK", "FINE LINE", "REALISMO", "OLD SCHOOL"],
  trabajos: [
    { estilo: "BLACKWORK",  img: "fotos/pieza-01.svg", alto: "alto" },
    { estilo: "FINE LINE",  img: "fotos/pieza-02.svg", alto: "bajo" },
    { estilo: "REALISMO",   img: "fotos/pieza-03.svg", alto: "bajo" },
    { estilo: "BLACKWORK",  img: "fotos/pieza-04.svg", alto: "bajo" },
    { estilo: "OLD SCHOOL", img: "fotos/pieza-05.svg", alto: "alto" },
    { estilo: "FINE LINE",  img: "fotos/pieza-06.svg", alto: "alto" },
    { estilo: "REALISMO",   img: "fotos/pieza-07.svg", alto: "bajo" },
    { estilo: "BLACKWORK",  img: "fotos/pieza-08.svg", alto: "bajo" },
    { estilo: "OLD SCHOOL", img: "fotos/pieza-09.svg", alto: "bajo" },
  ],

  // --- ARTISTAS ---------------------------------------------
  // Nombres y perfiles ficticios.
  artistas: [
    { nombre: "SOL MARTÍNEZ",  rol: "RESIDENTE", estilo: "Blackwork · Ornamental",    ig: "sol.tattoo",   img: "fotos/artista-sol.svg" },
    { nombre: "TOMÁS REY",     rol: "RESIDENTE", estilo: "Realismo · Blanco y negro", ig: "tomasrey.ink", img: "fotos/artista-tomas.svg" },
    { nombre: "LUCÍA FERRER",  rol: "GUEST",     estilo: "Fine line · Botánico",      ig: "lu.fineline",  img: "fotos/artista-lucia.svg" },
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
