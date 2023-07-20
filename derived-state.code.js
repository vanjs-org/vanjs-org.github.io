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

van.add(document.body, DerivedState())
