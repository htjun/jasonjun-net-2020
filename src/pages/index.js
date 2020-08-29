import React from 'react'
import { Link, graphql } from 'gatsby'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import Layout from 'components/Layout'
import NoteCard from 'components/NoteCard'
import SEO from 'components/seo'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'
import IconArrowUpRight from 'static/image/arrow-up-right.svg'

const HomeBodyWrapper = styled.section`
  ${style.MaxWidthStyle};
  margin-bottom: 64px;
`

const HeadingTwo = styled(animated.h2)`
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  font-size: ${style.fontSize.xl2};
  font-weight: ${style.fontWeight.semibold};
  letter-spacing: ${style.textLetterSpacing.tight};
  line-height: ${style.textLineHeight.tight};
  margin-top: 96px;
  margin-bottom: 32px;

  @media ${style.deviceSize.mobile} {
    margin-top: 64px;
    margin-bottom: 24px;
  }

  .link-to-all {
    ${style.LinkStyle};

    font-size: ${style.fontSize.xs};
    font-weight: ${style.fontWeight.semibold};
    line-height: ${style.textLineHeight.loose};
    letter-spacing: ${style.textLetterSpacing.loose};
    text-transform: uppercase;
    color: ${style.color.grey32};
    margin-right: -8px;

    &: hover {
      @media (hover: hover) {
        color: ${style.color.grey64};
      }
    }

    @media ${style.deviceSize.phablet} {
      color: ${style.color.grey48};
    }
  }
`

const CardList = styled(animated.div)`
  display: grid;
  align-items: stretch;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 16px;
`

const PostListItem = styled(animated.div)`
  ${style.CardStyle}

  small {
    margin-bottom: 12px;
  }

  h2 {
    font-size: ${style.fontSize.lg};
    margin-bottom: 24px;
  }
`

const NoteListItem = styled.div`
  ${style.CardStyle};

  small {
    margin-top: auto;
  }
`

const PicksListItem = styled.div`
  ${style.CardStyle};

  small {
    margin-bottom: 12px;
  }

  h2 {
    margin-bottom: 24px;
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
`

const WorksListItem = styled.div`
  ${style.CardStyle};

  small {
    margin-bottom: 12px;
  }

  h2 {
    margin-bottom: 24px;
  }

  .desc {
    margin-bottom: 24px;
  }
`

const WorkListItemTags = styled.ul`
  border-top: 1px solid ${style.color.navy24};
  padding-top: 16px;
  margin-top: auto;
  font-size: ${style.fontSize.sm};
  color: ${style.color.grey56};
  font-weight: ${style.fontWeight.semibold};
`

const WorkListItemTagsDivider = styled.span`
  &:before {
    content: '•';
  }
  margin: 0 8px;
  color: ${style.color.grey32};
`

const Index = props => {
  const { data } = props
  const siteTitle = data.siteData.siteMetadata.title
  const posts = data.recentPosts.edges
  const notes = data.recentNotes.edges
  const picks = data.recentPicks.edges
  const works = data.recentWorks.edges

  const copyQuote = e => {
    e.preventDefault()

    // Combine texts to be copied
    const quoteText = e.currentTarget.getElementsByClassName('quote')[0]
      .textContent
    const quotePerson = e.currentTarget.getElementsByClassName('name')[0]
      .textContent

    const copyText = `“${quoteText}” - ${quotePerson}`

    // Copy to clipboard
    const el = document.createElement('textarea')
    el.value = copyText
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    if (selected) {
      document.getSelection().removeAllRanges()
      document.getSelection().addRange(selected)
    }
  }

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="Home"
        keywords={[`blog`, `gatsby`, `javascript`, 'design', `design system`]}
      />
      <HomeBodyWrapper>
        <HeadingTwo style={introTransition({ delay: 100 })}>
          <span>Recent posts</span>
          <Link to="/blog/" className="link-to-all">
            All posts
          </Link>
        </HeadingTwo>
        <CardList>
          {posts.map(({ node }, index) => {
            return (
              <PostListItem
                key={node.id}
                lang={node.frontmatter.lang}
                style={introTransition({ delay: 100 + 100 * index })}
              >
                <Link to={node.fields.slug}>
                  <small>{node.frontmatter.date}</small>
                  <h2>{node.frontmatter.title}</h2>
                  <div className="desc">{node.frontmatter.description}</div>
                </Link>
              </PostListItem>
            )
          })}
        </CardList>
        <HeadingTwo style={introTransition({ delay: 200 })}>
          <span>Recent notes</span>
          <Link to="/notes/" className="link-to-all">
            All notes
          </Link>
        </HeadingTwo>
        <CardList>
          {notes.map(({ node }, index) => {
            return (
              <NoteCard
                node={node}
                key={node.id}
                introDelay={200 + 100 * index}
                minimal
              />
            )
          })}
        </CardList>
        <HeadingTwo style={introTransition({ delay: 300 })}>
          <span>Recent picks</span>
          <Link to="/picks/" className="link-to-all">
            All picks
          </Link>
        </HeadingTwo>
        <CardList style={introTransition({ delay: 340 })}>
          {picks.map(({ node }) => {
            return (
              <PicksListItem key={node.id}>
                <a href={node.data.Link} target="_blank">
                  <small>{node.data.Category[0].data.Type}</small>
                  <h2>{node.data.Title}</h2>
                  {node.data.Note && <p className="desc">{node.data.Note}</p>}
                  <IconArrowUpRight className="icon-arrow-up-right" />
                </a>
              </PicksListItem>
            )
          })}
        </CardList>
        {/* <HeadingTwo style={introTransition({ delay: 400 })}>
          <span>Recent works</span>
          <Link to="/works/" className="link-to-all">
            All works
          </Link>
        </HeadingTwo>
        <CardList>
          {works.map(({ node }) => {
            const tags = node.frontmatter.responsibilities

            return (
              <WorksListItem>
                <Link to={node.fields.slug}>
                  <small>{node.frontmatter.date}</small>
                  <h2>{node.frontmatter.title}</h2>
                  <p className="desc">{node.frontmatter.description}</p>
                  <WorkListItemTags>
                    {tags.map((item, index) => {
                      return (
                        <span key={index}>
                          {item}
                          {tags.length !== index + 1 ? (
                            <WorkListItemTagsDivider />
                          ) : null}
                        </span>
                      )
                    })}
                  </WorkListItemTags>
                </Link>
              </WorksListItem>
            )
          })}
        </CardList> */}
      </HomeBodyWrapper>
    </Layout>
  )
}

export default Index

export const query = graphql`
  query {
    siteData: site {
      siteMetadata {
        title
      }
    }

    recentPosts: allMdx(
      limit: 3
      filter: { frontmatter: { published: { eq: true }, type: { ne: "work" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            date(formatString: "MMMM YYYY")
            description
            title
            lang
          }
        }
      }
    }

    recentNotes: allAirtable(
      filter: {
        table: { eq: "Quotes" }
        data: { Published: { eq: true }, Marked: { eq: true } }
      }
      limit: 2
      sort: { fields: data___Created_time, order: DESC }
    ) {
      edges {
        node {
          id
          data {
            Content
            Source {
              data {
                Type
                Title
              }
            }
            Person {
              data {
                Name
              }
            }
          }
        }
      }
    }

    recentPicks: allAirtable(
      filter: { table: { eq: "Picks" }, data: { Published: { eq: true } } }
      limit: 3
      sort: { fields: data___Created_time, order: DESC }
    ) {
      edges {
        node {
          id
          data {
            Title
            Link
            Note
            Category {
              data {
                Type
              }
            }
          }
        }
      }
    }

    recentWorks: allMdx(
      filter: { frontmatter: { published: { eq: true }, type: { eq: "work" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 2
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY")
            description
            responsibilities
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
