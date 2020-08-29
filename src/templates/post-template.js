import React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import Layout from 'components/Layout'
import SEO from 'components/seo'
import ContentFooterNav from 'components/ContentFooterNav'
import styled from 'styled-components'
import * as style from 'styles/style'

const OutwerWrapper = styled(animated.section)`
  background: ${style.color.grey98};
`

const InnerWrapper = styled.section`
  ${style.MaxWidthStyle};
  padding: 0 24px;
  margin: 0 auto;
  overflow: hidden;
`

const ContentBlock = styled.article`
  max-width: ${style.objectSize.contentMaxWidth};
  margin: 0 auto;
  margin-bottom: 96px;

  @media ${style.deviceSize.mobile} {
    margin-bottom: 64px;
  }
`

const ContentBody = styled.div`
  ${style.ContentBodyStyle};
  border-top: 1px solid ${style.color.grey92};
  margin-top: 48px;
  padding-top: 48px;

  @media ${style.deviceSize.phablet} {
    margin-top: 24px;
    padding-top: 24px;
  }
`

const ArticleTitle = styled.h1`
  color: ${style.color.grey8};
  font-size: ${style.fontSize.xl2};
  font-weight: ${style.fontWeight.semibold};
  letter-spacing: ${style.textLetterSpacing.tight};
  line-height: ${style.textLineHeight.tight};
  text-align: center;
  margin-top: 64px;
  margin-bottom: 24px;

  @media ${style.deviceSize.phablet} {
    text-align: left;
    margin-top: 48px;
    margin-bottom: 12px;
  }
`

const ArticleDate = styled.div`
  color: ${style.color.grey56};
  font-size: ${style.fontSize.sm};
  font-weight: ${style.fontWeight.medium};
  text-align: center;

  @media ${style.deviceSize.phablet} {
    text-align: left;
  }
`

const BlogPostTemplate = props => {
  const post = props.data.mdx
  const siteTitle = props.data.site.siteMetadata.title
  const { previous, next } = props.pageContext
  const { ogimage } = post.frontmatter
  const ogImagePath = ogimage && ogimage.childImageSharp.fixed.src

  return (
    <Layout location={props.location} title={siteTitle} postTemplate>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={ogImagePath}
      />
      <OutwerWrapper style={introTransition({ delay: 0 })}>
        <InnerWrapper>
          <ContentBlock>
            <ArticleTitle>{post.frontmatter.title}</ArticleTitle>
            <ArticleDate>{post.frontmatter.date}</ArticleDate>
            <ContentBody>
              <MDXRenderer>{post.body}</MDXRenderer>
            </ContentBody>
          </ContentBlock>
          <ContentFooterNav previous={previous} next={next} />
        </InnerWrapper>
      </OutwerWrapper>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        ogimage {
          childImageSharp {
            fixed(width: 1200) {
              src
            }
          }
        }
      }
      body
    }
  }
`
