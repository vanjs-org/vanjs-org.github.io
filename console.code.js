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
    const expanded = van.state(false)
    let treeDom
    const onclick = van.derive(() => expanded.val ?
      () => (treeDom.remove(), expanded.val = !expanded.val) :
      () => (treeDom = result.appendChild(Tree({obj: v, indent: indent + "  "}),
        expanded.val = !expanded.val)))
    const result = div(
      indent,
      van.tags.a({onclick},
        () => expanded.val ? "➖ " : "➕ ",
        van.tags.b(k + ":"),
        () => expanded.val ? "" : " {…}",
      ),
    )
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
    pre({class: "left"}, `In[${id}]:`), runDom, div({class: "break"}),
    div({class: "right"}, textareaDom),
  )
}

const Console = () => div({class: "console"}, Input({id: 1}))
