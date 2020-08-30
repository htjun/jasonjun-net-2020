import React from 'react'
import { Link, graphql } from 'gatsby'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import styled from 'styled-components'
import * as style from 'styles/style'
import IconArrowUpRight from 'static/image/arrow-up-right.svg'

const PicksListItemWrapper = styled(animated.div)`
  ${style.ListItemStyle}

  h2 {
    min-width: 200px;
    a {
      svg {
        fill: ${style.color.navy64};
        width: 10px;
        height: 10px;
        margin-left: 6px;
        opacity: 0;
        ${style.TransitionStyle}
      }

      &:hover {
        svg {
          opacity: 1;
        }
      }
    }
  }

  .category {
    min-width: 140px;

    @media ${style.deviceSize.phablet} {
      display: none;
    }
  }

  .note {
    flex-grow: 1;
    max-width: 520px;
    color: ${style.color.navy24};

    @media ${style.deviceSize.phablet} {
      margin-top: 4px;
    }
  }
`

const PicksListItem = props => {
  const { node, index } = props

  return (
    <PicksListItemWrapper
      key={node.id}
      style={introTransition({ delay: 24 * index })}
    >
      <h2>
        <a href={node.data.Link} target="_blank">
          {node.data.Title}
          <IconArrowUpRight class="icon-arrow-up-right" />
        </a>
      </h2>
      <div class="additional-cols">
        <div class="category">{node.data.Category[0].data.Type}</div>
        <div class="note">{node.data.Note}</div>
      </div>
    </PicksListItemWrapper>
  )
}

export default PicksListItem
