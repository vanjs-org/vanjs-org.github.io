import van from "/code/van-latest.min.js"

{
  const {circle, path, svg} = van.tagsNS("http://www.w3.org/2000/svg")

  const Smiley = () => svg({width: "16px", viewBox: "0 0 50 50"},
    circle({cx: "25", cy: "25", "r": "20", stroke: "black", "stroke-width": "2", fill: "yellow"}),
    circle({cx: "16", cy: "20", "r": "2", stroke: "black", "stroke-width": "2", fill: "black"}),
    circle({cx: "34", cy: "20", "r": "2", stroke: "black", "stroke-width": "2", fill: "black"}),
    path({"d": "M 15 30 Q 25 40, 35 30", stroke: "black", "stroke-width": "2", fill: "transparent"}),
  )

  van.add(document.getElementById("demo-smiley"), Smiley())
}

{
  const {math, mi, mn, mo, mrow, msup} = van.tagsNS("http://www.w3.org/1998/Math/MathML")

  const Euler = () => math(
    msup(mi("e"), mrow(mi("i"), mi("π"))), mo("+"), mn("1"), mo("="), mn("0"),
  )

  van.add(document.getElementById("demo-euler"), Euler())
}

{
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

  van.add(document.getElementById("demo-state"), incrementBtn, resetBtn, dom1, dom2, dom3, dom4)
}

{
  const {button, span} = van.tags

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const Timer = ({totalSecs}) => {
    const secs = van.state(totalSecs);
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

// {
//   const {button, pre, span} = van.tags

//   const StopWatch = () => {
//     const elapsed = van.state("0.00")
//     let id
//     const start = () =>
//       id = id || setInterval(() =>
//         elapsed.val = (Number(elapsed.val) + 0.01).toFixed(2), 10)
//     return span(
//       pre({style: "display: inline;"}, elapsed, "s "),
//       button({onclick: start}, "Start"),
//       button({onclick: () => (clearInterval(id), id = 0)}, "Stop"),
//       button({onclick: () =>
//         (clearInterval(id), id = 0, elapsed.val = "0.00")}, "Reset"),
//     )
//   }

//   van.add(document.getElementById("demo-stopwatch"), StopWatch())
// }

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
      span({style: {deps: [size, color], f: (size, color) =>
        `font-size: ${size}px; color: ${color};`}}, " Hello 🍦VanJS"),
    )
  }

  van.add(document.getElementById("demo-font-preview"), FontPreview())
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
      van.bind(items, sortedBy, (items, sortedBy) =>
        sortedBy === "Ascending" ?
          ul(items.split(",").sort().map(i => li(i))) :
          ul(items.split(",").sort().reverse().map(i => li(i)))),
    )
  }

  van.add(document.getElementById("demo-sorted-list"), SortedList())
}

{
  const {button, span} = van.tags

  const Button = ({color, text, onclick}) => button({
    style: {deps: [color], f: color => `background-color: ${color};`},
    onclick,
  }, text)

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

  van.add(document.getElementById("demo-nonstate-deps"), App())
}

{
  const {a, button, div, input, li, ul} = van.tags

  const ListItem = ({text}) => {
    const deleted = van.state(false)
    return van.bind(deleted, d => d ? null : li(
      text, a({onclick: () => deleted.val = true}, "❌"),
    ))
  }

  const EditableList = () => {
    const listDom = ul()
    const textDom = input({type: "text"})
    return div(
      textDom, " ", button({
        onclick: () => van.add(listDom, ListItem({text: textDom.value})),
      }, "➕"),
      listDom,
    )
  }

  van.add(document.getElementById("demo-editable-list"), EditableList())
}
