const ConditionalBinding = () => {
  const formula = van.state("a + b")
  const a = van.state(1), b = van.state(2), c = van.state(3), d = van.state(4)
  const triggeredTimes = new Text(0)

  return div(
    div(
      "formula: ",
      select({oninput: e => formula.val = e.target.value},
        option({selected: () => formula.val === "a + b"}, "a + b"),
        option({selected: () => formula.val === "c + d"}, "c + d"),
      ),
    " a: ",
      input({type: "number", min: 0, max: 9, value: a, oninput: e => a.val = Number(e.target.value)}),
      " b: ",
      input({type: "number", min: 0, max: 9, value: b, oninput: e => b.val = Number(e.target.value)}),
      " c: ",
      input({type: "number", min: 0, max: 9, value: c, oninput: e => c.val = Number(e.target.value)}),
      " d: ",
      input({type: "number", min: 0, max: 9, value: d, oninput: e => d.val = Number(e.target.value)}),
    ),
    div("sum: ", () => {
      triggeredTimes.textContent = Number(triggeredTimes.textContent) + 1
      return formula.val === "a + b" ? a.val + b.val : c.val + d.val
    }),
    div("Binding function triggered: ", triggeredTimes, " time(s)"),
  )
}
