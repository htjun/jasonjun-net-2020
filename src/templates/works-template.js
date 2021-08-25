import React from 'react'
import { Link, graphql } from 'gatsby'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import Layout from 'components/Layout'
import PageMeta from 'components/PageMeta'
import SEO from 'components/seo'
import Pagination from 'components/Pagination'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'

const WorksList = styled.section`
  ${style.MaxWidthStyle}
  margin-bottom: 48px;
`

const WorksListItem = styled(animated.div)`
  ${style.ListItemStyle}

  h2 {
    min-width: 200px;
  }

  .tags {
    width: 360px;

    @media ${style.deviceSize.tablet} {
      width: 300px;
    }
  }

  .date {
    text-align: right;
    width: 60px;

    @media ${style.deviceSize.phablet} {
      display: none;
    }
  }

  ${props =>
    props.favourite === true &&
    css`
      &:before {
        display: block;
        content: "★";
        color: ${style.color.blue72};
        position: absolute;
        left: -24px;

        @media ${style.deviceSize.landscape} {
          display: none;
        }
      }
    `}
`

const WorksIndex = props => {
  const { data, pageContext } = props
  const works = data.allMdx.edges
  const worksCount = data.allMdx.totalCount

  return (
    <Layout
      location={props.location}
      pageTitle="Works"
      pageDesc="Selected design and development works by Jason Jun"
    >
      <SEO
        title="Works"
        meta={[
          {
            name: 'robots',
            content: 'noindex',
          },
          {
            name: 'googlebot',
            content: 'noindex',
          },
        ]}
      />
      <PageMeta pageTitle="Works" desc={`${worksCount} selected projects`} />
      <WorksList>
        {works.map(({ node }, index) => {
          const tags = node.frontmatter.responsibilities
          return (
            <WorksListItem
              key={node.fields.slug}
              style={introTransition({ delay: 20 * index })}
              favourite={node.frontmatter.favourite}
            >
              <h2>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              </h2>
              <div className="additional-cols">
                <div className="tags">
                  {tags.map((item, index) => {
                    return (
                      <span key={index}>
                        {item}
                        {tags.length !== index + 1 ? ', ' : null}
                      </span>
                    )
                    return <span key={index}>{item}</span>
                  })}
                </div>
                <div className="date">{node.frontmatter.date}</div>
              </div>
            </WorksListItem>
          )
        })}
      </WorksList>
      <Pagination context={pageContext} path="works" />
    </Layout>
  )
}

export default WorksIndex

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMdx(
      limit: $limit
      skip: $skip
      filter: { frontmatter: { published: { eq: true }, type: { eq: "work" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "YYYY")
            title
            description
            responsibilities
            theme_color
            favourite
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
