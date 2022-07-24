import React from 'react'
import { Link, graphql } from 'gatsby'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import styled from 'styled-components'
import * as style from 'styles/style'

const ReadingListItemWrapper = styled(animated.div)`
  ${style.ListItemStyle}

  .author {
    font-size: ${style.fontSize.sm};
    font-weight: ${style.fontWeight.regular};
    color: ${style.color.navy48};

    .dash {
      margin-right: 8px;
      color: ${style.color.navy64};

      @media ${style.deviceSize.phablet} {
        display: none;
      }
    }

    @media ${style.deviceSize.phablet} {
      display: block;
      width: auto;
      margin-top: 4px;
    }
  }

  .format {
    width: 140px;

    @media ${style.deviceSize.tablet} {
      display: none;
    }
  }

  .lang {
    width: 60px;

    @media ${style.deviceSize.tablet} {
      display: none;
    }
  }

  .highlight {
    text-align: right;
    width: 100px;

    @media ${style.deviceSize.phablet} {
      display: none;
    }
  }
`

const ReadingListItem = (props) => {
  const { node, index, highlights } = props

  return (
    <ReadingListItemWrapper style={introTransition({ delay: 24 * index })}>
      <h2>
        <Link to={`/reading/${node.slug}`}>{node.title}</Link>
        <span className="author">
          <span className="dash">-</span>
          <span className="name">{node.author}</span>
        </span>
      </h2>

      <div className="additional-cols">
        <div className="format">{node.format}</div>
        <div className="lang">{node.language}</div>
        <div className="highlight">{highlights} highlights</div>
      </div>
    </ReadingListItemWrapper>
  )
}

export default ReadingListItem
