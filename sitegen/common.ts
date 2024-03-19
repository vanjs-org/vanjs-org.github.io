import van, { ChildDom as TypedChildDom } from "./mini-van.js"
import { HTMLDocument, Element, Text } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

type ChildDom = TypedChildDom<Element, Text>

export default (doc: HTMLDocument) => {
  const {add, tags: {a, b, blockquote, br, code, h1, h2, h3, h4, hr, i, li, pre, span, table, tbody, td, tr, ul}} = van.vanWithDoc(doc)

  const idMap: Record<string, number> = {}

  const genId = (text: string, id: string | undefined) => {
    const r = id ?? text.match(/\b(\w+)\b/g)!.map(s => s.toLowerCase()).join("-")
    const seq = idMap[r]
    idMap[r] = (seq ?? 0) + 1
    return seq ? `${r}-${seq}` : r
  }

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

  const Symbol = (...children: ChildDom[]) => code({class: "symbol"}, children)

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
    readonly description: string | readonly ChildDom[]
  }
  const DownloadRow = ({version, prefix = "", suffix, hasDts, description}: DownloadRowProps) => tr(
    td(pre({style: "margin: 0;"}, Download(`${prefix}van-${version}${suffix}.js`, true)),
      hasDts && pre({style: "margin: 0;"}, Download(`${prefix}van-${version}${suffix}.d.ts`)),
    ),
    td(description),
  )

  const InlineCode = (text: string, lang: string) => code({class: "language-" + lang}, text)

  const InlineJs = (text: string) => InlineCode(text, "js")

  interface ApiTableProps {
    readonly signature: string
    readonly description: string | readonly ChildDom[]
    readonly parameters: {[key: string]: string | readonly ChildDom[] | Element}
    readonly returns: string | readonly ChildDom[] | Element
  }
  const ApiTable = ({signature, description, parameters, returns}: ApiTableProps) =>
    table(
      tbody(
        tr(td(b("Signature")), td(InlineJs(signature))),
        tr(td(b("Description")), td(description)),
        tr(td(b("Parameters")), td(
          ul(Object.entries(parameters).map(([k, v]) => v instanceof Element ?
            v : li(b(Symbol(k)), " - ", v))),
        )),
        tr(td(b("Returns")), td(returns)),
      ),
    )

  interface CodeOptions {jsfiddleIgnore?: boolean, hidden?: boolean}
  const Code = (lang: string, text: string,
    {jsfiddleIgnore = false, hidden = false}: CodeOptions = {}) => {
    const codeDom = code({class: "language-" + lang}, text)
    if (jsfiddleIgnore) codeDom.setAttribute("data-jsfiddle-ignore", 1)
    if (hidden) codeDom.setAttribute("data-hidden", 1)
    return pre(codeDom)
  }

  interface FileOptions {trim?: boolean}
  const File = (lang: string, file: string, {trim = false}: FileOptions, codeOptions: CodeOptions) => {
    let text = Deno.readTextFileSync(file)
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
    return Code(lang, text, codeOptions)
  }

  return {
    VanJS: () => b("VanJS"),
    VanUI: () => b("VanUI"),
    VanX: () => b("VanX"),
    MiniVan: () => b("Mini-Van"),
    Demo: () => b("Demo:"),
    Caveat: () => ["⚠️ ", b("Caveat"), ": "],

    H1: (...children: readonly ChildDom[]) => h1({class: "w3-xxlarge"}, ...children),

    H2: (first: HeadingProps | ChildDom, ...rest: readonly ChildDom[]) => {
      const [props, children] =
        first?.constructor === Object ?
        [<HeadingProps>first, <readonly ChildDom[]>rest] :
        [<HeadingProps>{}, <readonly ChildDom[]>[first, ...rest]]
      return [
        addToHeading(props.id, h2({class: "w3-xxlarge w3-text-red"}), children),
        hr({style: "width:50px;border:5px solid red", class: "w3-round"}),
      ]
    },

    H3: (first: HeadingProps | ChildDom, ...rest: readonly ChildDom[]) => {
      const [props, children] =
        first?.constructor === Object ?
        [<HeadingProps>first, <readonly ChildDom[]>rest] :
        [<HeadingProps>{}, <readonly ChildDom[]>[first, ...rest]]
      return addToHeading(props.id, h3({class: "w3-large w3-text-red"}), children)
    },

    H4: (first: HeadingProps | ChildDom, ...rest: readonly ChildDom[]) => {
      const [props, children] =
        first?.constructor === Object ?
        [<HeadingProps>first, <readonly ChildDom[]>rest] :
        [<HeadingProps>{}, <readonly ChildDom[]>[first, ...rest]]
      return addToHeading(props.id, h4({class: "w3-medium w3-text-red"}), children)
    },

    BI: (text: string) => b(i(text)),

    Symbol,
    Link,
    SymLink: (symbol: string, href: string) => Symbol(Link(symbol, href)),

    Json: (text: string) => pre(code({class: "language-json"}, text)),

    Js: (text: string, options: CodeOptions = {}) => Code("js", text, options),

    JsFile: (file: string, options: FileOptions = {}, codeOptions: CodeOptions = {}) =>
      File("js", file, options, codeOptions),

    InlineJs,

    Ts: (text: string, options: CodeOptions = {}) => Code("ts", text, options),

    TsFile: (file: string, options: FileOptions = {}, codeOptions: CodeOptions = {}) =>
      File("ts", file, options, codeOptions),

    InlineTs: (text: string) => InlineCode(text, "ts"),

    Shell: (text: string, options: CodeOptions = {}) => Code("shell", text, options),

    Html: (text: string, options: CodeOptions = {}) => Code("html", text, options),

    HtmlFile: (file: string, options: FileOptions = {}, codeOptions: CodeOptions = {}) =>
      File("html", file, options, codeOptions),

    InlineHtml: (text: string) => InlineCode(text, "html"),

    Code,

    Download,
    DownloadRow,
    ApiTable,

    Quote: ({text, source}: {text: string | readonly ChildDom[], source: string}) =>
      blockquote(i(text, br(), br(), "-- " + source)),

    Url: (url: string) => Link(url, url),
  }
}
