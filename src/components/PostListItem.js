import React from 'react'
import { Link, graphql } from 'gatsby'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import styled from 'styled-components'
import * as style from 'styles/style'

const PostListItemWrapper = styled(animated.div)`
  ${style.ListItemStyle}

  .date {
    width: 140px;

    @media ${style.deviceSize.phablet} {
      width: auto;
      margin-top: 4px;
    }
  }

  .lang {
    width: 60px;

    @media ${style.deviceSize.phablet} {
      display: none;
    }
  }

  .time-to-read {
    text-align: right;
    width: 100px;

    @media ${style.deviceSize.tablet} {
      display: none;
    }
  }
`

const PostListItem = props => {
  const { node, index, title } = props

  return (
    <PostListItemWrapper
      lang={node.frontmatter.lang}
      style={introTransition({ delay: 24 * index })}
    >
      <h2>
        <Link to={node.fields.slug}>{title}</Link>
      </h2>
      <div class="additional-cols">
        <div class="date">{node.frontmatter.date}</div>
        <div class="lang">
          {node.frontmatter.lang === 'EN'
            ? 'English'
            : node.frontmatter.lang === 'KR'
            ? 'Korean'
            : 'Unknown'}
        </div>
        <div class="time-to-read">{node.timeToRead} min read</div>
      </div>
    </PostListItemWrapper>
  )
}

export default PostListItem
