# INVA Web — Instituto Nuevo Vallarta

Sitio web del **Instituto Nuevo Vallarta** (preescolar y primaria bilingüe con horario extendido y
estancia vespertina en Valle Dorado, Bahía de Banderas). Presenta la oferta educativa, los valores
institucionales y los canales de contacto en una **SPA** rápida, moderna y responsiva.

Construido con **React + Vite + Tailwind CSS**.

## Características

- **SPA** con React Router (navegación sin recargas).
- **SEO** por página con `react-helmet-async` (título, `description`, canonical y Open Graph para compartir en redes/WhatsApp).
- Diseño **responsive** con Tailwind CSS.
- **Botón flotante de WhatsApp** siempre visible.
- **Mapa de Google** embebido con la ubicación del Instituto.
- Iconos con `lucide-react` + iconos de marca (Facebook/WhatsApp) como SVG.

## Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio (hero, novedades, por qué elegirnos, aliados, testimonios) |
| `/conocenos` | Conócenos (propósito, valores, galería) |
| `/oferta` | Oferta educativa (primaria, estancia vespertina, inscripciones) |
| `/contacto` | Contacto (WhatsApp, teléfono, mapa) |

## Identidad visual

### Tipografía

- **Fuente única:** `Outfit` (Google Fonts), cargada en `index.html` con pesos `300;400;500;600;700;800`.
- Se aplica a todo el sitio vía `tailwind.config.js` → `fontFamily.sans` y `src/index.css` (`body { @apply font-sans; }`).
- Antes había una **inconsistencia**: Tailwind declaraba `Inter` (nunca cargada) mientras el `index.html`
  cargaba `Outfit`. Ya está unificado en **Outfit**.

### Colores (alineados al logo del Instituto)

Definidos en `tailwind.config.js` → `theme.extend.colors`. La paleta se tomó del propio logo
(aro amarillo, letra azul y primer trazo naranja de la “N”):

| Token | Hex | Uso |
|---|---|---|
| `brand-light` | `#5AA9E6` | Detalles y texto sobre fondos oscuros |
| `brand` (DEFAULT) | `#1B6FB3` | **Color principal** (botones, enlaces, acentos) |
| `brand-dark` | `#0F4C81` | Estados *hover* |
| `brand-ink` | `#0B2A45` | Secciones oscuras (hero overlay, footer) |
| `brand-subtle` | `#EAF3FB` | Fondos de tarjetas/íconos |
| `accent-light` | `#FFD166` | Amarillo claro |
| `accent` (DEFAULT) | `#F5B301` | **Amarillo del logo** (CTA y realce en hero) |
| `accent-dark` | `#D99A00` | Estados *hover* |
| `ember` | `#E8791E` | Naranja del logo (uso puntual) |

> Nota: antes el sitio usaba una paleta **teal** (`#0f766e`) que no coincidía con el logo real,
> que es azul/amarillo. Se cambió a azul/amarillo para dar cohesión de marca.

### Componentes utilitarios (`src/index.css`)

- `.btn-primary`, `.btn-accent`, `.btn-outline`: botones del sistema.
- `.eyebrow`: etiqueta pequeña en mayúsculas para encabezados de sección.
- `.animate-fade-in`, `.animate-fade-in-up` (+ `.delay-*`): animaciones de entrada (respetan `prefers-reduced-motion`).

## Contacto

- **WhatsApp:** [+52 322 244 0506](https://wa.me/523222440506)
- **Teléfono:** [322 244 0506](tel:3222440506)
- **Dirección:** Valle de los Álamos 354, Valle Dorado, 63735 Mezcales, Nayarit.
- **Mapa:** [Instituto Nuevo Vallarta](https://maps.google.com/?q=Instituto+Nuevo+Vallarta)

## Stack

- **React 19** · **Vite 7**
- **Tailwind CSS 3** + `clsx` + `tailwind-merge`
- **React Router 7**
- **react-helmet-async** (SEO)
- **lucide-react** (iconos)

> `clsx` y `tailwind-merge` están en `package.json` pero aún no se usan; quedan disponibles para
> componer clases cuando se necesite.

## Requisitos

- **Node.js 18+** y npm.

## Desarrollo local

```bash
npm install --legacy-peer-deps   # ver nota de dependencias abajo
npm run dev                      # http://localhost:5173
```

Otros scripts:

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo (Vite + HMR). |
| `npm run build` | Build de producción en `dist/`. |
| `npm run preview` | Previsualiza el build. |
| `npm run lint` | ESLint. |

### Nota sobre dependencias

`react-helmet-async@2.0.5` declara peer de React `^16-^18`, pero el proyecto usa **React 19**.
Por eso `npm install` requiere `--legacy-peer-deps`. Alternativas a futuro: usar `@dr.pogodin/react-helmet`
o migrar el SEO a las APIs nativas de React 19 (`<title>`/`<meta>` en componentes).

## Deploy

Sitio **estático**: `npm run build` y sirve `dist/` en la **raíz** del dominio. Las imágenes viven en
`public/` y se referencian por ruta relativa (`logo.jpg`, `hero.jpg`, …), así que conviene desplegarlo
en la raíz.

## Estructura

```
index.html              HTML base (fuente Outfit, favicon, meta)
src/
  main.jsx              Entry point + HelmetProvider
  App.jsx               Componentes, layout y páginas + router
  SEO.jsx               Componente SEO (única fuente, importado por App.jsx)
  index.css             Estilos base + Tailwind
public/                 Imágenes del sitio (hero, galería, logos, flyers…)
tailwind.config.js      Tema: colores brand/accent/ember y tipografía
vite.config.js          Config de Vite
```

Las páginas y componentes (`Navbar`, `Footer`, `Home`, `About`, `Offer`, `Contact`, `FloatingWhatsApp`
y utilidades como `SectionHeading`, `FeatureItem`, `SocialLinks`) están en `src/App.jsx`.

## Personalización

- **Colores de marca:** `tailwind.config.js` → `theme.extend.colors` (`brand`, `accent`, `ember`).
- **Tipografía:** pesos de Outfit en `index.html` y familia en `tailwind.config.js`.
- **Imágenes:** reemplaza los archivos en `public/` (conserva los nombres) o ajusta el mapa `IMAGES` en `src/App.jsx`.
- **Contacto / WhatsApp / mapa:** constantes al inicio de `src/App.jsx` (`WHATSAPP`, `PHONE_TEL`, `PHONE_LABEL`) y el `iframe` de Google Maps en la página `Contact`.

## Notas de mantenimiento

- **Fuente única de SEO:** `src/SEO.jsx` (se eliminó la versión duplicada que vivía dentro de `App.jsx`).
- **`src/App.jsx` sigue concentrando todo**: funciona, pero si el sitio crece conviene separar componentes y páginas.
- **Imágenes sin usar:** `gallery_2.jpg`, `gallery_4.jpg` y `conocenos_3.jpg` no se referencian
  actualmente. Se pueden sumar a la galería o eliminar para aligerar el repo.
- Se eliminó el boilerplate de Vite sin uso (`src/App.css`, `src/assets/react.svg`).
- El **favicon/logo** ahora se carga del `public/logo.jpg` local (antes apuntaba a `https://inva.edu.mx/logo.jpg`).

## Licencia

Proyecto privado (`"private": true`).
