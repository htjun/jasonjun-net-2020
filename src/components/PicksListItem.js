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
      display: inline-flex;
      align-items: center;

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
    <PicksListItemWrapper style={introTransition({ delay: 24 * index })}>
      <h2>
        <a href={node.properties.Link.value} target="_blank">
          {node.title}
          <IconArrowUpRight className="icon-arrow-up-right" />
        </a>
      </h2>
      <div className="additional-cols">
        <div className="category">{node.properties.Category.value.name}</div>
        <div className="note">{node.properties.Note.value}</div>
      </div>
    </PicksListItemWrapper>
  )
}

export default PicksListItem
