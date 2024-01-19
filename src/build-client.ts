import type { Van } from 'vanjs-core'
import { Nav } from './build-nav.js'
import { render } from './render.macros.js'
declare global {
  const van: Van
}

const state = van.state(location.pathname.slice(1))

function click(path: string) {
  const d = (render as Awaited<ReturnType<typeof render>>).find(e => e.path === path)
  const { script } = van.tags
  if (!d) return
  return (e: MouseEvent) => {
    e.preventDefault()
    document.getElementById('content').outerHTML = d.body
    document.getElementById('toc').outerHTML = d.toc
    const placeholderDom = document.getElementById("script-placeholder")!
    placeholderDom.innerHTML = ""
    for (const src of d.scripts) {
      placeholderDom.appendChild(script({ type: "text/javascript", src, defer: true }))
    }
    history.pushState({}, d.title, path || '/')
    state.val = path
  }
}
van.hydrate(document.getElementById('nav'), (el) => {
  return Nav(van, (render as Awaited<ReturnType<typeof render>>).map(e => [e.name, e.path]), state, click)
})
