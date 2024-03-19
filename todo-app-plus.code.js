const TodoListPlus = () => {
  const appState = vanX.reactive(JSON.parse(
    localStorage.getItem("appStatePlus") ?? '{"input":"","items":[]}'))
  van.derive(() => localStorage.setItem("appStatePlus", JSON.stringify(vanX.compact(appState))))
  return div(
    input({type: "text", value: () => appState.input, oninput: e => appState.input = e.target.value}),
    button({onclick: () => appState.items.push({text: appState.input, done: false})}, "Add"),
    vanX.list(div, appState.items, ({val: v}, deleter) => div(
      input({type: "checkbox", checked: () => v.done, onclick: e => v.done = e.target.checked}),
      () => (v.done ? del : span)(v.text),
      a({onclick: deleter}, "❌"),
    )),
  )
}
