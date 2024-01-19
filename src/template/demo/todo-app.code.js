const TodoList = () => {
  const items = vanX.reactive(JSON.parse(localStorage.getItem("appState") ?? "[]"))
  van.derive(() => localStorage.setItem("appState", JSON.stringify(items.filter(_ => 1))))
  const inputDom = input({type: "text"})
  return div(
    inputDom, button({onclick: () => items.push({text: inputDom.value, done: false})}, "Add"),
    vanX.list(div, items, ({val: v}, deleter) => div(
      input({type: "checkbox", checked: () => v.done, onclick: e => v.done = e.target.checked}),
      () => (v.done ? strike : span)(v.text),
      a({onclick: deleter}, "❌"),
    )),
  )
}
