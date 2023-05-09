import van from "/code/van-latest.min.js"

const {button, div, pre} = van.tags

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const Run = ({sleepMs}) => {
  const headingSpaces = van.state(40), trailingUnderscores = van.state(0)
  
  const animate = async () => {
    while (headingSpaces.val > 0) {
      await sleep(sleepMs)
      --headingSpaces.val, ++trailingUnderscores.val
    }
  }
  animate()

  const helloText = van.bind(headingSpaces, trailingUnderscores,
    (h, t) => `${" ".repeat(h)}🚐💨Hello VanJS!${"_".repeat(t)}`)
  return div(pre(helloText))
}

const Hello = () => {
  const dom = div()
  return div(
    dom,
    button({onclick: () => van.add(dom, Run({sleepMs: 1000}))}, "Hello 🐌"),
    button({onclick: () => van.add(dom, Run({sleepMs: 500}))}, "Hello 🐢"),
    button({onclick: () => van.add(dom, Run({sleepMs: 100}))}, "Hello 🚶‍♂️"),
    button({onclick: () => van.add(dom, Run({sleepMs: 10}))}, "Hello 🏎️"),
    button({onclick: () => van.add(dom, Run({sleepMs: 2}))}, "Hello 🚀"),
  )
}

van.add(document.getElementById("demo-hello-fun"), Hello())
