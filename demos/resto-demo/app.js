// ============================================================
//  Arma la pagina a partir de DATOS (datos.js) y de la carta.
//
//  LA CARTA SE CARGA APARTE, de carta.json. Es el unico pedazo
//  que despues va a venir del sistema de gestion: cambiando la
//  constante FUENTE_CARTA por la URL de la API, el resto sigue
//  funcionando igual. Ver INTEGRACION.md.
// ============================================================

const $ = (sel) => document.querySelector(sel);
const D = DATOS;

// De donde sale la carta. Hoy un archivo; mañana:
//   "https://api.comanda.app/v1/sucursales/<id>/carta"
const FUENTE_CARTA = "carta.json";

// link de reservas: el del local si lo tiene, si no whatsapp
const linkWsp = `https://wa.me/${D.whatsapp}?text=${encodeURIComponent(D.mensajeWhatsapp)}`;
const linkReserva = D.linkReservas || linkWsp;

// escapa texto antes de meterlo en el HTML
const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// $ 24.500 — sin decimales, que es como se escribe en una carta
const plata = (n) => "$ " + Number(n).toLocaleString("es-AR", {
  maximumFractionDigits: 0,
});


// ---------- 1. color de acento y titulo ----------
document.documentElement.style.setProperty("--acento", D.acento);
document.title = `${D.nombre} — Restaurante en ${D.barrio}`;


// ---------- 2. barra y portada ----------
function cabecera() {
  $("#marca").textContent = D.nombre;

  $("#btn-reservar").href     = linkReserva;
  $("#reservar-flota").href   = linkReserva;
  $("#cta-btn").href          = linkReserva;
  $("#cta-btn").textContent   = D.linkReservas ? "Reservar online →" : "Reservar por WhatsApp →";
  // el texto del CTA admite saltos de linea con \n
  $("#cta-texto").innerHTML = esc(D.textoCta).replace(/\n/g, "<br>");

  // los links de seccion de la barra
  $("#nav-secciones").innerHTML = D.secciones.map((s) =>
    `<a href="#${s.id}">${esc(s.titulo)}</a>`).join("");

  // portada
  $("#portada-et").textContent     = D.etiqueta;
  $("#portada-nombre").textContent = D.nombre;
  $("#portada-bajada").textContent = D.bajada;

  $("#pd-dir").textContent = `${D.direccion}, ${D.barrio}`;
  $("#pd-tel").textContent = D.telefonoVisible;

  // "hoy abrimos de 12 a 16": el dato que mas se busca
  const hoy = horarioDeHoy();
  $("#pd-hoy").textContent = hoy
    ? (hoy.cerrado ? "Hoy cerrado" : `Hoy ${hoy.hora}`)
    : "";

  // foto del local
  const cajaFoto = $("#portada-foto");
  if (D.fotoLocal) {
    cajaFoto.innerHTML = `<img src="${esc(D.fotoLocal)}" alt="Salón de ${esc(D.nombre)}">`;
  } else {
    // sin foto no dejamos un marco vacio: lo sacamos del flujo
    cajaFoto.parentElement.style.display = "none";
  }

  // las notas de cada seccion
  for (const [clave, texto] of Object.entries(D.notas || {})) {
    const el = document.querySelector(`#nota-${clave}`);
    if (el) el.textContent = texto;
  }

  marcarSeccionActiva();
}

// Devuelve la fila de horarios que corresponde a hoy.
// Cada fila trae `dias`: los numeros de dia que cubre (0 = domingo).
function horarioDeHoy() {
  const d = new Date().getDay();
  return (D.horarios || []).find((h) => (h.dias || []).includes(d)) || null;
}

// subraya en la barra la seccion que se esta mirando
function marcarSeccionActiva() {
  const links = [...document.querySelectorAll(".nav-secciones a")];
  const secs = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  if (!secs.length) return;

  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) =>
        a.classList.toggle("activo", a.getAttribute("href") === `#${en.target.id}`));
    });
  }, { rootMargin: "-50% 0px -50% 0px" });

  secs.forEach((s) => obs.observe(s));
}


// ---------- 3. la carta ----------
// Es lo unico asincronico de la pagina: si la carta tarda o falla,
// el resto del sitio ya esta en pantalla igual.
async function carta() {
  const cont = $("#lista-carta");
  const pie  = $("#carta-pie");

  let datos;
  try {
    // Si la carta vino incrustada en el HTML (pagina publicada o
    // archivo abierto sin servidor), la usamos y no salimos a la red.
    const incrustada = document.querySelector("#carta-incrustada");
    if (incrustada) {
      datos = JSON.parse(incrustada.textContent);
    } else {
      const r = await fetch(FUENTE_CARTA, { cache: "no-store" });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      datos = await r.json();
    }
  } catch (e) {
    // Si no carga, no dejamos un hueco: mandamos a whatsapp.
    cont.innerHTML = `
      <div class="carta-error">
        <p>No pudimos cargar la carta en este momento.</p>
        <a href="${linkWsp}" target="_blank" rel="noopener">Escribinos y te la pasamos →</a>
      </div>`;
    console.error("carta:", e);
    return;
  }

  const cats = [...(datos.categorias || [])].sort((a, b) => a.orden - b.orden);

  // filtros: todas las categorias, mas las dietas que realmente existan
  const dietas = new Set();
  cats.forEach((c) => c.productos.forEach((p) =>
    (p.etiquetas || []).forEach((t) => dietas.add(t))));

  const filtros = [
    { id: "todos", txt: "Todo" },
    ...cats.map((c) => ({ id: `cat:${c.id}`, txt: c.nombre })),
    ...[...dietas].map((d) => ({ id: `tag:${d}`, txt: d })),
  ];

  $("#filtros").innerHTML = filtros.map((f, i) =>
    `<button class="filtro${i === 0 ? " on" : ""}" data-f="${esc(f.id)}">${esc(f.txt)}</button>`
  ).join("");

  cont.innerHTML = cats.map((c) => `
    <div class="cat" data-cat="${esc(c.id)}">
      <div class="cat-head revelar">
        <h3 class="cat-titulo">${esc(c.nombre)}</h3>
        ${c.nota ? `<p class="cat-nota">${esc(c.nota)}</p>` : ""}
      </div>
      ${c.productos.map((p) => plato(p, c.id)).join("")}
    </div>`).join("");

  pie.textContent = `Carta actualizada el ${fecha(datos.actualizado)} · Precios en ${datos.moneda || "ARS"}, IVA incluido`;

  $("#filtros").addEventListener("click", (e) => {
    const btn = e.target.closest(".filtro");
    if (!btn) return;

    document.querySelectorAll(".filtro").forEach((b) => b.classList.remove("on"));
    btn.classList.add("on");
    const f = btn.dataset.f;

    document.querySelectorAll(".plato").forEach((el) => {
      let ver = true;
      if (f.startsWith("cat:")) ver = el.dataset.cat === f.slice(4);
      else if (f.startsWith("tag:")) ver = (el.dataset.tags || "").split("|").includes(f.slice(4));
      el.classList.toggle("oculto", !ver);
    });

    // una categoria que quedo sin platos visibles se esconde entera,
    // asi no queda un titulo solo colgado
    document.querySelectorAll(".cat").forEach((cat) => {
      const quedan = cat.querySelectorAll(".plato:not(.oculto)").length;
      cat.classList.toggle("oculto", quedan === 0);
    });

    revelar();
  });

  revelar();
}

function plato(p, catId) {
  const tags = p.etiquetas || [];
  // La miniatura solo aparece si ese plato tiene foto. Un local rara
  // vez fotografia la carta entera, y la fila sin foto no puede
  // quedar corrida: por eso la clase va en el contenedor.
  const conFoto = Boolean(p.foto_url);
  return `
    <div class="plato revelar${p.disponible ? "" : " agotado"}${conFoto ? " con-foto" : ""}"
         data-cat="${esc(catId)}" data-tags="${esc(tags.join("|"))}">
      ${conFoto ? `<div class="plato-foto">
        <img src="${esc(p.foto_url)}" alt="${esc(p.nombre)}" loading="lazy">
      </div>` : ""}
      <div class="plato-txt">
      <div class="plato-linea">
        <span class="plato-nombre">${esc(p.nombre)}</span>
        ${p.disponible ? "" : `<span class="chip-agotado">Hoy no</span>`}
        <span class="plato-puntos"></span>
        <span class="plato-precio">${plata(p.precio)}</span>
      </div>
      ${p.descripcion ? `<p class="plato-desc">${esc(p.descripcion)}</p>` : ""}
      ${tags.length ? `<p class="plato-tags">${tags.map((t) =>
        `<span class="plato-tag">${esc(t)}</span>`).join("")}</p>` : ""}
      </div>
    </div>`;
}

// "2026-10-26" -> "26/10/2026". Sin new Date() para que no se corra
// un dia por zona horaria.
function fecha(iso) {
  if (!iso) return "hoy";
  const [a, m, d] = String(iso).split("-");
  return d && m && a ? `${d}/${m}/${a}` : iso;
}


// ---------- 4. salon, pasos y faq ----------
function bloques() {
  $("#lista-salon").innerHTML = D.salon.map((s) => `
    <div class="dato revelar">
      <p class="dato-n">${esc(s.n)}</p>
      <p class="dato-t">${esc(s.t)}</p>
      <p class="dato-d">${esc(s.d)}</p>
    </div>`).join("");

  $("#pasos").innerHTML = D.pasos.map((p) => `
    <div class="paso revelar">
      <p class="paso-n micro">${esc(p.n)}</p>
      <p class="paso-t">${esc(p.t)}</p>
      <p class="paso-d">${esc(p.d)}</p>
    </div>`).join("");

  $("#faq").innerHTML = D.faq.map((f) => `
    <div class="faq-item revelar">
      <button class="faq-q">${esc(f.q)}<span class="faq-mas">+</span></button>
      <div class="faq-r"><p>${esc(f.r)}</p></div>
    </div>`).join("");

  // acordeon: abre uno y cierra el resto
  $("#faq").addEventListener("click", (e) => {
    const q = e.target.closest(".faq-q");
    if (!q) return;
    const item = q.parentElement;
    const yaAbierto = item.classList.contains("abierto");
    document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("abierto"));
    if (!yaAbierto) item.classList.add("abierto");
  });
}


// ---------- 5. visitanos y pie ----------
function visita() {
  $("#v-dir").textContent    = D.direccion;
  $("#v-barrio").textContent = D.barrio;
  $("#v-mapa").href          = D.mapa;

  const hoy = new Date().getDay();
  $("#v-horarios").innerHTML = D.horarios.map((h) => {
    const esHoy = (h.dias || []).includes(hoy);
    return `
    <div class="hora-fila${esHoy ? " hoy" : ""}${h.cerrado ? " cerrado" : ""}">
      <span class="hora-dia">${esc(h.dia)}</span>
      <span class="hora-hora">${esc(h.hora)}</span>
    </div>`;
  }).join("");

  $("#v-ig").innerHTML   = `<a href="https://instagram.com/${esc(D.instagram)}" target="_blank" rel="noopener">@${esc(D.instagram)}</a>`;
  $("#v-mail").innerHTML = `<a href="mailto:${esc(D.email)}">${esc(D.email)}</a>`;
  $("#v-wsp").href       = linkWsp;

  $("#pie-nombre").textContent = `${new Date().getFullYear()} © ${D.nombre}`;
  $("#pie-dir").textContent    = `${D.direccion}, ${D.barrio}`;
}


// ---------- 6. aparecer al scrollear ----------
function revelar() {
  const objetivos = document.querySelectorAll(".revelar:not(.visto)");

  if (!("IntersectionObserver" in window)) {
    objetivos.forEach((o) => o.classList.add("visto"));
    return;
  }

  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("visto");
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0, rootMargin: "0px 0px -40px 0px" });

  objetivos.forEach((o) => obs.observe(o));
}

// red de seguridad: si algo quedo invisible (scroll muy rapido, la
// pestaña oculta al cargar, o un salto con un ancla), se revela.
// Incluye lo que ya quedo POR ENCIMA de la pantalla: si el visitante
// paso de largo, igual tiene que poder verlo al volver para arriba.
const rescate = () => {
  document.querySelectorAll(".revelar:not(.visto)").forEach((o) => {
    const r = o.getBoundingClientRect();
    if (r.top < innerHeight) o.classList.add("visto");
  });
};
addEventListener("scroll", rescate, { passive: true });
addEventListener("resize", rescate, { passive: true });


// ---------- arranque ----------
cabecera();
bloques();
visita();
revelar();
carta();        // va ultimo: es el unico que espera a la red
