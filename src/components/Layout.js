import React from 'react'
import { Link } from 'gatsby'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import Header from 'components/Header'
import Footer from 'components/Footer'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'

const rootPath = `${__PATH_PREFIX__}/`

const GlobalStyle = style.GlobalStyle

const OuterWrapper = styled.div`
  height: 100%;
  margin: 0;
`

const InnerWrapper = styled.div`
  min-height: 100%;
  margin-bottom: calc(${style.objectSize.footerHeight} * -1);
`

const FooterPush = styled.div`
  height: ${style.objectSize.footerHeight};
`

const Layout = props => {
  const { location, title, children, pageTitle, pageDesc } = props

  let pageLocation
  if (location.pathname === rootPath) {
    pageLocation = 'home'
  } else if (props.postTemplate) {
    pageLocation = 'post'
  } else if (props.bookTemplate) {
    pageLocation = 'book'
  } else if (props.workTemplate) {
    pageLocation = 'work'
  } else if (location === '404') {
    pageLocation = '404'
  } else {
    pageLocation = null
  }

  return (
    <OuterWrapper location={pageLocation}>
      <GlobalStyle />
      <InnerWrapper location={pageLocation}>
        <Header
          location={pageLocation}
          pageTitle={pageTitle || 'Title'}
          pageDesc={pageDesc || 'Description'}
        />
        {children}
        <FooterPush />
      </InnerWrapper>
      <Footer location={pageLocation} />
    </OuterWrapper>
  )
}

export default Layout
