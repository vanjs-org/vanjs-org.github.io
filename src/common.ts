import type { VanParam, VanObj, VanReturn, JsFiddle } from "./type"
import fs from "fs"
import { join } from "path"

const ctx = new Map<VanObj, {obj: JsFiddle, el: VanReturn}[]>()
export function addContext(obj: VanObj, list: {obj: JsFiddle, el: VanReturn}[]) {
  ctx.set(obj, list)
  return () => {
    ctx.delete(obj)
  }
}
function pushToContext(v: VanObj, obj: unknown) {
  const c = ctx.get(v)
  if (c) {
    c.push(obj)
  } else {
    throw new Error("No context")
  }
}

export default (van: VanObj) => {
  const {add, tags: {a, b, blockquote, br, code, h1, h2, h3, h4, hr, i, li, pre, span, table, tbody, td, tr, ul}} = van

  const idMap: Record<string, number> = {}

  const genId = (text: string, id: string | undefined) => {
    const r = id ?? text.match(/\b(\w+)\b/g)!.map(s => s.toLowerCase()).join("-")
    const seq = idMap[r]
    idMap[r] = (seq ?? 0) + 1
    return seq ? `${r}-${seq}` : r
  }

  const addToHeading = (id: string | undefined, dom: Element, children: readonly VanParam[]) => {
    const link = a({class: "self-link"}, children)
    add(dom, link)
    id = genId(link.innerHTML, id)
    dom.id = id
    link.setAttribute("href", "#" + id)
    return dom
  }

  interface HeadingProps { readonly id?: string }

  const Link = (...args: readonly unknown[]) => {
    const children = <readonly VanParam[]>args.slice(0, -1), href = <string>args[args.length - 1]
    return a({href, class: "w3-hover-opacity"}, children)
  }

  const Symbol = (...children: VanParam[]) => code({class: "symbol"}, children)

  const CopyButton = () => a({class: "copy", onclick: "copy(this)", onmouseout: "resetTooltip(this)"},
    span({class: "tooltip"}, "Copy import line"),
    "📋",
  )

  const Download = (file: string, hasCopyButton?: boolean) => Symbol(
    a({href: "/code/" + file, download: file, style: "white-space: nowrap;", title: "Download " + file}, file),
    hasCopyButton && CopyButton(),
  )

  interface DownloadRowProps {
    readonly version: string
    readonly prefix?: string
    readonly suffix: string
    readonly hasDts?: true
    readonly description: string | readonly VanParam[]
  }
  const DownloadRow = ({version, prefix = "", suffix, hasDts, description}: DownloadRowProps) => tr(
    td(pre({style: "margin: 0;"}, Download(`${prefix}van-${version}${suffix}.js`, true)),
      hasDts && pre({style: "margin: 0;"}, Download(`${prefix}van-${version}${suffix}.d.ts`)),
    ),
    td(description),
  )

  const InlineJs = (text: string) => code({class: "language-js"}, text)

  interface ApiTableProps {
    readonly signature: string
    readonly description: string | readonly VanParam[]
    readonly parameters: {[key: string]: string | readonly VanParam[] | Element}
    readonly returns: string | readonly VanParam[] | Element
  }
  const ApiTable = ({signature, description, parameters, returns}: ApiTableProps) =>
    table(
      tbody(
        tr(td(b("Signature")), td(InlineJs(signature))),
        tr(td(b("Description")), td(description)),
        tr(td(b("Parameters")), td(
          // ul(Object.entries(parameters).map(([k, v]) => v instanceof HTMLElement ?
          //   v : li(b(Symbol(k)), " - ", v))),
          ul(Object.entries(parameters).map(([k, v]) => li(b(Symbol(k)), " - ", v))),
        )),
        tr(td(b("Returns")), td(returns)),
      ),
    )

  interface FileOptions {trim?: boolean}
  const File = (lang: string, file: string, {trim = false}: FileOptions) => {
    let text = fs.readFileSync(join('.', 'assert', file), "utf8")
    if (trim) {
      const lines = text.split("\n")
      const tagImportingLine = lines.findIndex(l => l.includes("= van.tags"))
      const addToBodyLine = lines.findIndex(l => l.includes("van.add(document.body"))
      let firstLine = tagImportingLine + 1
      while (!lines[firstLine]) ++firstLine
      let lastLine = addToBodyLine - 1
      while (!lines[lastLine]) --lastLine
      text = lines.slice(firstLine, lastLine + 1).map(l => l + "\n").join("")
    }
    return pre(code({class: "language-" + lang}, text))
  }

  return {
    VanJS: () => b("VanJS"),
    VanUI: () => b("VanUI"),
    VanX: () => b("VanX"),
    MiniVan: () => b("Mini-Van"),
    Demo: () => b("Demo:"),
    Caveat: () => ["⚠️ ", b("Caveat"), ": "],

    H1: (...children: readonly VanParam[]) => h1({class: "w3-xxlarge"}, ...children),

    H2: (first: HeadingProps | VanParam, ...rest: readonly VanParam[]) => {
      const [props, children] =
        first?.constructor === Object ?
        [<HeadingProps>first, <readonly VanParam[]>rest] :
        [<HeadingProps>{}, <readonly VanParam[]>[first, ...rest]]
      return [
        addToHeading(props.id, h2({class: "w3-xxlarge w3-text-red"}), children),
        hr({style: "width:50px;border:5px solid red", class: "w3-round"}),
      ]
    },

    H3: (first: HeadingProps | VanParam, ...rest: readonly VanParam[]) => {
      const [props, children] =
        first?.constructor === Object ?
        [<HeadingProps>first, <readonly VanParam[]>rest] :
        [<HeadingProps>{}, <readonly VanParam[]>[first, ...rest]]
      return addToHeading(props.id, h3({class: "w3-large w3-text-red"}), children)
    },

    H4: (first: HeadingProps | VanParam, ...rest: readonly VanParam[]) => {
      const [props, children] =
        first?.constructor === Object ?
        [<HeadingProps>first, <readonly VanParam[]>rest] :
        [<HeadingProps>{}, <readonly VanParam[]>[first, ...rest]]
      return addToHeading(props.id, h4({class: "w3-medium w3-text-red"}), children)
    },

    BI: (text: string) => b(i(text)),

    Symbol,
    Link,
    SymLink: (symbol: string, href: string) => Symbol(Link(symbol, href)),

    Json: (text: string) => pre(code({class: "language-json"}, text)),

    Js: (text: string) => pre(code({class: "language-js"}, text)),

    JsFile: (file: string, options: FileOptions = {}) => File("js", file, options),

    InlineJs,

    Ts: (text: string) => pre(code({class: "language-ts"}, text)),

    TsFile: (file: string, options: FileOptions = {}) => File("ts", file, options),

    InlineTs: (text: string) => code({class: "language-ts"}, text),

    Shell: (text: string) => pre(code({class: "language-shell"}, text)),

    Html: (text: string) => pre(code({class: "language-html"}, text)),

    HtmlFile: (file: string, options: FileOptions = {}) => File("html", file, options),

    InlineHtml: (text: string) => code({class: "language-html"}, text),

    Code: (text: string) => pre(code({class: "language-"}, text)),

    Download,
    DownloadRow,
    ApiTable,

    User: (id: string) => Link("@" + id, "https://github.com/" + id),

    Quote: ({text, source}: {text: string | readonly VanParam[], source: string}) =>
      blockquote(i(text, br(), br(), "-- " + source)),

    Url: (url: string) => Link(url, url),

    jsFiddle: (obj: JsFiddle) => {
      const {p} = van.tags
      const el = p()
      pushToContext(van, {obj, el})
      return el
    }
  }
}
