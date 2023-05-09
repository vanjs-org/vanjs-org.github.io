import van, { ChildDom as TypedChildDom } from "./mini-van.js"
import { HTMLDocument, Element, Text } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

type ChildDom = TypedChildDom<Element, Text>

export default (doc: HTMLDocument) => {
  const {add, tags} = van.vanWithDoc(doc)
  const {a, b, br, code, i, h1, h2, h3, hr, pre, td, tr} = tags

  const genId = (text: string, id: string | undefined) =>
    id ?? text.match(/\b(\w+)\b/g)!.map(s => s.toLowerCase()).join("-")

  const addToHeading = (id: string | undefined, dom: Element, children: readonly ChildDom[]) => {
    const link = a({class: "self-link"}, children)
    add(dom, link)
    id = genId(link.innerText, id)
    dom.id = id
    link.setAttribute("href", "#" + id)
    return dom
  }

  interface HeadingProps { readonly id?: string }

  const Link = (...args: readonly unknown[]) => {
    const children = <readonly ChildDom[]>args.slice(0, -1), href = <string>args[args.length - 1]
    return a({href, class: "w3-hover-opacity"}, children)
  }

  const Symbol = (child: ChildDom) => code({class: "symbol"}, child)

  const Download = (file: string) =>
    Symbol(a({href: "/code/" + file, download: file, style: "white-space: nowrap;"}, file))
  interface DownloadRowProps {
    readonly version: string
    readonly prefix?: string
    readonly suffix: string
    readonly hasDts: boolean
    readonly description: string | readonly ChildDom[]
  }
  const DownloadRow = ({version, prefix = "", suffix, hasDts, description}: DownloadRowProps) => tr(
    td(Download(`${prefix}van-${version}${suffix}.js`),
      hasDts ? [br(), Download(`${prefix}van-${version}${suffix}.d.ts`)] : []
    ),
    td(description),
  )

  return {
    VanJS: () => b("VanJS"),

    MiniVan: () => b("Mini-Van"),

    Demo: () => b("Demo:"),

    H1: (...children: readonly ChildDom[]) => h1({class: "w3-xxlarge"}, ...children),

    H2: (first: HeadingProps | ChildDom, ...rest: readonly ChildDom[]) => {
      const [props, children] =
        first.constructor === Object ?
        [<HeadingProps>first, <readonly ChildDom[]>rest] :
        [<HeadingProps>{}, <readonly ChildDom[]>[first, ...rest]]
      return [
        addToHeading(props.id, h2({class: "w3-xxlarge w3-text-red"}), children),
        hr({style: "width:50px;border:5px solid red", class: "w3-round"}),
      ]
    },

    H3: (first: HeadingProps | ChildDom, ...rest: readonly ChildDom[]) => {
      const [props, children] =
        first.constructor === Object ?
        [<HeadingProps>first, <readonly ChildDom[]>rest] :
        [<HeadingProps>{}, <readonly ChildDom[]>[first, ...rest]]
      return addToHeading(props.id, h3({class: "w3-large w3-text-red"}), children)
    },

    BI: (text: string) => b(i(text)),

    Symbol,
    Link,
    SymLink: (symbol: string, href: string) => Symbol(Link(symbol, href)),

    Js: (text: string) => pre(code({class: "language-js"}, text)),

    InlineJs: (text: string) => code({class: "language-js"}, text),

    Ts: (text: string) => pre(code({class: "language-ts"}, text)),

    Shell: (text: string) => pre(code({class: "language-shell"}, text)),

    Html: (text: string) => pre(code({class: "language-html"}, text)),

    InlineHtml: (text: string) => code({class: "language-html"}, text),

    Download,
    DownloadRow,
  }
}