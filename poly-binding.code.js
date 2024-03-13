const {button, span} = van.tags

const stateProto = Object.getPrototypeOf(van.state())
const val = v => {
  const protoOfV = Object.getPrototypeOf(v ?? 0)
  if (protoOfV === stateProto) return v.val
  if (protoOfV === Function.prototype) return v()
  return v
}

const Button = ({color, text, onclick}) =>
  button({style: () => `background-color: ${val(color)};`, onclick}, text)

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
      color: () => `rgb(${lightness.val}, ${lightness.val}, ${lightness.val})`,
      text: "Get Darker",
      onclick: () => lightness.val = Math.max(lightness.val - 10, 0),
    }),
  )
}

van.add(document.body, App())
