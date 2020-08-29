import React from 'react'
import { Link, graphql } from 'gatsby'
import { animated } from 'react-spring'
import { ReactSVG } from 'react-svg'
import { introTransition } from 'components/animation'
import Layout from 'components/Layout'
import SEO from 'components/seo'
import Pagination from 'components/Pagination'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'

const WorksList = styled.section`
  ${style.CardContainerStyle};
  max-width: 1024px;
  display: grid;
  grid-gap: 48px;

  @media (max-width: 900px) {
    grid-gap: 24px;
    margin-left: 12px;
    margin-right: 12px;
    grid-template-columns: 1fr 1fr;
  }

  @media ${style.deviceSize.phablet} {
    grid-template-columns: 1fr;
    margin-left: 4px;
    margin-right: 4px;
  }

  @media ${style.deviceSize.mobile} {
    margin-left: 0;
    margin-right: 0;
  }
`

const WorksListItem = styled(animated.div)`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 480px;
  grid-gap: 32px;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 48px;

    .work-cover-link {
      margin-bottom: 24px;
    }
  }
`

const WorkListItemLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${style.color.navy18};
  border-radius: 4px;
  min-height: 280px;
  height: 100%;
  padding: 32px;
  transition: all 0.24s ease-in;
  box-shadow: 0 2.8px 0.8px -16px rgba(0, 0, 0, 0.014),
    0 10px 2.7px -16px rgba(0, 0, 0, 0.024),
    0 24px 12px -16px rgba(0, 0, 0, 0.04);

  @media (max-width: 900px) {
    height: 24vw;
    min-height: 120px;
  }

  @media ${style.deviceSize.phablet} {
    height: 40vw;
  }

  .work-cover {
    width: 40%;

    ${props =>
      props.adjustment &&
      css`
        width: calc(40% * ${props.adjustment});
      `}

    @media (max-width: 900px) {
      width: 40%;

      ${props =>
        props.adjustment &&
        css`
          width: calc(40% * ${props.adjustment});
        `}
    }

    .injected-svg {
      fill: ${style.color.navy12};
      transition: all 0.16s ease-in-out;

      @media (max-width: 900px) {
        fill: ${style.color.navy96};
      }
    }

    div {
      display: grid;
    }
  }

  &:hover {
    @media (hover: hover) {
      background: ${props => props.color};

      .injected-svg {
        fill: ${style.color.navy96};
      }
    }
  }
`

const WorkListItemDetails = styled.div`
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  small {
    display: block;
    font-size: ${style.fontSize.base};
    font-weight: ${style.fontWeight.normal};
    color: ${style.color.grey64};
    margin-bottom: 8px;
  }

  h2 {
    color: ${style.color.grey98};
    font-size: ${style.fontSize.xl2};
    font-weight: ${style.fontWeight.semibold};
    margin-bottom: 24px;

    @media (max-width: 900px) {
      font-size: ${style.fontSize.xl};
      margin-bottom: 16px;
    }
  }

  p {
    color: ${style.color.grey48};
    margin-bottom: 32px;

    @media (max-width: 900px) {
      margin-bottom: 16px;
    }
  }
`

const WorkListItemTags = styled.ul`
  border-top: 1px solid ${style.color.navy20};
  padding-top: 16px;
  font-size: ${style.fontSize.sm};
  color: ${style.color.grey56};
  font-weight: ${style.fontWeight.semibold};

  @media (max-width: 900px) {
    margin-top: auto;
  }
`
const WorkListItemTagsDivider = styled.span`
  &:before {
    content: '•';
  }
  margin: 0 8px;
  color: ${style.color.grey32};
`

const Spacer = styled.div`
  height: 64px;
`

const WorksIndex = props => {
  const { data, pageContext } = props
  const { currentPage, isFirstPage, isLastPage, totalPages } = pageContext
  const works = data.allMdx.edges

  return (
    <Layout
      location={props.location}
      pageTitle="Works"
      pageDesc="Selected design and development works by Jason Jun"
    >
      <SEO
        title="Works"
        meta={[
          {
            name: 'robots',
            content: 'noindex',
          },
          {
            name: 'googlebot',
            content: 'noindex',
          },
        ]}
      />
      <WorksList>
        {works.map(({ node }, index) => {
          const tags = node.frontmatter.responsibilities
          const logoPath = node.fields.slug.substring(
            0,
            node.fields.slug.length - 1
          )
          const themeColor = node.frontmatter.theme_color
          const logoAdjustment = node.frontmatter.logo_adjustment

          return (
            <WorksListItem
              key={node.fields.slug}
              style={introTransition({ delay: 180 + 40 * index })}
            >
              <Link to={node.fields.slug} className="work-cover-link">
                <WorkListItemLogo
                  color={themeColor}
                  adjustment={logoAdjustment}
                >
                  <ReactSVG
                    src={`/image${logoPath}.svg`}
                    afterInjection={(error, svg) => {
                      if (error) {
                        console.error(error)
                        return
                      }
                    }}
                    className="work-cover"
                  />
                </WorkListItemLogo>
              </Link>
              <WorkListItemDetails>
                <small>{node.frontmatter.date}</small>
                <h2>
                  <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                </h2>
                <p>{node.frontmatter.description}</p>
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
              </WorkListItemDetails>
            </WorksListItem>
          )
        })}
      </WorksList>
      <Pagination context={pageContext} path="works" />
      <Spacer />
    </Layout>
  )
}

export default WorksIndex

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMdx(
      limit: $limit
      skip: $skip
      filter: { frontmatter: { published: { eq: true }, type: { eq: "work" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "YYYY")
            title
            description
            responsibilities
            theme_color
            logo_adjustment
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
