import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'

const ContentFooterNavWrapper = styled.div`
  border-top: 1px solid ${style.color.grey88};
  padding: 64px 0 24px 0;
  max-width: ${style.objectSize.maxWidth};

  ${props =>
    props.location === 'work' &&
    css`
      max-width: 1000px;
      margin: 0 auto;

      @media (max-width: 1048px) {
        margin: 0 24px;
      }

      @media ${style.deviceSize.mobile} {
        margin: 0 16px;
      }
    `}

  ul {
    display: flex;
    justify-content: space-between;

    @media ${style.deviceSize.phablet} {
      flex-direction: column;
    }
  }

  li {
    display: flex;
    margin-bottom: 48px;
    max-width: calc((${style.objectSize.contentMaxWidth} - 48px) / 2);

    small {
      display: block;
      font-size: ${style.fontSize.sm};
      color: ${style.color.grey48};
      margin-bottom: 4px;
    }

    a {
      ${style.LinkStyle}
      display: inline-block;
      font-weight: ${style.fontWeight.semibold};
      color: ${style.color.grey16};

      &:hover {
        color: ${style.color.grey8};
      }
    }

    &.next {
      margin-left: auto;

      @media ${style.deviceSize.phablet} {
        margin-left: 0;
      }
      
      small {
        text-align: right;

        @media ${style.deviceSize.phablet} {
          text-align: left;
        }
      }
    }
  }
`

const ContentFooterNav = props => {
  const { previous, next, location } = props

  return (
    <ContentFooterNavWrapper location={location}>
      <ul>
        {previous && (
          <li className="prev">
            <div>
              <small>← Previous post</small>
              <Link to={previous.fields.slug} rel="prev">
                {previous.frontmatter.title}
              </Link>
            </div>
          </li>
        )}
        {next && (
          <li className="next">
            <div>
              <small>Next post →</small>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title}
              </Link>
            </div>
          </li>
        )}
      </ul>
    </ContentFooterNavWrapper>
  )
}

export default ContentFooterNav
