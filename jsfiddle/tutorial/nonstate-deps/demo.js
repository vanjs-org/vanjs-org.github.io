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

  const lightness = van.state(255)

  return span(
    Button({color: "yellow", text: "Click Me", onclick: () => alert("Clicked")}), " ",
    Button({color: colorState, text: textState, onclick: onclickState}), " ",
    Button({
      color: van.derive(() => `rgb(${lightness.val}, ${lightness.val}, ${lightness.val})`),
      text: "Get Darker",
      onclick: () => lightness.val = Math.max(lightness.val - 10, 0),
    }),
  )
}
