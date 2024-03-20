const {button, div, input, sup} = van.tags

// Create a new state object with init value 1
const counter = van.state(1)

// Log whenever the value of the state is updated
van.derive(() => console.log(`Counter: ${counter.val}`))

// Derived state
const counterSquared = van.derive(() => counter.val * counter.val)

// Used as a child node
const dom1 = div(counter)

// Used as a property
const dom2 = input({type: "number", value: counter, disabled: true})

// Used in a state-derived property
const dom3 = div({style: () => `font-size: ${counter.val}em;`}, "Text")

// Used in a state-derived child
const dom4 = div(counter, sup(2), () => ` = ${counterSquared.val}`)

// Button to increment the value of the state
const incrementBtn = button({onclick: () => ++counter.val}, "Increment")
const resetBtn = button({onclick: () => counter.val = 1}, "Reset")

van.add(document.body, incrementBtn, resetBtn, dom1, dom2, dom3, dom4)
