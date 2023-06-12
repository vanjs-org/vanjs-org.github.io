const {input, span} = van.tags

const ConnectedProps = () => {
  const text = van.state("")
  return span(
    input({type: "text", value: text, oninput: e => value.val = e.target.value}),
    input({type: "text", value: text, oninput: e => value.val = e.target.value}),
  )
}

van.add(document.body, ConnectedProps())
