import React from 'react'
import { Link, graphql } from 'gatsby'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import styled from 'styled-components'
import * as style from 'styles/style'
import IconArrowUpRight from 'static/image/arrow-up-right.svg'

const WorkListItemWrapper = styled(animated.div)`
  ${style.ListItemStyle}

  h2 {
    min-width: 320px;
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

  .description {
    flex-grow: 1;
    max-width: 360px;
    margin-right: 16px;
    color: ${style.color.navy24};

    @media ${style.deviceSize.phablet} {
      margin-top: 4px;
    }
  }

  .tags {
    width: 200px;

    @media ${style.deviceSize.tablet} {
      width: 300px;
    }
  }

  .date {
    text-align: right;
    min-width: 60px;

    @media ${style.deviceSize.phablet} {
      display: none;
    }
  }
`

const WorkListItem = props => {
  const { node, index, title } = props
  const tags = node.frontmatter.responsibilities

  return (
    <WorkListItemWrapper style={introTransition({ delay: 24 * index })}>
      <h2>
        <Link to={node.fields.slug}>
          {title}
          <IconArrowUpRight class="icon-arrow-up-right" />
        </Link>
      </h2>
      <div class="additional-cols">
        <div class="description">{node.frontmatter.description}</div>
        <div class="tags">
          {tags.map((item, index) => {
            return (
              <span key={index}>
                {item}
                {tags.length !== index + 1 ? ', ' : null}
              </span>
            )
            return <span key={index}>{item}</span>
          })}
        </div>
        <div class="date">{node.frontmatter.date}</div>
      </div>
    </WorkListItemWrapper>
  )
}

export default WorkListItem
