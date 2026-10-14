# Adopta una Mascota

Sitio web de una sola página para un refugio de animales sin fines de lucro. Presenta la misión del refugio, muestra a las mascotas disponibles para adopción, indica cómo visitarlo y ofrece un formulario de contacto. Es un proyecto escolar hecho con HTML y CSS puros, sin dependencias ni herramientas de compilación.

## Contenido

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Cómo ejecutarlo](#cómo-ejecutarlo)
- [Secciones del sitio](#secciones-del-sitio)
- [Personalización](#personalización)
- [Limitaciones conocidas](#limitaciones-conocidas)
- [Posibles mejoras](#posibles-mejoras)

## Características

- Navegación por anclas entre las secciones de la misma página.
- Sección principal (hero) con un llamado a la acción.
- Tarjetas de mascotas con foto, nombre y descripción breve.
- Datos de ubicación y horario de atención.
- Formulario de contacto con campos de nombre, correo y mensaje.
- Etiquetas semánticas (`header`, `nav`, `main`, `section`, `article`, `footer`) y etiquetas `label` asociadas a cada campo del formulario.
- Texto alternativo (`alt`) en todas las imágenes.
- Idioma del documento declarado como español (`lang="es"`).

## Tecnologías

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura y contenido de la página |
| CSS3 | Estilos, diseño con Flexbox y paleta de colores |

No se utiliza JavaScript, frameworks ni librerías externas.

## Estructura del proyecto

```
.
├── index.html    # Estructura y contenido de la página
├── styles.css    # Hoja de estilos
└── README.md     # Este archivo
```

## Cómo ejecutarlo

No requiere instalación. Hay dos opciones:

1. **Abrir directamente:** haz doble clic en `index.html` o arrástralo a tu navegador.
2. **Servidor local (opcional):** desde la carpeta del proyecto, ejecuta uno de estos comandos y visita `http://localhost:8000`.

```bash
# Con Python 3
python -m http.server 8000

# O con Node.js
npx serve
```

## Secciones del sitio

| Sección | Identificador | Descripción |
|---------|---------------|-------------|
| Encabezado | `.encabezado` | Logo y menú de navegación |
| Inicio | `#inicio` | Mensaje de bienvenida y botón "Quiero adoptar" |
| Sobre nosotros | `#nosotros` | Misión del refugio y lista de valores: responsabilidad, cuidado y amor |
| Adóptame | `#adopta` | Tarjetas de Firulais (perro), Michi (gato) y Rocky (conejo) |
| Visítanos | `#visita` | Dirección y horario (lunes a sábado, 10:00 a 17:00 hrs) |
| Contáctanos | `#contacto` | Formulario con nombre, correo y mensaje |
| Pie de página | `.pie` | Derechos y enlaces a redes sociales |

## Personalización

### Colores

Los colores principales están definidos en `styles.css`:

| Elemento | Color |
|----------|-------|
| Encabezado | `#4caf50` |
| Fondo del hero | `#e8f5e9` |
| Botones y títulos de sección | `#2e7d32` |
| Texto general | `#333` |
| Fondo de la página | `#fafafa` |
| Pie de página | `#333` |

Para cambiar la paleta, modifica estos valores en la hoja de estilos.

### Agregar una mascota

Dentro de la sección `#adopta` en `index.html`, duplica un bloque `article` y edita la imagen, el nombre y la descripción:

```html
<article class="tarjeta">
  <img src="ruta/a/la/foto.jpg" alt="Foto de Nombre">
  <h3>Nombre</h3>
  <p>Especie, edad. Descripción breve.</p>
</article>
```

Las tarjetas se acomodan solas gracias a `display: flex` y `flex-wrap: wrap`.

### Datos del refugio

Actualiza la dirección y el horario en la sección `#visita`, y los textos de la sección `#nosotros`, directamente en `index.html`.

## Limitaciones conocidas

- El formulario de contacto no tiene `action` ni JavaScript, por lo que no envía información a ningún lado.
- El botón "Quiero adoptar" todavía no lleva a ninguna parte.
- Las imágenes de las mascotas usan `via.placeholder.com`, un servicio externo que puede no cargar. Conviene reemplazarlas por fotos reales guardadas en el proyecto.
- Los enlaces de redes sociales del pie de página son solo texto, sin hipervínculos.
- El diseño no incluye `media queries`; en pantallas muy pequeñas el encabezado puede verse apretado.

## Posibles mejoras

- Conectar el formulario a un servicio de envío de correo o a un backend.
- Hacer que el botón "Quiero adoptar" desplace a la sección `#adopta`.
- Agregar fotos reales y una carpeta `img/` para organizarlas.
- Añadir `media queries` para mejorar la visualización en celulares.
- Agregar desplazamiento suave (`scroll-behavior: smooth`) y estados `:hover` en enlaces y botones.
- Incorporar enlaces reales a las redes sociales.
- Mostrar un mapa de ubicación en la sección "Visítanos".
- Validar los campos del formulario y mostrar mensajes de confirmación.

## Créditos

Proyecto escolar elaborado como práctica de HTML y CSS.