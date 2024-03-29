import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { animated } from 'react-spring'
import { pageTitleIn } from 'components/animation'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'
import IconChevronLeft from 'static/image/chevron-left.svg'

const NavWrapper = styled.div`
  ${style.MaxWidthStyle};
  display: flex;
  justify-content: space-between;
  padding-top: 32px;
  padding-bottom: 32px;

  @media ${style.deviceSize.phablet} {
    padding-top: 16px;
    padding-bottom: 16px;
    flex-direction: column;
  }
`

const SiteTitle = styled.h1`
  font-family: ${style.fontSet.serif};
  font-size: ${style.fontSize.xl2};
  font-weight: ${style.fontWeight.black};
  color: ${style.color.navy24};
  letter-spacing: ${style.textLetterSpacing.tighter};
  margin-right: 64px;
  @media ${style.deviceSize.phablet} {
    margin-right: auto;
  }

  a {
    ${style.LinkStyle}

    &.active:hover {
      background: none;
    }
  }
`

const NavMenu = styled.ul`
  display: flex;
  margin-top: 8px;

  @media ${style.deviceSize.phablet} {
    margin-top: 16px;
    justify-content: space-between;
    border-top: 1px solid ${style.color.navy92};
    padding-top: 16px;
  }

  li {
    margin-right: 24px;
    position: relative;
    right: -8px;

    &:last-of-type {
      margin-right: 0;
    }

    @media ${style.deviceSize.phablet} {
      margin-right: 16px;
    }

    @media ${style.deviceSize.mobile} {
      margin-right: 8px;
      margin-right: 0;
      margin-left: 0;
      right: 0;
    }

    a {
      ${style.LinkStyle}
      display: block;
      font-size: ${style.fontSize.base};
      font-weight: ${style.fontWeight.medium};
      letter-spacing: ${style.textLetterSpacing.tight};
      color: ${style.color.navy56};

      @media ${style.deviceSize.mobile} {
        font-size: ${style.fontSize.sm};
      }

      &:hover {
        @media (hover: hover) {
          color: ${style.color.navy24};
        }
      }

      &.active {
        color: ${style.color.navy8};

        &:hover {
          background: none;
        }
      }
    }
  }
`

const HeaderWrapper = styled.header`
  color: ${style.color.grey8};

  ${props =>
    props.theme === 'bright' &&
    css`
      background-color: hsl(228, 12%, 99%);
    `}
`

const Header = props => {
  const { location, title, pageTitle, pageDesc } = props
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          menuLinks {
            name
            slug
          }
        }
      }
    }
  `)
  const siteMenu = data.site.siteMetadata.menuLinks
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    <HeaderWrapper theme={location === 'home' && 'bright'}>
      <NavWrapper>
        <SiteTitle>
          <Link to="/" activeClassName="active">
            Jason Jun
          </Link>
        </SiteTitle>
        <nav>
          <NavMenu>
            {siteMenu.map(menu => {
              return (
                <li key={menu.slug}>
                  <Link
                    to={`/${menu.slug}/`}
                    activeClassName="active"
                    partiallyActive={true}
                  >
                    {menu.name}
                  </Link>
                </li>
              )
            })}
          </NavMenu>
        </nav>
      </NavWrapper>
    </HeaderWrapper>
  )
}

export default Header
