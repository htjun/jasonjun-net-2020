import React from 'react'
import { Link, graphql } from 'gatsby'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import Layout from 'components/Layout'
import PageMeta from 'components/Pagemeta'
import SEO from 'components/seo'
import Pagination from 'components/Pagination'
import styled from 'styled-components'
import * as style from 'styles/style'

const ReadingList = styled.section`
  ${style.MaxWidthStyle}
  margin-bottom: 48px;
`

const BookItem = styled(animated.div)`
  ${style.ListItemStyle}

  .author {
    width: 200px;

    span {
      color: ${style.color.navy24};
    }

    @media ${style.deviceSize.phablet} {
      width: auto;
      margin-top: 4px;
    }
  }

  .format {
    width: 80px;

    @media ${style.deviceSize.tablet} {
      display: none;
    }
  }

  .lang {
    width: 60px;

    @media ${style.deviceSize.tablet} {
      display: none;
    }
  }

  .highlight {
    text-align: right;
    width: 100px;

    @media ${style.deviceSize.phablet} {
      display: none;
    }
  }
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
            <BookItem
              key={node.id}
              style={introTransition({ delay: 20 * index })}
            >
              <h2>
                <Link to={`/reading/${node.data.Slug}`}>{node.data.Title}</Link>
              </h2>
              <div class="additional-cols">
                <div class="author">
                  {node.data.Author.map((person, i) => {
                    return (
                      <React.Fragment key={i}>
                        <span>{person.data.Name}</span>
                        {i < node.data.Author.length - 1 ? ', ' : null}
                      </React.Fragment>
                    )
                  })}
                </div>
                <div class="format">{node.data.Format}</div>
                <div class="lang">{node.data.Language}</div>
                <div class="highlight">{highlights} highlights</div>
              </div>
            </BookItem>
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
