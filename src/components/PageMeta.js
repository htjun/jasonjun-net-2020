import React from 'react'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'

const PageMetaWrapper = styled.div`
  ${style.MaxWidthStyle}
  margin-top: 72px;
  margin-bottom: 64px;
  font-size: ${style.fontSize.sm};
  color: ${style.color.navy64};

  @media ${style.deviceSize.phablet} {
    margin-top: 6vw;
    margin-bottom: 8vw;
  }

  strong {
    font-weight: ${style.fontWeight.semibold};
    color: ${style.color.navy48};
  }
`

const PageMeta = props => {
  const { pageTitle, desc } = props

  return (
    <PageMetaWrapper>
      <strong>{pageTitle}</strong>
      <span> / </span>
      <span>{desc}</span>
    </PageMetaWrapper>
  )
}

export default PageMeta
