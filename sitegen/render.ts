import van from "./mini-van.js"
import { DOMParser, HTMLDocument, Element } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

import common from "./common.ts"
import home from "./home.ts"
import start from "./start.ts"
import tutorial from "./tutorial.ts"
import demo from "./demo.ts"
import convert from "./convert.ts"
import minivan from "./minivan.ts"
import advanced from "./advanced.ts"
import media from "./media.ts"
import about from "./about.ts"

const templateStr = Deno.readTextFileSync("template.html")

const renderPage = (page: (doc: HTMLDocument) => Element, path: string, file: string,
  title: string) => {
  const doc = new DOMParser().parseFromString(templateStr, "text/html")!

  const {tags} = van.vanWithDoc(doc)
  const {a, aside, div, li, ul} = tags

  const {Link} = common(doc)

  const shortTitleToPath = [
    ["Home", ""],
    ["Getting Started", "start"],
    ["Tutorial", "tutorial"],
    ["VanJS by Example", "demo"],
    ["Convert HTML to VanJS", "convert"],
    ["Mini-Van", "minivan"],
    ["Advanced Topics", "advanced"],
    ["Media Mentions", "media"],
    ["About", "about"],
  ]

  const Nav = ({page}: {page: string}) => div({id: "nav", class: "w3-bar-block"},
    shortTitleToPath.map(([title, path]) => {
      let className = "w3-bar-item w3-button w3-hover-white"
      if (path === page) className += " current"
      return a({href: `/${path}`, onclick: "w3_close()", className}, title)
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
  if (title === "Home") docTitle = "Incredibly Powerful, Insanely Small"
  if (title === "Mini-Van")
    doc.querySelector("title")!.innerText = "Mini-Van - A Minimalist Template Engine for Client/Server-side Rendering"; else
    doc.querySelector("title")!.innerText += " - " + docTitle
  let shortTitle = shortTitleToPath.find(([_, p]) => p === path)![0]
  if (shortTitle === "Home") shortTitle = "VanJS"
  else if (shortTitle === "Tutorial") shortTitle = "VanJS Tutorial"
  doc.getElementById("title-bar")!.innerText = shortTitle
  doc.getElementById("nav")!.replaceWith(Nav({page: path}))
  const pageDom = page(doc)
  doc.getElementById("content")!.replaceWith(pageDom)
  doc.getElementById("toc")!.replaceWith(Toc(pageDom))
  try {
    doc.querySelector("script[type=module]")!.innerText =
      Deno.readTextFileSync(`${path === "" ? "home" : path}.js`)
    doc.querySelector("script.inline")!.innerText =
      Deno.readTextFileSync(`${path === "" ? "home" : path}.inline.js`)
  } catch (e) {
    if (!(e instanceof Deno.errors.NotFound)) throw e
  }
  Deno.writeTextFileSync(file, "<!DOCTYPE html>\n" + doc.documentElement!.outerHTML)
}

renderPage(home, "", "index.html", "Home")
renderPage(start, "start", "start.html", "Getting Started")
renderPage(tutorial, "tutorial", "tutorial.html", "Tutorial and API Reference")
renderPage(demo, "demo", "demo.html", "Learning by Example")
renderPage(convert, "convert", "convert.html", "Convert HTML Snippet to 🍦VanJS Code")
renderPage(minivan, "minivan", "minivan.html", "Mini-Van")
renderPage(advanced, "advanced", "advanced.html", "Advanced Topics")
renderPage(media, "media", "media.html", "Media Mentions")
renderPage(about, "about", "about.html", "About")
