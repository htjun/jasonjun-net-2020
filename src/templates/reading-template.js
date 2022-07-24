import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from 'components/Layout'
import PageMeta from 'components/PageMeta'
import ReadingListItem from 'components/ReadingListItem'
import SEO from 'components/seo'
import Pagination from 'components/Pagination'
import styled from 'styled-components'
import * as style from 'styles/style'

const ReadingList = styled.section`
  ${style.MaxWidthStyle}
  margin-bottom: 48px;
`

const Reading = (props) => {
  const { data, pageContext } = props
  const books = data.books.edges

  return (
    <Layout location={props.location} pageTitle="Reading">
      <SEO title="Reading" />
      <PageMeta pageTitle="Reading" desc={`${data.books.totalCount} books`} />
      <ReadingList>
        {books.map(({ node }, index) => {
          const highlights = node.highlight ? node.highlight.length : 'No'

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
  query ($skip: Int!, $limit: Int!) {
    books: allStrapiBook(
      limit: $limit
      skip: $skip
      sort: { fields: createdAt, order: DESC }
    ) {
      edges {
        node {
          id
          title
          status
          slug
          language
          format
          author
          highlight {
            id
          }
        }
      }
      totalCount
    }
  }
`
