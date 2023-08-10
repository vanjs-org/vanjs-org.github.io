import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags} = van.vanWithDoc(doc)
  const {a, b, div, i, iframe, li, p, span, table, tbody, td, th, thead, tr, ul} = tags

  const {Demo, H1, H2, Js, JsFile, Link, Symbol, SymLink, TsFile, User, VanJS} = common(doc)

  return div({id: "content"},
    H1(VanJS(), ": Learning by Example"),
    p("Despite being an ", b("ultra-lightweight"), " UI framework, ", VanJS(), " allows you to write incredibly elegant and expressive code for comprehensive application logic. This page is a curated list of cool things you can do with just a few lines of JavaScript code, including several handy utilities built with ", VanJS(), "."),
    p("See also ", Link("Community Examples", "#community-examples"), "."),
    H2("Hello World!"),
    p("This is the ", Symbol("Hello World"), " program shown in the ", Link("Home", "/"), " page:"),
    Js(`const Hello = () => div(
  p("👋Hello"),
  ul(
    li("🗺️World"),
    li(a({href: "https://vanjs.org/"}, "🍦VanJS")),
  ),
)
`),
    p(Demo()),
    p({id: "demo-hello"}),
    p({
      id: "jsfiddle-hello",
      "data-prefix": "const {a, div, li, p, ul} = van.tags",
      "data-suffix": "van.add(document.body, Hello())",
    }),
    p("This is the funnier ", Symbol("Hello"), " program shown in ", Link("Getting Started", "/start"), " page:"),
    JsFile("hello-fun.code.js"),
    p(Demo()),
    p({id: "demo-hello-fun"}),
    p({
      id: "jsfiddle-hello-fun",
      "data-prefix": "const {button, div, pre} = van.tags",
      "data-suffix": "van.add(document.body, Hello())",
    }),
    p("An alternative implementation by ", Link("@stephenhandley", "https://github.com/stephenhandley"), " can be found ", Link("here", "https://github.com/vanjs-org/van/discussions/20"), "."),
    H2("DOM Composition and Manipulation"),
    p("Even without state and state binding, you can build interactive web pages thanks to ", VanJS(), "'s flexible API for DOM composition and manipulation: ", SymLink("tag functions", "/tutorial#api-tags"), " and ", SymLink("van.add", "/tutorial#api-add"), ". Check out the example below:"),
    Js(`const StaticDom = () => {
  const dom = div(
    div(
      button("Dummy Button"),
      button(
        {onclick: () =>
          van.add(dom,
            div(button("New Button")),
            div(a({href: "https://www.example.com/"}, "This is a link")),
          )
        },
        "Button to Add More Elements"),
      button({onclick: () => alert("Hello from 🍦VanJS")}, "Hello"),
    ),
  )
  return dom
}
`),
    p(Demo()),
    p({id: "demo-static"}),
    p({
      id: "jsfiddle-static",
      "data-prefix": "const {a, button, div, h1} = van.tags",
      "data-suffix": "van.add(document.body, StaticDom())",
    }),
    H2("Counter"),
    p("The ", Symbol("Counter App"), " is a good illustration on how to leverage ", Link("States", "/tutorial#states"), " to make your application reactive. This is the program shown in the ", Link("Home", "/"), " page:"),
    Js(`const Counter = () => {
  const counter = van.state(0)
  return span(
    "❤️ ", counter, " ",
    button({onclick: () => ++counter.val}, "👍"),
    button({onclick: () => --counter.val}, "👎"),
  )
}
`),
    p(Demo(), " ", span({id: "demo-counter-simple"})),
    p({
      id: "jsfiddle-counter-simple",
      "data-prefix": "const {button, span} = van.tags",
      "data-suffix": "van.add(document.body, Counter())",
    }),
    p("This is a slightly advanced version of ", Symbol("Counter App"), ":"),
    Js(`const buttonStyleList = [
  ["👆", "👇"],
  ["👍", "👎"],
  ["🔼", "🔽"],
  ["⬆️", "⬇️"],
  ["⏫", "⏬"],
  ["📈", "📉"],
]

const Counter = ({buttons}) => {
  const counter = van.state(0)
  const dom = div(
    "❤️ ", counter, " ",
    button({onclick: () => ++counter.val}, buttons[0]),
    button({onclick: () => --counter.val}, buttons[1]),
    button({onclick: () => dom.remove()}, "❌"),
  )
  return dom
}

const CounterSet = () => {
  const containerDom = div()
  return div(
    containerDom,
    button({onclick: () => van.add(containerDom,
      Counter({buttons: buttonStyleList[Math.floor(Math.random() * buttonStyleList.length)]}))},
      "➕",
    ),
  )
}
`),
    p(Demo()),
    p({id: "demo-counter-advanced"}),
    p({
      id: "jsfiddle-counter-advanced",
      "data-prefix": "const {button, div} = van.tags",
      "data-suffix": "van.add(document.body, CounterSet())",
    }),
    H2("Stopwatch"),
    p("This is a ", Symbol("Stopwatch App"), ", similar to the ", SymLink("Timer App", "/tutorial#state-typed-child"), " shown in the tutorial:"),
    Js(`const Stopwatch = () => {
  const elapsed = van.state(0)
  let id
  const start = () => id = id || setInterval(() => elapsed.val += .01, 10)
  return span(
    pre({style: "display: inline;"}, () => elapsed.val.toFixed(2), "s "),
    button({onclick: start}, "Start"),
    button({onclick: () => (clearInterval(id), id = 0)}, "Stop"),
    button({onclick: () =>
      (clearInterval(id), id = 0, elapsed.val = 0)}, "Reset"),
  )
}
`),
    p(Demo(), " ", span({id: "demo-stopwatch"})),
    p({
      id: "jsfiddle-stopwatch",
      "data-prefix": "const {button, pre, span} = van.tags",
      "data-suffix": "van.add(document.body, Stopwatch())",
    }),
    H2("Blog"),
    p(VanJS(), " doesn't have an equivalent to React's ", SymLink("<Fragment>", "https://react.dev/reference/react/Fragment"), ". For most of the cases, returning an array of HTML elements from your custom component would serve the similar purpose. Here is the sample code equivalent to the ", Symbol("Blog"), " example in React's official website:"),
    Js(`const Blog = () => [
  Post({title: "An update", body: "It's been a while since I posted..."}),
  Post({title: "My new blog", body: "I am starting a new blog!"}),
]

const Post = ({title, body}) => [
  PostTitle({title}),
  PostBody({body}),
]

const PostTitle = ({title}) => h1(title)
const PostBody = ({body}) => article(p(body))
`
),
    p({
      id: "jsfiddle-blog",
      "data-prefix": "const {article, h1, p} = van.tags",
      "data-suffix": "van.add(document.body, Blog())",
    }),
    p("The sample code in React is 29 lines. Thus ", VanJS(), "'s equivalent code is ~3 times shorter by eliminating unnecessary boilerplate."),
    p("Note that: The result of ", Link("complex state binding", "/tutorial#complex-state-binding"), " can't be an array of elements. You can wrap the result into a pass-through container (", Symbol("span"), " for inline elements and ", Symbol("div"), " for block elements) if multiple elements need to be returned."),
    H2("List"),
    p("As an ", b("unopinionated"), " framework, ", VanJS(), " supports multiple programming paradigms. You can construct the DOM tree in an imperative way (modifying the DOM tree via ", SymLink("van.add", "/tutorial#api-add"), "), or in a functional/declarative way."),
    p("Below is an example of building a list even numbers in ", Symbol("1..N"), ", using an imperative way:"),
    Js(`const EvenNumbers = ({N}) => {
  const listDom = ul()
  for (let i = 1; i <= N; ++i)
    if (i % 2 === 0)
      van.add(listDom, li(i))

  return div(
    p("List of even numbers in 1.." + N + ":"),
    listDom,
  )
}`),
    p({
      id: "jsfiddle-list-imperative",
      "data-prefix": "const {div, li, p, ul} = van.tags",
      "data-suffix": "van.add(document.body, EvenNumbers({N: 20}))",
    }),
    p("Alternatively, you can build a list of even numbers in ", Symbol("1..N"), ", using a functional/declarative way:"),
    Js(`const EvenNumbers = ({N}) => div(
  p("List of even numbers in 1.." + N + ":"),
  ul(
    Array.from({length: N}, (_, i) => i + 1)
      .filter(i => i % 2 === 0)
      .map(i => li(i)),
  ),
)
`),
    p({
      id: "jsfiddle-list-declarative",
      "data-prefix": "const {div, li, p, ul} = van.tags",
      "data-suffix": "van.add(document.body, EvenNumbers({N: 20}))",
    }),
    H2("TODO List"),
    p("Similarly, to build reactive applications, you can build in a procedural way, which updates UI via the integration with native DOM API (it's easy to do with ", VanJS(), " as it doens't introduce an ad-hoc virtual-DOM layer), or in a functional/reactive way, which delegates UI changes to ", Link("State Binding", "/tutorial#state-binding"), ". You can also choose a hybrid approach between the 2 paradigms, depending on which approach fits well for a specific problem."),
    p("Below is an example of building a ", Symbol("TODO List"), " in a completely procedural way:"),
    Js(`const TodoItem = ({text}) => div(
  input({type: "checkbox", onchange: e =>
    e.target.closest("div").querySelector("span").style["text-decoration"] =
      e.target.checked ? "line-through" : ""
  }),
  span(text),
  a({onclick: e => e.target.closest("div").remove()}, "❌"),
)

const TodoList = () => {
  const inputDom = input({type: "text"})
  const dom = div(
    inputDom,
    button({onclick: () => van.add(dom, TodoItem({text: inputDom.value}))}, "Add"),
  )
  return dom
}
`),
    p(Demo()),
    p({id: "demo-todo-procedural"}),
    p({
      id: "jsfiddle-todo-procedural",
      "data-prefix": "const {a, button, div, input, span} = van.tags",
      "data-suffix": "van.add(document.body, TodoList())",
      "data-css": "a { cursor: pointer; }\n",
    }),
    p("Alternatively, you can use a functional/reactive way to build ", Symbol("TODO Items"), ":"),
    JsFile("todo-functional.code.js"),
    p(Demo()),
    p({id: "demo-todo-functional"}),
    p({
      id: "jsfiddle-todo-functional",
      "data-prefix": "const {a, button, div, input, span, strike} = van.tags",
      "data-suffix": "van.add(document.body, TodoList())",
      "data-css": "a { cursor: pointer; }\n",
    }),
    H2("Stargazers"),
    p("The following code can show the number of stars for a Github repo, and a list of most recent stargazers:"),
    JsFile("stars.code.js"),
    p(Link("Try it out here", "code/stars")),
    p({
      id: "jsfiddle-starts",
      "data-prefix": "const {a, div, li, p, ul} = van.tags",
      "data-suffix": '(async () => van.add(document.body, await Stars("vanjs-org/van")))()',
    }),
    H2("Epoch Timestamp Converter"),
    p("Below is an application which converts a Unix epoch timestamp into a human-readable datetime string:"),
    JsFile("epoch-converter.code.js"),
    p(Demo()),
    p({id: "demo-epoch-converter"}),
    p({
      id: "jsfiddle-epoch-converter",
      "data-prefix": "const {b, button, div, i, input, p} = van.tags",
      "data-suffix": "van.add(document.body, Converter())",
    }),
    H2("Keyboard Event Inspector"),
    p("Below is an application to inspect all relevant key codes in keyboard ", SymLink("keydown", "https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event"), " events:"),
    JsFile("key-inspector.code.js"),
    p(Demo()),
    p({id: "demo-key-inspector"}),
    p({
      id: "jsfiddle-key-inspector",
      "data-prefix": "const {div, input, span} = van.tags",
      "data-suffix": "van.add(document.body, Inspector())",
      "data-css-file": "code/key-inspector.html",
    }),
    H2("Diff"),
    p("Here is a ", Symbol("Diff App"), " with the integration of ", SymLink("jsdiff", "https://github.com/kpdecker/jsdiff"), ". The app can compare 2 pieces of text (very handy tool to check how your text is revised by ", Symbol("ChatGPT"), " 🙂):"),
    JsFile("diff-simple.code.js"),
    p(Demo()),
    p({id: "demo-diff-simple"}),
    p({
      id: "jsfiddle-diff-simple",
      "data-details": "demo-diff.details",
      "data-prefix": "const {button, div, span, textarea} = van.tags",
      "data-suffix": "document.body.appendChild(DiffApp())",
      "data-css-file": "code/diff-simple.html",
    }),
    p("Here is a more advanced ", Symbol("Diff App"), " that supports side-by-side and line-by-line comparison:"),
    JsFile("diff.code.js"),
    p(Demo()),
    p({id: "demo-diff"}),
    p({
      id: "jsfiddle-diff",
      "data-details": "demo-diff.details",
      "data-prefix": "const {button, div, input, span, textarea} = van.tags",
      "data-suffix": "document.body.appendChild(DiffApp())",
      "data-css-file": "code/diff.html",
    }),
    H2("Calculator"),
    p("The code below implements a ", Symbol("Calculator App"), " similar to the one that you are using on your smartphones:"),
    Js(`const Calculator = () => {
  const displayNum = van.state(0)
  let lhs = null, op = null, rhs = 0

  const calc = (lhs, op, rhs) => {
    const rhsNumber = parseFloat(rhs)
    if (!op || lhs === null) return rhsNumber
    if (op === "+") return lhs + rhsNumber
    if (op === "-") return lhs - rhsNumber
    if (op === "x") return lhs * rhsNumber
    if (op === "÷") return lhs / rhsNumber
  }

  const onclick = e => {
    const str = e.target.innerText
    if (str >= "0" && str <= "9") {
      if (rhs) {
        if (typeof rhs === "string") rhs += str; else rhs = rhs * 10 + parseInt(str)
      } else
        rhs = parseInt(str)
    } else if (str === "AC") {
      lhs = op = null, rhs = 0
    } else if (str === "+/-") {
      if (rhs) rhs = -rhs
    } else if (str === "%") {
      if (rhs) rhs *= 0.01
    } else if (str === "+" || str === "-" || str === "x" || str === "÷") {
      if (rhs !== null) lhs = calc(lhs, op, rhs), rhs = null
      op = str
    } else if (str === "=") {
      if (op && rhs !== null) lhs = calc(lhs, op, rhs), op = null, rhs = null
    } else if (str === ".") {
      rhs = rhs ? rhs + "." : "0."
    }

    displayNum.val = rhs ?? lhs
  }

  const Button = str => div({class: "button"}, button(str))

  return div({id: "root"},
    div({id: "display"}, div(displayNum)),
    div({id: "panel", onclick},
      div(Button("AC"), Button("+/-"), Button("%"), Button("÷")),
      div(Button("7"), Button("8"), Button("9"), Button("x")),
      div(Button("4"), Button("5"), Button("6"), Button("-")),
      div(Button("1"), Button("2"), Button("3"), Button("+")),
      div(div({class: "button wide"}, button("0")), Button("."), Button("=")),
    ),
  )
}
`),
    p(Demo()),
    iframe({id: "demo-calculator", src: "/code/calculator.html"}),
    p({
      id: "jsfiddle-calculator",
      "data-prefix": "const {button, div} = van.tags",
      "data-suffix": "van.add(document.body, Calculator())",
      "data-css-file": "code/calculator.css",
    }),
    p("Notably, this ", Symbol("Calculator App"), " is equivalent to the React-based implementation here: ", Link("github.com/ahfarmer/calculator", "https://github.com/ahfarmer/calculator"), ". Here is the size comparison of the total package between the 2 apps:"),
    table({style: "text-align: right;"},
      thead(tr(th(), th("VanJS-based App"), th("React-based App"))),
      tbody(
        tr(td(b("# of files:")), td(2), td(16)),
        tr(td(b("# of lines:")), td(156), td(616)),
      ),
    ),
    p("As you can see, not only ", VanJS(), " is ", b("~50 times"), " smaller than React, apps built with ", VanJS(), " also tends to be much slimmer."),
    H2({id: "table-viewer"}, "JSON/CSV Table Viewer"),
    p("The following code implements a ", Symbol("Table Viewer"), " for JSON/CSV-based data by leveraging ", Link("functional-style DOM tree building", "/tutorial#fun-dom"), ":"),
    JsFile("table-viewer.code.js"),
    p(Demo()),
    p({id: "demo-table-viewer"}),
    p({
      id: "jsfiddle-table-viewer",
      "data-prefix": "const {button, input, div, label, pre, table, tbody, td, textarea, th, thead, tr} = van.tags",
      "data-suffix": `van.add(document.body, TableViewer({
  inputText: \`[{"id":1,"name":"John Doe","email":"john.doe@example.com","age":35,"country":"USA"},{"id":2,"name":"Jane Smith","email":"jane.smith@example.com","age":28,"country":"Canada"},{"id":3,"name":"Bob Johnson","email":"bob.johnson@example.com","age":42,"country":"Australia"}]\`,
  inputType: "json",
}))`,
      "data-css-file": "code/json-csv-table-viewer.html",
    }),
    H2({id: "package-lock-inspector"}, Symbol("package-lock.json"), " Inspector"),
    p("Below is an example which can extract and display all dependency packages and their versions from ", Symbol("package-lock.json"), " file:"),
    JsFile("package-lock-inspector.code.js"),
    p(Link("Try it out here", "code/package-lock-inspector")),
    p({
      id: "jsfiddle-package-lock-inspector",
      "data-prefix": "const {a, div, h4, pre, table, tbody, td, textarea, th, thead, tr} = van.tags",
      "data-suffix": "van.add(document.body, PackageLockInspector())",
    }),
    H2({id: "json-inspector"}, "JSON Inspector"),
    p("This is another example of leveraging ", Link("functional-style DOM tree building", "/tutorial#fun-dom"), " - to build a tree view for inspecting JSON data:"),
    JsFile("json-inspector.code.js"),
    p(Demo()),
    p({id: "demo-json-inspector"}),
    p({
      id: "jsfiddle-json-inspector",
      "data-prefix": "const {a, b, button, div, pre, span, textarea} = van.tags",
      "data-suffix": 'van.add(document.body, JsonInspector({initInput: `{"name":"John Doe","age":30,"email":"johndoe@example.com","address":{"street":"123 Main St","city":"Anytown","state":"CA","zip":"12345"},"phone_numbers":[{"type":"home","number":"555-1234"},{"type":"work","number":"555-5678"}]}`}))',
      "data-css-file": "code/json-inspector.html",
    }),
    H2({id: "auto-complete"}, "Textarea with Autocomplete"),
    p("The code below implements a ", SymLink("textarea", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea"), " with autocomplete support. This implementation leverages ", Link("Stateful DOM binding", "/tutorial#stateful-binding"), " to optimize the performance of DOM tree rendering:"),
    p(i("The code was implemented in TypeScript to validate ", VanJS(), "'s TypeScript support.")),
    TsFile("auto-complete-stateful-dom-func.code.ts"),
    p(Demo()),
    p({id: "demo-auto-complete-stateful-binding"}),
    p({id: "jsfiddle-auto-complete-stateful-binding"},
      a({href: "https://jsfiddle.net/Lgjmoku3/1/"}, "Try on jsfiddle"),
    ),
    p("Alternatively, we can implement the same app with ", Link("State-derived properties", "/tutorial#state-derived-prop"), ":"),
    p(i("The code was implemented in TypeScript to validate ", VanJS(), "'s TypeScript support.")),
    TsFile("auto-complete-derived-props.code.ts"),
    p(Demo()),
    p({id: "demo-auto-complete-derived-props"}),
    p({id: "jsfiddle-auto-complete-derived-props"},
      a({href: "https://jsfiddle.net/4g56au83/1/"}, "Try on jsfiddle"),
    ),
    H2("HTML to VanJS Code Converter"),
    p("The converter that converts HTML snippet to ", VanJS(), " code, is also implemented with ", VanJS(), ":"),
    JsFile("convert.code.js"),
    p("You can try it out with ", Link("this link", "/convert"), "."),
    H2("Jupyter-like JavaScript Console"),
    p("Next up, we're going to demonstrate a simplified Jupyter-like JavaScript console implemented in ", b("~100 lines"), " of code with ", VanJS(), ". The JavaScript console supports drawing tables (with the technique similar to ", Link("Table Viewer", "#table-viewer"), "), inspecting objects in a tree view (with the technique similar to ", Link("Json Inspector", "#json-inspector") , ") and plotting (with the integration of ", Link("Google Charts", "https://developers.google.com/chart"), ")."),
    p("Here is the implementation:"),
    JsFile("console.code.js"),
    p(Demo()),
    p({id: "demo-js-console"}),
    p({
      id: "jsfiddle-js-console",
      "data-prefix": "const {button, code, div, li, p, pre, span, tbody, td, textarea, th, thead, tr, ul} = van.tags",
      "data-suffix": `const Snippet = str => str.includes("\\n") ? pre(str) : code(str)

google.charts.load('current', {packages: ['corechart']})
google.charts.setOnLoadCallback(() =>
  van.add(document.body,
    div("JavaScript Console. Please enter JS expression here, and type ⌘ + ↵ or ^ + ↵ to evaluate:"),
    div("You can assign variables in format like 'x = 3 + 5'."),
    p("Try the following commands:", ul(
      li(Snippet("{a: 1, b: {c: 2, d: 3}}")),
      li(Snippet("table([{a: 1, b: 2}, {b: 2, c: 3}])")),
      li("Any valid JSON string, e.g.: ", Snippet('{"name":"John","pets":[{"name":"Fluffy","species":"cat"},{"name":"Buddy","species":"dog"}]}')),
      li(Snippet('plot([2, 5, 3], "LineChart")')),
      li(Snippet('plot([{Year:"2020",Sales:1000,Expenses:400},{Year:"2021",Sales:1170,Expenses:460},{Year:"2022",Sales:660,Expenses:1120},{Year:"2023",Sales:1030,Expenses:540}], "LineChart", {legend:{position:"bottom"}})')),
      li("The chart shown in the home page:", Snippet(\`plot([
  ["Framework", "Size", {role: "style"}, {role: "annotation"}],
  ["VanJS", 0.9, "#f44336", "VanJS-1.0.1 0.9kB"],
  ["Preact", 4.3, "#b7b7b7", "Preact-10.15.1 4.3kB"],
  ["jQuery", 29.7, "#b7b7b7", "jQuery-3.7.0 29.7kB"],
  ["ReactDOM", 42, "#b7b7b7", "ReactDOM-18.2.0 42kB"],
  ["Angular", 62.3, "#b7b7b7", "Angular-1.8.3 62.3kB"],
], "BarChart", {
  legend: {position: "none"},
  hAxis: {gridlines: {count: 0}, textPosition: "none"},
  annotations: {alwaysOutside: true},
})\`)),
      li("More chart types supported in ", van.tags.a({href: "https://developers.google.com/chart/interactive/docs"}, "Google Charts")),
    )),
    Console()
  ).querySelector("textarea").focus()
)`,
      "data-details": "demo-js-console.details",
      "data-css-file": "code/console.html",
    }),
    p("You can also try out the JavaScript console in ", Link("this standalone page", "/code/console.html"), "."),
    H2("An Improved Unix Terminal"),
    p("Next up is a web-based Unix terminal that connects to your local computer, with notable improvements, all under 300 lines of code. This is to demonstrate that, with ", VanJS(), ", we can easily provide great extension to commandline utilities with fancy GUI by leveraging all available HTML elements. The program is heavily tested in macOS, and should in theory works in Linux, or in any environment that has ", SymLink("/bin/sh", "https://en.wikipedia.org/wiki/Bourne_shell"), "."),
    p("See ", Link("github.com/vanjs-org/van/tree/main/demo/terminal", "https://github.com/vanjs-org/van/tree/main/demo/terminal"), " for the app."),
    H2("Community Examples"),
    p("Besides the official ", VanJS(), " examples, there are also sample apps from the great ", VanJS(), " community. Below is a curated list (contact ", Link("tao@vanjs.org", "mailto:tao@vanjs.org"), " to add yours):"),
    ul(
      li(User("artydev"), "'s ", Link(VanJS(), " Series", "https://dev.to/artydev/series/23075")),
      li(User("enpitsuLin"), "'s ", Link("TODO app", "https://github.com/enpitsuLin/vanjs-todomvc"), " (", Link("live preview", "https://codesandbox.io/p/sandbox/github/enpitsuLin/vanjs-todomvc/tree/master?file=%2Fsrc%2Fmain.ts%3A8%2C1"), ")"),
      li(User("FredericHeem"), "'s ", Link("multi-page app starter kit under 5kB", "https://github.com/FredericHeem/van-kit")),
      li(User("FredericHeem"), "'s ", Link("VanJS playground with Vite", "https://github.com/FredericHeem/van-playground")),
      li(User("ndrean"), "'s ", Link(b("Modal"), " component & routing with ", VanJS(), "https://github.com/ndrean/vanjs-dialog-modal")),
    ),
  )
}
