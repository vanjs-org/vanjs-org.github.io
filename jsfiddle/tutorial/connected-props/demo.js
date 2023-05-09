const {input, span} = van.tags

const ConnectedProps = () => {
  const value = van.state("")
  return span(
    input({type: "text", value, oninput: e => value.val = e.target.value}),
    input({type: "text", value, oninput: e => value.val = e.target.value}),
  )
}

van.add(document.body, ConnectedProps())
