import React, { useState } from 'react'
import { animated } from 'react-spring'
import { introTransition } from 'components/animation'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'
import IconCopy from 'static/image/copy.svg'

const NoteListItem = styled(animated.div)`
  ${style.CardStyle};

  ${props =>
    props.layout === 'home' &&
    css`
      small {
        margin-top: auto;
      }
    `}
  ${props =>
    props.layout === 'grid' &&
    css`
      width: 100%;
      max-width: calc(50% - 36px);
      margin: 12px;

      @media ${style.deviceSize.phablet} {
        max-width: calc(100% - 24px);
        margin: 0 0 16px 0;
      }

      @media ${style.deviceSize.mobile} {
        max-width: calc(100% - 32px);
      }

      small {
        margin-bottom: 32px;
      }
    `}

  cite {
    font-size: ${style.fontSize.xs};
    color: ${style.color.grey48};
    font-style: normal;
  }

  a {
    cursor: copy;
    position: relative;

    &:hover {
      .copy-indicator {
        opacity: 1;
      }
    }
  }

  a.copied {
    cursor: default;

    .copy-indicator {
      .icon-copy {
        fill: ${style.color.grey80};
      }

      span {
        color: ${style.color.grey92};
      }
    }
  }
`

const CopyIndicator = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 0;

  @media ${style.deviceSize.mobile} {
    opacity: 1;
  }

  .icon-copy {
    fill: ${style.color.grey32};
    width: 12px;
    height: 12px;
    margin-right: 4px;
    transition: all 0.06s linear;

    @media ${style.deviceSize.mobile} {
      width: 16px;
      height: 16px;
      margin-right: 0;
    }
  }

  span {
    font-size: ${style.fontSize.xs};
    font-weight: ${style.fontWeight.semibold};
    color: ${style.color.grey48};
    text-transform: uppercase;
    transition: all 0.06s linear;

    @media ${style.deviceSize.mobile} {
      display: none;
    }
  }
`

const NoteCard = props => {
  const { node, minimal, introDelay } = props
  const cardLayout = minimal ? 'home' : 'grid'

  const [copyLabel, setCopyLabel] = useState('Copy')
  const [copyStatus, setcopyStatus] = useState(null)

  const copyQuote = e => {
    e.preventDefault()

    // Combine texts to be copied
    const quoteText = e.currentTarget.getElementsByClassName('quote')[0]
      .textContent
    const quotePerson = e.currentTarget.getElementsByClassName('name')[0]
      .textContent

    const copyText = `“${quoteText}” - ${quotePerson}`

    // Copy to clipboard
    const el = document.createElement('textarea')
    el.value = copyText
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    if (selected) {
      document.getSelection().removeAllRanges()
      document.getSelection().addRange(selected)
    }

    // Copy label update
    setCopyLabel('Copied!')
    setcopyStatus('copied')
  }

  return (
    <NoteListItem
      key={node.id}
      layout={cardLayout}
      style={introTransition({ delay: introDelay })}
    >
      <a
        onClick={copyQuote}
        className={copyStatus}
        onMouseLeave={() => {
          setCopyLabel('Copy')
          setcopyStatus(null)
        }}
      >
        <p className="quote">{node.data.Content}</p>
        <small className="name">{node.data.Person[0].data.Name}</small>
        {cardLayout === 'grid' && (
          <cite>
            <span>Source:{` `}</span>
            <span>
              {node.data.Source[0].data.Title}
              {` `}
            </span>
            <span>({node.data.Source[0].data.Type})</span>
          </cite>
        )}
        <CopyIndicator className={`copy-indicator`}>
          <IconCopy className="icon-copy" />
          <span>{copyLabel}</span>
        </CopyIndicator>
      </a>
    </NoteListItem>
  )
}

export default NoteCard
