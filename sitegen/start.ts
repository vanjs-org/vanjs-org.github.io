import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags: {div, p}} = van.vanWithDoc(doc)
  const {Demo, Download, H1, H2, H3, Html, InlineHtml, Js, Link, Shell, SymLink, Symbol, Ts, VanJS} = common(doc)

  const version = Deno.readTextFileSync("code/van.version")

  return div({id: "content"},
    H1(VanJS(), ": Getting Started"),
    p("To get started, add the line below to your script:"),
    Js(`import van from "https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-${version}.min.js"`),
    p("To code without ES6 modules, add the following line to your HTML file instead:"),
    Html(`<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-${version}.nomodule.min.js"></script>`),
    p("Alternative, you can download the files (", Download(`van-${version}.min.js`), ", ", Download(`van-${version}.nomodule.min.js`), ") and serve them locally."),
    H2("NPM Integration"),
    p("It's also possible to integrate with ", VanJS(), " via NPM, making it handy to build web applications with tools like ", Link("Vite", "https://vitejs.dev/"), " or ", Link("Parcel", "https://parceljs.org/"), ". You can also build your own NPM packages that depend on ", VanJS(), ". To get started with ", VanJS(), " via NPM, run:"),
    Shell("npm install vanjs-core"),
    p("To use the ", VanJS(), " NPM package, add this line to your script:"),
    Js(`import van from "vanjs-core"`),
    p("or this line if you want to import the debug version of ", VanJS(), ":"),
    Js(`import van from "vanjs-core/debug"`),
    p("You can check out the ", SymLink("Hello World", "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/npm-examples/hello?file=%2Fsrc%2Fmain.ts%3A1%2C1"), " app built with ", VanJS(), " NPM + Vite (", Link("source code", "https://github.com/vanjs-org/van/tree/main/npm-examples/hello"), ")."),
    H2("TypeScript Support for Non-NPM Integration"),
    H3("For ESM Modules"),
    p("To get TypeScript support for your ESM modules, download the corresponding ", Symbol(".d.ts"), " file from the ", Link("Download Table", "#download-table"), " and store it alongside the ", Symbol(".js"), " source file, and then import the ", Symbol(".js"), " file as normal:"),
    Js(`import van from "./van-${version}.min.js"`),
    H3("For Script Tag"),
    p("To get TypeScript support for code that would be imported via a ", InlineHtml(`<script>`), " tag, download a ", Symbol(".d.ts"), " file from the ", Link("Download Table", "#download-table"), " (any file from the table would work), and then add the following code at the top of your ", Symbol(".ts"), " file:"),
    Ts(`import type { Van } from "./van-${version}.d.ts"

declare const van: Van
`),
    H2("Test It Out"),
    p("The following code will produce a funnier ", Symbol("Hello"), " component:"),
    Js(`const {button, div, pre} = van.tags

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const Run = ({sleepMs}) => {
  const steps = van.state(0)
  ;(async () => { for (; steps.val < 40; ++steps.val) await sleep(sleepMs) })()
  return pre(() => \`\${" ".repeat(40 - steps.val)}🚐💨Hello VanJS!\${"_".repeat(steps.val)}\`)
}

const Hello = () => {
  const dom = div()
  return div(
    dom,
    button({onclick: () => van.add(dom, Run({sleepMs: 2000}))}, "Hello 🐌"),
    button({onclick: () => van.add(dom, Run({sleepMs: 500}))}, "Hello 🐢"),
    button({onclick: () => van.add(dom, Run({sleepMs: 100}))}, "Hello 🚶‍♂️"),
    button({onclick: () => van.add(dom, Run({sleepMs: 10}))}, "Hello 🏎️"),
    button({onclick: () => van.add(dom, Run({sleepMs: 2}))}, "Hello 🚀"),
  )
}

van.add(document.body, Hello())
`),
    p(Demo()),
    p({id: "demo-hello-fun"}),
    p({id: "jsfiddle-hello-fun"}),
    H2({id: "download-table"}, "Download Table"),
    div({id: "download-table-div"}),
  )
}
