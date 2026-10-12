import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://inva.edu.mx';

const SEO = ({ title, description, path = '/' }) => {
  const fullTitle = `${title} | Instituto Nuevo Vallarta`;
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph (Facebook / WhatsApp) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_URL}/hero.jpg`} />
      <meta property="og:locale" content="es_MX" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}/hero.jpg`} />
    </Helmet>
  );
};

export default SEO;
