const {button, div, input, sup} = van.tags

// Create a new State object with init value 1
const counter = van.state(1)

// Log whenever the value of the state is updated
counter.onnew((v, oldV) => console.log(`Counter: ${oldV} -> ${v}`))

// Used as a child node
const dom1 = div(counter)

// Used as a property
const dom2 = input({type: "number", value: counter, disabled: true})

// Used in a state-derived property
const dom3 = div(
  {style: {deps: [counter], f: c => `font-size: ${c}em;`}},
  "Text")

// Used in a complex binding
const dom4 = van.bind(counter, c => div(c, sup(2), ` = ${c * c}`))

// Button to increment the value of the state
const incrementBtn = button({onclick: () => ++counter.val}, "Increment")
const resetBtn = button({onclick: () => counter.val = 1}, "Reset")

van.add(document.body, incrementBtn, resetBtn, dom1, dom2, dom3, dom4)
