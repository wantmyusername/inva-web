import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title} | Instituto Nuevo Vallarta</title>
      <meta name="description" content={description} />
      {/* Datos para Facebook/WhatsApp */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default SEO;
