import React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { ReactSVG } from 'react-svg'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import Layout from 'components/Layout'
import SEO from 'components/seo'
import ContentFooterNav from 'components/ContentFooterNav'
import IconChevronDown from 'static/image/chevron-down.svg'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'

const WorkHeaderOuter = styled.div`
  height: 70vh;
  min-height: 400px;
  max-height: 512px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  ${props =>
    props.themeColor &&
    css`
      background-color: ${props.themeColor};
    `}

  @media ${style.deviceSize.phablet} {
    height: auto;
    min-height: auto;
    max-height: auto;
  }

  .icon-chevron-down {
    display: block;
    width: 16px;
    height: 16px;
    margin-bottom: 24px;

    svg {
      fill: rgba(255,255,255, 0.8);
    }
  }
`
const WorkHeaderInner = styled.div`
  ${style.MaxWidthStyle};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${style.deviceSize.phablet} {
    margin-top: 48px;
    margin-bottom: 48px;
  }

  h1 {
    color: rgba(255, 255, 255, 0.9);
    font-size: ${style.fontSize.xl3};
    font-weight: ${style.fontWeight.semibold};
    margin-bottom: 72px;

    @media ${style.deviceSize.phablet} {
      font-size: ${style.fontSize.xl2};
      margin-bottom: 32px;
    }
  }

  .work-cover {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;

    @media ${style.deviceSize.tablet} {
      display: none;
    }

    > div {
      width: 80%;

      ${props =>
        props.logoAdjustment &&
        css`
          width: calc(80% * ${props.logoAdjustment});
        `}

      svg {
        ${props =>
          props.themeColor &&
          css`
            fill: ${props.themeColor};
          `}
        mix-blend-mode: multiply;
        opacity: 0.3;
      }
    }
  }
`

const WorkHeaderDetailsList = styled.ul`
  display: grid;
  grid-gap: 12px;

  li {
    display: flex;
    font-size: ${style.fontSize.sm};

    .label {
      color: rgba(255, 255, 255, 0.6);
      min-width: 128px;
    }

    .value {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`

const ContentOuter = styled.section`
  background: #fff;
  background: ${style.color.grey98};
`

const ContentBlock = styled(animated.article)`
  padding-left: 24px;
  padding-right: 24px;
  margin: 0 auto;

  @media ${style.deviceSize.mobile} {
    max-width: calc(${style.objectSize.maxWidth} + 32px);
    padding-left: 16px;
    padding-right: 16px;
  }
`

const ContentTextStyle = css`
  width: 100%;
  max-width: 640px;
  margin: 2.5rem auto;
`

const ContentBody = styled.div`
  ${style.ContentBodyStyle};
  padding: 4rem 0;

  @media ${style.deviceSize.phablet} {
    padding: 2rem 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    ${ContentTextStyle}
    text-align: center;
    margin: 4.5rem auto 2rem auto;
  }

  > p {
    ${ContentTextStyle}
  }

  ul {
    ${ContentTextStyle}

    li {
      margin-bottom: 1rem;
    }
  }

  .gatsby-resp-image-figcaption {
    text-align: center;
  }

  figcaption {
    text-align: center;
  }

  pre {
    max-width: 720px;
    margin: 128px auto;
  }

  video {
    max-width: 1140px;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 8px;
    box-shadow: 0 0.8px 1.6px rgba(0, 0, 0, 0.01),
      0 2px 4px rgba(0, 0, 0, 0.016), 0 4.2px 9.2px rgba(0, 0, 0, 0.02),
      0 12px 32px rgba(0, 0, 0, 0.04);
  }

  .gatsby-resp-iframe-wrapper {
    padding-bottom: 43.2%;
  }
`

const ContentFooter = styled.div`
  ${style.MaxWidthStyle};
  overflow: hidden;
`

const WorkFooterDetailsList = styled(WorkHeaderDetailsList)`
  margin-top: 24px;
  margin-bottom: 72px;

  li {
    font-family: ${style.fontSet.sans};

    .label {
      color: ${style.color.grey64};
    }

    .value {
      color: ${style.color.grey24};
    }
  }
`

const WorkTemplate = props => {
  const work = props.data.mdx
  const tags = work.frontmatter.responsibilities
  const logoPath = work.fields.slug.substring(0, work.fields.slug.length - 1)
  const logoAdjustment = work.frontmatter.logo_adjustment
  const { previous, next } = props.pageContext

  return (
    <Layout location={props.location} workTemplate>
      <SEO
        title={work.frontmatter.title}
        description={work.frontmatter.description}
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
      <WorkHeaderOuter themeColor={work.frontmatter.theme_color}>
        <div />
        <WorkHeaderInner
          logoAdjustment={logoAdjustment}
          themeColor={work.frontmatter.theme_color}
        >
          <div class="work-info">
            <animated.h1 style={introTransition({ delay: 0 })}>
              {work.frontmatter.title}
            </animated.h1>
            <WorkHeaderDetailsList>
              <animated.li style={introTransition({ delay: 200 })}>
                <div class="label">Year</div>
                <div class="value">{work.frontmatter.date}</div>
              </animated.li>
              <animated.li style={introTransition({ delay: 240 })}>
                <div class="label">Company</div>
                <div class="value">{work.frontmatter.company}</div>
              </animated.li>
              <animated.li style={introTransition({ delay: 280 })}>
                <div class="label">Responsibilities</div>
                <div class="value">
                  {tags.map((item, index) => {
                    return (
                      <span key={index}>
                        {item}
                        {tags.length !== index + 1 ? <>, </> : null}
                      </span>
                    )
                  })}
                </div>
              </animated.li>
            </WorkHeaderDetailsList>
          </div>
          <ReactSVG
            src={`/image${logoPath}.svg`}
            afterInjection={(error, svg) => {
              if (error) {
                console.error(error)
                return
              }
            }}
            class="work-cover"
          />
        </WorkHeaderInner>

        <animated.div
          class="icon-chevron-down"
          style={introTransition({ delay: 380 })}
        >
          <IconChevronDown />
        </animated.div>
      </WorkHeaderOuter>
      <ContentOuter>
        <ContentBlock style={introTransition({ delay: 480 })}>
          <ContentBody>
            <MDXRenderer>{work.body}</MDXRenderer>
          </ContentBody>
        </ContentBlock>
        <ContentFooter>
          <WorkFooterDetailsList>
            <li>
              <div class="label">Project</div>
              <div class="value">{work.frontmatter.title}</div>
            </li>
            <li>
              <div class="label">Year</div>
              <div class="value">{work.frontmatter.date}</div>
            </li>
            <li>
              <div class="label">Company</div>
              <div class="value">{work.frontmatter.company}</div>
            </li>
            <li>
              <div class="label">Responsibilities</div>
              <div class="value">
                {tags.map((item, index) => {
                  return (
                    <span key={index}>
                      {item}
                      {tags.length !== index + 1 ? <>, </> : null}
                    </span>
                  )
                })}
              </div>
            </li>
          </WorkFooterDetailsList>
        </ContentFooter>
        <ContentFooterNav previous={previous} next={next} location="work" />
      </ContentOuter>
    </Layout>
  )
}

export default WorkTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        date(formatString: "YYYY")
        description
        company
        responsibilities
        theme_color
        logo_adjustment
      }
      fields {
        slug
      }
      body
    }
  }
`
