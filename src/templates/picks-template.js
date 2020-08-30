import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from 'components/Layout'
import PageMeta from 'components/Pagemeta'
import PicksListItem from 'components/PicksListItem'
import SEO from 'components/seo'
import Pagination from 'components/Pagination'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'

const PicksList = styled.section`
  ${style.MaxWidthStyle}
  margin-bottom: 48px;
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
          return <PicksListItem node={node} index={index} />
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
