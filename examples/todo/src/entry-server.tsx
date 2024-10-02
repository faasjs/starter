import { renderToString } from 'react-dom/server'
import { createCache, StyleProvider, extractStyle } from '@ant-design/cssinjs'
import type Entity from '@ant-design/cssinjs/es/Cache'
import App from '.'
import { useMemo } from 'react'

function StyledApp() {
  const cache = useMemo<Entity>(() => createCache(), [])
  const html = renderToString(
    <StyleProvider cache={cache}>
      <App />
    </StyleProvider>
  )

  const styleText = extractStyle(cache)

  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <div dangerouslySetInnerHTML={{ __html: `${styleText}${html}` }} />;
}

export function render() {
  return renderToString(<StyledApp />, {})
}
