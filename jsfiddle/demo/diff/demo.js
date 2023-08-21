const {button, div, input, span, textarea} = van.tags

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
      div({class: "column"}, oldTextDom), div({class: "column"}, newTextDom),
    ),
    div({class: "row"},
      button({onclick: () => diff.val = Diff.diffLines(oldTextDom.value, newTextDom.value)},
        "Diff",
      ),
      input({type: "checkbox", checked: showMerged,
        oninput: e => showMerged.val = e.target.checked}),
      "show merged result"
    ),
    () => {
      const diffVal = diff.val, showMergedVal = showMerged.val, resultDom = div()
      for (let i = 0; i < diffVal.length; ) {
        let line
        if (diffVal[i].added && diffVal[i + 1].removed) {
          line = DiffLine(diffVal[i + 1].value, diffVal[i].value, showMergedVal)
          i += 2
        } else if (diffVal[i].removed && diffVal[i + 1].added) {
          line = DiffLine(diffVal[i].value, diffVal[i + 1].value, showMergedVal)
          i += 2
        } else if (diffVal[i].added) {
          line = showMergedVal ? div({class: "merged add row"},
            div({class: "column", style: "white-space: pre-wrap;"}, diffVal[i].value),
          ) : div({class: "row"},
            div({class: "column"}),
            div({class: "add column", style: "white-space: pre-wrap;"}, diffVal[i].value),
          )
          ++i
        } else if (diffVal[i].removed) {
          line = showMergedVal ? div({class: "merged remove row"},
            div({class: "column", style: "white-space: pre-wrap;"}, diffVal[i].value),
          ) : div({class: "row"},
            div({class: "remove column", style: "white-space: pre-wrap;"}, diffVal[i].value),
          )
          ++i
        } else {
          line = div({class: "row", style: "white-space: pre-wrap;"},
            showMergedVal ? div({class: "merged column"}, diffVal[i].value) :
              [
                div({class: "column"}, diffVal[i].value),
                div({class: "column"}, diffVal[i].value),
              ],
          )
          ++i
        }
        van.add(resultDom, line)
      }
      return resultDom
    },
  )
}

document.body.appendChild(DiffApp())
