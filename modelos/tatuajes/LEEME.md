# Modelo — Estudios de tatuaje

Página de una sola pantalla, en blanco y negro, con intro animada.
Todo lo que cambia de un local a otro vive en **`datos.js`**.

## Archivos

| Archivo | Qué es |
|---|---|
| `datos.js` | **El único que editás por local.** Nombre, teléfono, fotos, textos. |
| `index.html` | El esqueleto. No se toca. |
| `estilo.css` | Los estilos. No se toca. |
| `app.js` | Arma la página desde `datos.js`. No se toca. |

## Hacer una demo para un local nuevo

1. Copiá la carpeta `modelos/tatuajes` a `demos/nombre-del-local`.
2. Abrí `datos.js` y cambiá los valores.
3. Meté las fotos en una subcarpeta `fotos/` y apuntá a ellas:
   `{ estilo: "BLACKWORK", img: "fotos/pieza-01.jpg", alto: "alto" }`
4. Probala con el servidor (ver abajo).

## Verla en el navegador

Desde la carpeta `.`:

```bash
node servidor.js demos/nombre-del-local 4173
```

Después abrí `http://localhost:4173` en el navegador.

## Lo que más conviene tocar

- **`acento`** — el color de la marca. Un solo valor cambia toda la página.
  Verde fluor `#C6FF00`, rojo `#FF3B30`, naranja `#FF6B00`, blanco `#FFFFFF`.
- **`whatsapp`** — solo números, con código de país y sin `+`.
  Para Argentina: `54` + `9` + característica sin el 0 + número sin el 15.
  Ejemplo: el `11 2233-4455` de CABA va como `5491122334455`.
- **`intro.activa`** — poné `false` si el local no quiere la pantalla de carga.
- **`secciones`** — sacá o reordená secciones. El índice numerado se reacomoda solo.
- **`fotoLocal`** — la foto grande de arriba (el hero). Si no la ponés,
  queda el placeholder oscuro. Es la que más se ve: conviene cargarla.

## Fotos

Si dejás `img: null` aparece un placeholder gris con el nombre del estilo.
Sirve para mostrar la estructura antes de tener las fotos del local.

Para una demo que vas a **publicar** no sirve ninguna de esas dos cosas:
mirá `demos/estudio-demo/`, que genera imágenes propias por código
(`generar-fotos.js`). Son patrones abstractos, no fotos de nadie, así que
la página se puede publicar sin pedirle permiso a ningún estudio.

Para las demos de venta conviene sacar las fotos del Instagram del estudio.
Son de ellos: úsalas solo para mostrarles la demo, y si cierran el trato
pediles los archivos originales.

## Antes de entregar

- [ ] Probar el botón de WhatsApp en un celular de verdad.
- [ ] Revisar que el link del mapa caiga en la dirección correcta.
- [ ] Cambiar el `<meta name="description">` del `index.html` por uno del local.
- [ ] Reemplazar los placeholders por fotos reales.
- [ ] Comprimir las fotos (que ninguna pase de 300 KB).
