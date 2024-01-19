import common from "../common"
import type { VanObj } from "../type"

export default (van: VanObj) => {
  const {a, b, blockquote, div, g, i, img, input, label, li, p, path, span, svg, title, ul} = van.tags
  const {BI, Demo, H1, H2, H3, Js, Link, MiniVan, Quote, Symbol, VanJS, VanUI, VanX, jsFiddle} = common(van)

  const mailIcon = svg({viewBox: "0 0 16 16", version: "1.1", width: 16, height: 16, "aria-hidden": true},
    path({"d": "M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z"}),
  )

  const linkedInIcon = svg({xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", role: "img", "aria-labelledby": "e723dcjjyhqiunljk7lgl7qrcshazrj"},
    title({id: "e723dcjjyhqiunljk7lgl7qrcshazrj"},
      "LinkedIn",
    ),
    g({"clip-path": "url(#clip0_202_91845)"},
      path({"d": "M14.5455 0H1.45455C0.650909 0 0 0.650909 0 1.45455V14.5455C0 15.3491 0.650909 16 1.45455 16H14.5455C15.3491 16 16 15.3491 16 14.5455V1.45455C16 0.650909 15.3491 0 14.5455 0ZM5.05746 13.0909H2.912V6.18764H5.05746V13.0909ZM3.96291 5.20073C3.27127 5.20073 2.712 4.64 2.712 3.94982C2.712 3.25964 3.272 2.69964 3.96291 2.69964C4.65236 2.69964 5.21309 3.26036 5.21309 3.94982C5.21309 4.64 4.65236 5.20073 3.96291 5.20073ZM13.0938 13.0909H10.9498V9.73382C10.9498 8.93309 10.9353 7.90327 9.83491 7.90327C8.71855 7.90327 8.54691 8.77527 8.54691 9.67564V13.0909H6.40291V6.18764H8.46109V7.13091H8.49018C8.77673 6.58836 9.47636 6.016 10.52 6.016C12.6924 6.016 13.0938 7.44582 13.0938 9.30473V13.0909V13.0909Z", fill: "currentColor"}),
    ),
  )

  const twitterIcon = svg({xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 273.5 222.3", role: "img", "aria-labelledby": "cidgm4oxr0wshcfdknknay597vhlet4", height: 16, width: 16},
    title({id: "cidgm4oxr0wshcfdknknay597vhlet4"},
      "Twitter",
    ),
    path({"d": "M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1", fill: "currentColor"}),
  )

  const GithubIcon = ({style}: {style?: string}) => svg({...(style ? {style} : {}), height: 16, "aria-hidden": true, viewBox: "0 0 16 16", version: "1.1", width: 16, "data-view-component": true},
    path({"d": "M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"}),
  )

  const VSCodeIcon = ({style}: {style?: string}) => img({...(style ? {style} : {}), src: "/vs-code-16x16.png", height: "16", width: "16", "aria-hidden": true})

  return div({id: "content"},
    H1(VanJS(), ": A 0.9kB Grab 'n Go Reactive UI Framework without React/JSX"),
    p(
      div("📣 ", Link("Introducing ", VanX(), " →", "https://github.com/vanjs-org/van/discussions/144")),
      div("📣 ", Link("Introducing ", VanJS(), " App Builder →", "https://github.com/vanjs-org/van/discussions/179")),
    ),
    blockquote(i("Enable everyone to build useful UI apps with a few lines of code, anywhere, any time, on any device.")),
    p((VanJS()), " (", Link("abbreviated ", b("Van"), "illa ", b("J"), "ava", b("S"), "cript", "/about#name"), ") is an ", BI("ultra-lightweight"), ", ", BI("zero-dependency"), ", and ", BI("unopinionated"), " Reactive UI framework based on pure vanilla JavaScript and DOM. Programming with ", VanJS(), " feels like building React apps in a ", Link("scripting language", "/about#story"), ", without JSX", ". Check-out the ", Symbol("Hello World"), " code below:"),
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
    jsFiddle({id: "hello", 'data-prefix': "const {a, div, li, p, ul} = van.tags"}),
    p("You can convert any HTML or MD snippet into ", VanJS(), " code with our online ", Link("converter", "/convert"), "."),
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
    jsFiddle({id: "counter", 'data-prefix': "const {button, span} = van.tags"}),
    H2("Why VanJS?"),
    H3("Reactive Programming without React/JSX"),
    p("Declarative DOM tree composition, reusable components, reactive state binding - ", VanJS(), " offers every good aspect that React does, but without the need of React, JSX, transpiling, virtual DOM, or any hidden logic. Everything is built with simple JavaScript functions and DOM."),
    H3("Grab 'n Go"),
    p(BI("No installation"), ", ", BI("no configuration"), ", ", BI("no dependencies"), ", ", BI("no transpiling"), ", ", BI("no IDE setups"), ". Adding a line to your script or HTML file is all you need to start coding. And any code with ", VanJS(), " can be pasted and executed directly in your browser's developer console. ", VanJS(), " allows you to focus on the business logic of your application, rather than getting bogged down in frameworks and tools."),
    H3("Ultra-Lightweight"),
    p(VanJS(), " is the smallest reactive UI framework in the world, with just 0.9kB in the gzipped minified bundle. It's ", b("50~100 times"), " smaller than most popular alternatives. Guess what you can get from this 0.9kB framework? All essential features of reactive UI programming - DOM templating, state, state binding, state derivation, effect, SPA, client-side routing and even hydration!"),
    p(
      div({style: "text-align: center"},
        label(input({type: "radio", name: "bundle-type", id: "radioMinGz", checked: true, onclick: "updateChart()"}), span({class: "fixed-width", style: "margin-right: 60px;"}, ".min.js.gz")), " ",
        label(input({type: "radio", name: "bundle-type", id: "radioMin", onclick: "updateChart()"}), span({class: "fixed-width"}, ".min.js")),
      ),
      div({id: "size-comp"}),
    ),
    Quote({
      text: "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.",
      source: "Antoine de Saint-Exupéry, Airman's Odyssey",
    }),
    H3("Easy to Learn"),
    p("Simplicity at its core. 5 major functions (", Symbol("van.tags"), ", ", Symbol("van.add"), ", ", Symbol("van.state"), ", ", Symbol("van.derive"), ", ", Symbol("van.hydrate"), ") + 4 auxiliary functions (", Symbol("van.tagsNS"), ", ", Symbol("van._"), ", ", Symbol("van.val"), ", ", Symbol("van.oldVal"), "). The entire tutorial plus the API reference is ", Link("just one single web page", "/tutorial"), ", and can be learned within 1 hour for most developers."),
    H3("Performance"),
    p(VanJS(), " is among the fastest web frameworks, according to the ", Link("results", "https://krausest.github.io/js-framework-benchmark/2023/table_chrome_117.0.5938.62.html"), " by ", Link("krausest/js-framework-benchmark", "https://github.com/krausest/js-framework-benchmark"), ". For SSR, ", MiniVan(), " is ", Link(b("1.75X"), " to ", b("2.25X"), " more efficient", "https://github.com/vanjs-org/mini-van/tree/main/bench#react-vs-mini-van"), " compared to React."),
    H3("TypeScript Support"),
    p(VanJS(), " provides first-class support for TypeScript. With the ", Symbol(".d.ts"), " file in place, you'll be able to take advantage of type-checking, IntelliSense, large-scale refactoring provided by your preferred development environment. Refer to the ", Link("Download Table", "/start#download-table"), " to find the right ", Symbol(".d.ts"), " file to work with."),
    H2("Want to Learn More?"),
    ul(
      li(Link("Get Started", "/start"), " (CDN, NPM or local download)"),
      li("Learn from the ", Link("Tutorial", "/tutorial")),
      li("Learn by ", Link("Examples", "/demo"), " (and also ", Link("Community Examples", "/demo#community-examples"), ")"),
      li("Get bored? ", Link("Play a fun game", "/demo#game"), " built with ", VanJS(), " under 60 lines"),
      li("Convert HTML or MD snippet to ", VanJS(), " code with our online ", Link("HTML/MD to ", VanJS(), " Converter", "/convert")),
      li("Check out ", Link(VanUI(), "/vanui"), " - A collection of grab 'n go reusable utility and UI components for ", VanJS()),
      li("Check out ", Link(VanX(), "/x"), " - The 1.0 kB official ", VanJS(), " extension"),
      li("Want server-side rendering? Check out ", Link(MiniVan(), "/minivan"), " and ", Link("Hydration", "/ssr"), " (the entire vanjs.org site is built on top of ", MiniVan(), ")"),
      li("For questions, feedback or general discussions, visit our ", Link("Discussions", "https://github.com/vanjs-org/van/discussions"), " page"),
    ),
    H2("Source Code"),
    p({style: "display: flex; align-items: center;"},
      GithubIcon({style: "margin-right: 6px;"}), Link("github.com/vanjs-org/van", "https://github.com/vanjs-org/van"),
    ),
    p("See also: ", Link("A Guide to Reading ", VanJS(), " Codebase", "/about#source-guide"), "."),
    H2("IDE Plug-ins"),
    p({style: "display: flex; align-items: center;"},
      VSCodeIcon({style: "margin-right: 6px;"}), Link("VS Code Extension", "https://marketplace.visualstudio.com/items?itemName=TaoXin.vanjs-importtag"),
    ),
    H2("Community Add-ons"),
    p(VanJS(), " can be extended via add-ons. Add-ons add more features to ", VanJS(), " and/or provide an alternative styled API. Below is a curated list of add-ons built by ", VanJS(), " community:"),
    ul(
      li(Link("van_dml.js", "https://github.com/vanjs-org/van/blob/main/addons/van_dml"), ": adds a a new flavour of composition to ", VanJS(), ". Author: ", Link("Eckehard", "https://github.com/efpage"), "."),
      li(Link("van-jsx", "https://github.com/vanjs-org/van/blob/main/addons/van_jsx"), ": a JSX wrapper for ", VanJS(), ", for people who like the JSX syntax more. Author: ", Link("cqh963852", "https://github.com/cqh963852"), "."),
      li(Link("Van Cone", "https://github.com/vanjs-org/van/blob/main/addons/van_cone"), ": an SPA framework add-on for ", VanJS(), ". Author: ", Link("b-rad-c", "https://github.com/b-rad-c"), "."),
      li(Link("vanjs-router", "https://github.com/iuroc/vanjs-router"), ": A router solution for ", VanJS(), " (", Symbol("README.md"), " in simplified Chinese). Author: ", Link("欧阳鹏", "https://github.com/iuroc"), "."),
      li(Link("VanJS Routing", "https://github.com/kwameopareasiedu/vanjs-routing"), ": Yet another routing solution for ", VanJS(), ". Author: ", Link("Kwame Opare Asiedu", "https://github.com/kwameopareasiedu"), "."),
      li(Link("van_element", "https://github.com/vanjs-org/van/blob/main/addons/van_element"), ": Web Components with ", VanJS(), ". Author: ", Link("Atmos4", "https://github.com/Atmos4"), "."),
      li(Link("VanJS Form", "https://github.com/kwameopareasiedu/vanjs-form"), ": Fully typed form state management library (with validation) for ", VanJS(), ". Author: ", Link("Kwame Opare Asiedu", "https://github.com/kwameopareasiedu"), "."),
      li(Link("vanjs-bootstrap", "https://github.com/WilliCommer/vanjs-bootstrap"), ": ", VanJS(), " Bootstrap Components. Author: ", Link("Willi Commer", "https://github.com/WilliCommer"), "."),
    ),
    H2("Support & Feedback"),
    p("🙏 ", VanJS(), " aims to build a better world by reducing the entry barrier for UI programming, with no intention or plan on commercialization whatsoever. If you find ", VanJS(), " interesting, or could be useful for you some day, please consider starring the project on ", Link("GitHub", "https://github.com/vanjs-org/van"), ". It takes just a few seconds but your support means the world to us and helps spread ", VanJS(), " to a wider audience."),
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
    blockquote(i("In the name of ", b("Van"), "illa of the House ", b("J"), "ava", b("S"), "cript, ", Link("the First of its name", "/about#name"), ", Smallest Reactive UI Framework, 0.9kB JSX-free Grab 'n Go Library, ", Link("Scripting Language", "https://vanjs.org/about#story"), " for GUI, ", Link("GPT-Empowered", "https://chat.openai.com/g/g-7tcSHUu27-vanjs-app-builder"), " Toolkit, by the word of Tao of the House Xin, Founder and Maintainer of ", VanJS(), ", I do hereby grant you the permission of ", VanJS(), " under ", Link("MIT License", "https://github.com/vanjs-org/van/blob/main/LICENSE"), ".")),
    p({class: "contact"},
      "Contact us: ", twitterIcon, Link("@taoxin", "https://twitter.com/intent/follow?region=follow_link&screen_name=taoxin"), " / ", GithubIcon({}), Link("Tao Xin", "https://github.com/Tao-VanJS"), " / ", mailIcon, Link("tao@vanjs.org", "mailto:tao@vanjs.org"), " / ", linkedInIcon, Link("Tao Xin", "https://www.linkedin.com/in/tao-xin-64234920/"),
    ),
  )
}
