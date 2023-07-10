import { Helmet } from "react-helmet-async"

const SEO = ({
  title,
  description,
  image_url,
  twitter_card_type = "summary_large_image",
}) => {
  return (
    <Helmet>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Quirkability"></meta>
      <meta property="og:image" content={image_url}></meta>
      <meta name="twitter:card" content={twitter_card_type}></meta>
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="twitter:site_name" content="Quirkability"></meta>
      <meta property="twitter:image" content={image_url}></meta>
    </Helmet>
  )
}

export default SEO
