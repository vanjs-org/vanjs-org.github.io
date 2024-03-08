const {b, div, i, input, p} = van.tags

const name = van.state("")

const Name1 = () => {
  const numRendered = van.state(0)
  return div(
    () => {
      ++numRendered.val
      return name.val.trim().length === 0 ?
        p("Please enter your name") :
        p("Hello ", b(name))
    },
    p(i("The <p> element has been rendered ", numRendered, " time(s).")),
  )
}

const Name2 = () => {
  const numRendered = van.state(0)
  const isNameEmpty = van.derive(() => name.val.trim().length === 0)
  return div(
    () => {
      ++numRendered.val
      return isNameEmpty.val ?
        p("Please enter your name") :
        p("Hello ", b(name))
    },
    p(i("The <p> element has been rendered ", numRendered, " time(s).")),
  )
}

van.add(document.body,
  p("Your name is: ", input({type: "text", value: name, oninput: e => name.val = e.target.value})),
  Name1(),
  Name2(),
)
