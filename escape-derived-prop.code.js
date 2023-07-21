const {button, option, select, span} = van.tags

const Counter = () => {
  const counter = van.state(0)
  const action = van.state("Up")
  return span(
    "❤️ ", counter, " ",
    select({oninput: e => action.val = e.target.value, value: action},
      option({value: "Up"}, "Up"), option({value: "Down"}, "Down"),
    ), " ",
    button({onclick: van._(() => action.val === "Up" ?
      () => ++counter.val : () => --counter.val)}, "Run"),
  )
}

van.add(document.body, Counter())
