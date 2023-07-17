const {button, code, div, input, li, p, pre, span, tbody, td, textarea, th, thead, tr, ul} = van.tags

{
  const autoGrow = e => {
    e.target.style.height = "5px"
    e.target.style.height = (e.target.scrollHeight + 5) + "px"
  }

  const Result = diff => div({class: "column", style: "white-space: pre-wrap;"},
    diff.map(d =>
      span({class: d.added ? "add" : (d.removed ? "remove" : "")}, d.value)),
  )

  const DiffApp = () => {
    const oldTextDom = textarea({oninput: autoGrow, rows: 1})
    const newTextDom = textarea({oninput: autoGrow, rows: 1})
    const diff = van.state([])
    return div(
      div({class: "row"},
        div({class: "column"}, oldTextDom),
        div({class: "column"}, newTextDom),
      ),
      div({class: "row"},
        button(
          {onclick: () => diff.val = Diff.diffWords(oldTextDom.value, newTextDom.value)},
          "Diff",
        ),
      ),
      div({class: "row"}, van.bind(diff, Result)),
    )
  }

  van.add(document.getElementById("demo-diff-simple"), DiffApp())
}

{
  const autoGrow = e => {
    e.target.style.height = "5px"
    e.target.style.height = (e.target.scrollHeight + 5) + "px"
  }

  const Line = ({diff, skipAdd, skipRemove}) => div(
    {class: "column", style: "white-space: pre-wrap;"},
    diff.filter(d => !(skipAdd && d.added || skipRemove && d.removed)).map(d =>
      span({class: d.added ? "add" : (d.removed ? "remove" : "")}, d.value)),
  )

  const DiffLine = (oldLine, newLine, showMerged) => {
    const diff = Diff.diffWords(oldLine, newLine)
    return div({class: "row" + (showMerged ? " merged" : "")},
      showMerged ?
        Line({diff}) : [Line({diff, skipAdd: true}), Line({diff, skipRemove: true})],
    )
  }

  const DiffApp = () => {
    const oldTextDom = textarea({oninput: autoGrow, rows: 1})
    const newTextDom = textarea({oninput: autoGrow, rows: 1})
    const diff = van.state([])
    const showMerged = van.state(true)
    return div(
      div({class: "row"},
        div({class: "column"}, oldTextDom),
        div({class: "column"}, newTextDom),
      ),
      div({class: "row"},
        button({onclick: () => diff.val = Diff.diffLines(oldTextDom.value, newTextDom.value)},
          "Diff",
        ),
        input({type: "checkbox", checked: showMerged,
          oninput: e => showMerged.val = e.target.checked}),
        "show merged result"
      ),
      van.bind(diff, showMerged, (diff, showMerged) => {
        const resultDom = div()
        for (let i = 0; i < diff.length; ) {
          let line
          if (diff[i].added && diff[i + 1].removed) {
            line = DiffLine(diff[i + 1].value, diff[i].value, showMerged)
            i += 2
          } else if (diff[i].removed && diff[i + 1].added) {
            line = DiffLine(diff[i].value, diff[i + 1].value, showMerged)
            i += 2
          } else if (diff[i].added) {
            line = showMerged ? div({class: "merged add row"},
              div({class: "column", style: "white-space: pre-wrap;"}, diff[i].value),
            ) : div({class: "row"},
              div({class: "column"}),
              div({class: "add column", style: "white-space: pre-wrap;"}, diff[i].value),
            )
            ++i
          } else if (diff[i].removed) {
            line = showMerged ? div({class: "merged remove row"},
              div({class: "column", style: "white-space: pre-wrap;"}, diff[i].value),
            ) : div({class: "row"},
              div({class: "remove column", style: "white-space: pre-wrap;"}, diff[i].value),
            )
            ++i
          } else {
            line = div({class: "row", style: "white-space: pre-wrap;"},
              showMerged ? div({class: "merged column"}, diff[i].value) :
                [
                  div({class: "column"}, diff[i].value),
                  div({class: "column"}, diff[i].value),
                ],
            )
            ++i
          }
          van.add(resultDom, line)
        }
        return resultDom
      })
    )
  }

  van.add(document.getElementById("demo-diff"), DiffApp())
}

{
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

  const autoGrow = e => {
    e.target.style.height = "5px"
    e.target.style.height = (e.target.scrollHeight + 5) + "px"
  }

  const Input = ({id}) => {
    const run = () => {
      textareaDom.setAttribute("readonly", true)
      runDom.disabled = true
      const newTextDom = van.add(textareaDom.closest(".console"), Output({id, expr: textareaDom.value}))
        .appendChild(Input({id: id + 1}))
        .querySelector("textarea")
      newTextDom.focus()
      setTimeout(() => newTextDom.scrollIntoView({block: "center", inline: "nearest"}), 10)
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
      pre({class: "left"}, `In[${id}]:`), runDom, div({class: "break"}),
      div({class: "right"}, textareaDom),
    )
  }

  const Console = () => div({class: "console"}, Input({id: 1}))

  const Snippet = str => {
    const copyToClipboard = e => navigator.clipboard.writeText(str)
      .then(() => {
        const msgDom = van.tags.i("Copied!")
        e.target.after(msgDom)
        setTimeout(() => msgDom.remove(), 1000)
      }, () => {
        const msgDom = van.tags.i("Copy failed: " + e.message)
        e.target.after(msgDom)
        setTimeout(() => msgDom.remove(), 1000)
      })
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
  ["Framework", "Size", {role: "style"}, {role: "annotation"}],
  ["VanJS", 0.8, "#f44336", "VanJS-0.12.4 0.8kB"],
  ["Preact", 4.3, "#b7b7b7", "Preact-10.15.1 4.3kB"],
  ["jQuery", 29.7, "#b7b7b7", "jQuery-3.7.0 29.7kB"],
  ["ReactDOM", 42, "#b7b7b7", "ReactDOM-18.2.0 42kB"],
  ["Angular", 62.3, "#b7b7b7", "Angular-1.8.3 62.3kB"],
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
}