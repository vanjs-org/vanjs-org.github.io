import van from "vanjs-core"
import Hello from "./components/hello.js"
import Counter from "./components/counter.js"

const {button, div, p} = van.tags

van.add(document.getElementById("hello-container")!, Hello({van}))

van.add(document.getElementById("counter-container")!, p(button({
  onclick: () => {
    const basicCounterDom = document.getElementById("basic-counter")!
    basicCounterDom.replaceWith(Counter({
      van,
      id: "basic-counter",
      init: Number(basicCounterDom.getAttribute("data-counter"),
    )}))

    const styleSelectDom = <HTMLSelectElement>document.getElementById("button-style")
    const buttonStyle = van.state(styleSelectDom.value)
    styleSelectDom.oninput = e => buttonStyle.val = (<HTMLSelectElement>e!.target).value
    document.getElementById("styled-counter")!.replaceWith(
      div(() => Counter({
        van,
        id: "styled-counter",
        init: Number(document.getElementById("styled-counter")!.getAttribute("data-counter")),
        buttonStyle: buttonStyle.val,
      })).firstChild!
    )
  }
}, "Hydrate")))
