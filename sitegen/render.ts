import van from "./mini-van.js"
import { DOMParser, HTMLDocument, Element } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

import common from "./common.ts"
import home from "./home.ts"
import start from "./start.ts"
import tutorial from "./tutorial.ts"
import demo from "./demo.ts"
import convert from "./convert.ts"
import vanui from "./vanui.ts"
import minivan from "./minivan.ts"
import ssr from "./ssr.ts"
import x from "./x.ts"
import advanced from "./advanced.ts"
import media from "./media.ts"
import about from "./about.ts"

import converterLib from "./convert-lib.ts"

const scripts = {
  prism: "/prism.js",
  chart: "https://www.gstatic.com/charts/loader.js",
  diff: "/code/diff.min.js",
  van: "/code/van-latest.nomodule.min.js",
  vanX: "/code/van-x.nomodule.min.js",
}

const pageToScripts = {
  "": [scripts.prism, scripts.chart, scripts.van],
  start: [scripts.prism, scripts.van],
  tutorial: [scripts.prism, scripts.van],
  demo: [scripts.prism, scripts.van, scripts.diff, scripts.chart, scripts.vanX],
  convert: [scripts.prism, scripts.van],
  vanui: [scripts.prism],
  minivan: [scripts.prism],
  ssr: [scripts.prism],
  x: [scripts.prism, scripts.van, scripts.vanX],
  advanced: [scripts.prism, scripts.van],
  media: [],
  about: [scripts.prism],
  "converter-lib": [scripts.prism],
}

type Path = keyof typeof pageToScripts

const templateStr = Deno.readTextFileSync("template.html")

const renderPage = (page: (doc: HTMLDocument) => Element, path: Path, file: string,
  title: string) => {
  const doc = new DOMParser().parseFromString(templateStr, "text/html")!
  const {tags: {a, aside, div, li, link, script, ul}} = van.vanWithDoc(doc)
  const {Link} = common(doc)

  const shortTitleToPath = [
    ["Home", ""],
    ["Getting Started", "start"],
    ["Tutorial", "tutorial"],
    ["VanJS by Example", "demo"],
    ["HTML/MD to VanJS", "convert"],
    ["VanUI", "vanui"],
    ["Mini-Van", "minivan"],
    ["SSR & Hydration", "ssr"],
    ["X", "x"],
    ["Advanced Topics", "advanced"],
    ["Media Coverage", "media"],
    ["About", "about"],
  ]

  const Nav = ({page}: {page: string}) => div({id: "nav", class: "w3-bar-block"},
    shortTitleToPath.map(([title, path]) => {
      const className = "w3-bar-item w3-button w3-hover-white" + (path === page ? " current" : "")
      return a({href: path.startsWith("https://") ? path : `/${path}`, onclick: "w3_close()", class: className}, title)
    }),
  )

  const Toc = (pageDom: Element) => {
    const headers = <Element[]>[...pageDom.querySelectorAll("h2,h3")]
    const List = (headers: readonly Element[], level: number): Element | [] => {
      if (headers.length === 0) return []
      const tagName = "H" + level
      const indexes = headers.flatMap((dom, i) => dom.tagName === tagName ? i : [])
      return ul(indexes.map((index, i) => li(
        Link(headers[index].innerText, "#" + headers[index].id),
        List(headers.slice(index + 1, indexes[i + 1]), level + 1),
      )))
    }

    return aside({id: "toc"},
      headers.length > 0 ? [
        List(headers, 2),
      ] : [],
    )
  }

  console.log(`Rendering ${file}...`)

  let docTitle = title
  if (title === "Home") docTitle = "A 1.0kB No-JSX Framework Based on Vanilla JavaScript"
  if (title === "Mini-Van")
    doc.querySelector("title")!.innerText = "Mini-Van - A Minimalist Template Engine for Client/Server-side Rendering"
  else if (title === "VanUI")
    doc.querySelector("title")!.innerText = "VanUI - A Collection of Grab 'n Go Reusable UI Components for VanJS"
  else if (title === "VanX")
    doc.querySelector("title")!.innerText = "VanX - The 1.0 kB Official VanJS Extension"
  else
    doc.querySelector("title")!.innerText += " - " + docTitle
  let shortTitle = shortTitleToPath?.find(([_, p]) => p === path)?.[0] ?? ""
  if (shortTitle === "Home") shortTitle = "VanJS"
  else if (shortTitle === "Tutorial") shortTitle = "VanJS Tutorial"
  doc.getElementById("title-bar")!.innerText = shortTitle
  doc.getElementById("nav")!.replaceWith(Nav({page: path}))
  const pageDom = page(doc)
  doc.getElementById("content")!.replaceWith(pageDom)
  doc.getElementById("toc")!.replaceWith(Toc(pageDom))

  const placeholderDom = doc.getElementById("script-placeholder")!
  for (const src of pageToScripts[path])
    doc.body.insertBefore(script({type: "text/javascript", src, defer: ""}), placeholderDom)
  try {
    const src = `${path === "" ? "home" : path}.js`
    Deno.lstatSync(src)
    doc.body.insertBefore(script({type: "text/javascript", src, defer: ""}), placeholderDom)
  } catch (e) {
    if (!(e instanceof Deno.errors.NotFound)) throw e
  }
  placeholderDom.remove()

  for (const href of Object.values(scripts))
    doc.body.appendChild(link({rel: "prefetch", href, as: "script"}))

  Deno.writeTextFileSync(file, "<!DOCTYPE html>\n" + doc.documentElement!.outerHTML)
}

renderPage(home, "", "index.html", "Home")
renderPage(start, "start", "start.html", "Getting Started")
renderPage(tutorial, "tutorial", "tutorial.html", "Tutorial and API Reference")
renderPage(demo, "demo", "demo.html", "Learning by Example")
renderPage(convert, "convert", "convert.html", "HTML/MD Snippet to 🍦VanJS Code")
renderPage(vanui, "vanui", "vanui.html", "VanUI")
renderPage(minivan, "minivan", "minivan.html", "Mini-Van")
renderPage(ssr, "ssr", "ssr.html", "Fullstack Rendering (SSR, CSR and Hydration)")
renderPage(x, "x", "x.html", "VanX")
renderPage(advanced, "advanced", "advanced.html", "Advanced Topics")
renderPage(media, "media", "media.html", "Media Coverage")
renderPage(about, "about", "about.html", "About")

renderPage(converterLib, "converter-lib", "converter-lib.html", "MD and HTML to VanJS Code Converter")
