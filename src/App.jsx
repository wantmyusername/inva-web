import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Facebook, MessageCircle, BookOpen, Heart, Shield, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';


// --- DATOS Y RECURSOS ---
const IMAGES = {
  logo: "logo.jpg",
  hero: "hero.jpg",
  offer: "ofrecemos.jpg",
  zyro: "zyro.webp",
  amco: [
    "amco_1.jpg",
    "amco_2.jpg",
    "amco_3.jpg"
  ],
  gallery: [
    "gallery_1.jpg",
    "gallery_2.jpg",
    "gallery_3.jpg",
    "gallery_4.jpg"
  ],
  conocenos: [
    "conocenos_1.jpg",
    "conocenos_2.jpg",
    "conocenos_3.jpg"
  ]
};

// --- IMPORTANTE: AGREGA ESTE COMPONENTE AQUÍ ---
const SEO = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title} | Instituto Nuevo Vallarta</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

// --- COMPONENTES UI ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- CORRECCIÓN DE LEGIBILIDAD ---
  // Cuando está arriba (transparent), le metemos un gradiente negro fuerte (from-black/90)
  // para que el texto blanco se lea perfecto sobre cualquier foto.
  const navClasses = isHome && !scrolled
    ? 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-6'
    : 'bg-white/95 backdrop-blur-md shadow-sm py-3';

  // Clases para el Toggle del móvil
  const toggleClasses = isHome && !scrolled ? 'text-white drop-shadow-md' : 'text-gray-800';

  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Conócenos', path: '/conocenos' },
    { name: 'Oferta Educativa', path: '/oferta' },
    { name: 'Contáctanos', path: '/contacto' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navClasses}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src={IMAGES.logo} alt="INVA Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover ring-2 ring-white/50 shadow-md" />
            <span className={`font-bold text-lg md:text-xl tracking-tight transition-colors ${isHome && !scrolled ? 'text-white drop-shadow-lg' : 'text-gray-800'}`}>
              Instituto Nuevo Vallarta
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-2">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              const isContact = link.path === '/contacto';

              let btnClass = "text-sm font-bold uppercase tracking-wide transition-all duration-300 px-5 py-2.5 rounded-full flex items-center justify-center ";

              if (isHome && !scrolled) {
                // --- MODO HOME (FONDO OSCURO DETRÁS DE LAS LETRAS) ---
                if (isContact) {
                   // Contacto: Fondo blanco sólido para máximo contraste
                   btnClass += "bg-white text-brand hover:bg-gray-100 shadow-lg border-2 border-transparent";
                } else {
                   // Links normales: Fondo negro semitransparente para que se lea SIEMPRE
                   // Esto arregla que se pierda con el fondo
                   btnClass += isActive
                     ? "bg-white/20 text-white backdrop-blur-md border border-white/30"
                     : "text-white hover:bg-black/30 hover:backdrop-blur-sm border border-transparent";
                }
              } else {
                // --- MODO SCROLL (FONDO BLANCO) ---
                if (isContact) {
                   btnClass += "bg-brand text-white hover:bg-brand-dark shadow-md hover:shadow-lg hover:-translate-y-0.5";
                } else {
                   btnClass += isActive
                     ? "text-brand bg-brand/5"
                     : "text-gray-600 hover:text-brand hover:bg-gray-100";
                }
              }

              return (
                <Link key={link.path} to={link.path} className={btnClass}>
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={toggleClasses}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 animate-fade-in">
           <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-gray-800"><X size={32}/></button>
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-bold ${link.path === '/contacto' ? 'px-8 py-3 bg-brand text-white rounded-full shadow-xl' : 'text-gray-800 hover:text-brand'}`}
              >
                {link.name}
              </Link>
            ))}
        </div>
      )}
    </nav>
  );
};

const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/523222440506"
    target="_blank"
    rel="noreferrer"
    className="fixed bottom-8 right-8 z-50 group flex items-center justify-center transition-all duration-300 hover:-translate-y-2"
  >
    <div className="bg-[#25D366] rounded-full p-4 shadow-xl shadow-green-500/40">
      {/* SVG REAL DE WHATSAPP */}
      <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </div>
  </a>
);

const Footer = () => (
  <footer className="bg-slate-900 text-white pt-20 pb-10 relative overflow-hidden">
    {/* Decoración de fondo */}
    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-light via-brand to-brand-dark"></div>
    <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand opacity-5 rounded-full blur-3xl pointer-events-none"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

        {/* Brand Column */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <img src={IMAGES.logo} className="w-14 h-14 rounded-full grayscale hover:grayscale-0 transition-all duration-500 bg-white" />
            <div>
              {/* AQUÍ ESTÁ EL CAMBIO: text-white explícito */}
              <h2 className="text-2xl font-bold tracking-tight text-white">Instituto Nuevo Vallarta</h2>
              <p className="text-sm text-gray-400">Formando líderes para el futuro.</p>
            </div>
          </div>
          <p className="text-gray-400 leading-relaxed max-w-sm">
            Una institución comprometida con la excelencia académica y el desarrollo humano. Nuestro campus es un espacio seguro para crecer.
          </p>
          <div className="flex gap-4 pt-4">
             <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand hover:scale-110 transition-all"><Facebook size={20}/></a>
             <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-green-500 hover:scale-110 transition-all"><MessageCircle size={20}/></a>
          </div>
        </div>

        {/* Links Column */}
        <div className="md:col-span-3">
          <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Navegación</h3>
          <ul className="space-y-3">
            {['Inicio', 'Conócenos', 'Oferta Educativa', 'Contacto'].map((item) => (
              <li key={item}>
                <Link to={item === 'Inicio' ? '/' : `/${item.toLowerCase().replace(' ', '').replace('ó','o')}`} className="text-gray-400 hover:text-brand-light transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-light transition-colors"></span>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div className="md:col-span-4">
          <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Visítanos</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-gray-400 group">
              <MapPin className="mt-1 text-brand-light group-hover:text-white transition-colors" size={20} />
              <span className="group-hover:text-white transition-colors">Valle de los Alamos 354, Valle Dorado,<br/>63735 Mezcales, Nay.</span>
            </li>
            <li className="flex items-center gap-3 text-gray-400 group">
              <Phone className="text-brand-light group-hover:text-white transition-colors" size={20} />
              <span className="font-mono text-lg group-hover:text-white transition-colors">322 244 0506</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; 2026 Instituto Nuevo Vallarta.</p>
        <p className="mt-2 md:mt-0 flex items-center gap-1">
          Workspace impulsado por{" "}
          <a
            href="https://www.nubedigital.mx"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
          >
            Nube Digital
          </a>
        </p>
      </div>
    </div>
  </footer>
);

// --- SECCIONES / PÁGINAS ---

const Home = () => {
  return (
    <div className="animate-fade-in bg-white">
      <SEO
        title="Primaria Bilingüe y Horario Extendido"
        description="La mejor educación en Valle Dorado y Mezcales. Instituto Nuevo Vallarta ofrece primaria bilingüe (AMCO), estancia vespertina, comedor y horario extendido incluso sábados."
      />
      {/* --- HERO SECTION (Sin cambios, ya te gustaba) --- */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={IMAGES.hero} alt="Alumnos INVA" className="w-full h-full object-cover scale-105 animate-[pulse_1s_ease-in-out]" style={{ objectPosition: 'center 20%' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-transparent to-transparent opacity-80"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-white text-sm font-semibold tracking-wide mb-6 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              INSCRIPCIONES ABIERTAS 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up delay-100 tracking-tight">
              Educación que <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-white">prepara para la vida</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed animate-fade-in-up delay-200 border-l-4 border-brand-light pl-6">
              En Instituto Nuevo Vallarta combinamos excelencia académica con un enfoque humanista.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <Link to="/contacto" className="px-8 py-4 bg-brand hover:bg-brand-light text-white font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.5)] flex items-center justify-center">Inscríbelo hoy</Link>
              <Link to="/conocenos" className="px-8 py-4 glass-card text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 flex items-center justify-center backdrop-blur-md">Conocer plantel</Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: NOVEDADES (Flyers Limpios + Texto Abajo) --- */}
      <section className="py-20 px-4 max-w-7xl mx-auto -mt-24 relative z-20">
        <div className="grid md:grid-cols-2 gap-10">

           {/* Card Izquierda: Inscripciones */}
           <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300">
              {/* Flyer Completo sin obstrucciones */}
              <div className="w-full bg-gray-100">
                <img src="pre_escolar_primaria.jpg" className="w-full h-full object-contain md:object-cover" alt="Inscripciones" />
              </div>
              {/* Footer de la tarjeta con la info */}
              <div className="p-8 border-t border-gray-100">
                <span className="bg-brand text-white px-3 py-1 text-xs font-bold uppercase rounded-md inline-block mb-3">¡Nuevo Ciclo!</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Inscripciones Abiertas</h3>
                <p className="text-gray-500">Asegura el lugar de tu hijo hoy mismo. Cupo limitado por grupo.</p>
              </div>
           </div>

           {/* Card Derecha: Oferta Educativa */}
           <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300">
              <div className="w-full bg-gray-100">
                <img src="ofrecemos.jpg" className="w-full h-full object-contain md:object-cover" alt="Oferta Educativa" />
              </div>
              <div className="p-8 border-t border-gray-100">
                <span className="bg-accent text-white px-3 py-1 text-xs font-bold uppercase rounded-md inline-block mb-3">Descubre</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Nuestra Oferta</h3>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Conoce los niveles y programas disponibles.</p>
                  <Link to="/oferta" className="text-brand font-bold hover:underline">Ver detalles →</Link>
                </div>
              </div>
           </div>

        </div>
      </section>

    {/* --- SECTION: ALIADOS --- */}
    <section className="bg-white py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-8">
          Certificaciones y Alianzas
        </span>
        <div className="grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer">
           {/* Usamos opacity para que no compita tanto visualmente hasta que pasas el mouse */}
           <img src={IMAGES.zyro} alt="Google for Education" className="h-48 md:h-64 object-contain opacity-80 hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-gray-400 text-sm mt-4 max-w-md text-center">
          Integramos las mejores herramientas digitales para potenciar el aprendizaje de tu hijo.
        </p>
      </div>
    </section>

    {/* --- SECTION: TESTIMONIOS --- */}
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-10">Lo que dicen las familias INVA</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { txt: "Sin duda un lugar que nos entiende y entiende a nuestro hijo.", author: "Familia Pérez" },
            { txt: "La seguridad y el trato humano nos dieron mucha paz. Se sienten como en casa.", author: "Laura G." },
            { txt: "El horario extendido nos salvó la vida. Y a mi hijo le encanta la escuela.", author: "Ricardo M." }
          ].map((t, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-2xl italic text-gray-600 relative">
              <span className="absolute top-4 left-4 text-4xl text-brand/20">"</span>
              <p className="mb-4 relative z-10">{t.txt}</p>
              <p className="font-bold text-brand text-sm not-italic">- {t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* --- INFO & METODOLOGÍA (Resto del home) --- */}
      <section className="py-24 px-4 max-w-7xl mx-auto bg-gray-50 rounded-[3rem] my-10">
        <div className="grid md:grid-cols-12 gap-12">
           <div className="md:col-span-5 flex flex-col justify-center">
              <span className="text-brand font-bold uppercase tracking-wider text-sm mb-2">Por qué elegirnos</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">Lo que tu hijo <br/>realmente necesita.</h2>
              <div className="space-y-6">
                {[
                  { title: "Metodología AMCO", desc: "Inglés natural y pensamiento crítico." },
                  { title: "Horario Extendido", desc: "Hasta los sábados, pensando en ti." },
                  { title: "Seguridad 24/7", desc: "Tu tranquilidad es nuestra prioridad." }
                ].map((item, i) => (
                   <div key={i} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-brand mt-1">
                        <Shield size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                   </div>
                ))}
              </div>
           </div>
           <div className="md:col-span-7 grid grid-cols-2 gap-4 h-full">
              <div className="space-y-4 pt-12">
                 <div className="bg-white rounded-2xl p-6 h-64 flex flex-col justify-end shadow-md">
                    <BookOpen className="text-brand mb-4 w-10 h-10"/>
                    <h3 className="font-bold text-xl">Primaria</h3>
                 </div>
                 <img src={IMAGES.amco[0]} className="w-full h-64 object-cover rounded-2xl shadow-lg" alt="Niños" />
              </div>
              <div className="space-y-4">
                 <img src={IMAGES.amco[1]} className="w-full h-64 object-cover rounded-2xl shadow-lg" alt="Clase" />
                 <div className="bg-brand text-white rounded-2xl p-6 h-64 flex flex-col justify-end shadow-xl">
                    <Clock className="text-white/80 mb-4 w-10 h-10"/>
                    <h3 className="font-bold text-xl">Estancia</h3>
                    <p className="text-brand-light text-sm mt-2">Apoyo en tareas.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};
const About = () => (
  <div className="animate-fade-in min-h-screen bg-white pt-32 pb-20">
      <SEO
        title="Conócenos - Educación Humanista y Segura"
        description="En INVA formamos líderes felices y seguros. Conoce nuestra filosofía humanista, instalaciones de primer nivel y equipo docente certificado en Nuevo Vallarta."
      />

    {/* 1. HEADER (Igual que Oferta y Contacto) */}
    <div className="max-w-7xl mx-auto px-4 mb-20">
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-brand font-bold tracking-widest uppercase text-sm mb-4 block">Nuestra Esencia</span>
        {/* Título Gris Oscuro (No Verde) y Grande */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight leading-tight">
          Formando personas felices y seguras.
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed">
          En Instituto Nuevo Vallarta creemos que la educación va más allá de los libros. Se trata de crear un entorno donde tu hijo quiera estar.
        </p>
      </div>
    </div>

    {/* 2. CONTENIDO PRINCIPAL (Diseño Editorial) */}
    <div className="max-w-7xl mx-auto px-4">

      {/* Bloque Superior: Imagen Grande + Propósito */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">

        {/* Imagen con estilo "Layered" */}
        <div className="relative group">
          <div className="absolute inset-0 bg-brand rounded-[2.5rem] rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
          <img
            src={IMAGES.conocenos[0]}
            alt="Nosotros"
            className="relative rounded-[2.5rem] shadow-2xl w-full h-[500px] object-cover z-10"
          />
          {/* Badge Flotante */}
          <div className="absolute -bottom-6 -right-6 z-20 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
             <p className="text-brand font-bold text-lg">💙 +15 Años</p>
             <p className="text-gray-500 text-sm">De experiencia educativa formando líderes.</p>
          </div>
        </div>

        {/* Texto limpio */}
        <div className="pl-0 md:pl-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestro Propósito</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Ofrecer un ambiente pluricultural, innovador y seguro, donde cada niño pueda aprender, descubrir y desarrollarse al máximo de acuerdo con su edad y etapa.
          </p>

          {/* Lista de valores con iconos */}
          <div className="space-y-6">
            {[
              { title: "Innovación Educativa", desc: "Metodología AMCO y tecnología." },
              { title: "Calidez Humana", desc: "Un trato personal y cercano." },
              { title: "Seguridad Total", desc: "Instalaciones diseñadas para cuidarlos." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="bg-brand/10 p-3 rounded-full text-brand">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. GRID INFERIOR (Estilo Bento / Galería) */}
      <div className="bg-gray-50 rounded-[3rem] p-8 md:p-16">
        <div className="text-center mb-12">
           <h2 className="text-3xl font-bold text-gray-900">Un espacio para crecer</h2>
           <p className="text-gray-500 mt-2">Instalaciones pensadas para el desarrollo integral.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           {/* Card 1 */}
           <div className="relative group overflow-hidden rounded-[2rem] h-80 shadow-lg">
             <img src={IMAGES.conocenos[1]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Instalaciones" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8">
               <h3 className="text-white text-xl font-bold">Áreas Recreativas</h3>
             </div>
           </div>

           {/* Card 2 */}
           <div className="relative group overflow-hidden rounded-[2rem] h-80 shadow-lg">
             <img src={IMAGES.conocenos[2]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Aulas" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8">
               <h3 className="text-white text-xl font-bold">Aulas Interactivas</h3>
             </div>
           </div>
        </div>

        <div className="mt-12 text-center">
           <p className="text-lg text-gray-600 max-w-2xl mx-auto italic">
             "En INVA, tu hijo(a) encontrará un lugar donde aprender, convivir y crecer se convierte en una experiencia divertida."
           </p>
        </div>
      </div>

    </div>
  </div>
);

const Offer = () => (
  <div className="animate-fade-in bg-gray-50 pb-20 pt-32">
    <SEO
        title="Oferta Educativa: Primaria y Estancia Vespertina"
        description="Conoce nuestros programas: Educación Primaria con Inglés intensivo y Estancia Vespertina con apoyo en tareas. Horarios flexibles para padres trabajadores."
      />

    <div className="max-w-7xl mx-auto px-4">
      {/* 1. Header & Tags Superiores */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">Nuestra Oferta</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Programas educativos diseñados para despertar la curiosidad y potenciar el talento.
        </p>

        {/* Tags Destacados (Arriba como pediste) */}
        <div className="flex flex-wrap justify-center gap-4">
           {["Horario Extendido", "Sábados Disponibles", "Inglés Intensivo", "Comedor Saludable"].map((tag, i) => (
             <div key={i} className="bg-white py-3 px-6 rounded-full text-sm font-bold text-brand shadow-sm border border-gray-100 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-accent"></div> {tag}
             </div>
           ))}
        </div>
      </div>

      {/* 2. Grid de Contenido (Sin texto sobre imagen) */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* Card 1: Primaria Flyer */}
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="bg-gray-100 aspect-[4/5] md:aspect-square w-full">
            <img src={IMAGES.offer} alt="Primaria" className="w-full bg-gray-100" />
          </div>
          <div className="p-8">
             <h3 className="text-2xl font-bold text-gray-900 mb-3">Educación Primaria</h3>
             <p className="text-gray-600 leading-relaxed">
               Formación bilingüe con valores. Nuestros alumnos desarrollan pensamiento crítico mientras disfrutan su infancia en un ambiente seguro y estimulante.
             </p>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="flex flex-col gap-8">

            {/* Card 2: Estancia (Compacta y centrada) */}
            <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100 flex items-center gap-6">
               <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-brand flex-shrink-0">
                 <Clock size={32} />
               </div>
               <div>
                 <h3 className="text-xl font-bold text-gray-900">Estancia Vespertina</h3>
                 <p className="text-gray-500 text-sm mt-1">Espacios seguros para tareas y recreación.</p>
               </div>
            </div>

            {/* Card 3: Flyer Promo (Sin hover, limpio) */}
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group flex-grow">
               <div className="bg-gray-100 aspect-square w-full relative">
                 <img src="pre_escolar_primaria.jpg" alt="Promo" className="w-full bg-gray-100" />
               </div>
               <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Inscripciones Abiertas</h3>
                  <p className="text-gray-600">
                    Aprovecha nuestros beneficios por inscripción anticipada.
                  </p>
               </div>
            </div>

        </div>

      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="animate-fade-in min-h-screen bg-white pt-32 pb-20">
    <SEO
        title="Contacto e Inscripciones 2025"
        description="¿Buscas escuela en Bahía de Banderas? Contáctanos hoy. Ubicados en Valle de los Alamos 354, Valle Dorado. WhatsApp y teléfono disponibles para informes."
      />
    <div className="max-w-4xl mx-auto px-4">

      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Hablemos</h1>
        <p className="text-xl text-gray-500">Estamos listos para recibirte.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* WhatsApp */}
        <a href="https://wa.me/523222440506" target="_blank" className="group bg-green-50/50 p-8 rounded-3xl border border-green-100 hover:border-green-300 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
           <div className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
           </div>
           <h3 className="text-2xl font-bold text-gray-800 mb-1">WhatsApp</h3>
           <p className="text-gray-500 text-sm mb-4">Respuesta inmediata.</p>
           <span className="text-green-700 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">Iniciar chat <span className="text-xl">→</span></span>
        </a>

        {/* Llamada */}
        <a href="tel:3222440506" className="group bg-blue-50/50 p-8 rounded-3xl border border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
           <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
             <Phone size={32} />
           </div>
           <h3 className="text-2xl font-bold text-gray-800 mb-1">Llamada</h3>
           <p className="text-gray-500 text-sm mb-4">Habla con admisiones.</p>
           <span className="text-blue-700 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">322 244 0506 <span className="text-xl">→</span></span>
        </a>
      </div>

      {/* Mapa Grande */}
      <div className="mt-12 rounded-[2.5rem] overflow-hidden shadow-2xl">
        {/* Header del mapa con contraste forzado */}
        <div className="bg-slate-900 p-10 text-center relative overflow-hidden">
          <div className="relative z-10">
             <MapPin className="mx-auto mb-4 text-brand-light" size={40} />
             {/* Texto blanco explícito */}
             <h3 className="text-2xl font-bold text-white mb-2">Visítanos en el Campus</h3>
             <p className="text-gray-300 text-lg">Valle de los Alamos 354, Valle Dorado, Mezcales.</p>
          </div>
          {/* Decoración de fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>

        <div className="bg-gray-200 h-80 w-full flex items-center justify-center relative group cursor-pointer">
           <iframe
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7677.425073745608!2d-105.26691609999999!3d20.7178704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768f!4f13.1!3m3!1m2!1s0x842146f58db3024f%3A0x3e87b52489fa4a56!2sInstituto%20Nuevo%20Vallarta!5e1!3m2!1ses!2smx!4v1768762103731!5m2!1ses!2smx"
             width="100%"
             height="100%"
             style={{border:0}}
             allowFullScreen=""
             loading="lazy"
             className="grayscale group-hover:grayscale-0 transition-all duration-500"
           ></iframe>
        </div>
      </div>
    </div>
  </div>
);
// Componente auxiliar para icono
const UserCheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
);

// --- APP PRINCIPAL ---

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/conocenos" element={<About />} />
            <Route path="/oferta" element={<Offer />} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}

export default App;
