import { Helmet } from "react-helmet-async"

const SEO = ({ title, description, og_type, card_type, name }) => {
  return (
    <Helmet>
      <meta name="description" content={description} />
      <meta property="og:type" content={og_type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={card_type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}

export default SEO
