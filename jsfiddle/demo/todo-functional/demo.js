const {a, button, div, input, span, strike} = van.tags

const TodoItem = ({text}) => {
  const done = van.state(false), deleted = van.state(false)
  return van.bind(deleted,
    d => d ? null : div(
      input({type: "checkbox", checked: done, onclick: e => done.val = e.target.checked}),
      van.bind(done, done => done ? strike(text) : span(text)),
      a({onclick: () => deleted.val = true}, "❌"),
    )
  )
}

const TodoList = () => {
  const inputDom = input({type: "text"})
  const dom = div(inputDom,
    button({onclick: () => van.add(dom, TodoItem({text: inputDom.value}))}, "Add"),
  )
  return dom
}

van.add(document.body, TodoList())
