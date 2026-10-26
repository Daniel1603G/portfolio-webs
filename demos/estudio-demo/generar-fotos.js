// ============================================================
//  Genera las imagenes de muestra de la demo generica.
//  Son patrones geometricos abstractos: ningun tatuaje real,
//  ninguna persona real. Se corre una vez:
//      node generar-fotos.js
// ============================================================

const fs = require("fs");
const path = require("path");

const salida = path.join(__dirname, "fotos");
fs.mkdirSync(salida, { recursive: true });

// Un generador propio y con semilla: la misma pieza sale igual
// en cada corrida, asi las capturas del portfolio no cambian.
function azar(semilla) {
  let s = semilla;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

const TINTA = "#0d0d0d";
const PAPEL = "#e8e6e1";

// --- piezas de la galeria ---------------------------------
// Cada estilo dibuja distinto, para que el filtro se note.

// Todas las piezas se componen DENTRO de un area central segura.
// La grilla recorta con object-fit:cover, asi que lo que toca los
// bordes se pierde. El dibujo vive en el centro, con margen.
function area(w, h) {
  const m = Math.min(w, h) * 0.18;         // margen
  return { x: m, y: m, w: w - m * 2, h: h - m * 2, cx: w / 2, cy: h / 2 };
}

function blackwork(r, w, h) {
  const a = area(w, h);
  let d = "";
  // una figura central solida, con mordidas que le dan forma
  const rad = Math.min(a.w, a.h) * 0.36;
  d += `<circle cx="${a.cx}" cy="${a.cy}" r="${rad.toFixed(0)}" fill="${TINTA}"/>`;
  // mordidas en papel: rompen el circulo y lo vuelven una forma
  for (let i = 0; i < 5; i++) {
    const ang = r() * Math.PI * 2;
    const dist = rad * (0.5 + r() * 0.75);
    d += `<circle cx="${(a.cx + Math.cos(ang) * dist).toFixed(0)}" cy="${(a.cy + Math.sin(ang) * dist).toFixed(0)}" r="${(rad * (0.22 + r() * 0.3)).toFixed(0)}" fill="${PAPEL}"/>`;
  }
  // cuñas que salen del centro, como rayos solidos
  for (let i = 0; i < 6; i++) {
    const ang = (Math.PI * 2 * i) / 6 + r() * 0.4;
    const x0 = a.cx + Math.cos(ang) * rad * 0.92;
    const y0 = a.cy + Math.sin(ang) * rad * 0.92;
    const x1 = a.cx + Math.cos(ang - 0.12) * rad * 1.5;
    const y1 = a.cy + Math.sin(ang - 0.12) * rad * 1.5;
    const x2 = a.cx + Math.cos(ang + 0.12) * rad * 1.5;
    const y2 = a.cy + Math.sin(ang + 0.12) * rad * 1.5;
    d += `<path d="M${x0.toFixed(0)},${y0.toFixed(0)} L${x1.toFixed(0)},${y1.toFixed(0)} L${x2.toFixed(0)},${y2.toFixed(0)} z" fill="${TINTA}"/>`;
  }
  return d;
}

function fineLine(r, w, h) {
  const a = area(w, h);
  let d = "";
  // un tallo central que sube, con hojas a los costados: lee como
  // botanico aunque no sea ninguna planta en particular
  const baseY = a.y + a.h;
  const topY = a.y + a.h * 0.08;
  const curva = (r() * 60 - 30).toFixed(0);
  d += `<path d="M${a.cx},${baseY.toFixed(0)} Q${(a.cx + +curva).toFixed(0)},${((baseY + topY) / 2).toFixed(0)} ${a.cx},${topY.toFixed(0)}" fill="none" stroke="${TINTA}" stroke-width="2"/>`;

  const hojas = 7;
  for (let i = 0; i < hojas; i++) {
    const t = 0.12 + (i / hojas) * 0.8;
    const y = baseY - (baseY - topY) * t;
    const lado = i % 2 === 0 ? 1 : -1;
    const largo = (a.w * 0.3) * (1 - t * 0.45);
    const x = a.cx + lado * 6;
    d += `<path d="M${x.toFixed(0)},${y.toFixed(0)} Q${(x + lado * largo * 0.6).toFixed(0)},${(y - largo * 0.5).toFixed(0)} ${(x + lado * largo).toFixed(0)},${(y - largo * 0.15).toFixed(0)} Q${(x + lado * largo * 0.55).toFixed(0)},${(y + largo * 0.1).toFixed(0)} ${x.toFixed(0)},${y.toFixed(0)} z" fill="none" stroke="${TINTA}" stroke-width="1.4"/>`;
  }
  // tres circulitos finos arriba, como brotes
  for (let i = 0; i < 3; i++) {
    d += `<circle cx="${(a.cx + (i - 1) * 16).toFixed(0)}" cy="${(topY - 12 + Math.abs(i - 1) * 9).toFixed(0)}" r="${(4 + r() * 3).toFixed(1)}" fill="none" stroke="${TINTA}" stroke-width="1.3"/>`;
  }
  return d;
}

function realismo(r, w, h) {
  const a = area(w, h);
  const id = `g${Math.floor(r() * 1e6)}`;
  // esfera sombreada: el degradado radial imita el volumen del
  // realismo en blanco y negro, sin dibujar nada reconocible
  let d = `<defs><radialGradient id="${id}" cx="36%" cy="30%" r="75%">
<stop offset="0%" stop-color="${PAPEL}"/>
<stop offset="45%" stop-color="#8a8a86"/>
<stop offset="100%" stop-color="${TINTA}"/>
</radialGradient></defs>`;
  const rad = Math.min(a.w, a.h) * 0.4;
  d += `<circle cx="${a.cx}" cy="${a.cy}" r="${rad.toFixed(0)}" fill="url(#${id})"/>`;
  // sombra proyectada abajo
  d += `<ellipse cx="${a.cx}" cy="${(a.cy + rad * 1.12).toFixed(0)}" rx="${(rad * 0.86).toFixed(0)}" ry="${(rad * 0.14).toFixed(0)}" fill="${TINTA}" opacity="0.3"/>`;
  // trama de puntos sobre la mitad oscura: el "whip shading"
  for (let i = 0; i < 140; i++) {
    const ang = r() * Math.PI * 2;
    const dd = Math.sqrt(r()) * rad * 0.95;
    const x = a.cx + Math.cos(ang) * dd;
    const y = a.cy + Math.sin(ang) * dd;
    if (x < a.cx - rad * 0.1 && y < a.cy) continue;   // dejamos limpia la luz
    d += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(0.8 + r() * 1.5).toFixed(1)}" fill="${TINTA}" opacity="${(0.15 + r() * 0.3).toFixed(2)}"/>`;
  }
  return d;
}

function oldSchool(r, w, h) {
  const a = area(w, h);
  const cx = a.cx;
  const cy = a.cy;
  const rad = Math.min(a.w, a.h) * 0.3;
  let d = "";
  // rayos primero, para que queden detras del disco
  for (let i = 0; i < 12; i++) {
    const ang = (Math.PI * 2 * i) / 12;
    const x0 = cx + Math.cos(ang) * rad * 1.2;
    const y0 = cy + Math.sin(ang) * rad * 1.2;
    const x1 = cx + Math.cos(ang) * rad * 1.5;
    const y1 = cy + Math.sin(ang) * rad * 1.5;
    d += `<line x1="${x0.toFixed(0)}" y1="${y0.toFixed(0)}" x2="${x1.toFixed(0)}" y2="${y1.toFixed(0)}" stroke="${TINTA}" stroke-width="8" stroke-linecap="round"/>`;
  }
  // disco: contorno grueso tipico del old school
  d += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${rad.toFixed(0)}" fill="${PAPEL}" stroke="${TINTA}" stroke-width="9"/>`;
  d += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${(rad * 0.58).toFixed(0)}" fill="${TINTA}"/>`;
  // banda cruzada con borde, contenida en el area segura
  const bw = a.w * 0.86;
  const rot = (r() * 24 - 12).toFixed(0);
  d += `<g transform="rotate(${rot} ${cx.toFixed(0)} ${cy.toFixed(0)})">
<rect x="${(cx - bw / 2).toFixed(0)}" y="${(cy - 19).toFixed(0)}" width="${bw.toFixed(0)}" height="38" fill="${PAPEL}" stroke="${TINTA}" stroke-width="5"/>
<rect x="${(cx - bw / 2 + 14).toFixed(0)}" y="${(cy - 6).toFixed(0)}" width="${(bw - 28).toFixed(0)}" height="4" fill="${TINTA}" opacity="0.5"/>
</g>`;
  return d;
}

const ESTILOS = {
  BLACKWORK: blackwork,
  "FINE LINE": fineLine,
  REALISMO: realismo,
  "OLD SCHOOL": oldSchool,
};

function pieza(estilo, semilla, alto) {
  const w = 600;
  const h = alto === "alto" ? 860 : 600;
  const r = azar(semilla);
  const dibujo = (ESTILOS[estilo] || blackwork)(r, w, h);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<rect width="${w}" height="${h}" fill="${PAPEL}"/>
<g>${dibujo}</g>
</svg>`;
}

// --- retratos del equipo ----------------------------------
// Silueta geometrica, sin rasgos: no representa a nadie.

// variante: cada integrante del equipo tiene su propio encuadre y
// trama de fondo. Tres siluetas casi iguales se leen como un error
// de carga, no como una decision de diseño.
function retrato(semilla, variante) {
  const w = 600;
  const h = 750;   // 4:5, igual que .artista-foto: no se recorta nada
  const r = azar(semilla);
  let d = `<rect width="${w}" height="${h}" fill="${PAPEL}"/>`;

  // fondo: una trama distinta por variante
  if (variante === 0) {
    for (let i = -h; i < w + h; i += 18) {
      d += `<line x1="${i}" y1="0" x2="${i + h}" y2="${h}" stroke="${TINTA}" stroke-width="1" opacity="0.08"/>`;
    }
  } else if (variante === 1) {
    for (let i = 0; i < h; i += 16) {
      d += `<line x1="0" y1="${i}" x2="${w}" y2="${i}" stroke="${TINTA}" stroke-width="1" opacity="0.07"/>`;
    }
  } else {
    for (let y = 14; y < h; y += 30) {
      for (let x = 14; x < w; x += 30) {
        d += `<circle cx="${x}" cy="${y}" r="2.2" fill="${TINTA}" opacity="0.1"/>`;
      }
    }
  }

  // encuadre: mas cerca o mas lejos, y descentrado segun variante
  const esc = [1, 1.2, 0.88][variante];
  const cx = w * [0.5, 0.55, 0.45][variante];
  const radio = w * 0.15 * esc;              // cabeza mas chica = menos "icono"
  const cabezaY = h * [0.34, 0.29, 0.37][variante];
  const cuelloY = cabezaY + radio * 0.92;
  const hombroY = cuelloY + radio * 0.75;
  const medioAncho = w * 0.33 * esc;

  // torso: hombros rectos con caida, no una campana. Le da porte.
  d += `<path d="M${(cx - medioAncho).toFixed(0)},${h}
    L${(cx - medioAncho).toFixed(0)},${(hombroY + radio * 0.5).toFixed(0)}
    Q${(cx - medioAncho).toFixed(0)},${hombroY.toFixed(0)} ${(cx - medioAncho * 0.62).toFixed(0)},${(hombroY - radio * 0.1).toFixed(0)}
    L${(cx - radio * 0.52).toFixed(0)},${cuelloY.toFixed(0)}
    L${(cx + radio * 0.52).toFixed(0)},${cuelloY.toFixed(0)}
    L${(cx + medioAncho * 0.62).toFixed(0)},${(hombroY - radio * 0.1).toFixed(0)}
    Q${(cx + medioAncho).toFixed(0)},${hombroY.toFixed(0)} ${(cx + medioAncho).toFixed(0)},${(hombroY + radio * 0.5).toFixed(0)}
    L${(cx + medioAncho).toFixed(0)},${h} z" fill="${TINTA}"/>`;

  // cuello
  d += `<rect x="${(cx - radio * 0.34).toFixed(0)}" y="${(cabezaY + radio * 0.4).toFixed(0)}" width="${(radio * 0.68).toFixed(0)}" height="${(radio * 0.8).toFixed(0)}" fill="${TINTA}"/>`;

  // PELO PRIMERO, DETRAS de la cabeza. Todo elipses y rectangulos que
  // se solapan con el ovalo: asi no hay bordes que tengan que coincidir
  // y no quedan muescas blancas entre una forma y la otra.
  if (variante === 2) {
    // pelo largo: una masa ancha que cae hasta los hombros
    d += `<rect x="${(cx - radio * 1.18).toFixed(0)}" y="${(cabezaY - radio * 0.5).toFixed(0)}" width="${(radio * 2.36).toFixed(0)}" height="${(hombroY + radio * 0.2 - (cabezaY - radio * 0.5)).toFixed(0)}" rx="${(radio * 0.5).toFixed(0)}" fill="${TINTA}"/>`;
    d += `<ellipse cx="${cx.toFixed(0)}" cy="${(cabezaY - radio * 0.15).toFixed(0)}" rx="${(radio * 1.18).toFixed(0)}" ry="${(radio * 1.3).toFixed(0)}" fill="${TINTA}"/>`;
  } else if (variante === 1) {
    // pelo corto con volumen: un ovalo apenas mas grande que el craneo
    d += `<ellipse cx="${cx.toFixed(0)}" cy="${(cabezaY - radio * 0.22).toFixed(0)}" rx="${(radio * 1.16).toFixed(0)}" ry="${(radio * 1.22).toFixed(0)}" fill="${TINTA}"/>`;
  } else {
    // rodete alto: el bollo arriba, mas una base que lo une al craneo
    d += `<circle cx="${cx.toFixed(0)}" cy="${(cabezaY - radio * 1.3).toFixed(0)}" r="${(radio * 0.44).toFixed(0)}" fill="${TINTA}"/>`;
    d += `<ellipse cx="${cx.toFixed(0)}" cy="${(cabezaY - radio * 0.35).toFixed(0)}" rx="${(radio * 1.04).toFixed(0)}" ry="${(radio * 1.0).toFixed(0)}" fill="${TINTA}"/>`;
  }

  // cabeza: ovalo, no circulo perfecto. Va encima del pelo.
  d += `<ellipse cx="${cx.toFixed(0)}" cy="${cabezaY.toFixed(0)}" rx="${radio.toFixed(0)}" ry="${(radio * 1.16).toFixed(0)}" fill="${TINTA}"/>`;

  // tatuajes en el brazo: lineas claras caladas sobre la silueta.
  // Son bandas y puntos, nada figurativo.
  const lado = variante === 1 ? -1 : 1;
  const brazoX = cx + lado * medioAncho * 0.74;
  for (let i = 0; i < 5; i++) {
    const y = hombroY + radio * 0.9 + i * (radio * 0.52) + r() * 8;
    if (y > h - 14) break;
    const an = radio * (0.5 + r() * 0.6);
    d += `<rect x="${(brazoX - an / 2).toFixed(0)}" y="${y.toFixed(0)}" width="${an.toFixed(0)}" height="${(3 + r() * 3).toFixed(1)}" rx="2" fill="${PAPEL}" opacity="${(0.45 + r() * 0.3).toFixed(2)}"/>`;
  }
  // un par de puntos sueltos en el otro brazo
  for (let i = 0; i < 4; i++) {
    const y = hombroY + radio * 1.2 + i * (radio * 0.6);
    if (y > h - 14) break;
    d += `<circle cx="${(cx - lado * medioAncho * 0.7).toFixed(0)}" cy="${y.toFixed(0)}" r="${(2 + r() * 2.4).toFixed(1)}" fill="${PAPEL}" opacity="0.4"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${d}</svg>`;
}

// --- foto del local (el hero) -----------------------------
// Interior sugerido: planos, lineas de perspectiva, nada reconocible.

function local() {
  const w = 1600;
  const h = 900;
  let d = `<rect width="${w}" height="${h}" fill="#141414"/>`;
  // perspectiva: lineas al punto de fuga
  const fx = w * 0.62;
  const fy = h * 0.52;
  for (let i = 0; i <= 16; i++) {
    const x = (w / 16) * i;
    d += `<line x1="${x.toFixed(0)}" y1="${h}" x2="${fx.toFixed(0)}" y2="${fy.toFixed(0)}" stroke="#2e2e2e" stroke-width="1.5"/>`;
    d += `<line x1="${x.toFixed(0)}" y1="0" x2="${fx.toFixed(0)}" y2="${fy.toFixed(0)}" stroke="#262626" stroke-width="1"/>`;
  }
  // bloques: camillas y mobiliario insinuado
  d += `<rect x="${(w * 0.05).toFixed(0)}" y="${(h * 0.58).toFixed(0)}" width="${(w * 0.3).toFixed(0)}" height="${(h * 0.1).toFixed(0)}" fill="#1f1f1f"/>`;
  d += `<rect x="${(w * 0.4).toFixed(0)}" y="${(h * 0.55).toFixed(0)}" width="${(w * 0.17).toFixed(0)}" height="${(h * 0.07).toFixed(0)}" fill="#1b1b1b"/>`;
  // lamparas
  for (let i = 0; i < 4; i++) {
    const x = w * (0.14 + i * 0.2);
    d += `<line x1="${x.toFixed(0)}" y1="0" x2="${x.toFixed(0)}" y2="${(h * 0.2).toFixed(0)}" stroke="#2a2a2a" stroke-width="2"/>`;
    d += `<circle cx="${x.toFixed(0)}" cy="${(h * 0.21).toFixed(0)}" r="26" fill="#3a3a3a" opacity="0.55"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${d}</svg>`;
}

// --- escribir todo ----------------------------------------

const piezas = [
  ["BLACKWORK", "alto"],
  ["FINE LINE", "bajo"],
  ["REALISMO", "bajo"],
  ["BLACKWORK", "bajo"],
  ["OLD SCHOOL", "alto"],
  ["FINE LINE", "alto"],
  ["REALISMO", "bajo"],
  ["BLACKWORK", "bajo"],
  ["OLD SCHOOL", "bajo"],
];

piezas.forEach(([estilo, alto], i) => {
  const nombre = `pieza-${String(i + 1).padStart(2, "0")}.svg`;
  fs.writeFileSync(path.join(salida, nombre), pieza(estilo, 7919 * (i + 3), alto));
});

["sol", "tomas", "lucia"].forEach((n, i) => {
  fs.writeFileSync(path.join(salida, `artista-${n}.svg`), retrato(104729 * (i + 2), i));
});

fs.writeFileSync(path.join(salida, "local.svg"), local());

console.log("Listo:", fs.readdirSync(salida).length, "archivos en fotos/");
