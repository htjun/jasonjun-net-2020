import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import Layout from 'components/Layout'
import SEO from 'components/seo'
import styled, { css } from 'styled-components'
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
  border-bottom: 1px solid ${style.color.grey88};
  margin-bottom: 64px;

  @media ${style.deviceSize.phablet} {
    flex-direction: column;
    align-items: center;
    margin-top: 4vw;
  }
`

const BookCover = styled.div`
  display: block;
  margin-right: 48px;
  width: 100%;
  min-width: 200px;
  max-width: 240px;

  @media ${style.deviceSize.phablet} {
    margin-right: 0;
  }

  .gatsby-image-wrapper {
    width: 100%;
    border-radius: 3px;
    box-shadow: 8px 16px 16px #55647324, 12px 24px 24px #55647316;

    @media ${style.deviceSize.phablet} {
      margin-right: 0;
      margin-bottom: 48px;
    }

    img {
      width: calc(100% + 2px) !important;
      margin-left: -1px !important;
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
    grid-row-gap: 16px;
    color: ${style.color.grey24};

    small {
      font-size: ${style.fontSize.sm};
      color: ${style.color.grey48};
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
  border-left: 4px solid ${style.color.navy92};
  padding-left: 2rem;
  margin: 4rem 0;
  max-width: 640px;

  @media ${style.deviceSize.phablet} {
    padding-left: 1rem;
    margin: 3rem 0;
  }

  .names {
    display: block;
    margin-top: 12px;
    font-family: ${style.fontSet.sans};
    font-size: ${style.fontSize.base};
    color: ${style.color.navy48};

    &:before {
      content: '–';
      margin-right: 8px;
      color: ${style.color.navy72};
    }
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
            <BookCover>
              <Img fluid={coverImage.localFiles[0].childImageSharp.fluid} />
            </BookCover>
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
              <animated.li style={introTransition({ delay: 200 })}>
                <small>Status</small>
                <div>{book.data.Status}</div>
              </animated.li>
            </ul>
          </BookInfo>
        </BookHeader>
        <Highlights style={introTransition({ delay: 250 })}>
          <h3>{`${quotes ? quotes.length : 0} Highlights`}</h3>
          {quotes &&
            quotes.map((quote, index) => {
              return (
                <Quote key={index}>
                  <div class="quote">{quote.data.Content}</div>
                  {quote.data.Person &&
                    quote.data.Person.map((person, i) => {
                      return (
                        <div class="names" key={i}>
                          <span class="name">{person.data.Name}</span>
                          {i < quote.data.Person.length - 1 ? ', ' : null}
                        </div>
                      )
                    })}
                </Quote>
              )
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
              fixed(quality: 10, width: 100) {
                src
              }
            }
          }
        }
        Published_year
        Genre
        Status
        Quotes {
          data {
            Content
            Person {
              data {
                Name
              }
            }
          }
        }
      }
    }
  }
`
