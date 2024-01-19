const {button, span} = van.tags

const Button = ({color, text, onclick}) =>
  button({style: () => `background-color: ${van.val(color)};`, onclick}, text)

const App = () => {
  const colorState = van.state("green")
  const textState = van.state("Turn Red")

  const turnRed = () => {
    colorState.val = "red"
    textState.val = "Turn Green"
    onclickState.val = turnGreen
  }
  const turnGreen = () => {
    colorState.val = "green"
    textState.val = "Turn Red"
    onclickState.val = turnRed
  }
  const onclickState = van.state(turnRed)

  return span(
    Button({color: "yellow", text: "Click Me", onclick: () => alert("Clicked")}), " ",
    Button({color: colorState, text: textState, onclick: onclickState}),
  )
}

van.add(document.body, App())
