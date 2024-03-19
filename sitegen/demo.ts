import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags: {a, b, br, button, div, i, iframe, p, span, table, tbody, td, th, thead, tr}} = van.vanWithDoc(doc)
  const {Demo, H1, H2, InlineHtml, Js, JsFile, Link, Quote, SymLink, Symbol, TsFile, VanJS, VanX} = common(doc)

  return div({id: "content"},
    H1(VanJS(), ": Learning by Example"),
    Quote({text: "Simplicity is the ultimate sophistication.", source: "Steve Jobs"}),
    p("Despite being an ", b("ultra-lightweight"), " UI framework, ", VanJS(), " allows you to write incredibly elegant and expressive code for comprehensive application logic. This page is a curated list of cool things you can do with just a few lines of JavaScript code, including several handy utilities built with ", VanJS(), "."),
    p("See also ", Link("Community Examples", "#community-examples"), "."),
    p(button({id: "random-demo"}, span({id: "dice"}, "🎲 "), "Show Me a Random Demo")),
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
    p("This is the funnier ", Symbol("Hello"), " program shown in ", Link("Getting Started", "/start"), " page:"),
    JsFile("hello-fun.code.js"),
    p(Demo()),
    p({id: "demo-hello-fun"}),
    p({
      id: "jsfiddle-hello-fun",
      "data-prefix": "const {button, div, pre} = van.tags",
      "data-suffix": "van.add(document.body, Hello())",
    }),
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
    button({onclick: () => (clearInterval(id), id = 0, elapsed.val = 0)}, "Reset"),
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
    p("Note that: The result of the binding function of a ", Link("state-derived child node", "/tutorial#state-derived-child"), " can't be an array of elements. You can wrap the result into a pass-through container (", InlineHtml("<span>"), " for inline elements and ", InlineHtml("<div>"), " for block elements) if multiple elements need to be returned."),
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
    p("Similarly, to build reactive applications, you can build in a procedural way, which updates UI via the integration with native DOM API (it's easy to do with ", VanJS(), " as it doesn't introduce an ad-hoc virtual-DOM layer), or in a functional/reactive way, which delegates UI changes to ", Link("State Binding", "/tutorial#state-binding"), ". You can also choose a hybrid approach between the 2 paradigms, depending on which approach fits well for a specific problem."),
    Quote({text: ["道可道，非常道", br(), "(A rule that can be told by words, is not the rule that should universally apply)"], source: "老子，道德经"}),
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
      "data-prefix": "const {a, button, del, div, input, span} = van.tags",
      "data-suffix": "van.add(document.body, TodoList())",
      "data-css": "a { cursor: pointer; }\n",
    }),
    H2({id: "todo-app"}, "A Fully Reactive TODO App"),
    p("You can also go fully reactive for the ", Symbol("TODO App"), ". That is, the entire state of the app is captured by a global ", Symbol("appState"), ". With the full reactivity it's easier to persist the ", Symbol("appState"), " into ", SymLink("localStorage", "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"), " so that the state is kept across page reloads."),
    p("Note that even if the app is fully reactive, we don't need to re-render the whole DOM tree for state updates, thanks to the optimization with ", Link("stateful binding", "/tutorial#stateful-binding"), "."),
    p(i("The code was implemented in TypeScript.")),
    TsFile("code/todo-app/src/main.ts", {trim: true}),
    p(Demo()),
    p({id: "demo-todo-fully-reactive"}),
    p(Link("Try on CodeSandbox", "https://codesandbox.io/p/sandbox/github/vanjs-org/vanjs-org.github.io/tree/master/code/todo-app?file=/src/main.ts:1,1")),
    p("With the help of ", Link(VanX(), "/x"), ", the code above can be simplified to just 10+ lines:"),
    JsFile("todo-app.code.js"),
    p(Demo()),
    p({id: "demo-todo-fully-reactive-vanx"}),
    p({
      id: "jsfiddle-todo-fully-reactive-vanx",
      "data-details": "demo-van-x.details",
      "data-prefix": "const {a, button, del, div, input, span} = van.tags",
      "data-suffix": "van.add(document.body, TodoList())",
    }),
    p("You can refer to ", SymLink("vanX.list", "/x#reactive-list"), " for more details."),
    H2({id: "game"}, "Fun Game: Emojis Pops"),
    p("We're able to implement a mini game engine with ", VanJS(), " in just a few lines. Here is a fun game implemented under 60 lines with the help of ", VanJS(), " and ", Link(VanX(), "x"), ":"),
    JsFile("game.code.js"),
    p(Link("🎮 Let's play!", "/code/game"), " (you can share your score here: ", Link("#174", "https://github.com/vanjs-org/van/discussions/174"), ")"),
    p({
      id: "jsfiddle-game",
      "data-details": "demo-van-x.details",
      "data-prefix": "const {a, b, button, div, h1, li, p, span, ul} = van.tags",
      "data-suffix": `van.add(document.body,
  h1("Emoji Pops"),
  p(b("Game rules: "), "Click emojis to pop:"),
  ul(
    li("👍: ", span({class: "good"}, "+1"), ". Score +1."),
    li("🚀: ", span({class: "good"}, "+10"), ". Score +10."),
    li("👎: ", span({class: "bad"}, "-5"), ". Score -5."),
    li("🐌: ", span({class: "good"}, "Slowed"), ". Slow all emojis on the board."),
    li("💣: ", span({class: "bad"}, "BOOM!"), ". All emojis disappear."),
  ),
  Game(),
  div({class: "footer"}, "Powered by ", a({href: "https://vanjs.org/"}, b("VanJS")), " and ", a({href: "https://vanjs.org/x"}, b("VanX"))),
)`,
    }),
    H2({id: "code-browser"}, "SPA w/ Client-Side Routing: Code Browser"),
    p("With ", VanJS(), ", you can built a single-page application with client-side routing support, thanks to ", VanJS(), "'s powerful builtin state management and state derivation:"),
    TsFile("code/code-browser/src/main.js", {trim: true}),
    p(Link("Try on CodeSandbox", "https://codesandbox.io/p/sandbox/github/vanjs-org/vanjs-org.github.io/tree/master/code/code-browser?file=/src/main.js:1,1")),
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
    JsFile("calculator.code.js"),
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
        tr(td(b("# of lines:")), td(143), td(616)),
      ),
    ),
    p("As you can see, not only ", VanJS(), " is ", b("~50 times"), " smaller than React, apps built with ", VanJS(), " also tends to be much slimmer."),
    H2({id: "table-viewer"}, "Table-View Example: JSON/CSV Table Viewer"),
    p("The following code implements a ", Symbol("Table Viewer"), " for JSON/CSV-based data by leveraging ", Link("functional-style DOM tree building", "/tutorial#fun-dom"), ":"),
    JsFile("table-viewer.code.js"),
    p(Demo()),
    p({id: "demo-table-viewer"}),
    p({
      id: "jsfiddle-table-viewer",
      "data-prefix": "const {button, input, div, label, p, pre, table, tbody, td, textarea, th, thead, tr} = van.tags",
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
    H2({id: "json-inspector"}, "Tree-View Example: JSON Inspector"),
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
      a({href: "https://jsfiddle.net/p5e71ryw/"}, "Try on jsfiddle"),
    ),
    p("Alternatively, we can implement the same app with ", Link("State-derived properties", "/tutorial#state-derived-prop"), ":"),
    p(i("The code was implemented in TypeScript to validate ", VanJS(), "'s TypeScript support.")),
    TsFile("auto-complete-derived-props.code.ts"),
    p(Demo()),
    p({id: "demo-auto-complete-derived-props"}),
    p({id: "jsfiddle-auto-complete-derived-props"},
      a({href: "https://jsfiddle.net/7ueod0pL/1/"}, "Try on jsfiddle"),
    ),
    H2("HTML/MD to VanJS Code Converter"),
    p("The ", Link("online UI", "/convert"), " for the HTML/MD snippet to ", VanJS(), " ", Link("code converter", "https://github.com/vanjs-org/converter"), ", is also implemented with ", VanJS(), "."),
    p("Source code: ", SymLink("convert.ts", "https://github.com/vanjs-org/vanjs-org.github.io/tree/master/converter-ui/convert.ts")),
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
  ["VanJS", 1, "#f44336", "VanJS-1.5.0 1kB"],
  ["Solid", 8.1, "#b7b7b7", "Solid-1.8.12 8.1kB"],
  ["jQuery", 29.7, "#b7b7b7", "jQuery-3.7.1 29.7kB"],
  ["Vue", 40, "#b7b7b7", "Vue-3.4.15 40kB"],
  ["ReactDOM", 42, "#b7b7b7", "ReactDOM-18.2.0 42kB"],
  ["Angular", 104, "#b7b7b7", "Angular-17.1.0 104kB"],
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
    p("See ", Link("github.com/vanjs-org/van/tree/main/demo/terminal", "https://github.com/vanjs-org/van/tree/main/demo/terminal"), " for the app (", Link("preview", "https://codesandbox.io/p/sandbox/github/vanjs-org/van/tree/main/demo/terminal"), ")."),
    H2("Community Examples"),
    p("Besides the official ", VanJS(), " examples, there are also sample apps from the great ", VanJS(), " community. Below is a curated list (contact ", Link("tao@vanjs.org", "mailto:tao@vanjs.org"), " to add yours):"),
    table(
      thead(tr(th("Author"), th("Project"), th("Preview"))),
      tbody(
        tr(
          td(Link("Yahia Berashish", "https://github.com/yahia-berashish")),
          td(Link(VanJS(), " JavaScript and TypeScript Vite Template", "https://github.com/vitejs/awesome-vite#vanjs")),
          td(Link("link", "https://codesandbox.io/p/sandbox/github/yahia-berashish/vite-vanjs-ts/tree/main")),
        ),
        tr(
          td(Link("artydev", "https://github.com/artydev")),
          td(Link(VanJS(), " Series", "https://dev.to/artydev/series/23075")),
          td(),
        ),
        tr(
          td(Link("barrymun", "https://github.com/barrymun")),
          td(Link("Division Game", "https://github.com/barrymun/division-game")),
          td(Link("link", "http://barrymun.vanjs-division-game.surge.sh/")),
        ),
        tr(
          td(Link("enpitsuLin", "https://github.com/enpitsuLin")),
          td(Link("TODO App", "https://github.com/enpitsuLin/vanjs-todomvc")),
          td(Link("link", "https://codesandbox.io/p/sandbox/github/enpitsuLin/vanjs-todomvc/tree/master?file=%2Fsrc%2Fmain.ts%3A8%2C1")),
        ),
        tr(
          td(Link("Kwame Opare Asiedu", "https://github.com/kwameopareasiedu")),
          td(Link("TODO App", "https://github.com/kwameopareasiedu/vanjs-todo"), " with routing and authentication"),
          td(Link("link", "https://kwameopareasiedu.github.io/vanjs-todo/")),
        ),
        tr(
          td(Link("董凯", "https://github.com/CodeByZack")),
          td(Link("Local Share", "https://github.com/CodeByZack/local-share"), " - A tool for transferring files over LAN, using the WebRTC tech"),
          td(Link("link", "https://share.zackdk.com/")),
        ),
        tr(
          td(Link("Kane", "https://github.com/csm-kb")),
          td(Link(VanJS(), " Chart.js graph render", "https://github.com/csm-kb/vanjs-chartjs-example")),
          td(Link("link", "https://codesandbox.io/p/devbox/github/csm-kb/vanjs-chartjs-example/tree/main/?file=%2Fsrc%2Fmain.ts")),
        ),
        tr(
          td(Link("Neven DREAN", "https://github.com/ndrean")),
          td(Link("Modal Component & Routing with ", VanJS(), "https://github.com/ndrean/vanjs-dialog-modal")),
          td(Link("link", "https://githubbox.com/ndrean/vanjs-dialog-modal")),
        ),
        tr(
          td(Link("b rad c", "https://github.com/b-rad-c")),
          td(Link(VanJS(), " SPA Template", "https://github.com/vanjs-org/van/tree/main/addons/van_cone/examples/spa-app")),
          td(Link("link", "https://codesandbox.io/p/devbox/github/vanjs-org/van/tree/main/addons/van_cone/examples/spa-app")),
        ),
        tr(
          td(Link("Vlad Sirenko", "https://github.com/SirenkoVladd")),
          td(Link(VanJS(), " with Leaflet", "https://github.com/sirenkovladd/vanjs-leaflet-example")),
          td(Link("link", "https://codesandbox.io/p/devbox/github/sirenkovladd/vanjs-leaflet-example/tree/main/?file=%2Fsrc%2Fmain.js")),
        ),
        tr(
          td(Link("FredericHeem", "https://github.com/FredericHeem")),
          td(Link("Multi-Page App Starter Kit under 5kB", "https://github.com/FredericHeem/van-kit")),
          td(),
        ),
        tr(
          td(Link("FredericHeem", "https://github.com/FredericHeem")),
          td(Link(VanJS(), " Playground with Vite", "https://github.com/FredericHeem/van-playground")),
          td(),
        ),
      ),
    ),
  )
}
