const TableViewer = ({inputText, inputType}) => {
  const jsonRadioDom = input({type: "radio", checked: inputType === "json",
    name: "inputType", value: "json"})
  const csvRadioDom = input({type: "radio", checked: inputType === "csv",
    name: "inputType", value: "csv"})
  const autoGrow = e => {
    e.style.height = "5px"
    e.style.height = (e.scrollHeight + 5) + "px"
  }
  const textareaDom = textarea({oninput: e => autoGrow(e.target)}, inputText)
  setTimeout(() => autoGrow(textareaDom), 10)

  const text = van.state("")

  const tableFromJson = text => {
    const json = JSON.parse(text), head = Object.keys(json[0])
    return {
      head,
      data: json.map(row => head.map(h => row[h]))
    }
  }

  const tableFromCsv = text => {
    const lines = text.split("\n").filter(l => l.length > 0)
    return {
      head: lines[0].split(","),
      data: lines.slice(1).map(l => l.split(",")),
    }
  }

  return div(
    div(jsonRadioDom, label("JSON"), csvRadioDom, label("CSV (Quoting not Supported)")),
    div(textareaDom),
    div(button({onclick: () => text.val = textareaDom.value}, "Show Table")),
    p(() => {
      if (!text.val) return div()
      try {
        const {head, data} = (jsonRadioDom.checked ? tableFromJson : tableFromCsv)(text.val)
        return table(
          thead(tr(head.map(h => th(h)))),
          tbody(data.map(row => tr(row.map(col => td(col))))),
        )
      } catch (e) {
        return pre({class: "err"}, e.toString())
      }
    }),
  )
}
