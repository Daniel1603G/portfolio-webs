// ============================================================
//  Arma la pagina entera a partir de DATOS (ver datos.js).
//  No hace falta tocar nada de acá para personalizar un local.
// ============================================================

const $ = (sel) => document.querySelector(sel);
const D = DATOS;

// link de whatsapp con el mensaje ya escrito
const linkWsp = `https://wa.me/${D.whatsapp}?text=${encodeURIComponent(D.mensajeWhatsapp)}`;

// escapa texto antes de meterlo en el HTML
const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// devuelve <img> si hay foto, o un placeholder gris si no
const foto = (src, alt) => src
  ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">`
  : `<div class="ph">${esc(alt)}</div>`;


// ---------- 1. color de acento y titulo ----------
document.documentElement.style.setProperty("--acento", D.acento);
document.title = `${D.nombre} — Estudio de tatuajes en ${D.barrio}`;


// ---------- 2. intro ----------
function intro() {
  const caja = $("#intro");

  $("#intro-logo").textContent  = D.siglas;
  $("#intro-ruta").textContent  = D.intro.ruta;
  $("#intro-ver").textContent   = D.intro.version;
  $("#intro-estado").textContent = D.intro.estado;
  $("#intro-anio").textContent  = `${new Date().getFullYear()} © ${D.nombre}`;

  // si la intro esta apagada, salimos derecho
  if (!D.intro.activa) return salir(true);

  const fill = $("#fill");
  const pct  = $("#pct");
  const btn  = $("#entrar");
  let n = 0;

  // la barra sube a saltos irregulares, como una carga real
  const tic = setInterval(() => {
    n = Math.min(100, n + Math.random() * 14 + 4);
    fill.style.width = n + "%";
    pct.textContent = Math.floor(n) + "%";
    if (n >= 100) {
      clearInterval(tic);
      // esperamos a que la barra termine de dibujarse antes de
      // ofrecer el boton, si no aparece con la barra a medio llenar
      setTimeout(() => btn.classList.add("listo"), 260);
    }
  }, 140);

  btn.addEventListener("click", () => salir(false));

  function salir(instantaneo) {
    caja.classList.add("fuera");
    document.body.classList.remove("bloqueado");
    // la pagina recien ahora es visible: recalculamos que mostrar
    dispatchEvent(new Event("resize"));
    if (instantaneo) caja.style.display = "none";
    else setTimeout(() => (caja.style.display = "none"), 700);
  }
}


// ---------- 3. barra, menu y hero ----------
function cabecera() {
  $("#logo-barra").textContent = `${D.siglas} ${D.nombre}`;
  $("#wsp-barra").href = linkWsp;
  $("#wsp-flota").href = linkWsp;
  $("#cta-wsp").href   = linkWsp;

  // foto del local: si no hay, queda el placeholder del HTML
  if (D.fotoLocal) {
    $("#hero-foto").innerHTML = foto(D.fotoLocal, "Interior del estudio");
  }

  $("#hero-logo").textContent   = D.nombre;
  $("#hero-bajada").textContent = D.bajada;
  $("#hero-ciudad").textContent = D.ciudad;
  $("#hero-dir").textContent    = `${D.direccion} · ${D.barrio}`;

  // menu overlay
  $("#menu-lista").innerHTML = D.secciones.map((s, i) => `
    <a href="#${s.id}" data-cerrar>
      <span class="n">0${i + 1}</span>
      <span>${esc(s.titulo)}</span>
    </a>`).join("");

  $("#menu-pie").innerHTML = `
    <span>${esc(D.direccion)}, ${esc(D.barrio)}</span>
    <a href="https://instagram.com/${esc(D.instagram)}" target="_blank" rel="noopener">@${esc(D.instagram)} ↗</a>
    <a href="mailto:${esc(D.email)}">${esc(D.email)}</a>`;

  const menu = $("#menu");
  $("#abrir-menu").onclick = () => menu.classList.add("abierto");
  $("#cerrar-menu").onclick = () => menu.classList.remove("abierto");
  menu.addEventListener("click", (e) => {
    if (e.target.closest("[data-cerrar]")) menu.classList.remove("abierto");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") menu.classList.remove("abierto");
  });

  // indice numerado
  $("#indice").innerHTML = D.secciones.map((s, i) => `
    <a class="indice-fila" href="#${s.id}">
      <span class="indice-n">0${i + 1}</span>
      <span class="indice-t">${esc(s.titulo)}</span>
      <span class="indice-desc">${esc(s.desc)}<span class="flecha">→</span></span>
    </a>`).join("");
}


// ---------- 4. trabajos + filtro por estilo ----------
function trabajos() {
  $("#filtros").innerHTML = D.estilos.map((e, i) =>
    `<button class="filtro${i === 0 ? " on" : ""}" data-estilo="${esc(e)}">${esc(e)}</button>`
  ).join("");

  $("#grilla").innerHTML = D.trabajos.map((t) => `
    <figure class="pieza ${t.alto === "alto" ? "alto" : ""}" data-estilo="${esc(t.estilo)}">
      ${foto(t.img, t.estilo)}
      <figcaption class="pieza-tag">${esc(t.estilo)}</figcaption>
    </figure>`).join("");

  $("#filtros").addEventListener("click", (e) => {
    const btn = e.target.closest(".filtro");
    if (!btn) return;

    document.querySelectorAll(".filtro").forEach((b) => b.classList.remove("on"));
    btn.classList.add("on");

    const elegido = btn.dataset.estilo;
    document.querySelectorAll(".pieza").forEach((p) => {
      const mostrar = elegido === "TODOS" || p.dataset.estilo === elegido;
      p.classList.toggle("oculta", !mostrar);
    });
  });
}


// ---------- 5. artistas, pasos, cuidados, faq ----------
function bloques() {
  $("#lista-artistas").innerHTML = D.artistas.map((a) => `
    <article class="artista">
      <div class="artista-foto">${foto(a.img, a.nombre)}</div>
      <div class="artista-info">
        <p class="artista-rol micro">${esc(a.rol)}</p>
        <h3 class="artista-nombre">${esc(a.nombre)}</h3>
        <p class="artista-estilo">${esc(a.estilo)}</p>
        <a class="artista-ig micro" href="https://instagram.com/${esc(a.ig)}" target="_blank" rel="noopener">@${esc(a.ig)} ↗</a>
      </div>
    </article>`).join("");

  $("#pasos").innerHTML = D.pasos.map((p) => `
    <div class="paso">
      <span class="paso-n">${esc(p.n)}</span>
      <h3 class="paso-t">${esc(p.t)}</h3>
      <p class="paso-d">${esc(p.d)}</p>
    </div>`).join("");

  $("#lista-cuidados").innerHTML = D.cuidados.map((c) => `
    <div class="cuidado">
      <h3 class="cuidado-t">${esc(c.t)}</h3>
      <ul>${c.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
    </div>`).join("");

  $("#faq").innerHTML = D.faq.map((f) => `
    <div class="faq-item">
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


// ---------- 6. visitanos + pie ----------
function visita() {
  $("#v-dir").textContent    = D.direccion;
  $("#v-barrio").textContent = D.barrio;
  $("#v-mapa").href          = D.mapa;

  $("#v-horarios").innerHTML = D.horarios.map((h) =>
    `<div class="horario"><span>${esc(h.dia)}</span><span>${esc(h.hora)}</span></div>`
  ).join("");

  $("#v-ig").textContent  = "@" + D.instagram;
  $("#v-mail").textContent = D.email;
  $("#v-wsp").href = linkWsp;

  $("#pie").innerHTML = `
    <span>${new Date().getFullYear()} © ${esc(D.nombre)}</span>
    <span>${esc(D.direccion)}, ${esc(D.barrio)}</span>
    <span>+18 CON DNI · MATERIAL DESCARTABLE</span>`;
}


// ---------- 7. aparicion al scrollear ----------
function revelar() {
  const objetivos = document.querySelectorAll(
    ".revelar, .indice-fila, .pieza, .artista, .paso, .cuidado, .visita-col"
  );
  objetivos.forEach((o) => o.classList.add("revelar"));

  // si el navegador no soporta el observador, se muestra todo y listo
  if (!("IntersectionObserver" in window)) {
    objetivos.forEach((o) => o.classList.add("visto"));
    return;
  }

  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visto");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0, rootMargin: "0px 0px -40px 0px" });

  objetivos.forEach((o) => obs.observe(o));

  // red de seguridad: si algo quedo invisible (scroll muy rapido, la
  // pestaña oculta al cargar, o un salto con scrollIntoView), se revela.
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
  rescate();
}


// ---------- arranque ----------
cabecera();
trabajos();
bloques();
visita();
revelar();
intro();
