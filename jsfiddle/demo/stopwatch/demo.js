const {button, pre, span} = van.tags

const Stopwatch = () => {
  const elapsed = van.state(0)
  let id
  const start = () => id = id || setInterval(() => elapsed.val += .01, 10)
  return span(
    pre({style: "display: inline;"}, () => elapsed.val.toFixed(2), "s "),
    button({onclick: start}, "Start"),
    button({onclick: () => (clearInterval(id), id = 0)}, "Stop"),
    button({onclick: () => (clearInterval(id), id = 0, elapsed.val = 0)}, "Reset"),
  )
}

van.add(document.body, Stopwatch())
