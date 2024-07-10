import { env } from "mini-van-plate/shared"

interface Props {
  readonly id: string
  readonly items: {done: boolean, text: string}[]
}

export default ({id, items: inputItems}: Props) => {
  const {a, button, del, div, input, span} = env.van.tags
  const items = env.vanX.reactive(inputItems)
  const inputDom = input({type: "text"})
  return div({id, "data-items": JSON.stringify(inputItems)},
    inputDom, button({onclick: () => items.push({text: inputDom.value, done: false})}, "Add"),
    env.vanX.list(div, items, ({val: v}, deleter) => div(
      input({type: "checkbox", checked: () => v.done, onclick: e => v.done = e.target.checked}),
      () => (v.done ? del : span)(v.text),
      a({onclick: deleter}, "❌"),
    )),
  )
}
