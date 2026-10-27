# Webs para locales

Dos modelos de sitio web para comercios que hoy solo tienen Instagram.
Cada modelo se adapta a un local editando un archivo de datos, sin
tocar el código.

**[Ver las demos →](https://daniel1603g.github.io/portfolio-webs/)**

| Demo | Rubro | Qué muestra |
|---|---|---|
| [Negro Hueso](https://daniel1603g.github.io/portfolio-webs/demos/estudio-demo/) | Estudio de tatuajes | Galería filtrable, equipo, pantalla de carga |
| [La Esquina](https://daniel1603g.github.io/portfolio-webs/demos/resto-demo/) | Restaurante | Carta con precios, filtros por dieta, platos agotados |

Los dos locales son **ficticios**. Nombres, direcciones, teléfonos e
imágenes son de ejemplo.

---

## Cómo está armado

HTML, CSS y JavaScript. Sin frameworks, sin build, sin dependencias.
Se abre con cualquier servidor estático.

```bash
node servidor.js demos/resto-demo 4184
```

### La idea: un archivo por local

Todo lo que cambia de un comercio a otro vive en `datos.js`. El resto
del código no se toca:

```js
const DATOS = {
  nombre: "La Esquina",
  acento: "#9A3412",      // un valor cambia el color de toda la pagina
  whatsapp: "5491100000000",
  horarios: [...],
  faq: [...],
};
```

El color de acento se aplica en tiempo de ejecución sobre una variable
CSS, así que cambiar una línea repinta el sitio entero.

---

## Los dos modelos

Son diseños distintos, no el mismo con otro color.

### `modelos/tatuajes/`

Blanco y negro, tipografía pesada, títulos a pantalla completa, índice
numerado y pantalla de carga con barra de progreso.

Las imágenes de la demo son **patrones geométricos generados por
código** (`generar-fotos.js`): cuatro estilos de tatuaje y tres
siluetas de retrato, con un generador de números pseudoaleatorios con
semilla fija para que cada corrida dé el mismo resultado. No hay fotos
de personas ni trabajos de nadie.

### `modelos/restaurantes/`

Papel crema con textura, tipografía con serifa, platos unidos a su
precio por puntos guía, sin pantalla de intro. Imita una carta
impresa.

**La carta vive aparte, en `carta.json`.** Es lo único que cambia
seguido (precios, platos agotados) y lo único que puede venir de un
sistema externo. Separarla significa que conectar una API es cambiar
una línea:

```js
const FUENTE_CARTA = "carta.json";
// -> "https://api.ejemplo.com/v1/sucursales/abc/carta"
```

El formato sigue el modelo de datos de un sistema de gestión
gastronómica (categoría → producto → precio, con `disponible` para el
sin stock). Está documentado en
[`modelos/restaurantes/INTEGRACION.md`](modelos/restaurantes/INTEGRACION.md).

---

## Detalles que vale la pena mirar

- **El plato agotado no desaparece.** Se ve apagado con un cartelito
  "Hoy no": el cliente se entera antes de sentarse. Si tiene foto, la
  foto se apaga con él.
- **Las fotos son opcionales, plato por plato.** La demo tiene 9 de 17
  a propósito: un local rara vez fotografía la carta entera, y la fila
  sin foto no puede quedar corrida.
- **Los filtros se arman solos** a partir de los datos. Si ningún plato
  tiene "sin gluten", ese filtro no aparece.
- **Los nombres largos nunca se cortan.** En una carta el cliente tiene
  que poder leer qué está pidiendo.
- **Aparición al scrollear con red de seguridad.** Un
  `IntersectionObserver` revela los bloques, y un `rescate()` sobre
  `scroll` y `resize` cubre los casos donde el observer no dispara
  (pestaña oculta al cargar, salto por ancla, scroll muy rápido).
- **Respeta `prefers-reduced-motion`**: con esa preferencia activada no
  hay animaciones.
- **El HTML se escapa antes de insertarse**, aunque los datos sean
  propios.

---

## Estructura

```
modelos/
  tatuajes/        el modelo, listo para clonar
  restaurantes/    idem, + carta.json e INTEGRACION.md
demos/
  estudio-demo/    demo navegable + generador de imagenes
  resto-demo/      demo navegable
servidor.js        servidor estatico minimo, sin dependencias
```

Para armar el sitio de un local: se copia el modelo, se edita
`datos.js` (y `carta.json` si es un restaurante), y listo.
