import { VanObj, State } from "mini-van-plate/shared"

interface Props {
  van: VanObj
  id?: string
  init?: number
  buttonStyle?: string | State<string>
}

export default ({
  van: {state, derive, val, tags: {button, div}},
  id, init = 0, buttonStyle = "👍👎",
}: Props) => div((dom: Node | undefined) => {
  if (dom) return dom

  const counter = state(init)
  const up = state(<string | undefined>undefined), down = state(<string | undefined>undefined)
  derive(() => [up.val, down.val] = [...val(buttonStyle)])

  return div({...(id ? {id} : {}), "data-counter": counter},
    "❤️ ", counter, " ",
    button({onclick: () => ++counter.val}, up),
    button({onclick: () => --counter.val}, down),
  )
}).firstChild
