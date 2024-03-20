const {div, input, span} = van.tags

const Label = text => span({class: "label"}, text)
const Value = text => span({class: "value"}, text)

const Inspector = () => {
  const keyEvent = van.state(new KeyboardEvent("keydown"))

  const Result = prop => span(Label(prop + ": "), Value(() => keyEvent.val[prop]))

  return div(
    div(input({placeholder: "Focus here and press keys…", style: "width: 260px",
      onkeydown: e => (e.preventDefault(), keyEvent.val = e)})),
    div(Result("key"), Result("code"), Result("which"), Result("keyCode")),
    div(Result("ctrlKey"), Result("metaKey"), Result("altKey"), Result("shiftKey")),
  )
}

van.add(document.body, Inspector())
