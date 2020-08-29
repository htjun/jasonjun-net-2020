import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import defaultOpenGraphImage from 'static/image/opengraph-default.png'

function SEO({ description, lang, meta, keywords, title, image }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description

        const ogImageUrl =
          data.site.siteMetadata.siteUrl + (image || defaultOpenGraphImage)

        const siteTitle =
          title === 'Home'
            ? data.site.siteMetadata.title
            : `${title} - ${data.site.siteMetadata.title}`

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={siteTitle}
            meta={[
              {
                name: `viewport`,
                content: `width=device-width, initial-scale=1`,
              },
              {
                name: `description`,
                content: metaDescription,
              },
              {
                name: `author`,
                content: 'Jason Jun',
              },
              {
                property: `og:title`,
                content: siteTitle,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                property: `og:image`,
                content: ogImageUrl,
              },
              {
                name: `twitter:card`,
                content: `summary_large_image`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.social.twitter,
              },
              {
                name: `twitter:site`,
                content: data.site.siteMetadata.social.twitter,
              },
              {
                name: `twitter:title`,
                content: siteTitle,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
              {
                name: `twitter:image`,
                content: ogImageUrl,
              },
              {
                name: `image`,
                content: ogImageUrl,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
        social {
          twitter
        }
      }
    }
  }
`
