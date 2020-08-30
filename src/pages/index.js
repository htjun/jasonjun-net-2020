import React from 'react'
import { Link, graphql } from 'gatsby'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import Layout from 'components/Layout'
import SEO from 'components/seo'
import PostListItem from 'components/PostListItem'
import ReadingListItem from 'components/ReadingListItem'
import PicksListItem from 'components/PicksListItem'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'
import IconArrowUpRight from 'static/image/arrow-up-right.svg'

const HeroSection = styled(animated.section)`
  ${style.MaxWidthStyle}
  min-height: 256px;
`

const IndexHeader = styled(animated.div)`
  ${style.MaxWidthStyle}
  margin-top: 64px;
  margin-bottom: 48px;

  h2 {
    display: inline-block;
    font-size: ${style.fontSize.xl};
    font-weight: ${style.fontWeight.normal};
    letter-spacing: ${style.textLetterSpacing.tight};
    color: ${style.color.navy64};

    a {
      ${style.LinkStyle}

      &:hover {
        color: ${style.color.navy48};
      }
    }
  }
`

const SectionList = styled(animated.section)`
  ${style.MaxWidthStyle}
`

const Index = props => {
  const { data } = props
  const siteTitle = data.siteData.siteMetadata.title
  const posts = data.recentPosts.edges
  const books = data.recentBooks.edges
  const picks = data.recentPicks.edges

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="Home"
        keywords={[`blog`, `gatsby`, `javascript`, 'design', `design system`]}
      />
      <HeroSection />
      <IndexHeader>
        <h2>
          <Link to="/blog/">Writing</Link>
        </h2>
      </IndexHeader>
      <SectionList>
        {posts.map(({ node }, index) => {
          const title = node.frontmatter.title || node.fields.slug
          return <PostListItem node={node} index={index} title={title} />
        })}
      </SectionList>
      <IndexHeader>
        <h2>
          <Link to="/reading/">Reading</Link>
        </h2>
      </IndexHeader>
      <SectionList>
        {books.map(({ node }, index) => {
          const highlights = node.data.Quotes ? node.data.Quotes.length : 'No'

          return (
            <ReadingListItem
              node={node}
              index={index}
              highlights={highlights}
            />
          )
        })}
      </SectionList>
      <IndexHeader>
        <h2>
          <Link to="/picks/">Picks</Link>
        </h2>
      </IndexHeader>
      <SectionList style={introTransition({ delay: 340 })}>
        {picks.map(({ node }, index) => {
          return <PicksListItem node={node} index={index} />
        })}
      </SectionList>
    </Layout>
  )
}

export default Index

export const query = graphql`
  query {
    siteData: site {
      siteMetadata {
        title
      }
    }

    recentPosts: allMdx(
      limit: 5
      filter: { frontmatter: { published: { eq: true }, type: { ne: "work" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            date(formatString: "D MMMM YYYY")
            title
            lang
          }
          timeToRead
        }
      }
    }

    recentBooks: allAirtable(
      limit: 5
      filter: {
        table: { eq: "Source" }
        data: { Type: { eq: "Book" }, Live: { eq: true } }
      }
      sort: { fields: data___Row, order: DESC }
    ) {
      edges {
        node {
          id
          data {
            Title
            Status
            Slug
            Language
            Format
            Author {
              data {
                Name
              }
            }
            Quotes {
              id
            }
          }
        }
      }
    }

    recentPicks: allAirtable(
      filter: { table: { eq: "Picks" }, data: { Published: { eq: true } } }
      limit: 5
      sort: { fields: data___Created_time, order: DESC }
    ) {
      edges {
        node {
          id
          data {
            Title
            Link
            Note
            Category {
              data {
                Type
              }
            }
          }
        }
      }
    }

    recentWorks: allMdx(
      filter: { frontmatter: { published: { eq: true }, type: { eq: "work" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 2
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY")
            description
            responsibilities
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
