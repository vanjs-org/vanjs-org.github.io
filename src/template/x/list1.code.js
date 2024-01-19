const List = () => {
  const items = vanX.reactive([])
  const inputDom = input({type: "text"})

  return div(
    div(inputDom, button({onclick: () => items.push(inputDom.value)}, "Add")),
    vanX.list(ul, items, (v, deleter) => li(v, " ", a({onclick: deleter}, "❌"))),
    div(
      button({onclick: () => vanX.replace(items, l => l.toSorted())}, "A -> Z"),
      button({onclick: () => vanX.replace(items,
        l => l.toSorted((a, b) => b.localeCompare(a)))}, "Z -> A"),
      button({onclick: () => vanX.replace(items, l => l.map(v => v + "!"))}, 'Append "!"'),
    ),
  )
}
