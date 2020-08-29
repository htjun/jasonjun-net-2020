import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import Layout from 'components/Layout'
import SEO from 'components/seo'
import styled from 'styled-components'
import * as style from 'styles/style'

const ContentWrapper = styled.section`
  ${style.MaxWidthStyle};
  padding: 0 24px;
  margin: 0 auto;
  overflow: hidden;
`

const BookHeader = styled(animated.div)`
  display: flex;
  align-items: flex-start;
  margin-top: 72px;
  padding-bottom: 64px;
  border-bottom: 1px solid ${style.color.navy16};
  margin-bottom: 64px;

  @media ${style.deviceSize.phablet} {
    flex-direction: column;
    align-items: center;
  }

  .gatsby-image-wrapper {
    width: 100%;
    min-width: 200px;
    max-width: 240px;
    border-radius: 2px;
    margin-right: 48px;

    @media ${style.deviceSize.phablet} {
      margin-right: 0;
      margin-bottom: 48px;
    }
  }
`

const BookInfo = styled.div`
  width: 100%;

  h1 {
    font-size: ${style.fontSize.xl2};
    font-weight: ${style.fontWeight.semibold};
    letter-spacing: ${style.textLetterSpacing.tight};
    line-height: ${style.textLineHeight.tight};
    margin-top: 8px;
    max-width: 640px;
  }

  ul {
    margin-top 32px;
    display: grid;
    grid-row-gap: 24px;

    small {
      font-size: ${style.fontSize.sm};
      color: ${style.color.grey64};
      margin-bottom: 4px;
    }
  }
`

const Highlights = styled(animated.div)`
  display: block;

  h3 {
    font-size: ${style.fontSize.xl2};
    font-weight: ${style.fontWeight.semibold};
    letter-spacing: ${style.textLetterSpacing.tight};
    line-height: ${style.textLineHeight.tight};
  }
`

const Quote = styled.blockquote`
  font-family: ${style.fontSet.serif};
  font-size: ${style.fontSize.lg};
  border-left: 4px solid ${style.color.navy24};
  padding-left: 2rem;
  margin: 4rem 0;
  max-width: 640px;

  @media ${style.deviceSize.phablet} {
    padding-left: 1rem;
    margin: 3rem 0;
  }
`

const Book = props => {
  const book = props.data.airtable
  const coverImage = book.data.Cover
  const quotes = book.data.Quotes

  return (
    <Layout location={props.location} bookTemplate>
      <ContentWrapper>
        <BookHeader style={introTransition({ delay: 0 })}>
          {coverImage !== null && (
            <Img fluid={coverImage.localFiles[0].childImageSharp.fluid} />
          )}
          <BookInfo>
            <animated.h1 style={introTransition({ delay: 20 })}>
              {book.data.Full_title}
            </animated.h1>
            <ul>
              <animated.li style={introTransition({ delay: 50 })}>
                <small>Author</small>
                <div>
                  {book.data.Author.map((person, i) => {
                    return (
                      <React.Fragment key={i}>
                        <span>{person.data.Name}</span>
                        {i < book.data.Author.length - 1 ? ', ' : null}
                      </React.Fragment>
                    )
                  })}
                </div>
              </animated.li>
              <animated.li style={introTransition({ delay: 100 })}>
                <small>Published year</small>
                <div>{book.data.Published_year}</div>
              </animated.li>
              <animated.li style={introTransition({ delay: 150 })}>
                <small>Category</small>
                <div>{book.data.Genre}</div>
              </animated.li>
            </ul>
          </BookInfo>
        </BookHeader>
        <Highlights style={introTransition({ delay: 200 })}>
          <h3>{`${quotes ? quotes.length : 0} Highlights`}</h3>
          {quotes &&
            quotes.map((quote, index) => {
              return <Quote key={index}>{quote.data.Content}</Quote>
            })}
        </Highlights>
      </ContentWrapper>
    </Layout>
  )
}

export default Book

export const bookQuery = graphql`
  query($slug: String!) {
    airtable(
      data: { Slug: { eq: $slug }, Type: { eq: "Book" }, Live: { eq: true } }
    ) {
      data {
        Full_title
        Author {
          data {
            Name
          }
        }
        Cover {
          localFiles {
            childImageSharp {
              fluid(maxWidth: 512) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        Published_year
        Genre
        Quotes {
          data {
            Content
          }
        }
      }
    }
  }
`
