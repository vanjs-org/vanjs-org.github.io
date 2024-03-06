{
  const {circle, path, svg} = van.tags("http://www.w3.org/2000/svg")

  const Smiley = () => svg({width: "16px", viewBox: "0 0 50 50"},
    circle({cx: "25", cy: "25", "r": "20", stroke: "black", "stroke-width": "2", fill: "yellow"}),
    circle({cx: "16", cy: "20", "r": "2", stroke: "black", "stroke-width": "2", fill: "black"}),
    circle({cx: "34", cy: "20", "r": "2", stroke: "black", "stroke-width": "2", fill: "black"}),
    path({"d": "M 15 30 Q 25 40, 35 30", stroke: "black", "stroke-width": "2", fill: "transparent"}),
  )

  van.add(document.getElementById("demo-smiley"), Smiley())
}

{
  const {math, mi, mn, mo, mrow, msup} = van.tags("http://www.w3.org/1998/Math/MathML")

  const Euler = () => math(
    msup(mi("e"), mrow(mi("i"), mi("π"))), mo("+"), mn("1"), mo("="), mn("0"),
  )

  van.add(document.getElementById("demo-euler"), Euler())
}

{
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

  van.add(document.getElementById("demo-state"), incrementBtn, resetBtn, dom1, dom2, dom3, dom4)
}

{
  const {input, span} = van.tags

  const DerivedState = () => {
    const text = van.state("VanJS")
    const length = van.derive(() => text.val.length)
    return span(
      "The length of ",
      input({type: "text", value: text, oninput: e => text.val = e.target.value}),
      " is ", length, ".",
    )
  }

  van.add(document.getElementById("demo-derived-state"), DerivedState())
}

{
  const {button, span} = van.tags

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const Timer = ({totalSecs}) => {
    const secs = van.state(totalSecs)
    return span(
      secs, "s ",
      button({onclick: async () => {
        while (secs.val > 0) await sleep(1000), --secs.val
        await sleep(10) // Wait briefly for DOM update
        alert("⏰: Time is up")
        secs.val = totalSecs
      }}, "Start"),
    )
  }

  van.add(document.getElementById("demo-timer"), Timer({totalSecs: 5}))
}

{
  const {input, span} = van.tags

  const ConnectedProps = () => {
    const text = van.state("")
    return span(
      input({type: "text", value: text, oninput: e => text.val = e.target.value}),
      input({type: "text", value: text, oninput: e => text.val = e.target.value}),
    )
  }

  van.add(document.getElementById("demo-connected-props"), ConnectedProps())
}

{
  const {input, option, select, span} = van.tags

  const FontPreview = () => {
    const size = van.state(16), color = van.state("black")
    return span(
      "Size: ",
      input({type: "range", min: 10, max: 36, value: size,
        oninput: e => size.val = e.target.value}),
      " Color: ",
      select({oninput: e => color.val = e.target.value, value: color},
        ["black", "blue", "green", "red", "brown"]
          .map(c => option({value: c}, c)),
      ),
      // The <span> element below has a state-derived property `style`
      span({style: () => `font-size: ${size.val}px; color: ${color.val};`}, " Hello 🍦VanJS"),
    )
  }

  van.add(document.getElementById("demo-font-preview"), FontPreview())
}

{
  const {button, option, select, span} = van.tags

  const Counter = () => {
    const counter = van.state(0)
    const action = van.state("👍")
    return span(
      "❤️ ", counter, " ",
      select({oninput: e => action.val = e.target.value, value: action},
        option({value: "👍"}, "👍"), option({value: "👎"}, "👎"),
      ), " ",
      button({onclick: van.derive(() => action.val === "👍" ?
        () => ++counter.val : () => --counter.val)}, "Run"),
    )
  }

  van.add(document.getElementById("demo-escape-derived-prop"), Counter())
}

{
  const {input, li, option, select, span, ul} = van.tags

  const SortedList = () => {
    const items = van.state("a,b,c"), sortedBy = van.state("Ascending")
    return span(
      "Comma-separated list: ",
      input({oninput: e => items.val = e.target.value,
        type: "text", value: items}), " ",
      select({oninput: e => sortedBy.val = e.target.value, value: sortedBy},
        option({value: "Ascending"}, "Ascending"),
        option({value: "Descending"}, "Descending"),
      ),
      // A State-derived child node
      () => sortedBy.val === "Ascending" ?
        ul(items.val.split(",").sort().map(i => li(i))) :
        ul(items.val.split(",").sort().reverse().map(i => li(i))),
    )
  }

  van.add(document.getElementById("demo-sorted-list"), SortedList())
}

{
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

  van.add(document.getElementById("demo-poly-binding"), App())
}

{
  const {a, button, div, input, li, ul} = van.tags

  const ListItem = ({text}) => {
    const deleted = van.state(false)
    return () => deleted.val ? null : li(
      text, a({onclick: () => deleted.val = true}, "❌"),
    )
  }

  const EditableList = () => {
    const listDom = ul()
    const textDom = input({type: "text"})
    return div(
      textDom, " ",
      button({onclick: () => van.add(listDom, ListItem({text: textDom.value}))}, "➕"),
      listDom,
    )
  }

  van.add(document.getElementById("demo-editable-list"), EditableList())
}
