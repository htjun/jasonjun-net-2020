import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import Layout from 'components/Layout'
import SEO from 'components/seo'
import NoteCard from 'components/NoteCard'
import Pagination from 'components/Pagination'
import styled from 'styled-components'
import * as style from 'styles/style'

const NoteList = styled.section`
  .grid {
    ${style.CardContainerStyle}
  }
`

const NoteIndex = props => {
  const { data, pageContext } = props
  const notes = data.allAirtable.edges

  return (
    <Layout
      location={props.location}
      pageTitle="Notes"
      pageDesc="Collected quotes from books, articles, podcasts, conference talks, magazines and newsletters."
    >
      <SEO title="Notes" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <NoteList>
        <Masonry className="grid">
          {notes.map(({ node }, index) => {
            return (
              <NoteCard
                key={node.id}
                node={node}
                introDelay={180 + 40 * index}
              />
            )
          })}
        </Masonry>
      </NoteList>
      <Pagination context={pageContext} path="notes" />
    </Layout>
  )
}

export default NoteIndex

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allAirtable(
      limit: $limit
      skip: $skip
      filter: {
        table: { eq: "Quotes" }
        data: { Published: { eq: true }, Marked: { eq: true } }
      }
      sort: { order: DESC, fields: data___Created_time }
    ) {
      totalCount
      edges {
        node {
          data {
            Content
            Source {
              data {
                Type
                Title
                Published_year
              }
            }
            Person {
              data {
                Name
              }
            }
          }
          id
        }
      }
    }
  }
`
