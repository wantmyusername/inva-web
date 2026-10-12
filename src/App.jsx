import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Phone,
  MapPin,
  BookOpen,
  Shield,
  Clock,
  GraduationCap,
  ArrowRight,
  Utensils,
  Smile,
  Palette,
} from 'lucide-react';
import SEO from './SEO';

// --- RECURSOS ---
const IMAGES = {
  logo: 'logo.jpg',
  hero: 'hero.jpg',
  offer: 'ofrecemos.jpg',
  primaria: 'pre_escolar_primaria.jpg',
  zyro: 'zyro.webp',
  amco: ['amco_1.jpg', 'amco_2.jpg', 'amco_3.jpg'],
  gallery: ['gallery_1.jpg', 'gallery_2.jpg', 'gallery_3.jpg', 'gallery_4.jpg'],
  conocenos: ['conocenos_1.jpg', 'conocenos_2.jpg', 'conocenos_3.jpg'],
};

const NAV_LINKS = [
  { name: 'Inicio', path: '/' },
  { name: 'Conócenos', path: '/conocenos' },
  { name: 'Oferta Educativa', path: '/oferta' },
  { name: 'Contáctanos', path: '/contacto' },
];

const WHATSAPP = 'https://wa.me/523222440506';
const PHONE_TEL = 'tel:3222440506';
const PHONE_LABEL = '322 244 0506';
const ADDRESS = 'Valle de los Álamos 354, Valle Dorado, 63735 Mezcales, Nayarit.';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Instituto+Nuevo+Vallarta';

// --- ICONOS DE MARCA (rellenos y reconocibles) ---
const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12.02C22 6.49 17.52 2 12 2S2 6.49 2 12.02c0 5 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34v6.99C18.34 21.15 22 17.02 22 12.02Z" />
  </svg>
);

const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Logo = ({ className = 'h-11 w-11' }) => (
  <img
    src={IMAGES.logo}
    alt="Instituto Nuevo Vallarta"
    className={`${className} rounded-full bg-white object-cover ring-1 ring-black/5`}
  />
);

// --- LAYOUT ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        transparent
          ? 'bg-gradient-to-b from-brand-ink/80 to-transparent py-5'
          : 'border-b border-slate-200 bg-white/95 py-3 backdrop-blur'
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <Logo />
          <span
            className={`text-lg font-bold tracking-tight transition-colors md:text-xl ${
              transparent ? 'text-white' : 'text-slate-900'
            }`}
          >
            Instituto Nuevo Vallarta
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            const isContact = link.path === '/contacto';

            if (isContact) {
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`ml-2 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    transparent
                      ? 'bg-white text-brand hover:bg-slate-100'
                      : 'bg-brand text-white hover:bg-brand-dark'
                  }`}
                >
                  {link.name}
                </Link>
              );
            }

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  transparent
                    ? isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                    : isActive
                      ? 'bg-brand-subtle text-brand-dark'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          className={transparent ? 'text-white md:hidden' : 'text-slate-800 md:hidden'}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isOpen && (
        <div className="animate-fade-in fixed inset-0 z-40 flex flex-col items-center gap-6 bg-white/95 px-6 pb-12 pt-28 backdrop-blur-xl md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`w-full max-w-xs rounded-full py-3 text-center text-lg font-semibold transition-colors ${
                link.path === '/contacto'
                  ? 'bg-brand text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsOpen(false)}
            className="mt-4 text-sm font-semibold text-slate-400"
          >
            WhatsApp {PHONE_LABEL}
          </a>
        </div>
      )}
    </header>
  );
};

const FloatingWhatsApp = () => (
  <a
    href={WHATSAPP}
    target="_blank"
    rel="noreferrer"
    aria-label="Escríbenos por WhatsApp"
    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/20 transition-transform duration-200 hover:scale-105"
  >
    <WhatsAppIcon size={26} />
  </a>
);

const SocialLinks = ({ className = '' }) => (
  <div className={`flex gap-3 ${className}`}>
    <a
      href="https://www.facebook.com/"
      target="_blank"
      rel="noreferrer"
      aria-label="Facebook"
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand"
    >
      <FacebookIcon size={20} />
    </a>
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#25D366]"
    >
      <WhatsAppIcon size={20} />
    </a>
  </div>
);

const Footer = () => (
  <footer className="bg-brand-ink text-slate-300">
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Logo className="h-14 w-14" />
            <div>
              <h2 className="text-xl font-bold text-white">Instituto Nuevo Vallarta</h2>
              <p className="text-sm text-slate-400">Educación pluricultural en Bahía de Banderas.</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-400">
            Institución comprometida con la excelencia académica y el desarrollo humano. Un campus seguro
            donde cada niño aprende y crece.
          </p>
          <SocialLinks className="mt-6" />
        </div>

        <div className="md:col-span-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Navegación</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-slate-400 transition-colors hover:text-white">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Visítanos</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 shrink-0 text-brand-light" size={18} />
              <span className="text-slate-400">
                Valle de los Álamos 354, Valle Dorado,
                <br />
                63735 Mezcales, Nayarit.
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="shrink-0 text-brand-light" size={18} />
              <a href={PHONE_TEL} className="text-slate-400 transition-colors hover:text-white">
                {PHONE_LABEL}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="shrink-0 text-brand-light">
                <WhatsAppIcon size={18} />
              </span>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="text-slate-400 transition-colors hover:text-white">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-slate-500 md:flex-row">
        <p>&copy; {new Date().getFullYear()} Instituto Nuevo Vallarta. Todos los derechos reservados.</p>
        <p>
          Workspace proporcionado por{' '}
          <a href="https://www.cloudgix.mx" target="_blank" rel="noreferrer" className="font-medium text-slate-300 hover:text-white">
            CloudGIX
          </a>
        </p>
      </div>
    </div>
  </footer>
);

// --- SECCIONES REUTILIZABLES ---
const SectionHeading = ({ eyebrow, title, description, align = 'center' }) => {
  const centered = align === 'center';
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-lg text-slate-500">{description}</p>}
    </div>
  );
};

const FeatureItem = ({ icon, title, description }) => {
  const Icon = icon;
  return (
    <div className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-subtle text-brand">
        <Icon size={22} />
      </span>
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
};

// --- PÁGINAS ---
const Home = () => (
  <div className="animate-fade-in bg-white">
    <SEO
      path="/"
      title="Primaria bilingüe con horario extendido"
      description="Educación bilingüe (metodología AMCO), estancia vespertina, comedor y servicio los sábados en Valle Dorado, Bahía de Banderas."
    />

    {/* HERO */}
    <section className="relative flex min-h-[92vh] items-center">
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Comunidad escolar del Instituto Nuevo Vallarta"
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 25%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/70 to-brand-ink/30" />
      </div>

      <div className="relative mx-auto w-full max-w-content px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Inscripciones abiertas · Ciclo 2026
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Educación que <span className="text-accent">prepara para la vida</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200">
            En el Instituto Nuevo Vallarta combinamos excelencia académica y formación humanista, con un
            horario pensado para las familias de hoy.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/contacto" className="btn-accent">
              Inscríbelo hoy
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/conocenos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Conocer el plantel
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* NOVEDADES */}
    <section className="relative z-10 mx-auto -mt-16 max-w-content px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-2">
        {[
          {
            img: IMAGES.primaria,
            badge: '¡Nuevo ciclo!',
            badgeClass: 'bg-brand-subtle text-brand-dark',
            title: 'Inscripciones abiertas',
            text: 'Asegura el lugar de tu hijo hoy mismo. Cupo limitado por grupo.',
            cta: { label: 'Solicitar informes', to: '/contacto' },
          },
          {
            img: IMAGES.offer,
            badge: 'Ludoteca vespertina',
            badgeClass: 'bg-accent/20 text-accent-dark',
            title: 'Nuestra oferta educativa',
            text: 'Conoce los niveles, talleres y programas disponibles.',
            cta: { label: 'Ver detalles', to: '/oferta' },
          },
        ].map((card) => (
          <article
            key={card.title}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="aspect-[4/5] w-full bg-sand-50 p-5 sm:p-8">
              <img src={card.img} alt={card.title} className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-1 flex-col border-t border-slate-100 p-6 sm:p-7">
              <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${card.badgeClass}`}>
                {card.badge}
              </span>
              <h3 className="mt-4 text-xl font-bold text-slate-900">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{card.text}</p>
              <Link
                to={card.cta.to}
                className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark"
              >
                {card.cta.label}
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>

    {/* POR QUÉ ELEGIRNOS */}
    <section className="mx-auto max-w-content px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            align="left"
            eyebrow="Por qué elegirnos"
            title="Lo que tu hijo realmente necesita"
          />
          <div className="mt-10 space-y-8">
            <FeatureItem icon={BookOpen} title="Metodología AMCO" description="Inglés natural todos los días y pensamiento crítico." />
            <FeatureItem icon={Clock} title="Horario extendido" description="Estancia vespertina y servicio los sábados." />
            <FeatureItem icon={Shield} title="Entorno seguro" description="Instalaciones y protocolos pensados para cuidarlos." />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-7">
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex flex-1 flex-col justify-end rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <GraduationCap className="mb-4 text-brand" size={34} />
              <h3 className="text-lg font-bold text-slate-900">Primaria</h3>
              <p className="mt-1 text-sm text-slate-500">Grupos reducidos y acompañamiento cercano.</p>
            </div>
            <img
              src={IMAGES.amco[0]}
              alt="Alumna abanderada del Instituto Nuevo Vallarta"
              className="h-56 w-full rounded-2xl object-cover shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-4 sm:gap-5">
            <img
              src={IMAGES.amco[1]}
              alt="Docente acompañando a un alumno en un proyecto"
              className="h-56 w-full rounded-2xl object-cover shadow-sm"
            />
            <div className="flex flex-1 flex-col justify-end rounded-2xl bg-brand p-6 text-white shadow-sm">
              <Utensils className="mb-4 text-white/80" size={34} />
              <h3 className="text-lg font-bold text-white">Estancia vespertina</h3>
              <p className="mt-1 text-sm text-brand-subtle">Comida, talleres y apoyo en tareas.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ALIADOS */}
    <section className="border-y border-sand-200 bg-sand-50">
      <div className="mx-auto flex max-w-content flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <span className="eyebrow">Certificaciones y alianzas</span>
        <img
          src={IMAGES.zyro}
          alt="Google Workspace for Education"
          className="mt-8 h-40 w-full max-w-2xl object-contain mix-blend-multiply md:h-52"
        />
        <p className="mt-6 max-w-md text-sm text-slate-500">
          Integramos herramientas digitales para potenciar el aprendizaje dentro del aula.
        </p>
      </div>
    </section>

    {/* TESTIMONIOS */}
    <section className="mx-auto max-w-content px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Familias INVA" title="Lo que dicen las familias" />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {[
          { txt: 'Un lugar que nos entiende y entiende a nuestro hijo.', author: 'Familia Pérez' },
          { txt: 'La seguridad y el trato humano nos dieron mucha paz. Se sienten como en casa.', author: 'Laura G.' },
          { txt: 'El horario extendido nos cambió la vida, y a mi hijo le encanta la escuela.', author: 'Ricardo M.' },
        ].map((t) => (
          <figure key={t.author} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <blockquote className="text-slate-600">“{t.txt}”</blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-brand">— {t.author}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  </div>
);

const About = () => (
  <div className="animate-fade-in bg-white pt-32 pb-24">
    <SEO
      path="/conocenos"
      title="Conócenos · Educación humanista y segura"
      description="Formamos líderes felices y seguros. Conoce nuestra filosofía pluricultural, instalaciones y equipo docente en Bahía de Banderas."
    />

    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Nuestra esencia</span>
        <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">
          Formando personas felices y seguras
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          En el Instituto Nuevo Vallarta creemos que la educación va más allá de los libros: se trata de
          crear un entorno donde tu hijo quiera estar.
        </p>
      </div>

      <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <img
          src={IMAGES.conocenos[0]}
          alt="Alumno aprendiendo a plantar en el Instituto Nuevo Vallarta"
          className="h-[420px] w-full rounded-2xl object-cover shadow-sm lg:h-[520px]"
        />
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Nuestro propósito</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Ofrecer un ambiente pluricultural, innovador y seguro, donde cada niño pueda aprender,
            descubrir y desarrollarse al máximo de acuerdo con su edad y etapa.
          </p>
          <div className="mt-8 space-y-6">
            <FeatureItem icon={Palette} title="Innovación educativa" description="Metodología AMCO y tecnología en el aula." />
            <FeatureItem icon={Smile} title="Calidez humana" description="Un trato personal y cercano con cada familia." />
            <FeatureItem icon={Shield} title="Seguridad total" description="Instalaciones y protocolos que protegen a los niños." />
          </div>
        </div>
      </div>

      <div className="mt-24 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Un espacio para crecer</h2>
          <p className="mt-2 text-slate-500">Instalaciones y actividades pensadas para el desarrollo integral.</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { img: IMAGES.gallery[0], caption: 'Huerto y naturaleza' },
            { img: IMAGES.conocenos[1], caption: 'Ciencia en el aula' },
            { img: IMAGES.amco[2], caption: 'Aprendizaje en grupo' },
            { img: IMAGES.gallery[2], caption: 'Trabajo en equipo' },
          ].map((item) => (
            <figure key={item.caption} className="group overflow-hidden rounded-2xl shadow-sm">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.caption}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-slate-600 italic">
          “En el INVA, aprender, convivir y crecer se convierte en una experiencia divertida.”
        </p>
      </div>
    </div>
  </div>
);

const Offer = () => (
  <div className="animate-fade-in bg-slate-50 pt-32 pb-24">
    <SEO
      path="/oferta"
      title="Oferta educativa · Primaria y estancia vespertina"
      description="Educación primaria con inglés intensivo, estancia vespertina, comedor y horarios flexibles para padres trabajadores."
    />

    <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Oferta educativa</span>
        <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">Nuestra oferta</h1>
        <p className="mt-6 text-lg text-slate-500">
          Programas diseñados para despertar la curiosidad y potenciar el talento de cada alumno.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {['Horario extendido', 'Sábados disponibles', 'Inglés intensivo', 'Comedor saludable'].map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="aspect-[16/11] w-full">
            <img
              src={IMAGES.amco[2]}
              alt="Alumnos durante una clase en el Instituto Nuevo Vallarta"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8">
            <span className="eyebrow">Preescolar y primaria</span>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">Educación primaria</h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              Formación bilingüe con valores. Nuestros alumnos desarrollan pensamiento crítico mientras
              disfrutan su infancia en un ambiente seguro y estimulante.
            </p>
          </div>
        </article>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-subtle text-brand">
              <Clock size={28} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Estancia vespertina</h3>
              <p className="mt-1 text-sm text-slate-500">Espacios seguros para tareas, talleres y recreación.</p>
            </div>
          </div>

          <article className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="aspect-[3/2] w-full bg-brand-subtle p-4">
              <img src={IMAGES.primaria} alt="Inscripciones abiertas" className="h-full w-full object-contain" />
            </div>
            <div className="border-t border-slate-100 p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-slate-900">Inscripciones abiertas</h3>
              <p className="mt-3 text-slate-600">
                Aprovecha nuestros beneficios por inscripción anticipada. Cupo limitado por grupo.
              </p>
              <Link to="/contacto" className="btn-primary mt-6 w-full sm:w-auto">
                Solicitar informes
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="animate-fade-in bg-white pt-32 pb-24">
    <SEO
      path="/contacto"
      title="Contacto e inscripciones 2026"
      description="Contáctanos hoy: WhatsApp y teléfono disponibles para informes. Estamos en Valle de los Álamos 354, Valle Dorado, Mezcales, Nayarit."
    />

    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="eyebrow">Contacto</span>
        <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">Hablemos</h1>
        <p className="mt-6 text-lg text-slate-500">Estamos listos para recibirte y resolver tus dudas.</p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#25D366]/40 hover:shadow-md"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#128C7E]">
            <WhatsAppIcon size={24} />
          </span>
          <h3 className="mt-5 text-lg font-bold text-slate-900">WhatsApp</h3>
          <p className="mt-1 flex-1 text-sm text-slate-500">
            Escríbenos y te respondemos lo antes posible.
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#128C7E]">
            Abrir chat
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </span>
        </a>

        <a
          href={PHONE_TEL}
          className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand/40 hover:shadow-md"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-subtle text-brand">
            <Phone size={24} />
          </span>
          <h3 className="mt-5 text-lg font-bold text-slate-900">Teléfono</h3>
          <p className="mt-1 flex-1 text-sm text-slate-500">Habla directamente con admisiones.</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
            {PHONE_LABEL}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </span>
        </a>

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-accent/50 hover:shadow-md"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent-dark">
            <MapPin size={24} />
          </span>
          <h3 className="mt-5 text-lg font-bold text-slate-900">Visítanos</h3>
          <p className="mt-1 flex-1 text-sm text-slate-500">{ADDRESS}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark">
            Cómo llegar
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </span>
        </a>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col gap-5 bg-brand-ink p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-light">
              <MapPin size={24} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">Visítanos en el campus</h3>
              <p className="mt-1 text-sm text-slate-300">{ADDRESS}</p>
            </div>
          </div>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="btn-accent shrink-0">
            Cómo llegar
          </a>
        </div>
        <div className="h-80 w-full">
          <iframe
            title="Ubicación del Instituto Nuevo Vallarta"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7677.425073745608!2d-105.26691609999999!3d20.7178704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842146f58db3024f%3A0x3e87b52489fa4a56!2sInstituto%20Nuevo%20Vallarta!5e1!3m2!1ses!2smx!4v1768762103731!5m2!1ses!2smx"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
);

// --- APP ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
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
