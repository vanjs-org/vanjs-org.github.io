const {div, input, span} = van.tags

const fullName = van.state(localStorage.getItem("fullName") ?? "Tao Xin")

// State persistence with `localStorage`
van.derive(() => localStorage.setItem("fullName", fullName.val))

// Defining multiple derived states
const firstName = van.state(), lastName = van.state()
van.derive(() => [firstName.val, lastName.val] = fullName.val.split(" "))

const elapsed = van.state(0)
setInterval(() => elapsed.val += .01, 10)

// Same as `elapsed`, but delay the state propagation by 1s
const delayed = van.state(0)
van.derive(() => setTimeout(v => delayed.val = v, 1000, elapsed.val))

// Same as `elapsed`, but throttle the state update to every 100ms
const throttled = van.state(0)
setInterval(() => throttled.val = elapsed.val, 100)

// Generate a data stream for all value updates of a given state `s`
const streamOf = s => {
  let resolver
  van.derive(() => resolver ? resolver({value: s.val, done: false}) : s.val)
  return {
    [Symbol.asyncIterator]: () => ({
      next: () => new Promise(resolve => resolver = resolve)
    })
  }
}

(async () => {
  // To subscribe the data stream
  for await (const v of streamOf(throttled)) {
    console.log("elapsed: ", v)
  }
  // You can also chain the data stream with `map`, `filter`, etc. by integrating with
  // rubico (https://rubico.land) or wu.js (https://fitzgen.github.io/wu.js/).
})()

van.add(document.body,
  div(
    span({class: "label"}, "fullName:"),
    input({type: "text", value: fullName, oninput: e => fullName.val = e.target.value}),
  ),
  div(span({class: "label"}, "firstName:"), () => firstName.val ?? ""),
  div(span({class: "label"}, "lastName:"), () => lastName.val ?? ""),
  div(span({class: "label"}, "elapsed:"), () => elapsed.val.toFixed(2)),
  div(span({class: "label"}, "delayed:"), () => delayed.val.toFixed(2)),
  div(span({class: "label"}, "throttled:"), () => throttled.val.toFixed(2)),
)
