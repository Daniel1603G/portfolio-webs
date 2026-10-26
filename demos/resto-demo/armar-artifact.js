// ============================================================
//  Empaqueta la demo en UN solo archivo HTML, para publicarla.
//  Mete adentro el css, el js, los datos Y LA CARTA.
//      node armar-artifact.js
//
//  Ojo con la carta: en la pagina publicada no hay un carta.json
//  al lado para hacerle fetch, asi que la incrustamos y le
//  decimos a app.js que la lea de ahi.
// ============================================================

const fs = require("fs");
const path = require("path");

const aca = __dirname;
const leer = (f) => fs.readFileSync(path.join(aca, f), "utf8");

let html  = leer("index.html");
const css   = leer("estilo.css");
const datos = leer("datos.js");
const app   = leer("app.js");
const carta = leer("carta.json");

// La carta va como un <script type="application/json">. app.js se
// fija si existe antes de salir a la red (ver CARTA_INCRUSTADA).
const bloqueCarta =
  `<script type="application/json" id="carta-incrustada">\n${carta}\n</script>`;

html = html
  .replace(/<link[^>]*rel="stylesheet"[^>]*>/i, `<style>\n${css}\n</style>`)
  .replace(/<script[^>]*src="datos\.js"[^>]*><\/script>/i,
           `${bloqueCarta}\n<script>\n${datos}\n</script>`)
  .replace(/<script[^>]*src="app\.js"[^>]*><\/script>/i, `<script>\n${app}\n</script>`);

// chequeo: no tiene que quedar ninguna referencia a un archivo
const sueltos = (html.match(/(?:src|href)="(?!#|https?:|mailto:|data:|\$\{)[^"]+"/g) || []);
if (sueltos.length) {
  console.warn("OJO, quedaron referencias externas:", sueltos);
}

fs.writeFileSync(path.join(aca, "artifact.html"), html);
const kb = (Buffer.byteLength(html, "utf8") / 1024).toFixed(0);
console.log(`artifact.html listo — ${kb} KB`);
