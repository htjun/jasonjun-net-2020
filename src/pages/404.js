import React from 'react'
import { Link } from 'gatsby'
import Layout from 'components/Layout'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'

const NotFoundWrapper = styled.main`
  ${style.MaxWidthStyle};
  margin-top: calc(48px + 10vw);

  h2 {
    font-size: ${style.fontSize.xl5};
    font-weight: ${style.fontWeight.semibold};
    letter-spacing: ${style.textLetterSpacing.tighter};
    line-height: ${style.textLineHeight.tight};
    color: ${style.color.navy24};

    @media ${style.deviceSize.phablet} {
      font-size: ${style.fontSize.xl3};
    }
  }

  p {
    color: ${style.color.navy48};
    max-width: 400px;
    font-size: ${style.fontSize.base};
    margin-top: 24px;

    span {
      display: block;
      margin-bottom: 3rem;
    }
  }

  a {
    ${style.LinkStyle};
    display: inline-block;
    color: ${style.color.navy16};
    font-weight: ${style.fontWeight.regular};
  }
`

const NotFoundPage = props => {
  return (
    <Layout location="404">
      <NotFoundWrapper>
        <h2>Page not found 🕵🏻‍♂️</h2>
        <p>
          <span>
            The link you followed may be broken, or the page may have been
            removed.
          </span>
          <Link to="/">← Go back to homepage</Link>
        </p>
      </NotFoundWrapper>
    </Layout>
  )
}

export default NotFoundPage
