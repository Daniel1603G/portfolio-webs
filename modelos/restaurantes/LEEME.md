# Modelo RESTAURANTES

**Demo publicada:** https://claude.ai/artifact/4Qs3Z9tBdpB9irbfksFAqy

Carta digital para restaurantes. Local ficticio ("La Esquina"), datos
de ejemplo: se puede mostrar a cualquiera sin pedir permiso.

Es un diseño **distinto** al de tatuajes, no el mismo con otro color:
papel crema, tipografía con serifa, platos unidos al precio por puntos
guía, sin pantalla de intro. Imita una carta impresa.

---

## Los archivos

| Archivo | Qué es |
|---|---|
| `index.html` | el esqueleto |
| `estilo.css` | todo el diseño |
| `app.js` | arma la página |
| `datos.js` | **los datos del local** — se edita por cliente |
| `carta.json` | **la carta** — se edita por cliente, aparte |
| `INTEGRACION.md` | cómo se conecta con el sistema de gestión |

### Por qué la carta va aparte

Porque es lo único que después va a venir de Comanda. Ver
[INTEGRACION.md](INTEGRACION.md).

---

## Para armar la web de un restaurante

1. Copiá esta carpeta a `demos/nombre-del-local/`
2. Editá `datos.js`: nombre, dirección, horarios, contacto, FAQ
3. Editá `carta.json`: las categorías y los platos
4. Probá: `node servidor.js demos/nombre-del-local 4184`

### Lo que más conviene tocar

- **`acento`** — el color. Terracota `#9A3412` por defecto. Verde
  oliva `#4D5D3A`, vino `#7B2D3B`, mostaza `#B45309`.
- **`etiqueta`** — la línea de arriba del nombre. "Cocina de barrio
  desde 1998", "Parrilla y vinos", lo que los distinga.
- **`horarios`** — cada fila lleva `dias` con los números de día
  (domingo = 0). Sirve para marcar "hoy" y mostrar "Hoy 12 a 16"
  en la portada. **Si te olvidás los `dias`, no se marca nada.**
- **`linkReservas`** — si usan TheFork o Meitre, poné el link y
  todos los botones llevan ahí en vez de a WhatsApp.
- **`salon`** — los tres números. Cubiertos, mesa larga, accesible.
  Cambialos por lo que ese local quiera destacar.

### La carta

Cada producto lleva `disponible`. En `false` el plato **se sigue
viendo**, apagado y con un cartelito "Hoy no". Es a propósito: el
cliente se entera antes de sentarse, y el local no tiene que borrar
y volver a cargar el plato.

`etiquetas` arma los filtros solo. Si ningún plato tiene "sin
gluten", ese filtro no aparece.

---

## Para publicar una demo

```bash
node demos/resto-demo/armar-artifact.js
```

Mete el css, el js, los datos y **la carta** en un solo HTML de 40 KB.
La carta va incrustada porque en la página publicada no hay un
`carta.json` al lado para buscar.

---

### Fotos de los platos

Cada producto puede llevar `foto_url`. Si lo tiene, aparece una
miniatura cuadrada a la izquierda del plato.

**No hace falta que todos tengan foto.** Un local rara vez fotografía
la carta entera. Los platos sin foto quedan alineados igual, sin hueco:
la demo tiene 9 de 17 justamente para mostrar cómo se ve mezclado.

```json
"foto_url": "fotos/ojo-001.svg"
```

La foto de un plato agotado se apaga junto con el texto.

**Qué foto conviene:** cuadrada, el plato centrado, vista desde arriba.
Se recorta con `object-fit: cover`, así que lo que toca el borde se
pierde. Si el local manda fotos de mesa entera, recortalas antes.

---

## Lo que falta

- **Carta de vinos aparte.** Los restaurantes con bodega grande la
  quieren separada.
- **Menú del día.** Lo piden los que tienen almuerzo ejecutivo.
