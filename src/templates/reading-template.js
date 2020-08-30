import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from 'components/Layout'
import PageMeta from 'components/Pagemeta'
import ReadingListItem from 'components/ReadingListItem'
import SEO from 'components/seo'
import Pagination from 'components/Pagination'
import styled from 'styled-components'
import * as style from 'styles/style'

const ReadingList = styled.section`
  ${style.MaxWidthStyle}
  margin-bottom: 48px;
`

const Reading = props => {
  const { data, pageContext } = props
  const books = data.books.edges
  const bookCount = data.books.totalCount
  const highlightCount = data.highlights.totalCount

  return (
    <Layout location={props.location} pageTitle="Reading">
      <SEO title="Reading" />
      <PageMeta
        pageTitle="Reading"
        desc={`${bookCount} books and ${highlightCount} highlights`}
      />
      <ReadingList>
        {books.map(({ node }, index) => {
          const highlights = node.data.Quotes ? node.data.Quotes.length : 'No'

          return (
            <ReadingListItem
              node={node}
              index={index}
              highlights={highlights}
              key={node.id}
            />
          )
        })}
      </ReadingList>
      <Pagination context={pageContext} path="reading" />
    </Layout>
  )
}

export default Reading

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    books: allAirtable(
      limit: $limit
      skip: $skip
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
      totalCount
    }
    highlights: allAirtable(
      filter: {
        table: { eq: "Quotes" }
        data: {
          Published: { eq: true }
          Source: { elemMatch: { data: { Type: { eq: "Book" } } } }
        }
      }
    ) {
      totalCount
    }
  }
`
