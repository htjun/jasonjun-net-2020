import React from 'react'
import { Link } from 'gatsby'
import Layout from 'components/Layout'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'

const NotFoundWrapper = styled.section`
  ${style.MaxWidthStyle};
  margin-top: 96px;

  h2 {
    font-size: ${style.fontSize.xl5};
    font-weight: ${style.fontWeight.semibold};
    letter-spacing: ${style.textLetterSpacing.tight};
    line-height: ${style.textLineHeight.tight};
  }

  p {
    color: ${style.color.grey92};
    max-width: 520px;
    font-size: ${style.fontSize.lg};
    margin-top: 24px;

    span {
      display: block;
      margin-bottom: 3rem;
    }
  }

  a {
    border-bottom: 2px solid ${style.color.grey32};
    transition: all 0.12s linear;

    &:hover {
      color: #fff;
      border-bottom: 2px solid ${style.color.grey48};
    }
  }
`

const NotFoundPage = props => {
  return (
    <Layout location="404">
      <NotFoundWrapper>
        <h2>Page not found</h2>
        <p>
          <span>
            The link you followed may be broken, or the page may have been
            removed.
          </span>
          <Link to="/">Go back to homepage</Link>
        </p>
      </NotFoundWrapper>
    </Layout>
  )
}

export default NotFoundPage
