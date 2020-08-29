import React from 'react'
import { Link, graphql } from 'gatsby'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import SEO from 'components/seo'
import Layout from 'components/Layout'
import PageMeta from 'components/Pagemeta'
import Pagination from 'components/Pagination'
import styled from 'styled-components'
import * as style from 'styles/style'

const PostList = styled.section`
  ${style.MaxWidthStyle}
  margin-bottom: 48px;
`

const PostListItem = styled(animated.div)`
  ${style.ListItemStyle}

  .date {
    width: 160px;

    @media ${style.deviceSize.phablet} {
      width: auto;
      margin-top: 4px;
    }
  }

  .lang {
    width: 60px;

    @media ${style.deviceSize.phablet} {
      display: none;
    }
  }

  .time-to-read {
    text-align: right;
    width: 80px;

    @media ${style.deviceSize.tablet} {
      display: none;
    }
  }
`

const BlogIndex = props => {
  const { data, pageContext } = props
  const { currentPage, isFirstPage, isLastPage, totalPages } = pageContext
  const posts = data.allMdx.edges

  return (
    <Layout
      location={props.location}
      pageTitle="Blog"
      pageDesc="Writings about my works, thoughts, hobbies or anything else. I write articles in either English or Korean, but rarely in both."
    >
      <SEO title="Blog" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <PageMeta
        pageTitle="Writing"
        desc={`${data.allMdx.totalCount} posts in 2 languages`}
      />
      <PostList>
        {posts.map(({ node }, index) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <PostListItem
              key={node.fields.slug}
              lang={node.frontmatter.lang}
              style={introTransition({ delay: 20 * index })}
            >
              <h2>
                <Link to={node.fields.slug}>{title}</Link>
              </h2>
              <div class="additional-cols">
                <div class="date">{node.frontmatter.date}</div>
                <div class="lang">
                  {node.frontmatter.lang === 'EN'
                    ? 'English'
                    : node.frontmatter.lang === 'KR'
                    ? 'Korean'
                    : 'Unknown'}
                </div>
                <div class="time-to-read">{node.timeToRead} min read</div>
              </div>
            </PostListItem>
          )
        })}
      </PostList>
      <Pagination context={pageContext} path="blog" />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMdx(
      skip: $skip
      limit: $limit
      filter: { frontmatter: { published: { eq: true }, type: { ne: "work" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "D MMMM YYYY")
            title
            description
            lang
          }
          timeToRead
        }
      }
      totalCount
    }
  }
`
