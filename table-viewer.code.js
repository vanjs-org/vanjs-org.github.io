const TableViewer = ({inputText, inputType}) => {
  const resultDom = div()

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

  const tableFromJson = text => {
    const json = JSON.parse(text)
    const head = Object.keys(json[0])
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

  const showTable = () => {
    try {
      let {head, data} = jsonRadioDom.checked ?
        tableFromJson(textareaDom.value) : tableFromCsv(textareaDom.value)
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
    div(textareaDom),
    div(button({onclick: showTable}, "Show Table")),
    pre({class: "err"}),
    resultDom,
  )
  return dom
}
