const {button, div, li, p, ul} = van.tags

const EditableSheet = () => {
  const input = vanX.reactive({A1: 10}), formulas = vanX.reactive({})
  const runs = van.state(0)
  const twiceA1 = () => { ++runs.val; return 2 * input.A1 }
  return div(
    button({onclick: () => formulas.B1 ??= vanX.calc(twiceA1)}, "Set B1 = 2 × A1"), " ",
    button({onclick: () => ++input.A1}, "Increase A1"),
    p("A1: ", () => input.A1),
    vanX.list(ul, formulas, (value, clear, cell) => li(
      cell, ": ", value, " ", button({onclick: clear}, "Clear"),
    )),
    p("Formula runs: ", runs),
  )
}

van.add(document.body, EditableSheet())
