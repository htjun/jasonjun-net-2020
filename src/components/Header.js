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

  @media ${style.deviceSize.mobile} {
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

  @media ${style.deviceSize.mobile} {
    margin-top: 16px;
    justify-content: space-between;
    border-top: 1px solid ${style.color.navy92};
    padding-top: 16px;
  }

  li {
    margin-right: 16px;
    position: relative;
    right: -8px;

    &:last-of-type {
      margin-right: 0;
    }

    @media ${style.deviceSize.phablet} {
      margin-right: 16px;
    }

    @media ${style.deviceSize.mobile} {
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
      color: ${style.color.grey64};

      &:hover {
        @media (hover: hover) {
          color: ${style.color.grey32};
        }
      }

      &.active {
        color: ${style.color.grey8};

        &:hover {
          background: none;
        }
      }
    }
  }
`

const HeaderWrapper = styled.header`
  color: ${style.color.grey8};
`

const HeaderContentWrapper = styled(animated.div)`
  ${style.MaxWidthStyle};
  padding-top: 48px;

  ${props =>
    props.headerless &&
    css`
      padding-top: 12px;
      padding-bottom: 24px;
    `}

  ${props =>
    props.heroHeader &&
    css`
      padding: 0;
    `}
`

const HeaderTitle = styled(animated.h2)`
  ${style.HeroTitleStyle};
`

const HeaderDesc = styled.p`
  max-width: 512px;
  font-size: ${style.fontSize.base};
  line-height: ${style.textLineHeight.normal};
  color: ${style.color.grey64};
`

const HeaderBackLink = styled.div`
  display: inline-block;

  a {
    ${style.LinkStyle}
    font-size: ${style.fontSize.sm};
    font-weight: ${style.fontWeight.semibold};
    color: ${style.color.grey64};
    line-height: 24px;
    
    display: flex;
    align-items: center;

    svg {
      height: 8px;
      margin-right: 8px;
      fill: ${style.color.grey48};
    }
  }
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
  let headerContent
  if (location === 'home') {
    headerContent = null
  } else if (location === 'post') {
    headerContent = (
      <HeaderContentWrapper headerless>
        <HeaderBackLink>
          <Link to="/blog/">
            <IconChevronLeft />
            <span>All Posts</span>
          </Link>
        </HeaderBackLink>
      </HeaderContentWrapper>
    )
  } else if (location === 'book') {
    headerContent = (
      <HeaderContentWrapper headerless>
        <HeaderBackLink>
          <Link to="/reading/">
            <IconChevronLeft />
            <span>All Books</span>
          </Link>
        </HeaderBackLink>
      </HeaderContentWrapper>
    )
  } else if (location === 'work') {
    headerContent = <HeaderContentWrapper heroHeader />
  } else if (location === '404') {
    headerContent = null
  } else {
    headerContent = (
      <HeaderContentWrapper>
        <HeaderTitle style={pageTitleIn({ delay: 300 })}>
          {pageTitle}
        </HeaderTitle>
      </HeaderContentWrapper>
    )
  }

  return (
    <HeaderWrapper>
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
