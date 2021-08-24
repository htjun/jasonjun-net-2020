import React from 'react'
import { Link, graphql } from 'gatsby'
import { animated } from 'react-spring'
import { introTransition, pageTitleIn, fadeIn } from 'components/animation'
import Img from 'gatsby-image'
import Layout from 'components/Layout'
import SEO from 'components/seo'
import PostListItem from 'components/PostListItem'
import ReadingListItem from 'components/ReadingListItem'
import PicksListItem from 'components/PicksListItem'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'
import drawing from 'static/image/line-illustration.png'

const HeroOuter = styled(animated.section)`
  background-color: hsl(228, 12%, 99%);
  border-bottom: 1px solid ${style.color.navy94};
`

const HeroInner = styled.div`
  ${style.MaxWidthStyle}
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 24px;

  @media ${style.deviceSize.mobile} {
    flex-direction: column;
  }

  p {
    font-family: ${style.fontSet.serif};
    letter-spacing: ${style.textLetterSpacing.tight};
    color: ${style.color.navy56};
    max-width: 500px;
    margin-right: 24px;
    margin-bottom: 72px;

    @media ${style.deviceSize.phablet} {
      margin-bottom: 48px;
    }

    @media ${style.deviceSize.mobile} {
      margin-bottom: 24px;
    }

    a {
      border-bottom: 1px solid ${style.color.navy80};

      &:hover {
        ${style.TransitionStyle}
        color: ${style.color.navy32};
        border-color: ${style.color.navy64};
      }
    }
  }
`

const ImageBox = styled(animated.div)`
  display: flex;
  align-items: flex-end;
  width: 250px;
  min-width: 200px;
  overflow: hidden;
  margin-right: 72px;

  @media ${style.deviceSize.tablet} {
    margin-right: 16px;
  }

  @media ${style.deviceSize.phablet} {
    min-width: 100px;
  }

  @media ${style.deviceSize.mobile} {
    max-width: 140px;
  }

  img {
    width: 100%;
    opacity: 0.6;
  }
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

  ${props =>
    props.marginBottom &&
    css`
      margin-bottom: 72px;
    `}
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
      <HeroOuter>
        <HeroInner>
          <animated.p style={pageTitleIn({ delay: 0 })}>
            I’m Jason – a software developer with product design background, currently based in Melbourne, Australia.
          </animated.p>
          <ImageBox style={fadeIn({ delay: 600 })}>
            <img src={drawing} alt="line drawing of a man listening to music" />
          </ImageBox>
        </HeroInner>
      </HeroOuter>
      <IndexHeader style={introTransition({ delay: 500 })}>
        <h2>
          <Link to="/blog/">Writing</Link>
        </h2>
      </IndexHeader>
      <SectionList style={introTransition({ delay: 600 })}>
        {posts.map(({ node }, index) => {
          const title = node.frontmatter.title || node.fields.slug
          return <PostListItem node={node} index={index} title={title} />
        })}
      </SectionList>
      <IndexHeader style={introTransition({ delay: 700 })}>
        <h2>
          <Link to="/reading/">Reading</Link>
        </h2>
      </IndexHeader>
      <SectionList style={introTransition({ delay: 800 })}>
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
      <IndexHeader style={introTransition({ delay: 500 })}>
        <h2>
          <Link to="/picks/">Picks</Link>
        </h2>
      </IndexHeader>
      <SectionList style={introTransition({ delay: 600 })} marginBottom>
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
