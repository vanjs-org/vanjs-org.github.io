{
  const {b, button, span} = van.tags

  const TurnBold = () => {
    const vanJS = van.state("VanJS")
    return span(
      button({onclick: () => vanJS.val = b("VanJS")}, "Turn Bold"),
      " Welcome to ", vanJS, ". ", vanJS, " is awesome!"
    )
  }

  van.add(document.getElementById("demo-dom-valued-state"), TurnBold())
}

{
  const {div, input, option, select} = van.tags

  const ConditionalBinding = () => {
    const formula = van.state("a + b")
    const a = van.state(1), b = van.state(2), c = van.state(3), d = van.state(4)
    const msgDom = div()

    return div(
      div(
        "formula: ",
        select({value: formula, oninput: e => formula.val = e.target.value},
          option("a + b"), option("c + d"),
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
      div(
        "sum: ", () => {
          van.add(msgDom, div("Binding function triggered"))
          return formula.val === "a + b" ? a.val + b.val : c.val + d.val
        }
      ),
      msgDom,
    )
  }

  van.add(document.getElementById("demo-conditional-binding"), ConditionalBinding())
}
