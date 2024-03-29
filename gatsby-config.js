const path = require('path')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Jason Jun`,
    author: `Jason Jun`,
    description: `I’m Jason – a front-end developer with UI design background. Currently based in Melbourne, Australia.`,
    siteUrl: `https://jasonjun.net/`,
    menuLinks: [
      {
        name: `Writing`,
        slug: `blog`,
      },
      {
        name: `Reading`,
        slug: `reading`,
      },
      {
        name: `Picks`,
        slug: `picks`,
      },
      {
        name: `Works`,
        slug: `works`,
      },
      {
        name: `About`,
        slug: `about`,
      },
    ],
    social: {
      twitter: `@jsonjun`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        src: path.join(__dirname, 'src'),
        components: path.join(__dirname, 'src/components'),
        styles: path.join(__dirname, 'src/styles'),
        content: path.join(__dirname, 'content'),
        static: path.join(__dirname, 'static'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        // a workaround to solve mdx-remark plugin compat issue
        // https://github.com/gatsbyjs/gatsby/issues/15486
        plugins: [`gatsby-remark-images`, `gatsby-remark-component`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1400,
              linkImagesToOriginal: false,
              showCaptions: true,
              markdownCaptions: false,
              quality: 100,
            },
          },
          {
            resolve: `gatsby-remark-video`,
            options: {
              width: 'auto',
              height: 'auto',
              preload: 'auto',
              autoplay: true,
              playsinline: true,
              controls: true,
              loop: true,
            },
          },
          {
            resolve: `gatsby-remark-embed-video`,
            options: {
              width: 1000,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              related: true,
              noIframeBorder: true,
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: (videoId) =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-smartypants`,
          },
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  data: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.body }],
                })
              })
            },

            /* if you want to filter for only published posts, you can do
             * something like this:
             * filter: { frontmatter: { published: { ne: false } } }
             * just make sure to add a published frontmatter field to all posts,
             * otherwise gatsby will complain
             **/
            query: `
            {
              allMdx(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
                filter: {fields: {slug: {ne: null}}}
              ) {
                edges {
                  node {
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                    body
                  }
                }
              }
            }
            `,
            output: '/rss.xml',
            title: 'Jason Jun RSS feed',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jason Jun`,
        short_name: `Jason Jun`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#24262e`,
        display: `minimal-ui`,
        icon: `static/favicon/favicon-96x96.png`,
      },
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: [
            'Inter:400,400i,500,600,700:&display=fallback',
            'Source Code Pro:500',
            'Noto Serif KR:500,900:korean&display=fallback',
          ],
        },
      },
    },
    {
      resolve: `gatsby-source-notion-api`,
      options: {
        token: process.env.NOTION_TOKEN,
        databaseId: `14e00360171844a09f77d846e62ec439`,
        propsToFrontmatter: true,
        lowerTitleLevel: true,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-force-trailing-slashes`,
    `gatsby-plugin-react-svg`,
    'gatsby-plugin-extract-image-colors',
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.STRAPI_API_URL,
        accessToken: process.env.STRAPI_TOKEN,
        collectionTypes: ['book'],
      },
    },
  ],
}
