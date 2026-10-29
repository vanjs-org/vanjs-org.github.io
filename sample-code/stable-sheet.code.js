const StableSheet = () => {
  const input = vanX.reactive({A1: 10}), filled = van.state(false)
  const runs = van.state(0)
  const twiceA1 = () => { ++runs.val; return 2 * input.A1 }
  const sheet = vanX.reactive({
    cells: vanX.calc(() => filled.val ? {B1: twiceA1()} : {}),
  })
  return div(
    button({onclick: () => filled.val = true}, "Set B1 = 2 × A1"), " ",
    button({onclick: () => ++input.A1}, "Increase A1"),
    p("A1: ", () => input.A1),
    vanX.list(ul, sheet.cells, (value, _, cell) => li(
      cell, ": ", value, " ", button({onclick: () => filled.val = false}, "Clear"),
    )),
    p("Formula runs: ", runs),
  )
}
