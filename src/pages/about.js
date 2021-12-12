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
              Hello, I'm Jason, a UI designer and front-end developer based in
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
          </animated.article>
        </ContentBody>
      </AboutWrapper>
    </Layout>
  )
}

export default AboutPage
