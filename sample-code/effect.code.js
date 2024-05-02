const {button, span} = van.tags

const Counter = () => {
  const counter = van.state(0)
  van.derive(() => console.log("Counter: ", counter.val))
  return span(
    "❤️ ", counter, " ",
    button({onclick: () => ++counter.val}, "👍"),
    button({onclick: () => --counter.val}, "👎"),
  )
}

van.add(document.body, Counter())
