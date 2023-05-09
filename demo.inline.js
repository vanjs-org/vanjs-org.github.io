const {button, code, div, li, p, pre, span, tbody, td, textarea, th, thead, tr, ul} = van.tags

const toDataArray = data => {
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
    const value = eval(`(${expr})`)
    if (value instanceof Element) return value
    if (value?.constructor === Object || Array.isArray(value)) return Tree({obj: value})
    return pre(String(value))
  } catch (e) {
    return pre({class: "err"}, e.message + "\n" + e.stack)
  }
}

const Output = ({id, expr}) => div({class: "row"},
  pre({class: "left"}, `Out[${id}]:`),
  div({class: "break"}),
  div({class: "right"}, ValueView(expr)),
)

const Input = ({id}) => {
  const run = () => {
    textareaDom.setAttribute("readonly", true)
    runDom.disabled = true
    van.add(textareaDom.closest(".console"), Output({id, expr: textareaDom.value}))
      .appendChild(Input({id: id + 1}))
      .querySelector("textarea").focus()
  }
  const runDom = button({class: "run", onclick: run}, "Run")
  const onkeydown = async e => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault()
      run()
    }
  }
  const oninput = e => e.target.rows = Math.max(numRows(e.target.value), 3)
  const textareaDom = textarea({id, type: "text", rows: 3,
    placeholder: 'Enter JS expression here:', onkeydown, oninput})
  const numRows = s => (s.match(/\n/g)?.length ?? 0) + 1
  return div({class: "row"},
    pre({class: "left"}, `In[${id}]:`), runDom, div({class: "break"}),
    div({class: "right"}, textareaDom),
  )
}

const Console = () => div({class: "console"}, Input({id: 1}))

const Snippet = str => {
  const copyToClipboard = e => {
    navigator.clipboard.writeText(str)
    const msgDom = e.target.parentNode.appendChild(van.tags.i("Copied!"))
    setTimeout(() => msgDom.remove(), 1000)
  }
  return str.includes("\n") ? div(
    van.tags.a({onclick: copyToClipboard}, "📋"), pre(str),
  ) : span(
    code(str), van.tags.a({onclick: copyToClipboard}, "📋")
  )
}

google.charts.load('current', {packages: ['corechart']})
google.charts.setOnLoadCallback(() =>
  van.add(document.getElementById("demo-js-console"),
    div("JavaScript Console. Please enter JS expression here, and type ⌘ + ↵ or ^ + ↵ to evaluate:"),
    div("You can assign variables in format like 'x = 3 + 5'."),
    p("Try the following commands:", ul(
      li(Snippet("{a: 1, b: {c: 2, d: 3}}")),
      li(Snippet("table([{a: 1, b: 2}, {b: 2, c: 3}])")),
      li("Any valid JSON string, e.g.: ", Snippet('{"name":"John","pets":[{"name":"Fluffy","species":"cat"},{"name":"Buddy","species":"dog"}]}')),
      li(Snippet('plot([2, 5, 3], "LineChart")')),
      li(Snippet('plot([{Year:"2020",Sales:1000,Expenses:400},{Year:"2021",Sales:1170,Expenses:460},{Year:"2022",Sales:660,Expenses:1120},{Year:"2023",Sales:1030,Expenses:540}], "LineChart", {legend:{position:"bottom"}})')),
      li("The chart shown in the home page:", Snippet(`plot([
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
})`)),
      li("More chart types supported in ", van.tags.a({href: "https://developers.google.com/chart/interactive/docs"}, "Google Charts")),
    )),
    Console()
  )
)