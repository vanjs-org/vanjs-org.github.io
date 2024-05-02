const {button, option, select, span} = van.tags

const Counter = () => {
  const counter = van.state(0)
  const action = van.state("👍")
  return span(
    "❤️ ", counter, " ",
    select({oninput: e => action.val = e.target.value, value: action},
      option({value: "👍"}, "👍"), option({value: "👎"}, "👎"),
    ), " ",
    button({onclick: van.derive(() => action.val === "👍" ?
      () => ++counter.val : () => --counter.val)}, "Run"),
  )
}

van.add(document.body, Counter())
