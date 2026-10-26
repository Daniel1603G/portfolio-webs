# Integración con Comanda

Cómo la web se conecta con tu sistema de gestión
(repo aparte).

---

## Por qué la carta vive en un archivo aparte

Todo lo del local va en `datos.js`. **La carta no**: va en
`carta.json`, sola.

No es un capricho. Es lo único que cambia seguido (precios, platos
agotados) y lo único que algún día va a venir del sistema en vez de
escribirse a mano. Separarla significa que el día que conectes
Comanda, cambiás **una línea** y el resto de la web no se entera.

Esa línea es la primera de `app.js`:

```js
const FUENTE_CARTA = "carta.json";
```

El día que exista el endpoint:

```js
const FUENTE_CARTA = "https://api.tudominio.com/v1/sucursales/abc/carta";
```

Nada más. El `fetch`, el render, los filtros y el cartel de "hoy no"
ya funcionan igual.

---

## El formato

`carta.json` usa **los nombres de campo de tu modelo de datos**
(`docs/plan/06-modelo-de-datos.md`), no inventados:

| En la web | En Comanda | Nota |
|---|---|---|
| `categorias[]` | `CATEGORIA` | con `id`, `nombre`, `orden` |
| `categorias[].productos[]` | `PRODUCTO` | anidado, no suelto |
| `producto.id` | `PRODUCTO.id` | uuid en producción |
| `producto.nombre` | `PRODUCTO.nombre` | |
| `producto.disponible` | `PRODUCTO.disponible` | el "sin stock rápido" |
| `producto.foto_url` | `PRODUCTO.foto_url` | `null` si no hay |
| `producto.precio` | `PRECIO.monto` | **ver abajo** |
| `version_catalogo` | `PRODUCTO.version_catalogo` | para cachear |

### Dos diferencias a propósito

**1. El precio viene aplanado.** En Comanda el precio no está en
`PRODUCTO`: está en `PRECIO`, por `LISTA_PRECIO`, y qué lista rige
depende de `REGLA_PRECIO` y `FRANJA`. Eso está bien para el sistema,
pero la web no tiene que resolver franjas horarias: el endpoint ya
tiene que entregarle **el precio que corresponde al canal público**.

Quien resuelve la lista es el backend. La web recibe un número.

**2. `etiquetas[]` no existe todavía en tu modelo.** Son
"vegetariano", "sin gluten". Hoy las escribo a mano. Cuando las
agregues al sistema, el campo ya está esperando.

No las deduzcas de la receta: que un plato *no lleve* harina no
significa que el local se haga responsable de que sea apto celíaco.
Eso lo declara el dueño, plato por plato.

---

## Qué tendría que devolver el endpoint

```jsonc
{
  "version_catalogo": 47,
  "actualizado": "2027-03-14",
  "moneda": "ARS",
  "categorias": [
    {
      "id": "...", "nombre": "PARA EMPEZAR", "orden": 1, "nota": "",
      "productos": [
        {
          "id": "...",
          "nombre": "Provoleta al horno",
          "descripcion": "...",
          "precio": 9800,
          "disponible": true,
          "foto_url": null,
          "etiquetas": ["vegetariano"]
        }
      ]
    }
  ]
}
```

Esto encaja con **RF-MEN-01** del plan ("Carta pública por sucursal
(URL + QR), sincronizada con catálogo y disponibilidad"), que hoy
está en la v1.2.

### Requisitos del endpoint

- **Público, sin auth.** Lo lee cualquiera que escanee el QR.
- **Solo `activo: true` y precio del canal público.** Lo que no se
  vende al público no sale.
- **Sin datos internos.** Nada de `estacion_id`, `alicuota_iva`,
  recetas, costos ni `tenant_id`. La web es una vidriera.
- **CORS abierto** para el dominio del restaurante.
- **Cacheable.** `ETag` o `Last-Modified` con `version_catalogo`.

---

## El orden de los pasos

Lo importante: **no hace falta esperar a la v1.2 para vender webs.**

1. **Hoy.** Cargás `carta.json` a mano por cada cliente. Funciona,
   se cobra, y el restaurante tiene su carta online.
2. **Cuando un cliente te pida cambiar precios seguido.** Le cobrás
   la actualización, o le armás un formulario que escriba el JSON.
3. **Cuando Comanda llegue a la v1.2.** Cambiás `FUENTE_CARTA` y la
   carta se actualiza sola.

El paso 3 es tu argumento de venta para el paso 1: *"más adelante
esto se va a actualizar solo desde el sistema de gestión"*.

---

## Lo que esto le agrega a Comanda

Tu sistema tiene el menú online en v1.2, a unos cuantos sprints.
Mientras tanto, cada restaurante al que le vendas una web es:

- un local que ya tiene la carta estructurada en el formato de Comanda
- un cliente que ya te conoce cuando salgas a vender el sistema
- una prueba real de que el formato funciona antes de escribir
  el endpoint

Vendiendo webs estás construyendo la lista de prospectos del
producto grande.
