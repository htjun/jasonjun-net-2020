const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const PostTemplate = path.resolve(`./src/templates/post-template.js`)
const BlogTemplate = path.resolve(`./src/templates/blog-template.js`)
const ReadingTemplate = path.resolve(`./src/templates/reading-template.js`)
const BookTemplate = path.resolve(`./src/templates/book-template.js`)
const PicksTemplate = path.resolve(`./src/templates/picks-template.js`)
const WorksTemplate = path.resolve(`./src/templates/works-template.js`)
const WorkTemplate = path.resolve(`./src/templates/work-template.js`)

/* Blog posts */
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(
    `
      {
        blog: allMdx(
          filter: {
            frontmatter: { published: { eq: true }, type: { ne: "work" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
              }
              body
            }
          }
        }

        reading: allAirtable(
          filter: {
            table: { eq: "Source" }
            data: { Type: { eq: "Book" }, Live: { eq: true } }
          }
          sort: { fields: data___Row, order: DESC }
        ) {
          edges {
            node {
              data {
                Slug
              }
            }
          }
          totalCount
        }

        picks: allAirtable(
          filter: { table: { eq: "Picks" }, data: { Published: { eq: true } } }
        ) {
          totalCount
        }

        works: allMdx(
          filter: {
            frontmatter: { published: { eq: true }, type: { eq: "work" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              frontmatter {
                title
                no_content
              }
              fields {
                slug
              }
            }
          }
          totalCount
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    /* Create blog pages */
    const posts = result.data.blog.edges
    const postsPerPage = 30
    const totalBlogPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: totalBlogPages }).forEach((_, index) => {
      const currentBlogPage = index + 1
      const isFirstBlogPage = index === 0
      const isLastBlogPage = currentBlogPage === totalBlogPages

      createPage({
        path: isFirstBlogPage ? `/blog/` : `/blog/${currentBlogPage}`,
        component: BlogTemplate,
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          currentPage: currentBlogPage,
          isFirstPage: isFirstBlogPage,
          isLastPage: isLastBlogPage,
          totalPages: totalBlogPages,
        },
      })
    })

    /* Create individual post pages */
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: PostTemplate,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    /* Create reading pages */
    const readingsPerPage = 50
    const totalReadingPages = Math.ceil(
      result.data.reading.totalCount / readingsPerPage
    )

    Array.from({ length: totalReadingPages }).forEach((_, index) => {
      const currentReadingPage = index + 1
      const isFirstReadingPage = index === 0
      const isLastReadingPage = currentReadingPage === totalReadingPages

      createPage({
        path: isFirstReadingPage
          ? `/reading/`
          : `/reading/${currentReadingPage}`,
        component: ReadingTemplate,
        context: {
          limit: readingsPerPage,
          skip: index * readingsPerPage,
          currentPage: currentReadingPage,
          isFirstPage: isFirstReadingPage,
          isLastPage: isLastReadingPage,
          totalPages: totalReadingPages,
        },
      })
    })

    /* Create individual book pages */
    const books = result.data.reading.edges

    books.forEach((book, index) => {
      const previousBook =
        index === books.length - 1 ? null : books[index + 1].node
      const nextBook = index === 0 ? null : books[index - 1].node

      createPage({
        path: `/reading/${book.node.data.Slug}`,
        component: BookTemplate,
        context: {
          slug: `${book.node.data.Slug}`,
          previous: previousBook,
          next: nextBook,
        },
      })
    })

    /* Create picks pages */
    const picksPerPage = 12
    const totalPicksPages = Math.ceil(
      result.data.picks.totalCount / picksPerPage
    )

    Array.from({ length: totalPicksPages }).forEach((_, index) => {
      const currentPicksPage = index + 1
      const isFirstPicksPage = index === 0
      const isLastPicksPage = currentPicksPage === totalPicksPages

      createPage({
        path: isFirstPicksPage ? `/picks/` : `/picks/${currentPicksPage}`,
        component: PicksTemplate,
        context: {
          limit: picksPerPage,
          skip: index * picksPerPage,
          currentPage: currentPicksPage,
          isFirstPage: isFirstPicksPage,
          isLastPage: isLastPicksPage,
          totalPages: totalPicksPages,
        },
      })
    })

    /* Create works pages */
    const works = result.data.works.edges
    const worksPerPage = 24
    const totalWorksPages = Math.ceil(
      result.data.works.totalCount / worksPerPage
    )

    Array.from({ length: totalWorksPages }).forEach((_, index) => {
      const currentWorksPage = index + 1
      const isFirstWorksPage = index === 0
      const isLastWorksPage = currentWorksPage === totalWorksPages

      createPage({
        path: isFirstWorksPage ? `/works/` : `/works/${currentWorksPage}`,
        component: WorksTemplate,
        context: {
          limit: worksPerPage,
          skip: index * worksPerPage,
          currentPage: currentWorksPage,
          isFirstPage: isFirstWorksPage,
          isLastPage: isLastWorksPage,
          totalPages: totalWorksPages,
        },
      })
    })

    /* Create individual work pages */
    works.forEach((work, index) => {
      const previousWork =
        index === works.length - 1 ? null : works[index + 1].node
      const nextWork = index === 0 ? null : works[index - 1].node
      const noContent = work.node.frontmatter.no_content

      if (!noContent) {
        createPage({
          path: work.node.fields.slug,
          component: WorkTemplate,
          context: {
            slug: work.node.fields.slug,
            previous: previousWork,
            next: nextWork,
          },
        })
      }
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type.toLowerCase() === 'mdx' && node.fileAbsolutePath) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}
