# INVA Web — Instituto Nuevo Vallarta

Sitio web del **Instituto Nuevo Vallarta** (primaria bilingüe con horario extendido, en Bahía de Banderas). Presenta la oferta educativa, los valores institucionales y los canales de contacto en una **SPA** rápida, moderna y responsiva.

Construido con **React + Vite + Tailwind CSS**.

## Características

- **SPA** con React Router (navegación sin recargas).
- **SEO** por página con `react-helmet-async` (título, `description` y Open Graph para compartir en redes/WhatsApp).
- Diseño **responsive** con Tailwind CSS.
- **Botón flotante de WhatsApp** siempre visible.
- **Mapa de Google** embebido con la ubicación del Instituto.
- Iconos con `lucide-react`.

## Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio (hero, oferta destacada, galería, valores…) |
| `/conocenos` | Conócenos (sobre el Instituto) |
| `/oferta` | Oferta Educativa |
| `/contacto` | Contacto (WhatsApp, teléfono, mapa) |

## Contacto

- **WhatsApp:** [+52 322 244 0506](https://wa.me/523222440506)
- **Teléfono:** [322 244 0506](tel:3222440506)
- **Dirección:** Valle de los Álamos 354, Valle Dorado.
- **Mapa:** [Instituto Nuevo Vallarta](https://maps.google.com/?q=Instituto+Nuevo+Vallarta)

## Stack

- **React 19** · **Vite 7**
- **Tailwind CSS 3** + `clsx` + `tailwind-merge`
- **React Router 7**
- **react-helmet-async** (SEO)
- **lucide-react** (iconos)

## Requisitos

- **Node.js 18+** y npm.

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:5173
```

Otros scripts:

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo (Vite + HMR). |
| `npm run build` | Build de producción en `dist/`. |
| `npm run preview` | Previsualiza el build. |
| `npm run lint` | ESLint. |

## Deploy

Es un sitio **estático**: `npm run build` y sirve el contenido de `dist/` (raíz del dominio). Las imágenes viven en `public/` y se referencian por ruta relativa (`logo.jpg`, `hero.jpg`, …), así que conviene desplegarlo en la **raíz** del dominio.

## Estructura

```
index.html              HTML base (fuente Outfit, favicon, título/SEO)
src/
  main.jsx              Entry point + HelmetProvider
  App.jsx               Toda la app: Navbar, Footer, páginas y router
  SEO.jsx               Componente SEO (variante; App.jsx define el suyo inline)
  index.css             Estilos base + Tailwind
  App.css               Estilos auxiliares
public/                 Imágenes del sitio (hero, galería, logos, etc.)
tailwind.config.js      Tema: colores `brand`/`accent`
vite.config.js          Config de Vite
```

Las páginas y componentes (`Navbar`, `Footer`, `Home`, `About`, `Offer`, `Contact`, `FloatingWhatsApp`) están **todos dentro de `src/App.jsx`**.

## Personalización

- **Colores de marca:** `tailwind.config.js` → `theme.extend.colors.brand` (`light`/`DEFAULT`/`dark`) y `accent`.
- **Tipografía:** la fuente **Outfit** se carga en `index.html`. (Ojo: `tailwind.config.js` declara `fontFamily.sans: ['Inter', ...]`, pero Inter no se carga; ver notas.)
- **Imágenes:** reemplaza los archivos en `public/`.
- **Contacto / WhatsApp / mapa:** edítalos en `src/App.jsx` (busca `wa.me`, `tel:` y el `iframe` de Google Maps).

## Notas

- Casi todo el sitio está en **un solo archivo** (`src/App.jsx`, ~700 líneas). Funciona, pero para crecer conviene separar componentes y páginas.
- El componente `SEO` está **duplicado**: existe `src/SEO.jsx` y además una versión inline dentro de `App.jsx` (esta última es la que se usa). Conviene dejar una sola.
- La fuente declarada en Tailwind (`Inter`) no está cargada; el sitio realmente usa **Outfit**. Alinear uno de los dos.
- El favicon y el logo se cargan desde `https://inva.edu.mx/logo.jpg` (dominio de producción).

## Licencia

Proyecto privado (`"private": true`).
