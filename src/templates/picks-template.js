import React from 'react'
import { Link, graphql } from 'gatsby'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import Layout from 'components/Layout'
import PageMeta from 'components/Pagemeta'
import SEO from 'components/seo'
import Pagination from 'components/Pagination'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'
import IconArrowUpRight from 'static/image/arrow-up-right.svg'

const PicksList = styled.section`
  ${style.MaxWidthStyle}
  margin-bottom: 48px;
`

const PicksListItem = styled(animated.div)`
  ${style.ListItemStyle}

  h2 {
    min-width: 200px;
    a {
      svg {
        fill: ${style.color.navy64};
        width: 10px;
        height: 10px;
        margin-left: 6px;
        opacity: 0;
        ${style.TransitionStyle}
      }

      &:hover {
        svg {
          opacity: 1;
        }
      }
    }
  }

  .category {
    min-width: 120px;

    @media ${style.deviceSize.phablet} {
      display: none;
    }
  }

  .note {
    flex-grow: 1;
    max-width: 600px;
    color: ${style.color.navy24};

    @media ${style.deviceSize.phablet} {
      margin-top: 4px;
    }
  }
`

const PicksIndex = props => {
  const { data, pageContext } = props
  const picks = data.allAirtable.edges
  const picksCount = data.allAirtable.totalCount

  return (
    <Layout
      location={props.location}
      pageTitle="Picks"
      pageDesc="A list of personal recommendations among contents, products, tools, or services. Mostly digital, but sometimes non-digital stuff, too."
    >
      <SEO title="Picks" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <PageMeta pageTitle="Picks" desc={`${picksCount} recommendations`} />
      <PicksList>
        {picks.map(({ node }, index) => {
          return (
            <PicksListItem
              key={node.id}
              style={introTransition({ delay: 20 * index })}
            >
              <h2>
                <a href={node.data.Link} target="_blank">
                  {node.data.Title}
                  <IconArrowUpRight className="icon-arrow-up-right" />
                </a>
              </h2>
              <div class="additional-cols">
                <div class="category">{node.data.Category[0].data.Type}</div>
                <div class="note">{node.data.Note}</div>
              </div>
            </PicksListItem>
          )
        })}
      </PicksList>
      <Pagination context={pageContext} path="picks" />
    </Layout>
  )
}

export default PicksIndex

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allAirtable(
      limit: $limit
      skip: $skip
      filter: { table: { eq: "Picks" }, data: { Published: { eq: true } } }
      sort: { order: DESC, fields: data___Created_time }
    ) {
      edges {
        node {
          id
          data {
            Title
            Note
            Link
            Favourite
            Category {
              data {
                Type
              }
            }
            Created_time(fromNow: true)
          }
        }
      }
      totalCount
    }
  }
`
