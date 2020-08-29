import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import Layout from 'components/Layout'
import SEO from 'components/seo'
import Pagination from 'components/Pagination'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'
import IconArrowUpRight from 'static/image/arrow-up-right.svg'

const PicksList = styled.section`
  .grid {
    ${style.CardContainerStyle};
  }
`

const PicksListItem = styled(animated.div)`
  ${style.CardStyle};
  width: 100%;
  max-width: calc(33.33% - 32px);
  margin: 12px;

  @media ${style.deviceSize.tablet} {
    max-width: calc(50% - 36px);
  }

  @media ${style.deviceSize.phablet} {
    max-width: calc(100% - 24px);
    margin: 0 0 16px 0;
  }

  @media ${style.deviceSize.mobile} {
    max-width: calc(100% - 32px);
  }

  .icon-arrow-up-right {
    fill: ${style.color.grey32};
    position: absolute;
    width: 16px;
    height: 16px;
    top: 24px;
    right: 24px;
    opacity: 0;
    ${style.TransitionStyle};

    @media ${style.deviceSize.mobile} {
      opacity: 1;
      top: 12px;
      right: 12px;
    }
  }

  a {
    position: relative;

    &:hover {
      .icon-arrow-up-right {
        opacity: 1;
      }
    }
  }

  a {
    display: grid;

    &:hover {
      transform: scale(1.01);
      transform: translateY(-2px);
      background: hsl(224, 11%, 20%);

      h2 {
        color: #fff;
      }

      p {
        color: ${style.color.grey64};
      }
    }
  }

  small {
    margin-bottom: 12px;
  }

  h2 {
    margin-bottom: 24px;
  }
`

const PicksIndex = props => {
  const { data, pageContext } = props
  const picks = data.allAirtable.edges

  return (
    <Layout
      location={props.location}
      pageTitle="Picks"
      pageDesc="A list of personal recommendations among contents, products, tools, or services. Mostly digital, but sometimes non-digital stuff, too."
    >
      <SEO title="Picks" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <PicksList>
        <Masonry className="grid">
          {picks.map(({ node }, index) => {
            return (
              <PicksListItem
                key={node.id}
                style={introTransition({ delay: 180 + 40 * index })}
              >
                <a href={node.data.Link} target="_blank">
                  <small>{node.data.Category[0].data.Type}</small>
                  <h2>{node.data.Title}</h2>
                  {node.data.Note && (
                    <div className="desc">{node.data.Note}</div>
                  )}
                  <IconArrowUpRight className="icon-arrow-up-right" />
                </a>
              </PicksListItem>
            )
          })}
        </Masonry>
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
    }
  }
`
