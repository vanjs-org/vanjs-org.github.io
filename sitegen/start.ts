import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags} = van.vanWithDoc(doc)
  const {div, p, table, tbody, th, thead, tr} = tags

  const {Demo, Download, DownloadRow, H1, H2, H3, Html, Js, Link, Symbol, VanJS} = common(doc)

  const version = Deno.readTextFileSync("code/van.version")

  const DownloadTable = ({version}: {version: string}) => table({class: "download-table"},
    thead(tr(th("Files"), th("Description"))),
    tbody(
      DownloadRow({
        version,
        suffix: ".min",
        hasDts: true,
        description: "Minified script file for ES6 modules, optimized for bundle size.",
      }),
      DownloadRow({
        version,
        suffix: "",
        hasDts: true,
        description: "The source file without minification.",
      }),
      DownloadRow({
        version,
        suffix: ".debug",
        hasDts: true,
        description: ["The script file for debugging purpose, compared to ", Symbol(`van-${version}.js`), ", it adds additional saninty checks, such as type-checking, including the checkings that are impossible to do with TypeScript. Using this file for development purpose will detect issues earlier and produce more meaningful error messages."],
      }),
      DownloadRow({
        version,
        suffix: ".nomodule.min",
        description: ["Similar to ", Symbol(`van-${version}.min.js`), ", but designed to work in non-module context, such as inline JavaScript or ", Symbol('<script type="text/javascript">'), "."],
      }),
      DownloadRow({
        version,
        suffix: ".nomodule",
        description: ["Similar to ", Symbol(`van-${version}.js`), ", but designed to work in non-module context, such as inline JavaScript or ", Symbol('<script type="text/javascript">'), "."],
      }),
      DownloadRow({
        version,
        suffix: ".nomodule.debug",
        description: ["Similar to ", Symbol(`van-${version}.debug.js`), ", but designed to work in non-module context, such as inline JavaScript or ", Symbol('<script type="text/javascript">'), "."],
      }),
    ),
  )

  return div({id: "content"},
    H1(VanJS(), ": Getting Started"),
    p("To get started, add the line below to your script:"),
    Js(`import van from "https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-${version}.min.js"`),
    p("To code without ES6 modules, add the following line to your HTML file instead:"),
    Html(`<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-${version}.nomodule.min.js"></script>`),
    p("Alternative, you can download the files (", Download(`van-${version}.min.js`), ", ", Download(`van-${version}.nomodule.min.js`), ") and serve them locally."),
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

  const helloText = van.bind(headingSpaces, trailingUnderscores,
    (h, t) => \`\${" ".repeat(h)}🚐💨Hello VanJS!\${"_".repeat(t)}\`)
  return div(pre(helloText))
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
    p("The current version of ", VanJS(), " is ", Symbol(version), " (", Link("announcement", "https://github.com/vanjs-org/van/discussions/53#discussioncomment-6463621"), "). You can find all relevant ", VanJS(), " files to download in the table below:"),
    div("Click the link to download the file, or 📋 to copy the import line from CDN."),
    DownloadTable({version}),
    H2("Historical Versions"),
    H3("0.12.3"),
    p(Link("Announcement", "https://github.com/vanjs-org/van/discussions/53#discussioncomment-6223903")),
    DownloadTable({version: "0.12.3"}),
    H3("0.12.2"),
    p(Link("Announcement", "https://github.com/vanjs-org/van/discussions/53#discussioncomment-6142154")),
    DownloadTable({version: "0.12.2"}),
    H3("0.12.1"),
    p(Link("Announcement", "https://github.com/vanjs-org/van/discussions/53#discussioncomment-6137688")),
    DownloadTable({version: "0.12.1"}),
    H3("0.12.0"),
    p(Link("Announcement", "https://github.com/vanjs-org/van/discussions/53")),
    DownloadTable({version: "0.12.0"}),
    H3("0.11.11"),
    p(Link("Announcement", "https://github.com/vanjs-org/van/discussions/44")),
    DownloadTable({version: "0.11.11"}),
    H3("0.11.10"),
    p(Link("Announcement", "https://github.com/vanjs-org/van/discussions/6")),
    DownloadTable({version: "0.11.10"}),
    H3("0.11.9 (First Public Release)"),
    p("This is the first public release of ", VanJS(), ". See the ", Link("announcement", "https://www.linkedin.com/posts/tao-xin-64234920_github-vanjs-orgvan-vanjs-an-ultra-lightweight-activity-7062813716383219713-CI4O"), "."),
    DownloadTable({version: "0.11.9"}),
  )
}
