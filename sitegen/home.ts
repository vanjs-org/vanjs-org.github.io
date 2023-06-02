import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags} = van.vanWithDoc(doc)
  const {a, b, blockquote, br, div, i, li, p, path, span, svg, ul} = tags

  const {BI, Demo, H1, H2, H3, Js, Link, MiniVan, Symbol, VanJS} = common(doc)

  const Quote = ({text, source}: {text: string, source: string}) =>
    blockquote(i(text, br(), br(), "-- " + source))

  return div({id: "content"},
    H1(VanJS(), ": A 1.2kB Grab 'n Go Reactive UI Framework without React/JSX"),
    blockquote(i("Enable everyone to build useful UI apps with a few lines of code, anywhere, any time, on any device.")),
    p((VanJS()), " (abbr. ", b("Van"), "illa ", b("J"), "ava", b("S"), "cript) is an ", BI("ultra-lightweight"), ", ", BI("zero-dependency"), ", and ", BI("unopinionated"), " Reactive UI framework based on pure vanilla JavaScript and DOM. Programming with ", VanJS(), " feels like building React apps in a ", Link("scripting language", "/about#story"), ", without JSX", ". Check-out the ", Symbol("Hello World"), " code below:"),
    Js(`// Reusable components can be just pure vanilla JavaScript functions.
// Here we capitalize the first letter to follow React conventions.
const Hello = () => div(
  p("👋Hello"),
  ul(
    li("🗺️World"),
    li(a({href: "https://vanjs.org/"}, "🍦VanJS")),
  ),
)

van.add(document.body, Hello())
// Alternatively, you can write:
// document.body.appendChild(Hello())
`),
    p({
      id: "jsfiddle-hello",
      "data-prefix": "const {a, div, li, p, ul} = van.tags",
    }),
    p("You can convert any HTML snippet into ", VanJS(), " code with our online ", Link("converter", "/convert"), "."),
    p({id: "code-counter"}, VanJS(), " helps you manage states and UI bindings as well, with a more natural API:"),
    Js(`const Counter = () => {
  const counter = van.state(0)
  return span(
    "❤️ ", counter, " ",
    button({onclick: () => ++counter.val}, "👍"),
    button({onclick: () => --counter.val}, "👎"),
  )
}

van.add(document.body, Counter())
`),
    p(Demo(), " ", span({id: "demo-counter"})),
    p({
      id: "jsfiddle-counter",
      "data-prefix": "const {button, span} = van.tags",
    }),
    H2("Why VanJS?"),
    H3("Reactive Programming without React/JSX"),
    p("Declarative DOM tree composition, reusable components, reactive state binding - ", VanJS(), " offers every good aspect that React does, but without the need of React, JSX, transpiling, virtual DOM, or any hidden logic. Everything is built with simple JavaScript functions and DOM."),
    H3("Grab 'n Go"),
    p(BI("No installation"), ", ", BI("no configuration"), ", ", BI("no 3rd-party dependencies"), ", ", BI("no transpiling"), ", ", BI("no IDE setups"), ". Adding a line to your script or HTML file is all you need to start coding. ", VanJS(), " allows you to focus on the business logic of your application, rather than getting bogged down in frameworks and tools."),
    H3("Ultra-Lightweight"),
    p(VanJS(), " is a very thin layer on top of Vanilla JavaScript and DOM, barely enough to make the DOM manipulation and state binding as ergonomic as (if not more than) React, and it delegates most of work to standard browser APIs implemented in native code. As a result, the bundled size of ", VanJS(), " is just 1.2kB, which is ", b("more than 100 times"), " smaller than most popular UI frameworks, making it the smallest reactive UI framework in the world:"),
    p({id: "size-comp"}),
    Quote({
      text: "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.",
      source: "Antoine de Saint-Exupéry, Airman's Odyssey",
    }),
    H3("TypeScript Support"),
    p(VanJS(), " provides first-class support for TypeScript. Simply download the corresponding ", Symbol(".d.ts"), " file along with your ", Symbol(".js") ," file, and you'll be able to take advantage of type-checking, IntelliSense, large-scale refactoring provided by your preferred development environment. Refer to the ", Link("Download Table", "/start#download-table"), " to find the right ", Symbol(".d.ts"), " file to work with."),
    H3("Easy to Learn"),
    p(VanJS(), " puts heavy emphasis on the simplicity of the framework. There are only 4 exported functions in the API and feels a lot like React. Because of that, the ", Link("walkthrough tutorial", "/tutorial"), " is the same as the full API referrence, and can be learned within 1 hour for most developers."),
    H2("Want to Learn More?"),
    ul(
      li("Download and ", Link("Get Started", "/start")),
      li("Learn from the ", Link("Tutorial", "/tutorial")),
      li("Learn by ", Link("Examples", "/demo"), " (and also ", Link("Community Examples", "/demo#community-examples"), ")"),
      li("Convert HTML snippet to ", VanJS(), " code with our online ", Link("HTML to ", VanJS(), " Converter", "/convert")),
      li("Want server-side rendering? Check out ", Link("Mini-Van", "/minivan"), " (the entire vanjs.org site is built on top of ", MiniVan(), ")"),
      li("For questions, feedback or general discussions, visit our ", Link("Discussions", "https://github.com/vanjs-org/van/discussions"), " page"),
    ),
    H2("Source Code"),
    p({style: "display: flex; align-items: center;"},
      svg({height: "16", "aria-hidden": "true", viewBox: "0 0 16 16", version: "1.1", width: "16", "data-view-component": "true", class: "octicon octicon-mark-github v-align-middle", style: "margin-right: 6px;"},
        path({"d": "M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"}),
      ),
      Link("github.com/vanjs-org/van", "https://github.com/vanjs-org/van"),
    ),
    H2("Support & Feedback"),
    p("🙏 ", VanJS(), " aims to build a better world by reducing the entry barrier for UI programming, with no intention or plan on commercialization whatsoever. If you find ", VanJS(), " interesting, or could be useful for you some day, please consider starring the project on ", Link("GitHub", "https://github.com/vanjs-org/van"), ". It takes just a few seconds but your support means the world to us and helps spread ", VanJS(), " to a wider audience."),
    p("We're looking for the 1.0 milestone (commitment to API stability) soon, your precious feedback will be greatly appreciated. You can submit your feedback in our Discussions page."),
    p(
      a({class: "github-button", href: "https://github.com/vanjs-org/van", "data-icon": "octicon-star", "data-show-count": true, "aria-label": "Star vanjs-org/van on GitHub"},
        "Star",
      ), " ",
      a({class: "github-button", href: "https://github.com/vanjs-org/van/subscription", "data-icon": "octicon-eye", "data-show-count": false, "aria-label": "Watch vanjs-org/van on GitHub"},
        "Watch",
      ), " ",
      a({class: "github-button", href: "https://github.com/vanjs-org/van/discussions", "data-icon": "octicon-comment-discussion", "aria-label": "Discuss buttons/github-buttons on GitHub"},
        "Discuss",
      ), " ",
      a({class: "github-button", href: "https://github.com/vanjs-org/van/issues", "data-icon": "octicon-issue-opened", "data-show-count": false, "aria-label": "Issue vanjs-org/van on GitHub"},
        "Issue",
      ), " ",
      a({class: "github-button", href: "https://github.com/vanjs-org", "aria-label": "Follow @vanjs-org on GitHub"},
        "Follow @vanjs-org",
      ),
    ),
    p("Contact us: ", Link("tao@vanjs.org", "mailto:tao@vanjs.org"), " / ", Link("Tao Xin", "https://www.linkedin.com/in/tao-xin-64234920/")),
  )
}
