import van from "./mini-van.js"
import common from "./common.ts"
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"

export default (doc: HTMLDocument) => {
  const {tags} = van.vanWithDoc(doc)
  const {a, b, div, i, img, iframe, li, ol, p, span, table, tbody, td, th, thead, tr} = tags

  const {Demo, Download, H1, H2, H3, HtmlFile, Js, Link, Shell, Symbol, SymLink, Ts, TsFile, VanJS} = common(doc)

  const version = Deno.readTextFileSync("code/van.version")

  return div({id: "content"},
    H1(VanJS(), ": Learning by Example"),
    p("Despite being an ", b("ultra-lightweight"), " UI framework, ", VanJS(), " allows you to write incredibly elegant and expressive code for comprehensive application logic. This page is a curated list of cool things you can do with just a few lines of JavaScript code, including several handy utilities built with ", VanJS(), "."),
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
      "data-suffix": "van.add(document.body, Hello())"
    }),
    p("This is the funnier ", Symbol("Hello"), " program shown in ", Link("Getting Started", "/start"), " page:"),
    Js(`const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

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
`),
    p(Demo()),
    p({id: "demo-hello-fun"}),
    p({
      id: "jsfiddle-hello-fun",
      "data-prefix": "const {button, div, pre} = van.tags",
      "data-suffix": "van.add(document.body, Hello())"
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
  const elapsed = van.state("0.00")
  let id
  const start = () => id = id || setInterval(() =>
    elapsed.val = (Number(elapsed.val) + 0.01).toFixed(2), 10)
  return span(
    pre({style: "display: inline;"}, elapsed, "s "),
    button({onclick: start}, "Start"),
    button({onclick: () => (clearInterval(id), id = 0)}, "Stop"),
    button({onclick: () =>
      (clearInterval(id), id = 0, elapsed.val = "0.00")}, "Reset"),
  )
}
`),
    p(Demo(), " ", span({id: "demo-stopwatch"})),
    p({
      id: "jsfiddle-stopwatch",
      "data-prefix": "const {button, pre, span} = van.tags",
      "data-suffix": "van.add(document.body, Stopwatch())",
    }),
    H2("TODO List"),
    p("As an ", b("unopinionated"), " framework, ", VanJS(), " supports multiple programming paradigms. You can build your application in a procedural way, which updates UI via the integration of native DOM API (it's easy to do with ", VanJS(), " as it doens't introduce an ad-hoc virtual-DOM layer), or in a functional/reactive way, which delegates UI changes to ", Link("State Binding", "/tutorial#state-binding"), ". You can also choose a hybrid approach between the 2 paradigms, depending on which approach fits well for a specific problem."),
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
      "data-css": "a { cursor: pointer; }\n"
    }),
    p("Alternatively, you can use a functional/reactive way to build ", Symbol("TODO Item"), "s:"),
    Js(`const TodoItem = ({text}) => {
  const done = van.state(false), deleted = van.state(false)
  return van.bind(deleted,
    d => d ? null : div(
      input({type: "checkbox", checked: done, onclick: e => done.val = e.target.checked}),
      van.bind(done, done => done ? strike(text) : span(text)),
      a({onclick: () => deleted.val = true}, "❌"),
    )
  )
}

const TodoList = () => {
  const inputDom = input({type: "text"})
  const dom = div(inputDom,
    button({onclick: () => van.add(dom, TodoItem({text: inputDom.value}))}, "Add"),
  )
  return dom
}
`),
    p(Demo()),
    p({id: "demo-todo-functional"}),
    p({
      id: "jsfiddle-todo-functional",
      "data-prefix": "const {a, button, div, input, span, strike} = van.tags",
      "data-suffix": "van.add(document.body, TodoList())",
      "data-css": "a { cursor: pointer; }\n"
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
    p("As you can see, not only ", VanJS(), " is ", b("more than 100 times"), " smaller than React, apps built with ", VanJS(), " also tends to be slimmer."),
    H2({id: "table-viewer"}, "JSON/CSV Table Viewer"),
    p("The following code implements a ", Symbol("Table Viewer"), " for JSON/CSV-based data by leveraging ", Link("functional-style DOM tree building", "/tutorial#fun-dom"), ":"),
    Js(`const TableViewer = ({inputText, inputType}) => {
  const resultDom = div()

  const jsonRadioDom = input({type: "radio", checked: inputType === "json",
    name: "inputType", value: "json"})
  const csvRadioDom = input({type: "radio", checked: inputType === "csv",
    name: "inputType", value: "csv"})
  const textAreaDom = textarea({rows: 10, cols: 80}, inputText)

  const tableFromJson = text => {
    const json = JSON.parse(text)
    const head = Object.keys(json[0])
    return {
      head,
      data: json.map(row => head.map(h => row[h]))
    }
  }

  const tableFromCsv = text => {
    const lines = text.split("\\n").filter(l => l.length > 0)
    return {
      head: lines[0].split(","),
      data: lines.slice(1).map(l => l.split(",")),
    }
  }

  const showTable = () => {
    try {
      let {head, data} = jsonRadioDom.checked ?
        tableFromJson(textAreaDom.value) : tableFromCsv(textAreaDom.value)
      resultDom.firstChild?.remove()
      van.add(resultDom, table(
        thead(tr(head.map(h => th(h)))),
        tbody(data.map(row => tr(row.map(col => td(col))))),
      ))
      dom.querySelector(".err").innerText = ""
    } catch (e) {
      dom.querySelector(".err").innerText = e.message
    }
  }

  const dom = div(
    div(jsonRadioDom, label("JSON"), csvRadioDom, label("CSV (Quoting not Supported)")),
    div(textAreaDom),
    div(button({onclick: showTable}, "Show Table")),
    pre({class: "err"}),
    resultDom,
  )
  return dom
}
`),
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
    H2({id: "json-inspector"}, "JSON Inspector"),
    p("This is another example of leveraging ", Link("functional-style DOM tree building", "/tutorial#fun-dom"), " - to build a tree view for inspecting JSON data:"),
    Js(`const ListItem = ({key, value, indent = 0}) => {
  const hide = van.state(key !== "")
  const style = {deps: [hide], f: hide => hide ? "display: none" : ""}
  let valueDom
  if (typeof value !== "object") valueDom = value
  else valueDom = div({style},
    Object.entries(value).map(([k, v]) =>
      ListItem({key: k, value: v, indent: indent + 2 * (key !== "")})),
  )
  return (key ? div : pre)(
    " ".repeat(indent),
    key ? (
      typeof valueDom !== "object" ? ["🟰 ", b(\`\${key}: \`)] :
        a({onclick: () => hide.val = !hide.val, style: "cursor: pointer"},
          van.bind(hide, hide => hide ? "➕ " : "➖ "),
          b(\`\${key}: \`),
          van.bind(hide, hide => hide ? "…" : ""),
        )
    ) : [],
    valueDom,
  )
}

const JsonInspector = ({initInput}) => {
  const textareaDom = textarea({rows: 5, cols: 80}, initInput)
  const errmsg = van.state(""), json = van.state(null)

  const inspect = () => {
    try {
      json.val = JSON.parse(textareaDom.value)
      errmsg.val = ""
    } catch (e) {
      errmsg.val = e.message
    }
  }

  return div(
    div(textareaDom),
    div(button({onclick: inspect}, "Inspect")),
    pre({style: "color: red"}, errmsg),
    van.bind(json, json => json ? ListItem({key: "", value: json}) : ""),
  )
}
`),
    p(Demo()),
    p({id: "demo-json-inspector"}),
    p({
      id: "jsfiddle-json-inspector",
      "data-prefix": "const {a, b, button, div, pre, span, textarea} = van.tags",
      "data-suffix": 'van.add(document.body, JsonInspector({initInput: `{"name":"John Doe","age":30,"email":"johndoe@example.com","address":{"street":"123 Main St","city":"Anytown","state":"CA","zip":"12345"},"phone_numbers":[{"type":"home","number":"555-1234"},{"type":"work","number":"555-5678"}]}`}))',
    }),
    H2({id: "auto-complete"}, "Textarea with Autocomplete"),
    p("The code below implements a ", SymLink("textarea", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea"), " with autocomplete support. This implementation leverages ", Link("Stateful DOM binding", "/tutorial#stateful-binding"), " to optimize the performance of DOM tree rendering:"),
    p(i("The code was implemented in TypeScript to validate ", VanJS(), "'s TypeScript support.")),
    Ts(`interface SuggestionListProps {
  readonly candidates: readonly string[]
  readonly selectedIndex: number
}
const SuggestionList = ({candidates, selectedIndex}: SuggestionListProps) =>
  div({class: "suggestion"}, candidates.map((s, i) => pre({
    "data-index": i,
    class: i === selectedIndex ? "text-row selected" : "text-row",
  }, s)))

const lastWord = (text: string) => text.match(/\\w+$/)?.[0] ?? ""

const AutoComplete = ({words}: {readonly words: readonly string[]}) => {
  const getCandidates = (prefix: string) => {
    const maxTotal = 10, result: string[] = []
    for (let word of words) {
      if (word.startsWith(prefix.toLowerCase())) result.push(word)
      if (result.length >= maxTotal) break
    }
    return result
  }

  const prefix = van.state("")
  const candidates = van.state(getCandidates(""))
  prefix.onnew(p => candidates.val = getCandidates(p))
  const selectedIndex = van.state(0)
  candidates.onnew(() => selectedIndex.val = 0)

  const suggestionList = van.bind(candidates, selectedIndex,
    (candidates, selectedIndex, dom, oldCandidates, oldSelectedIndex) => {
      if (dom && candidates === oldCandidates) {
        // If the candidate list doesn't change, we don't need to re-render the
        // suggetion list. Just need to change the selected candidate.
        dom.querySelector(\`[data-index="\${oldSelectedIndex}"]\`)
          ?.classList?.remove("selected")
        dom.querySelector(\`[data-index="\${selectedIndex}"]\`)
          ?.classList?.add("selected")
        return dom
      }
      return SuggestionList({candidates, selectedIndex})
    })

  const onkeydown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      selectedIndex.val = selectedIndex.val + 1 < candidates.val.length ? selectedIndex.val + 1 : 0
      e.preventDefault()
    } else if (e.key === "ArrowUp") {
      selectedIndex.val = selectedIndex.val > 0 ? selectedIndex.val - 1 : candidates.val.length - 1
      e.preventDefault()
    } else if (e.key === "Enter") {
      const candidate = candidates.val[selectedIndex.val] ?? prefix.val
      const target = <HTMLTextAreaElement>e.target
      target.value += candidate.substring(prefix.val.length)
      target.setSelectionRange(target.value.length, target.value.length)
      prefix.val = lastWord(target.value)
      e.preventDefault()
    }
  }

  const oninput = (e: Event) => prefix.val = lastWord((<HTMLTextAreaElement>e.target).value)

  return div({class: "root"}, textarea({onkeydown, oninput}), suggestionList)
}
`),
    p(Demo()),
    p({id: "demo-auto-complete-stateful-binding"}),
    p({id: "jsfiddle-auto-complete-stateful-binding"},
      a({href: "https://jsfiddle.net/jps6bnvL/7/"}, "Try on jsfiddle"),
    ),
    p("Alternatively, we can implement the same app with ", Link("State-derived properties", "/tutorial#state-derived-prop"), ":"),
    p(i("The code was implemented in TypeScript to validate ", VanJS(), "'s TypeScript support.")),
    Ts(`const lastWord = (text: string) => text.match(/\\w+$/)?.[0] ?? ""

const AutoComplete = ({words}: {readonly words: readonly string[]}) => {
  const maxTotalCandidates = 10

  const getCandidates = (prefix: string) => {
    const result: string[] = []
    for (let word of words) {
      if (word.startsWith(prefix.toLowerCase())) result.push(word)
      if (result.length >= maxTotalCandidates) break
    }
    return result
  }

  const prefix = van.state("")
  const candidates = van.state(getCandidates(""))
  prefix.onnew(p => candidates.val = getCandidates(p))
  const selectedIndex = van.state(0)
  candidates.onnew(() => selectedIndex.val = 0)

  const SuggestionListItem = ({index}: {index: number}) => pre(
    {class: {deps: [selectedIndex], f: s => index === s ? "text-row selected" : "text-row"}},
    van.bind(candidates, c => c[index] ?? ""),
  )

  const indices: number[] = []
  for (let i = 0; i < 10; ++i) indices.push(i)
  const suggestionList = div({class: "suggestion"},
    indices.map(index => SuggestionListItem({index})))

  const onkeydown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      selectedIndex.val = selectedIndex.val + 1 < candidates.val.length ? selectedIndex.val + 1 : 0
      e.preventDefault()
    } else if (e.key === "ArrowUp") {
      selectedIndex.val = selectedIndex.val > 0 ? selectedIndex.val - 1 : candidates.val.length - 1
      e.preventDefault()
    } else if (e.key === "Enter") {
      const candidate = candidates.val[selectedIndex.val] ?? prefix.val
      const target = <HTMLTextAreaElement>e.target
      target.value += candidate.substring(prefix.val.length)
      target.setSelectionRange(target.value.length, target.value.length)
      prefix.val = lastWord(target.value)
      e.preventDefault()
    }
  }

  const oninput = (e: Event) => prefix.val = lastWord((<HTMLTextAreaElement>e.target).value)

  return div({class: "root"}, textarea({onkeydown, oninput}), suggestionList)
}
`),
    p(Demo()),
    p({id: "demo-auto-complete-derived-props"}),
    p({id: "jsfiddle-auto-complete-derived-props"},
    a({href: "https://jsfiddle.net/h8utdb7g/5/"}, "Try on jsfiddle"),
    ),
    H2("HTML to VanJS Code Converter"),
    p("The converter that converts HTML snippet to ", VanJS(), " code, is also implemented with ", VanJS(), ":"),
    Js(`const quoteIfNeeded = key => /^[a-zA-Z_][a-zA-Z_0-9]+$/.test(key) ?
  key : \`"\${key}"\`

const attrsToVanCode = dom => dom.attributes.length > 0 ?
  \`{\${[...dom.attributes].map(
    a => \`\${quoteIfNeeded(a.nodeName)}: \${JSON.stringify(a.nodeValue)}\`)
    .join(", ")}}\${dom.childNodes.length > 0 ? "," : ""}\` : ""

const filterChild = (childNodes, {skipEmptyText}) =>
  [...childNodes].filter(c =>
    !skipEmptyText || c.nodeName !== "#text" || /\\S/.test(c.nodeValue))

const autoGrow = e => {
  e.style.height = "5px"
  e.style.height = e.scrollHeight + "px"
}

const domToVanCode = (dom,
  {indent = 0, indentLevel, skipEmptyText, skipTrailingComma},
  tagsUsed) => {
  const prefix = " ".repeat(indent)
  const suffix = skipTrailingComma ? "" : ","
  if (dom.nodeName === "#text")
    return [\`\${prefix}\${JSON.stringify(dom.nodeValue)}\${suffix}\`]
  const lowerCaseTagName = dom.nodeName.toLowerCase()
  tagsUsed.add(lowerCaseTagName)
  if (lowerCaseTagName === "pre") skipEmptyText = false
  return [
    \`\${prefix}\${lowerCaseTagName}(\${attrsToVanCode(dom)}\`,
    ...filterChild(dom.childNodes, {skipEmptyText}).flatMap(c =>
      domToVanCode(
        c, {indent: indent + indentLevel, indentLevel, skipEmptyText},
        tagsUsed)),
    \`\${prefix})\${suffix}\`,
  ]
}

const Converter = ({initInput}) => {
  const oninput = () => {
    autoGrow(textareaDom)
    const containerDom = div()
    containerDom.innerHTML = textareaDom.value
    const tagsUsed = new Set;
    const childNodes = filterChild(containerDom.childNodes,
      {skipEmptyText: skipEmptyTextDom.checked})
    const lines = childNodes.flatMap(c =>
      domToVanCode(c, {
        indentLevel: parseInt(indentInputDom.value),
        skipEmptyText: skipEmptyTextDom.checked,
        skipTrailingComma: childNodes.length <= 1
      }, tagsUsed))
    const sortedTags = [...tagsUsed].sort()
    tagsCode.val = \`const {\${sortedTags.join(", ")}} = tags\`
    domCode.val = lines.join("\\n")
    setTimeout(() => Prism.highlightAll(), 5)
  }

  const textareaDom = textarea({oninput, style: "width: 100%;"}, initInput)
  const indentInputDom = input(
    {type: "number", min: "1", max: "8", value: "2", oninput})
  const skipEmptyTextDom = input({type: "checkbox", oninput})
  const tagsCode = van.state(""), domCode = van.state("")

  // Trigger the UI update after initialization
  setTimeout(() => textareaDom.dispatchEvent(new Event("input")))
  return div(
    h5("Paste your HTML snippet here:"),
    textareaDom,
    "Indent level: ", indentInputDom, " ",
    skipEmptyTextDom, "Skip empty text",
    h5("Declaring tag functions:"),
    van.bind(tagsCode, c => div(pre(code({ class: "language-js" }, c)))),
    h5("Building the DOM tree:"),
    van.bind(domCode, c => div(pre(code({ class: "language-js" }, c)))),
  )
}
`),
    p("You can try it out with ", Link("this link", "/convert"), "."),
    H2("Jupyter-like JavaScript Console"),
    p("Next up, we're going to demonstrate a simplified Jupyter-like JavaScript console implemented in ", b("less than 100 lines"), " of code with ", VanJS(), ". The JavaScript console supports drawing tables (with the technique similar to ", Link("Table Viewer", "#table-viewer"), "), inspecting objects in a tree view (with the technique similar to ", Link("Json Inspector", "#json-inspector") , ") and plotting (with the integration of ", Link("Google Charts", "https://developers.google.com/chart"), ")."),
    p("Here is the implementation:"),
    Js(`const toDataArray = data => {
  const hasPrimitive = !data.every(r => typeof r === "object")
  const keys = [...new Set(
    data.flatMap(r => typeof r === "object" ? Object.keys(r) : []))]
  return [
    (hasPrimitive ? ["Value"] : []).concat(keys),
    ...data.map(r =>
      (typeof r === "object" ? (hasPrimitive ? [""] : []) : [r]).concat(
        keys.map(k => r[k] ?? "")
      )),
  ]
}

const table = data => {
  const dataArray = toDataArray(data)
  return van.tags.table(
    thead(tr(th("(index)"), dataArray[0].map(k => th(k)))),
    tbody(dataArray.slice(1).map((r, i) => tr(td(i), r.map(c => td(c))))),
  )
}

const plot = (data, chartType, options) => {
  if (data[0].constructor === Object) data = toDataArray(data)
  else if (typeof data[0] === "number")
    data = [["", "Value"], ...data.map((d, i) => [i + 1, d])]
  const dom = div({class: "chart"})
  setTimeout(() => new google.visualization[chartType](dom).draw(
    google.visualization.arrayToDataTable(data), options))
  return dom
}

const Tree = ({obj, indent = ""}) =>
  (indent ? div : pre)(Object.entries(obj).map(([k, v]) => {
    if (v?.constructor !== Object && !Array.isArray(v))
      return div(indent + "🟰 ", van.tags.b(k + ": "), v)
    const icon = van.state("➕ ")
    const suffix = van.state(" {…}")
    const show = () => {
      const treeDom = result.appendChild(Tree({obj: v, indent: indent + "  "}))
      icon.val = "➖ "
      suffix.val = ""
      onclick.val = () => {
        treeDom.remove()
        onclick.val = show
        icon.val = "➕ "
        suffix.val = " {…}"
      }
    }
    const onclick = van.state(show)
    const result = div(indent, van.tags.a({onclick}, icon, van.tags.b(k + ":"), suffix))
    return result
  }))

const ValueView = expr => {
  try {
    const value = eval(\`(\${expr})\`)
    if (value instanceof Element) return value
    if (value?.constructor === Object || Array.isArray(value)) return Tree({obj: value})
    return pre(String(value))
  } catch (e) {
    return pre({class: "err"}, e.message + "\\n" + e.stack)
  }
}

const Output = ({id, expr}) => div({class: "row"},
  pre({class: "left"}, \`Out[\${id}]:\`),
  div({class: "break"}),
  div({class: "right"}, ValueView(expr)),
)

const autoGrow = e => {
  e.target.style.height = "5px"
  e.target.style.height = e.target.scrollHeight + "px"
}

const Input = ({id}) => {
  const run = () => {
    textareaDom.setAttribute("readonly", true)
    runDom.disabled = true
    const newTextDom = van.add(textareaDom.closest(".console"), Output({id, expr: textareaDom.value}))
      .appendChild(Input({id: id + 1}))
      .querySelector("textarea")
    newTextDom.focus()
    setTimeout(() => newTextDom.scrollIntoView(), 10)
  }
  const runDom = button({class: "run", onclick: run}, "Run")
  const onkeydown = async e => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault()
      run()
    }
  }
  const textareaDom = textarea({id, type: "text", onkeydown, oninput: autoGrow,
    rows: 1, placeholder: 'Enter JS expression here:'})
  return div({class: "row"},
    pre({class: "left"}, \`In[\${id}]:\`), runDom, div({class: "break"}),
    div({class: "right"}, textareaDom),
  )
}

const Console = () => div({class: "console"}, Input({id: 1}))
`),
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
  ['Framework', 'Size', {role: 'style'}, {role: 'annotation'}],
  ['VanJS', 1.2, '#f44336', 'VanJS-0.11.9 1.2kB'],
  ['Preact', 10.8, '#b7b7b7', 'Preact-10.13.1 10.8kB'],
  ['jQuery', 88.2, '#b7b7b7', 'jQuery-3.6.4 88.2kB'],
  ['ReactDom', 130.5, '#b7b7b7', 'ReactDom-18.2.0 130.5kB'],
  ['Angular', 180.9, '#b7b7b7', 'Angular-1.8.3 180.9kB'],
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
    H2("An Improved Unix Shell"),
    p("The final program we're going to demonstrate is a web-based Unix shell that connects to your local computer, with some notable improvements. This is to demonstrate that ", VanJS(), " has the potential to become a great extension to commandline utilities. The program is heavily tested in macOS, and should in theory works in Linux, or in any environment that has ", SymLink("/bin/sh", "https://en.wikipedia.org/wiki/Bourne_shell"), "."),
    p("Compare to ordinary Unix shell that you're familar with, the web-based shell has 2 notable improvements:"),
    ol(
      li("Command ", Symbol("ps ..."), " will render an HTML table instead of text output."),
      li("Command ", Symbol("tree"), " (need the exact text match) will render an interactive tree-view of your current directory, like the one in the screenshot below:", div(img({src: "/tree_screenshot.png", alt: "Tree-view of the current directory"}))),
    ),
    H3("Deployment Steps"),
    p("1. To make the program work, we need to deploy the server first, which is implemented with Deno. If you don't have Deno in your environment, you can get it installed from ", Link("deno.com", "https://deno.com/runtime"), "."),
    p("2. Copy the code below, and save it into ", Symbol("shell.ts"), ", under the same directory of ", Symbol(`van-${version}.min.js`), ". Alternatively, you can directly download the file with the link here: ", Download("shell.ts"), "."),
    TsFile("code/shell.ts"),
    p("3. Copy the code below, and save it into ", Symbol("shell.html"), ", under the same directory of ", Symbol("shell.ts"), ". After this step, your working directory should have 3 files: ", Symbol("shell.ts"), ", ", Symbol("shell.html"), " and ", Symbol(`van-${version}.min.js`), ". Alternatively, you can directly download the file with the link here: ", Download("shell.html"), "."),
    HtmlFile("code/shell.html"),
    p("4. Run the command below under your working directory:"),
    p(i("You can append a custom port number to the end. By default, port 8000 will be chosen.")),
    Shell("deno run --allow-net --allow-run --allow-read shell.ts"),
    p("5. You can visit the web-based shell with the URL printed in the console output of ", Symbol("deno run"), ". In your first visit, it will ask you to login, you need to paste the random key printed from the console to proceed."),
    p("6. After login, you will be able to see and use the web-based shell."),
    H3("Security Considerations"),
    p("This program allows web access to your OS shell, which elevates the privilege to a level that you would not normally get with your browser. Here are the extra measures we're taking to ensure the security of your local computer:"),
    ol(
      li("Only local connection to your ", Symbol("shell.ts"), " server is allowed."),
      li("Before using the web-based shell in your browser, you need to login with the key printed in the console of ", Symbol("shell.ts"), " server first. The key is generated randomly every time the server restarts. You should never share the key to other people."),
      li("You're advised to shut down the ", Symbol("shell.ts"), " server when you're not using the shell to further reduce the risk of unauthorized access to your shell with the leaked key. Next time, when the server restarts, any browser access needs the login with the new key generated randomly."),
      li("Please be aware that any commands you run in the web-based shell are the real commands executed on your computer. Thus don't try dangerous stuff as they are IRREVERSIBLE."),
    ),
  )
}
