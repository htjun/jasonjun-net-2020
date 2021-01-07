import React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { ReactSVG } from 'react-svg'
import { animated } from 'react-spring'
import { introTransition, fadeIn } from 'components/animation'
import Layout from 'components/Layout'
import SEO from 'components/seo'
import ContentFooterNav from 'components/ContentFooterNav'
import IconChevronDown from 'static/image/chevron-down.svg'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'

const WorkInnerWrapper = styled.div`
  overflow: hidden;
`

const WorkHeaderOuter = styled(animated.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 70vh;
  min-height: 300px;
  max-height: 512px;
  padding: 0 24px;

  ${props =>
    props.themeColor &&
    css`
      border-bottom: 1px solid ${props.themeColor}40;
      background-color: ${props.themeColor};
    `}

  @media ${style.deviceSize.phablet} {
    height: auto;
    min-height: auto;
    max-height: auto;
  }

  @media ${style.deviceSize.mobile} {
    padding: 0 16px;
  }

  .icon-chevron-down {
    display: block;
    width: 16px;
    height: 16px;
    margin-bottom: 24px;

    svg {
      ${props =>
        props.themeColor &&
        css`
          fill: #fff;
        `}
    }
  }
`
const WorkHeaderInner = styled.div`
  width: 100%;
  max-width: ${style.objectSize.contentMaxWidth};
  margin: 0 auto;

  @media ${style.deviceSize.phablet} {
    margin-top: 48px;
    margin-bottom: 48px;
  }

  h1 {
    color: #fff;
    font-size: ${style.fontSize.xl3};
    font-weight: ${style.fontWeight.semibold};
    letter-spacing: ${style.textLetterSpacing.tight};
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
    height: 240px;

    @media ${style.deviceSize.tablet} {
      display: none;
    }

    > div {
      width: 80%;
      svg {
        ${props =>
          props.themeColor &&
          css`
            fill: ${props.themeColor};
          `}
        opacity: 1;
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
    color: #fff;

    .label {
      min-width: 128px;
      opacity: 0.5;
    }

    .value {
      opacity: 0.8;
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
  max-width: ${style.objectSize.contentMaxWidth};
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
      opacity: 1;
    }

    .value {
      color: ${style.color.grey24};
      opacity: 1;
    }
  }
`

const WorkTemplate = props => {
  const work = props.data.mdx
  const tags = work.frontmatter.responsibilities
  const logoPath = work.fields.slug.substring(0, work.fields.slug.length - 1)
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
      <WorkInnerWrapper>
        <WorkHeaderOuter
          themeColor={work.frontmatter.theme_color}
          style={fadeIn({ delay: 0, tension: 200 })}
        >
          <div />
          <WorkHeaderInner
            themeColor={work.frontmatter.theme_color}
          >
            <animated.h1 style={introTransition({ delay: 300 })}>
              {work.frontmatter.title}
            </animated.h1>
            <WorkHeaderDetailsList>
              <animated.li style={introTransition({ delay: 500 })}>
                <div class="label">Year</div>
                <div class="value">{work.frontmatter.date}</div>
              </animated.li>
              <animated.li style={introTransition({ delay: 540 })}>
                <div class="label">Company</div>
                <div class="value">{work.frontmatter.company}</div>
              </animated.li>
              <animated.li style={introTransition({ delay: 580 })}>
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
          </WorkHeaderInner>

          <animated.div
            class="icon-chevron-down"
            style={introTransition({ delay: 640 })}
          >
            <IconChevronDown />
          </animated.div>
        </WorkHeaderOuter>
        <ContentOuter>
          <ContentBlock style={introTransition({ delay: 750 })}>
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
      </WorkInnerWrapper>
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
      }
      fields {
        slug
      }
      body
    }
  }
`
