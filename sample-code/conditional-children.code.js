const {button, div, span} = van.tags

const ConditionalChildren = () => {
  const visible = van.state(true)
  return div(
    button({onclick: () => visible.val = !visible.val}, () => visible.val ? "Hide" : "Show"),
    div({style: "display: flex; gap: 2em;"},
      div("Return null:", div(() => visible.val ? span("👋Hello") : null)),
      div('Return "":', div(() => visible.val ? span("👋Hello") : "")),
    ),
  )
}

van.add(document.body, ConditionalChildren())
