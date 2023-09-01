import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags: {div, p}} = van.vanWithDoc(doc)
  const {Demo, Download, H1, H2, Html, Js, Link, Shell, Symbol, SymLink, VanJS} = common(doc)

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
    H2("Test It Out"),
    p("The following code will produce a funnier ", Symbol("Hello"), " component:"),
    Js(`const {button, div, pre} = van.tags

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const Run = ({sleepMs}) => {
  const headingSpaces = van.state(40), trailingUnderscores = van.state(0)

  const animate = async () => {
    while (headingSpaces.val > 0) {
      await sleep(sleepMs)
      --headingSpaces.val, ++trailingUnderscores.val
    }
  }
  animate()

  return pre(() =>
    \`\${" ".repeat(headingSpaces.val)}🚐💨Hello VanJS!\${"_".repeat(trailingUnderscores.val)}\`)
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
