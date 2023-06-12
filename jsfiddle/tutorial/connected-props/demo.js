const {input, span} = van.tags

const ConnectedProps = () => {
  const text = van.state("")
  return span(
    input({type: "text", value: text, oninput: e => text.val = e.target.value}),
    input({type: "text", value: text, oninput: e => text.val = e.target.value}),
  )
}

van.add(document.body, ConnectedProps())
