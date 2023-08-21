const autoGrow = e => {
  e.target.style.height = "5px"
  e.target.style.height = (e.target.scrollHeight + 5) + "px"
}

const DiffApp = () => {
  const oldTextDom = textarea({oninput: autoGrow, rows: 1})
  const newTextDom = textarea({oninput: autoGrow, rows: 1})
  const diff = van.state([])
  return div(
    div({class: "row"},
      div({class: "column"}, oldTextDom), div({class: "column"}, newTextDom),
    ),
    div({class: "row"},
      button({onclick: () => diff.val = Diff.diffWords(oldTextDom.value, newTextDom.value)},
        "Diff",
      ),
    ),
    div({class: "row"}, () => div({class: "column", style: "white-space: pre-wrap;"},
      diff.val.map(d => span({class: d.added ? "add" : (d.removed ? "remove" : "")}, d.value)),
    )),
  )
}