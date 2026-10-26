// ============================================================
//  Empaqueta la demo en UN solo archivo HTML, para publicarla.
//  Mete adentro el css, el js, los datos y las imagenes (como
//  data URI). Salida: artifact.html
//      node armar-artifact.js
// ============================================================

const fs = require("fs");
const path = require("path");

const aca = __dirname;
const leer = (f) => fs.readFileSync(path.join(aca, f), "utf8");

let html = leer("index.html");
const css = leer("estilo.css");
const datos = leer("datos.js");
let app = leer("app.js");

// --- imagenes a data URI ----------------------------------
// Son SVG, asi que entran como texto codificado. Quedan dentro
// del HTML y la pagina no depende de ningun archivo externo.
const fotos = {};
for (const f of fs.readdirSync(path.join(aca, "fotos"))) {
  if (!f.endsWith(".svg")) continue;
  const svg = fs.readFileSync(path.join(aca, "fotos", f), "utf8");
  fotos[`fotos/${f}`] = "data:image/svg+xml;base64," + Buffer.from(svg, "utf8").toString("base64");
}

// En datos.js las rutas son "fotos/x.svg": las reemplazamos por
// el data URI correspondiente.
let datosInline = datos;
for (const [ruta, uri] of Object.entries(fotos)) {
  datosInline = datosInline.split(`"${ruta}"`).join(`"${uri}"`);
}

// --- armar el archivo -------------------------------------
html = html
  .replace(/<link[^>]*rel="stylesheet"[^>]*>/i, `<style>\n${css}\n</style>`)
  .replace(/<script[^>]*src="datos\.js"[^>]*><\/script>/i, `<script>\n${datosInline}\n</script>`)
  .replace(/<script[^>]*src="app\.js"[^>]*><\/script>/i, `<script>\n${app}\n</script>`);

// chequeo: si quedo alguna referencia externa, avisamos
const sueltos = html.match(/(?:src|href)="(?!#|https?:|mailto:|data:)[^"]+"/g) || [];
if (sueltos.length) {
  console.warn("OJO, quedaron referencias externas:", sueltos);
}

fs.writeFileSync(path.join(aca, "artifact.html"), html);
const kb = (Buffer.byteLength(html, "utf8") / 1024).toFixed(0);
console.log(`artifact.html listo — ${kb} KB, ${Object.keys(fotos).length} imagenes adentro`);
