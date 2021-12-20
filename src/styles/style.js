import styled, { css, createGlobalStyle } from 'styled-components'
import deStyle from 'destyle.css'

// Design Tokens

export const color = {
  grey8: 'hsl(240, 4%, 8%)',
  grey16: 'hsl(240, 4%, 16%)',
  grey24: 'hsl(240, 4%, 24%)',
  grey32: 'hsl(240, 4%, 32%)',
  grey48: 'hsl(240, 4%, 48%)',
  grey56: 'hsl(240, 4%, 56%)',
  grey64: 'hsl(240, 4%, 64%)',
  grey80: 'hsl(240, 4%, 80%)',
  grey88: 'hsl(240, 4%, 88%)',
  grey92: 'hsl(240, 4%, 92%)',
  grey94: 'hsl(240, 4%, 94%)',
  grey96: 'hsl(240, 4%, 96%)',
  grey98: 'hsl(240, 4%, 98%)',
  navy4: 'hsl(228, 12%, 4%)',
  navy8: 'hsl(228, 12%, 8%)',
  navy12: 'hsl(228, 12%, 12%)',
  navy16: 'hsl(228, 12%, 16%)',
  navy18: 'hsl(228, 12%, 18%)',
  navy20: 'hsl(228, 12%, 20%)',
  navy24: 'hsl(228, 12%, 24%)',
  navy32: 'hsl(228, 12%, 32%)',
  navy48: 'hsl(228, 12%, 48%)',
  navy56: 'hsl(228, 12%, 56%)',
  navy64: 'hsl(228, 12%, 64%)',
  navy72: 'hsl(228, 12%, 72%)',
  navy80: 'hsl(228, 12%, 80%)',
  navy92: 'hsl(228, 12%, 92%)',
  navy94: 'hsl(228, 12%, 94%)',
  navy96: 'hsl(228, 12%, 96%)',
  blue32: 'hsl(228, 64%, 32%)',
  blue48: 'hsl(228, 64%, 48%)',
  blue64: 'hsl(228, 64%, 64%)',
  blue72: 'hsl(228, 64%, 72%)',
  blue92: 'hsl(228, 64%, 92%)',
  blue96: 'hsl(228, 64%, 96%)',
}

export const fontSet = {
  sans: `'Inter', sans-serif`,
  serif: `'Noto Serif KR', 'Inter', sans-serif`,
  code: `'Source Code Pro', monospace`,
}

export const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  xl2: '1.5rem',
  xl3: '2rem',
  xl4: '2.5rem',
  xl5: '3rem',
}

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  black: 900,
}

export const textLineHeight = {
  tight: 1.25,
  normal: 1.5,
  loose: 1.65,
}

export const textLetterSpacing = {
  tighter: '-0.04em',
  tight: '-0.025em',
  normal: 0,
  loose: '0.025em',
}

export const objectSize = {
  maxWidth: '1000px',
  contentMaxWidth: '720px',
  contentMaxWidthSmall: '600px',
  footerHeight: '148px',
}

export const deviceSize = {
  tiny: `(max-width: 340px)`,
  mobile: `(max-width: 480px)`,
  phablet: `(max-width: 640px)`,
  tablet: `(max-width: 768px)`,
  landscape: `(max-width: 1024px)`,
}

// Predefiend style

export const MaxWidthStyle = css`
  max-width: calc(${objectSize.maxWidth} + 48px);
  padding-left: 24px;
  padding-right: 24px;
  margin: 0 auto;

  @media ${deviceSize.mobile} {
    max-width: calc(${objectSize.maxWidth} + 32px);
    padding-left: 16px;
    padding-right: 16px;
  }
`

export const TransitionStyle = css`
  transition: all 0.12s ease-in;
`

export const LinkStyle = css`
  display: block;
  padding: 2px 8px;
  margin-left: -8px;
  margin-top: -2px;
  border-radius: 4px;
  background-color: transparent;
  transition: all 0.16s linear;

  &:hover {
    @media (hover: hover) {
      background-color: hsla(228, 12%, 64%, 0.16);
      background-color: ${color.navy94};
    }
  }
`

export const HeroTitleStyle = css`
  font-size: 128px;
  font-weight: ${fontWeight.semibold};
  letter-spacing: ${textLetterSpacing.tight};
  line-height: ${textLineHeight.tight};
  margin-left: 24px;

  @media ${deviceSize.phablet} {
    margin-left: 2vw;
    font-size: 20vw;
  }
`

export const CardContainerStyle = css`
  max-width: calc(${objectSize.maxWidth} + 48px);
  padding: 0 12px;
  margin: 0 auto;
  margin: 0 auto;
  margin-top: -48px;

  @media ${deviceSize.phablet} {
    margin-top: -6vw;
  }

  @media ${deviceSize.mobile} {
    padding: 0 16px;
  }
`

export const CardStyle = css`
  a {
    display: flex;
    flex-direction: column;
    background: ${color.navy18};
    border-radius: 4px;
    height: 100%;
    padding: 32px;
    transition: all 0.12s ease-in;
    box-shadow: 0 2.8px 0.8px -16px rgba(0, 0, 0, 0.014),
      0 10px 2.7px -16px rgba(0, 0, 0, 0.024),
      0 24px 12px -16px rgba(0, 0, 0, 0.04);

    @media ${deviceSize.mobile} {
      padding: 24px;
    }

    &:hover {
      transform: scale(1.01);
      transform: translateY(-2px);
      background: hsl(224, 11%, 20%);
      box-shadow: 0 4.8px 0.8px -12px rgba(0, 0, 0, 0.016),
        0 17.5px 6px -12px rgba(0, 0, 0, 0.024),
        0 32px 24px -12px rgba(0, 0, 0, 0.02);

      h2 {
        color: #fff;
      }

      .desc {
        color: ${color.grey64};
      }
    }
  }

  h2 {
    color: ${color.grey98};
    font-size: ${fontSize.xl};
    font-weight: ${fontWeight.semibold};
  }

  small {
    display: block;
    font-size: ${fontSize.base};
    font-weight: ${fontWeight.normal};
    color: ${color.grey64};
  }

  .desc {
    color: ${color.grey48};
    ${TransitionStyle};
  }

  .quote {
    font-family: ${fontSet.serif};
    font-size: ${fontSize.lg};
    color: ${color.grey98};
    margin-top: 4px;
    margin-bottom: 24px;

    &:before {
      content: '“';
      margin-left: -12px;
      margin-right: 4px;
      color: ${color.grey64};
    }

    &:after {
      content: '”';
      margin-left: 4px;
      color: ${color.grey64};
    }
  }
`

export const ContentBodyStyle = css`
  font-family: ${fontSet.serif};
  line-height: ${textLineHeight.loose};
  color: ${color.grey16};
  h1,
  h2,
  h3,
  h4 {
    font-family: ${fontSet.sans};
    font-weight: ${fontWeight.semibold};
    margin-top: 3em;
    margin-bottom: 1.5em;
  }

  h1 {
    font-size: ${fontSize.xl2};
  }
  h2 {
    font-size: ${fontSize.xl};
  }
  h3 {
    font-size: ${fontSize.lg};
  }

  p {
    margin-bottom: 1.5rem;
    word-break: keep-all;
  }

  ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 2.5rem 0;

    li {
      margin-bottom: 1.5rem;
    }
  }

  .gatsby-resp-image-figure {
    margin-top: 2rem;
    margin-bottom: 3rem;

    .gatsby-resp-image-wrapper {
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 8px;
      box-shadow: 0 0.8px 1.6px rgba(0, 0, 0, 0.01),
        0 2px 4px rgba(0, 0, 0, 0.016), 0 4.2px 9.2px rgba(0, 0, 0, 0.02),
        0 12px 32px rgba(0, 0, 0, 0.04);
    }

    .gatsby-resp-image-figcaption {
      font-family: ${fontSet.sans};
      font-size: ${fontSize.sm};
      color: ${color.grey64};
    }
  }

  a {
    border-bottom: 1px solid ${color.navy80};

    &:hover {
      color: ${color.blue48};
      border-color: ${color.blue72};
      transition: all 0.12s linear;
    }
  }

  img {
    max-width: 100%;
  }

  video {
    width: 100%;
    max-width: ${objectSize.contentMaxWidth};
    border-radius: 2px;
  }

  hr {
    border: none;
    height: 1px;
    background-color: ${color.grey80};
    margin: 3rem 0;
  }

  code {
    display: inline-block;
    font-family: ${fontSet.code};
    font-size: ${fontSize.sm};
    padding: 0 8px;
    border-radius: 4px;
    background: ${color.navy92};
    color: ${color.grey12};
  }
`

// List item style
export const ListItemStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${color.navy94};

  @media ${deviceSize.phablet} {
    flex-direction: column;
  }

  .additional-cols {
    display: flex;
    color: ${color.navy48};

    > div {
      font-size: ${fontSize.sm};
      margin-left: 16px;
      word-break: break-word;

      @media ${deviceSize.phablet} {
        margin-left: 0;
      }
    }
  }

  h2 {
    font-size: ${fontSize.base};
    font-weight: ${fontWeight.medium};
    color: ${color.navy12};

    a {
      ${LinkStyle}
      display: inline-flex;
      align-items: center;
    }
  }
`

// Global style
export const GlobalStyle = createGlobalStyle`
  ${deStyle}
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    ::selection {
      background: ${color.blue72};
      color: #fff;
    }
    ::-moz-selection {
      background: ${color.blue72};
      color: #fff;
    }
  }

  html {
    font-family: ${fontSet.sans};
    font-size: ${fontSize.base};
    line-height: ${textLineHeight.normal};
    letter-spacing: ${textLetterSpacing.normal};
    color: ${color.grey8};
  }

  html,
  body,
  #___gatsby,
  #gatsby-focus-wrapper {
    height: 100%;
    margin: 0;
  }

  body {
    background: ${color.grey98};
  }
`
