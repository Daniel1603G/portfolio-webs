# NEGRO HUESO — demo de muestra

**Link publicado:** https://claude.ai/artifact/LcqLojTnVm4d4vNQbpwbMd

Estudio **ficticio**. No es ningún local real, no usa el nombre, el
teléfono ni las fotos de nadie. Sirve para dos cosas:

1. **Mandar un link** a un prospecto sin publicar una web con su nombre
   antes de que lo autorice.
2. **Portfolio.** Es trabajo tuyo, se puede mostrar sin pedir permiso.

---

## Qué tiene de inventado

Todo. El nombre, la dirección (Thames 1842), los artistas, el teléfono
(`5491100000000`, que no es una línea real) y las imágenes.

Las imágenes **no son fotos**: son patrones geométricos generados por
código. No hay tatuajes de nadie ni caras de nadie. Eso es a propósito:
una demo con fotos bajadas de Instagram ajeno no se puede publicar.

---

## Los archivos

| Archivo | Qué es |
|---|---|
| `index.html` `estilo.css` `app.js` | el modelo, igual que en `modelos/tatuajes/` |
| `datos.js` | los datos del estudio ficticio |
| `fotos/*.svg` | las 13 imágenes generadas |
| `generar-fotos.js` | las dibuja. `node generar-fotos.js` |
| `armar-artifact.js` | empaqueta todo en un HTML. `node armar-artifact.js` |
| `artifact.html` | el resultado, 137 KB, lo que está publicado |

### Para verla local

```bash
node servidor.js demos/estudio-demo 4182
```

### Para volver a publicarla después de un cambio

```bash
node demos/estudio-demo/armar-artifact.js
```

Y después publicar `artifact.html` al mismo link, así no cambia la URL.

---

## Las imágenes generadas

`generar-fotos.js` usa un generador con semilla fija: cada corrida da
exactamente el mismo resultado. Si las regenerás, las capturas que ya
tengas siguen coincidiendo.

Dibuja cuatro estilos distintos para que el filtro de la galería se note:

- **BLACKWORK** — masa negra con mordidas y cuñas
- **FINE LINE** — tallo con hojas, trazo fino
- **REALISMO** — esfera sombreada con degradado y puntillismo
- **OLD SCHOOL** — disco con contorno grueso, banda y rayos

Los tres retratos del equipo son siluetas: rodete, pelo corto y pelo
largo, cada una con su encuadre y su trama de fondo. Tienen marcas de
tinta caladas en los brazos. No representan a nadie.

Todo se compone dentro de un área central con margen, porque la grilla
recorta con `object-fit: cover` y lo que toca el borde se pierde.

---

## Para armar la web de un local real

Copiá esta carpeta, borrá `fotos/` y `generar-fotos.js`, y editá
`datos.js` con los datos del local. Las fotos reales van en `fotos/`
y se apuntan desde `datos.js`.

Detalle completo en `../../modelos/tatuajes/LEEME.md`.
