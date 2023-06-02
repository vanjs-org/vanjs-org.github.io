const {div, input, span} = van.tags

const Label = text => span({class: "label"}, text)
const Value = text => span({class: "value"}, text)

const Inspector = () => {
  const keyStates = {
    key: van.state(""),
    code: van.state(""),
    which: van.state(""),
    keyCode: van.state(""),
    ctrlKey: van.state(false),
    metaKey: van.state(false),
    altKey: van.state(false),
    shiftKey: van.state(false),
  }

  const Result = prop => span(Label(prop + ": "), Value(keyStates[prop]))

  const onkeydown = e => {
    e.preventDefault()
    Object.entries(keyStates).forEach(([k, v]) => v.val = e[k])
  }

  return div(
    div(input({placeholder: "Focus here and press keys…", onkeydown,
      style: "width: 260px"})),
    div(Result("key"), Result("code"), Result("which"), Result("keyCode")),
    div(Result("ctrlKey"), Result("metaKey"), Result("altKey"), Result("shiftKey")),
  )
}

van.add(document.body, Inspector())
