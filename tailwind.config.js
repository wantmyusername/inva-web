/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta alineada al logo del Instituto Nuevo Vallarta (azul + amarillo)
        brand: {
          light: '#5AA9E6',   // azul claro (detalles / texto sobre oscuro)
          DEFAULT: '#1B6FB3', // azul principal del logo
          dark: '#0F4C81',    // azul profundo (hover / acentos)
          ink: '#0B2A45',     // azul noche (secciones oscuras)
          subtle: '#EAF3FB',  // azul muy claro (fondos de tarjetas)
        },
        accent: {
          light: '#FFD166',   // amarillo claro
          DEFAULT: '#F5B301', // amarillo del aro del logo
          dark: '#D99A00',    // amarillo oscuro (hover)
        },
        // Naranja del primer trazo de la "N" del logo
        ember: '#E8791E',
        // Neutros cálidos para fondos (evitan la sensación "fría" del gris/azul)
        sand: {
          50: '#FBF7EF',
          100: '#F4ECDD',
          200: '#E8DAC2',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        card: '1.25rem',
      },
      maxWidth: {
        content: '80rem',
      },
    },
  },
  plugins: [],
}
