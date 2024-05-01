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
