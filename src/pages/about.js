import React from 'react'
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
          <animated.article style={introTransition({ delay: 800 })}>
            <p>
              Hello, I'm Jason. I'm a software developer with UI/product design
              background. I'm currently looking for a front-end development role
              in Australia.
            </p>
            <p>
              I love making things with JavaScript and CSS and have experience
              working with React, Gatsby, Next.js, Vue.js and styled-components.
            </p>
            <p>
              I built this website with Gatsby, MDX, styled-components and
              react-spring. And the Reading and Picks contents are hosted on
              Airtable. I wrote a blog post about using Airtable API with
              Gatsby.
            </p>

            <h2>Work experiences</h2>

            <h3>Xero</h3>

            <p>
              Until recently, I worked at Xero as a product designer in the
              design systems team.
            </p>

            <p>
              Design system works are often quite small and incremental but very
              impactful. I wrote a blog post about one of the works I did at
              Xero.
            </p>

            <p>
              Also, I initiated and developed the first version of the Xero
              design system document finder Figma plugin as part of my '20%
              project'. And I wrote a blog post about the process of it.
            </p>
          </animated.article>
        </ContentBody>
      </AboutWrapper>
    </Layout>
  )
}

export default AboutPage
