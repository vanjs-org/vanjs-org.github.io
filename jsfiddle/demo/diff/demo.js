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

document.body.appendChild(DiffApp())
