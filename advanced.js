{
  const {b, button, span} = van.tags

  const TurnBold = () => {
    const vanJS = van.state("VanJS")
    return span(
      button({onclick: () => vanJS.val = b("VanJS")}, "Turn Bold"),
      " Welcome to ", vanJS, ". ", vanJS, " is awesome!"
    )
  }

  van.add(document.getElementById("demo-dom-valued-state"), TurnBold())
}

{
  const {div, input, option, select} = van.tags

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

  van.add(document.getElementById("demo-conditional-binding"), ConditionalBinding())
}

{
  const {div, input, option, select} = van.tags

  const ConditionalDerive = () => {
    const formula = van.state("a + b")
    const a = van.state(1), b = van.state(2), c = van.state(3), d = van.state(4)
    const triggeredTimes = new Text(0)
    const sum = van.derive(() => {
      triggeredTimes.textContent = Number(triggeredTimes.textContent) + 1
      return formula.val === "a + b" ? a.val + b.val : c.val + d.val
    })

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
      div("sum: ", sum),
      div("Binding function triggered: ", triggeredTimes, " time(s)"),
    )
  }

  van.add(document.getElementById("demo-conditional-derive"), ConditionalDerive())
}

{
  const {button, div} = van.tags

  const Label = ({text, onmount}) => {
    if (onmount) {
      const trigger = van.state(false)
      van.derive(() => trigger.val && onmount())
      trigger.val = true
    }
    return div({class: "label"}, text)
  }

  const App = () => {
    const counter = van.state(0)
    return div(
      div(button({onclick: () => ++counter.val}, "Increment")),
      () => Label({
        text: counter.val,
        onmount: () => document.getElementById("msg").innerText =
          "Current label: " + document.querySelector(".label").innerText,
      }),
      div({id: "msg"}),
    )
  }

  van.add(document.getElementById("demo-onmount"), App())  
}
