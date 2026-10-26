// Servidor estatico minimo para ver los modelos en el navegador.
// Uso: node servidor.js [carpeta] [puerto]
const http = require("http");
const fs = require("fs");
const path = require("path");

const raiz = path.resolve(__dirname, process.argv[2] || "modelos/tatuajes");
const puerto = Number(process.argv[3]) || 4173;

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".js":   "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg":  "image/svg+xml",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico":  "image/x-icon",
  ".woff2":"font/woff2",
};

http.createServer((req, res) => {
  const pedido = decodeURIComponent(req.url.split("?")[0]);
  let destino = path.join(raiz, pedido);

  // no dejar salir de la carpeta raiz
  if (!destino.startsWith(raiz)) {
    res.writeHead(403).end("Prohibido");
    return;
  }

  // si piden una carpeta, servimos su index.html — igual que hace
  // GitHub Pages. Sin esto, /demos/resto-demo/ da 404 solo aca.
  try {
    if (fs.statSync(destino).isDirectory()) {
      destino = path.join(destino, "index.html");
    }
  } catch { /* no existe: cae en el 404 de abajo */ }

  fs.readFile(destino, (err, buf) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("No encontrado: " + pedido);
      return;
    }
    res.writeHead(200, {
      "Content-Type": TIPOS[path.extname(destino).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(buf);
  });
}).listen(puerto, () => {
  console.log(`Sirviendo ${raiz} en http://localhost:${puerto}`);
});
