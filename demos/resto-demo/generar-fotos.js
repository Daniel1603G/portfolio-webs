// ============================================================
//  Genera las fotos de muestra de los platos.
//  No son fotos: son platos dibujados por codigo, vistos desde
//  arriba. Ningun plato real, ninguna imagen descargada.
//      node generar-fotos.js
// ============================================================

const fs = require("fs");
const path = require("path");

const salida = path.join(__dirname, "fotos");
fs.mkdirSync(salida, { recursive: true });

// generador con semilla: la misma corrida da siempre lo mismo,
// asi las capturas del portfolio no cambian solas
function azar(semilla) {
  let s = semilla;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

const MANTEL = "#efe8da";
const PLATO  = "#fbf8f2";
const SOMBRA = "rgba(43,38,33,.13)";

// Paleta de comida, en tonos apagados: el crema de la carta no
// soporta colores saturados al lado.
const C = {
  carne:    "#8a4a32",
  carneOsc: "#6d3826",
  dorado:   "#c89b4a",
  queso:    "#e8c87a",
  verde:    "#6f8050",
  verdeOsc: "#55633d",
  tomate:   "#a8432f",
  crema:    "#efe3cb",
  choco:    "#4a3426",
  vino:     "#6e2639",
};

// El plato: un circulo con sombra, igual en todas las fotos.
function base(w) {
  const c = w / 2;
  // sin fondo propio: el plato flota sobre el crema de la carta.
  // Un mantel dibujado compite con el fondo de la pagina.
  return `<rect width="${w}" height="${w}" fill="none"/>
<ellipse cx="${c}" cy="${c + w * 0.022}" rx="${w * 0.395}" ry="${w * 0.385}" fill="${SOMBRA}"/>
<circle cx="${c}" cy="${c}" r="${w * 0.385}" fill="${PLATO}"/>
<circle cx="${c}" cy="${c}" r="${w * 0.3}" fill="none" stroke="${MANTEL}" stroke-width="${w * 0.012}"/>`;
}

// --- los platos -------------------------------------------

function parrilla(r, w) {
  const c = w / 2;
  let d = "";
  // corte de carne con marcas de parrilla
  d += `<ellipse cx="${c}" cy="${c}" rx="${w * 0.2}" ry="${w * 0.15}" fill="${C.carne}" transform="rotate(-14 ${c} ${c})"/>`;
  for (let i = -2; i <= 2; i++) {
    d += `<line x1="${c - w * 0.19}" y1="${c + i * w * 0.05}" x2="${c + w * 0.19}" y2="${c + i * w * 0.05}" stroke="${C.carneOsc}" stroke-width="${w * 0.016}" transform="rotate(-14 ${c} ${c})" opacity=".8"/>`;
  }
  // guarnicion al costado
  for (let i = 0; i < 5; i++) {
    const a = 2.1 + r() * 1.1;
    d += `<rect x="${(c + Math.cos(a) * w * 0.25).toFixed(1)}" y="${(c + Math.sin(a) * w * 0.25).toFixed(1)}" width="${w * 0.1}" height="${w * 0.035}" rx="${w * 0.016}" fill="${C.dorado}" transform="rotate(${(r() * 90 - 45).toFixed(0)} ${c} ${c})"/>`;
  }
  return d;
}

function pasta(r, w) {
  const c = w / 2;
  let d = "";
  // nido de fideos: arcos concentricos irregulares
  for (let i = 0; i < 16; i++) {
    const rad = w * (0.09 + (i / 16) * 0.16);
    const giro = r() * 360;
    d += `<path d="M ${c - rad} ${c} A ${rad} ${rad * 0.85} 0 1 1 ${c + rad} ${c}" fill="none" stroke="${C.queso}" stroke-width="${w * 0.022}" stroke-linecap="round" transform="rotate(${giro.toFixed(0)} ${c} ${c})" opacity=".92"/>`;
  }
  // salsa arriba
  for (let i = 0; i < 4; i++) {
    const a = r() * Math.PI * 2;
    const dd = r() * w * 0.13;
    d += `<circle cx="${(c + Math.cos(a) * dd).toFixed(1)}" cy="${(c + Math.sin(a) * dd).toFixed(1)}" r="${(w * 0.035).toFixed(1)}" fill="${C.tomate}"/>`;
  }
  d += `<circle cx="${c}" cy="${c - w * 0.03}" r="${w * 0.022}" fill="${C.verde}"/>`;
  return d;
}

function ensalada(r, w) {
  const c = w / 2;
  let d = "";
  // hojas sueltas en el centro
  for (let i = 0; i < 13; i++) {
    const a = r() * Math.PI * 2;
    const dd = r() * w * 0.2;
    const x = c + Math.cos(a) * dd;
    const y = c + Math.sin(a) * dd;
    const col = r() > 0.4 ? C.verde : C.verdeOsc;
    d += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(w * 0.055).toFixed(1)}" ry="${(w * 0.032).toFixed(1)}" fill="${col}" transform="rotate(${(r() * 360).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }
  // tomates
  for (let i = 0; i < 4; i++) {
    const a = r() * Math.PI * 2;
    const dd = w * 0.08 + r() * w * 0.12;
    d += `<circle cx="${(c + Math.cos(a) * dd).toFixed(1)}" cy="${(c + Math.sin(a) * dd).toFixed(1)}" r="${(w * 0.04).toFixed(1)}" fill="${C.tomate}"/>`;
  }
  return d;
}

function horno(r, w) {
  const c = w / 2;
  let d = "";
  // queso fundido: una masa dorada con burbujas
  d += `<circle cx="${c}" cy="${c}" r="${w * 0.22}" fill="${C.queso}"/>`;
  d += `<circle cx="${c}" cy="${c}" r="${w * 0.22}" fill="none" stroke="${C.dorado}" stroke-width="${w * 0.02}"/>`;
  for (let i = 0; i < 7; i++) {
    const a = r() * Math.PI * 2;
    const dd = r() * w * 0.17;
    d += `<circle cx="${(c + Math.cos(a) * dd).toFixed(1)}" cy="${(c + Math.sin(a) * dd).toFixed(1)}" r="${(w * 0.018 + r() * w * 0.016).toFixed(1)}" fill="${C.dorado}" opacity=".75"/>`;
  }
  d += `<circle cx="${(c + w * 0.06).toFixed(1)}" cy="${(c - w * 0.05).toFixed(1)}" r="${(w * 0.02).toFixed(1)}" fill="${C.verdeOsc}"/>`;
  return d;
}

function postre(r, w) {
  const c = w / 2;
  let d = "";
  // porcion con capas
  d += `<rect x="${c - w * 0.15}" y="${c - w * 0.13}" width="${w * 0.3}" height="${w * 0.26}" rx="${w * 0.015}" fill="${C.crema}"/>`;
  d += `<rect x="${c - w * 0.15}" y="${c - w * 0.13}" width="${w * 0.3}" height="${w * 0.075}" rx="${w * 0.015}" fill="${C.choco}"/>`;
  d += `<rect x="${c - w * 0.15}" y="${c + w * 0.04}" width="${w * 0.3}" height="${w * 0.055}" fill="${C.choco}" opacity=".55"/>`;
  // salsa alrededor
  for (let i = 0; i < 5; i++) {
    const a = r() * Math.PI * 2;
    d += `<circle cx="${(c + Math.cos(a) * w * 0.24).toFixed(1)}" cy="${(c + Math.sin(a) * w * 0.24).toFixed(1)}" r="${(w * 0.016).toFixed(1)}" fill="${C.choco}" opacity=".6"/>`;
  }
  return d;
}

function copa(r, w) {
  const c = w / 2;
  let d = "";
  // vista superior de una copa: dos circulos y el liquido
  d += `<circle cx="${c}" cy="${c}" r="${w * 0.17}" fill="none" stroke="${C.crema}" stroke-width="${w * 0.018}"/>`;
  d += `<circle cx="${c}" cy="${c}" r="${w * 0.145}" fill="${C.vino}"/>`;
  d += `<ellipse cx="${(c - w * 0.045).toFixed(1)}" cy="${(c - w * 0.045).toFixed(1)}" rx="${(w * 0.045).toFixed(1)}" ry="${(w * 0.028).toFixed(1)}" fill="#fff" opacity=".17" transform="rotate(-35 ${c} ${c})"/>`;
  return d;
}

const DIBUJOS = { parrilla, pasta, ensalada, horno, postre, copa };

function foto(tipo, semilla) {
  const w = 300;
  const r = azar(semilla);
  const dibujo = (DIBUJOS[tipo] || pasta)(r, w);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${w}" width="${w}" height="${w}">
${base(w)}
<g>${dibujo}</g>
</svg>`;
}

// --- que foto lleva cada plato ----------------------------
// Solo algunos: en un local real nunca estan todas las fotos,
// y el modelo tiene que verse bien asi.
const ASIGNADAS = {
  "prov-001": "horno",
  "burr-001": "ensalada",
  "ojo-001":  "parrilla",
  "sorr-001": "pasta",
  "mila-001": "horno",
  "riso-001": "pasta",
  "volc-001": "postre",
  "tira-001": "postre",
  "vino-001": "copa",
};

let n = 0;
for (const [id, tipo] of Object.entries(ASIGNADAS)) {
  const semilla = [...id].reduce((a, ch) => a * 31 + ch.charCodeAt(0), 7) & 0x7fffffff;
  fs.writeFileSync(path.join(salida, `${id}.svg`), foto(tipo, semilla));
  n++;
}

console.log(`Listo: ${n} fotos en fotos/`);
