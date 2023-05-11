const {button, pre, span} = van.tags

const Stopwatch = () => {
  const elapsed = van.state("0.00")
  let id
  const start = () => id = id || setInterval(() =>
    elapsed.val = (Number(elapsed.val) + 0.01).toFixed(2), 10)
  return span(
    pre({style: "display: inline;"}, elapsed, "s "),
    button({onclick: start}, "Start"),
    button({onclick: () => (clearInterval(id), id = 0)}, "Stop"),
    button({onclick: () =>
      (clearInterval(id), id = 0, elapsed.val = "0.00")}, "Reset"),
  )
}

van.add(document.body, Stopwatch())
