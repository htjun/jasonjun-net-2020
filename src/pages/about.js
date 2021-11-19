import React from 'react'
import { Link } from 'gatsby'
import SEO from 'components/seo'
import Layout from 'components/Layout'
import styled from 'styled-components'
import * as style from 'styles/style'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'

const AboutWrapper = styled.main`
  ${style.MaxWidthStyle};
`

const ContentBody = styled.div`
  ${style.ContentBodyStyle};
  max-width: ${style.objectSize.contentMaxWidthSmall};
  margin-top: 48px;
  padding-top: 48px;

  @media ${style.deviceSize.phablet} {
    margin-top: 24px;
    padding-top: 24px;
  }

  article {
    margin-top: 48px;
    margin-bottom: 64px;

    a {
      color: ${style.color.blue48};
      border-color: ${style.color.blue72};
      padding-bottom: 2px;

      &:hover {
        color: ${style.color.blue32};
        border-color: ${style.color.blue64};
      }
    }
  }
`

const HandEmoji = styled.div`
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  font-size: ${style.fontSize.xl5};
  line-height: 60px;
  cursor: grab;
  animation-duration: 0.8s;
  animation-name: handwave;
  transform-origin: 42px 50px;

  @keyframes handwave {
    0% {
      transform: rotateZ(40deg);
    }

    12% {
      transform: rotateZ(-2deg);
    }

    24% {
      transform: rotateZ(40deg);
    }

    36% {
      transform: rotateZ(-2deg);
    }

    48% {
      transform: rotateZ(30deg);
    }

    60% {
      transform: rotateZ(5deg);
    }

    72% {
      transform: rotateZ(30deg);
    }

    100% {
      transform: rotateZ(0);
    }
  }
`

const AboutPage = props => {
  const { pageContext } = props
  return (
    <Layout location={props.location} pageTitle="About">
      <SEO
        title="About"
        description="Work experience in Australia"
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
      <AboutWrapper>
        <ContentBody>
          <HandEmoji>👋</HandEmoji>
          <animated.article style={introTransition({ delay: 600 })}>
            <p>
              Hello, I'm Jason, a UI designer and front-end develooper based in
              Melbourne, Australia.
            </p>
            <p>
              I love and am good at crafting high-quality UI solutions, and have
              working with React, Gatsby, Next.js, Vue.js and styled-components.
            </p>
            <p>
              I built this website with Gatsby, MDX, styled-components and
              react-spring (for UI animations). The Reading and Picks content
              are hosted on Airtable. I wrote a{' '}
              <Link to="/blog/2019/using-airtable-with-gatsby/">blog post</Link>{' '}
              about using Airtable API with Gatsby.
            </p>
            <p>
              If you would like to know about my background and story, here's{' '}
              <a
                href="https://www.loversmagazine.com/interviews/jason-jun"
                target="_blank"
              >
                my interview with Interface Lovers magazine
              </a>{' '}
              in July 2019.
            </p>

            <h2>Work experiences</h2>

            <h3>Xero</h3>
            <p>
              I worked at Xero as a product designer in the design systems team.
            </p>
            <p>
              As a designer in the design systems team, my primary job was to
              continuously improve design system documents and design libraries
              in order to help other designers and developers use the design
              system easier.
            </p>
            <p>
              I also initiated and developed the first version of the Xero
              design system document finder Figma plugin as part of an approved
              personal project at Xero. I wrote a{' '}
              <Link to="/blog/2020/creating-a-document-finder-plugin-for-figma/">
                blog post
              </Link>{' '}
              about the process of it.
            </p>

            <h3>Envato</h3>
            <p>
              At Envato, I helped the design team's transition from Sketch to
              Figma, and created/managed the Figma library for Envato Elements.
            </p>
            <p>
              Upon finishing the design tool transition, I helped to initially
              set up the Figma library and systemic typography.{' '}
              <Link to="/works/envato-ds/">Here</Link> is a more detailed
              summary of this work.
            </p>
            <p>
              I also developed Envato's logo asset download page as a side
              project and wrote a{' '}
              <Link to="/blog/2020/developing-a-logo-asset-component/">
                blog post
              </Link>{' '}
              about the process.
            </p>

            <h3>Carsales</h3>
            <p>
              I worked on the Redbook Inspect team in Carsales as the only
              designer on the team. I was able to create a variety of works
              there, from UI prototyping to brand design.
            </p>
            <p>
              I helped the product's transition of reports from PDF to
              interactive web format, and redesigned the main website as well. I
              also designed the initial brand concept of their new product,
              Olasio.
            </p>
            <p>
              I also redesigned their emails and{' '}
              <Link to="/works/rbi-emails/">developed email templates</Link>{' '}
              using Foundation for Emails.
            </p>
          </animated.article>
        </ContentBody>
      </AboutWrapper>
    </Layout>
  )
}

export default AboutPage
