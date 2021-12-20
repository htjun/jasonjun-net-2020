import React from 'react'
import { Link } from 'gatsby'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import styled from 'styled-components'
import * as style from 'styles/style'
import IconLink from 'static/image/link.svg'

const WorkListItemWrapper = styled(animated.div)`
  ${style.ListItemStyle}

  h2 {
    min-width: 320px;

    a {
      svg {
        fill: ${style.color.navy72};
        width: 14px;
        height: 14px;
        margin-left: 8px;
        margin-bottom: -1px;
        ${style.TransitionStyle}
      }

      &:hover {
        svg {
          fill: ${style.color.navy48};
        }
      }
    }
  }

  .additional-cols {
    width: 100%;

    @media ${style.deviceSize.phablet} {
      flex-direction: column;
    }
  }

  .description {
    width: 360px;
    margin-right: 16px;
    color: ${style.color.navy24};
    flex-grow: 1;

    @media ${style.deviceSize.landscape} {
      width: 100%;
    }

    @media ${style.deviceSize.phablet} {
      margin-top: 4px;
      margin-right: 0;
    }
  }

  .tags {
    width: 200px;
    flex-grow: 1;

    @media ${style.deviceSize.landscape} {
      display: none;
    }
  }

  .date {
    text-align: right;
    width: 40px;
    flex-shrink: 0;

    @media ${style.deviceSize.tablet} {
      display: none;
    }

    @media ${style.deviceSize.phablet} {
      display: block;
      width: 100%;
      text-align: left;
      margin-top: 8px;
    }
  }
`

const WorkListItem = (props) => {
  const { node, index, title } = props
  const tags = node.frontmatter.responsibilities
  const noContent = node.frontmatter.no_content ? true : false

  return (
    <>
      {
        {
          true: (
            <WorkListItemWrapper style={introTransition({ delay: 24 * index })}>
              <h2>
                <a href={node.frontmatter.outlink} target="_blank">
                  {title}
                  <IconLink />
                </a>
              </h2>
              <div className="additional-cols">
                <div className="description">
                  {node.frontmatter.description}
                </div>
                <div className="tags">
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
                <div className="date">{node.frontmatter.date}</div>
              </div>
            </WorkListItemWrapper>
          ),
          false: (
            <WorkListItemWrapper style={introTransition({ delay: 24 * index })}>
              <h2>
                <Link to={node.fields.slug}>{title}</Link>
              </h2>
              <div className="additional-cols">
                <div className="description">
                  {node.frontmatter.description}
                </div>
                <div className="tags">
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
                <div className="date">{node.frontmatter.date}</div>
              </div>
            </WorkListItemWrapper>
          ),
        }[noContent]
      }
    </>
  )
}

export default WorkListItem
