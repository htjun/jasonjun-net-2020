import React from 'react'
import { Link, graphql } from 'gatsby'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import SEO from 'components/seo'
import Layout from 'components/Layout'
import PageMeta from 'components/Pagemeta'
import PostListItem from 'components/PostListItem'
import Pagination from 'components/Pagination'
import styled from 'styled-components'
import * as style from 'styles/style'

const PostList = styled.section`
  ${style.MaxWidthStyle}
  margin-bottom: 48px;
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
              node={node}
              index={index}
              title={title}
              key={node.fields.slug}
            />
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
            lang
          }
          timeToRead
        }
      }
      totalCount
    }
  }
`
