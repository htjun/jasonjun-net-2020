import React from 'react'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'

/*----- Spacer -----*/
const SpacerUnit = styled.div`
  width: 100%;
  height: ${props => props.size}px;

  @media ${style.deviceSize.mobile} {
    height: ${props => props.size * 0.64}px;
  }
`

export const Spacer = props => {
  return <SpacerUnit size={props.size} />
}

/*----- Blockquote -----*/
const QuoteWrapper = styled.blockquote`
  border-left: 2px solid ${style.color.navy92};
  padding-left: 2rem;
  margin: 3rem 0;
`

const Quote = styled.p`
  font-size: ${style.fontSize.lg};
`

const Person = styled.div`
  font-size: ${style.fontSize.base};
  color: ${style.color.grey48};
`

export const Blockquote = props => {
  const { quote, addition, name } = props

  return (
    <QuoteWrapper>
      <Quote>“{quote}”</Quote>
      {addition ? <Quote>“{addition}”</Quote> : null}
      {name ? <Person>— {name}</Person> : null}
    </QuoteWrapper>
  )
}

/*----- SmallNote -----*/

const SmallNoteWrapper = styled.div`
  font-size: ${style.fontSize.sm};
  font-family: ${style.fontSet.sans};
  color: ${style.color.grey48};
  padding: 16px 24px;
  background-color: ${style.color.grey92};
  border-radius: 4px;
  margin: 3rem 0;
`

export const SmallNote = props => {
  return <SmallNoteWrapper>{props.children}</SmallNoteWrapper>
}

/*----- Caption -----*/
const CaptionWrapper = styled.figcaption`
  font-family: ${style.fontSet.sans};
  font-size: ${style.fontSize.sm};
  color: ${style.color.grey48};
  margin-bottom: 2.5rem;
  ${props =>
    props.type === 'video' &&
    css`
      margin-top: -1rem;
    `}
`

export const CustomCaption = props => {
  const captionType = props.video ? 'video' : null

  return <CaptionWrapper type={captionType}>{props.children}</CaptionWrapper>
}

/*----- ImageContainer -----*/

const ImageWrapper = styled.div`
  display: block;
  margin: 0 auto;
  margin-top: 128px;
  margin-bottom: 128px;

  @media ${style.deviceSize.phablet} {
    margin-top: 48px;
    margin-bottom: 48px;
  }

  width: 100%;
  max-width: 1000px;

  ${props =>
    props.size === 'large' &&
    css`
      max-width: 1140px;
    `}
    
  ${props =>
    props.size === 'medium' &&
    css`
      max-width: 720px;
    `}

  ${props =>
    props.size === 'small' &&
    css`
      max-width: 512px;
    `}

    
  ${props =>
    props.margin === 'medium' &&
    css`
    margin-top: 96px;
    margin-bottom: 96px;
    `}

  ${props =>
    props.margin === 'small' &&
    css`
    margin-top: 64px;
    margin-bottom: 64px;
    `}

  ${props =>
    props.maxSize &&
    css`
      max-width: ${props.maxSize}px;
    `}

  ${props =>
    props.grid > 0 &&
    css`
      p {
        display: grid;
        grid-template-columns: repeat(${props.grid}, 1fr);
        grid-gap: 24px;

        @media ${style.deviceSize.mobile} {
          grid-gap: 12px;
        }
      }

      .gatsby-resp-image-figure {
        margin: 0 !important;
      }
    `}

  ${props =>
    props.grid > 3 &&
    css`
      p {
        grid-template-columns: repeat(2, 1fr);
      }
    `}
    

  ${props =>
    props.shadow === false &&
    css`
      .gatsby-resp-image-wrapper {
        box-shadow: none !important;
        border-radius: 4px !important;
        border: 1px solid ${style.color.grey96};
      }

      .gatsby-resp-image-image {
        box-shadow: none !important;
      }
    `}

  ${props =>
    props.border === false &&
    css`
      .gatsby-resp-image-wrapper {
        border: none;
      }
    `}

  ${props =>
    props.caption === false &&
    css`
      .gatsby-resp-image-figcaption {
        display: none;
      }
    `}
`

const BlockCaption = styled.figcaption`
  font-family: ${style.fontSet.sans};
  font-size: ${style.fontSize.sm};
  color: ${style.color.grey64};
  text-align: center;
`

export const ImageContainer = props => {
  const size = props.size
  const maxSize = props.maxSize
  const margin = props.margin
  const grid = props.grid
  const blockCaption = props.blockCaption
  const shadow = props.noShadow ? false : true
  const border = props.noBorder ? false : true
  const caption = props.noCaption ? false : true

  return (
    <ImageWrapper
      size={size}
      maxSize={maxSize}
      margin={margin}
      grid={grid}
      shadow={shadow}
      border={border}
      caption={caption}
    >
      {props.children}
      {blockCaption && <BlockCaption>{blockCaption}</BlockCaption>}
    </ImageWrapper>
  )
}

/*----- VideoContainer -----*/

const VideoWrapper = styled.div`
  display: block;
  margin: 0 auto;
  margin-top: 128px;
  margin-bottom: 128px;

  @media ${style.deviceSize.phablet} {
    margin-top: 48px;
    margin-bottom: 48px;
  }

  width: 100%;
  max-width: 1000px;

  ${props =>
    props.size === 'large' &&
    css`
      max-width: 1140px;
    `}
    
  ${props =>
    props.size === 'medium' &&
    css`
      max-width: 720px;
    `}

  ${props =>
    props.size === 'small' &&
    css`
      max-width: 512px;
    `}

  ${props =>
    props.maxSize &&
    css`
      max-width: ${props.maxSize}px;
    `}

  ${props =>
    props.margin === 'medium' &&
    css`
    margin-top: 96px;
    margin-bottom: 96px;
    `}

  ${props =>
    props.margin === 'small' &&
    css`
    margin-top: 64px;
    margin-bottom: 64px;
    `}

  ${props => props.border &&
    css`
    video {
      border: 1px solid ${style.color.navy92};
    }
    `
  }

  video {
    width: 100%;
    max-width: 1000px;
    border-radius: 2px;
  }

  .gatsby-resp-iframe-wrapper {
    margin-bottom: 0 !important;
    border-radius: 2px;
  }

  
  ${props =>
    props.ratio &&
    css`
      .gatsby-resp-iframe-wrapper {
        padding-bottom: ${100 / props.ratio}% !important;
      }
    `}
`

export const VideoContainer = props => {
  const { size, maxSize, ratio, margin, border, caption } = props

  return (
    <VideoWrapper size={size} maxSize={maxSize} ratio={ratio} margin={margin} border={border}>
      {props.children}
      {caption && <BlockCaption>{caption}</BlockCaption>}
    </VideoWrapper>
  )
}
