const TodoItem = ({text}) => {
  const done = van.state(false), deleted = van.state(false)
  return () => deleted.val ? null : div(
    input({type: "checkbox", checked: done, onclick: e => done.val = e.target.checked}),
    () => (done.val ? strike : span)(text),
    a({onclick: () => deleted.val = true}, "❌"),
  )
}

const TodoList = () => {
  const inputDom = input({type: "text"})
  const dom = div(
    inputDom,
    button({onclick: () => van.add(dom, TodoItem({text: inputDom.value}))}, "Add"),
  )
  return dom
}
