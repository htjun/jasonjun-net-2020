import React from 'react'
import { render } from 'react-dom'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'src/styles/prism-theme'
import * as style from 'styles/style'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

const preStyle = {
  padding: '2rem',
  borderRadius: '4px',
  marginTop: '1.5rem',
  marginBottom: '2.5rem',
  overflow: 'auto',
  fontSize: '13px',
  fontFamily: style.fontSet.code,
  fontWeight: 500,
  lineHeight: 1.75,
}

export const Code = ({ codeString, language, ...props }) => {
  if (props['react-live']) {
    return (
      <LiveProvider code={codeString} noInline={true}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    )
  } else {
    return (
      <Highlight
        {...defaultProps}
        code={codeString}
        language={language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, ...preStyle }}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    )
  }
}
