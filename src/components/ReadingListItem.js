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

    .dash {
      margin-right: 8px;
      color: ${style.color.navy64};

      @media ${style.deviceSize.phablet} {
        display: none;
      }
    }
    .name {
      color: ${style.color.navy48};
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

const ReadingListItem = props => {
  const { node, index, highlights } = props

  return (
    <ReadingListItemWrapper style={introTransition({ delay: 24 * index })}>
      <h2>
        <Link to={`/reading/${node.data.Slug}`}>{node.data.Title}</Link>
        <span class="author">
          <span class="dash">-</span>
          {node.data.Author.map((person, i) => {
            return (
              <React.Fragment key={i}>
                <span class="name">{person.data.Name}</span>
                {i < node.data.Author.length - 1 ? ', ' : null}
              </React.Fragment>
            )
          })}
        </span>
      </h2>

      <div class="additional-cols">
        <div class="format">{node.data.Format}</div>
        <div class="lang">{node.data.Language}</div>
        <div class="highlight">{highlights} highlights</div>
      </div>
    </ReadingListItemWrapper>
  )
}

export default ReadingListItem
