import { Link } from 'gatsby'
import React from 'react'
import { useSpring } from 'react-spring'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'
import IconArrowUpRight from 'static/image/arrow-up-right.svg'

const rootPath = `${__PATH_PREFIX__}/`

const FooterWrapper = styled.footer`
  padding: 64px 0 64px 0;

  @media ${style.deviceSize.tablet} {
    padding: 64px 0 32px 0;
  }

  ${props =>
    props.location
      ? css`
          background: ${style.color.grey96};
        `
      : css`
          background: transparent;
        `}
`

const FooterLinks = styled.ul`
  ${style.MaxWidthStyle};
  display: flex;

  @media ${style.deviceSize.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(5, auto);
    grid-auto-flow: column;
    grid-gap: 10px;
  }

  li {
    font-size: ${style.fontSize.xs};
    font-weight: ${style.fontWeight.semibold};
    text-transform: uppercase;
    letter-spacing: 0.025em;
    color: ${style.color.navy56};
    margin-right: 24px;

    :first-of-type {
      margin-right: 64px;

      @media ${style.deviceSize.tablet} {
        margin-right: 0;
      }
    }

    :last-of-type {
      margin-right: 0;
    }

    a {
      ${style.LinkStyle}
      display: inline-block;
      cursor: pointer;

      svg {
        width: 8px;
        height: 8px;
        margin-left: 4px;
        opacity: 0;
        ${style.TransitionStyle}
      }

      &:hover {
        color: ${style.color.navy24};
        svg {
          opacity: 1;
        }
      }
    }
  }
`

const FooterBackToTop = styled.li`
  margin-left: auto;
`

const Footer = props => {
  const { location } = props
  const [, setY] = useSpring(() => ({ y: 0 }))
  const postFooter = location === 'post' || location === 'work' ? true : false

  return (
    <FooterWrapper location={postFooter}>
      <FooterLinks>
        <li>© {new Date().getFullYear()} Jason Jun</li>
        <li>
          <a target="_blank" href="https://twitter.com/jsonjun/">
            Twitter
            <IconArrowUpRight />
          </a>
        </li>
        <li>
          <a target="_blank" href="https://www.instagram.com/jsonjun/">
            Instagram
            <IconArrowUpRight />
          </a>
        </li>
        <li>
          <a target="_blank" href="https://www.linkedin.com/in/jsonjun/">
            LinkedIn
            <IconArrowUpRight />
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/htjun/">
            GitHub
            <IconArrowUpRight />
          </a>
        </li>
        <FooterBackToTop>
          <a
            onClick={e => {
              e.preventDefault()

              setY({
                y: 0,
                reset: true,
                from: { y: window.scrollY },
                onFrame: props => window.scroll(0, props.y),
              })
            }}
          >
            ↑ Back to top
          </a>
        </FooterBackToTop>
      </FooterLinks>
    </FooterWrapper>
  )
}

export default Footer
